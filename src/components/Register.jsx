import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { baseUrl } from '../url';
import axios from "axios"
import { User, Mail, Lock, MapPin, GraduationCap, AtSign, UserPlus } from 'lucide-react';

const Register = () => {
    const navigateTo = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    city: '',
    college: '',
    userhandle: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(credentials);

    try {
      const response = await axios.post(`${baseUrl}/register`, {
          credentials
       }
      )
      
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        console.log(data);
        toast.success("Registration successful! Welcome to Zcoder! 🎉")
        navigateTo('/')
      } else {
        toast.error("Registration failed! Please try again. 📝")
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      if (error.response) {
        toast.error(error.response.data?.message || "Registration failed! Please try again. 📝")
      } else if (error.request) {
        toast.error("Network error! Please check your connection. 🌐")
      } else {
        toast.error("Something went wrong! Please try again. ❌")
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setCredentials({ ...credentials, [name]: files[0] });
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Join Zcoder
          </h1>
          <p className="text-gray-400 text-lg">Create your account and start your coding journey</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8 hover:shadow-purple-500/10 transition-all duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                👤 Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="group">
                  <label htmlFor="first_name" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                    <User className="w-4 h-4 inline mr-2" />
                    First Name
                  </label>
                  <input 
                    type="text" 
                    name="first_name" 
                    className="w-full px-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400" 
                    placeholder="Enter your first name..." 
                    value={credentials.first_name} 
                    onChange={onChange}  
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="group">
                  <label htmlFor="last_name" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                    <User className="w-4 h-4 inline mr-2" />
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    name="last_name" 
                    className="w-full px-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400" 
                    placeholder="Enter your last name..." 
                    value={credentials.last_name} 
                    onChange={onChange}
                    required 
                  />
                </div>
              </div>

              {/* User Handle */}
              <div className="group mt-6">
                <label htmlFor="userhandle" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                  <AtSign className="w-4 h-4 inline mr-2" />
                  Username
                </label>
                <input 
                  type="text" 
                  name="userhandle" 
                  className="w-full px-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400" 
                  placeholder="Choose a unique username..." 
                  value={credentials.userhandle} 
                  onChange={onChange}
                  required 
                />
              </div>
            </div>

            {/* Account Information Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                🔐 Account Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    className="w-full px-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400" 
                    placeholder="Enter your email address..." 
                    value={credentials.email} 
                    onChange={onChange}
                    required 
                  />
                </div>

                {/* Password */}
                <div className="group">
                  <label htmlFor="password" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password
                  </label>
                  <input 
                    type="password" 
                    name="password" 
                    className="w-full px-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400" 
                    placeholder="Create a strong password..." 
                    value={credentials.password} 
                    onChange={onChange} 
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location Information Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                📍 Location & Education
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City */}
                <div className="group">
                  <label htmlFor="city" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    City
                  </label>
                  <input 
                    type="text" 
                    name="city" 
                    className="w-full px-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400" 
                    placeholder="Enter your city..." 
                    value={credentials.city} 
                    onChange={onChange}
                    required 
                  />
                </div>

                {/* College */}
                <div className="group">
                  <label htmlFor="college" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                    <GraduationCap className="w-4 h-4 inline mr-2" />
                    College/University
                  </label>
                  <input 
                    type="text" 
                    name="college" 
                    className="w-full px-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400" 
                    placeholder="Enter your college/university..." 
                    value={credentials.college} 
                    onChange={onChange} 
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                  isLoading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-purple-500/25'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </div>
                )}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-400">
                Already have an account? {' '}
                <a 
                  href="/login" 
                  className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            🚀 Join thousands of developers in the Zcoder community
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
