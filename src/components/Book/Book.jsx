import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Book.css";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Modal from "./Modal";

const DEFAULT_IMAGE = "../../../public/default-book.png";

const Book = () => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const { cart, addToCart } = useContext(CartContext);
    const [selectedBook, setSelectedBook] = useState(null); // ✅ Track selected book for modal
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // ✅ For navigation to checkout

    useEffect(() => {
        fetchBooks(page);
    }, []);

    const fetchBooks = async (pageNumber) => {
        if (loading || pageNumber >= totalPages) return;
        setLoading(true);

        console.log(`Started Fetching Books`);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://localhost:8080/api/books?page=${pageNumber}&size=10`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // ✅ Add random ratings between 3.0 and 5.0
            const booksWithRatings = response.data.content.map((book) => ({
                ...book,
                rating: (Math.random() * 2 + 3).toFixed(1),
            }));

            setBooks((prevBooks) => [...prevBooks, ...booksWithRatings]);
            setPage(pageNumber + 1);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Failed to load books", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageError = (event) => {
        event.target.src = DEFAULT_IMAGE;
    };

    const handleAddToCart = (book) => {
        addToCart(book);
        // alert(`"${book.title}" has been added to your cart!`);
        toast.success(`"${book.title}" added to cart!`, {
            position: "top-right",
            autoClose: 2000, // Toast will disappear after 2 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    };

    const handleOpenModal = async (bookId) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(`http://localhost:8080/api/books/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSelectedBook(data);
            setShowModal(true);
        } catch (error) {
            console.error("Failed to fetch book details", error);
        }
    };

    return (
        <div className="books-container">
            {/* ✅ Books Grid */}
            <div className="books-grid">
                {books.map((book) => (
                    <div key={book.id} className="book-card" onClick={() => handleOpenModal(book.id)}>
                        <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="book-image"
                            onError={handleImageError}
                        />
                        <div className="book-info">
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-author">by {book.author}</p>
                            <p className="book-genre">{book.genre}</p>
                            <div className="book-rating">
                                ⭐⭐⭐⭐⭐ ({book.rating})
                            </div>
                            <p className="book-price">
                                ${book.price.toFixed(2)}
                            </p>
                            <p
                                className={`book-status ${book.status === "AVAILABLE"
                                    ? "available"
                                    : "unavailable"
                                    }`}
                            >
                                {book.status}
                            </p>
                            <button
                                className="add-to-cart-btn"
                                onClick={(e) => { e.stopPropagation(); handleAddToCart(book) }}
                                disabled={book.status !== "AVAILABLE"}
                            >
                                {book.status === "AVAILABLE"
                                    ? "Add to Cart"
                                    : "Out of Stock"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ Show More Button */}
            {page < totalPages && (
                <button
                    onClick={() => fetchBooks(page)}
                    className="show-more-btn"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Show More Books"}
                </button>
            )}

            {/* ✅ Checkout Button */}
            {cart.length > 0 && (
                <button
                    onClick={() => navigate("/checkout")}
                    className="checkout-btn"
                >
                    Checkout ({cart.length} items)
                </button>
            )}

            {/* ✅ Show Modal */}
            {showModal && (
                <Modal book={selectedBook} onClose={() => setShowModal(false)} />
            )}

            <ToastContainer />
        </div>
    );
};

export default Book;
