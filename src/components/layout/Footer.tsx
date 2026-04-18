import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-light pt-24 pb-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Branding */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-dark tracking-wide">REVIEWS ZONE</h2>
            <ul className="text-muted text-sm flex flex-col gap-3">
              <li>Address: 60-49 Review Street, Lagos</li>
              <li>Phone: +234 800 000 0000</li>
              <li>Email: support@reviewzone.com</li>
            </ul>
          </div>

          {/* Useful Links 1 */}
          <div className="flex flex-col gap-6 lg:ml-12">
            <h6 className="font-bold text-lg text-dark">Quick Links</h6>
            <ul className="text-sm flex flex-col gap-3">
              <li><Link to="/about" className="text-muted hover:text-primary transition-colors">About Review Zone</Link></li>
              <li><Link to="/how-it-works" className="text-muted hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/terms" className="text-muted hover:text-primary transition-colors">Terms & Privacy</Link></li>
              <li><Link to="/reviews" className="text-muted hover:text-primary transition-colors">Top Rated Products</Link></li>
              <li><Link to="/blog" className="text-muted hover:text-primary transition-colors">Latest Reviews</Link></li>
            </ul>
          </div>

          {/* Useful Links 2 */}
          <div className="flex flex-col gap-6 pt-11">
             <ul className="text-sm flex flex-col gap-3">
              <li><Link to="/mission" className="text-muted hover:text-primary transition-colors">Our Mission</Link></li>
              <li><Link to="/become-reviewer" className="text-muted hover:text-primary transition-colors">Become a Reviewer</Link></li>
              <li><Link to="/partner" className="text-muted hover:text-primary transition-colors">Partner with Us</Link></li>
              <li><Link to="/faqs" className="text-muted hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-muted hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/community" className="text-muted hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h6 className="font-bold text-lg text-dark">Stay Updated</h6>
            <p className="text-sm text-muted">Join our newsletter to get the hottest reviews and tech drops in your inbox.</p>
            <form className="flex mt-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white px-4 py-2 border flex-grow focus:border-primary outline-none text-sm" 
              />
              <button type="submit" className="site-btn px-4 text-xs font-bold bg-primary hover:bg-primary-dark transition-colors">
                Subscribe
              </button>
            </form>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all shadow-sm border border-zinc-100">
                <span className="sr-only">Facebook</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all shadow-sm border border-zinc-100">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all shadow-sm border border-zinc-100">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted mb-0">&copy; {new Date().getFullYear()} Review Zone. All rights reserved.</p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-xs font-bold text-muted px-3 py-1.5 bg-white rounded-full border border-zinc-200">🔒 Safe & Trusted</span>
            <span className="text-xs font-bold text-muted px-3 py-1.5 bg-white rounded-full border border-zinc-200">✅ Verified Reviews</span>
            <span className="text-xs font-bold text-muted px-3 py-1.5 bg-white rounded-full border border-zinc-200">🇳🇬 Made for Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
