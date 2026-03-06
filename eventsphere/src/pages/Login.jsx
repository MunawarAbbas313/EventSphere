import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, Info } from 'lucide-react';
import { useToast } from '../components/ui/Toast';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToast();
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (email === 'admin@eventsphere.com' && password === 'admin123') {
                login({ name: 'Admin', email: 'admin@eventsphere.com', role: 'admin' });
                addToast('Welcome back! Login successful.', 'success');
                navigate('/');
            } else if (email === 'user@eventsphere.com' && password === 'user123') {
                login({ name: 'Alex Johnson', email: 'user@eventsphere.com', role: 'user' });
                addToast('Welcome back! Login successful.', 'success');
                navigate('/');
            } else {
                addToast('Invalid credentials. Try the demo accounts below!', 'error');
            }
        }, 1200);
    };

    const fillCredentials = (email, password) => {
        setEmail(email);
        setPassword(password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-primary-900 to-surface-950" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-500/15 rounded-full blur-[100px]" />
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
                    <p className="text-surface-400 mt-3 text-sm">Welcome back! Sign in to your account</p>
                </motion.div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
                >
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="text-sm font-medium text-surface-200 mb-2 block">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
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
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
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
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border-white/20 text-primary-500 focus:ring-primary-500/50" />
                                <span className="text-sm text-surface-300">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-accent w-full flex items-center justify-center gap-2 !py-3.5 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-surface-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                                Create one free
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Demo Credentials Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Info className="w-4 h-4 text-primary-400" />
                        <h3 className="text-sm font-semibold text-white">Demo Login Credentials</h3>
                    </div>
                    <div className="space-y-2">
                        <button
                            onClick={() => fillCredentials('admin@eventsphere.com', 'admin123')}
                            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group"
                        >
                            <div>
                                <span className="badge bg-amber-500/20 text-amber-300 text-[10px] mb-1">ADMIN</span>
                                <p className="text-xs text-surface-300 mt-1">admin@eventsphere.com</p>
                                <p className="text-xs text-surface-400">Password: admin123</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-surface-500 group-hover:text-primary-400 transition-colors" />
                        </button>
                        <button
                            onClick={() => fillCredentials('user@eventsphere.com', 'user123')}
                            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group"
                        >
                            <div>
                                <span className="badge bg-primary-500/20 text-primary-300 text-[10px] mb-1">USER</span>
                                <p className="text-xs text-surface-300 mt-1">user@eventsphere.com</p>
                                <p className="text-xs text-surface-400">Password: user123</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-surface-500 group-hover:text-primary-400 transition-colors" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
