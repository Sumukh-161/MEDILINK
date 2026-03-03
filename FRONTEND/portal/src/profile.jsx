import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Heart,
  Activity,
  Pill,
  Phone,
  Mail,
  BookUser,
  MessageSquare,
  Clock,
  AlertCircle,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Filter,
  Plus,
  Home,
  Upload,
  CreditCard,
  Video,
} from 'lucide-react';

export default function PatientProfile({ onBack, onNavigateToHealth, onNavigateToSchedule, onNavigateToUpload, onNavigateToBooking, onNavigateToMain }) {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [activeIcon, setActiveIcon] = useState(0);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    try {
      const savedUserName = localStorage.getItem('userName');
      if (savedUserName) {
        setUserName(savedUserName);
      } else {
        setUserName('Guest');
      }
    } catch (err) {
      console.error('Error loading user data:', err);
      setUserName('Guest');
    }
  }, []);

  const sidebarIcons = [
    { icon: Home },
    { icon: Heart },
    { icon: Upload },
    { icon: BookUser },
    { icon: CreditCard },
    { icon: User },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-6 gap-6">
      {/* Floating Sidebar */}
      <div className="flex-shrink-0 flex items-center">
        <div className="bg-gradient-to-b from-teal-400 via-teal-500 to-cyan-400 rounded-full p-3 shadow-2xl w-fit h-fit">
          <div className="flex flex-col items-center gap-6 py-12 px-2">
            {sidebarIcons.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIcon === index;
              const isTopSection = index < 3;
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (index === 0) {
                      onNavigateToMain();
                    } else if (index === 1) {
                      onNavigateToHealth();
                    } else if (index === 2) {
                      onNavigateToUpload?.();
                    } else if (index === 3) {
                      onNavigateToBooking?.();
                    } else if (index === 4) {
                      onNavigateToSchedule();
                    } else if (index === 5) {
                      setActiveIcon(index);
                    } else {
                      setActiveIcon(index);
                    }
                  }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-white shadow-lg scale-110' 
                      : 'hover:bg-white/20'
                  }`}
                >
                  <Icon 
                    className={`w-7 h-7 ${
                      isActive 
                        ? isTopSection ? 'text-teal-500' : 'text-gray-400'
                        : 'text-white'
                    }`} 
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col h-full">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <nav className="flex items-center gap-2">
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Activity className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                <User className="w-5 h-5" />
                <span>Patients</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Calendar className="w-5 h-5" />
                <span>Appointments</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Pill className="w-5 h-5" />
                <span>Medications</span>
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Mail className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              DR
            </div>
          </div>
        </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white rounded-lg">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              Patient Profile
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium">
              Under Treatment
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600">
              Last Visit: March, 2024
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Patient Info */}
          <div className="space-y-6">
            {/* Patient Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    RS
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {userName}
                    </h2>
                    <p className="text-gray-500">
                      Patient ID: #PAT-2024-1547
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="flex gap-3 mb-6">
                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700">
                  <Mail className="w-5 h-5" />
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-2.5 rounded-lg hover:bg-gray-200">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-2.5 rounded-lg hover:bg-gray-200">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-2.5 rounded-lg hover:bg-gray-200">
                  <Video className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Next Appointment</span>
                  <button className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                    Edit
                  </button>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-800">
                    April 15, 2024 - 10:00 AM
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 mt-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Follow-up Consultation
                  </span>
                  <span className="ml-auto bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Patient Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="font-semibold text-gray-800">
                      {userName}
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Verified
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="font-semibold text-gray-800">
                      sithamahalakshmi@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Contact Number</p>
                    <p className="font-semibold text-gray-800">
                      9535673968
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="font-semibold text-gray-800">
                      March 15, 1985 (Age: 39)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Blood Type</p>
                    <p className="font-semibold text-gray-800">O+</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Allergies</p>
                    <p className="font-semibold text-gray-800">
                      Penicillin, Peanuts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Medications & Calendar */}
          <div className="space-y-6">
            {/* Ongoing Medications */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                    <Pill className="w-4 h-4" />
                    Ongoing Medications
                  </button>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Filter className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {/* Medication 1 */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-800">
                          Lisinopril 10mg
                        </h4>
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                      </div>
                      <p className="text-sm text-yellow-700 bg-yellow-100 inline-block px-2 py-0.5 rounded">
                        Blood Pressure
                      </p>
                    </div>
                    <button className="p-1 hover:bg-yellow-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
                        M
                      </div>
                      <div className="w-7 h-7 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
                        E
                      </div>
                      <div className="w-7 h-7 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                        +
                      </div>
                    </div>
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-medium">
                      60 days left
                    </span>
                  </div>
                </div>

                {/* Medication 2 */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-800">
                          Metformin 500mg
                        </h4>
                        <Activity className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-sm text-blue-700 bg-blue-100 inline-block px-2 py-0.5 rounded">
                        Diabetes
                      </p>
                    </div>
                    <button className="p-1 hover:bg-blue-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
                        M
                      </div>
                      <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
                        E
                      </div>
                      <div className="w-7 h-7 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                        +
                      </div>
                    </div>
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-medium">
                      45 days left
                    </span>
                  </div>
                </div>

                {/* Medication 3 */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-800">
                          Atorvastatin 20mg
                        </h4>
                        <Heart className="w-4 h-4 text-red-600" />
                      </div>
                      <p className="text-sm text-red-700 bg-red-100 inline-block px-2 py-0.5 rounded">
                        Cholesterol
                      </p>
                    </div>
                    <button className="p-1 hover:bg-red-100 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
                        E
                      </div>
                      <div className="w-7 h-7 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
                        N
                      </div>
                      <div className="w-7 h-7 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                        +
                      </div>
                    </div>
                    <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full font-medium">
                      30 days left
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Appointment Calendar
                </h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h4 className="text-xl font-bold text-gray-800">
                  {selectedMonth}
                </h4>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div
                    key={i}
                    className="text-center text-xs font-semibold text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}
                {[
                  null,
                  null,
                  null,
                  null,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20,
                  21,
                  22,
                  23,
                  24,
                  25,
                  26,
                  27,
                  28,
                  29,
                  30,
                  31,
                ].map((day, i) => (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
                      day === 5
                        ? 'bg-red-500 text-white font-bold'
                        : day === 12
                        ? 'bg-blue-500 text-white font-bold'
                        : day === 19
                        ? 'bg-yellow-500 text-white font-bold'
                        : day === 25
                        ? 'bg-gray-700 text-white font-bold'
                        : day === 27
                        ? 'bg-purple-600 text-white font-bold'
                        : day
                        ? 'hover:bg-gray-100 text-gray-700'
                        : ''
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-red-500 rounded" />
                  <span className="text-gray-600">Cardiology</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-blue-500 rounded" />
                  <span className="text-gray-600">General Checkup</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-purple-600 rounded" />
                  <span className="text-gray-600">Lab Test</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Messages & Alerts */}
          <div className="space-y-6">
            {/* Messages */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  Messages
                  <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    3
                  </span>
                </h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Message 1 */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      DC
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-800">
                          Dr. Catherine
                        </h4>
                        <button className="p-1 hover:bg-blue-100 rounded">
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        Your latest blood test results are ready. Please check
                        the attached report.
                      </p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        2 hours ago
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message 2 */}
                <div className="bg-gray-900 text-white rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      NP
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold">Nurse Patricia</h4>
                        <button className="p-1 hover:bg-gray-800 rounded">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-300 line-clamp-2">
                        Reminder: Please take your medication before 9 PM today
                      </p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        5 hours ago
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message 3 */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      RX
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-800">Pharmacy</h4>
                        <button className="p-1 hover:bg-green-100 rounded">
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        Your prescription refill is ready for pickup at our main
                        location
                      </p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        Yesterday
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Alerts */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Health Alerts
                </h3>
              </div>

              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-red-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        Medication Reminder
                      </p>
                      <p className="text-xs text-gray-600">
                        Lisinopril - Due in 2 hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        Upcoming Appointment
                      </p>
                      <p className="text-xs text-gray-600">
                        Cardiology - April 15, 10:00 AM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="flex items-start gap-2">
                    <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        Lab Results Available
                      </p>
                      <p className="text-xs text-gray-600">
                        Blood panel - View results
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Vital Signs
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Blood Pressure</p>
                      <p className="font-bold text-gray-800">120/80 mmHg</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Normal
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Heart Rate</p>
                      <p className="font-bold text-gray-800">72 bpm</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Normal
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Blood Sugar</p>
                      <p className="font-bold text-gray-800">95 mg/dL</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Normal
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Weight</p>
                      <p className="font-bold text-gray-800">165 lbs</p>
                    </div>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    Stable
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
