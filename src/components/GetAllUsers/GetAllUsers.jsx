import { useState, useEffect } from "react";
import axios from "axios";
import "./GetAllUsers.css";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsersAndLoans = async () => {
      try {
        const token = localStorage.getItem("token");
        const usersResponse = await axios.get(
          "http://localhost:8080/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(usersResponse.data);

        // Fetch borrowed books for each user
        const loansPromises = usersResponse.data.map(async (user) => {
          const loansResponse = await axios.get(
            `http://localhost:8080/api/loans/user/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Fetch book details for each loan
          const booksPromises = loansResponse.data.map(async (loan) => {
            const bookResponse = await axios.get(
              `http://localhost:8080/api/books/${loan.bookId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return { ...loan, title: bookResponse.data.title };
          });

          const booksData = await Promise.all(booksPromises);
          return { userId: user.id, loans: booksData };
        });

        const loansData = await Promise.all(loansPromises);
        const loansMap = loansData.reduce((acc, { userId, loans }) => {
          acc[userId] = loans;
          return acc;
        }, {});

        setBorrowedBooks(loansMap);
      } catch (error) {
        console.error("Error fetching users or borrowed books:", error);
      }
    };
    fetchUsersAndLoans();
  }, []);

  // Function to filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.toString().includes(searchQuery)
  );

  return (
    <div className="users-container">
      <h2 className="title">All Users</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Email or User ID..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="user-list">
        {filteredUsers.length === 0 ? (
          <p className="no-users">No users found.</p>
        ) : (
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id} className="user-card">
                <div className="user-info">
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>

                {/* Borrowed Books Section */}
                <details className="borrowed-books">
                  <summary>Borrowed Books ({borrowedBooks[user.id]?.length || 0})</summary>
                  <ul className="borrowed-books-list">
                    {borrowedBooks[user.id]?.length > 0 ? (
                      borrowedBooks[user.id].map((loan, index) => (
                        <li key={index} className="borrowed-book-item">
                          <span className="book-title">{loan.title}</span>
                          <span className="due-date">(Due: {loan.dueDate.slice(0, 10)})</span>
                        </li>
                      ))
                    ) : (
                      <p className="no-books">No books borrowed.</p>
                    )}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GetAllUsers;