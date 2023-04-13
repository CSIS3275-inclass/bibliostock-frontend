<template>
    <div class="container">
      <h2>Search Books</h2>
      <form>
        <div class="input-group mb-3">
          <label class="input-group-text" for="title">Title</label>
          <input class="form-control" type="text" v-model="title" id="title" placeholder="Enter title">
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text" for="author">Author</label>
          <input class="form-control"  v-model="author" id="author" placeholder="Enter author">
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-dark"  v-on:click.prevent="searchBooks()">Search</button>
        </div>
      </form>
  
      <div v-if="books" class="mt-3">
        <h3>Results</h3>
        <ul>
          <li v-for="book in books" :key="book.id">
            {{ book.title }}
          </li>
        </ul>
      </div>
      <div  v-else-if="searched">
        <p>No books found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import BookSearchService from "@/services/Customer/BookSearchService.js";
  
  export default {
    name: "BookSearch",
    data() {
      return {
        title: "",
        author: "",
        books: [],
        searched: false,
      };
    },
    methods: {
      searchBooks() {
        BookSearchService.searchBooks(this.author, this.title)
          .then(response => {
            this.books = response.data;
            this.searched = true;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };
  </script>
  

  