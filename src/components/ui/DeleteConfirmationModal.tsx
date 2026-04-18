import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] p-4 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-dark/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 pb-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle size={32} />
          </div>
          <h3 className="text-2xl font-black text-dark mb-2">{title}</h3>
          <p className="text-muted font-medium text-sm">
            Are you sure you want to delete your review for <span className="text-dark font-black">"{itemName}"</span>? This action cannot be undone.
          </p>
        </div>

        <div className="p-8 pt-6 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-3.5 rounded-xl font-bold text-dark bg-zinc-100 hover:bg-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-6 py-3.5 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all active:scale-95"
          >
            Delete Review
          </button>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-dark transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
