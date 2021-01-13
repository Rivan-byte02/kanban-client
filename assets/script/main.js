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
        tasks: []
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
                // this.tasks = res.data;
                // this.categories = res.data;
                res.data.forEach(category => {
                    this.tasks = [];
                    if (category.Tasks.length) {
                        category.Tasks.forEach(el => {
                            this.tasks.push(
                                `<div class="card mb-2">
                                    <div class="card-body">
                                        <h5 class="card-title">${el.title}</h5>
                                        <p class="card-text">${el.description}</p>
                                        <a href="#" class="btn btn-primary" @click.prevent="edit(${el.id})">Edit Task</a>
                                        <a href="#" class="btn btn-danger" @click.prevent="delete(${el.id})">Delete Task</a>
                                    </div>
                                </div>`
                            )
                        });
                    }
                    this.categories.push(
                        `<div class="text-capitalize test-wrap bg-primary badge text-start fs-3 mb-2">${category.name}</div>
                        <div id="tasks-card" v-html="${this.tasks}">
                        </div>
                        <button class="btn btn-secondary">+ Add new task</button>`
                        )
                    })
                console.log(this.categories);
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