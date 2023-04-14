<template>
    <nav-bar></nav-bar>
    <div class="container">
        <h2 class="text-center mt-3">Shopping Cart</h2>
        <!-- check if undefined first to avoid promise error -->
        <div v-if="items==undefined||!items.length">
            <p>{{!errorMessage.length ? "Your cart is empty" : errorMessage}}</p>
            <router-link to="/">Browse books.</router-link>
        </div>
        <div v-else>
            <!--Make sure books info are loaded first  -->
            <div v-if="books[0]!=undefined">
                <h4 class="mb-3">Added Books</h4>
                <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 p-3" v-if="books.length">
                    <div v-for="(item,index) in items" :id="index" :key="index">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{{ books[index].title}}</h5>
                                <p class="card-text">ISBN: {{ books[index].isbn }}</p>
                                <p class="card-text">Format: {{ books[index].format }}</p>
                                <p class="card-text">${{ item.bookStock.sellingPrice }}</p>
                                <p class="card-text">( {{ item.bookStock.quantityInStock }} left in stock )</p>
                                
                                <label class="form-label" for="quantity">qty </label>
                                <input class="form-control" type="number" name="quanity" id="quantity" v-model="item.unitQuantity">
                                
                                <!-- will split the id to remove or update -->
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-dark mt-3"
                                        :id="books[index].bookId+','+books[index].formatId+','+index"
                                        @click="handleUpdateClick">
                                        update quantity
                                    </button>
                                    <button class="btn btn-dark" :id="books[index].bookId+','+books[index].formatId+','+index"
                                        @click="handleRemoveClick">
                                        remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            <div>
                <p>Total Items: <b>{{ totalQuantity }}</b></p>
                <p>Total Price: <b>${{ totalPrice.toFixed(2) }}</b></p>
            </div>
            
            <div>
                <h4>Confirm Order</h4>
                <label for="address">Delivery Address</label>
                <br>
                <input type="text" name="address" id="address" v-model="address">
                <br>
                <br>
                <label for="payment">Payment Method </label>
                <select class="form-select"  name="payment" id="payment" v-model="paymentMethod">
                    <option value="1">Debit</option>
                    <option value="2">Credit</option>
                </select>
                <br>
                <br>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" @click="completeOrder">Complete Order</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import CartService from "@/services/Customer/CartService"
    import NavBar from "@/components/Customer/NavBar"
    import UserSessionService from "@/services/UserSessionService"

    export default{
        name: "shoppingCart",
        components:{
            NavBar
        }
        ,
        data(){
            return {
                userId: 0,
                cartId: 0,
                address: "",
                items: [],
                books: [],
                totalQuantity: 0,
                totalPrice: 0,
                paymentMethod: 1,
                errorMessage: ""
            }
        },
        methods:{
            retrieveCart(){
                CartService.getUserCart(this.userId)
                    .then(response => {
                        this.cartId = response.id;
                        this.items = response.addedItems;
                        this.totalQuantity = response.quantity;
                        this.totalPrice = response.total;
                        
                        //retrieve book information of each added items
                        this.items.map((item)=>{
                            CartService.getCartBooks(item.bookStock.id.bookID, item.bookStock.id.bookID)
                                .then(response => {
                                    this.books.push(response);
                                })
                                .catch(error=>{
                                    console.log(error);
                                })
                            
                        })

                    })
                    .catch(()=>{
                        this.errorMessage="Your cart is empty";
                    })
            },
            retrieveUserInfo(){
                UserSessionService.getUser(this.userId)
                    .then(response=>{
                        this.address=response.data.defaultAddress;
                    })
                    .catch(error=>{
                        console.log(error);
                    })
            },

            handleUpdateClick(event){
                // get bookId and formatId from button's id
                const ids = event.target.id.split(",");

                const bookFormatReq = {
                    "bookID": ids[0],
                    "formatID": ids[1]
                };

                const updatedItemId = ids[2];
                const quantity = this.items[updatedItemId].unitQuantity;

                console.log(bookFormatReq);
                console.log(quantity);
                console.log(this.cartId);

                CartService.updateCartItem(this.cartId,quantity,bookFormatReq)
                    .then(()=>{
                        // reload cart
                        this.retrieveCart();
                    })
                    .catch(error=>{
                        console.log(error);
                    });

            },
            handleRemoveClick(event){
                const ids = event.target.id.split(",");

                const bookFormatReq = {
                    "bookID": ids[0],
                    "formatID": ids[1]
                };

                CartService.removeCartItem(this.cartId,bookFormatReq)
                    .then(()=>{
                        this.items=[];
                        this.books=[];
                        this.retrieveCart();
                    })
                    .catch(error=>{
                        console.log(error)
                    })
            },
            completeOrder(){
                for(let i=0;i<this.books.length;i++){
                    const bookFormatReq = {
                        "bookID": this.books[i].bookId,
                        "formatID": this.books[i].formatId
                    };

                    CartService.removeCartItem(this.cartId,bookFormatReq)
                    .then(()=>{
                        this.items=[];
                        this.books=[];
                        this.retrieveCart();
                    })
                    .catch(error=>{
                        console.log(error)
                    });
                }
                window.confirm("Thank you for your order!");

            }
        },
        mounted(){
            this.userId = localStorage.getItem("userId");

            UserSessionService.validateSession(this.userId,this)
                .then(()=>{
                    this.items=[];
                    this.books=[];
                    this.retrieveCart();
                    this.retrieveUserInfo();
                })
                .catch(error=>{
                    console.log(error);
                })
            
            
        }
    }
</script>

<style>

</style>