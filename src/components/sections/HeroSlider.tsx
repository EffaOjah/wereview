import { Link } from 'react-router-dom';
import SearchBar from '../layout/SearchBar';

const HeroSlider: React.FC = () => {
  return (
    <section className="hero pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">

          {/* Top Row: Search Bar */}
          <div className="w-full max-w-4xl mx-auto">
            <SearchBar />
          </div>

          {/* Bottom Row: Static Hero Content */}
          <div className="w-full relative bg-zinc-50 overflow-hidden rounded-[2.5rem] border border-zinc-100">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center min-h-[450px] lg:min-h-[500px] py-12 px-8 md:px-16 lg:px-24 gap-12 relative z-10">

              {/* Text Section */}
              <div className="md:w-3/5 flex flex-col items-start gap-6">
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px]">
                  Nigeria's #1 Gadget Deal Finder
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-dark leading-[1.1] tracking-tight">
                  Find The Best <br />
                  <span className="text-primary">Gadgets In Nigeria.</span>
                </h1>
                <p className="text-zinc-500 font-medium text-lg lg:text-xl max-w-xl leading-relaxed">
                  Compare prices, read reviews, and discover trusted sellers near you.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mt-4">
                  <Link
                    to="/compare"
                    className="px-10 py-5 bg-primary hover:bg-primary-hover text-white font-black text-sm rounded-2xl transition-all shadow-2xl shadow-primary/30 hover:-translate-y-1 uppercase tracking-widest flex items-center gap-2"
                  >
                    Compare Gadgets
                  </Link>
                  <Link
                    to="/gadgets"
                    className="px-10 py-5 bg-white border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white font-black text-sm rounded-2xl transition-all hover:-translate-y-1 uppercase tracking-widest"
                  >
                    View Today's Deals
                  </Link>
                </div>

                {/* Trust Badge */}
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-zinc-100 w-full">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-bold text-zinc-400">
                    <span className="text-dark">15k+ Nigerians</span> using GadgetHub
                  </p>
                </div>
              </div>

              {/* Image Section */}
              <div className="md:w-2/5 flex justify-center items-center">
                <div className="relative">
                  {/* Decorative Glow */}
                  <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-150 animate-pulse" />
                  <img
                    src="/img/hero/hero-image.jpg"
                    alt="Tech Deals NG"
                    className="relative z-10 w-full max-w-[500px] h-auto object-contain rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;

