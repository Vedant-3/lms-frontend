import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Book.css";

const Book = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                console.log("API response for books:", response.data);
                setBooks(response.data.content || []);
                // You can store pagination data if needed:
                // setPagination({ totalPages: response.data.totalPages, totalElements: response.data.totalElements });
            } catch (err) {
                setError("Failed to load books");
            } finally {
                setLoading(false);
            }
        };
    
        fetchBooks();
    }, []);
    

    if (loading) return <p className="loading-text">Loading books...</p>;
    if (error) return <p className="error-text">{error}</p>;

    return (
        <div className="books-container">
            {books.map((book) => (
                <div key={book.id} className="book-card">
                    <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="book-image"
                    />
                    <div className="book-info">
                        <h3 className="book-title">{book.title}</h3>
                        <p className="book-author">by {book.author}</p>
                        <p className="book-price">${book.price}</p>
                        <button className="view-button">View Details</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Book;
