<template>
    <div>
      <Nav-Bar></Nav-Bar>
      <div class="container">
        <h2 class="text-center mt-3">All Genres</h2>
        <table class="table align-middle">
          <thead>
            <tr>
              <th>GENRE NAME</th>
              <th>DESCRIPTION </th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="(genre, index) in genres" :key="index">
              <td>{{ genre.name }}</td>           
              <td>{{ genre.description }}</td>
                            
              
            </tr>
          </tbody>
        </table>
        
       </div>
    </div>
  </template>
  
  <script>

  import BookService from "@/services/Customer/BookService";
  import NavBar from "@/components/Customer/NavBar";
  export default {
    name: "GenreList",
    components: {
      NavBar
    },
    data() {
      return {
        genres: [],
        message: null
      };
    },
    methods: {
      getGenres() {
        BookService.retrieveAllGenres()
          .then(response => {
            this.genres = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      },

     
    },
    mounted() {
      this.getGenres();
    }
  };
  </script>
  
  <style>
  </style>
  