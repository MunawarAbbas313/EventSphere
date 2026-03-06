import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

export default function TicketCard({ ticket, selected, onSelect, index = 0 }) {
    const isSelected = selected?.id === ticket.id;

    return (
        <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(ticket)}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${isSelected
                    ? 'border-primary-500 bg-primary-50/50 shadow-lg shadow-primary-500/10'
                    : 'border-surface-200 bg-white hover:border-primary-200 hover:shadow-md'
                }`}
        >
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h4 className="font-bold text-surface-900">{ticket.name}</h4>
                    <p className="text-sm text-surface-500 mt-1">{ticket.description}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-surface-300'
                    }`}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold gradient-text">
                    {ticket.price === 0 ? 'Free' : `$${ticket.price}`}
                </span>
                <span className="text-xs text-surface-400">
                    {ticket.available} remaining
                </span>
            </div>
        </motion.button>
    );
}
