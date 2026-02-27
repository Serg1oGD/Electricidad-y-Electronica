import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-container">
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App