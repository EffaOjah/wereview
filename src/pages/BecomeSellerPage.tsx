import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Image as ImageIcon, 
  MapPin, 
  Tag, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Store,
  Rocket
} from 'lucide-react';
import { useAuthModal } from '../context/AuthModalContext';
import { getApiUrl } from '../utils/api';
import Breadcrumb from '../components/ui/Breadcrumb';

const BecomeSellerPage: React.FC = () => {
  const { user, openModal } = useAuthModal();
  const navigate = useNavigate();
  
  // Form State
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [specialty, setSpecialty] = useState('');
  
  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openModal('login');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(getApiUrl('/api/sellers/register'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('gadgethub_token')}`
        },
        body: JSON.stringify({ name, logo, location, city, specialty })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(data.message || 'Failed to submit registration. Please try again.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50/30 py-20 px-4">
        <div className="max-w-xl w-full bg-white rounded-[40px] p-12 shadow-2xl shadow-emerald-500/10 border border-emerald-100 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-dark mb-4 leading-tight">Application Received!</h2>
          <p className="text-muted font-medium mb-10 leading-relaxed">
            Thank you for applying to be a verified seller on GadgetHub. Our team will review your details and get back to you within 24-48 hours.
          </p>
          <button 
            onClick={() => navigate('/sellers')}
            className="w-full py-4 bg-dark text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl"
          >
            Back to Sellers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="become-seller-page bg-zinc-50/30 pb-24">
      {/* Hero Section */}
      <div className="bg-zinc-900 pt-16 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="container relative z-10">
          <Breadcrumb 
            title="Become a Seller" 
            items={[{ name: 'Sellers', path: '/sellers' }, { name: 'Become a Seller', path: '/become-seller' }]} 
          />
          <div className="mt-12 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[3px] mb-6">
              <Rocket size={14} /> Scale Your Business
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-8">
              Sell to Nigeria's <br />
              <span className="text-primary">Tech Community.</span>
            </h1>
            <p className="text-zinc-400 font-medium text-lg leading-relaxed max-w-2xl">
              Join Nigeria's most trusted gadget comparison platform. Gain visibility, build trust with verified badges, and connect with serious buyers.
            </p>
          </div>
        </div>
      </div>

      <div className="container -mt-16 relative z-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Form */}
          <div className="flex-1">
            <div className="bg-white rounded-[40px] shadow-2xl shadow-zinc-200/50 border border-zinc-100 p-8 md:p-12">
              <div className="mb-10">
                <h2 className="text-2xl font-black text-dark mb-2">Business Information</h2>
                <p className="text-muted text-sm font-medium">Please provide accurate details about your physical store or online presence.</p>
              </div>

              {error && (
                <div className="flex items-start gap-3 w-full p-5 mb-8 bg-red-50 border border-red-200 text-red-600 rounded-2xl animate-in shake duration-500">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm font-bold leading-tight">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Business Name */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-dark uppercase tracking-widest ml-1">Business Name</label>
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Slot Systems" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:bg-white focus:border-primary/50 transition-all font-medium text-dark"
                      />
                    </div>
                  </div>

                  {/* Specialty */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-dark uppercase tracking-widest ml-1">Core Specialty</label>
                    <div className="relative group">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Premium Laptops" 
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:bg-white focus:border-primary/50 transition-all font-medium text-dark"
                      />
                    </div>
                  </div>
                </div>

                {/* Logo URL */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black text-dark uppercase tracking-widest ml-1">Logo Image URL</label>
                  <div className="relative group">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="url" 
                      required
                      placeholder="https://yourwebsite.com/logo.png" 
                      value={logo}
                      onChange={(e) => setLogo(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:bg-white focus:border-primary/50 transition-all font-medium text-dark"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Physical Address */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-dark uppercase tracking-widest ml-1">Store Address</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="123 Computer Village" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:bg-white focus:border-primary/50 transition-all font-medium text-dark"
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-dark uppercase tracking-widest ml-1">City / State</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="Ikeja, Lagos" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:bg-white focus:border-primary/50 transition-all font-medium text-dark"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-dark border-2 border-primary transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Registration <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="mt-6 text-center text-[10px] font-bold text-muted uppercase tracking-[2px]">
                    By submitting, you agree to our <span className="text-primary cursor-pointer hover:underline">Seller Terms of Service</span>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Side Info Cards */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-lg font-black text-dark mb-3">Why sell on GadgetHub?</h4>
              <ul className="space-y-4">
                {[
                  'Access to 50,000+ monthly tech buyers',
                  'Boost trust with a "Verified" badge',
                  'Real-time price comparison metrics',
                  'Direct store leads via phone & web'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm font-medium text-muted leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-dark rounded-3xl p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
               <Store size={40} className="text-primary mb-6" />
               <h4 className="text-xl font-black mb-3">Ready to go?</h4>
               <p className="text-zinc-400 text-sm font-medium mb-0">
                 Our verification team reviews every application to maintain platform quality. Prepare high-resolution photos of your store!
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BecomeSellerPage;
