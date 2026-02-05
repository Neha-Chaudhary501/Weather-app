import { useState } from 'react';
import Signup from './Signup';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="main-container">
      <header>
        <button className="open-btn" onClick={()=>setIsModalOpen(true)}>
          Sign Up Now
        </button>
      </header>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <Signup />
          </div>
        </div>
      )}

      <footer>
        <p>Working</p>
      </footer>
    </div>
  );
}

export default App; 