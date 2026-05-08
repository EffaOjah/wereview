import React, { useState, useEffect } from 'react';
import { ShieldCheck, XCircle, CheckCircle2, Clock, MapPin, Building2, ExternalLink, Mail, Search, SlidersHorizontal, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getApiUrl } from '../../utils/api';

const AdminSellersPage: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(getApiUrl('/api/admin/seller-requests'), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('gadgethub_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setRequests(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch seller requests.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id: string) => {
    if (!window.confirm('Are you sure you want to approve this seller?')) return;
    
    try {
      const response = await fetch(getApiUrl(`/api/admin/approve-seller/${id}`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('gadgethub_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setRequests(requests.filter(r => r.id !== id));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error approving seller');
    }
  };

  const handleReject = async (id: string) => {
    if (!window.confirm('Are you sure you want to reject and delete this request?')) return;
    
    try {
      const response = await fetch(getApiUrl(`/api/admin/reject-seller/${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('gadgethub_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setRequests(requests.filter(r => r.id !== id));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error rejecting seller');
    }
  };

  const filteredRequests = requests.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 lg:p-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900">Seller Requests</h1>
          </div>
          <p className="text-zinc-500 text-sm font-medium">Review and verify business applications for the GadgetHub network.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by business name or city..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl outline-none focus:border-primary transition-all font-medium text-sm"
            />
          </div>
          <button className="px-6 py-4 bg-white border border-zinc-200 rounded-2xl font-bold text-zinc-600 flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors">
            <SlidersHorizontal size={18} /> Filters
          </button>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-600">
            <AlertCircle size={24} />
            <p className="font-bold">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-zinc-400 font-bold">Loading requests...</p>
          </div>
        ) : filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredRequests.map((req) => (
              <div key={req.id} className="bg-white border border-zinc-200 rounded-[2.5rem] p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8 group hover:border-primary/30 transition-all">
                {/* Brand Identity */}
                <div className="flex flex-col items-center lg:items-start lg:flex-row gap-6 lg:w-1/3">
                  <div className="w-24 h-24 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex items-center justify-center p-4 shrink-0 overflow-hidden">
                    <img src={req.logo} alt="" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="text-center lg:text-left">
                    <h3 className="text-xl font-black text-zinc-900 mb-1">{req.name}</h3>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">Pending Verification</p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                       <span className="px-3 py-1.5 bg-zinc-50 rounded-lg text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-1.5 border border-zinc-100">
                          <Clock size={12} /> {new Date(req.memberSince).toLocaleDateString()}
                       </span>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full py-6 lg:py-0 lg:border-x border-zinc-100 lg:px-8">
                   <div className="space-y-4">
                      <div className="flex items-start gap-3">
                         <MapPin size={18} className="text-zinc-400 mt-0.5" />
                         <div>
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Location</p>
                            <p className="text-sm font-bold text-zinc-700 leading-tight">{req.location}, {req.city}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-3">
                         <Building2 size={18} className="text-zinc-400 mt-0.5" />
                         <div>
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Specialty</p>
                            <p className="text-sm font-bold text-zinc-700 leading-tight">{req.specialty}</p>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-start gap-3">
                         <Mail size={18} className="text-zinc-400 mt-0.5" />
                         <div>
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Contact Email</p>
                            <p className="text-sm font-bold text-zinc-700 leading-tight">{req.user?.email}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-3">
                         <ExternalLink size={18} className="text-zinc-400 mt-0.5" />
                         <div>
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Applicant Name</p>
                            <p className="text-sm font-bold text-zinc-700 leading-tight">{req.user?.name}</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Actions */}
                <div className="lg:w-1/5 flex flex-row lg:flex-col gap-3 w-full lg:w-auto">
                   <button 
                    onClick={() => handleApprove(req.id)}
                    className="flex-1 lg:w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                   >
                      <CheckCircle2 size={16} /> Approve
                   </button>
                   <button 
                    onClick={() => handleReject(req.id)}
                    className="flex-1 lg:w-full py-4 bg-zinc-100 text-zinc-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center gap-2"
                   >
                      <XCircle size={16} /> Reject
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-zinc-50 rounded-[3rem] border border-dashed border-zinc-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
               <ShieldCheck size={40} className="text-zinc-200" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 mb-2">Queue Clear!</h3>
            <p className="text-zinc-500 font-medium max-w-sm mx-auto">No pending seller applications to review at the moment.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSellersPage;
