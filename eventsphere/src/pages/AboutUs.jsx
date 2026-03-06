import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Sparkles, Users, Globe, Heart, Award, Shield,
    Zap, ArrowRight, MapPin, Mail, BarChart3, CheckCircle
} from 'lucide-react';

const stats = [
    { value: '50K+', label: 'Events Created', icon: Sparkles },
    { value: '500K+', label: 'Happy Attendees', icon: Users },
    { value: '2K+', label: 'Trusted Vendors', icon: Award },
    { value: '100+', label: 'Cities Worldwide', icon: Globe },
];

const values = [
    {
        icon: Heart,
        title: 'Community First',
        description: 'We believe in the power of bringing people together. Every feature we build is designed to foster meaningful connections.',
        color: 'bg-rose-50 text-rose-600',
    },
    {
        icon: Shield,
        title: 'Trust & Safety',
        description: 'Secure payments, verified vendors, and transparent policies. Your trust is our foundation.',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        icon: Zap,
        title: 'Innovation',
        description: 'We leverage cutting-edge technology — AI recommendations, real-time collaboration, and seamless booking experiences.',
        color: 'bg-amber-50 text-amber-600',
    },
    {
        icon: Globe,
        title: 'Accessibility',
        description: 'Events should be for everyone. We design inclusive experiences with accessibility at the core.',
        color: 'bg-emerald-50 text-emerald-600',
    },
];

const team = [
    {
        name: 'Sarah Chen',
        role: 'CEO & Co-Founder',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=6366f1&color=fff&size=200',
        bio: 'Former VP at Eventbrite, passionate about transforming event experiences.',
    },
    {
        name: 'Marcus Riley',
        role: 'CTO & Co-Founder',
        avatar: 'https://ui-avatars.com/api/?name=Marcus+Riley&background=3b82f6&color=fff&size=200',
        bio: 'Ex-Google engineer with a vision for AI-powered event planning.',
    },
    {
        name: 'Priya Sharma',
        role: 'Head of Design',
        avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=ec4899&color=fff&size=200',
        bio: 'Award-winning designer crafting delightful user experiences.',
    },
    {
        name: 'James Okonkwo',
        role: 'Head of Partnerships',
        avatar: 'https://ui-avatars.com/api/?name=James+Okonkwo&background=22c55e&color=fff&size=200',
        bio: 'Building bridges between organizers, vendors, and communities.',
    },
];

const milestones = [
    { year: '2023', title: 'Founded', description: 'EventSphere launched with a vision to simplify event planning.' },
    { year: '2024', title: 'Series A', description: 'Raised $12M to scale operations and expand to 50 cities.' },
    { year: '2025', title: '100K Users', description: 'Reached 100,000 registered users and 10,000 events hosted.' },
    { year: '2026', title: 'AI Launch', description: 'Introduced AI-powered event suggestions and vendor matching.' },
];

export default function AboutUs() {
    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-primary-900 to-surface-950" />
                <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary-500/15 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]" />

                <div className="container-app relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/10 text-primary-300 text-sm font-medium mb-6">
                            <Heart className="w-4 h-4" />
                            About EventSphere
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6 leading-tight">
                            We're on a Mission to
                            <br />
                            <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
                                Transform Events
                            </span>
                        </h1>
                        <p className="text-lg text-surface-300 max-w-2xl mx-auto leading-relaxed">
                            EventSphere was born from a simple idea: making event planning effortless and
                            event discovery delightful. We connect organizers, vendors, and attendees on
                            one powerful platform.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-white border-b border-surface-100">
                <div className="container-app">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center p-6"
                            >
                                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/20">
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="text-3xl sm:text-4xl font-bold text-surface-900 mb-1">{stat.value}</div>
                                <div className="text-sm text-surface-500">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="section-padding bg-surface-50">
                <div className="container-app">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold font-display text-surface-900 mb-4">Our Story</h2>
                            <div className="h-1 w-20 gradient-primary rounded-full mx-auto mb-8" />
                        </motion.div>

                        <div className="prose prose-lg max-w-none text-surface-600 space-y-6">
                            <p>
                                EventSphere started in 2023 when our founders, Sarah and Marcus, realized how fragmented
                                the event planning landscape was. Organizers were juggling dozens of tools, vendors had
                                no centralized marketplace, and attendees struggled to discover events that matched
                                their interests.
                            </p>
                            <p>
                                We set out to build a unified platform that brings together every aspect of the event
                                lifecycle — from discovery and planning to booking and real-time collaboration. Today,
                                EventSphere powers thousands of events across 100+ cities, helping organizers save time,
                                vendors grow their businesses, and attendees find unforgettable experiences.
                            </p>
                            <p>
                                Our AI-powered recommendation engine, seamless booking flow, and vendor marketplace
                                make us the most complete event platform in the market. But we're just getting started.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-padding bg-white">
                <div className="container-app">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-surface-900 mb-3">Our Journey</h2>
                        <p className="text-surface-500">Key milestones that shaped EventSphere</p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        {milestones.map((milestone, i) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-6 mb-8 last:mb-0"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/25 flex-shrink-0">
                                        {milestone.year}
                                    </div>
                                    {i < milestones.length - 1 && (
                                        <div className="w-0.5 flex-1 bg-primary-200 mt-2" />
                                    )}
                                </div>
                                <div className="pb-8">
                                    <h3 className="font-bold text-surface-900 text-lg">{milestone.title}</h3>
                                    <p className="text-surface-500 mt-1">{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-surface-50">
                <div className="container-app">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-surface-900 mb-3">Our Values</h2>
                        <p className="text-surface-500">The principles that guide everything we do</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {values.map((value, i) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-6 border border-surface-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className={`w-12 h-12 rounded-xl ${value.color} flex items-center justify-center mb-4`}>
                                    <value.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-surface-900 text-lg mb-2">{value.title}</h3>
                                <p className="text-surface-500 text-sm leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section-padding bg-white">
                <div className="container-app">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-surface-900 mb-3">Meet the Team</h2>
                        <p className="text-surface-500">The people making EventSphere possible</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center group"
                            >
                                <div className="relative inline-block mb-4">
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="w-28 h-28 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow"
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
                                        <CheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <h3 className="font-bold text-surface-900">{member.name}</h3>
                                <p className="text-sm text-primary-600 font-medium">{member.role}</p>
                                <p className="text-sm text-surface-500 mt-2">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 gradient-primary" />
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                    }}
                />
                <div className="container-app relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
                            Join the EventSphere Community
                        </h2>
                        <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                            Whether you're an organizer, vendor, or attendee — there's a place for you here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/signup"
                                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                to="/events"
                                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                Explore Events
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
