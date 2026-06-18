"use client";
import { motion } from 'framer-motion';

const chefs = [
  {
    name: "Chef Gordon Raymond",
    role: "French Cuisine Expert",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400",
    experience: "12+ Years"
  },
  {
    name: "Ananya Iyer",
    role: "Traditional Pastry Queen",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=400",
    experience: "8 Years"
  },
  {
    name: "Marco Silva",
    role: "Italian Pasta Maestro",
    image: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&q=80&w=400",
    experience: "15 Years"
  }
];

export default function ExpertChefs() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Meet Our Master Chefs
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-lg mx-auto">
          Learn secret tips and world-class recipes from top culinary experts around the globe.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chefs.map((chef, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={chef.image} 
                  alt={chef.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{chef.name}</h3>
                <p className="text-orange-500 font-medium text-sm my-1">{chef.role}</p>
                <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs px-3 py-1 rounded-full font-semibold">
                  {chef.experience} Exp
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}