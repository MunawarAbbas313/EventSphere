import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Star, Heart, Tag } from 'lucide-react';
import { useState } from 'react';

export default function EventCard({ event, index = 0 }) {
    const [liked, setLiked] = useState(false);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-surface-100 transition-all duration-300 hover:-translate-y-1"
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {event.isFeatured && (
                        <span className="badge bg-primary-500 text-white shadow-lg">
                            <Star className="w-3 h-3 mr-1" /> Featured
                        </span>
                    )}
                    {event.isTrending && (
                        <span className="badge bg-coral text-white shadow-lg">🔥 Trending</span>
                    )}
                </div>

                {/* Like */}
                <button
                    onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-all shadow-lg"
                    aria-label={liked ? 'Unlike event' : 'Like event'}
                >
                    <Heart
                        className={`w-4 h-4 transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-surface-600'}`}
                    />
                </button>

                {/* Price */}
                <div className="absolute bottom-3 right-3">
                    <span className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur text-sm font-bold text-surface-900 shadow-lg">
                        {event.price === 0 ? 'Free' : `${event.currency}${event.price}`}
                    </span>
                </div>
            </div>

            {/* Content */}
            <Link to={`/events/${event.id}`} className="block p-5">
                <div className="flex items-center gap-2 mb-2">
                    <span className="badge bg-primary-50 text-primary-700">
                        <Tag className="w-3 h-3 mr-1" />
                        {event.category}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-surface-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {event.title}
                </h3>

                <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-sm text-surface-500">
                        <Calendar className="w-4 h-4 text-primary-400" />
                        <span>{formatDate(event.date)}</span>
                        <span className="text-surface-300">•</span>
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-surface-500">
                        <MapPin className="w-4 h-4 text-primary-400" />
                        <span className="truncate">{event.location}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                    <div className="flex items-center gap-2">
                        <img
                            src={event.organizerAvatar}
                            alt={event.organizer}
                            className="w-6 h-6 rounded-full"
                        />
                        <span className="text-xs text-surface-500">{event.organizer}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-surface-500">
                        <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            {event.rating}
                        </span>
                        <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {event.attendees.toLocaleString()}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
