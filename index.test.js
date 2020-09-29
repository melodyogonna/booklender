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

test("Unsubscriber is working correctly", () => {
  expect(BookLender.unsubscribe("lendbook", lendbook)).toBe(false);
});

//Test booklending methods
describe("description", function () {
  test("Test book is added to passed arr", () => {
    const l = books.length;

    expect(addbook("Harry Potter", books)).toEqual(l + 1);
  });

  test("test book is lended out from passed in array", () => {
    expect(lendbook("Harry Potter", books)).toHaveProperty(
      "bookname",
      "Harry Potter"
    );

    expect(lendbook("Harry Potter", books)).toHaveProperty("available", false);
  });

  test("Book summary is being returned", () => {
    expect(bookdetails("full", books)).toEqual(books.length);
  });
});
