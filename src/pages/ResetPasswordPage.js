import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

function ResetPasswordPage() {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { newPassword });
            setMessage(response.data.message);
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error resetting password");
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Update Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetPasswordPage;
