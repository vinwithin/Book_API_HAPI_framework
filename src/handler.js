const books = require('./books');
const { nanoid } = require('nanoid');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage } = request.payload;
    
  if (name === undefined){
    const respone = h.response({
      status :'fail',
      message:'Gagal menambahkan buku. Mohon isi nama buku',
    });
    respone.code(400);
    return respone;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
    return response;
  }
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const reading = pageCount > readPage ? true : false;
  const finished = pageCount === readPage ? true : false;
  books.push({
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  });
  const isSuccess = books.filter((b) => b.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Gagal menambahkan buku. Mohon isi nama buku',
  }).code(500);
  return response;
};
const getAllBooks = (request, h) => {
  const {name, reading, finished} = request.query;
  if (name) {
    let buku = books.filter((b) => b.name.toLowerCase() === name.toLowerCase());
    return h.response({
      status: 'success',
      data: {
        books: buku.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  }
  if (reading) {
    let buku = books.filter((b) => Number(b.reading) === reading);
    return h.response({
      status: 'success',
      data: {
        books: buku.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  }
  if (finished) {
    let buku = books.filter((b) => Number(b.finished) === finished);
    return h.response({
      status: 'success',
      data: {
        books: buku.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  }
  if (!name && !reading && !finished) {
    return h.response({
      status: 'success',
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  }
};

const getBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const book = books.filter((b) => b.id === bookId)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
  return response;
};
const editBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage } = request.payload;
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
    return response;
  }
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((b) => b.id === bookId);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,  
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
  return response;
};
const deleteBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const index = books.findIndex((b) => b.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
  return response;
};

module.exports = { addBookHandler, getAllBooks, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };