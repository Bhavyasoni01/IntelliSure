import React from 'react';

const ClaimsSubmitted = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Tick */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Claim Submitted Text */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Claim Submitted Successfully!
        </h1>
        <p className="text-gray-600">
          Your claim has been submitted. We will review it and get back to you shortly.
        </p>

        {/* Back to Dashboard Button */}
        <button
          onClick={() => (window.location.href = '/dashboard')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ClaimsSubmitted;