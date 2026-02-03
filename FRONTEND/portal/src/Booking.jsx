import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, CreditCard, CheckCircle } from 'lucide-react';

export default function AppointmentBooking({ onBack }) {
  const [formData, setFormData] = useState({
    bookingFor: 'myself',
    fullName: '',
    phone: '',
    idType: 'national',
    idNumber: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment booked:', formData);
    alert('Appointment request submitted successfully!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button 
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
          >
            ← Back
          </button>
        )}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Doctor Image Placeholder */}
            <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400 p-8 md:p-12 flex flex-col justify-between min-h-[400px] md:min-h-[700px]">
              {/* Logo */}
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-blue-500 font-bold text-xl">+</span>
                </div>
                <span className="text-2xl font-bold">Medic</span>
              </div>

              {/* Doctor Image Placeholder - ADD YOUR IMAGE HERE */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full h-full max-w-md max-h-[500px] bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-dashed border-white/30 flex items-center justify-center">
                  <div className="text-center text-white/70">
                    <User className="w-24 h-24 mx-auto mb-4" />
                    <p className="text-lg font-medium">Add Doctor Image Here</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="bg-white/30 rounded-lg p-2">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">5.7 Million doses injected</span>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="bg-green-400/80 rounded-lg p-2">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">98% recovery rate</span>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-20 right-10 text-blue-300 opacity-50">
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <circle cx="15" cy="15" r="3" fill="currentColor"/>
                  <circle cx="15" cy="15" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </div>
              <div className="absolute bottom-32 left-10 text-cyan-300 opacity-50">
                <svg width="25" height="25" viewBox="0 0 25 25">
                  <circle cx="12.5" cy="12.5" r="2" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Right Side - Booking Form */}
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <div className="text-blue-500 text-3xl mb-4">✦</div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  Book your appointment
                </h1>
                <p className="text-gray-600">
                  Schedule a consultation with our expert doctors
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Booking For */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    I am booking for
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="bookingFor"
                        value="myself"
                        checked={formData.bookingFor === 'myself'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">Myself</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="bookingFor"
                        value="other"
                        checked={formData.bookingFor === 'other'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">Other people</span>
                    </label>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Patient's Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Mobile Number
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    Notifications for appointment and reminders will be sent to this number.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                      required
                    />
                    <button
                      type="button"
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
                    >
                      Verify
                    </button>
                  </div>
                </div>

                {/* Patient ID */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Patient ID Number
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      name="idType"
                      value={formData.idType}
                      onChange={handleChange}
                      className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    >
                      <option value="national">National ID</option>
                      <option value="passport">Passport</option>
                      <option value="driver">Driver License</option>
                    </select>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleChange}
                      placeholder="ID number"
                      className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                      required
                    />
                  </div>
                </div>

                {/* Appointment Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Date
                    </label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Clock className="inline w-4 h-4 mr-1" />
                      Time
                    </label>
                    <input
                      type="time"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                      required
                    />
                  </div>
                </div>

                {/* Reason for Visit */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Reason for Visit
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Brief description of your concern"
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-200"
                >
                  Submit
                </button>

                {/* Already Registered Link */}
                <div className="text-center pt-2">
                  <span className="text-gray-600">Already registered? </span>
                  <a href="#" className="text-blue-600 font-medium hover:underline">
                    Check your status
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}