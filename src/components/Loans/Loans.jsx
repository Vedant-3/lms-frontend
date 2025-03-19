import { useState, useEffect } from "react";
import axios from "axios";
import "./Loans.css"; // Import CSS file

const Loans = () => {
    const [loans, setLoans] = useState([]);
    const [activeLoans, setActiveLoans] = useState([]);
    const [returnedLoans, setReturnedLoans] = useState([]);

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
                <h3>Active Loans</h3>
                <ul className="loans-list">
                    {activeLoans.map((loan) => (
                        <li key={loan.id} className="loan-item">
                            <p><strong>User ID:</strong> {loan.userId}</p>
                            <p><strong>Book ID:</strong> {loan.bookId}</p>
                            <p><strong>Checkout Date:</strong> {loan.checkoutDate.slice(0, 10)}</p>
                            <p><strong>Due Date:</strong> {loan.dueDate.slice(0, 10)}</p>
                            <p><strong>Status:</strong> {loan.status}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Returned Loans */}
            <div className="loans-section">
                <h3>Returned Loans</h3>
                <ul className="loans-list">
                    {returnedLoans.map((loan) => (
                        <li key={loan.id} className="loan-item">
                            <p><strong>User ID:</strong> {loan.userId}</p>
                            <p><strong>Book ID:</strong> {loan.bookId}</p>
                            <p><strong>Checkout Date:</strong> {loan.checkoutDate.slice(0, 10)}</p>
                            <p><strong>Due Date:</strong> {loan.dueDate.slice(0, 10)}</p>
                            <p><strong>Status:</strong> {loan.status}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Loans;