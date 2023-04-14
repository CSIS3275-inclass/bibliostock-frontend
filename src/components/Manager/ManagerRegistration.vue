<template>
    <manager-nav></manager-nav>
    <div class="container">
        <h2 class="text-center mt-3">Create another manager account</h2>
        <label class="form-label" for="username">Username</label>
        <input class="form-control" type="text" name="username" id="username" v-model="username">
        <label class="form-label" for="password">Password</label>
        <input class="form-control" type="password" name="password" id="password" v-model="password">
        <label class="form-label" for="email">Email</label>
        <input class="form-control" type="email" name="email" id="email" v-model="email">
        <br>
        <input class="form-check-input" type="checkbox" name="isAdmin" id="isAdmin" v-model="check">
        <label class="form-check-label" for="isManager">admin account</label>
        <br>
        <br>
        <label class="form-label" for="password">Your Password</label>
        <input class="form-control" type="password" name="managerPassword" id="managerPassword" v-model="managerPassword">
        <br>
        <br>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-dark" @click="register">Create</button>
        </div>
        <br>
        <br>
        <div class="alert alert-danger" v-if="errorMessage">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
    import userSessionService from "@/services/UserSessionService";
    import ManagerNav from "@/components/Manager/ManagerNav";

    export default {
        name: "managerRegistration",
        components:{
            ManagerNav
        },
        data() {
            return{
                userId: 0,
                errorMessage: "",
                username: "",
                password: "",
                email: "",
                managerPassword:"",
                check: false
            }
        }, 
        methods: {
            register(){
                const signupRequest = {
                    "userName":this.username,
                    "password":this.password,
                    "email":this.email
                };

                userSessionService.managerSignup(this.userId,this.managerPassword,signupRequest,this.check)
                    .then(response => {
                        console.log(response);
                        window.confirm("New manager account added successfully");
                        window.location.reload();
                    })
                    .catch(error=>{
                        this.errorMessage=error.response.data.message;
                    })

            }
        },
        mounted(){
            this.userId = localStorage.getItem("userId");

            userSessionService.validateSession(this.userId,this)
                .then(()=>{
                })
                .catch(error=>{
                    console.log(error);
                })
        }
    }
</script>

<style>

</style>