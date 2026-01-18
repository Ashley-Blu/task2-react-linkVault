/**
 * Authentication utility module for Links-in application
 *
 * This module provides functions for:
 * - User registration and credential verification
 * - Password reset functionality with token-based validation
 * - User data management via browser local storage
 *
 * @module utils/auth
 */

/**
 * Represents a user in the application
 * @interface User
 * @property {string} email - User's email address
 * @property {string} password - User's password
 * @property {string} [resetToken] - Optional password reset token
 * @property {number} [resetTokenExpiry] - Expiration timestamp for reset token (1 hour)
 */
interface User {
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: number;
}

/** Local storage key for persisting user data */
const USERS_STORAGE_KEY = "links-in-users";

/**
 * Registers a new user with email and password after validation
 *
 * @function registerUser
 * @param {string} email - User's email address
 * @param {string} password - User's password (stored in plain text)
 * @returns {Object} Registration result object with success and error properties
 *
 * @example
 * const result = registerUser('user@example.com', 'securePassword123');
 * if (result.success) {
 *   // Navigate to login page
 * }
 */
export const registerUser = (
  email: string,
  password: string,
): { success: boolean; error: string } => {
  try {
    const users = getUsers();

    // Check if user already exists
    if (users.some((user) => user.email === email)) {
      return {
        success: false,
        error: "Email already exists. Please use a different email",
      };
    }

    users.push({ email, password });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return { success: true, error: "" };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      error: "An error occurred during registration. Please try again.",
    };
  }
};

/**
 * Retrieves all registered users from local storage
 *
 * @function getUsers
 * @returns {User[]} Array of all registered users
 * @returns {User[]} Empty array if no users exist or on error
 *
 * @example
 * const users = getUsers();
 * console.log(users.length); // Number of registered users
 */
export const getUsers = (): User[] => {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error("Error getting users:", error);
    return [];
  }
};

/**
 * Validates signup form inputs with comprehensive checks
 *
 * Performs validation for email format, password strength, and uniqueness
 *
 * @function validateSignup
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @param {string} confirmPassword - Password confirmation
 * @returns {Object} Validation result with valid flag and error message
 *
 * @example
 * const result = validateSignup('user@example.com', 'pass123', 'pass123');
 */
export const validateSignup = (
  email: string,
  password: string,
  confirmPassword: string,
): { valid: boolean; error: string } => {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  // Validate password length
  if (!password || password.length < 6) {
    return {
      valid: false,
      error: "Password must be at least 6 characters long",
    };
  }

  // Validate passwords match
  if (password !== confirmPassword) {
    return { valid: false, error: "Passwords do not match" };
  }

  // Check if user already exists
  const users = getUsers();
  if (users.some((user) => user.email === email)) {
    return {
      valid: false,
      error: "Email already exists. Please use a different email",
    };
  }

  return { valid: true, error: "" };
};

/**
 * Verifies user credentials and returns specific error information
 *
 * Distinguishes between email not found and wrong password for better UX
 *
 * @function verifyCredentials
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Object} Result with success and error type ('email', 'password', or '')
 *
 * @example
 * const result = verifyCredentials('user@example.com', 'password123');
 */
export const verifyCredentials = (
  email: string,
  password: string,
): { success: boolean; error: string } => {
  try {
    const users = getUsers();
    const user = users.find((user) => user.email === email);

    if (!user) {
      return { success: false, error: "email" };
    }

    if (user.password !== password) {
      return { success: false, error: "password" };
    }

    return { success: true, error: "" };
  } catch (error) {
    console.error("Error verifying credentials:", error);
    return { success: false, error: "unknown" };
  }
};

/**
 * Generates a cryptographically simple reset token for password recovery
 *
 * Uses Math.random() for token generation. For production, consider using
 * crypto.getRandomValues() or a dedicated crypto library
 *
 * @function generateResetToken
 * @private
 * @returns {string} Random token string (~25 characters)
 */
// Generate a random token for password reset
const generateResetToken = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

/**
 * Initiates password reset process by generating a reset token
 *
 * Creates a reset token valid for 1 hour and stores it with the user.
 * The token should be sent to user's email (future implementation)
 *
 * @function requestPasswordReset
 * @param {string} email - User's email address
 * @returns {Object} Result object containing:
 * @returns {boolean} result.success - Whether reset token was generated
 * @returns {string} [result.token] - Generated reset token (if successful)
 * @returns {string} result.message - Descriptive result message
 *
 * @example
 * const result = requestPasswordReset('user@example.com');
 * if (result.success) {
 *   console.log('Reset token:', result.token);
 * }
 */
// Request a password reset
export const requestPasswordReset = (
  email: string,
): { success: boolean; token?: string; message: string } => {
  try {
    const users = getUsers();
    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex === -1) {
      return { success: false, message: "User not found" };
    }

    const resetToken = generateResetToken();
    const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    users[userIndex] = {
      ...users[userIndex],
      resetToken,
      resetTokenExpiry,
    };

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    return {
      success: true,
      token: resetToken,
      message: "Password reset token generated successfully",
    };
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return { success: false, message: "Error processing request" };
  }
};

/**
 * Completes password reset process by validating token and updating password
 *
 * Verifies reset token validity and expiration, then updates user password.
 * Clears reset token after successful password reset
 *
 * @function resetPassword
 * @param {string} email - User's email address
 * @param {string} token - Password reset token (from requestPasswordReset)
 * @param {string} newPassword - New password to set
 * @returns {Object} Result object containing:
 * @returns {boolean} result.success - Whether password was successfully reset
 * @returns {string} result.message - Descriptive result message
 *
 * @example
 * const result = resetPassword('user@example.com', 'token123', 'newPassword456');
 * if (result.success) {
 *   console.log('Password updated successfully');
 * }
 */
// Reset password with token
export const resetPassword = (
  email: string,
  token: string,
  newPassword: string,
): { success: boolean; message: string } => {
  try {
    const users = getUsers();
    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex === -1) {
      return { success: false, message: "User not found" };
    }

    const user = users[userIndex];

    if (!user.resetToken || user.resetToken !== token) {
      return { success: false, message: "Invalid reset token" };
    }

    if (!user.resetTokenExpiry || user.resetTokenExpiry < Date.now()) {
      return { success: false, message: "Reset token has expired" };
    }

    users[userIndex] = {
      ...user,
      password: newPassword,
      resetToken: undefined,
      resetTokenExpiry: undefined,
    };

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    return { success: true, message: "Password reset successfully" };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { success: false, message: "Error processing request" };
  }
};
