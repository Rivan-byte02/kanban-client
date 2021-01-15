<template>
    <!-- Login Form -->
    <main class="card" style="width: 400px; margin-top: 6em; border-radius: 20px;" id="login">
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
                    <button>
                        <g-signin-button
                            :params="googleSignInParams"
                            @success="onSignInSuccess"
                            @error="onSignInError">
                            Sign in with Google
                        </g-signin-button>
                    </button>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </main>
</template>

<script>
import GoogleSignInButton from 'vue-google-signin-button-directive';

export default {
    name: "LoginForm",
    directives: {
        GoogleSignInButton
    },
    data() {
        return {
            email: '',
            password: '',
            googleSignInParams: {
                client_id: '730970683594-qfm8na1s20d78fqjeckg17ldkjprl4dj.apps.googleusercontent.com',
            }
        }
    },
    methods: {
        loginSubmit() {
            const obj = { email: this.email, password: this.password};
            return this.$emit('login', obj);
        },
        registerForm() {
            const obj = { page: 'register' };
            return this.$emit('registerForm', obj);
        },
        onSignInSuccess (googleUser) {
            // `googleUser` is the GoogleUser object that represents the just-signed-in user.
            // See https://developers.google.com/identity/sign-in/web/reference#users
            // const profile = googleUser.getBasicProfile() // etc etc
            const id_token = googleUser.getAuthResponse().id_token
            return this.$emit('googleLogin', id_token);
        },
        onSignInError (error) {
            // `error` contains any error occurred.
            console.log('OH NOES', error)
        }
    }
}
</script>

<style scoped>
    .google-signin-button {
        color: white;
        background-color: red;
        height: 50px;
        font-size: 16px;
        border-radius: 10px;
        padding: 10px 20px 25px 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    main {
        margin: 0 40%;
        padding: 1em;
        background: inherit;
        width: 250px;
        height: 500px;
        position: absolute;
    }
</style>>