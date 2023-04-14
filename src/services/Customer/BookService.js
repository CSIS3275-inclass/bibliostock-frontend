import http from "@/http-common";


class BookService {
    retrieveAllBooks(){
        return http.get("/book");
    }

    retrieveAllAuthors(){
        return http.get("/books/authors");
    }

    retrieveAllGenres(){
        return http.get("/books/genres");
    }

}


export default new BookService();