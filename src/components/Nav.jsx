import {Menu,X} from "lucide-react";
import {useState }from "react";
import logo from '../assets/logo.png';
import { navItems } from '../constants';
import {useEffect } from 'react';
import arrow from '../assets/arrow.svg';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { useLocation } from "react-router-dom";

 const Navbar = () => {

  //const location = useLocation();
 // console.log(location.state.Profile)
  const [user,setUser]=useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('success')){
      const user=JSON.parse(localStorage.getItem('user'));
      setUser(user.first_name);
    }
  })

  const handleLogout=()=>{
    toast.success("Logout successful! 👋");
    localStorage.removeItem('success');
    localStorage.removeItem('user');
    window.location.href='/';
  }

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'myprofile') {
      window.location.href = '/myprofile';
    }else if(selectedValue==='logout'){
      handleLogout();
    }
  };

  const [mobileDrawerOpen,setMobileDrawerOpen]=useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNavbar=()=>{
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
   <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl">
    <div className="container px-4 mx-auto relative">
      <div className="flex justify-between items-center py-4">
        {/* Logo Section */}
        <div className="flex items-center flex-shrink-0 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <img className="relative h-10 w-10 mr-3 rounded-full border-2 border-slate-700 group-hover:border-transparent transition-all duration-300" src={logo} alt="logo" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Zcoder
          </span> 
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex ml-14 space-x-8">
          {navItems.map((item,index)=>(
            <li key ={index}>
              <a 
                href={item.href}
                className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:bg-slate-800/50 px-4 py-2 rounded-xl backdrop-blur-sm border border-transparent hover:border-slate-600/50"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Buttons */}
        {!user ? (
          <div className="hidden lg:flex justify-center space-x-4 items-center">
            <a 
              href="/login"
              className="text-white font-semibold py-2 px-6 rounded-xl border border-slate-600 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 hover:border-purple-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Sign In
            </a>

            <a 
              href="/register" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Create Account
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex">
            <div className="relative">
              <select 
                id="login" 
                onChange={handleSelectChange} 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 appearance-none"
              >
                <option className="bg-slate-800 text-white">{user} ▾</option>
                <option className="bg-slate-800 text-white hover:bg-slate-700" value="myprofile">
                  👤 My Profile
                </option>
                <option className="bg-slate-800 text-white hover:bg-slate-700" value="logout">
                  🚪 Logout
                </option>
              </select>
            </div>
          </div>
        )}   
    
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            onClick={toggleNavbar}
            className="text-white p-2 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 hover:bg-slate-700/50 hover:border-purple-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={toggleNavbar}
          ></div>
          
          {/* Drawer Content */}
          <div className="absolute right-0 top-0 h-full w-80 bg-slate-800/95 backdrop-blur-xl border-l border-slate-700/50 shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75"></div>
                    <img className="relative h-8 w-8 mr-3 rounded-full border-2 border-slate-700" src={logo} alt="logo" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Zcoder
                  </span>
                </div>
                <button 
                  onClick={toggleNavbar}
                  className="text-white p-2 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 px-6 py-8">
                <ul className="space-y-4">
                  {navItems.map((item,index)=>(
                    <li key={index}>
                      <a 
                        href={item.href}
                        className="block text-gray-300 hover:text-white font-medium py-3 px-4 rounded-xl hover:bg-slate-700/50 transition-all duration-300 border border-transparent hover:border-slate-600/50"
                        onClick={toggleNavbar}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile Auth Section */}
              <div className="p-6 border-t border-slate-700/50">
                {!localStorage.getItem('success') ? (
                  <div className="space-y-3">
                    <a 
                      href="/login" 
                      className="block text-center text-white font-semibold py-3 px-6 rounded-xl border border-slate-600 bg-slate-700/50 hover:bg-slate-600/50 hover:border-purple-500/50 transition-all duration-300"
                      onClick={toggleNavbar}
                    >
                      Sign In
                    </a>
                    <a 
                      href="/register"
                      className="block text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                      onClick={toggleNavbar}
                    >
                      Create Account
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-center p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-semibold text-lg">
                          {user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <p className="text-white font-semibold">Hello, {user}!</p>
                    </div>
                    
                    <a 
                      href="/myprofile"
                      className="block text-center text-white font-semibold py-3 px-6 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-300 border border-slate-600/50"
                      onClick={toggleNavbar}
                    >
                      👤 My Profile
                    </a>
                    
                    <button 
                      onClick={() => {
                        handleLogout();
                        toggleNavbar();
                      }}
                      className="block w-full text-center text-white font-semibold py-3 px-6 rounded-xl bg-red-600/80 hover:bg-red-700/80 transition-all duration-300"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
   </nav>
  )
}
export default Navbar;