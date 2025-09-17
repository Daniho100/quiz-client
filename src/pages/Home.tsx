import React from "react";
import { motion } from "framer-motion";
import img1 from '../assets/pop.jpg'
import img2 from '../assets/time.jpg'
import img3 from '../assets/logo.jpg'
import { Link } from "react-router-dom";

// Example carousel images
const carouselImages = [
  img1, img2, img3
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Hero Section */}
      <motion.div
        className="flex-grow container mx-auto px-6 py-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6 text-gray-800">
          Welcome to Quiz App
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          Test your knowledge, challenge yourself, and have fun learning with interactive quizzes designed for kids and young learners!
        </p>
        <Link to='/auth'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold"
        >
          Get Started
        </motion.button>
        </Link>
      </motion.div>

      {/* Carousel Section */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <motion.div
              className="flex space-x-4"
              animate={{ x: ["0%", "-100%", "-200%", "0%"] }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            >
              {carouselImages.map((src, idx) => (
                <div key={idx} className="flex-shrink-0 w-full">
                  <img
                    src={src}
                    alt={`carousel ${idx + 1}`}
                    className="w-full h-[600px] object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[
          { title: "Interactive Quizzes", description: "Fun and engaging quizzes that make learning enjoyable." },
          { title: "Brain Stimulation", description: "Develop critical thinking, memory, and problem-solving skills." },
          { title: "Track Progress", description: "Monitor growth and celebrate learning milestones." },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-lg"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { delay: idx * 0.3 } },
            }}
          >
            <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
