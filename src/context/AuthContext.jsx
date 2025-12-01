import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEYS = {
  accounts: 'account_manager:accounts',
  currentUserEmail: 'account_manager:current_user_email',
};

const AuthContext = createContext(null);

const parseStoredAccounts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.accounts);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const normalizeEmail = (email = '') => email.trim().toLowerCase();
const isGmailAddress = (email = '') => /^[^@\s]+@gmail\.com$/i.test(email.trim());
const isSixDigitPassword = (password = '') => /^\d{6}$/.test(password.trim());

export const AuthProvider = ({ children }) => {
  const [accounts, setAccounts] = useState(parseStoredAccounts);
  const [currentUserEmail, setCurrentUserEmail] = useState(
    () => localStorage.getItem(STORAGE_KEYS.currentUserEmail) || ''
  );

  const currentUser = useMemo(() => {
    if (!currentUserEmail) return null;
    const normalized = normalizeEmail(currentUserEmail);
    return accounts.find((account) => normalizeEmail(account.email) === normalized) || null;
  }, [accounts, currentUserEmail]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.accounts, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (currentUserEmail) {
      localStorage.setItem(STORAGE_KEYS.currentUserEmail, currentUserEmail);
    } else {
      localStorage.removeItem(STORAGE_KEYS.currentUserEmail);
    }
  }, [currentUserEmail]);

  const register = ({ name, email, password }) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const normalizedEmail = normalizeEmail(email);
    const sanitizedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !sanitizedPassword) {
      throw new Error('Please fill in name, email, and password.');
    }

    if (!isGmailAddress(trimmedEmail)) {
      throw new Error('Email must be a gmail.com address.');
    }

    if (!isSixDigitPassword(sanitizedPassword)) {
      throw new Error('Password must be exactly 6 digits.');
    }

    const duplicate = accounts.find(
      (account) => normalizeEmail(account.email) === normalizedEmail
    );
    if (duplicate) {
      throw new Error('An account with that email already exists.');
    }

    const newAccount = {
      name: trimmedName,
      email: trimmedEmail,
      password: sanitizedPassword,
    };

    setAccounts((prev) => [...prev, newAccount]);
    setCurrentUserEmail(trimmedEmail);
  };

  const login = (email, password) => {
    const trimmedEmail = email.trim();
    const sanitizedPassword = password.trim();

    if (!isGmailAddress(trimmedEmail)) {
      throw new Error('Email must be a gmail.com address.');
    }

    if (!isSixDigitPassword(sanitizedPassword)) {
      throw new Error('Password must be exactly 6 digits.');
    }

    const normalizedEmail = normalizeEmail(trimmedEmail);
    const account = accounts.find(
      (item) => normalizeEmail(item.email) === normalizedEmail
    );

    if (!account) {
      throw new Error('No account found with that email.');
    }

    if (account.password !== sanitizedPassword) {
      throw new Error('Incorrect password. Please try again.');
    }

    setCurrentUserEmail(account.email);
  };

  const logout = () => {
    setCurrentUserEmail('');
  };

  const updateProfile = ({ name, email, password }) => {
    if (!currentUser) {
      throw new Error('You need to be signed in to edit your profile.');
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const normalizedCurrentEmail = normalizeEmail(currentUser.email);
    const normalizedNextEmail = normalizeEmail(trimmedEmail);

    if (!trimmedName || !trimmedEmail) {
      throw new Error('Name and email cannot be empty.');
    }

    if (!isGmailAddress(trimmedEmail)) {
      throw new Error('Email must be a gmail.com address.');
    }

    if (normalizedNextEmail !== normalizedCurrentEmail) {
      const conflict = accounts.find(
        (account) => normalizeEmail(account.email) === normalizedNextEmail
      );
      if (conflict) {
        throw new Error('Another account already uses that email.');
      }
    }

    const sanitizedPassword = password?.trim();
    if (sanitizedPassword && !isSixDigitPassword(sanitizedPassword)) {
      throw new Error('New password must be exactly 6 digits.');
    }

    const nextPassword = sanitizedPassword ? sanitizedPassword : currentUser.password;

    setAccounts((prev) =>
      prev.map((account) =>
        normalizeEmail(account.email) === normalizedCurrentEmail
          ? {
              ...account,
              name: trimmedName,
              email: trimmedEmail,
              password: nextPassword,
            }
          : account
      )
    );
    setCurrentUserEmail(trimmedEmail);
  };

  const value = {
    accounts,
    currentUser,
    register,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
