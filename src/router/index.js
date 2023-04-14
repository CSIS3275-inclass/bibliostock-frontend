import { createWebHistory, createRouter } from "vue-router";
import BookSearch from "@/components/Customer/Search/BookSearch.vue";
import GenreSearch from '@/components/Customer/Search/GenreSearch.vue'
import ReviewsSearch from '@/components/Customer/Search/ReviewsSearch.vue'
import AllBooks from '@/components/Customer/Home/AllBooks.vue'
import allAuthors from '@/components/Customer/Home/AllAuthors'
import allGenres from '@/components/Customer/Home/AllGenres'

const routes = [
    {
        path:"/",
        name: "allBooks",
        component: AllBooks
    },
    {
        path:"/search",
        name: "bookSearch",
        component: BookSearch
    },
    {
        path:"/search/genre",
        name: "genreSearch",
        component: GenreSearch
    },
    {
        path:"/search/review",
        name: "reviewsSearch",
        component: ReviewsSearch
    },
    {
        
        path:"/books/authors",
        name: "allAuthors",
        component: allAuthors
    },
    {
        
        path:"/books/genres",
        name: "allGenres",
        component: allGenres
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;