<template>
    <div>
      <Nav-Bar></Nav-Bar>
        <div class="container">
          <h1 class="text-center mt-3">Authors List</h1>
          <table class="table align-middle">
            <thead>
              <tr class="align-top">
                <th>AUTHOR</th>
                <th>STATEMENT</th>
                
              </tr>
            </thead>
            <tbody>
              <tr v-for="(author, index) in authors" :key="index">
                <td>{{ author.name }}</td>           
                <td>{{ author.statement }}</td>
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
    name: "AuthorList",
    components: {
      NavBar
    },
    data() {
      return {
        authors: [],
        message: null
      };
    },
    methods: {
      getAuthors() {
        BookService.retrieveAllAuthors()
          .then(response => {
            this.authors = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      },

     
    },
    mounted() {
      this.getAuthors();
    }
  };
  </script>
  
  <style>
  </style>
  