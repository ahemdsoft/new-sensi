import { X } from "lucide-react";

interface SuccessPopupProps {
  onClose: () => void;
}

export default function SuccessPopup({ onClose }: SuccessPopupProps) {
  return (
    <div className="fixed inset-0  bg-opacity-95 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-[510px] h-[328px] rounded-xl shadow-lg p-6 relative text-center flex flex-col justify-center items-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X />
        </button>
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
          🎉
        </div>
        <h2 className="text-xl font-semibold mb-2">Your message has been sent!</h2>
        <p className="text-gray-600 mb-6">We will get back to you soon.</p>
        <div className="flex gap-4">
          <button onClick={onClose} className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-100">Undo</button>
          <button onClick={onClose} className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">Thanks!</button>
        </div>
      </div>
    </div>
  );
}
