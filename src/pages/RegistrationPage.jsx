import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegistrationPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedPassword = form.password.trim();
    const trimmedConfirmPassword = form.confirmPassword.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setError('Please fill out all required fields.');
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

    if (trimmedPassword !== trimmedConfirmPassword) {
      setError('Passwords must match.');
      return;
    }

    try {
      register({
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });
      setSuccess('Account created! Redirecting to your profile...');
      setTimeout(() => navigate('/account'), 400);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h1 className="h3 fw-bold mb-3">Create an account</h1>
              <p className="text-muted mb-4">
                Sign up to test the account flow and immediately manage your details.
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

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="name" className="form-label fw-semibold">
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Alex Johnson"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
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
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label fw-semibold">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Create a password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label fw-semibold">
                      Confirm password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Re-enter password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="d-grid gap-2 mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Create account
                  </button>
                  <div className="text-center text-muted">
                    Already have an account?{' '}
                    <Link to="/login" className="fw-semibold">
                      Log in
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

export default RegistrationPage;
