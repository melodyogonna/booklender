const { addbook, lendbook, bookdetails, Observer } = require(".");

const books = [];

const BookLender = new Observer();

test("Test that subsciber is working correctly", () => {
  expect(typeof BookLender.subscibe("addbook", addbook)).toBe("number");
  expect(BookLender.subscibe("addbook", addbook)).toBeGreaterThan(0);
});

test("Publisher is working correctly", () => {
  expect(BookLender.publish("addbook", "A game of thrones", books)).toBe(true);
  expect(BookLender.publish("remove", "A game of thrones", books)).toBe(false);
});

BookLender.publish("lendbook", "A game of thrones", books);
BookLender.unsubscribe("lendbook", lendbook);
BookLender.publish("lendbook", "A game of thrones", books);
BookLender.publish("booksummary", "full", books);
BookLender.publish("booksummary", "available", books);
BookLender.publish("booksummary", "rented", books);
