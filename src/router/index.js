import { createWebHistory, createRouter } from "vue-router";
import BookSearch from "@/components/Customer/Search/BookSearch.vue";
import GenreSearch from '@/components/Customer/Search/GenreSearch.vue'
import ReviewsSearch from '@/components/Customer/Search/ReviewsSearch.vue'

const routes = [
    {
        path:"/",
        alias:"/search",
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

];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;