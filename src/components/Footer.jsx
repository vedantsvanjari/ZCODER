import { resourcesLinks, platformLinks, communityLinks } from "../constants";
import { ExternalLink, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-800/30 backdrop-blur-xl border-t border-slate-700/50 mt-20">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Resources Section */}
          <div className="group">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                📚 Resources
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            <ul className="space-y-3">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white font-medium transition-all duration-300 hover:bg-slate-700/30 hover:px-3 hover:py-1 rounded-lg flex items-center gap-2 group"
                  >
                    <span>{link.text}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Section */}
          <div className="group">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                🔗 Platforms
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            <ul className="space-y-4">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/item flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700/30 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-0 group-hover/item:opacity-75 transition duration-300"></div>
                      <img 
                        className="relative h-8 w-8 rounded-full border border-slate-600 group-hover/item:border-transparent transition-all duration-300" 
                        src={link.image} 
                        alt={link.text}
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-300 group-hover/item:text-white font-medium transition-colors">
                        {link.text}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover/item:text-purple-400 transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Section */}
          <div className="group">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                👥 Community
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            <ul className="space-y-3">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white font-medium transition-all duration-300 hover:bg-slate-700/30 hover:px-3 hover:py-1 rounded-lg flex items-center gap-2 group"
                  >
                    <span>{link.text}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-slate-700/50 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <div>
              <h4 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Zcoder
              </h4>
              <p className="text-gray-500 text-sm">Code. Learn. Connect.</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center sm:text-right">
            <p className="text-gray-400 text-sm flex items-center gap-1">
              © 2024 Zcoder. Made with 
              <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" /> 
              for developers
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Empowering coders worldwide
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-50"></div>
      </div>
    </footer>
  );
};

export default Footer;
