/** Simple constructor to demonstrate the observer design pattern */
function Observer() {
  const subscribers = {};

  /** Subscribe a function to an event, this method takes an a event and
   * callback function, every function subscibed to an event is called when
   * the event is published
   * @param{string} event - Event name
   * @param{function} cb - Callback method
   * @returns{number} length of functions currently subscribed to the passed event
   */
  this.subscibe = function (event, cb) {
    if (subscribers[event]) {
      return subscribers[event].push(cb);
    }

    subscribers[event] = [cb];
    return subscribers[event].length;
  };

  /** Call every function subscribed to the passed in event
   * @param{string} event - Name of event to call methods on
   * @param{array} args - Arguments to pass to the listening functions
   * @returns{boolean} Returns true if any function was ran or false
   * otherwise
   */
  this.publish = function (event, ...args) {
    if (!subscribers[event]) {
      return false;
    }

    const subs = subscribers[event];

    if (subs.length < 0) {
      return false;
    }

    subs.forEach((subscriber) => {
      return subscriber(...args);
    });

    return true;
  };

  /** Unsubscribe a function from an event
   * @param{string} event - Name of event to remove the function from
   * @param{function} cb - Function to unsubscribe from the passed event
   */
  this.unsubscribe = function (event, cb) {
    if (!subscribers[event]) {
      return false;
    }
    subs = subscribers[event];
    subs.forEach((func, index) => {
      if (func === cb) {
        console.log(
          "Observer found. Unsubscribing this observer for this event ..."
        );
        return subscribers[event].splice(index, 1);
      }
    });
  };
}

/** Add a new book to library
 * @param {string} bookname - Name of book to add
 */
const addbook = (bookname, arr) => {
  const newbook = { bookname, available: true };
  return arr.push(newbook);
};

/** Lend out a book
 * @param {string} bookname - Name of book to lend out
 */
const lendbook = (bookname, arr) => {
  let a;
  arr.map((book) => {
    if (book.bookname === bookname) {
      console.log(`${book.bookname} found in books, renting ...`);
      book.available = false;
      return (a = book);
    }
  });
  return a;
};

/** Return stats of books currently in the library
 * @param {string} type - Which details you'd like to get
 * @returns {number} Appropriate number of books for passed type
 */
const bookdetails = (type, arr) => {
  if (type === "full") {
    console.log(`Books contain a total of ${arr.length} books`);
    return arr.length;
  } else if (type === "rented") {
    const rentedBooks = arr.filter((book) => {
      return book.available === false;
    });

    return rentedBooks.length;
  } else if (type === "available") {
    const availableBooks = arr.filter((book) => {
      return book.available === true;
    });

    return availableBooks.length;
  } else {
    throw new TypeError("Passed parameter type is not recognised");
  }
};

module.exports = {
  Observer,
  addbook,
  lendbook,
  bookdetails,
};
