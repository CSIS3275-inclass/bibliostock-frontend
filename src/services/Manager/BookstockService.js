import http from "@/http-common";

class BookstockService {
    getBooksInStock(){
        return http.get("/stocks");
    }
    getBookstockByBook(bookId){
        return http.get(`/stocks/book/${bookId}`);
    }

}

export default new BookstockService();