import React, { useState } from 'react';
import { X, ShieldCheck, Store, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';

interface SellerVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SellerVerificationModal: React.FC<SellerVerificationModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [formData, setFormData] = useState({
        storeName: '',
        location: '',
        specialty: 'Mobile Phones',
        phone: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('success');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-100 transition-colors z-10"
                >
                    <X size={20} className="text-muted" />
                </button>

                {step === 'form' ? (
                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[3px] text-[10px] mb-6">
                            <ShieldCheck size={16} /> Partner Program
                        </div>
                        <h2 className="text-3xl font-black text-dark tracking-tight mb-2">Get Verified.</h2>
                        <p className="text-muted font-medium mb-10">Join Nigeria's most trusted tech community. Tell us about your shop.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Official Store Name</label>
                                <div className="relative">
                                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="e.g. Slot Systems"
                                        className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all"
                                        value={formData.storeName}
                                        onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Store Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="e.g. Ikeja, Lagos"
                                        className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all"
                                        value={formData.location}
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Store Specialty</label>
                                    <select 
                                        className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all appearance-none"
                                        value={formData.specialty}
                                        onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                                    >
                                        <option>Mobile Phones</option>
                                        <option>Laptops & PCs</option>
                                        <option>Gaming & Consoles</option>
                                        <option>Audio & Gadgets</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                        <input 
                                            required
                                            type="tel" 
                                            placeholder="+234..."
                                            className="w-full pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full py-5 bg-dark text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-3 mt-4"
                            >
                                <Send size={18} /> Submit Application
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="p-12 text-center flex flex-col items-center">
                        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-dark tracking-tight mb-4">Application Sent!</h2>
                        <p className="text-muted font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                            Our verification team will review your shop's details and contact you within <span className="text-dark font-bold">48 hours</span> to finalize the process.
                        </p>
                        <button 
                            onClick={onClose}
                            className="px-10 py-4 bg-dark text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary transition-all"
                        >
                            Got it, Thanks!
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerVerificationModal;
