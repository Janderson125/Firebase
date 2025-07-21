import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import TaskDashboard from './components/TaskDashboard'
import TaskDetail from './components/TaskDetail'
import TaskForm from './components/TaskForm'
import Login from './components/Login'
import Register from './components/Register'
import { TaskProvider } from './contexts/TaskContext'

function App() {
  return (
    <TaskProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<TaskDashboard />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </TaskProvider>
  )
}

export default App
