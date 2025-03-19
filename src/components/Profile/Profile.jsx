// import React, { useState, useEffect } from 'react';
// import './Profile.css';

// function Profile() {
//     const [profile, setProfile] = useState(null);
//     const [books, setBooks] = useState([]);
//     const [currentPage, setCurrentPage] = useState(0);
//     const booksPerPage = 10;

//     useEffect(() => {
//         const userId = localStorage.getItem('userId');
//         const token = localStorage.getItem('token');

//         if (!userId || !token) {
//             console.error('User ID or token not found in local storage');
//             return;
//         }

//         const headers = {
//             'Authorization': `Bearer ${token}`
//         };

//         // Fetch user profile
//         fetch(`http://localhost:8080/api/users/${userId}`, { headers })
//             .then(response => response.json())
//             .then(data => setProfile(data))
//             .catch(error => console.error('Error fetching profile:', error));

//         // Fetch borrowed books
//         fetch(`http://localhost:8080/api/loans/user/${userId}`, { headers })
//             .then(response => response.json())
//             .then(data => {
//                 const activeBooks = data.filter(book => book.status === 'ACTIVE');
//                 const bookPromises = activeBooks.map(book =>
//                     fetch(`http://localhost:8080/api/books/${book.bookId}`, { headers })
//                         .then(response => response.json())
//                         .then(bookData => ({ ...book, title: bookData.title }))
//                 );
//                 return Promise.all(bookPromises);
//             })
//             .then(booksWithTitles => setBooks(booksWithTitles))
//             .catch(error => console.error('Error fetching books:', error));
//     }, []);

//     // Calculate the current slice of books to display
//     const startIndex = currentPage * booksPerPage;
//     const endIndex = startIndex + booksPerPage;
//     const currentBooks = books.slice(startIndex, endIndex);

//     // Handle returning a book
//     const handleReturnBook = (loanId) => {
//         const token = localStorage.getItem('token');
//         const headers = {
//             'Authorization': `Bearer ${token}`
//         };

//         fetch(`http://localhost:8080/api/loans/return/${loanId}`, { method: 'PUT', headers })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.status === 'RETURNED') {
//                     setBooks((prevBooks) => prevBooks.filter((book) => book.id !== loanId));
//                 }
//             })
//             .catch(error => console.error('Error returning book:', error));
//     };

//     // Handle pagination
//     const handleNextPage = () => {
//         if (endIndex < books.length) {
//             setCurrentPage((prevPage) => prevPage + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 0) {
//             setCurrentPage((prevPage) => prevPage - 1);
//         }
//     };

//     if (!profile) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="profile-container">
//             <h1>User Profile</h1>
//             <div className="profile-info">
//                 <p><strong>First Name:</strong> {profile.firstName}</p>
//                 <p><strong>Last Name:</strong> {profile.lastName}</p>
//                 <p><strong>Email:</strong> {profile.email}</p>
//             </div>
//             <h2>Borrowed Books</h2>
//             {currentBooks.length > 0 ? (
//                 <ul className="books-list">
//                     {currentBooks.map((book) => (
//                         <li key={book.id} className="book-item">
//                             <span className="book-title">{book.title}</span>
//                             <span className="book-dates">
//                                 <strong>Checkout Date:</strong> {new Date(book.checkoutDate).toLocaleString()}<br />
//                                 <strong>Due Date:</strong> {new Date(book.dueDate).toLocaleString()}
//                             </span>
//                             <button onClick={() => handleReturnBook(book.id)}>Return</button>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No books borrowed.</p>
//             )}
//             <div className="pagination">
//                 <button onClick={handlePreviousPage} disabled={currentPage === 0}>
//                     Previous
//                 </button>
//                 <span>
//                     Page {currentPage + 1} of {Math.ceil(books.length / booksPerPage)}
//                 </span>
//                 <button onClick={handleNextPage} disabled={endIndex >= books.length}>
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Profile;


import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
    const [profile, setProfile] = useState(null);
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const booksPerPage = 10;

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            console.error('User ID or token not found in local storage');
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Fetch user profile
        fetch(`http://localhost:8080/api/users/${userId}`, { headers })
            .then(response => response.json())
            .then(data => setProfile(data))
            .catch(error => console.error('Error fetching profile:', error));

        // Fetch borrowed books
        fetch(`http://localhost:8080/api/loans/user/${userId}`, { headers })
            .then(response => response.json())
            .then(data => {
                const activeBooks = data.filter(book => book.status === 'ACTIVE');
                const bookPromises = activeBooks.map(book =>
                    fetch(`http://localhost:8080/api/books/${book.bookId}`, { headers })
                        .then(response => response.json())
                        .then(bookData => ({ ...book, title: bookData.title }))
                );
                return Promise.all(bookPromises);
            })
            .then(booksWithTitles => setBooks(booksWithTitles))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    // Calculate the current slice of books to display
    const startIndex = currentPage * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const currentBooks = books.slice(startIndex, endIndex);

    // Handle returning a book
    const handleReturnBook = (loanId) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        fetch(`http://localhost:8080/api/loans/return/${loanId}`, { method: 'PUT', headers })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'RETURNED') {
                    window.location.reload(); // Refresh the page
                }
            })
            .catch(error => console.error('Error returning book:', error));
    };

    // Handle pagination
    const handleNextPage = () => {
        if (endIndex < books.length) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div className="profile-info">
                <p><strong>First Name:</strong> {profile.firstName}</p>
                <p><strong>Last Name:</strong> {profile.lastName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
            </div>
            <h2>Borrowed Books</h2>
            {currentBooks.length > 0 ? (
                <ul className="books-list">
                    {currentBooks.map((book) => (
                        <li key={book.id} className="book-item">
                            <span className="book-title">{book.title}</span>
                            <span className="book-dates">
                                <strong>Checkout Date:</strong> {new Date(book.checkoutDate).toLocaleString()}<br />
                                <strong>Due Date:</strong> {new Date(book.dueDate).toLocaleString()}
                            </span>
                            <button onClick={() => handleReturnBook(book.id)}>Return</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books borrowed.</p>
            )}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                    Previous
                </button>
                <span>
                    Page {currentPage + 1} of {Math.ceil(books.length / booksPerPage)}
                </span>
                <button onClick={handleNextPage} disabled={endIndex >= books.length}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Profile;