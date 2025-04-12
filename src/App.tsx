import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewClaim from './pages/NewClaim';
import PreviousClaims from './pages/PreviousClaims';
import AccountInfo from './pages/AccountInfo';
import ClaimsSubmitted from './pages/ClaimsSubmitted';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-claim" element={<NewClaim />} />
            <Route path="/previous-claims" element={<PreviousClaims />} />
            <Route path="/account" element={<AccountInfo />} />
            <Route path="/claims-submitted" element={<ClaimsSubmitted />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;