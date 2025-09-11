// Authentication utility functions

interface User {
  email: string;
  password: string;
}

const USERS_STORAGE_KEY = 'links-in-users';

// Save a new user to local storage
export const registerUser = (email: string, password: string): void => {
  try {
    const users = getUsers();
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      throw new Error('User already exists');
    }
    
    users.push({ email, password });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

// Get all users from local storage
export const getUsers = (): User[] => {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// Verify user credentials
export const verifyCredentials = (email: string, password: string): boolean => {
  try {
    const users = getUsers();
    const user = users.find(user => user.email === email);
    
    if (!user) {
      return false;
    }
    
    return user.password === password;
  } catch (error) {
    console.error('Error verifying credentials:', error);
    return false;
  }
};