import { useState } from "react"    
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
export default function Login() {
    const [formData , setformData]= useState({
        phoneNo : "",
        password : ""
    })
    const navigate = useNavigate();
    
    function handleChange(e) {
        setformData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    
    
  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
        if (!formData.phoneNo || !formData.password) {
       
            toast.error('Please fill in all fields');
    }else {
        
      const res = await axios.get('https://6970971b78fec16a63fe3342.mockapi.io/users');
      const user = res.data.find(
        (u) => 
          String(u.phoneNo) === String(formData.phoneNo) && 
          String(u.password) === String(formData.password)
      );

      if (user) {
        toast.success('Login successful!');
        navigate('/dashboard');
      }else {
        toast.error('Invalid credentials');
      }
    }}
    
    
    catch (error) {
      toast.error('An error occurred during login.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50 font-sans p-4">
        <div className="bg-white p-8 rounded-xl border border-purple-300 shadow-lg w-full max-w-md">
            <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400&h=200&auto=format&fit=crop" alt="Login Illustration" className="w-full h-32 object-cover rounded-lg mb-6 shadow-sm" />
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-purple-700">Welcome to Unlimited Money Hack</h1>
                <p className="text-sm text-gray-500 mt-1">Please log in to your account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 text-sm mb-2 font-semibold">Phone No:</label>
                    <input type="number" 
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors placeholder-gray-400"
                        placeholder="Your Phone Number"
                        required/>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm mb-2 font-semibold">Password:</label>
                    <input type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors placeholder-gray-400"
                        placeholder="Password"
                        required/>
                </div>
                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-md transition-all active:scale-95 shadow-md">
                    Login
                </button>
            </form>
            <div className="mt-6 text-center">
                <Link to="/sign-up" className="text-sm text-purple-600 hover:text-purple-800 transition-colors underline">
                    Don't have an account? Register here.
                </Link>
            </div>
        </div>
    </div>
  )
}
