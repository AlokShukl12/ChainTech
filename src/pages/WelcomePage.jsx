import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const WelcomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container py-5">
      <div className="row g-4 align-items-center">
        <div className="col-lg-7">
          <div className="bg-white rounded-4 shadow-sm border hero-panel p-4 p-md-5">
            <p className="text-uppercase text-primary fw-semibold mb-2 small">
              Account manager
            </p>
            <h1 className="display-6 fw-bold mb-3 text-dark">
              Create, sign in, and manage your account without leaving the page.
            </h1>
            <p className="text-muted mb-4 fs-6">
              Track your sign-ins, edit your profile details, and keep your account information
              organized. Everything is stored locally in your browser for quick demos and testing.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link
                to={currentUser ? '/account' : '/register'}
                className="btn btn-primary btn-lg px-4"
              >
                {currentUser ? 'Go to my account' : 'Create account'}
              </Link>
              <Link
                to={currentUser ? '/account' : '/login'}
                className="btn btn-outline-primary btn-lg px-4"
              >
                {currentUser ? 'Update details' : 'Sign in'}
              </Link>
            </div>
            <div className="d-flex flex-wrap gap-4 mt-4 text-muted small">
              <div className="d-flex align-items-center gap-2">
                <span className="badge rounded-pill bg-primary-subtle text-primary">1</span>
                Register quickly
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="badge rounded-pill bg-primary-subtle text-primary">2</span>
                Log in securely
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="badge rounded-pill bg-primary-subtle text-primary">3</span>
                Edit profile anytime
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="bg-white rounded-4 shadow-sm border p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h5 mb-0">What you can do</h2>
              <span className="badge bg-success-subtle text-success">Live preview</span>
            </div>
            <ul className="list-unstyled mb-4">
              <li className="d-flex align-items-start gap-3 mb-3">
                <span className="text-success fw-bold">•</span>
                <div>
                  <div className="fw-semibold">Local accounts</div>
                  <small className="text-muted">
                    Register multiple test accounts and switch between them as needed.
                  </small>
                </div>
              </li>
              <li className="d-flex align-items-start gap-3 mb-3">
                <span className="text-success fw-bold">•</span>
                <div>
                  <div className="fw-semibold">Quick sign-in</div>
                  <small className="text-muted">
                    Sign in instantly without a backend. All data stays in your browser.
                  </small>
                </div>
              </li>
              <li className="d-flex align-items-start gap-3">
                <span className="text-success fw-bold">•</span>
                <div>
                  <div className="fw-semibold">Edit profile</div>
                  <small className="text-muted">
                    Update your name, email, or password directly from the account page.
                  </small>
                </div>
              </li>
            </ul>
            <div className="alert alert-info mb-0" role="alert">
              This sample is designed for demos. Refreshing the page keeps your data thanks to
              local storage.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
