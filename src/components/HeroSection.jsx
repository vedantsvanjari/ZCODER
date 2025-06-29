import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import { testimonials } from "../constants";
import { features } from "../constants";
import bg from "../assets/bg1.svg";
import Navbar from "./Nav";
import bg2 from "../assets/bg2.jpg";

const HeroSection = () => {
  const user = localStorage.getItem('user');
  const href = user ? '/bookmark' : '/login';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Hero Content */}
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl animate-pulse">
              <span className="text-3xl">💻</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-center tracking-tight leading-tight mb-8">
            <span className="text-white block mb-4">
              All Your Coding
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text animate-gradient-x">
              Challenges
            </span>
            <span className="text-white block mt-4 text-3xl sm:text-4xl lg:text-6xl">
              at One Place
            </span>
          </h1>

          <p className="mt-8 text-xl sm:text-2xl text-center text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Welcome to <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Zcoder</span>, 
            the ultimate hub for all your bookmarked coding problems! 
            <br className="hidden sm:block" />
            Collect and manage your favorite challenges from various coding platforms in one place.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mt-12">
            <a 
              href={href} 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <span className="relative z-10 flex items-center gap-3">
                🚀 Start for Free
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </a>
          </div>
        </div>

        {/* Hero Images */}
        <div className="flex flex-col lg:flex-row mt-16 justify-center gap-6 max-w-6xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={bg} 
              alt="Coding Interface" 
              className="relative rounded-2xl w-full lg:w-96 border border-slate-700/50 shadow-2xl transform group-hover:scale-105 transition-all duration-500" 
            />
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={bg2} 
              alt="Code Editor" 
              className="relative rounded-2xl w-full lg:w-96 border border-slate-700/50 shadow-2xl transform group-hover:scale-105 transition-all duration-500" 
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
              <span className="text-2xl">⚡</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-white">Featu</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                res
              </span>
            </h2>
            <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
              Discover the powerful features that make coding practice effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                        <span className="text-white text-xl">
                          {feature.icon}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                        {feature.text}
                      </h3>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
              <span className="text-2xl">💬</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
              What People are Saying
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join thousands of developers who love using Zcoder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105 h-full">
                  <div className="flex flex-col h-full">
                    {/* Quote */}
                    <div className="flex-1 mb-6">
                      <div className="text-purple-400 text-4xl mb-4">"</div>
                      <p className="text-gray-300 leading-relaxed text-lg italic">
                        {testimonial.text}
                      </p>
                    </div>
                    
                    {/* User Info */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75"></div>
                        <img
                          className="relative w-14 h-14 rounded-full border-2 border-slate-700"
                          src={testimonial.image}
                          alt={testimonial.user}
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">
                          {testimonial.user}
                        </h4>
                        <p className="text-purple-400 font-medium">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-12 border border-slate-700/50 shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 shadow-2xl">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Level Up Your Coding?
            </h3>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Join the community and start organizing your coding journey today!
            </p>
            <a 
              href={href} 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              <span className="flex items-center gap-3">
                🚀 Get Started Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

