<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <h2 class="text-center mt-3">All Books</h2>
      <div v-if="books.length">
        <book-card :books="books"></book-card>
      </div>
      <div v-else class="alert alert-warning m-3" role="alert">
        <i class="bi bi-exclamation-circle"></i> Sorry there are no books at the moment.
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import BookService from "@/services/Customer/BookService";
  import BookCard from "@/components/Customer/BookCard.vue";
  import navBar from "@/components/Customer/NavBar";

  
  export default {
    name: "BooksIDSearch",

    components: {
      BookCard,
      navBar
    },
    data() {
      return {
        books: [],
        action: "showBooks",
        message: null,
        bookStocks: []
      };
    },
    methods: {
      getBooks() {
        BookService.retrieveAllBooks()
          .then(response => {
            this.books = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
      
    },
    mounted() {
      this.getBooks();
    }
  };
  </script>
  
  <style>
  </style>
  