<template>
<div>
  <nav-bar></nav-bar>
  <div class="container">
    <h2 class="text-center mt-3">My WishList</h2>
      <div v-if="message">
        {{message}}
      </div>
      <ul >
        <li v-for="item in favorites" :key="item.id">
          <h4>Favorite {{ item.id }}</h4>
          <ul>
            <li v-for="(book, index) in item.books" :key="index">
              <h4>{{ book.title }}</h4>
              <p>{{ book.synopsis }}</p>
              <p>Publication Date: {{ book.publicationDate }}</p>
              <p>ISBN: {{ book.isbn }}</p>
              <div><button> Buy Now</button></div>
              <br>
              <div>
              <button v-on:click="deleteBookClicked(item.id, book.id)">
              Delete
              </button>
          </div>
            </li>
          </ul>
        </li>
      </ul>
  </div>
  </div>
  </template>
  
  <script>
    import FavoriteService from "@/services/Customer/FavoriteService";
    import BookService from "@/services/Customer/BookService";
    import NavBar from "@/components/Customer/NavBar";
    
    export default {
      name: "FavoriteList",
      props: {
        book: {
          type: Object,
          required: true
        }
      },
      components: {
        NavBar
      },
      data() {
        return {
          favorites: [],
          message: null
        };
      },
      methods: {
        getFavorites() {
          FavoriteService.retrieveAllFavorites()
          .then(response => {
              this.favorites = response.data;
            })
            .catch(error => {
              console.log(error);
            });
        },
    
        getBooks() {
          BookService.retrieveAllBooks()
            .then(response => {
              this.books = response.data;
            })
            .catch(error => {
              console.log(error);
            });
        },

        deleteBookClicked(favid, bookid) {
          FavoriteService.deleteBook(favid, bookid);
          this.message = `Removed the Book from our WishList. Refresh the page.`;
          this.getFavorites();
          
    },
        
      },
    
      mounted() {
        this.getFavorites();
      }
    };
  </script>
  
  <style>
  </style>
     