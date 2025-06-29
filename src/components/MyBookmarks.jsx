import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { baseUrl } from '../url';
import { BookmarkX, Code, ExternalLink, Hash } from 'lucide-react';
import { vscDarkPlus as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MyBookmarks = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  const [solutionVisibility, setSolutionVisibility] = useState({});

  const toggleSolutionVisibility = (questionId) => {
    setSolutionVisibility((prevVisibility) => ({
      ...prevVisibility,
      [questionId]: !prevVisibility[questionId],
    }));
  };

  useEffect(() => {
    if (localStorage.getItem('success')) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user.email);
    }
  }, []);

  useEffect(() => {
    const fetchBookmarkedQuestions = async () => {
      if (!user) return;
      try {
        const response = await fetch(`${baseUrl}/bookmarkquestions?email=${user}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch bookmarked questions');
        }

        const data = await response.json();
       console.log(data);
        setQuestions(data.bookmarkedQuestions);
        console.log(data.bookmarkedQuestions);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedQuestions();
  }, [user]);

  const deleteBookmark = async (question) => {
    try {
      const response = await fetch(`${baseUrl}/unbookmark/${question}/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete bookmark');
      }

      setQuestions((prevQuestions) => prevQuestions.filter((q) => q._id !== question));
      toast.success('Bookmark removed successfully! 🗑️');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError(error.message);
      toast.error('Failed to remove bookmark. Please try again.');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading your bookmarks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <div className="text-red-400 text-lg font-semibold mb-2">❌ Error</div>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
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
              📚 My Bookmarks
            </h1>
            <p className="text-gray-400 text-lg mt-2">Your saved coding challenges</p>
          </div>
        </div>

        {/* Questions List */}
        {questions.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">No bookmarks yet</h3>
            <p className="text-gray-500 mb-6">Start bookmarking questions to see them here!</p>
            <a 
              href="/bookmark"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Browse Questions
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={question._id} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 hover:shadow-purple-500/10 transition-all duration-500 hover:transform hover:scale-[1.02]">
                {/* Question Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 hover:text-purple-400 transition-colors cursor-pointer">
                      {question.title}
                    </h3>
                    
                    {/* Topics */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.topics.map((topic, index) => (
                        <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm font-medium rounded-full border border-purple-500/30">
                          <Hash className="w-3 h-3" />
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteBookmark(question._id)}
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                  >
                    <span className='flex items-center gap-2'>
                      <BookmarkX className="w-4 h-4"/>
                      Remove
                    </span>
                  </button>
                </div>

                {/* Problem Link */}
                <a 
                  href={question.link} 
                  target='_blank' 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors mb-6 group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:transform group-hover:scale-110 transition-transform" />
                  View Problem
                </a>

                {/* Solution Toggle Button */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSolutionVisibility(question._id)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                  >
                    <span className='flex items-center gap-2'>
                      <Code className="w-4 h-4" />
                      {solutionVisibility[question._id] ? 'Hide Solution' : 'Show Solution'}
                    </span>
                  </button>
                </div>

                {/* Solution Section */}
                {solutionVisibility[question._id] && (
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-5 h-5 text-green-400" />
                      <h4 className="text-lg font-semibold text-green-400">Solution</h4>
                    </div>
                    <div className="overflow-hidden rounded-lg">
                      <SyntaxHighlighter 
                        language="cpp" 
                        style={codeStyle} 
                        showLineNumbers
                        customStyle={{
                          margin: 0,
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem'
                        }}
                      >
                        {question.solution}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookmarks
