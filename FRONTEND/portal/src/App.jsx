import React, { useState } from "react";
import {
  Calendar,
  Bell,
  Settings,
  Plus,
  ChevronRight,
  Home,
  Heart,
  Upload,
  BookUser,
  CreditCard,
  User,
} from "lucide-react";
import doctorImage from './doctorooo.jpeg';
import doctorImage_1 from './Anya........png';
import doctorImage_2 from './doctereeeee......png';
import my_consultation from './consultation.png';
import pills from './pills.png';
import Reports from './Reports.jpg';
import tabu from './Capsule_01.png';
import HealthDashboard from './H_Track.jsx';
import CalendarUI from './schedule.jsx';
import PatientProfile from './profile.jsx';
import TextExtractor from './Upload.jsx';
import AppointmentBooking from './Booking.jsx';


const MourUI = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [selectedDate, setSelectedDate] = useState(19);
  const [activeIcon, setActiveIcon] = useState(0);
  const [currentView, setCurrentView] = useState("main");

  const scheduleItems = [
    { id: 1, title: "Hirurgy", doctor: "Ann Curgy", color: "bg-red-100", icon: "🏥" },
    { id: 2, title: "Cardiology", doctor: "Alise Prensh", color: "bg-blue-100", icon: "💙" },
    { id: 3, title: "Teraphy", doctor: "Andry Willon", color: "bg-yellow-100", icon: "🧠" },
  ];

  const sidebarIcons = [
    { icon: Home },
    { icon: Heart },
    { icon: Upload },
    { icon: BookUser },
    { icon: CreditCard },
    { icon: User },
  ];

  if (currentView === 'health') {
    return <HealthDashboard onBack={() => setCurrentView("main")} onNavigateToSchedule={() => setCurrentView('schedule')} onNavigateToProfile={() => setCurrentView('profile')} onNavigateToUpload={() => setCurrentView('upload')} onNavigateToBooking={() => setCurrentView('booking')} />;
  }

  if (currentView === 'schedule') {
    return <CalendarUI onBack={() => setCurrentView("main")} onNavigateToHealth={() => setCurrentView('health')} onNavigateToProfile={() => setCurrentView('profile')} onNavigateToUpload={() => setCurrentView('upload')} onNavigateToBooking={() => setCurrentView('booking')} />
  }

  if (currentView === 'profile') {
    return <PatientProfile onBack={() => setCurrentView("main")} onNavigateToHealth={() => setCurrentView('health')} onNavigateToSchedule={() => setCurrentView('schedule')} onNavigateToUpload={() => setCurrentView('upload')} onNavigateToBooking={() => setCurrentView('booking')} onNavigateToMain={() => setCurrentView("main")} />;
  }

  if (currentView === 'upload') {
    return <TextExtractor onBack={() => setCurrentView("main")} />;
  }

  if (currentView === 'booking') {
    return <AppointmentBooking onBack={() => setCurrentView("main")} />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-6 gap-6">
      
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
                      setActiveIcon(index);
                    } else if (index === 1) {
                      setCurrentView('health');
                    } else if (index === 2) {
                      setCurrentView('upload');
                    } else if (index === 3) {
                      setCurrentView('booking');
                    } else if (index === 4) {
                      setCurrentView('schedule');
                    } else if (index === 5) {
                      setCurrentView('profile');
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

      
      <div className="flex-1 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col h-full">
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-gray-700">Sitha</span>
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 max-w-md mx-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-5 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-teal-300 focus:bg-white transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 bg-teal-500 text-white rounded-xl text-sm font-medium hover:bg-teal-600 transition shadow-sm">
              Create an encounter
            </button>
          </div>
        </div>

        
        <div className="flex-1 flex gap-6 p-8 overflow-hidden">
          
          <div className="flex-1 flex flex-col gap-6 min-w-0 overflow-auto">
            
            <div className="relative rounded-3xl shadow-md border border-gray-100 overflow-hidden">
              <img src={tabu} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/20"></div>
              <div className="relative flex items-center p-8 gap-8">
                
                <img src={doctorImage_1} alt="Patient" className="w-40 h-40 object-cover rounded-3xl flex-shrink-0" />

                
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Hello, Sitha, here your main indexes:
                  </h2>
                  
                  <div className="grid grid-cols-6 gap-6">
                    <IndexItem label="Sex" value="Female" />
                    <IndexItem label="Age" value="19 y/o" />
                    <IndexItem label="Height" value="168 cm" />
                    <IndexItem label="Weight" value="52 kg" />
                    <IndexItem label="Blood type" value="B+" />
                    <IndexItem label="Fitzpatrick" value="3rd type" />
                  </div>
                </div>
              </div>
            </div>

            
            <div className="flex gap-8 border-b border-gray-100">
              {["info", "chat", "doctor"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-medium capitalize border-b-2 transition ${
                    activeTab === tab
                      ? "border-teal-500 text-gray-800"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab === "doctor" ? "Doctor Page" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            
            <div className="grid grid-cols-3 gap-3 justify-items-start max-w-full">
              <InfoCard image={pills} title="Pills shedule" subtitle="5 pills " />
              <InfoCard image={Reports} title="My reports" subtitle="5 files" />
              <InfoCard image={my_consultation} title="My consultation" subtitle="4 consultation" />
            </div>

            
            <div className="flex-1 grid grid-cols-[45%_55%] gap-6">
              
              <div className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-3xl p-6 flex flex-col shadow-sm border border-teal-100">
                <p className="text-xs uppercase tracking-wider text-teal-500 mb-2 font-semibold">Community</p>
                <h3 className="text-xl font-semibold text-gray-800 leading-tight mb-6">
                  Join to our<br />medicine volonteer
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6 flex-1">
                  <CommunityRow label="Place" value="Monday" icon="📍" />
                  <CommunityRow label="Time" value="3 pm" icon="🕒" />
                  <CommunityRow label="Goals" value="help to people" icon="🎯" />
                  <CommunityRow label="Condition" value="be available" icon="✅" />
                </div>
                <button className="bg-teal-500 text-white rounded-2xl px-8 py-3 text-sm font-medium hover:bg-teal-600 transition shadow-md">
                  Join
                </button>
              </div>

              
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">View all shedule</h3>
                  <button className="text-2xl text-gray-400 hover:text-gray-600">•••</button>
                </div>
                <div className="space-y-3 flex-1">
                  {scheduleItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-5 py-4 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-2xl`}>
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 mb-0.5">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.doctor}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          
          <div className="w-80 flex-shrink-0 flex flex-col gap-6">
            
            <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-semibold text-gray-800">July 2020</span>
                </div>
                <div className="flex gap-1">
                  <NavBtn>{"<"}</NavBtn>
                  <NavBtn>{">"}</NavBtn>
                </div>
              </div>
              <div className="grid grid-cols-7 text-xs text-gray-400 text-center mb-3 font-medium">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2 text-sm text-center">
                {[...Array(31)].map((_, i) => {
                  const date = i + 1;
                  const isSelected = date === selectedDate;
                  const isSpecial = date === 2 || date === 7 || date === 19;
                  
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`w-10 h-10 rounded-xl font-medium transition ${
                        isSelected
                          ? "bg-teal-500 text-white shadow-md"
                          : isSpecial
                          ? "bg-pink-100 text-pink-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {date === 19 ? "🌸" : date}
                    </button>
                  );
                })}
              </div>
            </div>

            
            <div className="flex-1 rounded-3xl overflow-hidden shadow-lg">
              <img src={doctorImage_2} alt="Doctor" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ bg, icon, title, subtitle, dark, tall, image }) => (
  <div className={`${image ? 'relative' : bg} rounded-3xl p-6 shadow-md border ${dark ? 'border-teal-400' : 'border-gray-100'} min-h-80 w-full max-w-xs overflow-hidden`}>
    {image ? (
      <>
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
        <div className="relative flex flex-col h-full justify-end">
          <h3 className="text-sm font-semibold mb-1 text-white">
            {title}
          </h3>
          <p className="text-xs text-white/80">{subtitle}</p>
        </div>
      </>
    ) : (
      <>
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className={`text-sm font-semibold mb-1 ${dark ? "text-white" : "text-gray-800"}`}>
          {title}
        </h3>
        <p className={`text-xs ${dark ? "text-white/80" : "text-gray-500"}`}>{subtitle}</p>
      </>
    )}
  </div>
);

const IndexItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 mb-1.5 font-medium">{label}</p>
    <p className="text-base text-gray-800 font-semibold">{value}</p>
  </div>
);

const CommunityRow = ({ label, value, icon }) => (
  <div>
    <p className="text-xs uppercase text-gray-400 mb-1.5">{label}</p>
    <p className="text-sm text-gray-700 font-medium">
      {icon} {value}
    </p>
  </div>
);

const NavBtn = ({ children }) => (
  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-sm text-gray-500 hover:bg-gray-100 transition">
    {children}
  </button>
);

export default MourUI;