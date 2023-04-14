import { createWebHistory, createRouter } from "vue-router";
import BookSearch from "@/components/Customer/Search/BookSearch.vue";
import GenreSearch from '@/components/Customer/Search/GenreSearch.vue'
import ReviewsSearch from '@/components/Customer/Search/ReviewsSearch.vue'
import AllBooks from '@/components/Customer/Home/AllBooks.vue'
import allAuthors from '@/components/Customer/Home/AllAuthors.vue'
import allGenres from '@/components/Customer/Home/AllGenres.vue'
import userLogin from "@/components/UserLogin";
import userRegistration from "@/components/Customer/UserRegistration";
import stockList from "@/components/Manager/StockList"
import managerRegistration from "@/components/Manager/ManagerRegistration"
import shoppingCart from "@/components/Customer/ShoppingCart"
import favoriteList from "@/components/Customer/FavoriteList"



const routes = [
    {
        path:"/",
        name: "allBooks",
        component: AllBooks
    },
    {
        path:"/login",
        name: "userLogin",
        component: userLogin
    },
    {
        path:"/signup",
        name: "userRegistration",
        component: userRegistration
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
    {
        
        path:"/user/cart",
        name: "shoppingCart",
        component: shoppingCart
    },
    {
        
        path:"/user/favorite",
        name: "FavoriteList",
        component: favoriteList
    },
    {
        
        path:"/manager/stock",
        name: "stockList",
        component: stockList
    },
    {
        
        path:"/manager/admin",
        name: "managerRegistration",
        component: managerRegistration
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;