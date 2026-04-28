import React from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { gadgets } from '../data/gadgets';
import { X, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  return (
    <div className="cart-page bg-white">
      <Breadcrumb title="Shopping Cart" items={[{ name: 'Shop', path: '/gadgets' }, { name: 'Cart', path: '/cart' }]} />

      <section className="shoping-cart spad">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Table Area */}
            <div className="lg:w-2/3">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="border-b-2 border-zinc-100">
                           <th className="pb-6 text-2xl font-black text-dark uppercase tracking-tighter">Gadgets</th>
                           <th className="pb-6 text-2xl font-black text-dark uppercase tracking-tighter">Price</th>
                           <th className="pb-6 text-2xl font-black text-dark uppercase tracking-tighter">Quantity</th>
                           <th className="pb-6 text-2xl font-black text-dark uppercase tracking-tighter">Total</th>
                           <th className="pb-6"></th>
                        </tr>
                     </thead>
                     <tbody>
                        {gadgets.slice(0, 2).map((item) => (
                           <tr key={item.id} className="border-b border-zinc-100 group">
                              <td className="py-8">
                                 <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 bg-light p-2 border rounded-sm">
                                       <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>
                                    <h5 className="font-bold text-dark text-lg group-hover:text-primary transition-colors">{item.name}</h5>
                                 </div>
                              </td>
                              <td className="py-8 font-extrabold text-dark tracking-widest">${item.price}</td>
                              <td className="py-8">
                                 <div className="flex items-center w-max border border-zinc-200 rounded-sm">
                                    <button className="px-4 py-2 hover:bg-zinc-100 transition-colors"><Minus size={14} /></button>
                                    <input type="text" value="1" className="w-12 text-center font-bold text-dark border-x border-zinc-200 py-2 outline-none" readOnly />
                                    <button className="px-4 py-2 hover:bg-zinc-100 transition-colors"><Plus size={14} /></button>
                                 </div>
                              </td>
                              <td className="py-8 font-extrabold text-dark tracking-widest">${item.price}</td>
                              <td className="py-8 text-right">
                                 <button className="p-2 text-muted hover:text-red-500 transition-colors"><X size={20} /></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-12">
                  <Link to="/gadgets" className="bg-light px-8 py-3 font-extrabold uppercase tracking-widest text-dark hover:bg-primary hover:text-white transition-all text-sm">Continue Shopping</Link>
                  <button className="bg-light px-8 py-3 font-extrabold uppercase tracking-widest text-dark hover:bg-primary hover:text-white transition-all text-sm">Update Cart</button>
               </div>
            </div>

            {/* Summary Area */}
            <div className="lg:w-1/3">
               <div className="bg-[#f9f8f8] p-8 border border-zinc-100 rounded-sm">
                  <h4 className="text-2xl font-black text-dark mb-8 uppercase tracking-tighter border-b pb-4">Cart Total</h4>
                  <ul className="flex flex-col gap-6 font-bold text-dark uppercase tracking-widest mb-10">
                     <li className="flex justify-between border-b border-white pb-6">
                        <span>Subtotal</span>
                        <span className="text-primary">$475.00</span>
                     </li>
                     <li className="flex justify-between">
                        <span>Total</span>
                        <span className="text-primary text-xl">$475.00</span>
                     </li>
                  </ul>
                  <button className="primary-btn w-full py-4 text-center text-lg">Proceed to Checkout</button>
               </div>

               <div className="mt-8">
                   <h6 className="font-black text-dark uppercase tracking-widest mb-4">Discount Codes</h6>
                   <div className="flex">
                       <input type="text" placeholder="Enter coupon" className="flex-grow border border-zinc-200 px-4 py-3 outline-none focus:border-primary text-sm font-medium" />
                       <button className="bg-dark text-white px-6 py-3 font-black uppercase text-xs tracking-widest hover:bg-zinc-800 transition-colors">Apply</button>
                   </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
