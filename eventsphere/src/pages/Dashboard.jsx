import { motion } from 'framer-motion';
import {
    DollarSign, Users, Ticket, CalendarCheck, TrendingUp,
    TrendingDown, ArrowUpRight, BarChart3, PieChart, Activity
} from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell
} from 'recharts';
import { dashboardData } from '../data/mockData';

const statCards = [
    {
        title: 'Total Revenue',
        value: `$${dashboardData.totalRevenue.toLocaleString()}`,
        growth: dashboardData.revenueGrowth,
        icon: DollarSign,
        color: 'from-emerald-500 to-teal-500',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-600',
    },
    {
        title: 'Tickets Sold',
        value: dashboardData.totalTicketsSold.toLocaleString(),
        growth: dashboardData.ticketGrowth,
        icon: Ticket,
        color: 'from-primary-500 to-blue-500',
        bgColor: 'bg-primary-50',
        textColor: 'text-primary-600',
    },
    {
        title: 'Total Attendees',
        value: dashboardData.totalAttendees.toLocaleString(),
        growth: 15.8,
        icon: Users,
        color: 'from-accent-500 to-pink-500',
        bgColor: 'bg-accent-50',
        textColor: 'text-accent-600',
    },
    {
        title: 'Active Events',
        value: dashboardData.totalEvents,
        growth: 8.3,
        icon: CalendarCheck,
        color: 'from-amber-500 to-orange-500',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-600',
    },
];

const COLORS = ['#3b82f6', '#d946ef', '#10b981', '#f59e0b', '#ef4444'];

export default function Dashboard() {
    return (
        <div className="pt-20 min-h-screen bg-surface-50">
            <div className="container-app py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold font-display text-surface-900">Organizer Dashboard</h1>
                    <p className="text-surface-500 mt-1">Track your event performance and revenue</p>
                </motion.div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statCards.map((stat, i) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-surface-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-11 h-11 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                                    <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${stat.growth > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                    }`}>
                                    {stat.growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {stat.growth}%
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-surface-900">{stat.value}</h3>
                            <p className="text-sm text-surface-500 mt-1">{stat.title}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Revenue Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 bg-white rounded-2xl p-6 border border-surface-100 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-surface-900">Revenue Overview</h2>
                                <p className="text-sm text-surface-500">Monthly revenue trend</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-medium">
                                <TrendingUp className="w-4 h-4" />
                                +{dashboardData.revenueGrowth}%
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={dashboardData.monthlyRevenue}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    }}
                                    formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#3b82f6"
                                    strokeWidth={2.5}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Ticket Sales Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl p-6 border border-surface-100 shadow-sm"
                    >
                        <h2 className="text-lg font-bold text-surface-900 mb-2">Ticket Sales</h2>
                        <p className="text-sm text-surface-500 mb-6">Monthly sales distribution</p>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dashboardData.monthlyRevenue.slice(-6)}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                                <YAxis stroke="#94a3b8" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <Bar dataKey="tickets" fill="#d946ef" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Events */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-2xl p-6 border border-surface-100 shadow-sm"
                    >
                        <h2 className="text-lg font-bold text-surface-900 mb-6">
                            <BarChart3 className="w-5 h-5 inline mr-2 text-primary-500" />
                            Top Performing Events
                        </h2>
                        <div className="space-y-4">
                            {dashboardData.topEvents.map((event, i) => {
                                const maxRevenue = Math.max(...dashboardData.topEvents.map((e) => e.revenue));
                                const percent = (event.revenue / maxRevenue) * 100;
                                return (
                                    <div key={event.name}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-md bg-surface-100 flex items-center justify-center text-xs font-bold text-surface-500">
                                                    {i + 1}
                                                </span>
                                                <span className="text-sm font-medium text-surface-900">{event.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm font-bold text-surface-900">${event.revenue.toLocaleString()}</span>
                                                <span className="text-xs text-surface-400 block">{event.tickets} tickets</span>
                                            </div>
                                        </div>
                                        <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percent}%` }}
                                                transition={{ delay: 0.7 + i * 0.1, duration: 0.8 }}
                                                className="h-full rounded-full"
                                                style={{ background: COLORS[i] }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Vendor Status */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-2xl p-6 border border-surface-100 shadow-sm"
                    >
                        <h2 className="text-lg font-bold text-surface-900 mb-6">
                            <Activity className="w-5 h-5 inline mr-2 text-primary-500" />
                            Vendor Booking Status
                        </h2>
                        <div className="space-y-4">
                            {dashboardData.vendorStatus.map((vendor) => {
                                const statusColors = {
                                    Confirmed: 'bg-emerald-50 text-emerald-600',
                                    Pending: 'bg-amber-50 text-amber-600',
                                    'In Review': 'bg-blue-50 text-blue-600',
                                };
                                return (
                                    <div
                                        key={vendor.name}
                                        className="flex items-center justify-between p-4 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors"
                                    >
                                        <div>
                                            <h4 className="font-medium text-sm text-surface-900">{vendor.name}</h4>
                                            <p className="text-xs text-surface-500 mt-0.5">For: {vendor.event}</p>
                                        </div>
                                        <span className={`badge ${statusColors[vendor.status]}`}>
                                            {vendor.status}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
