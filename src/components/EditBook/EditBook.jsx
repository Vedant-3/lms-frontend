import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios"; 
import "./EditBook.css";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const EditBook = () => {
    const { id } = useParams(); // Get book ID from URL params
    const navigate = useNavigate();

    const [book, setBook] = useState({
        id: "",
        title: "",
        author: "",
        imageUrl: "",
        genre: "",
        price: "",
        quantity: ""
    });

    // Fetch book details (Using sample data for now)
    useEffect(() => {
        // Sample book data (Replace this with API call later)
        const sampleBooks = [
            { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", price: "10", quantity: "5", imageUrl: "https://via.placeholder.com/100" },
            { id: "2", title: "1984", author: "George Orwell", genre: "Dystopian", price: "15", quantity: "3", imageUrl: "https://via.placeholder.com/100" }
        ];

        const selectedBook = sampleBooks.find((book) => book.id === id);
        if (selectedBook) {
            setBook(selectedBook);
        } else {
            alert("Book not found!");
            navigate("/admin");
        }

        // Uncomment this when using API
        /*
        axios.get(`http://localhost:5000/api/books/${id}`)
            .then(response => setBook(response.data))
            .catch(error => {
                console.error("Error fetching book:", error);
                alert("Failed to load book details.");
                navigate("/admin");
            });
        */
    }, [id, navigate]);

    // Handle input change
    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Uncomment when using API
            /*
            await axios.put(`http://localhost:5000/api/books/${id}`, book);
            alert("Book updated successfully!");
            */
            navigate("/admin"); // Redirect to books list
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
