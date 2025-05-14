'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

type Snippet = {
	id: string
	title: string
	description: string
	code: string
	language: string
}

type Category = {
	id: string
	name: string
	snippets: Snippet[]
}

export default function CodeSnippets() {
	const [activeCategory, setActiveCategory] = useState('auth')
	const [copiedId, setCopiedId] = useState<string | null>(null)

	const copyToClipboard = (text: string, id: string) => {
		navigator.clipboard.writeText(text)
		setCopiedId(id)
		setTimeout(() => setCopiedId(null), 2000)
	}

	const categories: Category[] = [
		{
			id: 'auth',
			name: 'Authentication',
			snippets: [
				{
					id: 'jwt-auth',
					title: 'JWT Authentication',
					description: 'Simple JWT authentication implementation with Express',
					language: 'javascript',
					code: `// JWT Authentication with Express
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// Secret key for JWT
const SECRET_KEY = 'your-secret-key';

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // In a real app, validate credentials against database
  if (username === 'admin' && password === 'password') {
    // Create token
    const token = jwt.sign(
      { userId: 1, username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
				},
				{
					id: 'firebase-auth',
					title: 'Firebase Authentication',
					description: 'Firebase authentication with React',
					language: 'jsx',
					code: `// Firebase Authentication with React
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut 
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function AuthExample() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    
    return () => unsubscribe();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
    
    setLoading(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
    
    setLoading(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Logged in as: {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <form>
          <h2>Firebase Authentication</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div>
            <button 
              onClick={handleSignIn} 
              disabled={loading}
            >
              Sign In
            </button>
            <button 
              onClick={handleSignUp} 
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AuthExample;`,
				},
			],
		},
		{
			id: 'database',
			name: 'Database',
			snippets: [
				{
					id: 'mongoose-crud',
					title: 'Mongoose CRUD Operations',
					description: 'Basic CRUD operations with Mongoose and MongoDB',
					language: 'javascript',
					code: `// Mongoose CRUD Operations
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Define a schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

// Create a model
const User = mongoose.model('User', userSchema);

// CREATE: Create a new user
async function createUser(userData) {
  try {
    const user = new User(userData);
    const result = await user.save();
    console.log('User created:', result);
    return result;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
}

// READ: Get all users
async function getAllUsers() {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    console.log('All users:', users);
    return users;
  } catch (error) {
    console.error('Error getting users:', error.message);
    throw error;
  }
}

// READ: Get user by ID
async function getUserById(id) {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    console.log('User found:', user);
    return user;
  } catch (error) {
    console.error('Error getting user:', error.message);
    throw error;
  }
}

// UPDATE: Update user
async function updateUser(id, updateData) {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!user) throw new Error('User not found');
    console.log('User updated:', user);
    return user;
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw error;
  }
}

// DELETE: Delete user
async function deleteUser(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('User not found');
    console.log('User deleted:', user);
    return user;
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }
}

// Example usage
async function runExample() {
  try {
    // Create a user
    const newUser = await createUser({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    });
    
    // Get all users
    const allUsers = await getAllUsers();
    
    // Get user by ID
    const user = await getUserById(newUser._id);
    
    // Update user
    const updatedUser = await updateUser(newUser._id, { age: 31 });
    
    // Delete user
    await deleteUser(newUser._id);
    
  } catch (error) {
    console.error('Example failed:', error.message);
  } finally {
    // Close the connection when done
    mongoose.connection.close();
  }
}

// Run the example
// runExample();

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};`,
				},
			],
		},
		{
			id: 'react',
			name: 'React Hooks',
			snippets: [
				{
					id: 'use-local-storage',
					title: 'useLocalStorage Hook',
					description: 'Custom React hook for using localStorage with state',
					language: 'jsx',
					code: `// useLocalStorage Hook
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get stored value from localStorage or use initialValue
  const getStoredValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  };

  // State to store our value
  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  // Listen for changes to the localStorage from other tabs/windows
  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key === key) {
        setStoredValue(JSON.parse(event.newValue || JSON.stringify(initialValue)));
      }
    }
    
    // Add event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}

// Example usage:
function App() {
  const [name, setName] = useLocalStorage('name', 'John Doe');
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <h1>Hello, {name}!</h1>
      
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      
      <div>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          Dark Mode
        </label>
      </div>
    </div>
  );
}

export default useLocalStorage;`,
				},
				{
					id: 'use-fetch',
					title: 'useFetch Hook',
					description:
						'Custom React hook for data fetching with loading and error states',
					language: 'jsx',
					code: `// useFetch Hook
import { useState, useEffect, useCallback } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to manually refetch data
  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

// Example usage:
function UserList() {
  const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Users</h1>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {data?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default useFetch;`,
				},
			],
		},
	]

	return (
		<div className='space-y-6'>
			<div className='flex-1 prose text-white  max-w-none'>
				<h1 className='text-white'>Code Snippets Collection</h1>
				<p>
					A collection of frequently used code snippets for common tasks in web
					development. Copy and paste these snippets to quickly implement
					functionality in your projects.
				</p>
			</div>

			<div className='flex flex-wrap gap-2'>
				{categories.map(category => (
					<button
						key={category.id}
						onClick={() => setActiveCategory(category.id)}
						className={`px-4 py-2 rounded-md ${
							activeCategory === category.id
								? 'bg-blue-600 text-white'
								: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
						}`}
					>
						{category.name}
					</button>
				))}
			</div>

			<div className='space-y-6'>
				{categories
					.find(category => category.id === activeCategory)
					?.snippets.map(snippet => (
						<div
							key={snippet.id}
							className='border dark:border-gray-700 rounded-lg overflow-hidden bg-slate-600 text-white dark:bg-gray-800 shadow-sm'
						>
							<div className='p-4 border-b dark:border-gray-700'>
								<div className='flex justify-between items-start'>
									<div>
										<h3 className='text-lg font-semibold  dark:text-white'>
											{snippet.title}
										</h3>
										<p className='mt-1 text-sm  dark:text-gray-300'>
											{snippet.description}
										</p>
									</div>
									<button
										onClick={() => copyToClipboard(snippet.code, snippet.id)}
										className='p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'
										aria-label='Copy code'
									>
										{copiedId === snippet.id ? (
											<Check className='h-5 w-5 text-green-500' />
										) : (
											<Copy className='h-5 w-5' />
										)}
									</button>
								</div>
							</div>
							<div className='p-4 bg-gray-800 text-gray-200 overflow-x-auto'>
								<pre className='text-sm'>
									<code>{snippet.code}</code>
								</pre>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}
