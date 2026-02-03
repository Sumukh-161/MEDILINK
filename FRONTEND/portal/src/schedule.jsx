import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Bell, User, Plus, Clock, X, ChevronDown, Home, Heart, Upload, BookUser, CreditCard } from 'lucide-react';

const CalendarUI = ({ onBack, onNavigateToHealth, onNavigateToProfile, onNavigateToUpload, onNavigateToBooking }) => {
  const [selectedDate, setSelectedDate] = useState(18);
  const [showFilters, setShowFilters] = useState(true);
  const [activeIcon, setActiveIcon] = useState(4);
  const [filters, setFilters] = useState({
    doctorVisits: true,
    labTests: false,
    dentalAppts: false,
    therapy: false,
    imaging: false,
    followUps: false
  });

  const sidebarIcons = [
    { icon: Home },
    { icon: Heart },
    { icon: Upload },
    { icon: BookUser },
    { icon: CreditCard },
    { icon: User },
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const calendarDays = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, null, null, null, null, null, null]
  ];

  const events = [
    {
      time: '09:00 AM - 09:30 AM',
      title: 'Cardiology Consultation',
      patient: 'Dr. Sarah Mitchell',
      color: 'bg-red-400',
      avatars: ['bg-pink-400', 'bg-red-400', 'bg-blue-400', 'bg-purple-400'],
      count: 2,
      day: 'Wednesday'
    },
    {
      time: '10:00 AM - 10:30 AM',
      title: 'Blood Test - Complete Panel',
      patient: 'Lab - Room 3A',
      color: 'bg-amber-200',
      avatars: ['bg-orange-400', 'bg-teal-600', 'bg-purple-500', 'bg-gray-600'],
      day: 'Thursday'
    },
    {
      time: '09:45 AM - 10:25 AM',
      title: 'General Checkup',
      patient: 'Dr. James Wilson',
      color: 'bg-white border border-gray-200',
      day: 'Monday'
    },
    {
      time: '10:00 AM - 11:45 AM',
      title: 'Physical Therapy Session',
      patient: 'PT Dept - Floor 2',
      color: 'bg-white border border-gray-200',
      avatars: ['bg-orange-400', 'bg-pink-400', 'bg-blue-400', 'bg-gray-600'],
      count: 3,
      day: 'Tuesday'
    },
    {
      time: '10:00 AM - 10:45 AM',
      title: 'Dental Cleaning',
      patient: 'Dr. Emily Chen - Dental Wing',
      color: 'bg-blue-200',
      day: 'Wednesday'
    },
    {
      time: '11:00 AM - 11:45 AM',
      title: 'X-Ray Imaging',
      patient: 'Radiology - Room 5B',
      color: 'bg-white border border-gray-200',
      day: 'Monday'
    },
    {
      time: '11:00 AM - 12:00 PM',
      title: 'Orthopedic Consultation',
      patient: 'Dr. Robert Lee',
      color: 'bg-white border border-gray-200',
      avatars: ['bg-teal-500', 'bg-orange-400', 'bg-pink-400', 'bg-blue-400'],
      day: 'Tuesday'
    },
    {
      time: '11:00 AM - 12:00 PM',
      title: 'Diabetes Follow-up',
      patient: 'Dr. Maria Rodriguez',
      color: 'bg-purple-300',
      avatars: ['bg-pink-400', 'bg-orange-400'],
      day: 'Thursday'
    },
    {
      time: '01:00 PM - 02:15 PM',
      title: 'Eye Examination',
      patient: 'Dr. David Park - Ophthalmology',
      color: 'bg-green-200',
      avatars: ['bg-orange-400', 'bg-blue-400'],
      day: 'Monday'
    },
    {
      time: '01:00 PM - 02:00 PM',
      title: 'Post-Surgery Checkup',
      patient: 'Dr. Lisa Brown',
      color: 'bg-white border border-gray-200',
      avatars: ['bg-purple-500', 'bg-orange-400', 'bg-gray-600'],
      day: 'Wednesday'
    },
    {
      time: '01:00 PM - 01:30 PM',
      title: 'Vaccination Appointment',
      patient: 'Immunization Clinic',
      color: 'bg-teal-200',
      day: 'Thursday'
    }
  ];

  return (
    <div className="h-screen bg-gray-50 flex p-6 gap-6">
      {/* Fixed Floating Circular Sidebar */}
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
                      onBack();
                    } else if (index === 1) {
                      onNavigateToHealth();
                    } else if (index === 2) {
                      onNavigateToUpload?.();
                    } else if (index === 3) {
                      onNavigateToBooking?.();
                    } else if (index === 4) {
                      setActiveIcon(index);
                    } else if (index === 5) {
                      onNavigateToProfile();
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

      {/* Left Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col">
        {/* Mini Calendar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">June 2025</h2>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day, i) => (
              <div key={i} className="text-center text-xs text-gray-500 font-medium py-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((week, weekIdx) => (
              <React.Fragment key={weekIdx}>
                {week.map((day, dayIdx) => (
                  <div
                    key={dayIdx}
                    onClick={() => day && setSelectedDate(day)}
                    className={`
                      aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer
                      ${!day ? 'invisible' : ''}
                      ${day === 18 ? 'bg-teal-500 text-white font-semibold' : ''}
                      ${day && day !== 18 ? 'hover:bg-gray-100 text-gray-700' : ''}
                      ${day === 19 ? 'bg-teal-100' : ''}
                    `}
                  >
                    {day}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Appointment Reminder Card */}
        <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-2xl p-4 mb-6 text-white">
          <div className="text-xs mb-1 opacity-90">Upcoming Appointment</div>
          <h3 className="font-semibold mb-2">Cardiology Consultation</h3>
          <div className="flex items-center gap-1 text-sm mb-3">
            <Clock className="w-4 h-4" />
            <span>09:00 - 09:30 AM</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-red-300 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center text-xs font-semibold">+2</div>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                <Clock className="w-4 h-4 text-gray-700" />
              </button>
              <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-between w-full mb-3 font-semibold text-gray-800"
          >
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          {showFilters && (
            <div className="space-y-2">
              {Object.entries(filters).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setFilters({...filters, [key]: !value})}
                    className="w-4 h-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Other Calendars */}
        <div>
          <button className="flex items-center justify-between w-full font-semibold text-gray-800">
            <span>Other Calendars</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search a task..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">⌘S</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-semibold">
                  JD
                </div>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">June, 18 2025</h1>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                <button className="px-4 py-1.5 text-sm text-gray-600 hover:bg-white rounded-md">Daily</button>
                <button className="px-4 py-1.5 text-sm bg-white text-gray-900 rounded-md shadow-sm font-medium">Weekly</button>
                <button className="px-4 py-1.5 text-sm text-gray-600 hover:bg-white rounded-md">Monthly</button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg font-medium">
                <Plus className="w-4 h-4" />
                New Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="grid grid-cols-4 gap-4 p-6">
            {/* Monday */}
            <div>
              <div className="text-center mb-4">
                <div className="text-sm text-gray-500">Monday</div>
                <div className="text-2xl font-semibold text-gray-800">16</div>
              </div>
              <div className="space-y-3">
                <div className={`${events[2].color} rounded-xl p-3`}>
                  <div className="font-medium text-gray-800 text-sm mb-1">{events[2].title}</div>
                  <div className="text-xs text-gray-600 mb-2">{events[2].patient}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>{events[2].time}</span>
                  </div>
                </div>
                <div className={`${events[5].color} rounded-xl p-3`}>
                  <div className="font-medium text-gray-800 text-sm mb-1">{events[5].title}</div>
                  <div className="text-xs text-gray-600 mb-2">{events[5].patient}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>{events[5].time}</span>
                  </div>
                </div>
                <div className={`${events[8].color} rounded-xl p-3`}>
                  <div className="font-medium text-gray-800 text-sm mb-1">{events[8].title}</div>
                  <div className="text-xs text-gray-600 mb-2">{events[8].patient}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{events[8].time}</span>
                  </div>
                  <div className="flex -space-x-1">
                    {events[8].avatars.map((bg, i) => (
                      <div key={i} className={`w-6 h-6 rounded-full ${bg} border-2 border-white`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tuesday */}
            <div>
              <div className="text-center mb-4">
                <div className="text-sm text-gray-500">Tuesday</div>
                <div className="text-2xl font-semibold text-gray-800">17</div>
              </div>
              <div className="space-y-3">
                <div className={`${events[3].color} rounded-xl p-3`}>
                  <div className="font-medium text-gray-800 text-sm mb-1">{events[3].title}</div>
                  <div className="text-xs text-gray-600 mb-2">{events[3].patient}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{events[3].time}</span>
                  </div>
                  <div className="flex items-center -space-x-1">
                    {events[3].avatars.map((bg, i) => (
                      <div key={i} className={`w-6 h-6 rounded-full ${bg} border-2 border-white`}></div>
                    ))}
                    <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600">+{events[3].count}</div>
                  </div>
                </div>
                <div className={`${events[6].color} rounded-xl p-3`}>
                  <div className="font-medium text-gray-800 text-sm mb-1">{events[6].title}</div>
                  <div className="text-xs text-gray-600 mb-2">{events[6].patient}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{events[6].time}</span>
                  </div>
                  <div className="flex -space-x-1">
                    {events[6].avatars.map((bg, i) => (
                      <div key={i} className={`w-6 h-6 rounded-full ${bg} border-2 border-white`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Wednesday */}
            <div>
              <div className="text-center mb-4">
                <div className="text-sm text-gray-500">Wednesday</div>
                <div className="text-2xl font-semibold text-gray-800">18</div>
              </div>
              <div className="space-y-3">
                <div className={`${events[0].color} rounded-xl p-3`}>
                  <div className="font-medium text-white text-sm mb-1">{events[0].title}</div>
                  <div className="text-xs text-red-100 mb-2">{events[0].patient}</div>
                  <div className="flex items-center gap-1 text-xs text-red-100">
                    <Clock className="w-3 h-3" />
                    <span>{events[0].time}</span>
                  </div>
                </div>
                <div className={`${events[4].color} rounded-xl p-3`}>
                  <div className="font-medium text-gray-800 text-sm mb-1">{events[4].title}</div>
                  <div className="text-xs text-gray-600 mb-2">{events[4].patient}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>{events[4].time}</span>
                  </div>
                </div>
                <div className={`${events[9].color} rounded-xl p-3`}>
                  <div className="font-medium text-gray-800 text-sm mb-1">{events[9].title}</div>
                  <div className="text-xs text-gray-600 mb-2">{events[9].patient}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{events[9].time}</span>
                  </div>
                  <div className="flex -space-x-1">
                    {events[9].avatars.map((bg, i) => (
                      <div key={i} className={`w-6 h-6 rounded-full ${bg} border-2 border-white`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Thursday */}
            <div>
              <div className="text-center mb-4">
                <div className="text-sm text-gray-500">Thursday</div>
                <div className="text-2xl font-semibold text-gray-800">19</div>
              </div>
              <div className="space-y-3">
                <div className={`${events[1].color} rounded-xl p-3`}>
                  <div className="font-medium text-gray-800 text-sm mb-1">{events[1].title}</div>
                  <div className="text-xs text-gray-600 mb-2">{events[1].patient}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{events[1].time}</span>
                  </div>
                  <div className="flex -space-x-1">
                    {events[1].avatars.map((bg, i) => (
                      <div key={i} className={`w-6 h-6 rounded-full ${bg} border-2 border-white`}></div>
                    ))}
                  </div>
                </div>
                <div className={`${events[7].color} rounded-xl p-3`}>
                  <div className="font-medium text-gray-800 text-sm mb-1">{events[7].title}</div>
                  <div className="text-xs text-gray-600 mb-2">{events[7].patient}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{events[7].time}</span>
                  </div>
                  <div className="flex -space-x-1">
                    {events[7].avatars.map((bg, i) => (
                      <div key={i} className={`w-6 h-6 rounded-full ${bg} border-2 border-white`}></div>
                    ))}
                  </div>
                </div>
                <div className={`${events[10].color} rounded-xl p-3`}>
                  <div className="font-medium text-gray-800 text-sm mb-1">{events[10].title}</div>
                  <div className="text-xs text-gray-600 mb-2">{events[10].patient}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>{events[10].time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarUI;