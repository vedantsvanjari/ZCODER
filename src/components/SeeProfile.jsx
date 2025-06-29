import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import img1 from "../assets/codeforces.webp";
import img2 from "../assets/leetcode.svg";
import img3 from "../assets/gfg.png";
import img4 from "../assets/atcoder.png";
import img5 from "../assets/codechef.jpg";
import { useState } from 'react';
import avatar from '../assets/avatar.png';
import {toast} from 'react-toastify';
import { baseUrl } from '../url';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, ExternalLink, GraduationCap, Hash, MapPin, Mail } from 'lucide-react';

const SeeProfile = () => {
  const location = useLocation();
  const data = location.state.data.user;
  const navigate = useNavigate();
  const [person, setPerson] = useState('');
  const [id, setId] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  
  useEffect(()=>{
    if(localStorage.getItem('success')){
      const user=JSON.parse(localStorage.getItem('user'));
      setPerson(user._id);
      setId(data._id);
    }
  })

  const platforms = [
    {
      name: 'Codeforces',
      icon: <img src={img1} alt="codeforces" className="h-8 w-8" />,
      link: data.handles?.Codeforces,
    },
    {
      name: 'CodeChef',
      icon: <img src={img5} alt="codechef" className="h-8 w-8" />,
      link: data.handles?.Codechef, 
    },
    {
      name: 'LeetCode',
      icon: <img src={img2} alt="Leetcode" className="h-8 w-8" />,
      link: data.handles?.Leetcode,
    },
    {
      name: 'Atcoder',
      icon: <img src={img4} alt="Atcoder" className="h-8 w-8" />,
      link: data.handles?.Atcoder,
    },
    {
      name: 'Geeks for Geeks',
      icon: <img src={img3} alt="GeeksforGeeks" className="h-8 w-8" />,
      link: data.handles?.GeeksforGeeks,
    },
  ];

  const goBack = () => {
    navigate(-1);
  };

  const follow = async (e) => {
    e.preventDefault();
    setIsFollowing(true);

    try {
      const response = await fetch(`${baseUrl}/follow/${person}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userIdtofollow: id})
      });
      
      if (response.ok) {
        toast.success('Followed successfully! 🎉');
        navigate('/myprofile');
      } else {
        toast.error('You cannot follow yourself! 🚫');
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error('Failed to follow user. Please try again.');
    } finally {
      setIsFollowing(false);
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
              👤 {data.first_name}'s Profile
            </h1>
            <p className="text-gray-400 text-lg mt-2">View and connect with this developer</p>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8 hover:shadow-purple-500/10 transition-all duration-500">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75"></div>
              <img 
                src={avatar} 
                alt="Profile Avatar" 
                className="relative w-32 h-32 rounded-full border-4 border-slate-700 mx-auto transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{data.first_name} {data.last_name}</h2>
            <p className="text-purple-400 font-semibold text-xl mb-2">@{data.userhandle}</p>
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>{data.college}</span>
            </div>
            
            {/* Follow Button */}
            <button
              onClick={follow}
              disabled={isFollowing}
              className={`inline-flex items-center gap-2 font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isFollowing
                  ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white hover:shadow-blue-500/25'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800`}
            >
              <UserPlus className="w-5 h-5" />
              {isFollowing ? 'Following...' : `Connect with @${data.userhandle}`}
            </button>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                📋 Profile Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span><span className="font-semibold">City:</span> {data.city || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span><span className="font-semibold">Email:</span> {data.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span><span className="font-semibold">College:</span> {data.college}</span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                💫 About
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {data.about || "This user hasn't added a bio yet."}
              </p>
            </div>
          </div>

          {/* Skills Section */}
          {data.skills && data.skills.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                🚀 Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm font-medium rounded-full border border-purple-500/30"
                  >
                    <Hash className="w-3 h-3" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Coding Platforms */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              🔗 Coding Platforms
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="group bg-slate-900/30 rounded-xl p-4 border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  {platform.link ? (
                    <a 
                      href={platform.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="mr-4">{platform.icon}</div>
                        <span className="text-white font-medium group-hover:text-purple-400 transition-colors">
                          {platform.name}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </a>
                  ) : (
                    <div className="flex items-center opacity-60">
                      <div className="mr-4">{platform.icon}</div>
                      <span className="text-gray-500 font-medium">
                        {platform.name} (Not connected)
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            🤝 Connect with fellow developers and grow together
          </p>
        </div>
      </div>
    </div>
  )
}

export default SeeProfile
