import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search, SlidersHorizontal, Star, MapPin, BadgeCheck, X,
    ChevronDown, ExternalLink
} from 'lucide-react';
import { vendors } from '../data/mockData';
import VendorCard from '../components/cards/VendorCard';
import Modal from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';

const serviceTypes = ['All', 'Audio & Sound', 'Catering', 'Photography', 'Decoration', 'Lighting', 'Venue'];

export default function VendorMarketplace() {
    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedVendor, setSelectedVendor] = useState(null);
    const { addToast } = useToast();

    const filteredVendors = vendors.filter((v) => {
        const matchesSearch =
            v.name.toLowerCase().includes(search.toLowerCase()) ||
            v.category.toLowerCase().includes(search.toLowerCase()) ||
            v.description.toLowerCase().includes(search.toLowerCase());
        const matchesType = selectedType === 'All' || v.category === selectedType;
        return matchesSearch && matchesType;
    });

    const handleBookVendor = (vendor) => {
        addToast(`Booking request sent to ${vendor.name}!`, 'success');
        setSelectedVendor(null);
    };

    return (
        <div className="pt-20 min-h-screen bg-surface-50">
            {/* Header */}
            <div className="bg-white border-b border-surface-100">
                <div className="container-app py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl sm:text-4xl font-bold font-display text-surface-900 mb-2">
                            Vendor Marketplace
                        </h1>
                        <p className="text-surface-500">
                            Find and book the best vendors for your events
                        </p>
                    </motion.div>

                    {/* Search + Filters */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                            <input
                                type="text"
                                placeholder="Search vendors..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="input-field !pl-12"
                            />
                        </div>
                    </div>

                    {/* Service Type Pills */}
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                        {serviceTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedType === type
                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                                        : 'bg-white border border-surface-200 text-surface-600 hover:border-primary-300'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vendor Grid */}
            <div className="container-app py-10">
                {filteredVendors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVendors.map((vendor, i) => (
                            <VendorCard
                                key={vendor.id}
                                vendor={vendor}
                                index={i}
                                onClick={setSelectedVendor}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-surface-400" />
                        </div>
                        <h3 className="text-xl font-bold text-surface-900 mb-2">No vendors found</h3>
                        <p className="text-surface-500">Try a different search or filter</p>
                    </div>
                )}
            </div>

            {/* Vendor Detail Modal */}
            <Modal
                isOpen={!!selectedVendor}
                onClose={() => setSelectedVendor(null)}
                title="Vendor Details"
                size="lg"
            >
                {selectedVendor && (
                    <div>
                        <div className="flex items-start gap-5 mb-6">
                            <img
                                src={selectedVendor.image}
                                alt={selectedVendor.name}
                                className="w-24 h-24 rounded-2xl object-cover"
                            />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-bold text-surface-900">
                                        {selectedVendor.name}
                                    </h3>
                                    {selectedVendor.verified && (
                                        <BadgeCheck className="w-5 h-5 text-primary-500" />
                                    )}
                                </div>
                                <p className="text-sm text-surface-500 mt-1">{selectedVendor.category}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    <span className="text-sm font-semibold">{selectedVendor.rating}</span>
                                    <span className="text-xs text-surface-400">({selectedVendor.reviews} reviews)</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-surface-600 mb-6">{selectedVendor.description}</p>

                        <div className="mb-6">
                            <h4 className="font-semibold text-surface-900 mb-3">Services</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedVendor.services.map((service) => (
                                    <span key={service} className="badge bg-primary-50 text-primary-700">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-surface-50">
                            <MapPin className="w-5 h-5 text-primary-400" />
                            <span className="text-sm text-surface-600">{selectedVendor.location}</span>
                            <span className="ml-auto text-lg font-bold text-primary-600">{selectedVendor.price}</span>
                        </div>

                        <button
                            onClick={() => handleBookVendor(selectedVendor)}
                            className="btn-accent w-full"
                        >
                            Book {selectedVendor.name}
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}
