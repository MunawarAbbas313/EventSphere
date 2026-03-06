import { motion } from 'framer-motion';
import { Star, MapPin, BadgeCheck, ExternalLink } from 'lucide-react';

export default function VendorCard({ vendor, index = 0, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onClick?.(vendor)}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-surface-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
            <div className="relative h-40 overflow-hidden">
                <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {vendor.verified && (
                    <div className="absolute top-3 right-3">
                        <span className="badge bg-white/90 backdrop-blur text-primary-600 shadow-lg">
                            <BadgeCheck className="w-3.5 h-3.5 mr-1" /> Verified
                        </span>
                    </div>
                )}
                <div className="absolute bottom-3 left-3">
                    <span className="badge bg-white/90 backdrop-blur text-surface-700 text-xs">
                        {vendor.category}
                    </span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="font-bold text-surface-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {vendor.name}
                </h3>
                <p className="text-sm text-surface-500 line-clamp-2 mb-3">{vendor.description}</p>

                <div className="flex items-center gap-2 text-sm text-surface-500 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-primary-400" />
                    <span>{vendor.location}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-semibold text-surface-900">{vendor.rating}</span>
                        <span className="text-xs text-surface-400">({vendor.reviews})</span>
                    </div>
                    <span className="text-sm font-semibold text-primary-600">{vendor.price}</span>
                </div>
            </div>
        </motion.div>
    );
}
