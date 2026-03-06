import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search, SlidersHorizontal, X, MapPin, Calendar, DollarSign,
    Grid3X3, List, ChevronDown
} from 'lucide-react';
import { events, categories } from '../data/mockData';
import EventCard from '../components/cards/EventCard';
import Pagination from '../components/ui/Pagination';

const sortOptions = [
    { value: 'date', label: 'Date (Nearest)' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
];

const priceRanges = [
    { value: 'free', label: 'Free' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-150', label: '$50 - $150' },
    { value: '150-500', label: '$150 - $500' },
    { value: '500+', label: '$500+' },
];

export default function EventDiscovery() {
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('q') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredEvents = useMemo(() => {
        let filtered = [...events];

        if (search) {
            const q = search.toLowerCase();
            filtered = filtered.filter(
                (e) =>
                    e.title.toLowerCase().includes(q) ||
                    e.description.toLowerCase().includes(q) ||
                    e.category.toLowerCase().includes(q) ||
                    e.location.toLowerCase().includes(q)
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter((e) => e.category === selectedCategory);
        }

        if (selectedPrice) {
            filtered = filtered.filter((e) => {
                switch (selectedPrice) {
                    case 'free': return e.price === 0;
                    case '0-50': return e.price <= 50;
                    case '50-150': return e.price >= 50 && e.price <= 150;
                    case '150-500': return e.price >= 150 && e.price <= 500;
                    case '500+': return e.price >= 500;
                    default: return true;
                }
            });
        }

        switch (sortBy) {
            case 'date':
                filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'popularity':
                filtered.sort((a, b) => b.attendees - a.attendees);
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
        }

        return filtered;
    }, [search, selectedCategory, selectedPrice, sortBy]);

    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const clearFilters = () => {
        setSearch('');
        setSelectedCategory('');
        setSelectedPrice('');
        setSortBy('date');
        setCurrentPage(1);
    };

    const hasActiveFilters = search || selectedCategory || selectedPrice;

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
                            Discover Events
                        </h1>
                        <p className="text-surface-500">
                            {filteredEvents.length} events found
                            {selectedCategory && ` in ${selectedCategory}`}
                        </p>
                    </motion.div>

                    {/* Search + Filter Bar */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                            <input
                                type="text"
                                placeholder="Search events by name, location, keyword..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                                className="input-field !pl-12"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-medium transition-all ${showFilters || hasActiveFilters
                                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                                    : 'border-surface-200 bg-white text-surface-700 hover:border-surface-300'
                                }`}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                            {hasActiveFilters && (
                                <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
                                    {[search, selectedCategory, selectedPrice].filter(Boolean).length}
                                </span>
                            )}
                        </button>

                        {/* Sort dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="input-field !pr-10 appearance-none cursor-pointer min-w-[180px]"
                            >
                                {sortOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Expanded Filters */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 p-6 bg-surface-50 rounded-2xl border border-surface-200"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category */}
                                <div>
                                    <label className="text-sm font-medium text-surface-700 mb-3 block">Category</label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => { setSelectedCategory(''); setCurrentPage(1); }}
                                            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${!selectedCategory ? 'bg-primary-600 text-white' : 'bg-white border border-surface-200 text-surface-600 hover:border-primary-300'
                                                }`}
                                        >
                                            All
                                        </button>
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.id}
                                                onClick={() => { setSelectedCategory(cat.name); setCurrentPage(1); }}
                                                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat.name
                                                        ? 'bg-primary-600 text-white'
                                                        : 'bg-white border border-surface-200 text-surface-600 hover:border-primary-300'
                                                    }`}
                                            >
                                                {cat.icon} {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="text-sm font-medium text-surface-700 mb-3 block">Price Range</label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => { setSelectedPrice(''); setCurrentPage(1); }}
                                            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${!selectedPrice ? 'bg-primary-600 text-white' : 'bg-white border border-surface-200 text-surface-600 hover:border-primary-300'
                                                }`}
                                        >
                                            Any
                                        </button>
                                        {priceRanges.map((range) => (
                                            <button
                                                key={range.value}
                                                onClick={() => { setSelectedPrice(range.value); setCurrentPage(1); }}
                                                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${selectedPrice === range.value
                                                        ? 'bg-primary-600 text-white'
                                                        : 'bg-white border border-surface-200 text-surface-600 hover:border-primary-300'
                                                    }`}
                                            >
                                                {range.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {hasActiveFilters && (
                                <div className="mt-4 pt-4 border-t border-surface-200">
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Results */}
            <div className="container-app py-10">
                {paginatedEvents.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedEvents.map((event, i) => (
                                <EventCard key={event.id} event={event} index={i} />
                            ))}
                        </div>

                        <div className="mt-10">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-surface-400" />
                        </div>
                        <h3 className="text-xl font-bold text-surface-900 mb-2">No events found</h3>
                        <p className="text-surface-500 mb-6">Try adjusting your filters or search terms</p>
                        <button onClick={clearFilters} className="btn-primary">
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
