<template>
    <div class="container">
        <RouterLink to="/">Back to browsing</RouterLink>

        <h2 class="text-center mt-3">Welcome back !</h2>
        <form>
            <div class="mb-3">
                <label class="form-label" for="username">Username</label>
                <input class="form-control" type="text" name="username" id="username" v-model="username">
                <label class="form-label" for="password">Password</label>
                <input class="form-control" type="password" name="password" id="password" v-model="password">
            </div>
            <div class="mb-3 form-check">
                <input class="form-check-input" type="checkbox" name="isManager" id="isManager" v-model="check">
                <label class="form-check-label" for="isManager">I'm a store manager.</label>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary" @click="login">login</button>
            </div>
            <br>
            <br>
        </form>

        <RouterLink to="/signup">Create an account (customer)</RouterLink>
        <br>
        <br>
        <div class="alert alert-danger" v-if="errorMessage">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
    import userSessionService from "@/services/UserSessionService"
    
    export default {
        name: "userLogin",
        data() {
            return{
                username: "",
                password: "",
                isManager: 0,
                check: false,
                loginRequest: {},
                errorMessage: "",
                user: {}
            }
        },
        methods: {

            login(event){
                event.preventDefault();
                this.isManager = this.check ? 1 : 0;
                this.loginRequest = {
                    "userName": this.username,
                    "password": this.password
                }
                userSessionService.login(this.isManager,this.loginRequest)
                    .then(response => {
                        this.user=response.data;
                        localStorage.setItem('userId',this.user.id);
                        
                        if(this.isManager==0)
                            this.$router.push({ name: "allBooks"}); //redirect to homepage
                        else{
                            this.$router.push({ name: "stockList"}); //redirect to Manager homepage
                        }
                            
                    })
                    .catch(error => {
                        console.log(error)
                        if(error.response.data.message!=undefined)
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