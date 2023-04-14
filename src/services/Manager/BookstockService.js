import http from "@/http-common";

class BookstockService {
    getBooksInStock(){
        return http.get("/stocks");
    }

}

export default new BookstockService();