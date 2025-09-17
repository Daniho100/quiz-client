import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-10">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Quiz App. All rights reserved.</p>
        <p>
          <a
            href="/about"
            className="text-blue-400 hover:underline"
          >
            About
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
