export class Book {
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;

  constructor(title: string, author: string, isbn: string) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isAvailable = true;
  }

  borrow(): void {
    if (!this.isAvailable) {
      throw new Error("Book is already borrowed.");
    }
    this.isAvailable = false;
  }

  returnBook(): void {
    // if (this.isAvailable) {
    //   throw new Error("Book is already returned.");
    // }
    this.isAvailable = true;
  }
}

export class Member {
  id: number;
  name: string;
  borrowedBooks: Book[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.borrowedBooks = [];
  }

  borrowBook(book: Book): void {
    if (!book.isAvailable) {
      throw new Error("Book is not available.");
    }
    book.borrow();
    this.borrowedBooks.push(book);
  }

  returnBook(book: Book): void {
    const index = this.borrowedBooks.indexOf(book);
    if (index === -1) {
      throw new Error("This book was not borrowed by the member.");
    }
    book.returnBook();
    this.borrowedBooks.splice(index, 1);
  }
}

export class Librarian extends Member {
  role: string;

  constructor(id: number, name: string) {
    super(id, name);
    this.role = "Librarian";
  }

  addBook(book: Book, library: AbstractLibrary): void {
    library.addBook(book);
  }

  removeBook(isbn: string, library: AbstractLibrary): void {
    library.removeBook(isbn);
  }
}

abstract class AbstractLibrary {
  members: Member[] = [];
  librarians: Librarian[] = [];
  books: Book[] = [];
  private isOpen: boolean = false;

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  abstract createLibrary(type: string): AbstractLibrary;

  addBook(book: Book): void {
    this.books.push(book);
  }

  removeBook(isbn: string): void {
    this.books = this.books.filter((book) => book.isbn !== isbn);
  }

  findBook(isbn: string): Book | undefined {
    return this.books.find((book) => book.isbn === isbn);
  }

  registerMember(member: Member): void {
    this.members.push(member);
  }

  getAvailableBooks(): Book[] {
    return this.books.filter((book) => book.isAvailable);
  }
}

export class HistoryLibrary extends AbstractLibrary {
  createLibrary(type: string): AbstractLibrary {
    return new HistoryLibrary();
  }
}

class ScienceLibrary extends AbstractLibrary {
  createLibrary(type: string): AbstractLibrary {
    return new ScienceLibrary();
  }
}

class BiologyLibrary extends AbstractLibrary {
  createLibrary(type: string): AbstractLibrary {
    return new BiologyLibrary();
  }
}

// const historyLibrary = new HistoryLibrary();
// const librarian = new Librarian(1, "shams");
// historyLibrary.registerMember(librarian);
// const book1 = new Book("History of the World", "Author", "12345");
// librarian.addBook(book1, historyLibrary);
// librarian.borrowBook(book1);
// librarian.returnBook(book1);
// new Member(2, "shams");
// let bg = new BiologyLibrary();
