import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Bot } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'ai' | 'user';
    timestamp: Date;
}

const AIAssistantWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm your WeReview AI assistant. Looking for gadget advice or a quick comparison?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulated AI Response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: getMockResponse(text),
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const getMockResponse = (input: string) => {
        const query = input.toLowerCase();
        if (query.includes('iphone')) return "The iPhone 15 Pro Max is currently our top-rated phone. Its titanium build and A17 chip make it a beast for performance!";
        if (query.includes('ps5') || query.includes('gaming')) return "The PS5 Slim is a huge favorite in Nigeria right now. We have several verified sellers in Ikeja and Abuja stocking them.";
        if (query.includes('compare')) return "I can help with that! Are we looking at Phones or Laptops today?";
        return "That's a great question. I'm still learning about all the gadgets on WeReview, but you can check our Trending section for the latest community picks!";
    };

    const suggestions = [
        "Compare iPhone vs Samsung",
        "Top gaming laptops?",
        "How to get verified?"
    ];

    return (
        <div className="fixed bottom-8 right-8 z-[300] font-sans">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-90 relative group ${isOpen ? 'bg-white text-dark rotate-90' : 'bg-primary text-white'
                    }`}
            >
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                {isOpen ? <X size={24} /> : <Sparkles size={28} className="animate-pulse" />}

                {/* Notification Badge */}
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-dark border-2 border-white rounded-full flex items-center justify-center animate-bounce">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    </div>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-full right-0 mb-4 w-[350px] md:w-[380px] h-[min(500px,70vh)] bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-zinc-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">

                    {/* Header */}
                    <div className="p-6 bg-dark text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                                <Bot size={24} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="font-black text-zinc-300 text-sm uppercase tracking-widest">WeReview AI</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-bold text-zinc-400">Online & Ready</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-primary text-white rounded-tr-none font-bold'
                                        : 'bg-zinc-100 text-dark rounded-tl-none font-medium'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Footer / Input */}
                    <div className="p-6 border-t border-zinc-100 bg-zinc-50/50">
                        {/* Suggestions */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {suggestions.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => handleSend(s)}
                                    className="px-3 py-1.5 bg-white border border-zinc-200 rounded-full text-[10px] font-black text-muted hover:border-primary hover:text-primary transition-all"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ask about gadgets..."
                                className="w-full pl-6 pr-14 py-4 bg-white border border-zinc-200 rounded-2xl text-sm font-bold text-dark outline-none focus:border-primary transition-all shadow-sm"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                            />
                            <button
                                onClick={() => handleSend(inputValue)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark text-white rounded-xl flex items-center justify-center hover:bg-primary transition-all"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAssistantWidget;
