import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BorrowPage.css";

const booksData = [
  { id: 1, name: "Hibernate Core ~11th", author: "John Doe", price: 499 },
  { id: 2, name: "React Essentials", author: "Jane Smith", price: 799 },
  { id: 3, name: "Node.js Mastery", author: "Alex Johnson", price: 599 },
];

const BorrowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    // Find the book by ID
    const selectedBook = booksData.find((b) => b.id === parseInt(id));
    setBook(selectedBook);

    // Set Issue Date (Today)
    const today = new Date();
    const formattedIssueDate = today.toISOString().split("T")[0];
    setIssueDate(formattedIssueDate);

    // Set Return Date (2 Weeks Later)
    const returnDay = new Date();
    returnDay.setDate(today.getDate() + 14);
    const formattedReturnDate = returnDay.toISOString().split("T")[0];
    setReturnDate(formattedReturnDate);
  }, [id]);

  const confirmBorrow = () => {
    alert(`Book "${book.name}" borrowed successfully!`);
    navigate("/");
  };

  if (!book) {
    return <h2 className="borrow-error">Book not found!</h2>;
  }

  return (
    <div className="borrow-container">
      <h2 className="borrow-title">Borrow Book</h2>
      <div className="book-details">
        <p><strong>Title:</strong> {book.name}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Quantity:</strong> 1</p>
        <p><strong>Issue Date:</strong> {issueDate}</p>
        <p><strong>Return Date:</strong> {returnDate}</p>
      </div>
      <button className="confirm-button" onClick={confirmBorrow}>
        Confirm Borrow
      </button>
    </div>
  );
};

export default BorrowPage;
