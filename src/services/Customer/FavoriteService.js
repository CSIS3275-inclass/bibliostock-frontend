import http from "@/http-common";


class FavoriteService {
    retrieveAllFavorites(){
        return http.get("/favorites");
    }

    deleteBook(ID, bookid) {
        return http.delete(`/favorites/${ID}/${bookid}`);
    }

    addBookToFavorites(ID, bookid) {
        return http.post(`/favorites/${ID}/${bookid}`);
    }

    
}


export default new FavoriteService();