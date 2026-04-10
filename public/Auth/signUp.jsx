import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function SignUp() {
    const [formData , setformData] = React.useState({
        name: "",
        phoneNo: "",
        password: "",
        confirmPassword: ""
    })
    const navigate = useNavigate();    

    const handleChange = (event) => {
        setformData({
            ...formData, [event.target.name]: event.target.value
        })
    }
    const handleSubmit = async (event) => {
         event.preventDefault();
        

        try {
            if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        } else {
            const res = await axios.post("https://6970971b78fec16a63fe3342.mockapi.io/users", formData);
            toast.success("Sign up successful!");
            navigate("/login");
        }
        } catch (error) {
            toast.error("Error during sign-up:", error);
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 font-sans p-4">
        <div className="bg-white p-8 rounded-xl border border-blue-200 shadow-xl w-full max-w-md">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&h=200&auto=format&fit=crop" alt="Corporate Building" className="w-full h-32 object-cover rounded-lg mb-6 shadow-sm" />
            <div className="mb-8 text-center">
                <h1 className="text-xl sm:text-2xl font-bold text-blue-800">TATA Group India</h1>
                <p className="text-sm text-gray-500 mt-1">Register for Digital Rewards Membership</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm mb-1 font-semibold">Name:</label>
                    <input type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors placeholder-gray-400"
                        placeholder="Your Name"
                        required/>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm mb-1 font-semibold">Phone No:</label>
                    <input type="Number"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        autoComplete="off"
                        className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors placeholder-gray-400"
                        placeholder="Your Phone Number"
                        required/>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm mb-1 font-semibold">Password:</label>
                    <input type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="off"
                        className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors placeholder-gray-400"
                        placeholder="Password"
                        required/>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm mb-1 font-semibold">Confirm Password:</label>
                    <input type="password"
                        name="confirmPassword"            
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors placeholder-gray-400"
                        placeholder="Confirm Password"
                        required/>
                </div>
                <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-md transition-all active:scale-95 shadow-md mt-4">
                    Register
                </button>
            </form>
            <div className="mt-6 text-center">
                <Link to="/login" className="text-sm text-blue-700 hover:text-blue-900 transition-colors underline">
                    Already have an account? Login here.
                </Link>
            </div>
        </div>
    </div>
  )
}
