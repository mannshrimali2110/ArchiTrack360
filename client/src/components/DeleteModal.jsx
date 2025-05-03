import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div className="relative bg-white rounded-lg p-6 w-96 shadow-xl">
        <div className="text-center">
          <div className="mb-4 text-5xl">🗑️</div>
          <h3 className="mb-5 text-lg font-normal text-gray-700">
            Are you sure you want to delete this {itemName}?
          </h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Yes, delete it
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;