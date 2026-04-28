import React from 'react';
import type { BlogPost } from '../../types';
import { MessageSquare, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      
      {/* Blog Image & Date Badge */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <img 
          src={post.image || '/img/blog/pcs.jpg'} // Fallback if image doesn't load
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
        {/* Date overlay tag */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-white/20">
          <span className="block text-xs font-bold text-muted uppercase tracking-widest leading-none mb-1">Published</span>
          <span className="block text-sm font-black text-dark leading-none">{post.date}</span>
        </div>
      </div>

      {/* Blog Content */}
      <div className="flex flex-col flex-grow p-8">
        
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary mb-4">
          <span className="bg-orange-50 px-3 py-1 rounded-full">Tech News</span>
          <span className="flex items-center gap-1.5 ml-auto text-zinc-400 group-hover:text-primary transition-colors"><MessageSquare size={14} /> {post.commentCount}</span>
        </div>

        {/* Title */}
        <h5 className="font-black text-dark text-xl mb-4 leading-snug group-hover:text-primary transition-colors line-clamp-2">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h5>

        {/* Excerpt */}
        <p className="text-muted leading-relaxed mb-8 flex-grow line-clamp-3 font-medium">
          {post.excerpt}
        </p>

        {/* Action Button */}
        <div className="mt-auto pt-4 border-t border-zinc-100 border-dashed">
           <Link 
            to={`/blog/${post.id}`} 
            className="flex items-center justify-between text-sm text-dark font-black uppercase tracking-widest hover:text-primary transition-colors w-full"
          >
            Read Article
            <div className="w-8 h-8 rounded-full bg-zinc-50 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowUpRight size={16} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
