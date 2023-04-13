import http from "../../http-common";

class BookSearchService {
  searchBooks(authorName, bookTitle) {
    const params = {};
    if (authorName) {
      params.authorName = authorName;
    }
    if (bookTitle) {
      params.bookTitle = bookTitle;
    }
    return http.get("/search", { params });
  }
}

export default new BookSearchService();
