import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, User, Phone, MessageSquare, Sparkles, MapPin, Check } from 'lucide-react';
import { ReservationData } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationViewProps {
  onSubmitReservation: (res: ReservationData) => void;
  preselectedDishName?: string;
  userPhone?: string;
}

const TIME_SLOTS = [
  '12:30 PM', '01:30 PM', '02:30 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'
];

export const ReservationView: React.FC<ReservationViewProps> = ({
  onSubmitReservation,
  preselectedDishName,
  userPhone = ''
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(userPhone || '');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('08:00 PM');
  const [guests, setGuests] = useState(4);
  const [seatingZone, setSeatingZone] = useState(RESTAURANT_INFO.seatingZones[0]);
  const [specialRequest, setSpecialRequest] = useState(
    preselectedDishName ? `Table requested for tasting: ${preselectedDishName}` : ''
  );
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('Please provide a valid Pakistani contact number for table confirmation.');
      return;
    }

    const newReservation: ReservationData = {
      id: `PPK-${Math.floor(100000 + Math.random() * 900000)}`,
      name: name.trim(),
      phone: cleanPhone,
      date,
      time,
      guests,
      seatingZone,
      specialRequest: specialRequest.trim(),
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    onSubmitReservation(newReservation);
  };

  return (
    <div className="space-y-8 pb-24 select-none px-2 sm:px-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B1B1E]/10 dark:bg-[#9B1B1E]/20 text-[#9B1B1E] dark:text-[#E6B87D] text-xs font-semibold uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Priority Table Booking</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 dark:text-stone-100 tracking-tight">
          TABLE <span className="font-semibold italic text-[#9B1B1E] dark:text-[#E6B87D]">RESERVATION</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light max-w-md mx-auto">
          Reserve your table at Paprika Rahim Yar Khan. No deposit or advance payment is required.
        </p>
      </div>

      {/* Main Reservation Card */}
      <div className="relative rounded-3xl p-6 sm:p-10 glass-surface border border-white/70 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest Count Stepper */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
              Number of Guests
            </label>
            <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
              {[1, 2, 4, 6, 8, 10, 12].map((num) => (
                <button
                  type="button"
                  key={num}
                  id={`guests-btn-${num}`}
                  onClick={() => setGuests(num)}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl font-serif text-sm sm:text-base font-semibold transition-all cursor-pointer flex items-center justify-center touch-manipulation ${
                    guests === num
                      ? 'bg-[#9B1B1E] text-white shadow-md scale-105 border border-[#9B1B1E]'
                      : 'glass-surface border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800'
                  }`}
                >
                  {num}
                </button>
              ))}
              <span className="text-xs text-stone-400 pl-1">
                {guests >= 10 ? 'Large Banquet Party' : 'Guests'}
              </span>
            </div>
          </div>

          {/* Date & Time Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="res-date"
                className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#9B1B1E] dark:text-[#E6B87D]" />
                <span>Date</span>
              </label>
              <input
                id="res-date"
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl glass-surface border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B1B1E]/40"
              />
            </div>

            <div>
              <label
                htmlFor="res-time-select"
                className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2 flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5 text-[#9B1B1E] dark:text-[#E6B87D]" />
                <span>Preferred Seating Time</span>
              </label>
              <select
                id="res-time-select"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl glass-surface border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B1B1E]/40"
              >
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t} className="dark:bg-stone-900 text-stone-900 dark:text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Seating Zone Preference */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#9B1B1E] dark:text-[#E6B87D]" />
              <span>Seating Preference</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {RESTAURANT_INFO.seatingZones.map((zone) => {
                const isSelected = seatingZone === zone;
                return (
                  <button
                    type="button"
                    key={zone}
                    onClick={() => setSeatingZone(zone)}
                    className={`p-3 rounded-2xl text-left text-xs font-medium border transition-all cursor-pointer flex items-center justify-between min-h-[46px] touch-manipulation ${
                      isSelected
                        ? 'bg-[#9B1B1E]/10 dark:bg-[#9B1B1E]/20 text-[#9B1B1E] dark:text-[#E6B87D] border-[#9B1B1E]/50 shadow-sm'
                        : 'glass-surface border-stone-200 dark:border-stone-700/60 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <span>{zone}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#9B1B1E] dark:text-[#E6B87D]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="res-name"
                className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2 flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-stone-400" />
                <span>Full Name</span>
              </label>
              <input
                id="res-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tariq Mehmood"
                className="w-full px-4 py-3.5 rounded-2xl glass-surface border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B1B1E]/40"
              />
            </div>

            <div>
              <label
                htmlFor="res-phone"
                className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>Phone Number</span>
              </label>
              <input
                id="res-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0304 5888899"
                className="w-full px-4 py-3.5 rounded-2xl glass-surface border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B1B1E]/40"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label
              htmlFor="res-notes"
              className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2"
            >
              Special Request (Optional)
            </label>
            <textarea
              id="res-notes"
              rows={2}
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder="e.g. Birthday anniversary decor, quiet corner, dietary allergies..."
              className="w-full px-4 py-3 rounded-2xl glass-surface border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#9B1B1E]/40"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              id="submit-reservation-request-btn"
              type="submit"
              className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-[#9B1B1E] to-[#B82428] hover:from-[#851518] hover:to-[#9B1B1E] text-white font-semibold text-xs sm:text-sm transition-all shadow-[0_10px_30px_rgba(155,27,30,0.4)] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer touch-manipulation min-h-[50px]"
            >
              <span>CONFIRM RESERVATION REQUEST</span>
            </button>
            <p className="text-[11px] text-stone-400 text-center mt-2.5">
              Complimentary table hold. Our host will confirm via call or WhatsApp.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
