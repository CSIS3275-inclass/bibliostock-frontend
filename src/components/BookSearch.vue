<template>
    <div>
      <h2>Search Books</h2>
      <form>
        <div>
          <label for="title">Title</label>
          <input type="text" v-model="title" id="title" placeholder="Enter title">
        </div>
        <div >
          <label for="author">Author</label>
          <input type="text"  v-model="author" id="author" placeholder="Enter author">
        </div>
        <button  v-on:click.prevent="searchBooks()">Search</button>
      </form>
  
      <div v-if="books">
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
  import BookSearchService from "../services/BookSearchService.js";
  
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
  

  