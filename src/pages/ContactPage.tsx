import React from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page bg-white">
      <Breadcrumb title="Contact Us" items={[{ name: 'Contact', path: '/contact' }]} />

      <section className="contact spad">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 mb-24">
            <div className="lg:w-1/4 flex flex-col items-center text-center p-12 bg-light group">
               <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all mb-6">
                  <Phone size={24} />
               </div>
               <h4 className="text-xl font-black text-dark mb-4">Phone</h4>
               <p className="text-sm text-muted font-bold">+234 800 000 0000</p>
            </div>
            <div className="lg:w-1/4 flex flex-col items-center text-center p-12 bg-light group">
               <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all mb-6">
                  <MapPin size={24} />
               </div>
               <h4 className="text-xl font-black text-dark mb-4">Address</h4>
               <p className="text-sm text-muted font-bold">60-49 Review Street, Lagos</p>
            </div>
            <div className="lg:w-1/4 flex flex-col items-center text-center p-12 bg-light group">
               <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all mb-6">
                  <Clock size={24} />
               </div>
               <h4 className="text-xl font-black text-dark mb-4">Open Time</h4>
               <p className="text-sm text-muted font-bold">10:00 am to 23:00 pm</p>
            </div>
            <div className="lg:w-1/4 flex flex-col items-center text-center p-12 bg-light group">
               <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all mb-6">
                  <Mail size={24} />
               </div>
               <h4 className="text-xl font-black text-dark mb-4">Email</h4>
               <p className="text-sm text-muted font-bold">support@reviewzone.com</p>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <div className="section-title">
               <h2 className="text-3xl lg:text-5xl font-black text-dark mb-4">Leave Message</h2>
            </div>

            <form className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
               <input type="text" placeholder="Your name" className="w-full px-6 py-4 border border-zinc-200 outline-none focus:border-primary text-sm font-bold bg-white shadow-sm" />
               <input type="email" placeholder="Your email" className="w-full px-6 py-4 border border-zinc-200 outline-none focus:border-primary text-sm font-bold bg-white shadow-sm" />
               <textarea placeholder="Your message" className="w-full px-6 py-4 border border-zinc-200 outline-none focus:border-primary text-sm font-bold bg-white shadow-sm md:col-span-2 min-h-[150px]"></textarea>
               <div className="md:col-span-2 text-center">
                  <button className="site-btn px-16 py-4 text-lg">Send Message</button>
               </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map Mock */}
      <div className="h-[400px] w-full bg-zinc-100 mt-24 relative flex items-center justify-center">
         <div className="absolute inset-0 grayscale opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Lagos,Nigeria&zoom=13&size=1200x400&sensor=false')] bg-cover"></div>
         <div className="relative z-10 bg-white p-8 shadow-2xl rounded-sm border-t-4 border-primary">
             <h5 className="font-black text-dark text-lg uppercase tracking-widest mb-2">Lagos Office</h5>
             <p className="text-sm text-muted font-bold">Main Headquarters Tech District</p>
         </div>
      </div>
    </div>
  );
};

export default ContactPage;
