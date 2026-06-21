"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 ব্যাকএন্ড (GET /recipes) থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/recipes");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        
        // অ্যাডমিন ফিচারড সেকশনের জন্য ফিল্টার বা লিমিট করতে পারো (আপাতত প্রথম ৩টি বা ৪টি দেখানো হচ্ছে)
        setRecipes(data.slice(0, 4)); 
      } catch (error) {
        console.error("Error loading recipes:", error);
        toast.error("Could not load featured recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* সেকশন হেডার */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Recipes
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Check out our most popular and delicious hand-picked recipes.
          </p>
        </div>

        {/* 🎴 রেসিপি কার্ড গ্রিড */}
        {recipes.length === 0 ? (
          <p className="text-center text-gray-500">No featured recipes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <div 
                key={recipe._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* রেসিপি ইমেজ */}
                <div className="h-48 w-full relative bg-gray-200">
                  <img
                    className="h-full w-full object-cover"
                    src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                    alt={recipe.name}
                  />
                  {/* ক্যাটাগরি ব্যাজ */}
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase">
                    {recipe.category}
                  </span>
                </div>

                {/* কার্ড কন্টেন্ট (ডাটা) */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    {/* কুইজিন টাইপ */}
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1">
                      {recipe.cuisineType || "Universal"} Cuisine
                    </span>
                    
                    {/* রেসিপির নাম */}
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 hover:text-orange-500 transition-colors">
                      {recipe.name}
                    </h3>
                  </div>

                  {/* প্রিপারেশন টাইম সেকশন */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      {/* ক্লক আইকন */}
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Prep Time:</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {recipe.prepTime ? `${recipe.prepTime} mins` : "N/A"}
                    </span>
                  </div>
                  <Link 
        href={`/recipes/${recipe._id}`} // 👈 আইডি অনুযায়ী সিঙ্গেল পেজের ডাইনামিক লিংক
        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 text-center shadow-sm"
      >
        View Details
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedRecipes;