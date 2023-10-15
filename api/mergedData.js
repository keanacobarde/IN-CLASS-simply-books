import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook, getBooks } from './bookData';
import { getOrderBooks } from './orderBookData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleAuthor(authorFirebaseKey), getAuthorBooks(authorFirebaseKey)])
    .then(([authorObject, authorBooksArray]) => {
      resolve({ ...authorObject, books: authorBooksArray });
    }).catch((error) => reject(error));
});

const deleteAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  getAuthorBooks(authorId).then((booksArray) => {
    console.warn(booksArray, 'Author Books');
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(authorId).then(resolve);
    });
  }).catch((error) => reject(error));
});

// const getOrderDetails = async (orderId) => {
//   const order = getSingleOrder(orderId);

//   const ge
// }

// getting book orders and filtering out books that aren't in the order

const getBooksNotInOrder = async (uid, orderId) => {
  const allBooks = await getBooks(uid);

  const orderBooks = await getOrderBooks(orderId);

  const bookPromises = await orderBooks.map((orderBook) => getSingleBook(orderBook.orderId));

  const books = await Promise.all(bookPromises);

  const filterBooks = await allBooks.filter((obj) => !books.some((e) => e.firebaseKey === obj.firebaseKey));

  return filterBooks;
};

export {
  viewBookDetails, viewAuthorDetails, deleteAuthorBooks, getBooksNotInOrder,
};
