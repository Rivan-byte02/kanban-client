<template>
    <div class="container" id="home-page">
        <div v-if="page === 'login'">
            <login-form @login="login" @registerForm="changePage" @googleLogin="onSignIn"></login-form>
        </div>

        <div v-else-if="page === 'register'">
            <register-form @register="register" @loginForm="changePage"></register-form>
        </div>

        <div v-else>
            <navbar @logout="logout" @newCategory="changePage" @home="changePage"></navbar>
            
            <div v-if="page === 'main-page'">
                <task-list :categories="categories" @addTask="changePage" @moveCategory="moveCategory" @editTask="editTask" @deleteTask="deleteTask"></task-list>
            </div>

            <div v-else-if="page === 'add-task'">
                <add-task :categories="categories" @createTask="createTask"></add-task>
            </div>
    
            <div v-else-if="page === 'update-task'">
                <update-task :task="task" :categories="categories" @updateTask="updateTask"></update-task>
            </div>

            <div v-else-if="page === 'add-category'">
                <add-category @addCategory="addCategory"></add-category>
            </div>
    
            <div v-else-if="page === 'move-category'">
                <move-category :task="task" :categories="categories" @moveCategory="moveTask"></move-category>
            </div>

        </div>

    </div>
</template>

<script>
import Axios from 'axios';
import Swal from 'sweetalert2';
import axios from 'axios';
import AddCategory from './components/AddCategory';
import AddTask from './components/AddTask';
import LoginForm from "./components/LoginForm";
import Navbar from './components/Navbar';
import RegisterForm from "./components/RegisterForm";
import TaskList from './components/TaskList';
import UpdateTask from './components/UpdateTask';
import MoveCategory from './components/MoveCategory';

export default {
    name: "App",
    data() {
        return {
            page: "login",
            url: `https://rivan-kanban.herokuapp.com`,
            categories: [],
            task: {
                title: '',
                description: '',
                categoryId: null
            },
            styleObject: {
                width: '1500px',
                fontSize: '20px'
            },
            margin: '0px'
        }
    },
    components: {
        LoginForm,
        RegisterForm,
        Navbar,
        TaskList,
        AddTask,
        UpdateTask,
        AddCategory,
        MoveCategory
    },
    methods: {
        checkAuth() {
            if (localStorage.access_token) {
                this.fetchAllTask();
            } else {
                this.page='login';
            }
        },
        login(payload) {
            axios({
                method: 'POST',
                url: this.url+`/users/login`,
                data: {
                    email: payload.email,
                    password: payload.password
                }
            })
            .then(res => {
                localStorage.setItem('access_token', res.data.access_token);
                this.checkAuth();
            })
            .catch(err => {
                console.log(err.response.data);
            })
        },
        logout() {
            localStorage.clear();
            this.checkAuth();
            const auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
        },
        register(payload) {
            axios({
                method: 'POST',
                url: this.url+`/users/register`,
                data: {
                    userName: payload.userName,
                    email: payload.email,
                    password: payload.password
                }
            })
            .then(res => {
                console.log(res.data);
                this.checkAuth()
            })
            .catch(err => {
                console.log(err.response.data);
            })
        },
        onSignIn(id_token) {
            axios({
                method: 'POST',
                url: this.url+`/users/sign`,
                data: {
                    id_token: id_token
                }
            })
            .then(res => {
                localStorage.setItem('access_token', res.data.access_token)
                this.checkAuth()
            })
            .catch(err => {
                console.log(err.response.data);
            })
        },
        changePage(payload) {
            this.page = payload.page;
        },
        fetchAllTask() {
            axios({
                methods: 'GET',
                url: this.url+'/tasks',
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(res => {
                this.categories=res.data;
                this.page='main-page';
            })
            .catch(err => {
                console.log(err.response.data);
            })
        },
        fetchOneTask(payload) {
            const { id } = payload
            axios({
                method: 'GET',
                url: this.url+`/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(res => {
                const { id, title , description, CategoryId } = res.data;
                this.task = {
                    id,
                    title,
                    description,
                    categoryId: CategoryId
                }
                console.log(payload);
                this.changePage(payload);
            })
            .catch(err => {
                console.log(err.response.data);
            })
        },
        addCategory(name) {
            axios({
                method: 'POST',
                url: this.url+`/categories`,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    name
                }
            })
            .then(res => {
                console.log(res.data);
                this.checkAuth();
            })
            .catch(err => {
                console.log(err.response.data);
            })
        },
        createTask(payload) {
            axios({
                method: 'POST',
                url: this.url+`/tasks`,
                data: {
                    title: payload.title,
                    description: payload.description,
                },
                headers: {
                    access_token: localStorage.access_token
                },
                params: {
                    category: payload.CategoryId
                }
            })
            .then(res => {
                this.checkAuth()
            })
            .catch(err => {
                console.log(err.response.data);
            })
        },
        moveCategory(payload) {
            this.fetchOneTask(payload);
        },
        moveTask(payload) {
            axios({
                method: 'PATCH',
                url: this.url+`/tasks/${payload.id}`,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    categoryId: payload.categoryId
                }
            })
            .then(res => {
                console.log(res.data);
                this.checkAuth();
            })
            .catch(err => {
                console.log(err.response.data);
            })
        },
        editTask(payload) {
            this.fetchOneTask(payload);   
        },
        updateTask(payload) {
            const { id, title, description, categoryId } = payload;
            axios({
                method: 'PUT',
                url: this.url+`/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title,
                    description,
                },
                params: {
                    category: categoryId
                }
            })
            .then(res => {
                console.log(res.data);
                this.checkAuth()
            })
            .catch(err => {
                console.log(err.response.data);
            })
        },
        deleteTask(id) {
            axios({
                method: 'DELETE',
                url: this.url+`/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(res => {
                console.log(res.data);
                this.checkAuth();
            })
            .catch(err => {
                console.log(err.response.data.name);
            })
        }
    },
    created() {
        this.checkAuth();
    }
}

</script>

<style>
    #home-page {
        margin: 0;
        padding: 0;
        width: 2000px;
    }
</style>