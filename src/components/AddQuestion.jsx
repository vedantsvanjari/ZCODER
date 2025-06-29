import React, { useState, useEffect } from 'react';
import {useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../url';

const AddQuestionForm = () => {
    const navigateTo = useNavigate();
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [solution, setSolution] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [user, setUser] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const topicsOptions = [ 'Arrays','Linked List','Dynamic Programming','Graphs','Trees','Sorting and Searching'];

  useEffect(() => {
    if (localStorage.getItem('success')) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user.email);
    }
  }, []);

  const handleTopicChange = (topic) => {
    setSelectedTopics((prevSelectedTopics) =>
      prevSelectedTopics.includes(topic)
        ? prevSelectedTopics.filter((t) => t !== topic)
        : [...prevSelectedTopics, topic]
    );
  };

 const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newQuestion = { title, link, topics: selectedTopics, solution };
    console.log(newQuestion);
    // You can add your API call here to submit the form
    try {
        const response = await fetch(`${baseUrl}/questions?email=${user}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQuestion),
        });

      console.log(response)
       
      // history.push('/home');
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", errorData);
          toast.error("Failed to add question. Please try again.");
        } else {
          const data = await response.json();
          console.log(data);

         // console.log(data.user.first_name)
          //localStorage.setItem('user', JSON.stringify(data.user));
          //localStorage.setItem('success',"true")
          toast.success("Question added successfully! 🎉")
          
          // Reset form
          setTitle('');
          setLink('');
          setSolution('');
          setSelectedTopics([]);
          
          navigateTo('/bookmark')
           // Uncomment this to navigate to home after successful registration
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Network error. Please check your connection.");
      } finally {
        setIsSubmitting(false);
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Add New Question
          </h1>
          <p className="text-gray-400 text-lg">Share your coding challenge with the community</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8 hover:shadow-purple-500/10 transition-all duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Input */}
            <div className="group">
              <label htmlFor="title" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                📝 Question Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400"
                placeholder="Enter an engaging question title..."
                required
              />
            </div>

            {/* Link Input */}
            <div className="group">
              <label htmlFor="link" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                🔗 Problem Link
              </label>
              <input
                type="url"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70 placeholder-gray-400"
                placeholder="https://leetcode.com/problems/..."
                required
              />
            </div>

            {/* Topics Selection */}
            <div>
              <label className="block text-sm font-semibold mb-4 text-gray-200">
                🏷️ Topics ({selectedTopics.length} selected)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {topicsOptions.map((topic) => (
                  <div key={topic} className="relative">
                    <input
                      type="checkbox"
                      id={topic}
                      value={topic}
                      checked={selectedTopics.includes(topic)}
                      onChange={() => handleTopicChange(topic)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={topic}
                      className={`block w-full px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 text-center border-2 ${
                        selectedTopics.includes(topic)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg transform scale-105'
                          : 'bg-slate-700/30 text-gray-300 border-slate-600 hover:bg-slate-600/50 hover:border-purple-400'
                      }`}
                    >
                      {topic}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution Textarea */}
            <div className="group">
              <label htmlFor="solution" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-purple-400 transition-colors">
                💡 Solution Code
              </label>
              <div className="relative">
                <textarea
                  id="solution"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-900/50 text-gray-100 rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-900/70 placeholder-gray-400 font-mono text-sm resize-none"
                  rows="12"
                  placeholder="// Write your solution here...
function solution() {
    // Your code implementation
}"
                  required
                ></textarea>
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {solution.length} characters
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-purple-500/25'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Adding Question...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Question</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            💡 Make sure your solution is well-documented and follows best practices
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionForm;
