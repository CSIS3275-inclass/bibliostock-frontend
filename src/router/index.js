import { createWebHistory, createRouter } from "vue-router";
import BookSearch from "@/components/Customer/Search/BookSearch.vue";

const routes = [
    {
        path:"/",
        alias:"/search",
        name: "bookSearch",
        component: BookSearch
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;