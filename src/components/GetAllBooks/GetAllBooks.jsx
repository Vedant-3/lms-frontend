// import { useState, useEffect } from "react";
// // import axios from "axios"; 
// import "./GetAllBooks.css";
// import { Link } from "react-router-dom";

// const GetAllBooks = () => {
//   const [books, setBooks] = useState([
//     { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", quantity: 1925 },
//     { id: 2, title: "1984", author: "George Orwell", quantity: 1949 },
//     { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", quantity: 1960 }
//   ]);

//   const [searchQuery, setSearchQuery] = useState("");

//   // Uncomment below code when connecting to backend
//   /*
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/books") // Update with actual API endpoint
//       .then((response) => {
//         setBooks(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching books:", error);
//       });
//   }, []);
//   */

//   const handleDelete = (id) => {
//     setBooks(books.filter(book => book.id !== id));

//     // Uncomment below code when connecting to backend
//     /*
//     axios
//       .delete(`http://localhost:5000/api/books/${id}`)
//       .then(() => {
//         setBooks(books.filter(book => book.id !== id));
//       })
//       .catch((error) => {
//         console.error("Error deleting book:", error);
//       });
//     */
//   };

//   const handleEdit = (id) => {
//     console.log(`Edit book with ID: ${id}`);
//     alert("Edit functionality to be implemented!");
//   };

//   // Function to filter books based on search query
//   const filteredBooks = books.filter((book) =>
//     book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     book.id.toString().includes(searchQuery)
//   );

//   return (
//     <div className="books-container">
//       <h2 className="title">All Books</h2>
//       <Link to="/admin/add-book" className="add-book-link">+ Add a New Book</Link>
//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search by Title or ID..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="search-bar"
//       />

//       <div className="book-list">
//         {filteredBooks.length === 0 ? (
//           <p className="no-books">No books found.</p>
//         ) : (
//           <ul>
//             {filteredBooks.map((book) => (
//               <li key={book.id} className="book-card">
//                 <div className="book-info">
//                   <p><strong>ID:</strong> {book.id}</p>
//                   <p><strong>Title:</strong> {book.title}</p>
//                   <p><strong>Author:</strong> {book.author}</p>
//                   <p><strong>Quantity:</strong> {book.quantity}</p>
//                 </div>
//                 <div className="book-actions">
//                   <button className="edit-btn" onClick={() => handleEdit(book.id)}>Edit</button>
//                   <button className="delete-btn" onClick={() => handleDelete(book.id)}>Delete</button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GetAllBooks;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./GetAllBooks.css"; // Import CSS file

const GetAllBooks = () => {
    const navigate = useNavigate();
    
    const [books, setBooks] = useState([
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Classic",
            price: "$10",
            quantity: 5,
            image: "https://via.placeholder.com/100"
        },
        {
            id: 2,
            title: "1984",
            author: "George Orwell",
            genre: "Dystopian",
            price: "$15",
            quantity: 3,
            image: "https://via.placeholder.com/100"
        }
    ]);

    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, bookId: null });
    const [searchQuery, setSearchQuery] = useState("");

    // Handle Delete Confirmation
    const confirmDelete = (id) => {
        setDeleteConfirm({ show: true, bookId: id });
    };

    const handleDelete = () => {
        setBooks(books.filter(book => book.id !== deleteConfirm.bookId));
        setDeleteConfirm({ show: false, bookId: null });
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
                            <img src={book.image} alt={book.title} className="book-image" />

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
