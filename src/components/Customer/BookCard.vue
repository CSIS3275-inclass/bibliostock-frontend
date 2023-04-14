<template>
    <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 p-3" v-if="books.length">
        <div v-for="(book,index) in books" :id="index" :key="index"
            class="card col m-3 border " style="width: 18rem;">
            <div class="card-body">
            <h4 class="card-title">{{book.title}}</h4>
            <p class="card-text">{{book.synopsis}}</p>
            </div>
            <ul class="list-group list-group-flush">
            <li v-for="(author,authorindex) in book.authors" :id="authorindex" :key="authorindex" class="list-group-item">Authored by: {{ author.name }} </li>
            <li class="list-group-item">Publication date: <strong>{{ book.publicationDate }}</strong> </li>
            <li class="list-group-item">ISBN: <strong>{{ book.isbn }}</strong></li>
            <li class="list-group-item">Average Review: <strong>{{ book.averageReview }}</strong></li>
            <li class="list-group-item">Serie: <strong>{{ !(book.serie==null) ? book.serie.name : "none" }}</strong></li>
            </ul>
            <div class="card-body">
                <div v-if="bookstocks[index]!=undefined">
                    <h6 class="card-text" >Available formats</h6>
                    <select name="format" id="format" class="form-select mb-2" v-model="addedBookStock">
                        <option :value="bookIds[index]+','+format[index]+','+index">Format {{ format[index] }} - ${{ price[index] }}</option>
                    </select>
                    <button class="btn btn-dark mb-2" @click="addToCart" :id="addedBookStock">
                        <i class="bi bi-cart4 fs-6"></i>
                        Add to cart
                    </button>
                </div>
    
                <button :id="userId+','+book.id" class="btn btn-dark mb-2" @click="addToFavorite">
                    <i class="bi bi-star fs-6"></i>
                    Add to favorites
                </button>
    
            </div>
        </div>
        
    </div>
</template>
<script>
    import BookstockService from '@/services/Manager/BookstockService.js'
    import CartService from '@/services/Customer/CartService.js';
    import userSessionService from "@/services/UserSessionService";
    import FavoriteService from '@/services/Customer/FavoriteService.js';


export default {
    name: "bookCard",
    props: {
        books:[],
    },
    data(){
        return {
            userId: 0,
            bookstocks:[],
            format: [],
            price: [],
            bookIds: [],
            addedBookStock: "",
            test:{},
            isActive:false
        }
    },
    methods:{
        addToCart(event){
            userSessionService.validateSession(this.userId,this)
                .then(response=>{
                    if(response===true){
        
                        const ids = event.target.id.split(",");
            
                        const bookFormatReq = {
                            "bookID": ids[0],
                            "formatID": ids[1]
                        };
                        CartService.addItemToCart(this.userId,bookFormatReq)
                            .then(()=>{
                                window.confirm("Your item has been added to your cart");
                            })
                            .catch(error=>{
                                if(error.response.data.message!=undefined)
                                    window.confirm(error.response.data.message);
                                else
                                    window.confirm("oops could not add item to cart");
                                
                            })

                    }
                })
                .catch(error=>{
                    console.log(error);
                })
        },
        getAllFavorites() {
        FavoriteService.retrieveAllFavorites()
            .then(response => {
                let fav = response.data;
                console.log(fav);
                this.$router.push({ name: "allFavorites" });
            })
            .catch(error => {
                console.log(error);
            });
        },
        addToFavorite(event){
            userSessionService.validateSession(this.userId,this)
                .then(response=>{
                    if(response===true){
                        const ids = event.target.id.split(",");
            
                        const obj = {
                            "favid": ids[0],
                            "bookid": ids[1]
                        };
                        console.log(event.target.id);
                        FavoriteService.addBookToFavorites(obj.favid, obj.bookid);
                        this.getAllFavorites();
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
        },
        getBook(){
            this.books.forEach(book => {
                BookstockService.getBookstockByBook(book.id)
                    .then(response=>{
                        console.log("rsult");
                        console.log(JSON.stringify( response.data));
                        // console.log(response.data[0].id.formatID);
                        // console.log(response.data[0].sellingPrice);
                        
                        // console.log(this.bookstocks);
                        response.data.forEach(element => {
                            const obj = {
                                "format": element.id.formatID,
                                "book": element.id.bookID,
                                "price": element.sellingPrice

                            }
                            this.bookstocks.push(obj);
                            this.format.push(element.id.formatID);
                            this.bookIds.push(element.id.bookID);
                            this.price.push(element.sellingPrice);

                            // console.log(obj);
                        });
                        // this.bookstocks.push(this.test);
                    })
                    .catch(error=>{
                        if(error.response.data.message!=undefined)
                            console.log(error.response.data.message)
                    })
            });
        }
    },
    mounted(){
        this.userId = localStorage.getItem("userId");

        this.getBook();
        
    }
    
}
</script>
<style>
    
</style>