import React from 'react';
import { blogPosts } from '../../data/gadgets';
import BlogCard from '../ui/BlogCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BlogSection: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-50 border-t border-zinc-100">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest rounded-full mb-4">
              Latest News & Reviews
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-dark tracking-tight">Expert Buying Guides</h2>
            <p className="text-muted text-lg mt-4 mb-0">Clear, practical insights to help you choose the right product the first time.</p>
          </div>
          
          <Link 
            to="/blog" 
            className="group flex items-center gap-2 bg-white border border-zinc-200 px-6 py-3 rounded-xl font-bold text-dark hover:border-primary hover:text-primary transition-all shadow-sm shrink-0"
          >
            View All Articles 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default BlogSection;
