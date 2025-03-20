import { useState, useEffect } from "react";
import axios from "axios";
import "./Loans.css"; // Import CSS file

const Loans = () => {
    const [loans, setLoans] = useState([]);
    const [activeLoans, setActiveLoans] = useState([]);
    const [returnedLoans, setReturnedLoans] = useState([]);
    const [showActiveLoans, setShowActiveLoans] = useState(false);
    const [showReturnedLoans, setShowReturnedLoans] = useState(false);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "http://localhost:8080/api/loans",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setLoans(response.data);

                const active = response.data.filter(loan => loan.status === "ACTIVE");
                const returned = response.data.filter(loan => loan.status === "RETURNED");

                setActiveLoans(active);
                setReturnedLoans(returned);
            } catch (error) {
                console.error("Error fetching loans:", error);
            }
        };
        fetchLoans();
    }, []);

    const sortLoansByDueDate = (loans, setLoans) => {
        const sortedLoans = [...loans].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        setLoans(sortedLoans);
    };

    return (
        <div className="loans-container">
            <h2 className="title">All Loans</h2>

            {/* Visualization for total active and returned loans */}
            <div className="loans-summary">
                <div className="summary-item">
                    <h3>Active Loans</h3>
                    <p className="count">{activeLoans.length}</p>
                </div>
                <div className="summary-item">
                    <h3>Returned Loans</h3>
                    <p className="count">{returnedLoans.length}</p>
                </div>
            </div>

            {/* Active Loans */}
            <div className="loans-section">
                <div className="dropdown-header" onClick={() => setShowActiveLoans(!showActiveLoans)}>
                    Active Loans
                    <button className="dropdown-button">{showActiveLoans ? '▲' : '▼'}</button>
                </div>
                {showActiveLoans && (
                    <>
                        <button className="sort-button" onClick={() => sortLoansByDueDate(activeLoans, setActiveLoans)}>
                            Sort by Due Date
                        </button>
                        <ul className="loans-list">
                            {activeLoans.slice(0, 3).map((loan) => (
                                <li key={loan.id} className="loan-item">
                                    <div className="loan-info-left">
                                        <p><strong>User ID:</strong> {loan.userId}</p>
                                        <p><strong>Book ID:</strong> {loan.bookId}</p>
                                    </div>
                                    <div className="loan-info-right">
                                        <p><strong>Checkout Date:</strong> {loan.checkoutDate.slice(0, 10)}</p>
                                        <p><strong>Due Date:</strong> {loan.dueDate.slice(0, 10)}</p>
                                    </div>
                                    <p className={`loan-status ${loan.status.toLowerCase()}`}>
                                        <strong>Status:</strong> {loan.status}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        {activeLoans.length > 3 && (
                            <div className="scrollable-loans">
                                {activeLoans.slice(3).map((loan) => (
                                    <li key={loan.id} className="loan-item">
                                        <div className="loan-info-left">
                                            <p><strong>User ID:</strong> {loan.userId}</p>
                                            <p><strong>Book ID:</strong> {loan.bookId}</p>
                                        </div>
                                        <div className="loan-info-right">
                                            <p><strong>Checkout Date:</strong> {loan.checkoutDate.slice(0, 10)}</p>
                                            <p><strong>Due Date:</strong> {loan.dueDate.slice(0, 10)}</p>
                                        </div>
                                        <p className={`loan-status ${loan.status.toLowerCase()}`}>
                                            <strong>Status:</strong> {loan.status}
                                        </p>
                                    </li>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Returned Loans */}
            <div className="loans-section">
                <div className="dropdown-header" onClick={() => setShowReturnedLoans(!showReturnedLoans)}>
                    Returned Loans
                    <button className="dropdown-button">{showReturnedLoans ? '▲' : '▼'}</button>
                </div>
                {showReturnedLoans && (
                    <>
                        <button className="sort-button" onClick={() => sortLoansByDueDate(returnedLoans, setReturnedLoans)}>
                            Sort by Due Date
                        </button>
                        <ul className="loans-list">
                            {returnedLoans.slice(0, 3).map((loan) => (
                                <li key={loan.id} className="loan-item">
                                    <div className="loan-info-left">
                                        <p><strong>User ID:</strong> {loan.userId}</p>
                                        <p><strong>Book ID:</strong> {loan.bookId}</p>
                                    </div>
                                    <div className="loan-info-right">
                                        <p><strong>Checkout Date:</strong> {loan.checkoutDate.slice(0, 10)}</p>
                                        <p><strong>Due Date:</strong> {loan.dueDate.slice(0, 10)}</p>
                                    </div>
                                    <p className={`loan-status ${loan.status.toLowerCase()}`}>
                                        <strong>Status:</strong> {loan.status}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        {returnedLoans.length > 3 && (
                            <div className="scrollable-loans">
                                {returnedLoans.slice(3).map((loan) => (
                                    <li key={loan.id} className="loan-item">
                                        <div className="loan-info-left">
                                            <p><strong>User ID:</strong> {loan.userId}</p>
                                            <p><strong>Book ID:</strong> {loan.bookId}</p>
                                        </div>
                                        <div className="loan-info-right">
                                            <p><strong>Checkout Date:</strong> {loan.checkoutDate.slice(0, 10)}</p>
                                            <p><strong>Due Date:</strong> {loan.dueDate.slice(0, 10)}</p>
                                        </div>
                                        <p className={`loan-status ${loan.status.toLowerCase()}`}>
                                            <strong>Status:</strong> {loan.status}
                                        </p>
                                    </li>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Loans;