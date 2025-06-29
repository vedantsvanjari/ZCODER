import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { baseUrl } from '../url'; // URL of the backend server
import { User, MessageCircle, Send, Users, AlertCircle, Eye, EyeOff } from 'lucide-react'; // Icon component for displaying user icon

const socket = io(baseUrl);

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [user, setUser] = useState('');
  const [userid, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedFriendName, setSelectedFriendName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unknownMessages, setUnknownMessages] = useState([]);
  const [showUnknownMessages, setShowUnknownMessages] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState({}); // State to track online users

  const fetchProfile = async (userId) => {
    try {
      const response = await fetch(`${baseUrl}/profileid?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch Profile Error:', error);
      return null;
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email) {
      setUser(storedUser.email);
    }
    if (storedUser && storedUser._id) {
      setUserId(storedUser._id);
    }
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      try {
        const response = await fetch(`${baseUrl}/profile?email=${user}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setFriends(data.user.following);
      } catch (error) {
        console.error('Fetch User Profile Error:', error);
        setError('Failed to fetch friends list');
      }
    };

    fetchUserProfile();
  }, [user]);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      const fetchedProfiles = await Promise.all(friends.map((userId) => fetchProfile(userId)));
      setProfiles(fetchedProfiles.filter((profile) => profile !== null));
      setLoading(false);
    };

    if (friends.length > 0) {
      fetchProfiles();
    }
  }, [friends]);

  const fetchChat = async (friendEmail) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/friends?from=${user}&to=${friendEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch chat messages');
      }
      const data = await response.json();
      setChat(data); // Assuming data is an array of messages
    } catch (error) {
      console.error('Fetch Chat Error:', error);
      setError('Failed to fetch chat messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (selectedFriend && message) {
      const messageData = {
        senderEmail: user,
        receiverEmail: selectedFriend,
        messageText: message,
      };

      socket.emit('sendMessage', messageData);
      setMessage(''); // Clear message input
    } else {
      setError('Please select a friend and enter a message');
    }
  };

  useEffect(() => {
    if (userid) {
      // Emit userId after connection is established
      socket.emit('setUserId', userid);
    }
  }, [userid]);

  const handleFriendSelect = (friendEmail, friendName) => {
    if (selectedFriend === friendEmail) {
      setSelectedFriend(null); // Close chat if the same friend is selected again
      setSelectedFriendName('');
    } else {
      setSelectedFriend(friendEmail);
      setSelectedFriendName(friendName);
      fetchChat(friendEmail); // Use friendEmail to fetch chat
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      if (message.users.includes(userid)) {
        if (friends.includes(message.sender) || friends.includes(message.receiver)) {
          setChat((prevChat) => [...prevChat, message]);
        } else {
          setUnknownMessages((prevMessages) => [...prevMessages, message]);
          // Store unknown messages in local storage
          localStorage.setItem('unknownMessages', JSON.stringify([...unknownMessages, message]));
        }
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [userid, friends, unknownMessages]);

  // Listen for online users updates
  useEffect(() => {
    socket.on('userOnline', (onlineUsersData) => {
      setOnlineUsers(onlineUsersData);
    });

    return () => {
      socket.off('userOnline');
    };
  }, []);

  const handleUnknownMessages = () => {
    setShowUnknownMessages(!showUnknownMessages);
  };

  useEffect(() => {
    const storedUnknownMessages = JSON.parse(localStorage.getItem('unknownMessages')) || [];
    setUnknownMessages(storedUnknownMessages);
  }, []);

  if (loading && profiles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading your friends...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            👥 Friends
          </h1>
          <p className="text-gray-400 text-lg">Connect and chat with your coding buddies</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center mb-6">
            <div className="flex items-center justify-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Friends Grid */}
        {profiles.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👫</div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">No friends yet</h3>
            <p className="text-gray-500 mb-6">Start following other users to see them here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {profiles.map((profile, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 hover:shadow-purple-500/10 transition-all duration-500 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-semibold text-white">{profile.user.first_name} {profile.user.last_name}</h3>
                    <p className="text-purple-400 font-medium">@{profile.user.userhandle}</p>
                    <p className="text-gray-400 text-sm">{profile.user.college}</p>
                  </div>
                  <div className="text-right">
                    {onlineUsers[profile.user._id] ? (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">Online</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span className="text-gray-500 text-sm">Offline</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
                  onClick={() => handleFriendSelect(profile.user.email, `${profile.user.first_name} ${profile.user.last_name}`)}
                >
                  <MessageCircle className="w-4 h-4" />
                  {selectedFriend === profile.user.email ? 'Close Chat' : 'Start Chat'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Chat Section */}
        {selectedFriend && (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Chat with {selectedFriendName}</h2>
                <p className="text-gray-400">@{selectedFriend}</p>
              </div>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-4 h-64 overflow-y-scroll mb-4 border border-slate-700/30">
              {chat.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">💬</div>
                  <p className="text-gray-500">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                chat.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-3 flex ${msg.sender === userid ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                        msg.sender === userid 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                          : 'bg-slate-700 text-white border border-slate-600'
                      }`}
                    >
                      {msg.message.text}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center gap-2"
                onClick={sendMessage}
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        )}

        {/* Unknown Messages Section */}
        <div className="text-center">
          <button
            className={`inline-flex items-center gap-2 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
              showUnknownMessages 
                ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white hover:shadow-red-500/25' 
                : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white hover:shadow-orange-500/25'
            }`}
            onClick={handleUnknownMessages}
          >
            {showUnknownMessages ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showUnknownMessages ? 'Hide Unknown Messages' : 'Show Unknown Messages'}
            {unknownMessages.length > 0 && (
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {unknownMessages.length}
              </span>
            )}
          </button>
        </div>

        {showUnknownMessages && (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Unknown Messages</h2>
                <p className="text-gray-400">Messages from users you don't follow</p>
              </div>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-4 h-64 overflow-y-scroll border border-slate-700/30">
              {unknownMessages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📭</div>
                  <p className="text-gray-500">No unknown messages</p>
                </div>
              ) : (
                unknownMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-3 flex ${msg.sender === userid ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-xs lg:max-w-md">
                      <div className="text-xs text-gray-400 mb-1">
                        From: {msg.senderhandle}
                      </div>
                      <div
                        className={`px-4 py-2 rounded-xl ${
                          msg.sender === userid 
                            ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white' 
                            : 'bg-slate-700 text-white border border-red-500/30'
                        }`}
                      >
                        {msg.message.text}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
