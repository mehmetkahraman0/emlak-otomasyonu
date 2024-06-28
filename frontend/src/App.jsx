import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/Admin/AdminPage'
import EstateList from './pages/EstateList'
import CreateEstatePage from './pages/Admin/CreateEstatePage'
import { useSelector } from 'react-redux'
import AboutPage from './pages/AboutPage'

function App() {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ProfilePage />} path="/profile" />
        <Route element={<AdminPage />} path="/admin" />
        <Route element={<CreateEstatePage />} path="/admin/createestate" />
        <Route element={<HomePage />} path="/" />
        <Route element={<EstateList />} path="estatelist" />
        <Route element={<AboutPage />} path="/about" />

      </Routes>
    </>
  )
}

export default App
