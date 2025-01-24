import { Book } from "./index";
import { HistoryLibrary } from "./index";
import { Member } from "./index";

describe("AbstractLibrary - Adding and Removing Books", () => {
  let library: HistoryLibrary;
  let book: Book;

  beforeEach(() => {
    library = new HistoryLibrary();
    book = new Book("harry potter", "shams", "12345");
  });

  test("should add a book to the library", () => {
    library.addBook(book);
    expect(library.books).toContain(book);
  });

  test("should remove a book from the library by ISBN", () => {
    library.addBook(book);
    library.removeBook("12345");
    expect(library.books).not.toContain(book);
  });

  test("should find a book by ISBN", () => {
    library.addBook(book);
    const foundBook = library.findBook("12345");
    expect(foundBook).toEqual(book);
  });
});

describe("Member - Borrowing and Returning Books", () => {
  let book: Book;
  let member: Member;

  beforeEach(() => {
    book = new Book("harry potter", "shams", "12345");
    member = new Member(1, "Jake Long");
  });

  test("should borrow a book if it is available", () => {
    member.borrowBook(book);
    expect(member.borrowedBooks).toContain(book);
    expect(book.isAvailable).toBe(false);
  });

  test("should throw an error if the book is not available", () => {
    book.isAvailable = false;
    expect(() => member.borrowBook(book)).toThrow("Book is not available.");
  });

  test("should return a borrowed book", () => {
    member.borrowBook(book);
    member.returnBook(book);
    expect(member.borrowedBooks).not.toContain(book);
    expect(book.isAvailable).toBe(true);
  });

  test("should throw an error if returning a book not borrowed", () => {
    expect(() => member.returnBook(book)).toThrow(
      "This book was not borrowed by the member."
    );
  });
});

describe("AbstractLibrary - Registering Members", () => {
  let library: HistoryLibrary;
  let member: Member;

  beforeEach(() => {
    library = new HistoryLibrary();
    member = new Member(1, "Jake Long");
  });

  test("should register a new member", () => {
    library.registerMember(member);
    expect(library.members).toContain(member);
  });

  test("should handle multiple members", () => {
    const member2 = new Member(2, "Jorja Smith");
    library.registerMember(member);
    library.registerMember(member2);

    expect(library.members).toHaveLength(2);
    expect(library.members).toContain(member);
    expect(library.members).toContain(member2);
  });
});
