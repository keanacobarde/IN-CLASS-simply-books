import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook, getBooks } from './bookData';
import { getOrderBooks, getSingleBookOrder } from './orderBookData';

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

const getOrderDetails = async (orderId) => {
  const order = await getSingleBookOrder(orderId);

  const allOrderBooks = await getOrderBooks(orderId);

  const getSingleBooks = await allOrderBooks.map((book) => getSingleBook(book.bookId));

  const orderBooks = await Promise.all(getSingleBooks);

  return { ...order, orderBooks };
};

// getting book orders and filtering out books that aren't in the order

const getBooksNotInTheOrder = async (uid, orderId) => {
  // GET ALL THE BOOKS
  const allBooks = await getBooks(uid);

  // GET ALL THE ORDERBOOKS RELATES TO THE ORDER
  const orderBooks = await getOrderBooks(orderId);

  // GET THE BOOKS FOUND IN THE ORDER BOOKS, RETURNS AN ARRAY OF PROMISES
  const bookPromises = await orderBooks.map((orderBook) => getSingleBook(orderBook.bookId));

  // MOST USE PROMISE.ALL() TO RETURN EACH BOOK OBJECT
  const books = await Promise.all(bookPromises);

  // FILTER AND COMPARE THE TWO ARRAYS OF ALL BOOKS AND ALL ORDERBOOKS
  const filterBooks = await allBooks.filter((obj) => !books.some((e) => e.firebaseKey === obj.firebaseKey));

  // ONLY RETURN THE BOOKS NOT RELATED TO ORDER
  return filterBooks;
};

export {
  viewBookDetails, viewAuthorDetails, deleteAuthorBooks, getBooksNotInTheOrder, getOrderDetails,
};
