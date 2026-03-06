import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, User, Phone, Check } from 'lucide-react';
import { useToast } from '../components/ui/Toast';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToast();
    const { login } = useAuth();
    const navigate = useNavigate();

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const passwordStrength = () => {
        const p = formData.password;
        if (!p) return { level: 0, label: '', color: '' };
        let score = 0;
        if (p.length >= 8) score++;
        if (/[A-Z]/.test(p)) score++;
        if (/[0-9]/.test(p)) score++;
        if (/[^A-Za-z0-9]/.test(p)) score++;

        if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-red-500' };
        if (score === 2) return { level: 2, label: 'Fair', color: 'bg-amber-500' };
        if (score === 3) return { level: 3, label: 'Good', color: 'bg-blue-500' };
        return { level: 4, label: 'Strong', color: 'bg-emerald-500' };
    };

    const strength = passwordStrength();

    const handleSignup = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            addToast('Passwords do not match!', 'error');
            return;
        }

        if (!agreed) {
            addToast('Please agree to the terms and conditions.', 'warning');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            login({ name: formData.fullName, email: formData.email, role: 'user' });
            addToast('🎉 Account created successfully! Welcome to EventSphere.', 'success');
            navigate('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-primary-900 to-surface-950" />
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-500/15 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-[100px]" />
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative z-10 w-full max-w-md mx-auto px-4">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <Link to="/" className="inline-flex items-center gap-2 group">
                        <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/30">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold font-display text-white">
                            Event<span className="text-primary-400">Sphere</span>
                        </span>
                    </Link>
                    <p className="text-surface-400 mt-3 text-sm">Create your free account and start exploring</p>
                </motion.div>

                {/* Signup Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
                >
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-surface-200 mb-2 block">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => updateField('fullName', e.target.value)}
                                    required
                                    className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-surface-200 mb-2 block">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    required
                                    className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-surface-200 mb-2 block">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                                <input
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    value={formData.phone}
                                    onChange={(e) => updateField('phone', e.target.value)}
                                    className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-surface-200 mb-2 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Minimum 8 characters"
                                    value={formData.password}
                                    onChange={(e) => updateField('password', e.target.value)}
                                    required
                                    minLength={8}
                                    className="w-full px-4 py-3 pl-12 pr-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {/* Password strength */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded-full transition-all ${level <= strength.level ? strength.color : 'bg-white/10'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-surface-400">Password strength: {strength.label}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-surface-200 mb-2 block">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                                <input
                                    type="password"
                                    placeholder="Re-enter your password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                                    required
                                    className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                                />
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                                )}
                            </div>
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer pt-1">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="w-4 h-4 rounded bg-white/10 border-white/20 text-primary-500 focus:ring-primary-500/50 mt-0.5"
                            />
                            <span className="text-sm text-surface-300 leading-snug">
                                I agree to the{' '}
                                <a href="#" className="text-primary-400 hover:text-primary-300 underline">Terms of Service</a>{' '}
                                and{' '}
                                <a href="#" className="text-primary-400 hover:text-primary-300 underline">Privacy Policy</a>
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-accent w-full flex items-center justify-center gap-2 !py-3.5 disabled:opacity-70 mt-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-surface-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
