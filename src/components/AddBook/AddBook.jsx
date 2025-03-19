import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddBook.css";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const AddBook = () => {
    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        price: 0,
        quantity: 0,
        image_url: "",
        isbn: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:8080/api/books",
                book, // Pass the book object here
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Book added successfully!");
            navigate("/admin"); // Redirect to books list
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Failed to add book.");
        }
    };

    return (
        <div>
            <Header />
            <div className="add-book-wrapper">
                <div className="img-container">
                    <img src="/edit-book-img.webp" alt="" />
                </div>

                <div className="add-book-container">
                    <h2 className="page-title">Add a New Book</h2>
                    <form className='page-form' onSubmit={handleSubmit}>
                        <input className='form-input' type="text" name="title" placeholder="Book Title" value={book.title} onChange={handleChange} required />
                        <input className='form-input' type="text" name="author" placeholder="Author" value={book.author} onChange={handleChange} required />
                        <input className='form-input' type="text" name="image_url" placeholder="Image URL" value={book.image_url} onChange={handleChange} required />
                        <input className='form-input' type="text" name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} required />
                        <input className='form-input' type="text" name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} required />
                        <input className='form-input' type="number" name="price" placeholder="Price" value={book.price} onChange={handleChange} required />
                        <input className='form-input' type="number" name="quantity" placeholder="Quantity" value={book.quantity} onChange={handleChange} required />

                        <button className="form-btn" type="submit">Save</button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AddBook;
