import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search, ArrowRight, Sparkles, Calendar, MapPin, Users,
    Star, TrendingUp, Zap, ChevronRight, Play, Quote, Mail
} from 'lucide-react';
import { useState } from 'react';
import { events, categories, vendors, testimonials, howItWorks } from '../data/mockData';
import EventCard from '../components/cards/EventCard';

export default function Landing() {
    const [searchQuery, setSearchQuery] = useState('');
    const [email, setEmail] = useState('');
    const featuredEvents = events.filter((e) => e.isFeatured);
    const trendingEvents = events.filter((e) => e.isTrending);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-primary-900 to-surface-950" />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/15 rounded-full blur-[100px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[150px]" />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />
                </div>

                <div className="container-app relative z-10 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/10 text-primary-300 text-sm font-medium mb-8">
                                <Sparkles className="w-4 h-4" />
                                Trusted by 50,000+ event organizers worldwide
                            </span>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white mb-6 leading-tight">
                                Discover. Plan.
                                <br />
                                <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
                                    Book. Experience.
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl text-surface-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Your all-in-one platform for discovering extraordinary events,
                                connecting with top vendors, and creating unforgettable experiences.
                            </p>
                        </motion.div>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl shadow-black/20">
                                <div className="flex-1 flex items-center gap-3 px-4">
                                    <Search className="w-5 h-5 text-surface-300" />
                                    <input
                                        type="text"
                                        placeholder="Search events, concerts, conferences..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-transparent text-white placeholder-surface-400 outline-none text-sm py-2"
                                    />
                                </div>
                                <Link
                                    to={`/events${searchQuery ? `?q=${searchQuery}` : ''}`}
                                    className="btn-accent flex items-center gap-2 !rounded-xl !px-6 !py-3"
                                >
                                    <span className="hidden sm:inline">Explore</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Quick filters */}
                            <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                                <span className="text-xs text-surface-400">Popular:</span>
                                {['Music', 'Tech', 'Food', 'Sports'].map((tag) => (
                                    <Link
                                        key={tag}
                                        to={`/events?category=${tag}`}
                                        className="px-3 py-1 rounded-full text-xs text-surface-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-16"
                        >
                            {[
                                { value: '10K+', label: 'Events' },
                                { value: '500K+', label: 'Attendees' },
                                { value: '2K+', label: 'Vendors' },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                                    <div className="text-xs text-surface-400 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
                    >
                        <div className="w-1.5 h-3 rounded-full bg-white/40" />
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section-padding bg-white">
                <div className="container-app">
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-semibold mb-4">
                            <Zap className="w-3 h-3" />
                            HOW IT WORKS
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold font-display text-surface-900 mb-3">
                            Your Journey Starts Here
                        </h2>
                        <p className="text-surface-500 max-w-lg mx-auto text-sm">
                            From discovery to review — your complete event experience in 4 simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {howItWorks.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group"
                            >
                                <div className="glass-card-premium rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <div className="text-xs font-bold text-primary-500 tracking-wider mb-2">{item.step}</div>
                                    <h3 className="font-bold text-surface-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-surface-500 leading-relaxed">{item.description}</p>
                                </div>
                                {/* Connector line */}
                                {i < howItWorks.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary-200" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="section-padding bg-surface-50">
                <div className="container-app">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold font-display text-surface-900 mb-3">
                            Explore by Category
                        </h2>
                        <p className="text-surface-500 max-w-lg mx-auto text-sm">
                            Find the perfect event from our diverse range of categories
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link
                                    to={`/events?category=${cat.name}`}
                                    className="group block p-6 rounded-2xl glass-card-premium hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="text-4xl mb-3">{cat.icon}</div>
                                    <h3 className="font-semibold text-surface-900 group-hover:text-primary-600 transition-colors">
                                        {cat.name}
                                    </h3>
                                    <p className="text-sm text-surface-400 mt-1">{cat.count} events</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <section className="section-padding bg-white">
                <div className="container-app">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold font-display text-surface-900 mb-2">
                                Featured Events
                            </h2>
                            <p className="text-surface-500 text-sm">Handpicked events you don't want to miss</p>
                        </div>
                        <Link
                            to="/events"
                            className="hidden sm:flex items-center gap-2 text-primary-600 font-medium hover:gap-3 transition-all text-sm"
                        >
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredEvents.map((event, i) => (
                            <EventCard key={event.id} event={event} index={i} />
                        ))}
                    </div>

                    <div className="mt-8 text-center sm:hidden">
                        <Link to="/events" className="btn-secondary inline-flex items-center gap-2">
                            View all events <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trending Events */}
            <section className="section-padding bg-surface-50">
                <div className="container-app">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-coral" />
                                <span className="text-sm font-medium text-coral">Trending Now</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold font-display text-surface-900">
                                Hot Right Now
                            </h2>
                        </div>
                        <Link
                            to="/events?sort=trending"
                            className="hidden sm:flex items-center gap-2 text-primary-600 font-medium hover:gap-3 transition-all text-sm"
                        >
                            See trending <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trendingEvents.map((event, i) => (
                            <EventCard key={event.id} event={event} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding bg-white">
                <div className="container-app">
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-600 text-xs font-semibold mb-4">
                            <Star className="w-3 h-3" />
                            TESTIMONIALS
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold font-display text-surface-900 mb-3">
                            Loved by Thousands
                        </h2>
                        <p className="text-surface-500 max-w-lg mx-auto text-sm">
                            Hear from people who've transformed their event experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card-premium rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
                            >
                                <Quote className="w-8 h-8 text-primary-200 mb-4" />
                                <p className="text-surface-600 text-sm leading-relaxed mb-6">
                                    "{t.text}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <div className="font-semibold text-surface-900 text-sm">{t.name}</div>
                                        <div className="text-xs text-surface-400">{t.role}</div>
                                    </div>
                                </div>
                                <div className="flex gap-0.5 mt-3">
                                    {[...Array(t.rating)].map((_, idx) => (
                                        <Star key={idx} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vendor Highlights */}
            <section className="section-padding bg-surface-50">
                <div className="container-app">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold font-display text-surface-900 mb-3">
                            Top Vendors
                        </h2>
                        <p className="text-surface-500 max-w-lg mx-auto text-sm">
                            Work with the best professionals to make your event extraordinary
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vendors.slice(0, 3).map((vendor, i) => (
                            <motion.div
                                key={vendor.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group glass-card-premium rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={vendor.image}
                                        alt={vendor.name}
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />
                                    <div>
                                        <h3 className="font-bold text-surface-900 group-hover:text-primary-600 transition-colors">
                                            {vendor.name}
                                        </h3>
                                        <p className="text-sm text-surface-500">{vendor.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    <span className="text-sm font-medium">{vendor.rating}</span>
                                    <span className="text-xs text-surface-400">({vendor.reviews} reviews)</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {vendor.services.map((service) => (
                                        <span
                                            key={service}
                                            className="badge bg-surface-100 text-surface-600"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link to="/vendors" className="btn-secondary inline-flex items-center gap-2">
                            Browse all vendors <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="relative py-16 overflow-hidden bg-white">
                <div className="container-app relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card-premium rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
                    >
                        {/* Decorative blurs */}
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary-500/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-500/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/25">
                                <Mail className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold font-display text-surface-900 mb-3">
                                Stay in the Loop
                            </h2>
                            <p className="text-surface-500 mb-8 max-w-md mx-auto text-sm">
                                Get weekly curated event picks, exclusive deals, and insider tips delivered to your inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field flex-1 !rounded-xl text-sm"
                                />
                                <button className="btn-accent flex items-center gap-2 !rounded-xl whitespace-nowrap">
                                    Subscribe
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-xs text-surface-400 mt-3">
                                No spam, unsubscribe anytime. Read our <a href="#" className="underline hover:text-primary-500">Privacy Policy</a>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 gradient-primary" />
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)',
                    }}
                />
                <div className="container-app relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white mb-4">
                            Ready to Create Your Event?
                        </h2>
                        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                            Join thousands of organizers who trust EventSphere to bring
                            their vision to life. Start building your event today.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/create-event"
                                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-black/20 transition-all active:scale-95 flex items-center gap-2"
                            >
                                <Zap className="w-5 h-5" />
                                Start Creating
                            </Link>
                            <Link
                                to="/events"
                                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
                            >
                                Browse Events
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
