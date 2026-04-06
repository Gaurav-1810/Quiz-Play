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
            navigate("/");
        }
        } catch (error) {
            toast.error("Error during sign-up:", error);
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50 font-sans p-4">
        <div className="bg-white p-8 rounded-xl border border-purple-300 shadow-lg w-full max-w-md">
            <img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=400&h=200&auto=format&fit=crop" alt="Register Illustration" className="w-full h-32 object-cover rounded-lg mb-6 shadow-sm" />
            <div className="mb-8 text-center">
                <h1 className="text-xl sm:text-2xl font-bold text-purple-700">Welcome to Unlimited Money Hack</h1>
                <p className="text-sm text-gray-500 mt-1">Create your account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm mb-1 font-semibold">Name:</label>
                    <input type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors placeholder-gray-400"
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
                        className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors placeholder-gray-400"
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
                        className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors placeholder-gray-400"
                        placeholder="Password"
                        required/>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm mb-1 font-semibold">Confirm Password:</label>
                    <input type="password"
                        name="confirmPassword"            
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors placeholder-gray-400"
                        placeholder="Confirm Password"
                        required/>
                </div>
                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-md transition-all active:scale-95 shadow-md mt-4">
                    Register
                </button>
            </form>
            <div className="mt-6 text-center">
                <Link to="/" className="text-sm text-purple-600 hover:text-purple-800 transition-colors underline">
                    Already have an account? Login here.
                </Link>
            </div>
        </div>
    </div>
  )
}
