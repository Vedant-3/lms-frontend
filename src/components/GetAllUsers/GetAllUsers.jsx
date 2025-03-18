// import { useState, useEffect } from "react";
// // import axios from "axios";
// import "./GetAllUsers.css"; // Import the CSS file

// const GetAllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:5000/api/users") // Update this with your API endpoint
// //       .then((response) => {
// //         setUsers(response.data);
// //         setLoading(false);
// //       })
// //       .catch(() => {
// //         setError("Failed to fetch users");
// //         setLoading(false);
// //       });
// //   }, []);

//   if (loading) return <p className="loading">Loading users...</p>;
//   if (error) return <p className="error">{error}</p>;

//   return (
//     <div className="users-container">
//       <h2 className="title">All Users</h2>
//       <div className="user-list">
//         {users.length === 0 ? (
//           <p className="no-users">No users found.</p>
//         ) : (
//           <ul>
//             {users.map((user) => (
//               <li key={user.id} className="user-card">
//                 <p><strong>Name:</strong> {user.name}</p>
//                 <p><strong>Email:</strong> {user.email}</p>

//                 <details className="borrowed-books">
//                   <summary>Borrowed Books ({user.borrowedBooks.length})</summary>
//                   <ul>
//                     {user.borrowedBooks.length > 0 ? (
//                       user.borrowedBooks.map((book, index) => (
//                         <li key={index}>
//                           {book.title} (Due: {book.dueDate})
//                         </li>
//                       ))
//                     ) : (
//                       <p className="no-books">No books borrowed.</p>
//                     )}
//                   </ul>
//                 </details>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GetAllUsers;



import { useState } from "react";
import "./GetAllUsers.css"; // Import CSS file

const GetAllUsers = () => {
  // Sample users data (instead of fetching from API)
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      borrowedBooks: [
        { title: "The Great Gatsby", dueDate: "2025-04-01" },
        { title: "1984", dueDate: "2025-04-05" }
      ]
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice@example.com",
      borrowedBooks: []
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");

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
                {/* Name and Email in the same line */}
                <div className="user-info">
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>

                {/* Borrowed Books Section */}
                <details className="borrowed-books">
                  <summary>Borrowed Books ({user.borrowedBooks.length})</summary>
                  <ul>
                    {user.borrowedBooks.length > 0 ? (
                      user.borrowedBooks.map((book, index) => (
                        <li key={index}>
                          {book.title} (Due: {book.dueDate})
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

