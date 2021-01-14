const app = new Vue({
    el: '#app',
    data: {
        baseUrl: `http://localhost:3000`,
        page: 'login',
        loginUser: {
            email: '',
            password: ''
        },
        user: {
            userName: '',
            email: '',
            password: ''
        },
        categories: [],
        task: {
            title: '',
            description: '',
            categoryId: null
        }
    },
    methods: {
        changePage(page){
            this.page = page;
        },
        checkAuth(){
            if (localStorage.access_token) {
                this.changePage('main-page');
                this.fetchAllTask();
            } else {
                this.changePage('login');
            }
        },
        login(){
            axios({
                method: 'POST',
                url: this.baseUrl+`/users/login`,
                data: {
                    email: this.loginUser.email,
                    password: this.loginUser.password
                }
            })
            .then(res => {
                localStorage.setItem('access_token', res.data.access_token);
                this.loginUser.email = '';
                this.loginUser.password = '';
                this.checkAuth();
            })
            .catch(err => {
                console.log(err);
            })
        },
        logout(){
            localStorage.clear();
            this.checkAuth()
        },
        register(){
            const { userName, email, password } = this.user;
            axios({
                method: 'POST',
                url: this.baseUrl+`/users/register`,
                data: {
                    userName,
                    email,
                    password
                }
            })
            .then(res => {
                this.user.userName = '';
                this.user.email = '';
                this.user.password = '';
                console.log(res.data);
                this.checkAuth()
            })
            .catch(err => {
                console.log(err);
            })
        },
        fetchAllTask(){
            axios({
                methods: 'GET',
                url: this.baseUrl+'/tasks',
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(res => {
                this.categories = res.data;
                console.log(this.categories);
            })
            .catch(err => {
                console.log(err);
            })
        },
        createTask(){
            const { title, description, categoryId } = this.task;
            axios({
                method: 'POST',
                url: this.baseUrl+`/tasks`,
                data: {
                    title,
                    description,
                },
                headers: {
                    access_token: localStorage.access_token
                },
                params: {
                    category: categoryId
                }
            })
            .then(res => {
                console.log(res.data);
                this.task.title = '';
                this.task.description = '';
                this.task.categoryId= null;
                this.checkAuth()
            })
            .catch(err => {
                console.log(err);
            })
        },
        fetchOneTask(id){
            axios({
                method: 'GET',
                url: this.baseUrl+`/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(res => {
                console.log(res.data);
                const { title , description, CategoryId } = res.data;
                this.task.title = title;
                this.task.description = description;
                this.task.categoryId = CategoryId;
            })
            .catch(err => {
                console.log(err);
            })
        },
        edit(id){
            localStorage.setItem('taskId', id);
            this.changePage('update-task');
            this.fetchOneTask(id);
        },
        updateTask(){
            const { title, description, categoryId } = this.task;
            const id = localStorage.taskId;
            axios({
                method: 'PUT',
                url: this.baseUrl+`/tasks/${id}`,
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
                localStorage.removeItem('taskId');
                this.task.title = '';
                this.task.description = '';
                this.task.categoryId= null;
                this.checkAuth()
            })
            .catch(err => {
                console.log(err);
            })
        },
        deleteTask(id){
            console.log(id);
            axios({
                method: 'DELETE',
                url: this.baseUrl+`/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(res => {
                console.log(res.data);
                this.checkAuth();
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    created() {
        this.checkAuth();
    }

});