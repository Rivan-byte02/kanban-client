<template>
  <!-- Register Form -->
    <div class="card mx-auto" style="width: 500px; margin-top: 6em; border-radius: 20px;">
        <form class="card-body p-5" @submit.prevent="register">
            <h4 class="text-center mb-3">Register New Account</h4>
            <div class="row mb-3">
                <div class="col-sm-4">
                    <label for="registerUserName" class="col-form-label">Username</label>
                </div>
                <div class="col-auto" style="width: 15em;">
                    <input v-model="user.userName" type="text" name="registerUserName" id="registerUserName" class="form-control">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-4">
                    <label for="registerEmail" class="col-form-label">Email</label>
                </div>
                <div class="col-auto" style="width: 15em;">
                    <input v-model="user.email" type="email" name="registerEmail" id="registerEmail" class="form-control">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-4">
                    <label for="registerPassword" class="col-form-label">Password</label>
                </div>
                <div class="col-auto" style="width: 15em;">
                    <input v-model="user.password" type="password" name="registerPassword" id="registerPassword" class="form-control">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-auto">
                    <a href="#" class="fs-6 mb-3" @click.prevent="loginForm" >Back to Login Page</a>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-auto" style="width: 15em;">
                    <button type="submit" class="btn btn-primary">Register</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "RegisterForm",
    data() {
        return {
            user: {
                userName: '',
                email: '',
                password: '',
            }
        }
    },
    methods: {
        register() {
            return this.$emit('register', this.user);
        },
        loginForm() {
            const obj = { page: 'login' };
            return this.$emit('loginForm', obj);
        }
    }
}
</script>

<style>

</style>