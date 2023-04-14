<template>
        <div>
        <ul class="nav nav-tabs nav-fill">
            <li class="nav-item navbar-brand mb-0 h1">
                <RouterLink to="/manager/stock" class="nav-link">Bibliostock</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/manager/stock" class="nav-link">Stocks</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/manager/admin" class="nav-link">Admin</RouterLink>
            </li>
            <li class="nav-item">
                <button @click="logout" class="btn btn-primary">Logout</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import UserSessionService from '@/services/UserSessionService';
    export default {
        name: "managerNav",
        data(){
            return {
                userId:0
            }
        },
        methods: {
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
            }
        },
        mounted(){
            this.userId=localStorage.getItem('userId');
        }
    }
</script>

<style>

</style>