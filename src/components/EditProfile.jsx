import {toast} from 'react-toastify';
import React from 'react'
import { useState,useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { baseUrl } from '../url';
import { User, Mail, Lock, MapPin, GraduationCap, AtSign, Edit3, Sparkles, Save } from 'lucide-react';

const EditProfile = () => {
    const navigateTo = useNavigate();
    const [id,setId]=useState('');
    const [isLoading, setIsLoading] = useState(false);

    const Skills_array = [
      'WebDevelopment',
      'AppDevelopment',
      'Competitive programming',
      'Machine Learning',
    ];
    
    const [selectedSkills, setSelectedSkills] = useState([]);
  
    const handleSkills = (skill) => {
      setSelectedSkills((prevSelectedSkills) =>
        prevSelectedSkills.includes(skill)
          ? prevSelectedSkills.filter((t) => t !== skill)
          : [...prevSelectedSkills, skill]
      );
    };
    const [credentials, setCredentials] = useState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      city: '',
      college: '',
      userhandle:'',
      about:'',
      skills: []
    });

    useEffect(()=>{
        if(localStorage.getItem('success')){
            const user=JSON.parse(localStorage.getItem('user'));
            setId(user._id);
            setCredentials({
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              password: user.password,
              city: user.city,
              college: user.college,
              userhandle:user.userhandle,
              about:user.about,
              skills: user.skills
            })
           
        }
    },[])

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      credentials.skills=selectedSkills;
  
      try {
        const response = await fetch(`${baseUrl}/update?userId=${id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(credentials),
        });
       
        if (!response.ok) {
          toast.error("Failed to update profile! Please try again. 📝")
        } else {
          const data = await response.json();
          localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('success',"true")
          console.log(data);
          toast.success("Profile updated successfully! 🎉")
          navigateTo('/myprofile')
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Network error! Please check your connection. 🌐")
      } finally {
        setIsLoading(false);
      }
    };
  
    const onChange = (e) => {
      const { name, value} = e.target;
      setCredentials({ ...credentials, [name]: value });
    };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
            <Edit3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            ✨ Edit Profile
          </h1>
          <p className="text-gray-400 text-lg">Update your information and preferences</p>
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
            </div>

            {/* Account Information Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                🔐 Account Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="userhandle" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                    <AtSign className="w-4 h-4 inline mr-2" />
                    Username
                  </label>
                  <input 
                    type="text" 
                    name="userhandle" 
                    className="w-full px-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400" 
                    placeholder="Your unique username..." 
                    value={credentials.userhandle} 
                    onChange={onChange}
                    required 
                  />
                </div>
                <div className="group">
                  <label htmlFor="password" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password
                  </label>
                  <input 
                    type="password" 
                    name="password" 
                    className="w-full px-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400" 
                    placeholder="Update your password..." 
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

            {/* About Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                💫 About Me
              </h2>
              <div className="group">
                <label htmlFor="about" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Tell us about yourself
                </label>
                <textarea 
                  name="about" 
                  className="w-full px-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400 resize-none"
                  placeholder="Write a brief description about yourself, your interests, and goals..." 
                  value={credentials.about} 
                  onChange={onChange}
                  rows={4}
                  required 
                />
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                🚀 Skills
              </h2>
              <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700/30">
                <p className="text-gray-400 mb-4">Select your areas of expertise:</p>
                <div className="grid grid-cols-2 gap-4">
                  {Skills_array.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        id={skill}
                        value={skill}
                        checked={selectedSkills.includes(skill)}
                        onChange={() => handleSkills(skill)}
                        className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <label htmlFor={skill} className="ml-3 text-gray-300 font-medium">{skill}</label>
                    </div>
                  ))}
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
                    <span>Updating Profile...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            💡 Keep your profile updated to get better opportunities
          </p>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
