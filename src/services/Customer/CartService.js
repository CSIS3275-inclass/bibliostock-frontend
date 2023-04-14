import http from "@/http-common";

class CartService {

    // get cart with userId
    getUserCart(userId){
        return new Promise((resolve, reject) => {
            // first get Cart id
            http.get(`/user/${userId}/cart`)
                .then(response=>{
                    const cartId = response.data.id;
                    
                    // get cart using cart id
                    http.get(`/cart/${cartId}`)
                        .then(response=>{
                            resolve(response.data);
                        })
                        .catch(error=>{
                            reject(error)
                        })
                })
                .catch(error=>{
                    reject(error)
                })
        })
    }

    //getBooks title and format in a cart
    getCartBooks(bookID,formatID){
        return new Promise((resolve, reject) => {
            const bookInfo={};

            http.get(`/book/${bookID}`)
                .then(response=>{
                    bookInfo.title=response.data.title;
                    bookInfo.isbn=response.data.isbn;
                    bookInfo.bookId=response.data.id;

                    //format
                    http.get(`/book/format/${formatID}`)
                        .then(response => {
                            bookInfo.format=response.data.name;
                            bookInfo.formatId=response.data.id;
                            resolve(bookInfo);
                        })
                        .catch(error=>{
                            reject(error);
                        })
                })
                .catch(error=>{
                    reject(error)
                })
        });
    }

    //update cart item's quantity
    updateCartItem(cartId,quantity,bookFormatRequest){
        const params ={
            "quantity":quantity
        };
        return http.put(`/cart/${cartId}`,bookFormatRequest,{params});
    }

    //remove cart item from cart
    removeCartItem(cartId,bookFormatRequest){
        const config = {
            data : bookFormatRequest
        }
        return http.delete(`/cart/${cartId}`,config);
    }

    //add item to cart
    addItemToCart(cartID,bookFormatRequest){
        return http.post(`/cart/${cartID}`,bookFormatRequest);
    }
}

export default new CartService();