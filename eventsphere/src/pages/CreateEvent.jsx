import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, Check, Calendar, MapPin, Ticket,
    Users, Eye, Send, Plus, X, Sparkles, Save, Image
} from 'lucide-react';
import { categories, vendors } from '../data/mockData';
import { useToast } from '../components/ui/Toast';

const steps = [
    { id: 1, title: 'Basic Info', icon: Sparkles },
    { id: 2, title: 'Venue & Time', icon: MapPin },
    { id: 3, title: 'Tickets', icon: Ticket },
    { id: 4, title: 'Vendors', icon: Users },
    { id: 5, title: 'Preview', icon: Eye },
    { id: 6, title: 'Publish', icon: Send },
];

export default function CreateEvent() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        image: '',
        venue: '',
        address: '',
        date: '',
        endDate: '',
        time: '',
        tickets: [{ name: 'General Admission', price: '', description: '', quantity: '' }],
        selectedVendors: [],
    });
    const { addToast } = useToast();

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const addTicketTier = () => {
        setFormData((prev) => ({
            ...prev,
            tickets: [...prev.tickets, { name: '', price: '', description: '', quantity: '' }],
        }));
    };

    const removeTicketTier = (index) => {
        setFormData((prev) => ({
            ...prev,
            tickets: prev.tickets.filter((_, i) => i !== index),
        }));
    };

    const updateTicket = (index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            tickets: prev.tickets.map((t, i) => (i === index ? { ...t, [field]: value } : t)),
        }));
    };

    const toggleVendor = (vendorId) => {
        setFormData((prev) => ({
            ...prev,
            selectedVendors: prev.selectedVendors.includes(vendorId)
                ? prev.selectedVendors.filter((id) => id !== vendorId)
                : [...prev.selectedVendors, vendorId],
        }));
    };

    const handleNext = () => {
        if (currentStep < 6) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handlePublish = () => {
        addToast('🎉 Event published successfully!', 'success');
        setCurrentStep(6);
    };

    const handleSaveDraft = () => {
        addToast('Draft saved!', 'info');
    };

    return (
        <div className="pt-20 min-h-screen bg-surface-50">
            <div className="container-app py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-display text-surface-900">Create Event</h1>
                        <p className="text-surface-500 mt-1">Build your event step by step</p>
                    </div>
                    <button onClick={handleSaveDraft} className="btn-secondary flex items-center gap-2 text-sm">
                        <Save className="w-4 h-4" /> Save Draft
                    </button>
                </div>

                {/* Step Progress */}
                <div className="bg-white rounded-2xl p-6 border border-surface-100 shadow-sm mb-8">
                    <div className="flex items-center justify-between overflow-x-auto pb-2">
                        {steps.map((step, i) => (
                            <div key={step.id} className="flex items-center flex-shrink-0">
                                <button
                                    onClick={() => setCurrentStep(step.id)}
                                    className="flex flex-col items-center gap-2 group"
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${currentStep > step.id
                                            ? 'bg-emerald-500 text-white'
                                            : currentStep === step.id
                                                ? 'gradient-primary text-white shadow-lg shadow-primary-500/30'
                                                : 'bg-surface-100 text-surface-400 group-hover:bg-surface-200'
                                        }`}>
                                        {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                                    </div>
                                    <span className={`text-xs font-medium whitespace-nowrap ${currentStep === step.id ? 'text-primary-600' : 'text-surface-400'
                                        }`}>
                                        {step.title}
                                    </span>
                                </button>
                                {i < steps.length - 1 && (
                                    <div className={`w-12 lg:w-20 h-0.5 mx-2 mt-[-16px] ${currentStep > step.id ? 'bg-emerald-500' : 'bg-surface-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentStep === 1 && (
                            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-surface-100 shadow-sm">
                                <h2 className="text-xl font-bold text-surface-900 mb-6">Basic Information</h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className="text-sm font-medium text-surface-700 mb-2 block">Event Title *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Summer Music Festival 2026"
                                            value={formData.title}
                                            onChange={(e) => updateField('title', e.target.value)}
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-surface-700 mb-2 block">Description *</label>
                                        <textarea
                                            placeholder="Tell attendees what to expect..."
                                            value={formData.description}
                                            onChange={(e) => updateField('description', e.target.value)}
                                            rows={5}
                                            className="input-field resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-surface-700 mb-2 block">Category *</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => updateField('category', cat.name)}
                                                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all text-center ${formData.category === cat.name
                                                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                            : 'border-surface-200 hover:border-primary-200 text-surface-600'
                                                        }`}
                                                >
                                                    <span className="text-xl block mb-1">{cat.icon}</span>
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-surface-700 mb-2 block">Cover Image URL</label>
                                        <div className="flex gap-3">
                                            <input
                                                type="url"
                                                placeholder="https://example.com/image.jpg"
                                                value={formData.image}
                                                onChange={(e) => updateField('image', e.target.value)}
                                                className="input-field"
                                            />
                                        </div>
                                    </div>

                                    {/* AI Suggestion Panel */}
                                    <div className="p-5 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                                                <Sparkles className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-surface-900 mb-1">AI Event Assistant</h4>
                                                <p className="text-sm text-surface-600">
                                                    Based on your category, consider adding interactive workshops or panel sessions to boost engagement.
                                                    Events with clear agendas see 40% higher attendance!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-surface-100 shadow-sm">
                                <h2 className="text-xl font-bold text-surface-900 mb-6">Venue & Timing</h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className="text-sm font-medium text-surface-700 mb-2 block">Venue Name *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Grand Convention Center"
                                            value={formData.venue}
                                            onChange={(e) => updateField('venue', e.target.value)}
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-surface-700 mb-2 block">Address *</label>
                                        <input
                                            type="text"
                                            placeholder="Full address"
                                            value={formData.address}
                                            onChange={(e) => updateField('address', e.target.value)}
                                            className="input-field"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-surface-700 mb-2 block">Start Date *</label>
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => updateField('date', e.target.value)}
                                                className="input-field"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-surface-700 mb-2 block">End Date</label>
                                            <input
                                                type="date"
                                                value={formData.endDate}
                                                onChange={(e) => updateField('endDate', e.target.value)}
                                                className="input-field"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-surface-700 mb-2 block">Start Time *</label>
                                            <input
                                                type="time"
                                                value={formData.time}
                                                onChange={(e) => updateField('time', e.target.value)}
                                                className="input-field"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-surface-100 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-surface-900">Ticket Tiers</h2>
                                    <button
                                        onClick={addTicketTier}
                                        className="btn-secondary !py-2 !px-4 text-sm flex items-center gap-1"
                                    >
                                        <Plus className="w-4 h-4" /> Add Tier
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {formData.tickets.map((ticket, index) => (
                                        <div key={index} className="p-5 rounded-2xl border border-surface-200 relative">
                                            {formData.tickets.length > 1 && (
                                                <button
                                                    onClick={() => removeTicketTier(index)}
                                                    className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm font-medium text-surface-700 mb-1 block">Tier Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g., VIP, General"
                                                        value={ticket.name}
                                                        onChange={(e) => updateTicket(index, 'name', e.target.value)}
                                                        className="input-field"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-surface-700 mb-1 block">Price ($)</label>
                                                    <input
                                                        type="number"
                                                        placeholder="0 for free"
                                                        value={ticket.price}
                                                        onChange={(e) => updateTicket(index, 'price', e.target.value)}
                                                        className="input-field"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-surface-700 mb-1 block">Description</label>
                                                    <input
                                                        type="text"
                                                        placeholder="What's included"
                                                        value={ticket.description}
                                                        onChange={(e) => updateTicket(index, 'description', e.target.value)}
                                                        className="input-field"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-surface-700 mb-1 block">Quantity</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Available tickets"
                                                        value={ticket.quantity}
                                                        onChange={(e) => updateTicket(index, 'quantity', e.target.value)}
                                                        className="input-field"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-surface-100 shadow-sm">
                                <h2 className="text-xl font-bold text-surface-900 mb-2">Select Vendors</h2>
                                <p className="text-surface-500 mb-6">Choose vendors to enhance your event</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {vendors.map((vendor) => {
                                        const isSelected = formData.selectedVendors.includes(vendor.id);
                                        return (
                                            <button
                                                key={vendor.id}
                                                onClick={() => toggleVendor(vendor.id)}
                                                className={`text-left p-4 rounded-2xl border-2 transition-all ${isSelected
                                                        ? 'border-primary-500 bg-primary-50/50'
                                                        : 'border-surface-200 hover:border-primary-200'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img src={vendor.image} alt={vendor.name} className="w-10 h-10 rounded-lg object-cover" />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-sm text-surface-900 truncate">{vendor.name}</h4>
                                                        <p className="text-xs text-surface-500">{vendor.category}</p>
                                                    </div>
                                                    <div className={`w-5 h-5 rounded flex items-center justify-center ${isSelected ? 'bg-primary-500' : 'border border-surface-300'
                                                        }`}>
                                                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-surface-400">{vendor.price}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-surface-100 shadow-sm">
                                <h2 className="text-xl font-bold text-surface-900 mb-6">Event Preview</h2>

                                {formData.image && (
                                    <div className="rounded-2xl overflow-hidden h-64 mb-6">
                                        <img src={formData.image} alt="Event cover" className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-surface-900">{formData.title || 'Untitled Event'}</h3>
                                        {formData.category && (
                                            <span className="badge bg-primary-50 text-primary-700 mt-2">{formData.category}</span>
                                        )}
                                    </div>

                                    {formData.description && (
                                        <p className="text-surface-600">{formData.description}</p>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {formData.venue && (
                                            <div className="flex items-center gap-2 text-sm text-surface-500">
                                                <MapPin className="w-4 h-4 text-primary-400" />
                                                {formData.venue}
                                            </div>
                                        )}
                                        {formData.date && (
                                            <div className="flex items-center gap-2 text-sm text-surface-500">
                                                <Calendar className="w-4 h-4 text-primary-400" />
                                                {formData.date} {formData.time && `at ${formData.time}`}
                                            </div>
                                        )}
                                    </div>

                                    {formData.tickets.some((t) => t.name) && (
                                        <div>
                                            <h4 className="font-semibold text-surface-900 mb-3">Ticket Tiers</h4>
                                            <div className="space-y-2">
                                                {formData.tickets.filter((t) => t.name).map((t, i) => (
                                                    <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-surface-50">
                                                        <div>
                                                            <span className="font-medium text-sm">{t.name}</span>
                                                            {t.description && <p className="text-xs text-surface-500">{t.description}</p>}
                                                        </div>
                                                        <span className="font-bold text-primary-600">
                                                            {t.price ? `$${t.price}` : 'Free'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {formData.selectedVendors.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-surface-900 mb-3">Selected Vendors</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.selectedVendors.map((id) => {
                                                    const v = vendors.find((v) => v.id === id);
                                                    return v ? (
                                                        <span key={id} className="badge bg-surface-100 text-surface-600">
                                                            {v.name}
                                                        </span>
                                                    ) : null;
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {currentStep === 6 && (
                            <div className="max-w-lg mx-auto text-center">
                                <div className="bg-white rounded-2xl p-8 lg:p-12 border border-surface-100 shadow-sm">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', delay: 0.2 }}
                                        className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-500/30"
                                    >
                                        <Sparkles className="w-10 h-10 text-white" />
                                    </motion.div>

                                    <h1 className="text-3xl font-bold text-surface-900 mb-2">Event Published! 🎉</h1>
                                    <p className="text-surface-500 mb-8">
                                        Your event is now live and ready for attendees to discover and book.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <a href="/events" className="btn-accent">View My Event</a>
                                        <a href="/dashboard" className="btn-secondary">Go to Dashboard</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                {currentStep < 6 && (
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className="btn-secondary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                        {currentStep === 5 ? (
                            <button onClick={handlePublish} className="btn-accent flex items-center gap-2">
                                <Send className="w-4 h-4" /> Publish Event
                            </button>
                        ) : (
                            <button onClick={handleNext} className="btn-accent flex items-center gap-2">
                                Next <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
