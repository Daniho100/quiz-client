import React from "react";
import img1 from '../assets/math.jpg'
import img2 from '../assets/explore.jpg'
import img3 from '../assets/innovate.jpg'

const images = [
  img1, img2, img3
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="flex-grow container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">About Quiz App</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto text-center mb-10">
          Quiz App is a fun and interactive platform where children can test their knowledge across various topics.
          Our mission is to support their growth and development through engaging brain-stimulating activities that challenge and motivate them.
        </p>

        {/* Images Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-xl shadow-lg">
              <img src={src} alt={`Children solving quiz ${index + 1}`} className="w-full h-56 object-cover" />
            </div>
          ))}
        </div>

        {/* Why We Help Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Why We Help</h2>
          <p className="text-gray-600 text-lg mb-4">
            Engaging in quizzes and brain games helps children enhance their memory, problem-solving skills, and critical thinking.
            By making learning fun, we encourage curiosity and a love for knowledge.
          </p>
          <p className="text-gray-600 text-lg">
            Our carefully designed activities aim to stimulate cognitive growth, build confidence, and develop lifelong learning habits in children.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
