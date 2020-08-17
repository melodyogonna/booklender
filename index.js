const books = [];

function Observer() {
  const subscribers = {};

  this.subscibe = function (event, cb) {
    if (subscribers[event]) {
      return subscribers[event].push(cb);
    }

    return (subscribers[event] = [cb]);
  };

  this.publish = function (event, args) {
    if (!subscribers[event]) {
      return false;
    }

    const subs = subscribers[event];
    subs.forEach((subscriber) => {
      return subscriber(args);
    });
  };

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

const addbook = (bookname) => {
  const newbook = { bookname, available: true };
  return books.push(newbook);
};

const lendbook = (bookname) => {
  return books.map((book) => {
    if (book.bookname === bookname) {
      console.log(`${book.bookname} found in books, renting ...`);
      return (book.available = false);
    }
  });
};

const bookdetails = (type) => {
  if (type === "full") {
    console.log(`Books contain a total of ${books.length} books`);
  } else if (type === "rented") {
    const rentedBooks = books.filter((book) => {
      return book.available === false;
    });
    console.log(`${rentedBooks.length} books have been rented so far`);
  } else if (type === "available") {
    const availableBooks = books.filter((book) => {
      return book.available === true;
    });
    console.log(`${availableBooks.length} books is available in collection`);
  } else {
    console.log("Passed parameter type is not recognised");
  }
};

const BookLender = new Observer();
BookLender.subscibe("addbook", addbook);
BookLender.subscibe("lendbook", lendbook);
BookLender.subscibe("booksummary", bookdetails);
BookLender.publish("addbook", "A game of thrones");
BookLender.publish("lendbook", "A game of thrones");
BookLender.unsubscribe("lendbook", lendbook);
BookLender.publish("lendbook", "A game of thrones");
BookLender.publish("booksummary", "full");
BookLender.publish("booksummary", "available");
BookLender.publish("booksummary", "rented");
