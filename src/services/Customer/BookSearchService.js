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
  searchBooksByGenre(genreName, bookTitle) {
    const params = {};
    if (genreName) {
      params.genreName = genreName;
    }
    if (bookTitle) {
      params.bookTitle = bookTitle;
    }
    return http.get("/books/genresearch", { params });
  }
}

export default new BookSearchService();
