<!-- Displayed in all main pages -->
<!-- only display cart,profile,logout when user is logged in -->
<template>
    <div>
        <ul class="nav nav-tabs nav-fill">
            <li class="nav-item navbar-brand mb-0 h1">
                <RouterLink to="/" class="nav-link">Bibliostock</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/" class="nav-link">Home</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/books/authors" class="nav-link">Authors</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/books/genres" class="nav-link">Genres</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/search" class="nav-link">Advanced Search</RouterLink>
            </li>
            <li class="nav-item" v-if="isActive" >
                <RouterLink to="/user/cart" class="nav-link">Cart</RouterLink>
            </li>
            <li class="nav-item" v-if="isActive" >
                <RouterLink to="/user/favorite" class="nav-link">Favorites</RouterLink>
            </li>
            <li class="nav-item" v-if="isActive" >
                <button @click="logout" class="btn btn-primary">Logout</button>
            </li>
            <li v-if="!isActive">
                <RouterLink to="/login" class="nav-link">Login/Register</RouterLink>
            </li>

        </ul>
    </div>
</template>

<script>
    import UserSessionService from '@/services/UserSessionService';
    
    export default {
        name: "navBar",
        data(){
            return {
                isActive: false,
                userId:0
            }
        },
        methods: {
            goToHome(){
                this.$router.push({name: "customerHome"});
            },
            goToAllAuthors(){
                this.$router.push({name: "allAuthors"});
            },
            goToAllGenres(){
                this.$router.push({name: "allGenres"});
            },
            goToSearch(){
                this.$router.push({name: "bookSearch"});
            },
            goToCart(){
                this.$router.push({name: "shoppingCart"});

            },
            goToHistory(){

            },
            goToProfile(){

            },
            goToFavorites(){
                this.$router.push({name: "favoriteList"});
            },
            logout(){
                UserSessionService.logout(this.userId)
                    .then(response=>{
                        this.isActive = response.data.isActive;
                        window.confirm("Logged out successfully");
                        this.retrieveSession();
                    })
                    .catch(error=>{
                        console.log(error)
                    })
            },
            login(){
                this.$router.push({name:"userLogin"})
            },
            retrieveSession(){
                this.userId=localStorage.getItem('userId');
                UserSessionService.getUser(this.userId)
                .then(response=>{
                    const user = response.data;
                    this.isActive=user.isActive;
                })
                .catch(error=>{
                    console.log(error)
                }) 
            }
            
        },
        mounted(){
            this.retrieveSession()
        }
    }
</script>

<style>

</style>