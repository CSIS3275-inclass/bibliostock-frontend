<template>
    <!-- <div v-if="user.isActive"> -->
    <div>
        <manager-nav></manager-nav>
        <div class="container">
            <h2 class="text-center mt-3">Books Inventory</h2>
            <table class="table align-middle table-bordered">
                <tr>
                    <th>Book Id</th>
                    <th>Format Id</th>
                    <th>Selling Price</th>
                    <th>Purchase Price</th>
                    <th>Quantity in Stock</th>
                    <th>Quantity Sold</th>
                    <th>Added By</th>
                    <th>Added Date</th>
                    <th>Update Date</th>
                    <th>Action</th>
                </tr>
                <tr v-for="(book,index) in bookstocks" :key="index">
                    <td>{{ book.id.bookID }}</td>
                    <td>{{ book.id.formatID }}</td>
                    <td>${{ book.sellingPrice }}</td>
                    <td>${{ book.purchasePrice }}</td>
                    <td>{{ book.quantityInStock }}</td>
                    <td>{{ book.quantitySold }}</td>
                    <td>{{ book.manager.username }}</td>
                    <td>{{ book.addedDate }}</td>
                    <td>{{ book.updatedDate }}</td>
                    <td>
                        <div class="btn-group">
                            <button class="btn btn-dark">edit</button>
                            <button class="btn btn-dark">remove</button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import ManagerNav from '@/components/Manager/ManagerNav';
    import BookstockService from '@/services/Manager/BookstockService';
    import userSessionService from "@/services/UserSessionService";

    export default{
        name: "stockList",
        components:{
            ManagerNav
        },
        data(){
            return {
                bookstocks: [],
                isActive: false
            }
        },
        methods:{
            retrieveStock(){
                BookstockService.getBooksInStock()
                    .then(response=>{
                        this.bookstocks=response.data;
                    })
                    .catch(error=>{
                        console.log(error);
                    })
            }
        },
        mounted(){
            this.retrieveStock();

            this.userId = localStorage.getItem("userId");

            userSessionService.validateSession(this.userId,this)
                .then(response=>{
                    // this.isActive=response;
                    console.log(response)
                })
                .catch(error=>{
                    console.log(error);
                })
        }
    }
</script>

<style>

</style>