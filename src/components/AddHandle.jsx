import React from 'react'
import {toast } from 'react-toastify'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../url';
import { Plus, Link2, Code, ArrowLeft } from 'lucide-react';

const AddHandle = () => {
  const navigateTo = useNavigate();
  const [userId, setUserId] = useState('');
  const [handleName, setHandleName] = useState('');
  const [handleLink, setHandleLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 
  const platformLinks = [ 'Codeforces','Codechef','Leetcode','Atcoder','Geeks for Geeks'];

  useEffect(() => {
    if (localStorage.getItem('success')) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUserId(user._id);
    }
  }, []);

  const handleTopicChange = (topic) => {
    setHandleName(topic);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    const newHandle = {userId, handleName, handleLink };
    console.log(newHandle);

    try {
      const response = await fetch(`${baseUrl}/addHandles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHandle),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        toast.error("Invalid handle name or link! Please check and try again. 🔗")
      } else {
        const data = await response.json();
        console.log(data);
        toast.success("Handle added successfully! 🎉")
        navigateTo('/myprofile')
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Network error! Please check your connection. 🌐")
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    navigateTo(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={goBack}
            className="p-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/50 hover:bg-slate-700/50 hover:border-purple-500/50 transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🔗 Add Platform Handle
            </h1>
            <p className="text-gray-400 text-lg mt-2">Connect your coding platform profiles</p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8 hover:shadow-purple-500/10 transition-all duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Platform Selection */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                🚀 Select Platform
              </h2>
              <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700/30">
                <p className="text-gray-400 mb-4">Choose your favorite coding platform:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {platformLinks.map((platform) => (
                    <div key={platform} className="flex items-center">
                      <input
                        type="radio"
                        id={platform}
                        name="platform"
                        value={platform}
                        onChange={() => handleTopicChange(platform)}
                        className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 focus:ring-purple-500 focus:ring-2"
                      />
                      <label 
                        htmlFor={platform} 
                        className="ml-3 text-gray-300 font-medium cursor-pointer hover:text-purple-400 transition-colors"
                      >
                        {platform}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Handle Link Input */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                🔗 Profile Link
              </h2>
              <div className="group">
                <label htmlFor="link" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                  <Link2 className="w-4 h-4 inline mr-2" />
                  Profile URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Code className="w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input
                    type="url"
                    id="link"
                    value={handleLink}
                    onChange={(e) => setHandleLink(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400"
                    placeholder="https://codeforces.com/profile/your-username"
                    required
                  />
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  💡 Enter the complete URL to your profile page
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading || !handleName}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                  isLoading || !handleName
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
                    <span>Adding Handle...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add Handle</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            🎯 Add multiple platform handles to showcase your coding journey
          </p>
        </div>
      </div>
    </div>
  )
}

export default AddHandle
