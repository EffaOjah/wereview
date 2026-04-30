import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Chinedu Okeke',
    role: 'Tech Enthusiast',
    content: 'GadgetHub saved me from buying a fake phone. The verified sellers feature is exactly what we needed in Nigeria. Highly recommended!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=chinedu'
  },
  {
    id: 2,
    name: 'Amina Yusuf',
    role: 'Content Creator',
    content: 'The comparison tool is incredible. It made it so easy to choose between the different microphones for my podcast. Saved both time and money.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=amina'
  },
  {
    id: 3,
    name: 'Tobi Lawson',
    role: 'Gamer',
    content: 'Finding authentic gaming gear was always a hassle until I found this platform. The community reviews help make confident decisions.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=tobi'
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-100 text-zinc-900 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
            <Quote size={14} className="text-primary" /> Community Voices
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-tight mb-6">
            Trusted by <br /> <span className="text-primary">Smart Buyers.</span>
          </h2>
          <p className="text-muted font-medium text-lg leading-relaxed">
            Join thousands of users making better buying decisions every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-zinc-50 border border-zinc-100 p-8 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative group">
              <div className="absolute top-8 right-8 text-zinc-200 group-hover:text-primary/20 transition-colors">
                <Quote size={48} />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-dark font-medium text-lg leading-relaxed mb-8 relative z-10">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-zinc-200 pt-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover"
                />
                <div>
                  <h4 className="font-black text-dark text-sm">{testimonial.name}</h4>
                  <p className="text-xs font-bold text-zinc-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
