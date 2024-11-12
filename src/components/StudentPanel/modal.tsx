import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-100 dark:bg-[#1F1F1F] relative shadow-black rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">خروج از حساب</h2>
        <p className="text-gray-700 dark:text-gray-300">آیا از خروج از حساب خود مطمئن هستید؟</p>
        <div className="mt-4 gap-5 flex justify-end">
          <button
            className="bg-gray-300 text-center content-center items-center dark:bg-gray-600 h-10 text-gray-700 dark:text-gray-200 w-20 rounded-md mr-2 transition-colors duration-200 hover:bg-gray-400"
            onClick={onClose}
          >
            نه
          </button>
          <button
            className="bg-red-500 text-center content-center items-center text-white rounded-md w-20 h-10 transition-colors duration-200 hover:bg-red-600"
            onClick={onConfirm}
          >
            بله
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;