import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>To-Do List App</h1>
        <Routes>
          <Route path="/register" element={isAuthenticated ? <Navigate to="/tasks" /> : <Register />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/tasks" /> : <Login />} />
          <Route
            path="/tasks"
            element={
              isAuthenticated ? (
                <>
                  <TaskForm onTaskAdded={(task) => window.location.reload()} />
                  <TaskList />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;