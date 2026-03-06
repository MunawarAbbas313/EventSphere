import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Menu, X, User, LayoutDashboard,
    Store, PlusCircle, Sparkles, ChevronDown, LogIn, Info,
    Sun, Moon, LogOut, Settings, TrendingUp, Star, Grid3X3,
    Compass, UserCircle, Phone, Mail, HelpCircle, BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
    { path: '/', label: 'Home' },
    {
        label: 'Events',
        path: '/events',
        hasDropdown: true,
        dropdown: [
            { path: '/events', label: 'Discover All', icon: Compass, desc: 'Browse all events' },
            { path: '/events?sort=trending', label: 'Trending', icon: TrendingUp, desc: 'Most popular right now' },
            { path: '/events?sort=featured', label: 'Featured', icon: Star, desc: 'Editor\'s picks' },
            { path: '/events?category=Music', label: 'By Category', icon: Grid3X3, desc: 'Music, Tech, Food & more' },
        ],
    },
    { path: '/vendors', label: 'Vendors', icon: Store },
    {
        label: 'Company',
        path: '/about',
        hasDropdown: true,
        dropdown: [
            { path: '/about', label: 'About Us', icon: Info, desc: 'Our story & mission' },
            { path: '/about#team', label: 'Our Team', icon: UserCircle, desc: 'Meet the people behind it' },
            { path: '/about#contact', label: 'Contact Us', icon: Mail, desc: 'Get in touch with us' },
            { path: '/about', label: 'Help Center', icon: HelpCircle, desc: 'FAQs & support resources' },
        ],
    },
    { path: '/create-event', label: 'Create Event', icon: PlusCircle },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const dropdownRef = useRef(null);
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
        setUserMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setActiveDropdown(null);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        navigate('/');
    };

    const isDark = theme === 'dark';

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? isDark
                    ? 'bg-surface-950/80 backdrop-blur-2xl shadow-2xl shadow-primary-500/5 border-b border-white/[0.04]'
                    : 'bg-white/70 backdrop-blur-2xl shadow-2xl shadow-primary-500/5 border-b border-black/[0.04]'
                : 'bg-transparent'
                }`}
        >
            <div className="container-app">
                <div className="flex items-center justify-between h-14 lg:h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-all duration-300 group-hover:scale-105">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold font-display tracking-tight">
                            <span className="gradient-text">Event</span>
                            <span className={`transition-colors duration-300 ${scrolled ? (isDark ? 'text-white' : 'text-surface-900') : (isDark ? 'text-white' : 'text-surface-800')}`}>Sphere</span>
                        </span>
                    </Link>

                    {/* Desktop Nav — centered pill */}
                    <div className="hidden lg:flex items-center" ref={dropdownRef}>
                        <div className={`flex items-center gap-0.5 px-1.5 py-1 rounded-full transition-all duration-300 ${scrolled
                                ? isDark
                                    ? 'bg-surface-800/60 border border-white/[0.06]'
                                    : 'bg-surface-100/70 border border-black/[0.04]'
                                : isDark
                                    ? 'bg-white/[0.06] border border-white/[0.06]'
                                    : 'bg-black/[0.03] border border-black/[0.03]'
                            }`}>
                            {navLinks.map((link) => {
                                const isActive = link.hasDropdown
                                    ? location.pathname === link.path || location.pathname.startsWith(link.path)
                                    : location.pathname === link.path;

                                if (link.hasDropdown) {
                                    return (
                                        <div key={link.label} className="relative">
                                            <button
                                                onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                                                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 flex items-center gap-1 cursor-pointer ${isActive
                                                    ? isDark
                                                        ? 'bg-primary-500/15 text-primary-400'
                                                        : 'bg-white text-primary-600 shadow-sm'
                                                    : isDark
                                                        ? 'text-surface-400 hover:text-white hover:bg-white/[0.06]'
                                                        : 'text-surface-600 hover:text-surface-900 hover:bg-white/60'
                                                    }`}
                                            >
                                                {link.label}
                                                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                                            </button>

                                            <AnimatePresence>
                                                {activeDropdown === link.label && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        transition={{ duration: 0.18, ease: 'easeOut' }}
                                                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-2xl shadow-2xl overflow-hidden border ${isDark
                                                            ? 'bg-surface-900/95 backdrop-blur-2xl border-white/[0.06]'
                                                            : 'bg-white/95 backdrop-blur-2xl border-black/[0.06]'
                                                            }`}
                                                    >
                                                        <div className="p-1.5">
                                                            {link.dropdown.map((item) => (
                                                                <Link
                                                                    key={item.path + item.label}
                                                                    to={item.path}
                                                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${isDark
                                                                        ? 'hover:bg-white/[0.06] text-surface-400 hover:text-white'
                                                                        : 'hover:bg-surface-50 text-surface-600 hover:text-surface-900'
                                                                        }`}
                                                                >
                                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isDark
                                                                        ? 'bg-white/[0.05] group-hover:bg-primary-500/15'
                                                                        : 'bg-surface-100 group-hover:bg-primary-50'
                                                                        }`}>
                                                                        <item.icon className="w-3.5 h-3.5 text-primary-500" />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-[13px] font-medium leading-tight">{item.label}</div>
                                                                        <div className={`text-[11px] leading-tight mt-0.5 ${isDark ? 'text-surface-600' : 'text-surface-400'}`}>{item.desc}</div>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${isActive
                                            ? isDark
                                                ? 'bg-primary-500/15 text-primary-400'
                                                : 'bg-white text-primary-600 shadow-sm'
                                            : isDark
                                                ? 'text-surface-400 hover:text-white hover:bg-white/[0.06]'
                                                : 'text-surface-600 hover:text-surface-900 hover:bg-white/60'
                                            }`}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            {link.icon && <link.icon className="w-3.5 h-3.5" />}
                                            {link.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="hidden lg:flex items-center gap-1.5">
                        {/* Search */}
                        <Link
                            to="/events"
                            className={`p-2 rounded-full transition-all ${isDark
                                ? 'text-surface-500 hover:text-white hover:bg-white/[0.06]'
                                : 'text-surface-500 hover:text-surface-900 hover:bg-surface-100'
                                }`}
                            aria-label="Search events"
                        >
                            <Search className="w-4 h-4" />
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-all cursor-pointer ${isDark
                                ? 'text-amber-400 hover:bg-amber-400/10'
                                : 'text-surface-500 hover:text-surface-900 hover:bg-surface-100'
                                }`}
                            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                        >
                            <motion.div
                                key={theme}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </motion.div>
                        </button>

                        {/* Divider */}
                        <div className={`w-px h-5 mx-1 ${isDark ? 'bg-white/[0.08]' : 'bg-black/[0.08]'}`} />

                        {/* Auth Section */}
                        {isLoggedIn ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className={`flex items-center gap-2 py-1 pl-1 pr-3 rounded-full transition-all cursor-pointer ${isDark
                                        ? 'hover:bg-white/[0.06]'
                                        : 'hover:bg-surface-100'
                                        }`}
                                >
                                    <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center ring-2 ring-white/20">
                                        <User className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <span className={`text-[13px] font-medium ${isDark ? 'text-surface-300' : 'text-surface-700'}`}>
                                        {user?.name?.split(' ')[0] || 'User'}
                                    </span>
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDark ? 'text-surface-500' : 'text-surface-400'} ${userMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.18, ease: 'easeOut' }}
                                            className={`absolute top-full right-0 mt-3 w-56 rounded-2xl shadow-2xl overflow-hidden border ${isDark
                                                ? 'bg-surface-900/95 backdrop-blur-2xl border-white/[0.06]'
                                                : 'bg-white/95 backdrop-blur-2xl border-black/[0.06]'
                                                }`}
                                        >
                                            {/* User info header */}
                                            <div className={`px-4 py-3 border-b ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
                                                <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-surface-900'}`}>
                                                    {user?.name || 'User'}
                                                </div>
                                                <div className={`text-xs ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>
                                                    {user?.email || ''}
                                                </div>
                                            </div>
                                            <div className="p-1.5">
                                                <Link
                                                    to="/profile"
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] transition-all ${isDark
                                                        ? 'text-surface-400 hover:bg-white/[0.06] hover:text-white'
                                                        : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                                                        }`}
                                                >
                                                    <UserCircle className="w-4 h-4" /> Profile
                                                </Link>
                                                <Link
                                                    to="/dashboard"
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] transition-all ${isDark
                                                        ? 'text-surface-400 hover:bg-white/[0.06] hover:text-white'
                                                        : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                                                        }`}
                                                >
                                                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                                                </Link>
                                                <Link
                                                    to="/profile"
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] transition-all ${isDark
                                                        ? 'text-surface-400 hover:bg-white/[0.06] hover:text-white'
                                                        : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                                                        }`}
                                                >
                                                    <Settings className="w-4 h-4" /> Settings
                                                </Link>
                                            </div>
                                            <div className={`p-1.5 border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
                                                <button
                                                    onClick={handleLogout}
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] w-full transition-all cursor-pointer ${isDark
                                                        ? 'text-red-400 hover:bg-red-500/10'
                                                        : 'text-red-600 hover:bg-red-50'
                                                        }`}
                                                >
                                                    <LogOut className="w-4 h-4" /> Sign Out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5">
                                <Link
                                    to="/login"
                                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all flex items-center gap-1.5 ${isDark
                                        ? 'text-surface-400 hover:text-white hover:bg-white/[0.06]'
                                        : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                                        }`}
                                >
                                    <LogIn className="w-3.5 h-3.5" />
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="gradient-primary text-white px-4 py-1.5 rounded-full text-[13px] font-semibold hover:shadow-lg hover:shadow-primary-500/25 active:scale-95 transition-all"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile: theme toggle + menu button */}
                    <div className="lg:hidden flex items-center gap-1">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-all cursor-pointer ${isDark
                                ? 'text-amber-400 hover:bg-white/[0.06]'
                                : 'text-surface-500 hover:bg-surface-100'
                                }`}
                            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                        >
                            {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-full transition-all cursor-pointer ${isDark
                                ? 'text-surface-400 hover:bg-white/[0.06]'
                                : 'text-surface-600 hover:bg-surface-100'
                                }`}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`lg:hidden overflow-hidden border-t ${isDark
                            ? 'bg-surface-950/95 backdrop-blur-2xl border-white/[0.04]'
                            : 'bg-white/95 backdrop-blur-2xl border-black/[0.04]'
                            }`}
                    >
                        <div className="container-app py-3 space-y-0.5">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                if (link.hasDropdown) {
                                    return (
                                        <div key={link.label}>
                                            <Link
                                                to={link.path}
                                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${isActive
                                                    ? isDark ? 'text-primary-400 bg-primary-500/10' : 'text-primary-600 bg-primary-50'
                                                    : isDark ? 'text-surface-400 hover:bg-white/[0.04]' : 'text-surface-600 hover:bg-surface-50'
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                            <div className="ml-4 space-y-0.5 mt-0.5">
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.path + item.label}
                                                        to={item.path}
                                                        className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs transition-all ${isDark
                                                            ? 'text-surface-500 hover:text-surface-300 hover:bg-white/[0.03]'
                                                            : 'text-surface-500 hover:text-surface-700 hover:bg-surface-50'
                                                            }`}
                                                    >
                                                        <item.icon className="w-3.5 h-3.5 text-primary-500" />
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${isActive
                                            ? isDark ? 'text-primary-400 bg-primary-500/10' : 'text-primary-600 bg-primary-50'
                                            : isDark ? 'text-surface-400 hover:bg-white/[0.04]' : 'text-surface-600 hover:bg-surface-50'
                                            }`}
                                    >
                                        {link.icon && <link.icon className="w-4 h-4" />}
                                        {link.label}
                                    </Link>
                                );
                            })}

                            <div className={`pt-2 mt-1 border-t space-y-0.5 ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
                                {isLoggedIn ? (
                                    <>
                                        <Link
                                            to="/profile"
                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${isDark ? 'text-surface-400 hover:bg-white/[0.04]' : 'text-surface-600 hover:bg-surface-50'}`}
                                        >
                                            <User className="w-4 h-4" /> Profile
                                        </Link>
                                        <Link
                                            to="/dashboard"
                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${isDark ? 'text-surface-400 hover:bg-white/[0.04]' : 'text-surface-600 hover:bg-surface-50'}`}
                                        >
                                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all w-full cursor-pointer ${isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'}`}
                                        >
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${isDark ? 'text-surface-400 hover:bg-white/[0.04]' : 'text-surface-600 hover:bg-surface-50'}`}
                                        >
                                            <LogIn className="w-4 h-4" /> Login
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-primary-600 bg-primary-50 transition-all"
                                        >
                                            <Sparkles className="w-4 h-4" /> Sign Up Free
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
