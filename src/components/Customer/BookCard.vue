<template>
    <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 p-3" v-if="books.length">
        <div v-for="(book,index) in books" :id="index" :key="index"
            class="card col m-3 border " style="width: 18rem;">
            <div class="card-body">
            <h4 class="card-title">{{book.title}}</h4>
            <p class="card-text">{{book.synopsis}}</p>
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Authored by: {{ book.author }} </li>
            <li class="list-group-item">Publication date: <strong>{{ book.publicationDate }}</strong> </li>
            <li class="list-group-item">ISBN: <strong>{{ book.isbn }}</strong></li>
            <li class="list-group-item">Average Review: <strong>{{ book.averageReview }}</strong></li>
            <li class="list-group-item">Serie: <strong>{{ !(book.serie==null) ? book.serie.name : "none" }}</strong></li>
            </ul>
            <div class="card-body">
                <!-- <div v-if="bookStocks.length">
                    <h6 class="card-text" >Available formats</h6>
                    <select name="format" id="format" class="form-select mb-2" v-model="addedBookStock">
                        <option :value="item.id.bookID+','+item.id.formatID+','+index" v-for="(item,index) in bookStocks" :id="index" :key="index">audio</option>
                    </select>
                    <button class="btn btn-dark mb-2" @click="addToCart" :id="addedBookStock">
                        <i class="bi bi-cart4 fs-6"></i>
                        Add to cart
                    </button>
                </div> -->
    
                <button class="btn btn-dark mb-2" @click="addToFavorites">
                    <i class="bi bi-star fs-6"></i>
                    Add to favorites
                </button>
    
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name: "bookCard",
    props: {
        books:[],
        // bookStocks:[]
    },
    data(){
        return {
            addedBookStock: ""
        }
    },
    methods:{
        addToCart(){
        },
        addToFavorite(){

        },
        getBook(){
        }
    },
    mounted(){
        this.getBook();
    }
    
}
</script>
<style>
    
</style>