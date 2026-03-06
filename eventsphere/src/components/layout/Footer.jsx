import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

const footerLinks = {
    Product: [
        { label: 'Discover Events', path: '/events' },
        { label: 'Create Event', path: '/create-event' },
        { label: 'Vendor Marketplace', path: '/vendors' },
        { label: 'Pricing', path: '#' },
    ],
    Company: [
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '#' },
        { label: 'Blog', path: '#' },
        { label: 'Press', path: '#' },
    ],
    Support: [
        { label: 'Help Center', path: '#' },
        { label: 'Contact Us', path: '#' },
        { label: 'Privacy Policy', path: '#' },
        { label: 'Terms of Service', path: '#' },
    ],
};

const socialLinks = [
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' },
    { icon: Github, url: '#', label: 'GitHub' },
];

export default function Footer() {
    return (
        <footer className="bg-surface-900 text-surface-300 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />

            <div className="container-app relative z-10">
                {/* Main Footer */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold font-display text-white">
                                Event<span className="text-primary-400">Sphere</span>
                            </span>
                        </Link>
                        <p className="text-surface-300 text-sm leading-relaxed mb-6 max-w-sm">
                            Discover, plan, and book extraordinary events. Connect with top vendors and create unforgettable experiences with EventSphere.
                        </p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary-400" />
                                <span>hello@eventsphere.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary-400" />
                                <span>+1 (555) 000-1234</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary-400" />
                                <span>San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="text-white font-semibold mb-4">{title}</h3>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.path}
                                            className="text-sm text-surface-400 hover:text-primary-400 transition-colors duration-200 flex items-center gap-1 group"
                                        >
                                            {link.label}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-surface-500">
                        © 2026 EventSphere. All rights reserved.
                    </p>
                    <div className="flex items-center gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.url}
                                className="w-9 h-9 rounded-lg bg-surface-800 flex items-center justify-center text-surface-400 hover:text-white hover:bg-primary-600 transition-all duration-200"
                                aria-label={social.label}
                            >
                                <social.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
