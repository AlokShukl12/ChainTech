import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AccountPage = () => {
  const { currentUser, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name,
        email: currentUser.email,
        password: '',
        confirmPassword: '',
      });
    }
  }, [currentUser]);

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

    if (!trimmedName || !trimmedEmail) {
      setError('Name and email are required.');
      return;
    }

    if (!/^[^@\s]+@gmail\.com$/i.test(trimmedEmail)) {
      setError('Email must be a gmail.com address.');
      return;
    }

    if (trimmedPassword) {
      if (!/^\d{6}$/.test(trimmedPassword)) {
        setError('New password must be exactly 6 digits.');
        return;
      }

      if (trimmedPassword !== trimmedConfirmPassword) {
        setError('Passwords must match.');
        return;
      }
    }

    if (!trimmedPassword && trimmedConfirmPassword) {
      setError('Enter a new password before confirming it.');
      return;
    }

    try {
      updateProfile({
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });
      setSuccess('Profile updated successfully.');
      setForm((prev) => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (err) {
      setError(err.message);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h2 className="h5 fw-bold mb-3">Account overview</h2>
              <p className="text-muted small mb-4">
                You are working with a local account. Changes stay in this browser.
              </p>
              <div className="mb-3">
                <div className="text-muted small">Name</div>
                <div className="fw-semibold">{currentUser.name}</div>
              </div>
              <div className="mb-3">
                <div className="text-muted small">Email</div>
                <div className="fw-semibold">{currentUser.email}</div>
              </div>
              <div className="alert alert-primary mb-0" role="alert">
                Tip: Update your email to see how duplicate checking works.
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h5 fw-bold mb-3">Edit profile</h2>
              <p className="text-muted mb-4">Update your personal information and credentials.</p>

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
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label fw-semibold">
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control form-control-lg"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control form-control-lg"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label fw-semibold">
                      New password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Leave blank to keep current password"
                      value={form.password}
                      onChange={handleChange}
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
                      placeholder="Re-enter new password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Save changes
                  </button>
                  <span className="text-muted small">
                    Your updates save instantly to this browser.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
