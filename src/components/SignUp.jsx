import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {  toast } from 'react-toastify';
import { baseUrl } from '../url';
import logo from '../assets/logo.png';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const SignUp = () => {
    const navigateTo = useNavigate();
    const [credentials, setCredentials] = useState({
      email: '',
      password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
          const response = await fetch(`${baseUrl}/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
          });

          if (!response.ok) {
            toast.error("Invalid credentials! Please try again. 🔐");
            const errorData = await response.json();
            console.error("Error:", errorData);
          } else {
            const data = await response.json();
            console.log(data);

            console.log(data.user.first_name)
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('success',"true")
            toast.success("Welcome back! Login successful 🎉")
            const Profile = data.user;
            
            navigateTo('/',{state:{Profile:Profile}})
          }
        } catch (error) {
          toast.error("Network error! Please check your connection. 🌐")
          console.error("Fetch error:", error);
        } finally {
          setIsLoading(false);
        }
      };

      const onChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75"></div>
            <img className="relative w-16 h-16 rounded-full border-2 border-slate-700" src={logo} alt="Zcoder Logo"/>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-lg">Sign in to continue your coding journey</p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8 hover:shadow-purple-500/10 transition-all duration-500">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                📧 Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  value={credentials.email} 
                  onChange={onChange}  
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400" 
                  placeholder="Enter your email address..."
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                🔒 Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password" 
                  id="password"  
                  value={credentials.password} 
                  onChange={onChange} 
                  placeholder="Enter your password..."
                  className="w-full pl-10 pr-12 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400" 
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  id="remember" 
                  type="checkbox" 
                  className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <a 
                href="/editprofile" 
                className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
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
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </div>
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-400">
                Don't have an account yet? {' '}
                <a 
                  href="/register" 
                  className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Sign up here
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            🔐 Your data is secure and protected
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
