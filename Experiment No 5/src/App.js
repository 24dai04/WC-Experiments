import React, { useState } from "react";
import "./App.css"; // We'll update this CSS shortly

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({}); // State for validation errors
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [submissionMessage, setSubmissionMessage] = useState(""); // State for success/error messages

  const validate = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for the field being typed into
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
    setSubmissionMessage(""); // Clear submission message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionMessage(""); // Clear previous messages
    if (!validate()) {
      setSubmissionMessage("Please correct the errors in the form.");
      return;
    }

    setLoading(true); // Start loading

    // Simulate an API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      // In a real app, you'd send formData to your backend here
      console.log("Registration Data Submitted:", formData);
      setSubmissionMessage("Registration successful! Welcome aboard!");
      setFormData({
        // Optionally reset form after successful submission
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({}); // Clear errors
    } catch (error) {
      console.error("Registration failed:", error);
      setSubmissionMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-header">
        <h2>Create Your Account</h2>
        <p>Join us today and enjoy exclusive benefits!</p>
        <p>Made By Ali Khan - (23AI27)</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        {/* Username Field */}
        <div className={`form-group ${errors.username ? "error" : ""}`}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a unique username"
            aria-describedby="username-error"
          />
          {errors.username && (
            <p className="error-message" id="username-error">
              {errors.username}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className={`form-group ${errors.email ? "error" : ""}`}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            aria-describedby="email-error"
          />
          {errors.email && (
            <p className="error-message" id="email-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className={`form-group ${errors.password ? "error" : ""}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            aria-describedby="password-error"
          />
          {errors.password && (
            <p className="error-message" id="password-error">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className={`form-group ${errors.confirmPassword ? "error" : ""}`}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            aria-describedby="confirmPassword-error"
          />
          {errors.confirmPassword && (
            <p className="error-message" id="confirmPassword-error">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submission Message */}
        {submissionMessage && (
          <p
            className={`submission-message ${
              submissionMessage.includes("successful") ? "success" : "failure"
            }`}
          >
            {submissionMessage}
          </p>
        )}

        {/* Submission Button */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
