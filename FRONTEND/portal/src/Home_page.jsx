import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Loader2,
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
  LogOut,
} from "lucide-react";
import doctorImage from './doctorooo.jpeg';
import doctorImage_1 from './Anya........png';
import doctorImage_3 from './Lufy.png';
import doctorImage_2 from './doctereeeee......png';
import my_consultation from './consultation.png';
import my_consultation1 from './clip_board_resize.png';
import pills from './pills.png';
import tabi from './Tablet.jpg';
import Reports from './Reports.jpg';
import tabu from './Capsule_01.png';
import volunteerImg from './volunteer_2.jpg';
import HealthDashboard from './H_Track.jsx';
import CalendarUI from './schedule.jsx';
import PatientProfile from './profile.jsx';
import TextExtractor from './Upload.jsx';
import AppointmentBooking from './Booking.jsx';


const MourUI = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  const [selectedDate, setSelectedDate] = useState(19);
  const [activeIcon, setActiveIcon] = useState(0);
  const [currentView, setCurrentView] = useState("main");
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reports Modal State
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [reportsData, setReportsData] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [reportsError, setReportsError] = useState(null);

  // Default patient info
  const defaultProfileData = {
    sex: "Female",
    age: 19,
    height: "168 cm",
    weight: "52 kg",
    bloodType: "B+",
    fitzpatrick: "3rd type"
  };

  const [profileData, setProfileData] = useState(defaultProfileData);

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

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const savedUserName = localStorage.getItem("userName");
        const userEmail = localStorage.getItem("userEmail");

        console.log('📧 User email:', userEmail);
        console.log('👤 User name:', savedUserName);

        if (savedUserName) {
          setUserName(savedUserName);
        } else {
          setUserName("Guest");
        }

        // Fetch profile data
        if (userEmail) {
          const encodedEmail = encodeURIComponent(userEmail);
          const apiUrl = `http://127.0.0.1:8000/users/profile?gmail=${encodedEmail}`;
          console.log('🔗 Fetching from:', apiUrl);

          const response = await fetch(apiUrl);
          console.log('📊 Response status:', response.status);

          if (response.ok) {
            const data = await response.json();
            console.log('✅ Full API response:', data);
            console.log('Age from API:', data.age);
            console.log('Blood type from API:', data.bloodType);
            setProfileData(data);
            console.log('profileData state updated with:', data);
          } else {
            console.warn('❌ Failed to fetch profile (status:', response.status, ')');
            setProfileData(defaultProfileData);
          }
        } else {
          console.warn('⚠️ No email in localStorage');
          setProfileData(defaultProfileData);
        }

        setLoading(false);
      } catch (err) {
        console.error("💥 Fetch error:", err);
        setUserName("Guest");
        setProfileData(defaultProfileData);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      // Even if error, try to navigate
      navigate("/login");
    }
  };

  const handleReportsClick = async () => {
    setShowReportsModal(true);
    setReportsLoading(true);
    setReportsError(null);
    setReportsData([]);

    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        throw new Error("User email not found. Please login again.");
      }

      const encodedEmail = encodeURIComponent(userEmail);
      const url = `http://127.0.0.1:8000/reports/?gmail=${encodedEmail}`;
      console.log('Fetching reports from:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch reports. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Reports data:', data);

      // The API returns an array under the "data" key
      if (data && data.data && Array.isArray(data.data)) {
        setReportsData(data.data);
      } else {
        throw new Error("Invalid response format from server.");
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
      setReportsError(err.message);
    } finally {
      setReportsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-teal-400 border-t-teal-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleNavigation = (index) => {
    setActiveIcon(index);
    const views = ['main', 'health', 'upload', 'booking', 'schedule', 'profile'];
    setCurrentView(views[index] || 'main');
  };

  const renderView = () => {
    switch (currentView) {
      case 'health':
        return (
          <HealthDashboard
            onBack={() => setCurrentView("main")}
            onNavigateToSchedule={() => setCurrentView('schedule')}
            onNavigateToProfile={() => setCurrentView('profile')}
            onNavigateToUpload={() => setCurrentView('upload')}
            onNavigateToBooking={() => setCurrentView('booking')}
          />
        );
      case 'schedule':
        return (
          <CalendarUI
            onBack={() => setCurrentView("main")}
            onNavigateToHealth={() => setCurrentView('health')}
            onNavigateToProfile={() => setCurrentView('profile')}
            onNavigateToUpload={() => setCurrentView('upload')}
            onNavigateToBooking={() => setCurrentView('booking')}
          />
        );
      case 'profile':
        return (
          <PatientProfile
            onBack={() => setCurrentView("main")}
            onNavigateToHealth={() => setCurrentView('health')}
            onNavigateToSchedule={() => setCurrentView('schedule')}
            onNavigateToUpload={() => setCurrentView('upload')}
            onNavigateToBooking={() => setCurrentView('booking')}
            onNavigateToMain={() => setCurrentView("main")}
          />
        );
      case 'upload':
        return <TextExtractor onBack={() => setCurrentView("main")} />;
      case 'booking':
        return <AppointmentBooking onBack={() => setCurrentView("main")} />;
      default:
        return null;
    }
  };

  // Render sub-views with error boundary fallback
  if (currentView !== 'main') {
    try {
      const view = renderView();
      if (view) return view;
    } catch (err) {
      console.error("View render error:", err);
      return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-red-500 mb-4 font-medium">Something went wrong loading this page.</p>
            <button
              onClick={() => setCurrentView("main")}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
            >
              ← Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center p-6 gap-6">

      {/* SIDEBAR */}
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
                  onClick={() => handleNavigation(index)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isActive
                    ? 'bg-white shadow-lg scale-110'
                    : 'hover:bg-white/20'
                    }`}
                >
                  <Icon
                    className={`w-7 h-7 ${isActive
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

      {/* MAIN PANEL */}
      <div className="flex-1 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col h-full">

        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-gray-700">{userName}</span>
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
            <button
              onClick={handleLogout}
              className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 flex gap-6 p-8 overflow-hidden">

          {/* LEFT COLUMN */}
          <div className="flex-1 flex flex-col gap-6 min-w-0 overflow-auto">

            {/* PATIENT BANNER */}
            <div className="relative rounded-3xl shadow-md border border-gray-100 overflow-hidden">
              <img
                src={tabu}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/20"></div>
              <div className="relative flex items-center p-8 gap-8">
                <img
                  src={profileData?.sex?.toLowerCase() === "male" ? doctorImage_3 : doctorImage_1}
                  alt="Patient"
                  className="w-40 h-40 object-cover rounded-3xl flex-shrink-0 bg-gray-200"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3C/svg%3E';
                  }}
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Hello, {userName}, here your main indexes:
                  </h2>
                  <div className="grid grid-cols-6 gap-6">
                    <IndexItem label="Sex" value={profileData?.sex || "Female"} />
                    <IndexItem label="Age" value={profileData?.age ? `${profileData.age} y/o` : "19 y/o"} />
                    <IndexItem label="Height" value={profileData?.height || "168 cm"} />
                    <IndexItem label="Weight" value={profileData?.weight || "52 kg"} />
                    <IndexItem label="Blood type" value={profileData?.bloodType || "B+"} />
                    <IndexItem label="Fitzpatrick" value={profileData?.fitzpatrick || "3rd type"} />
                  </div>
                </div>
              </div>
            </div>

            {/* TABS */}
            <div className="flex gap-8 border-b border-gray-100">
              {["info", "chat", "doctor"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-medium capitalize border-b-2 transition ${activeTab === tab
                    ? "border-teal-500 text-gray-800"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                >
                  {tab === "doctor" ? "Doctor Page" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* INFO CARDS */}
            <div className="grid grid-cols-3 gap-3 justify-items-start max-w-full">
              <InfoCard image={tabi} title="Pills schedule" subtitle="5 pills" />
              <InfoCard
                image={Reports}
                title="My reports"
                subtitle="View your files"
                onClick={handleReportsClick}
                clickable={true}
              />
              <InfoCard image={my_consultation1} title="My consultation" subtitle="4 consultations" />
            </div>

            {/* BOTTOM SECTION */}
            <div className="flex-1 grid grid-cols-[45%_55%] gap-6">

              {/* COMMUNITY CARD */}
              <div className="relative rounded-3xl p-6 flex flex-col shadow-sm border border-teal-100 overflow-hidden min-h-full">
                <img
                  src={volunteerImg}
                  alt="Volunteer Background"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 to-cyan-100/90 hover:from-teal-50/60 hover:to-cyan-100/70 transition-all"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <p className="text-xs uppercase tracking-wider text-teal-700 mb-2 font-bold drop-shadow-sm">Community</p>
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight mb-6 drop-shadow-sm">
                    Join to our<br />medicine volunteer
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-6 flex-1">
                    <CommunityRow label="Place" value="Monday" icon="📍" />
                    <CommunityRow label="Time" value="3 pm" icon="🕒" />
                    <CommunityRow label="Goals" value="help to people" icon="🎯" />
                    <CommunityRow label="Condition" value="be available" icon="✅" />
                  </div>
                  <button className="bg-teal-500 text-white rounded-2xl px-8 py-3 text-sm font-medium hover:bg-teal-600 transition shadow-md mt-auto">
                    Join
                  </button>
                </div>
              </div>

              {/* SCHEDULE LIST */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">View all schedule</h3>
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

          {/* RIGHT COLUMN */}
          <div className="w-80 flex-shrink-0 flex flex-col gap-6">

            {/* CALENDAR */}
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
                      className={`w-10 h-10 rounded-xl font-medium transition ${isSelected
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

            {/* DOCTOR IMAGE */}
            <div className="flex-1 rounded-3xl overflow-hidden shadow-lg bg-gray-200">
              <img
                src={doctorImage_2}
                alt="Doctor"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.backgroundColor = '#e5e7eb'; }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* REPORTS MODAL */}
      {showReportsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">My Reports</h2>
              <button
                onClick={() => setShowReportsModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {reportsLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-teal-500 animate-spin mb-4" />
                  <p className="text-gray-500 font-medium">Loading your reports...</p>
                </div>
              ) : reportsError ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100">
                  <p className="font-medium mb-2">Oops!</p>
                  <p>{reportsError}</p>
                </div>
              ) : reportsData && reportsData.length > 0 ? (
                <div className="space-y-4">
                  {reportsData.map((report) => (
                    <a
                      key={report.id}
                      href={report.drive_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-5 rounded-2xl border border-gray-100 bg-white hover:bg-teal-50 hover:border-teal-200 hover:shadow-md transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-teal-700">{report.report_title}</h3>
                        <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">{report.date}</span>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><span className="text-teal-500">🏥</span> {report.hospital_name}</span>
                        <span className="flex items-center gap-1.5"><span className="text-blue-500">👨‍⚕️</span> {report.doctor_name}</span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📄</div>
                  <p className="text-gray-500 font-medium text-lg">No reports found.</p>
                  <p className="text-sm text-gray-400 mt-1">Check back later or upload a new one.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

const InfoCard = ({ bg, icon, title, subtitle, dark, tall, image, onClick, clickable }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={`${image && !imageError ? 'relative' : bg} rounded-3xl p-6 shadow-md border ${dark ? 'border-teal-400' : 'border-gray-100'} min-h-80 w-full max-w-xs overflow-hidden ${clickable ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group' : ''}`}
    >
      {image && !imageError ? (
        <>
          <img
            src={image}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover ${clickable ? 'group-hover:scale-105 transition-transform duration-500' : ''}`}
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
          <div className="relative flex flex-col h-full justify-end">
            <h3 className="text-sm font-semibold mb-1 text-white">{title}</h3>
            <p className="text-xs text-white/80">{subtitle}</p>
          </div>
        </>
      ) : (
        <>
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className={`text-sm font-semibold mb-1 ${dark ? "text-white" : "text-gray-800"}`}>{title}</h3>
          <p className={`text-xs ${dark ? "text-white/80" : "text-gray-500"}`}>{subtitle}</p>
        </>
      )}
    </div>
  );
};

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