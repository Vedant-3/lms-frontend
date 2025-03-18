import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios"; 
import "./AddBook.css";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { v4 as uuidv4 } from "uuid";

const AddBook = () => {
    const navigate = useNavigate();

    const [book, setBook] = useState({
        id: uuidv4(), // Auto-generate unique ID
        title: "",
        author: "",
        imageUrl: "",
        genre: "",
        price: "",
        quantity: ""
    });

    // Handle input change
    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //   await axios.post("http://localhost:5000/api/books", book); // Update API URL
            //   alert("Book added successfully!");
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
                        <input className='form-input' type="text" name="imageUrl" placeholder="Image URL" value={book.imageUrl} onChange={handleChange} required />
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
