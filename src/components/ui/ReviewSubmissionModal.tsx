import React, { useState, useEffect } from 'react';
import { X, Star, Plus, Minus } from 'lucide-react';

interface ReviewSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  GadgetName: string;
  initialData?: {
    rating: number;
    title: string;
    comment: string;
    pros: string[];
    cons: string[];
  };
  onSubmit?: (data: any) => void;
}

const ReviewSubmissionModal: React.FC<ReviewSubmissionModalProps> = ({ isOpen, onClose, GadgetName, initialData, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  
  const [pros, setPros] = useState<string[]>(['']);
  const [cons, setCons] = useState<string[]>(['']);

  useEffect(() => {
    if (initialData && isOpen) {
      setRating(initialData.rating);
      setTitle(initialData.title);
      setComment(initialData.comment);
      setPros(initialData.pros.length > 0 ? initialData.pros : ['']);
      setCons(initialData.cons.length > 0 ? initialData.cons : ['']);
    } else if (!initialData && isOpen) {
      // Reset for new review
      setRating(0);
      setTitle('');
      setComment('');
      setPros(['']);
      setCons(['']);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleDynamicList = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
  };

  const addField = (setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList(prev => [...prev, '']);
  };

  const removeField = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    if (list.length > 1) {
      setList(list.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] p-4 sm:p-6 flex items-center justify-center overflow-y-auto w-full h-full">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-dark/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-10 flex flex-col my-auto max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 flex-shrink-0">
          <div>
            <h3 className="text-xl font-black text-dark tracking-tight">
              {initialData ? 'Edit Your Review' : 'Write a Review'}
            </h3>
            <p className="text-sm font-bold text-muted mb-0">{GadgetName}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 text-dark hover:bg-red-100 hover:text-red-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-8">
          
          {/* Rating */}
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-dark mb-3">Overall Rating *</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <Star 
                    size={40} 
                    className={`${(hoveredRating || rating) >= star ? 'fill-primary text-primary' : 'fill-zinc-100 text-zinc-300'} transition-colors`}
                  />
                </button>
              ))}
            </div>
            {rating === 0 && <span className="text-xs text-red-500 font-bold mt-2">Required</span>}
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-dark mb-2">Review Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Best battery phone right now!" 
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark mb-2">Your Review *</label>
              <textarea 
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like or dislike? How's the performance in Nigeria?" 
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium resize-none"
              ></textarea>
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-zinc-50 rounded-xl border border-zinc-100">
            {/* Pros */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-emerald-600 mb-3">
                <Plus size={16} /> Pros (Optional)
              </label>
              <div className="flex flex-col gap-3">
                {pros.map((pro, index) => (
                  <div key={`pro-${index}`} className="flex gap-2">
                    <input 
                      type="text" 
                      value={pro}
                      onChange={(e) => handleDynamicList(pros, setPros, index, e.target.value)}
                      placeholder="e.g., Great camera" 
                      className="w-full px-3 py-2 text-sm bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                    {pros.length > 1 && (
                      <button onClick={() => removeField(pros, setPros, index)} className="p-2 text-zinc-400 hover:text-red-500"><X size={16}/></button>
                    )}
                  </div>
                ))}
                <button onClick={() => addField(setPros)} className="text-xs font-bold text-emerald-600 self-start hover:underline">+ Add Pro</button>
              </div>
            </div>

            {/* Cons */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-red-600 mb-3">
                <Minus size={16} /> Cons (Optional)
              </label>
               <div className="flex flex-col gap-3">
                {cons.map((con, index) => (
                  <div key={`con-${index}`} className="flex gap-2">
                    <input 
                      type="text" 
                      value={con}
                      onChange={(e) => handleDynamicList(cons, setCons, index, e.target.value)}
                      placeholder="e.g., Heats up quickly" 
                      className="w-full px-3 py-2 text-sm bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-red-500"
                    />
                    {cons.length > 1 && (
                      <button onClick={() => removeField(cons, setCons, index)} className="p-2 text-zinc-400 hover:text-red-500"><X size={16}/></button>
                    )}
                  </div>
                ))}
                <button onClick={() => addField(setCons)} className="text-xs font-bold text-red-600 self-start hover:underline">+ Add Con</button>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="text-xs font-bold text-muted bg-blue-50 text-blue-800 p-4 rounded-lg">
            By submitting this review, you confirm that this is your genuine experience with the Gadget. Fake or spam reviews will be removed.
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-zinc-100 flex justify-end gap-4 flex-shrink-0 bg-white">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg font-bold text-dark hover:bg-zinc-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            disabled={rating === 0 || !comment.trim()}
            onClick={() => onSubmit?.({ rating, title, comment, pros: pros.filter(p => p.trim()), cons: cons.filter(c => c.trim()) })}
            className="px-8 py-2.5 rounded-lg font-bold bg-primary text-white hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-primary/30"
          >
            {initialData ? 'Update Review' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmissionModal;
