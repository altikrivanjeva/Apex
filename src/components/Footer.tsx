// Footer.tsx
import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full bg-[#181c24] text-center py-6">
    <div className="text-white text-base font-bold tracking-wide" style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>
      © {new Date().getFullYear()} Apex Supplements
    </div>
    <div className="mt-2 text-white text-lg font-bold tracking-wide" style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>
      Thank you for visiting Apex! Good luck on your fitness journey and remember: <span className="text-orange-400">#StrongerEveryDay</span>
    </div>
  </footer>
);

export default Footer;
