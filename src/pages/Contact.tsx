import React from "react";
import { motion } from "framer-motion";

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="flex-grow flex items-center justify-center px-6 py-20">
        <motion.form
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Contact Us
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactUs;
