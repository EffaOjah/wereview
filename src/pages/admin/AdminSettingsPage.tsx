import React, { useState, useEffect } from 'react';
import { Save, Globe, Layout, Shield, Search, Check, Loader2, Info } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface SiteSettings {
  siteName: string;
  contactEmail: string;
  maintenanceMode: boolean;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  metaTitle: string;
  metaDescription: string;
  featuredProductIds: string[];
}

const defaultSettings: SiteSettings = {
  siteName: 'WeReview',
  contactEmail: 'hello@wereview.com',
  maintenanceMode: false,
  heroTitle: 'Genuine Product Reviews For Smart Shoppers',
  heroSubtitle: 'Helping you make the right choice with authentic reviews from the Nigerian community.',
  heroCtaText: 'Explore Reviews',
  metaTitle: 'WeReview - Honest Product Reviews in Nigeria',
  metaDescription: 'Find authentic reviews for gadgets, laptops, and more. Compare prices across Jumia, Konga, and Slot.',
  featuredProductIds: ['1', '4', '5'],
};

const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'seo'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('wereview_settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('wereview_settings', JSON.stringify(settings));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'hero', label: 'Homepage Hero', icon: Layout },
    { id: 'seo', label: 'SEO & Metadata', icon: Search },
  ];

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 lg:p-12 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 mb-1">Site Settings</h1>
            <p className="text-zinc-500 text-sm font-medium">Control global platform behavior and visual content.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-zinc-900 text-white font-black text-sm rounded-2xl hover:bg-black transition-all shadow-xl shadow-zinc-900/10 shrink-0 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Save Changes</>}
          </button>
        </div>

        {showSuccess && (
          <div className="mb-8 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
             <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                <Check size={16} />
             </div>
             <p className="text-sm font-bold text-green-700">Settings updated successfully! Changes are now live.</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Navigation */}
          <aside className="lg:w-64 shrink-0">
             <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all shrink-0 ${
                      activeTab === tab.id 
                      ? 'bg-white border border-zinc-200 text-zinc-900 shadow-sm' 
                      : 'text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
             </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 space-y-10">
            
            {activeTab === 'general' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <section className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-10">
                   <h3 className="text-sm font-black text-zinc-900 mb-6 flex items-center gap-2">
                     <Globe size={18} className="text-primary" />
                     Basic Platform Information
                   </h3>
                   <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-zinc-500 ml-1">Site Display Name</label>
                          <input 
                            type="text" 
                            value={settings.siteName}
                            onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                            className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-zinc-500 ml-1">Contact Support Email</label>
                          <input 
                            type="email" 
                            value={settings.contactEmail}
                            onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                            className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-bold"
                          />
                        </div>
                      </div>
                   </div>
                </section>

                <section className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-10">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${settings.maintenanceMode ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                           <Shield size={24} />
                        </div>
                        <div>
                           <h3 className="text-sm font-black text-zinc-900">Maintenance Mode</h3>
                           <p className="text-xs font-medium text-zinc-400 mt-0.5">Offline for public users during updates.</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                        className={`w-14 h-8 rounded-full transition-all relative ${settings.maintenanceMode ? 'bg-red-500' : 'bg-zinc-200'}`}
                      >
                         <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.maintenanceMode ? 'right-1' : 'left-1'}`} />
                      </button>
                   </div>
                </section>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <section className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-10">
                   <h3 className="text-sm font-black text-zinc-900 mb-8 flex items-center gap-2">
                     <Layout size={18} className="text-primary" />
                     Homepage Hero Section
                   </h3>
                   <div className="space-y-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-zinc-500 ml-1">Main Heading</label>
                        <input 
                          type="text" 
                          value={settings.heroTitle}
                          onChange={(e) => setSettings({...settings, heroTitle: e.target.value})}
                          className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-bold"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-zinc-500 ml-1">Sub-heading Description</label>
                        <textarea 
                          rows={3}
                          value={settings.heroSubtitle}
                          onChange={(e) => setSettings({...settings, heroSubtitle: e.target.value})}
                          className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium leading-relaxed"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-zinc-500 ml-1">Primary CTA Button</label>
                            <input 
                              type="text" 
                              value={settings.heroCtaText}
                              onChange={(e) => setSettings({...settings, heroCtaText: e.target.value})}
                              className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-bold"
                            />
                         </div>
                      </div>
                   </div>
                </section>

                <div className="bg-zinc-900 rounded-[2rem] p-8 text-white">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">Real-time Preview</p>
                   <div className="max-w-md">
                      <h4 className="text-2xl font-black mb-3">{settings.heroTitle}</h4>
                      <p className="text-sm text-zinc-400 font-medium leading-relaxed mb-6">{settings.heroSubtitle}</p>
                      <button className="px-6 py-2.5 bg-primary text-zinc-900 font-black text-xs rounded-full uppercase tracking-widest">
                         {settings.heroCtaText}
                      </button>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <section className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-10">
                   <h3 className="text-sm font-black text-zinc-900 mb-8 flex items-center gap-2">
                     <Search size={18} className="text-primary" />
                     Search Engine Optimization
                   </h3>
                   <div className="space-y-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-zinc-500 ml-1">Browser Title (Meta Title)</label>
                        <input 
                          type="text" 
                          value={settings.metaTitle}
                          onChange={(e) => setSettings({...settings, metaTitle: e.target.value})}
                          className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-bold"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-zinc-500 ml-1">Meta Description</label>
                        <textarea 
                          rows={4}
                          value={settings.metaDescription}
                          onChange={(e) => setSettings({...settings, metaDescription: e.target.value})}
                          className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium leading-relaxed"
                        />
                      </div>
                   </div>
                </section>

                <div className="p-6 bg-zinc-50 border border-dashed border-zinc-200 rounded-2xl">
                   <div className="flex items-start gap-3">
                      <Info size={18} className="text-zinc-400 mt-1" />
                      <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                        Search engine results may take several days to update after saving these changes. Ensure your title includes primary keywords for better visibility.
                      </p>
                   </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
