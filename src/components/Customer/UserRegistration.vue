<template>
    <div class="container">
        <RouterLink to="/">Back to browsing</RouterLink>

        <h2 class="text-center mt-3">Welcome !</h2>
        <form>
            <label class="form-label" for="username">Username</label>
            <input class="form-control" type="text" name="username" id="username" v-model="username">
            <label class="form-label" for="password">Password</label>
            <input class="form-control" type="password" name="password" id="password" v-model="password">
            <label class="form-label" for="email">Email</label>
            <input class="form-control" type="email" name="email" id="email" v-model="email">
            <label class="form-label" for="address">Address</label>
            <input class="form-control" type="text" name="address" id="address" v-model="address">
            <br>
            <br>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary" @click="register">Register</button>
            </div>
            <br>
            <br>
        </form>

        <RouterLink to="/login">Already have an account.</RouterLink>
        <br>
        <br>

        <div class="alert alert-danger"  v-if="errorMessage">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
    import UserSessionService from '@/services/UserSessionService';

    export default{
        name: "userRegistration",
        data(){
            return {
                errorMessage: "",
                username: "",
                password: "",
                email: "",
                address: ""
            }
        },
        methods: {
            register(event){
                event.preventDefault();
                const signupRequest = {
                    "userName":this.username,
                    "password":this.password,
                    "email":this.email,
                    "defaultAddress":this.address
                };

                UserSessionService.customerSignup(signupRequest)
                    .then(() => {
                        this.$router.push({name:"userLogin"});
                    })
                    .catch(error=>{
                        this.errorMessage=error.response.data.message;
                    })

            }
        },
        mounted(){
            this.errorMessage="";
        }
    }
</script>

<style>

</style>