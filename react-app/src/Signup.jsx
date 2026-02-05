import {useState} from 'react';
import './signup.css';
function Signup(){
  const [formData, setFormData]=useState({
    username:'',
    mail:'',
    password:''
  });
  const [status, setStatus]=useState('');

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setStatus('Sending data...');
    try {
      const response=await fetch('http://localhost:3000/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });

      const data=await response.json();

      if(response.ok){
        setStatus(`Success:${data.message}`);
        setFormData({ username:'', mail:'',password:'' });
      } 
      else{
        setStatus(`Error:${data.message}`);
      }
    } catch (err) {
      setStatus('Check if Node.js is running.');
    }
  };

  return(
    <div className="form-card">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label > Name:</label>
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        </div>
      <br />
        <div className="input-group">
           <label > E-Mail:</label>
          <input name="mail" type="email" value={formData.mail} onChange={handleChange} placeholder="Email" required />
        </div>
        <br />
        <div className="input-group">
           <label > Password:</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        </div>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      
      {status && <div className="message-box">{status}</div>}
    </div>
  );
}

export default Signup;