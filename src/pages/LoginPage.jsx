import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const trimmedEmail = form.email.trim();
    const trimmedPassword = form.password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError('Please enter both email and password.');
      return;
    }

    if (!/^[^@\s]+@gmail\.com$/i.test(trimmedEmail)) {
      setError('Email must be a gmail.com address.');
      return;
    }

    if (!/^\d{6}$/.test(trimmedPassword)) {
      setError('Password must be exactly 6 digits.');
      return;
    }

    try {
      login(trimmedEmail, trimmedPassword);
      setSuccess('Welcome back! Redirecting to your account...');
      setTimeout(() => navigate('/account'), 400);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h1 className="h3 fw-bold mb-3">Login</h1>
              <p className="text-muted mb-4">
                Access your account to review or update your profile details.
              </p>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <div className="form-text">We keep your data local to this browser.</div>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Sign in
                  </button>
                  <div className="text-center text-muted">
                    Need an account?{' '}
                    <Link to="/register" className="fw-semibold">
                      Register here
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
