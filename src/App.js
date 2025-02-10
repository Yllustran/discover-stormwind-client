import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import CategoryListPage from './components/pages/categories/CategoryListPage';
import CategoryCreatePage from './components/pages/categories/CategoryCreatePage';
import CategoryUpdatePage from './components/pages/categories/CategoryUpdatePage';
import Logout from './components/modules/logout/Logout';
import Navigation from './components/modules/navigation/Navigation';
import ProtectedRoute from "./components/modules/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />

        {/* Routes protégées */}
        <Route element={<ProtectedRoute />}>
          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/categories/new" element={<CategoryCreatePage />} />
          <Route path="/categories/edit/:id" element={<CategoryUpdatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
