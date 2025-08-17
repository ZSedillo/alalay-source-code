import { AlertCircle } from "lucide-react";

export default function PaymentError({ isOpen, onClose }) {
  if (!isOpen) return null; // only render when open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#F0EAD6] bg-opacity-95 z-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl border border-gray-200 p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-2 text-blue-600 font-semibold text-lg">
          <AlertCircle className="w-5 h-5" />
          <span>We couldn’t process your payment</span>
        </div>

        {/* Explanation */}
        <p className="text-gray-700">
          Your card was <span className="font-medium">declined by the bank</span>.
          Please check your card details or try a different payment method.
        </p>

        {/* Next steps */}
        <p className="text-gray-600 text-sm">
          If this continues, contact support. Don’t worry — your donations are saved.
        </p>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Contact Support
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
