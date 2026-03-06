import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    User, Mail, Phone, MapPin, Calendar, Ticket, Heart,
    Settings, Edit3, ChevronRight, Clock, ExternalLink, LogOut
} from 'lucide-react';
import { userProfile, events } from '../data/mockData';
import { useToast } from '../components/ui/Toast';

const tabs = ['Bookings', 'Saved Events', 'Settings'];

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState('Bookings');
    const { addToast } = useToast();

    const savedEvents = events.filter((e) => userProfile.savedEvents.includes(e.id));

    const statusColors = {
        Confirmed: 'bg-emerald-50 text-emerald-600',
        Pending: 'bg-amber-50 text-amber-600',
        Cancelled: 'bg-red-50 text-red-600',
    };

    return (
        <div className="pt-20 min-h-screen bg-surface-50">
            <div className="container-app py-8">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 lg:p-8 border border-surface-100 shadow-sm mb-8"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="relative">
                            <img
                                src={userProfile.avatar}
                                alt={userProfile.name}
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-lg"
                            />
                            <button
                                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors"
                                aria-label="Edit avatar"
                            >
                                <Edit3 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-surface-900">{userProfile.name}</h1>
                            <p className="text-surface-500 mt-0.5">Member since {userProfile.joinDate}</p>

                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-surface-500">
                                <span className="flex items-center gap-1.5">
                                    <Mail className="w-4 h-4 text-primary-400" />
                                    {userProfile.email}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Phone className="w-4 h-4 text-primary-400" />
                                    {userProfile.phone}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-primary-400" />
                                    {userProfile.location}
                                </span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-surface-900">{userProfile.eventsAttended}</div>
                                <div className="text-xs text-surface-500">Attended</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-surface-900">{userProfile.eventsOrganized}</div>
                                <div className="text-xs text-surface-500">Organized</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-surface-900">{userProfile.savedEvents.length}</div>
                                <div className="text-xs text-surface-500">Saved</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-1 mb-8 bg-white rounded-xl p-1 border border-surface-100 shadow-sm w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                                    : 'text-surface-600 hover:bg-surface-50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'Bookings' && (
                        <div className="space-y-4">
                            {userProfile.bookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="bg-white rounded-2xl p-6 border border-surface-100 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                                                <Ticket className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-surface-900">{booking.eventTitle}</h3>
                                                <div className="flex flex-wrap gap-3 mt-1.5 text-sm text-surface-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {booking.date}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Ticket className="w-3.5 h-3.5" />
                                                        {booking.ticketType} × {booking.tickets}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className={`badge ${statusColors[booking.status]}`}>
                                                {booking.status}
                                            </span>
                                            <span className="text-lg font-bold text-surface-900">
                                                ${booking.total}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'Saved Events' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedEvents.map((event) => (
                                <Link
                                    key={event.id}
                                    to={`/events/${event.id}`}
                                    className="bg-white rounded-2xl overflow-hidden border border-surface-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                                >
                                    <div className="h-40 overflow-hidden">
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-surface-900 mb-1">{event.title}</h3>
                                        <p className="text-sm text-surface-500 flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {event.date}
                                        </p>
                                        <p className="text-sm text-surface-500 flex items-center gap-1 mt-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {event.location}
                                        </p>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="font-bold text-primary-600">${event.price}</span>
                                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {activeTab === 'Settings' && (
                        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-surface-100 shadow-sm">
                            <h2 className="text-xl font-bold text-surface-900 mb-6">Account Settings</h2>

                            <div className="space-y-5 max-w-2xl">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-surface-700 mb-2 block">Full Name</label>
                                        <input type="text" defaultValue={userProfile.name} className="input-field" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-surface-700 mb-2 block">Email</label>
                                        <input type="email" defaultValue={userProfile.email} className="input-field" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-surface-700 mb-2 block">Phone</label>
                                        <input type="tel" defaultValue={userProfile.phone} className="input-field" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-surface-700 mb-2 block">Location</label>
                                        <input type="text" defaultValue={userProfile.location} className="input-field" />
                                    </div>
                                </div>

                                <div className="pt-5 border-t border-surface-100 flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => addToast('Settings saved!', 'success')}
                                        className="btn-primary"
                                    >
                                        Save Changes
                                    </button>
                                    <button className="btn-secondary flex items-center gap-2 text-red-600 !border-red-200 hover:!bg-red-50">
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
