import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {toast} from 'react-toastify';
import { baseUrl } from '../url';
import { vscDarkPlus as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bookmark, BookmarkPlus, ChevronDown, ChevronUp, CirclePlus, MessageCircleMore, MessageCirclePlus, MessageSquareText, ExternalLink, Code, Hash } from 'lucide-react';
import axios from 'axios';

const BookmarkedQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [disscussion, setDisscussion] = useState([]);

  const [showComments, setShowComments] = useState({});

  const [showDiscussion, setShowDiscussion] = useState({}); 

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const [isTextAreaVisible, setTextAreaVisible] = useState({});
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem('success')) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user.email);
      setUserId(user._id);
    }
  }, [user]);

  useEffect(() => {
    fetchQuestions();
  }, [user]);

  const addQuestion= ()=> {
    window.location.href='/addquestion';
  }

  const [solutionVisibility, setSolutionVisibility] = useState({});

  const toggleSolutionVisibility = (questionId) => {
    setSolutionVisibility((prevVisibility) => ({
      ...prevVisibility,
      [questionId]: !prevVisibility[questionId],
    }));
  };

  const toggleComments2 = (questionId) => {
   setTextAreaVisible((prevVisibility) => ({
      ...prevVisibility,
      [questionId]: !prevVisibility[questionId],
    }));
  }

  const toggleDisscussion = (questionId) => {
    setShowComments((prevVisibility) => ({
      ...prevVisibility,
      [questionId]: !prevVisibility[questionId],
    }));
  }

  const addComment = async (questionId) => {
    try {
      const response = await fetch(`${baseUrl}/comment/${questionId}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post comment');
      }

      const data = await response.json();
      console.log(data);
      setTextAreaVisible(false);
      fetchQuestions();
      setComment('');
      toast.success('Comment posted successfully! 💬');
    
    } catch (error) {
      console.error(error);
      toast.error('Failed to post comment. Please try again.');
    }
  }

  const fetchQuestions = async () => {
    if (!user) return; // If user is not set, return early
    try {
      const response = await fetch(`${baseUrl}/question?email=${user}`, {
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
      setQuestions(data.questions);
      setDisscussion(data.comments);
      console.log(data.comments);
      //console.log(data.questions);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const MyBookmarks=()=>{
    window.location.href='/mybookmarks';
  }

  const  bookmarkQuestion = async (questionId) =>{
    // Example: log the question ID to the console
   // console.log("Bookmarking question with ID:", questionId);

    try {
      const response = await fetch(`${baseUrl}/bookmark/${questionId}/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status===400) {
        //const errorData =  response.json();
          const text = await response.text();

          if(text==="Question already bookmarked"){
            toast.error("Question already bookmarked! 📌");
          }
          fetchQuestions();
          return;
      
       // throw new Error(errorData.message || 'Failed to fetch bookmarked questions');
       
    }
      
      const data = await response.json();
     
    console.log(data);
    toast.success("Question Bookmarked Successfully! ⭐");
    } catch (error) {
      setError(error.message);
    } 
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading questions...</p>
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
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              📚 All Questions
            </h1>
            <p className="text-gray-400">Explore and bookmark coding challenges</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button  
              onClick={addQuestion} 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <span className='flex items-center gap-2'>
                <CirclePlus className="w-5 h-5"/> Add Question
              </span>
            </button>
            
            <button  
              onClick={MyBookmarks} 
              className="bg-slate-700/50 backdrop-blur-sm hover:bg-slate-600/50 text-white font-semibold py-3 px-6 rounded-xl border border-slate-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <span className='flex items-center gap-2'>
                <Bookmark className="w-5 h-5"/> My Bookmarks
              </span>
            </button>
          </div>
        </div>
    
        {/* Questions Grid */}
        <div className="space-y-6">
          {questions.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">No questions yet</h3>
              <p className="text-gray-500 mb-6">Be the first to add a coding challenge!</p>
              <button  
                onClick={addQuestion} 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className='flex items-center gap-2'>
                  <CirclePlus className="w-5 h-5"/> Add Your First Question
                </span>
              </button>
            </div>
          ) : (
            questions.map((question) => (
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
                    onClick={() => bookmarkQuestion(question._id)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                  >
                    <span className='flex items-center gap-2'>
                      <BookmarkPlus className="w-4 h-4"/>
                      Bookmark
                    </span>
                  </button>
                </div>

                {/* Problem Link */}
                <a 
                  href={question.link} 
                  target='blank' 
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors mb-6 group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:transform group-hover:scale-110 transition-transform" />
                  View Problem
                </a>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={() => toggleSolutionVisibility(question._id)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                  >
                    <span className='flex items-center gap-2'>
                      <Code className="w-4 h-4" />
                      {solutionVisibility[question._id] ? 'Hide Solution' : 'Show Solution'}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => toggleDisscussion(question._id)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                  >
                    <span className='flex items-center gap-2'>
                      <MessageCircleMore className="w-4 h-4"/>
                      Discussion 
                      {showComments[question._id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                </div>

                {/* Solution Section */}
                {solutionVisibility[question._id] && (
                  <div className="mb-6 bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
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

                {/* Discussion Section */}
                {showComments[question._id] && (
                  <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700/30">
                    {/* Add Comment Button */}
                    <div className="mb-6">
                      <button
                        onClick={() => toggleComments2(question._id)}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
                      >
                        <span className='flex items-center gap-2'>
                          <MessageCirclePlus className="w-4 h-4"/> Add Comment
                        </span>
                      </button>
                    </div>

                    {/* Comment Input */}
                    {isTextAreaVisible[question._id] && (
                      <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-600/50">
                        <textarea
                          value={comment}
                          onChange={handleCommentChange}
                          className="w-full p-4 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 resize-none"
                          placeholder="Share your thoughts, ask questions, or provide feedback..."
                          rows="4"
                        />
                        <div className="flex justify-end mt-3">
                          <button
                            onClick={() => addComment(question._id)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                          >
                            <span className='flex items-center gap-2'>
                              <MessageSquareText className="w-4 h-4"/>Post Comment
                            </span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Comments List */}
                    <div className="space-y-4">
                      {disscussion
                        .filter(comment => comment.questionId === question._id)
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((comment, index) => (
                          <div key={comment.id || index} className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {comment.userId.userhandle ? comment.userId.userhandle.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <div>
                                <h4 className='font-semibold text-purple-400'>{comment.userId.userhandle || 'Anonymous'}</h4>
                                <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{comment.comment}</p>
                          </div>
                        ))}
                      
                      {disscussion.filter(comment => comment.questionId === question._id).length === 0 && (
                        <div className="text-center py-8">
                          <div className="text-4xl mb-2">💬</div>
                          <p className="text-gray-500">No comments yet. Be the first to start the discussion!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkedQuestions;
