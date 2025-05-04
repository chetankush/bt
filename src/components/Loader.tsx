import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-12 h-12 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader; 