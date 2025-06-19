import './App.css'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { Signup } from './pages/Signup'
import { BrowserRouter ,Routes ,Route } from 'react-router-dom'
import { Settings } from './pages/Settings'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Signin />} />
        <Route path="/settings" element={<Settings />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App
