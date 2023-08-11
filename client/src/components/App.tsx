import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

const NavBar = lazy(() => import('./NavBar'));
const Loading = lazy(() => import('./Loading'));
const HomePage = lazy(() => import('../views/HomePage'));
const MainPage = lazy(() => import('../views/MainPage'));
const Dashboard = lazy(() => import('../views/Dashboard'));
const AboutPage = lazy(() => import('../views/AboutPage'));
const LoginPage = lazy(() => import('../views/LoginPage'));
const SignupPage = lazy(() => import('../views/SignupPage'));

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={<Loading minWidth="min-w-screen" minHeight="min-h-screen" />}
      >
        <NavBar />
      </Suspense>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <Loading minWidth="min-w-screen" minHeight="min-h-screen" />
              }
            >
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/jobs"
          element={
            <Suspense
              fallback={
                <Loading minWidth="min-w-screen" minHeight="min-h-screen" />
              }
            >
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense
              fallback={
                <Loading minWidth="min-w-screen" minHeight="min-h-screen" />
              }
            >
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense
              fallback={
                <Loading minWidth="min-w-screen" minHeight="min-h-screen" />
              }
            >
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense
              fallback={
                <Loading minWidth="min-w-screen" minHeight="min-h-screen" />
              }
            >
              <SignupPage />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense
              fallback={
                <Loading minWidth="min-w-screen" minHeight="min-h-screen" />
              }
            >
              <Dashboard />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
