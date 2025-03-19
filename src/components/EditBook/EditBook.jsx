import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditBook.css";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const EditBook = () => {
    const { id } = useParams(); // Get book ID from URL params
    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        price: "",
        quantity: "",
        image_url: "",
        isbn: "",
    });

    // Fetch book details (Using sample data for now)
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:8080/api/books/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBook(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchBook();

    }, [id, navigate]);

    // Handle input change
    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:8080/api/books/${id}`, book,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // await axios.put(`http://localhost:8080/api/books/${id}`, book);
            alert("Book updated successfully!");
            navigate("/admin");
        } catch (error) {
            console.error("Error updating book:", error);
            alert("Failed to update book.");
        }
    };

    return (
        <div>
            <Header />
            <div className="add-book-wrapper">
                <div className="img-container">
                    <img src="/addBook.jpg" alt="Edit Book" />
                </div>

                <div className="add-book-container">
                    <h2 className="page-title">Edit Book Details</h2>
                    <form className='page-form' onSubmit={handleSubmit}>
                        <label className="form-label">Book Title</label>
                        <input className='form-input' type="text" name="title" value={book.title} onChange={handleChange} required />

                        <label className="form-label">Author</label>
                        <input className='form-input' type="text" name="author" value={book.author} onChange={handleChange} required />

                        <label className="form-label">Image URL</label>
                        <input className='form-input' type="text" name="imageUrl" value={book.imageUrl} onChange={handleChange} required />

                        <label className="form-label">Genre</label>
                        <input className='form-input' type="text" name="genre" value={book.genre} onChange={handleChange} required />

                        <label className="form-label">Price</label>
                        <input className='form-input' type="number" name="price" value={book.price} onChange={handleChange} required />

                        <label className="form-label">Quantity</label>
                        <input className='form-input' type="number" name="quantity" value={book.quantity} onChange={handleChange} required />

                        <button className="form-btn" type="submit">Save Changes</button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EditBook;
