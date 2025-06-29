import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import { Trophy, Calendar, Clock, Filter, Bell, ExternalLink, Play, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Import images properly
import atcoderImg from '../assets/atcoder.png';
import leetcodeImg from '../assets/leetcode.svg';
import codeforcesImg from '../assets/codeforces.webp';
import codechefImg from '../assets/codechef.jpg';
import gfgImg from '../assets/gfg.png';

const API_URL = 'https://clist.by/api/v1/contest/';
const API_KEY = 'tarun060803:f72f36f88a0e92adb2e844c64e93c3b49d588a0b';

const allowedPlatforms = [
    'codingninjas.com/codestudio',
    'codeforces.com',
    'atcoder.jp',
    'leetcode.com',
    'geeksforgeeks.org',
    'codechef.com',
];

// Use imported images
const logo = new Map();
logo.set('atcoder.jp', atcoderImg);
logo.set('leetcode.com', leetcodeImg);
logo.set('codeforces.com', codeforcesImg);
logo.set('codechef.com', codechefImg);
logo.set('geeksforgeeks.org', gfgImg);

const ContestList = () => {
    const navigate = useNavigate();
    const [contests, setContests] = useState([]);
    const [uniquePlatforms, setUniquePlatforms] = useState([]);
    const [filteredPlatform, setFilteredPlatform] = useState('all');
    const [reminderButtons, setReminderButtons] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        fetchContests();
    }, []);

    const fetchContests = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const currentDateTime = new Date().toISOString();
            const oneMonthFromNow = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
            const url = `${API_URL}?username=${API_KEY.split(':')[0]}&api_key=${API_KEY.split(':')[1]}&order_by=start&start__gt=${currentDateTime}&start__lt=${oneMonthFromNow}`;
            
            const { data } = await axios.get(url);

            const contests = data.objects
                .filter(contest => allowedPlatforms.includes(contest.resource.name))
                .map(contest => {
                    let start_date_gmt = moment.utc(contest.start, 'YYYY-MM-DD HH:mm:ss');
                    let end_date_gmt = moment.utc(contest.end, 'YYYY-MM-DD HH:mm:ss');
                    let start_date_ist = start_date_gmt.clone().tz('Asia/Kolkata');
                    let end_date_ist = end_date_gmt.clone().tz('Asia/Kolkata');

                    return {
                        id: contest.id,
                        name: contest.event,
                        start_date: start_date_ist.format('YYYY-MM-DD HH:mm:ss'),
                        end_date: end_date_ist.format('YYYY-MM-DD HH:mm:ss'),
                        duration: contest.duration,
                        platform: contest.resource.name,
                        link: contest.href
                    };
                });

            setContests(contests);
            setUniquePlatforms([...new Set(contests.map(contest => contest.platform))]);
            
            // Check existing reminders
            const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
            const reminderMap = {};
            reminders.forEach(reminder => {
                reminderMap[reminder.id] = true;
            });
            setReminderButtons(reminderMap);
        } catch (error) {
            console.error('Error fetching contests:', error);
            setError('Failed to load contests. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const splitDateTime = (dateTime) => {
        const [date, time] = dateTime.split(' ');
        return { date, time };
    };

    const handleSetReminder = (id, name, startDate, link) => {
        const startDateObj = new Date(startDate);
        const reminderDate = new Date(startDateObj.getTime() - 2 * 60 * 1000); // 2 minutes before start time

        const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
        const existingReminder = reminders.find(r => r.id === id);
        
        if (existingReminder) {
            toast.info('Reminder already set for this contest! 🔔');
            return;
        }

        const newReminder = {
            id,
            name,
            startDate: reminderDate,
            link
        };
        
        reminders.push(newReminder);
        localStorage.setItem('reminders', JSON.stringify(reminders));

        setReminderButtons(prevButtons => ({
            ...prevButtons,
            [id]: true
        }));

        toast.success(`Reminder set for ${name}! 🎯`);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
            const currentDateTime = new Date();

            const remainingReminders = reminders.filter(reminder => {
                const reminderDate = new Date(reminder.startDate);

                if (currentDateTime.getTime() >= reminderDate.getTime()) {
                    toast.success(`🏆 Contest Alert: ${reminder.name} is starting soon!\n🔗 Contest link: ${reminder.link}`, {
                        autoClose: 10000,
                        onClick: () => window.open(reminder.link, '_blank')
                    });
                    return false;
                }
                return true;
            });

            localStorage.setItem('reminders', JSON.stringify(remainingReminders));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const filteredContests = contests.filter(contest => 
        filteredPlatform === 'all' || contest.platform === filteredPlatform
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-300 text-lg">Loading contests...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h3 className="text-2xl font-semibold text-gray-300 mb-2">Failed to Load Contests</h3>
                    <p className="text-gray-500 mb-6">{error}</p>
                    <button 
                        onClick={fetchContests}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-full mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 max-w-7xl mx-auto">
                    <button 
                        onClick={goBack}
                        className="p-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/50 hover:bg-slate-700/50 hover:border-purple-500/50 transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            🏆 Upcoming Contests
                        </h1>
                        <p className="text-gray-400 text-lg mt-2">Stay updated with coding competitions</p>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 mb-8 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 flex-wrap">
                        <Filter className="w-5 h-5 text-purple-400" />
                        <label htmlFor="platform-filter" className="text-white font-semibold">
                            Filter by platform:
                        </label>
                        <select 
                            id="platform-filter" 
                            value={filteredPlatform}
                            onChange={(e) => setFilteredPlatform(e.target.value)}
                            className="px-4 py-2 bg-slate-700/50 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="all">All Platforms</option>
                            {uniquePlatforms.map(platform => (
                                <option key={platform} value={platform}>{platform}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Contests Grid */}
                <div className="max-w-7xl mx-auto">
                    {filteredContests.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🏁</div>
                            <h3 className="text-2xl font-semibold text-gray-300 mb-2">No contests found</h3>
                            <p className="text-gray-500">Try adjusting your filter or check back later!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {filteredContests.map(contest => (
                                <div 
                                    key={contest.id}
                                    className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-6 hover:shadow-purple-500/10 transition-all duration-500 hover:transform hover:scale-105"
                                >
                                    {/* Contest Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-white mb-2 truncate">
                                                {contest.name}
                                            </h3>
                                        </div>
                                        <div className="ml-3 flex-shrink-0">
                                            {logo.has(contest.platform) ? (
                                                <img 
                                                    src={logo.get(contest.platform)} 
                                                    alt={contest.platform} 
                                                    className="w-10 h-10 rounded-lg border border-slate-600 object-contain bg-white/10"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                                    {contest.platform.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Contest Details */}
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Calendar className="w-4 h-4 text-green-400 flex-shrink-0" />
                                            <span className="text-sm truncate">
                                                <span className="font-semibold">Start:</span> {splitDateTime(contest.start_date).date}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Clock className="w-4 h-4 text-green-400 flex-shrink-0" />
                                            <span className="text-sm">
                                                <span className="font-semibold">Time:</span> {splitDateTime(contest.start_date).time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Clock className="w-4 h-4 text-red-400 flex-shrink-0" />
                                            <span className="text-sm truncate">
                                                <span className="font-semibold">End:</span> {splitDateTime(contest.end_date).date} {splitDateTime(contest.end_date).time}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <a
                                            href={contest.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 px-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-1 text-sm"
                                        >
                                            <Play className="w-4 h-4" />
                                            <span className="hidden sm:inline">Compete</span>
                                        </a>
                                        <button
                                            onClick={() => handleSetReminder(contest.id, contest.name, contest.start_date, contest.link)}
                                            disabled={reminderButtons[contest.id]}
                                            className={`bg-gradient-to-r font-semibold py-2 px-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-1 text-sm ${
                                                reminderButtons[contest.id]
                                                    ? 'from-green-600 to-emerald-600 text-white cursor-not-allowed'
                                                    : 'from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white hover:shadow-orange-500/25'
                                            }`}
                                        >
                                            <Bell className="w-4 h-4" />
                                            <span className="hidden sm:inline">{reminderButtons[contest.id] ? 'Set' : 'Remind'}</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContestList;
