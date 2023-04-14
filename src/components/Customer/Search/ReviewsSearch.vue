<template>
    <div class="container">
        <search-breadcrumb></search-breadcrumb>
        <h2>Search Books By Reviews</h2>
        <div class="input-group mb-3">
            <label class="input-group-text" for="bookName">Sort By Book Rating</label>
            <input class="form-control" id="bookName" @keyup.enter="sortByRev" v-model="reviewID" type="number" min="0.0">
        </div>
        <ul>
            <li v-for="book in books" :key="book.id" >
                {{ book.title }}, {{ book.synopsis }}
            </li>
        </ul>
    </div>
</template>

<script>
import BookSearchService from "@/services/Customer/BookSearchService";
import SearchBreadcrumb from "@/components/Customer/Search/SearchBreadcrumb.vue";

    export default {
        name: "ReviewsSearch",    
        components: {
            SearchBreadcrumb
        },
        data() {
            return {
                reviewID: 0.0,
                books: [],
            };
        },
        methods: {
            sortByRev() {
                BookSearchService.retrieveByRatings(this.reviewID)
                .then(response => {
                    this.books = response.data;
                    console.log(this.books);
                })
                .catch(error => {
                    console.log(error);
                });
            }

        }
    }
</script>

<style>

</style>