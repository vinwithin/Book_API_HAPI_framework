const { addBookHandler, getAllBooks, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler } = require('./handler')
const routes = [
    {
        method : 'POST',
        path : '/books',
        handler : addBookHandler,
        
    },
    {
        method : 'GET',
        path : '/books',
        handler: getAllBooks,
    },
    {
        method : 'GET',
        path : '/books/{bookId}',
        handler: getBookByIdHandler,
    },
    {
        method : 'PUT',
        path : '/books/{bookId}',
        handler: editBookByIdHandler,
    },
    {
        method : 'DELETE',
        path : '/books/{bookId}',
        handler: deleteBookByIdHandler,
    }
]
module.exports = routes;

