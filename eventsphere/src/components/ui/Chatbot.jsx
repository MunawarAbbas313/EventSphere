import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

const botResponses = {
    greetings: [
        "Hi there! 👋 Welcome to EventSphere. How can I help you today?",
        "Hello! I'm EventBot, your virtual assistant. Ask me anything about events, tickets, or vendors!",
    ],
    events: "We have 10,000+ events across 100+ cities! You can browse them on our **Discover** page. Use filters for category, date, location, and price range. Would you like me to help you find something specific?",
    tickets: "Booking tickets is easy! Just find an event you love, select your ticket tier (General, VIP, Premium, etc.), choose quantity, and checkout securely. All bookings are confirmed instantly via email. 🎫",
    vendors: "Our Vendor Marketplace connects you with 2,000+ verified vendors — DJs, caterers, photographers, decorators, and more. You can browse by category, check ratings, and book directly! 🏪",
    pricing: "EventSphere is **free for attendees**! For organizers, we charge a small 5% service fee on ticket sales. Vendor listings start at $29/month. Check our pricing page for more details. 💰",
    create: "Creating an event is simple with our step-by-step wizard! Go to **Create Event** and follow 6 easy steps: Basic Info → Venue & Time → Tickets → Vendors → Preview → Publish. You can save drafts anytime!",
    help: "I can help you with:\n• 🎪 Finding events\n• 🎫 Booking tickets\n• 🏪 Vendor marketplace\n• 💰 Pricing questions\n• 📋 Creating events\n• 👤 Account settings\n\nJust ask me anything!",
    account: "You can manage your account from the **Profile** page. There you'll find your bookings, saved events, and account settings. Need to update your info? Just head there! 👤",
    default: "I'm not sure I understand that fully, but I'm here to help! You can ask me about:\n• Events & discovery\n• Ticket booking\n• Vendor marketplace\n• Creating events\n• Pricing & plans\n\nOr type **help** to see all options!",
};

function getBotResponse(message) {
    const lower = message.toLowerCase();

    if (/\b(hi|hello|hey|howdy|greetings|good\s*(morning|afternoon|evening))\b/.test(lower)) {
        return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    }
    if (/\b(event|discover|find|browse|search|show)\b/.test(lower)) return botResponses.events;
    if (/\b(ticket|book|buy|purchase|checkout)\b/.test(lower)) return botResponses.tickets;
    if (/\b(vendor|supplier|catering|dj|photo|decor|venue)\b/.test(lower)) return botResponses.vendors;
    if (/\b(price|pricing|cost|fee|charge|free|plan)\b/.test(lower)) return botResponses.pricing;
    if (/\b(create|organize|host|make|new\s*event|wizard)\b/.test(lower)) return botResponses.create;
    if (/\b(help|support|assist|options|menu)\b/.test(lower)) return botResponses.help;
    if (/\b(account|profile|settings|login|signup|password)\b/.test(lower)) return botResponses.account;

    return botResponses.default;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: "Hi! 👋 I'm **EventBot**, your virtual assistant. How can I help you today?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text: input.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMessage]);
        const query = input.trim();
        setInput('');
        setIsTyping(true);

        // Simulate bot thinking delay
        setTimeout(() => {
            const botMessage = {
                id: Date.now() + 1,
                sender: 'bot',
                text: getBotResponse(query),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 800 + Math.random() * 700);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickActions = ['Find events', 'Book tickets', 'Vendors', 'Pricing', 'Help'];

    // Simple markdown bold rendering
    const renderText = (text) => {
        return text.split('\n').map((line, i) => (
            <span key={i}>
                {line.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
                    }
                    return part;
                })}
                {i < text.split('\n').length - 1 && <br />}
            </span>
        ));
    };

    return (
        <>
            {/* Float Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-[80] w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-shadow cursor-pointer group"
                        aria-label="Open chat"
                    >
                        <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                        {/* Pulse ring */}
                        <span className="absolute inset-0 rounded-full gradient-primary animate-ping opacity-20" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-[80] w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl border border-surface-200 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="gradient-primary p-4 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">EventBot</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-xs text-white/80">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-xl hover:bg-white/20 transition-colors text-white"
                                aria-label="Close chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-50">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'bot'
                                                ? 'bg-primary-100 text-primary-600'
                                                : 'bg-surface-200 text-surface-600'
                                            }`}>
                                            {msg.sender === 'bot' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                                        </div>
                                        <div>
                                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'bot'
                                                    ? 'bg-white border border-surface-100 text-surface-700 rounded-bl-md'
                                                    : 'bg-primary-600 text-white rounded-br-md'
                                                }`}>
                                                {renderText(msg.text)}
                                            </div>
                                            <span className={`text-[10px] text-surface-400 mt-1 block ${msg.sender === 'user' ? 'text-right' : ''}`}>
                                                {msg.time}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-end gap-2"
                                >
                                    <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="bg-white border border-surface-100 px-4 py-3 rounded-2xl rounded-bl-md">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 rounded-full bg-surface-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 rounded-full bg-surface-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 rounded-full bg-surface-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick actions */}
                        {messages.length <= 2 && (
                            <div className="px-4 py-2 border-t border-surface-100 bg-white flex gap-2 overflow-x-auto flex-shrink-0">
                                {quickActions.map((action) => (
                                    <button
                                        key={action}
                                        onClick={() => {
                                            setInput(action);
                                            setTimeout(() => {
                                                const userMsg = {
                                                    id: Date.now(),
                                                    sender: 'user',
                                                    text: action,
                                                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                                };
                                                setMessages((prev) => [...prev, userMsg]);
                                                setIsTyping(true);
                                                setInput('');
                                                setTimeout(() => {
                                                    setMessages((prev) => [...prev, {
                                                        id: Date.now() + 1,
                                                        sender: 'bot',
                                                        text: getBotResponse(action),
                                                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                                    }]);
                                                    setIsTyping(false);
                                                }, 800);
                                            }, 100);
                                        }}
                                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary-50 text-primary-600 hover:bg-primary-100 transition-all whitespace-nowrap flex-shrink-0"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-3 border-t border-surface-100 bg-white flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-surface-50 border border-surface-200 text-sm text-surface-900 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow disabled:opacity-50 disabled:shadow-none cursor-pointer"
                                    aria-label="Send message"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-[10px] text-surface-400 text-center mt-2">
                                <Sparkles className="w-3 h-3 inline mr-1" />
                                Powered by EventSphere AI
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
