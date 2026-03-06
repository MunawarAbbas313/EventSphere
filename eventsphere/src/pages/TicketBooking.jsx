import { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Minus, Plus, CreditCard, Lock, Check,
    Calendar, MapPin, Ticket, ShieldCheck, ChevronRight
} from 'lucide-react';
import { events } from '../data/mockData';
import { useToast } from '../components/ui/Toast';

export default function TicketBooking() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const event = events.find((e) => e.id === parseInt(id)) || events[0];
    const preselectedTicketId = parseInt(searchParams.get('ticket'));

    const [selectedTicket, setSelectedTicket] = useState(
        event.tickets.find((t) => t.id === preselectedTicketId) || event.tickets[0]
    );
    const [quantity, setQuantity] = useState(1);
    const [step, setStep] = useState(1); // 1: select, 2: checkout, 3: confirmation
    const { addToast } = useToast();

    const subtotal = selectedTicket.price * quantity;
    const serviceFee = Math.round(subtotal * 0.05);
    const total = subtotal + serviceFee;

    const handleCheckout = () => {
        setStep(3);
        addToast('Booking confirmed! Check your email for details.', 'success');
    };

    return (
        <div className="pt-20 min-h-screen bg-surface-50">
            <div className="container-app py-8">
                {/* Back + Steps */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        to={`/events/${event.id}`}
                        className="flex items-center gap-2 text-surface-600 hover:text-primary-600 transition-colors text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to event
                    </Link>

                    {/* Progress steps */}
                    <div className="hidden sm:flex items-center gap-2">
                        {['Select', 'Checkout', 'Confirmed'].map((label, i) => (
                            <div key={label} className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step > i + 1
                                        ? 'bg-emerald-500 text-white'
                                        : step === i + 1
                                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                            : 'bg-surface-200 text-surface-500'
                                    }`}>
                                    {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className={`text-sm font-medium ${step === i + 1 ? 'text-primary-600' : 'text-surface-400'}`}>
                                    {label}
                                </span>
                                {i < 2 && <ChevronRight className="w-4 h-4 text-surface-300" />}
                            </div>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="select"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            {/* Ticket Selection */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-surface-100 shadow-sm">
                                    <h1 className="text-2xl font-bold text-surface-900 mb-2">Select Tickets</h1>
                                    <p className="text-surface-500 mb-6">Choose your ticket type for {event.title}</p>

                                    <div className="space-y-4">
                                        {event.tickets.map((ticket) => (
                                            <button
                                                key={ticket.id}
                                                onClick={() => setSelectedTicket(ticket)}
                                                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${selectedTicket?.id === ticket.id
                                                        ? 'border-primary-500 bg-primary-50/50 shadow-lg shadow-primary-500/10'
                                                        : 'border-surface-200 hover:border-primary-200 hover:shadow-md'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-bold text-surface-900">{ticket.name}</h3>
                                                        <p className="text-sm text-surface-500 mt-1">{ticket.description}</p>
                                                        <span className="text-xs text-surface-400 mt-2 block">
                                                            {ticket.available} tickets remaining
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-2xl font-bold gradient-text">
                                                            {ticket.price === 0 ? 'Free' : `$${ticket.price}`}
                                                        </span>
                                                        <div className={`mt-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ml-auto ${selectedTicket?.id === ticket.id
                                                                ? 'border-primary-500 bg-primary-500'
                                                                : 'border-surface-300'
                                                            }`}>
                                                            {selectedTicket?.id === ticket.id && <Check className="w-4 h-4 text-white" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Quantity */}
                                    <div className="mt-8 flex items-center justify-between p-5 rounded-2xl bg-surface-50 border border-surface-200">
                                        <div>
                                            <h3 className="font-semibold text-surface-900">Quantity</h3>
                                            <p className="text-sm text-surface-500">Max 10 per order</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-10 h-10 rounded-xl border border-surface-300 flex items-center justify-center hover:bg-surface-100 transition-all disabled:opacity-40"
                                                disabled={quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="text-xl font-bold text-surface-900 w-8 text-center">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                                className="w-10 h-10 rounded-xl border border-surface-300 flex items-center justify-center hover:bg-surface-100 transition-all disabled:opacity-40"
                                                disabled={quantity >= 10}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 bg-white rounded-2xl p-6 border border-surface-100 shadow-sm">
                                    <h2 className="text-lg font-bold text-surface-900 mb-4">Order Summary</h2>

                                    {/* Event info */}
                                    <div className="flex gap-3 mb-6 pb-5 border-b border-surface-100">
                                        <img src={event.image} alt={event.title} className="w-16 h-16 rounded-xl object-cover" />
                                        <div>
                                            <h3 className="font-semibold text-sm text-surface-900 line-clamp-2">{event.title}</h3>
                                            <p className="text-xs text-surface-500 mt-1 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {event.date}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-surface-500">{selectedTicket.name} × {quantity}</span>
                                            <span className="font-medium">${subtotal}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-surface-500">Service fee</span>
                                            <span className="font-medium">${serviceFee}</span>
                                        </div>
                                        <div className="pt-3 border-t border-surface-100 flex justify-between">
                                            <span className="font-bold text-surface-900">Total</span>
                                            <span className="text-xl font-bold gradient-text">${total}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setStep(2)}
                                        className="btn-accent w-full mt-6 flex items-center justify-center gap-2"
                                    >
                                        Continue to Checkout
                                        <ChevronRight className="w-4 h-4" />
                                    </button>

                                    <div className="flex items-center gap-2 mt-4 text-xs text-surface-400 justify-center">
                                        <Lock className="w-3.5 h-3.5" />
                                        Secure checkout
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="checkout"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-surface-100 shadow-sm">
                                <h1 className="text-2xl font-bold text-surface-900 mb-6">Checkout</h1>

                                {/* Contact Info */}
                                <div className="mb-8">
                                    <h3 className="font-semibold text-surface-900 mb-4">Contact Information</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input type="text" placeholder="First Name" className="input-field" defaultValue="Alex" />
                                        <input type="text" placeholder="Last Name" className="input-field" defaultValue="Johnson" />
                                        <input type="email" placeholder="Email" className="input-field sm:col-span-2" defaultValue="alex@email.com" />
                                    </div>
                                </div>

                                {/* Payment */}
                                <div className="mb-8">
                                    <h3 className="font-semibold text-surface-900 mb-4">Payment Details</h3>
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                                            <input type="text" placeholder="Card Number" className="input-field !pl-12" defaultValue="•••• •••• •••• 4242" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="MM/YY" className="input-field" defaultValue="12/28" />
                                            <input type="text" placeholder="CVC" className="input-field" defaultValue="•••" />
                                        </div>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="p-5 rounded-xl bg-surface-50 mb-6">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-surface-500">{selectedTicket.name} × {quantity}</span>
                                        <span className="font-medium">${subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-surface-500">Service fee</span>
                                        <span className="font-medium">${serviceFee}</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-surface-200 mt-2">
                                        <span className="font-bold text-surface-900">Total</span>
                                        <span className="text-xl font-bold gradient-text">${total}</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="btn-secondary flex-1"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleCheckout}
                                        className="btn-accent flex-1 flex items-center justify-center gap-2"
                                    >
                                        <Lock className="w-4 h-4" />
                                        Pay ${total}
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 mt-4 text-xs text-surface-400 justify-center">
                                    <ShieldCheck className="w-4 h-4" />
                                    Your payment is secured with 256-bit encryption
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="confirmation"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-lg mx-auto text-center"
                        >
                            <div className="bg-white rounded-2xl p-8 lg:p-12 border border-surface-100 shadow-sm">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', delay: 0.2 }}
                                    className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6"
                                >
                                    <Check className="w-10 h-10 text-emerald-600" />
                                </motion.div>

                                <h1 className="text-3xl font-bold text-surface-900 mb-2">Booking Confirmed!</h1>
                                <p className="text-surface-500 mb-8">
                                    Your tickets for <strong>{event.title}</strong> have been booked successfully.
                                    A confirmation email has been sent to your inbox.
                                </p>

                                <div className="bg-surface-50 rounded-xl p-5 mb-8 text-left">
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-surface-500">Event</span>
                                            <span className="font-medium text-surface-900">{event.title}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-surface-500">Date</span>
                                            <span className="font-medium text-surface-900">{event.date}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-surface-500">Ticket</span>
                                            <span className="font-medium text-surface-900">{selectedTicket.name} × {quantity}</span>
                                        </div>
                                        <div className="flex justify-between pt-3 border-t border-surface-200">
                                            <span className="font-bold text-surface-900">Total Paid</span>
                                            <span className="font-bold text-primary-600">${total}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link to="/profile" className="btn-primary flex-1">
                                        View My Bookings
                                    </Link>
                                    <Link to="/events" className="btn-secondary flex-1">
                                        Browse More Events
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
