import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loans, setLoans] = useState([]);
  const [fines, setFines] = useState([]);
  const [bookTitles, setBookTitles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        // Get user info from token
        const userResponse = await axios.get(`http://localhost:8080/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userResponse.data);

        // Fetch user's loans
        const loansResponse = await axios.get(`http://localhost:8080/api/loans/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userLoans = loansResponse.data;
        setLoans(userLoans);

        // Fetch all book titles for the loans
        const titles = {};
        for (const loan of userLoans) {
          try {
            const bookResponse = await axios.get(`http://localhost:8080/api/books/${loan.bookId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            titles[loan.bookId] = bookResponse.data.title;
          } catch (bookErr) {
            console.error(`Error fetching book details for ID ${loan.bookId}:`, bookErr);
            titles[loan.bookId] = 'Unknown Book';
          }
        }
        setBookTitles(titles);

        // For each loan, fetch the associated fine
        const allFines = [];
        for (const loan of userLoans) {
          try {
            const fineResponse = await axios.get(`http://localhost:8080/api/fines/${loan.id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (fineResponse.data) {
              // Add the loan information to the fine object for display purposes
              const fineWithLoan = { 
                ...fineResponse.data, 
                loanInfo: loan 
              };
              allFines.push(fineWithLoan);
            }
          } catch (fineErr) {
            // If no fine exists for this loan, just continue
            console.log(`No fine found for loan ${loan.id} or error fetching:`, fineErr);
          }
        }
        setFines(allFines);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile data. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>

      {user && (
        <div className="profile-details">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{user.firstName} {user.lastName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Role:</span>
                <span className="info-value">{user.role}</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Borrowed Books</h2>
            {loans.length > 0 ? (
              <div className="loans-table-container">
                <table className="loans-table">
                  <thead>
                    <tr>
                      <th>Loan ID</th>
                      <th>Book Title</th>
                      <th>Checkout Date</th>
                      <th>Due Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((loan) => (
                      <tr key={loan.id}>
                        <td>{loan.id}</td>
                        <td>{bookTitles[loan.bookId] || 'Loading...'}</td>
                        <td>{formatDate(loan.checkoutDate)} {formatTime(loan.checkoutDate)}</td>
                        <td>{formatDate(loan.dueDate)} {formatTime(loan.dueDate)}</td>
                        <td className={loan.status === 'ACTIVE' ? 'status-active' : 'status-returned'}>
                          {loan.status}     
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-loans">You haven't borrowed any books yet.</p>
            )}
          </div>

          <div className="profile-section">
            <h2>Fines</h2>
            {fines.length > 0 ? (
              <div className="fines-table-container">
                <table className="fines-table">
                  <thead>
                    <tr>
                      <th>Fine ID</th>
                      <th>Loan ID</th>
                      <th>Book Title</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fines.map((fine) => (
                      <tr key={fine.id}>
                        <td>{fine.id}</td>
                        <td>{fine.loanInfo.id}</td>
                        <td>{bookTitles[fine.loanInfo.bookId] || 'Loading...'}</td>
                        <td>${fine.amount}</td>
                        <td className={fine.status === 'PAID' ? 'status-paid' : 'status-unpaid'}>
                          {fine.status}
                        </td>
                        <td>
                          {fine.status === 'UNPAID' && (
                            <button 
                              className="pay-button"
                              onClick={() => navigate(`/payment/${fine.loanInfo.id}`)}
                            >
                              Pay Now
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-fines">You don't have any outstanding fines.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;