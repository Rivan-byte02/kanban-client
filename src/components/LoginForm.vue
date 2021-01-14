<template>
    <!-- Login Form -->
    <div class="card mx-auto" style="width: 400px; margin-top: 6em; border-radius: 20px;">
        <form class="card-body p-5" @submit.prevent="loginSubmit">
            <h4 class="text-center mb-3">Kanban App Login</h4>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <label for="loginEmail" class="col-form-label">Email</label>
                </div>
                <div class="col-auto" style="width: 15em;">
                    <input v-model="email" type="email" name="loginEmail" id="loginEmail" class="form-control">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <label for="loginPassword" class="col-form-label">Password</label>
                </div>
                <div class="col-auto" style="width: 15em;">
                    <input v-model="password" type="password" name="loginPassword" id="loginPassword" class="form-control">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-auto">
                    <a href="#" class="fs-6 mb-3" @click.prevent="registerForm">Not have a account yet? Click here to register</a>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-auto">
                    <div class="g-signin2 mb-3" data-onsuccess="onSignIn"></div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "LoginForm",
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        loginSubmit() {
            const obj = { email: this.email, password: this.password}
            return this.$emit('login', obj)
        },
        registerForm() {
            const obj = { page: 'register' }
            return this.$emit('registerForm', obj)
        }
    }
}
</script>

<style>

</style>