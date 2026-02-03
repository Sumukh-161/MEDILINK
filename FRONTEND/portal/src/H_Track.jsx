import React, { useState } from 'react';
import { Heart, Activity, Weight, Droplet, Menu, X, Home, BarChart2, Calendar, Settings, User, Bell, Plus, ChevronRight, Upload, BookUser, CreditCard } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  Line,
  ZAxis,
  ReferenceArea,
  Label,
  ReferenceLine,
} from 'recharts';
import heartBeat from './heart_beat.png';
import BP from './BP.png';
import Weight_1 from './Weight.png';

export default function HealthDashboard({ onBack, onNavigateToSchedule, onNavigateToProfile, onNavigateToUpload, onNavigateToBooking }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeIcon, setActiveIcon] = useState(1);
  const [currentView, setCurrentView] = useState("health");

  const sidebarIcons = [
    { icon: Home },
    { icon: Heart },
    { icon: Upload },
    { icon: BookUser },
    { icon: CreditCard },
    { icon: User },
  ];

  // Data for heart rate trend
  const heartRateData = [
    { name: 'Dec 8', value: 68 },
    { name: 'Dec 9', value: 70 },
    { name: 'Dec 10', value: 74 },
    { name: 'Dec 11', value: 70 },
    { name: 'Dec 12', value: 61 },
    { name: 'Dec 13', value: 68 },
    { name: 'Dec 14', value: 72 },
    { name: 'Dec 15', value: 73 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Floating Circular Sidebar */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
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
                      setActiveIcon(index);
                    } else if (index === 2) {
                      onNavigateToUpload?.();
                    } else if (index === 3) {
                      onNavigateToBooking?.();
                    } else if (index === 4) {
                      onNavigateToSchedule();
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

      {/* Main Content */}
      <div className="flex-1 ml-32 transition-all duration-300">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Health Dashboard</h1>
            <p className="text-gray-600 mt-2">Track your vital signs and health metrics</p>
          </div>

          {/* Time Filter Buttons */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium">Today</button>
              <button className="px-6 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50">This Week</button>
              <button className="px-6 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50">This Month</button>
              <button className="px-6 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50">Custom</button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">December 2024</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">+ Add Reading</button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              icon={<Heart className="text-red-500" size={32} />}
              title="Heart Rate"
              value="72"
              unit="bpm"
              status="Normal"
              statusColor="text-green-600"
              bgColor="bg-red-50"
              updated="2 mins ago"
              bgImage={heartBeat}
            />
            <MetricCard
              icon={<Activity className="text-purple-500" size={32} />}
              title="Blood Pressure"
              value="128/82"
              unit="mmHg"
              status="Elevated"
              statusColor="text-yellow-600"
              bgColor="bg-purple-50"
              updated="15 mins ago"
              bgImage={BP}
            />
            <MetricCard
              icon={<Weight className="text-blue-500" size={32} />}
              title="Weight"
              value="75.2"
              unit="kg"
              status="Healthy"
              statusColor="text-green-600"
              bgColor="bg-blue-50"
              updated="1 hour ago"
              bgImage={Weight_1}
            />
            <MetricCard
              icon={<Droplet className="text-green-500" size={32} />}
              title="Oxygen Level"
              value="98"
              unit="%"
              status="Excellent"
              statusColor="text-green-600"
              bgColor="bg-green-50"
              updated="5 mins ago"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Heart Rate Trend */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Heart Rate Trend</h3>
                  <p className="text-gray-600 text-sm">Last 7 days</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">7D</button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded">30D</button>
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">90D</button>
                </div>
              </div>
              <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={heartRateData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#ccc', fontSize: 12 }} 
                      dy={10}
                    />
                    
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#ccc', fontSize: 12 }} 
                    />

                    <Tooltip 
                      contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />

                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      style={{ filter: 'drop-shadow(0px 4px 4px rgba(59, 130, 246, 0.2))' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Body Metrics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Body Metrics</h3>
              <div className="space-y-6">
                <BodyMetric label="Height" value="178 cm" color="bg-blue-500" percentage={90} />
                <BodyMetric label="BMI" value="23.7" color="bg-green-500" percentage={65} />
                <BodyMetric label="Body Fat" value="18.5%" color="bg-yellow-500" percentage={40} />
                <BodyMetric label="Muscle Mass" value="62 kg" color="bg-purple-500" percentage={85} />
                <BodyMetric label="Water %" value="58%" color="bg-cyan-500" percentage={58} />
              </div>
              <button className="w-full mt-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50">
                View Full Report
              </button>
            </div>
          </div>

          {/* Blood Pressure and Weight Progress Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Blood Pressure Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Blood Pressure</h3>
                  <p className="text-gray-600 text-sm">Weekly average</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
              <BloodPressureZoneChart />
            </div>

            {/* Weight Progress Chart */}
            <WeightTrendChart />
          </div>

          {/* Latest Lab Results */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Latest Lab Results</h3>
                <p className="text-gray-600 text-sm">Blood test - December 15, 2024</p>
              </div>
              <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50">
                View All Reports
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <LabResult
                icon="🩸"
                label="WBC"
                value="7.2"
                unit="10³/μL"
                status="Normal"
                bgColor="bg-red-50"
              />
              <LabResult
                icon="🩸"
                label="RBC"
                value="5.1"
                unit="10⁶/μL"
                status="Normal"
                bgColor="bg-red-50"
              />
              <LabResult
                icon="🩹"
                label="Hemoglobin"
                value="14.8"
                unit="g/dL"
                status="Normal"
                bgColor="bg-blue-50"
              />
              <LabResult
                icon="🧪"
                label="Platelets"
                value="245"
                unit="10³/μL"
                status="Normal"
                bgColor="bg-purple-50"
              />
              <LabResult
                icon="💛"
                label="Cholesterol"
                value="185"
                unit="mg/dL"
                status="Normal"
                bgColor="bg-yellow-50"
              />
              <LabResult
                icon="🍬"
                label="Glucose"
                value="92"
                unit="mg/dL"
                status="Normal"
                bgColor="bg-orange-50"
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              <button className="text-blue-600 font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              <ActivityItem
                icon={<Heart className="text-blue-500" size={24} />}
                title="Heart Rate Reading"
                description="Recorded heart rate: 72 bpm - Normal range"
                time="2 mins ago"
                bgColor="bg-blue-50"
              />
              <ActivityItem
                icon={<Weight className="text-purple-500" size={24} />}
                title="Weight Update"
                description="New weight recorded: 75.2 kg - Down 0.3 kg"
                time="1 hour ago"
                bgColor="bg-purple-50"
              />
              <ActivityItem
                icon={<Activity className="text-red-500" size={24} />}
                title="Blood Pressure Check"
                description="BP reading: 128/82 mmHg - Slightly elevated"
                time="3 hours ago"
                bgColor="bg-red-50"
              />
              <ActivityItem
                icon={<Droplet className="text-green-500" size={24} />}
                title="Lab Results Available"
                description="Complete blood count results are ready to view"
                time="Yesterday"
                bgColor="bg-green-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, sidebarOpen }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active ? 'bg-green-600 text-white' : 'text-green-50 hover:bg-green-600'
      }`}
    >
      {icon}
      {sidebarOpen && <span className="font-medium">{label}</span>}
    </button>
  );
}

function MetricCard({ icon, title, value, unit, status, statusColor, bgColor, updated, bgImage }) {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm p-6"
      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' } : {}}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${bgColor} p-3 rounded-lg`}>{icon}</div>
        <span className={`${statusColor} font-semibold text-sm`}>{status}</span>
      </div>
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-bold text-gray-900">{value}</span>
        <span className="text-gray-500 text-lg">{unit}</span>
      </div>
      <p className="text-gray-500 text-xs">Last updated: {updated}</p>
    </div>
  );
}

function BodyMetric({ label, value, color, percentage }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-gray-900 font-bold">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, description, time, bgColor }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`${bgColor} p-3 rounded-lg`}>{icon}</div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          </div>
          <span className="text-gray-500 text-sm">{time}</span>
        </div>
      </div>
    </div>
  );
}

function LabResult({ icon, label, value, unit, status, bgColor }) {
  return (
    <div className="text-center">
      <div className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-3`}>
        {icon}
      </div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-gray-500 text-xs mb-2">{unit}</p>
      <span className="text-green-600 text-sm font-semibold">{status}</span>
    </div>
  );
}

const WeightTrendChart = () => {
  const weightData = [
    { time: 'Apr 15', value: 75.8 },
    { time: 'Apr 18', value: 75.5 },
    { time: 'Apr 20', value: 75.2 },
    { time: 'Apr 22', value: 74.9 },
    { time: 'Apr 25', value: 74.5 },
    { time: 'Apr 27', value: 74.2 },
    { time: 'Apr 28', value: 74.0 },
    { time: 'Apr 29', value: 75.8 },
    { time: 'Apr 30', value: 77.5 },
  ];

  return (
    <div style={{ width: '100%', height: 500, background: '#f9fbfd', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <div style={{ marginBottom: '15px', fontFamily: 'sans-serif' }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>Weight 73.50 kg</span>
        <div style={{ color: '#888', fontSize: '12px' }}>April 30 8:37 AM</div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={weightData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <defs>
            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2db494" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#2db494" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="time" tick={{fontSize: 12, fill: '#999'}} />
          <YAxis domain={[70, 80]} axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
          <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#2db494" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorWeight)" 
            dot={{ r: 5, fill: '#2db494', strokeWidth: 2, stroke: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const BloodPressureZoneChart = () => {
  const data = [
    { diastolic: 70, systolic: 110, date: 'Oct 01' },
    { diastolic: 82, systolic: 125, date: 'Oct 05' },
    { diastolic: 85, systolic: 135, date: 'Oct 10' },
    { diastolic: 78, systolic: 118, date: 'Oct 15' },
    { diastolic: 92, systolic: 145, date: 'Oct 20' },
  ];

  return (
    <div style={{ width: '100%', height: 500, backgroundColor: '#f9fbfd', padding: '20px', borderRadius: '20px' }}>
      <h2 style={{ fontFamily: 'sans-serif', textAlign: 'center', color: '#2c3e50' }}>Blood Pressure Health Map</h2>
      
      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          {/* Health Zones */}
          <ReferenceArea x1={60} x2={80} y1={90} y2={120} fill="#e6f4ea" fillOpacity={0.5} stroke="none">
            <Label value="NORMAL" position="insideBottomLeft" fill="#34a853" fontSize={10} />
          </ReferenceArea>
          <ReferenceArea x1={80} x2={89} y1={120} y2={139} fill="#fff7e6" fillOpacity={0.5} stroke="none">
            <Label value="ELEVATED" position="insideBottomLeft" fill="#fbbc04" fontSize={10} />
          </ReferenceArea>
          <ReferenceArea x1={90} x2={110} y1={140} y2={180} fill="#fce8e6" fillOpacity={0.5} stroke="none">
            <Label value="HYPERTENSION" position="insideBottomLeft" fill="#ea4335" fontSize={10} />
          </ReferenceArea>

          <XAxis 
            type="number" 
            dataKey="diastolic" 
            name="Diastolic" 
            unit="mmHg" 
            domain={[60, 110]} 
            tick={{fontSize: 12}}
          >
            <Label value="Diastolic (Bottom Number)" offset={-10} position="insideBottom" />
          </XAxis>
          
          <YAxis 
            type="number" 
            dataKey="systolic" 
            name="Systolic" 
            unit="mmHg" 
            domain={[90, 180]} 
            tick={{fontSize: 12}}
          >
            <Label value="Systolic (Top Number)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>

          <ZAxis type="number" range={[100, 100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />

          {/* Chronological connection line */}
          <Line 
            type="monotone" 
            dataKey="systolic" 
            stroke="#95a5a6" 
            strokeWidth={1} 
            dot={false} 
            activeDot={false} 
            strokeDasharray="5 5"
          />

          {/* Actual Blood Pressure readings */}
          <Scatter 
            name="Readings" 
            data={data} 
            fill="#e74c3c" 
            line={{ stroke: '#e74c3c', strokeWidth: 2 }} 
            shape="circle"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};