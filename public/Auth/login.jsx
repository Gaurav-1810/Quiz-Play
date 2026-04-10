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
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 font-sans p-4">
        <div className="bg-white p-8 rounded-xl border border-blue-200 shadow-xl w-full max-w-md">
            <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=400&h=200&auto=format&fit=crop" alt="Office Space" className="w-full h-32 object-cover rounded-lg mb-6 shadow-sm" />
            <div className="mb-8 text-center">
                <h1 className="text-xl sm:text-2xl font-bold text-blue-800">TATA Group India</h1>
                <p className="text-sm text-gray-500 mt-1">Corporate Member Login</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 text-sm mb-2 font-semibold">Phone No:</label>
                    <input type="number" 
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors placeholder-gray-400"
                        placeholder="Your Phone Number"
                        required/>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm mb-2 font-semibold">Password:</label>
                    <input type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors placeholder-gray-400"
                        placeholder="Password"
                        required/>
                </div>
                <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-md transition-all active:scale-95 shadow-md">
                    Login
                </button>
            </form>
            <div className="mt-6 text-center">
                <Link to="/" className="text-sm text-blue-700 hover:text-blue-900 transition-colors underline">
                    Don't have an account? Register here.
                </Link>
            </div>
        </div>
    </div>
  )
}
