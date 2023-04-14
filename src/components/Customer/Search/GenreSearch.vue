<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <search-breadcrumb></search-breadcrumb>
      <h2 class="text-center mt-3">Search Books By Genre</h2>
      <form>
        <div class="input-group mb-3">
          <label class="input-group-text" for="title">Title</label>
          <input class="form-control" type="text" v-model="title" id="title" placeholder="Enter Title">
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text" for="genre">Genre</label>
          <input class="form-control" type="text"  v-model="genre" id="genre" placeholder="Enter Genre">
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-dark" v-on:click.prevent="searchBooks()">Search</button>
        </div>
      </form>



      <div v-if="books.length" class="mt-3">
        <h3>Results</h3>
        <ul>
          <li v-for="book in books" :key="book.id">
            {{ book.title }}
          </li>
        </ul>
      </div>
   
      <div class="alert alert-warning m-3" v-else-if="searched">
        <i class="bi bi-exclamation-circle"></i>No books found.
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import BookSearchService from "@/services/Customer/BookSearchService";
  import SearchBreadcrumb from "@/components/Customer/Search/SearchBreadcrumb.vue";
  import NavBar from "@/components/Customer/NavBar";

  export default {
    name: "GenreSearch",
    components: {
      SearchBreadcrumb,
      NavBar
    },
    data() {
      return {
        title: "",
        genre: "",
        books: [],
        message:null,
        searched: false,
      };
    },
    methods: {
      searchBooks() {
        BookSearchService.searchBooksByGenre(this.genre, this.title)
          .then(response => {
            this.books = response.data;
            this.searched = true;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
  };
  </script>
  

  