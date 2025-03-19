import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./GetAllBooks.css"; // Import CSS file

const GetAllBooks = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, bookId: null });
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch books from backend
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "http://localhost:8080/api/books",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data.content);
                setBooks(response.data.content);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, []);

    // Handle Delete Confirmation
    const confirmDelete = (id) => {
        setDeleteConfirm({ show: true, bookId: id });
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(
                `http://localhost:8080/api/books/${deleteConfirm.bookId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setBooks(books.filter(book => book.id !== deleteConfirm.bookId));
            setDeleteConfirm({ show: false, bookId: null });
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-book/${id}`);
    };

    // Filter books based on search query
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.id.toString().includes(searchQuery)
    );

    return (
        <div className="books-container">
            <h2 className="title">All Books</h2>

            <Link to="/admin/add-book" className="add-book-link">+ Add a New Book</Link>

            <input
                type="text"
                placeholder="Search by Title or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />

            <div className="book-list">
                {filteredBooks.length === 0 ? (
                    <p className="no-books">No books found.</p>
                ) : (
                    filteredBooks.map((book) => (
                        <div key={book.id} className="book-card">
                            <img src={book.imageUrl} alt={book.title} className="book-image" />

                            <div className="book-info">
                                <p><strong>ID:</strong> {book.id}</p>
                                <p><strong>Title:</strong> {book.title}</p>
                                <p><strong>Author:</strong> {book.author}</p>
                                <p><strong>Genre:</strong> {book.genre}</p>
                                <p><strong>Price:</strong> {book.price}</p>
                                <p><strong>Quantity:</strong> {book.quantity}</p>
                            </div>

                            <div className="book-actions">
                                <button className="edit-btn" onClick={() => handleEdit(book.id)}>Edit</button>
                                <button className="delete-btn" onClick={() => confirmDelete(book.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            {deleteConfirm.show && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Are you sure you want to delete this book?</p>
                        <button className="confirm-btn" onClick={handleDelete}>Yes, Delete</button>
                        <button className="cancel-btn" onClick={() => setDeleteConfirm({ show: false, bookId: null })}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetAllBooks;