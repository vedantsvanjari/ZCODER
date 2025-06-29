import React from 'react'
import {useEffect, useState } from 'react';
import  './Profile.css';
import {  platformLinks } from "../constants";
import { useNavigate } from 'react-router-dom';
import img1 from "../assets/codeforces.webp";
import img2 from "../assets/leetcode.svg";
import img3 from "../assets/gfg.png";
import img4 from "../assets/atcoder.png";
import img5 from "../assets/codechef.jpg";
import { toast } from 'react-toastify';
import { baseUrl } from '../url';
import avatar from '../assets/avatar.png';
import { ArrowLeft, Search, Edit, Plus, MapPin, Mail, GraduationCap, ExternalLink } from 'lucide-react';

const MyProfile = () => {
  const navigateTo = useNavigate();
    const [user,setUser]=useState('');
    const [first_name,setFirst_name]=useState('');
    const [last_name,setLast_name]=useState('');
   const [about ,setAbout]= useState('');
    const [college,setCollege]=useState('');
    const [city,setCity]=useState('');
    const [search,setSearch]=useState('');
    const [codeforces ,setCodeforces]= useState('');
    const [codechef ,setCodechef]= useState('');
    const [leetcode ,setLeetcode]= useState('');
    const [atcoder ,setAtcoder]= useState('');
    const [geeksforGeeks ,setGeeksforGeeks]= useState('');
    const [userhandle,setUserhandle]=useState('');
    const [skills,setSkills]=useState([]);
    const navigate = useNavigate();

useEffect(()=>{
  if(localStorage.getItem('success')){
    const user2=JSON.parse(localStorage.getItem('user'));
    setFirst_name(user2.first_name);
    setSkills(user2.skills);
   // console.log(user2.first_name);
   //console.log(user2);

  
  //console.log(user2.handles);
  setCollege(user2.college);
    setCity(user2.city);

    setLast_name(user2.last_name);
    setUser(user2.email);
    setUserhandle(user2.userhandle);
    setAbout(user2.about);
   
    setSkills(user2.skills);
    console.log(skills);
  }
},[user])

const goBack = () => {
  navigate(-1); // This will go back one step in the history stack
};

useEffect(() => {
    const Profile = async () => {
      if (!user) return; // If user is not set, return early
      try {
        const response = await fetch(`${baseUrl}/profile?email=${user}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch profile');
        }

         const data = await response.json();
        //console.log(data);

        const userhandles =data.user.handles

        if(userhandles.hasOwnProperty('Codeforces')){
            setCodeforces(userhandles.Codeforces)
        }
        if(userhandles.hasOwnProperty('Codechef')){
          setCodechef(userhandles.Codechef)
      }
      if(userhandles.hasOwnProperty('Leetcode')){
        setLeetcode(userhandles.Leetcode)
    }
    if(userhandles.hasOwnProperty('Atcoder')){
      setAtcoder(userhandles.Atcoder)
  }
  if(userhandles.hasOwnProperty('GeeksforGeeks')){
    setGeeksforGeeks(userhandles.GeeksforGeeks)
}
  
      } catch (error) {
        //setError(error.message);
       // console.error('Profile:', error);
      } 
    };

    Profile();
  }, [user]);

  const platforms = [
    {
      name: 'Codeforces',
     icon: <img src={img1} alt="codeforces" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cf',
     link:codeforces,
     default:'https://codeforces.com/'
    },
    {
      name: 'CodeChef',
     icon: <img src={img5} alt="codechef" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cc',
      link:codechef,
      default:'https://codechef.com/'
    },
    {
      name: 'LeetCode',
      icon: <img src={img2} alt="Leetcode" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cc',
      link:leetcode,
      default:'https://leetcode.com/'
    },
    {
      name: 'Atcoder',
      icon: <img src={img4} alt="Leetcode" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cc',
      link:atcoder,
      default:'https://atcoder.jp/'
    },
    {
      name: 'Geeks for Geeks',
      icon: <img src={img3} alt="Leetcode" className="h-10 w-10 mr-2" />,
      handle: 'user_handle_cc',
      link:geeksforGeeks,
       default:'https://www.geeksforgeeks.org/courses?source=google&medium=cpc&device=c&keyword=geeksforgeeks&matchtype=e&campaignid=20039445781&adgroup=147845288105&gad_source=1&gclid=Cj0KCQjwvb-zBhCmARIsAAfUI2v1KJMpGxPciw1K_nrOvdH4tBuCxdVuQQbIfXOMF4x508G9i4w9k6gaAq0uEALw_wcB'
    },
  ];

  const searchUser = async(e) => {
    e.preventDefault();
    //const search = e.target.value;
    console.log(search);
    // You can add your API call here to submit the form
    try {
        const response = await fetch(`${baseUrl}/searchUser?userhandle=${search}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", errorData);
          toast.error("User not found! 🔍");
        } else {
          const data = await response.json();
          console.log(data);
          navigateTo('/seeprofile',{state:{data: data}});
        }
      } catch (error) {
        toast.error("User not found! 🔍")
        console.error("Fetch error:", error);
      }
  }

  onchange =(e)=>{
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={goBack}
            className="p-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/50 hover:bg-slate-700/50 hover:border-purple-500/50 transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            👤 {first_name}'s Profile
          </h1>
        </div>

        {/* Search Section */}
        <div className="mb-10">
          <div className="max-w-md mx-auto">
            <form onSubmit={searchUser} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
              </div>
              <input 
                type="search" 
                value={search} 
                onChange={onchange}
                className="w-full pl-10 pr-24 py-4 bg-slate-800/50 backdrop-blur-sm text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                placeholder="Search any user..."
                required 
              />
              <button  
                type="submit" 
                className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 hover:shadow-purple-500/10 transition-all duration-500">
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75"></div>
                  <img 
                    src={avatar} 
                    className="relative w-32 h-32 rounded-full border-4 border-slate-700 mx-auto mb-4"
                    alt="Profile Avatar"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{first_name} {last_name}</h2>
                <p className="text-purple-400 font-semibold text-lg">@{userhandle}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <a 
                  href="/editprofile" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </a>
                <a 
                  href="/addHandle" 
                  className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold py-3 px-4 rounded-xl border border-slate-600 transition-all duration-300 hover:border-purple-500/50 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Handle
                </a>
              </div>

              {/* Profile Details */}
              <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700/30">
                <h3 className="text-lg font-semibold text-white mb-4">📋 Profile Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                    <span className="text-sm"><span className="font-semibold">College:</span> {college}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span className="text-sm"><span className="font-semibold">City:</span> {city}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span className="text-sm"><span className="font-semibold">Email:</span> {user}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8 hover:shadow-purple-500/10 transition-all duration-500">
              {/* About Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  💫 About Me
                </h2>
                <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700/30">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {about || "No description available yet. Edit your profile to add a bio!"}
                  </p>
                </div>
              </div>

              {/* Coding Platforms */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  🔗 Coding Platforms
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {platforms.map((platform, index) => (
                    <div
                      key={index}
                      className="group bg-slate-900/30 rounded-xl p-4 border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                    >
                      <a 
                        href={platform.link ? `${platform.link}`:`${platform.default}`} 
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
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  🚀 Skills
                </h2>
                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-4 py-2 rounded-full border border-purple-500/30 font-medium hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700/30 text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-gray-400 text-lg">No skills added yet.</p>
                    <p className="text-gray-500 text-sm mt-2">Edit your profile to showcase your skills!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
