// src/App.jsx
// ... imports ...
import { AuthProvider, useAuth } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

function App() {
  return (
    <AuthProvider>
      <AuthStatus />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/post/1">Post 1</Link>
        <Link to="/post/2">Post 2</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/post/:id" element={<Post posts={posts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

const AuthStatus = () => {
  const { isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
};

// ... other component definitions ...

const Login = () => {
    const { login } = useAuth();
    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={login}>Log In</button>
        </div>
    );
};

export default App;