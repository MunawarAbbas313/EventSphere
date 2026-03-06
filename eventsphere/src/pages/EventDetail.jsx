import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar, MapPin, Clock, Users, Star, Share2, Heart,
    ArrowLeft, Tag, MessageCircle, Send, ThumbsUp, ExternalLink, Bookmark
} from 'lucide-react';
import { useState } from 'react';
import { events, comments } from '../data/mockData';
import TicketCard from '../components/cards/TicketCard';
import { useToast } from '../components/ui/Toast';

export default function EventDetail() {
    const { id } = useParams();
    const event = events.find((e) => e.id === parseInt(id)) || events[0];
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [newComment, setNewComment] = useState('');
    const { addToast } = useToast();

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const handleShare = () => {
        navigator.clipboard?.writeText(window.location.href);
        addToast('Event link copied to clipboard!', 'success');
    };

    const handleSave = () => {
        setSaved(!saved);
        addToast(saved ? 'Removed from saved events' : 'Event saved!', saved ? 'info' : 'success');
    };

    const progressPercent = Math.round((event.attendees / event.maxAttendees) * 100);

    return (
        <div className="pt-16 min-h-screen bg-surface-50">
            {/* Hero Banner */}
            <div className="relative h-72 sm:h-80 lg:h-[450px] overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Back button */}
                <div className="absolute top-6 left-6">
                    <Link
                        to="/events"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                </div>

                {/* Actions */}
                <div className="absolute top-6 right-6 flex gap-2">
                    <button
                        onClick={handleSave}
                        className={`p-2.5 rounded-xl backdrop-blur border transition-all ${saved ? 'bg-primary-500 border-primary-500 text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
                        aria-label="Save event"
                    >
                        <Bookmark className={`w-5 h-5 ${saved ? 'fill-white' : ''}`} />
                    </button>
                    <button
                        onClick={handleShare}
                        className="p-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-all"
                        aria-label="Share event"
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Event title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                    <div className="container-app">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {event.tags.map((tag) => (
                                <span key={tag} className="badge bg-white/20 backdrop-blur text-white text-xs">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white mb-2">
                            {event.title}
                        </h1>
                        <div className="flex items-center gap-4 text-white/80 text-sm">
                            <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                {event.rating} ({event.reviews} reviews)
                            </span>
                            <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {event.attendees.toLocaleString()} attending
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-app py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Event Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-6 lg:p-8 border border-surface-100 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-surface-900 mb-4">About This Event</h2>
                            <p className="text-surface-600 leading-relaxed mb-6">{event.description}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-50">
                                    <Calendar className="w-5 h-5 text-primary-500 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-surface-900 text-sm">Date</p>
                                        <p className="text-sm text-surface-500">{formatDate(event.date)}</p>
                                        {event.date !== event.endDate && (
                                            <p className="text-sm text-surface-500">to {formatDate(event.endDate)}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-50">
                                    <Clock className="w-5 h-5 text-primary-500 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-surface-900 text-sm">Time</p>
                                        <p className="text-sm text-surface-500">{event.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-50 sm:col-span-2">
                                    <MapPin className="w-5 h-5 text-primary-500 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-surface-900 text-sm">{event.location}</p>
                                        <p className="text-sm text-surface-500">{event.address}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Location Map Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-6 lg:p-8 border border-surface-100 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-surface-900 mb-4">Location</h2>
                            <div className="rounded-xl overflow-hidden bg-surface-100 h-64 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100 opacity-50" />
                                <div className="relative text-center">
                                    <MapPin className="w-10 h-10 text-primary-500 mx-auto mb-2" />
                                    <p className="font-semibold text-surface-700">{event.location}</p>
                                    <p className="text-sm text-surface-500">{event.address}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Organizer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 lg:p-8 border border-surface-100 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-surface-900 mb-4">Organizer</h2>
                            <div className="flex items-center gap-4">
                                <img
                                    src={event.organizerAvatar}
                                    alt={event.organizer}
                                    className="w-14 h-14 rounded-xl"
                                />
                                <div>
                                    <h3 className="font-bold text-surface-900">{event.organizer}</h3>
                                    <p className="text-sm text-surface-500">Event Organizer</p>
                                </div>
                                <button className="ml-auto btn-secondary !py-2 !px-4 text-sm">
                                    Follow
                                </button>
                            </div>
                        </motion.div>

                        {/* Comments */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl p-6 lg:p-8 border border-surface-100 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-surface-900 mb-6">
                                <MessageCircle className="w-5 h-5 inline mr-2 text-primary-500" />
                                Comments ({comments.length})
                            </h2>

                            {/* Add comment */}
                            <div className="flex gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-sm font-bold">A</span>
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        className="input-field !pr-12"
                                    />
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500 hover:text-primary-600 transition-colors"
                                        aria-label="Send comment"
                                        onClick={() => {
                                            if (newComment.trim()) {
                                                addToast('Comment posted!', 'success');
                                                setNewComment('');
                                            }
                                        }}
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Comments list */}
                            <div className="space-y-6">
                                {comments.map((comment) => (
                                    <div key={comment.id}>
                                        <div className="flex gap-3">
                                            <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-xl flex-shrink-0" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold text-surface-900 text-sm">{comment.user}</span>
                                                    <span className="text-xs text-surface-400">{comment.date}</span>
                                                </div>
                                                <p className="text-sm text-surface-600 mb-2">{comment.text}</p>
                                                <div className="flex items-center gap-4 text-xs text-surface-500">
                                                    <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                                                        <ThumbsUp className="w-3.5 h-3.5" /> {comment.likes}
                                                    </button>
                                                    <button className="hover:text-primary-600 transition-colors">Reply</button>
                                                </div>

                                                {/* Replies */}
                                                {comment.replies.length > 0 && (
                                                    <div className="mt-4 space-y-4 pl-4 border-l-2 border-surface-100">
                                                        {comment.replies.map((reply) => (
                                                            <div key={reply.id} className="flex gap-3">
                                                                <img src={reply.avatar} alt={reply.user} className="w-8 h-8 rounded-lg flex-shrink-0" />
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="font-semibold text-surface-900 text-xs">{reply.user}</span>
                                                                        <span className="text-xs text-surface-400">{reply.date}</span>
                                                                    </div>
                                                                    <p className="text-sm text-surface-600">{reply.text}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Ticket Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl p-6 border border-surface-100 shadow-sm"
                            >
                                <h2 className="text-xl font-bold text-surface-900 mb-1">Get Tickets</h2>
                                <p className="text-sm text-surface-500 mb-5">Starting from {event.currency}{event.price}</p>

                                <div className="space-y-3 mb-6">
                                    {event.tickets.map((ticket, i) => (
                                        <TicketCard
                                            key={ticket.id}
                                            ticket={ticket}
                                            selected={selectedTicket}
                                            onSelect={setSelectedTicket}
                                            index={i}
                                        />
                                    ))}
                                </div>

                                <Link
                                    to={`/booking/${event.id}${selectedTicket ? `?ticket=${selectedTicket.id}` : ''}`}
                                    className="btn-accent block text-center w-full"
                                >
                                    {selectedTicket
                                        ? `Book for $${selectedTicket.price}`
                                        : 'Select a ticket'}
                                </Link>

                                {/* Attendance progress */}
                                <div className="mt-6 pt-5 border-t border-surface-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-surface-700">RSVP Status</span>
                                        <span className="text-sm text-primary-600 font-semibold">{progressPercent}% filled</span>
                                    </div>
                                    <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full gradient-primary transition-all duration-500"
                                            style={{ width: `${progressPercent}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-surface-400 mt-2">
                                        {event.attendees.toLocaleString()} / {event.maxAttendees.toLocaleString()} spots taken
                                    </p>
                                </div>
                            </motion.div>

                            {/* Share buttons */}
                            <div className="bg-white rounded-2xl p-6 border border-surface-100 shadow-sm">
                                <h3 className="font-semibold text-surface-900 mb-3">Share This Event</h3>
                                <div className="flex gap-2">
                                    {['Twitter', 'Facebook', 'LinkedIn', 'Copy Link'].map((platform) => (
                                        <button
                                            key={platform}
                                            onClick={handleShare}
                                            className="flex-1 py-2.5 rounded-xl bg-surface-50 text-surface-600 text-xs font-medium hover:bg-surface-100 transition-all"
                                        >
                                            {platform}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
