"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const AllRecipesPage = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/all-recipes");
        if (!response.ok) throw new Error("Failed to fetch all recipes");
        
        const data = await response.json();
        setAllRecipes(data); 
      } catch (error) {
        console.error("Error:", error);
        toast.error("Could not load all recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* পেজ হেডার ও মোট রেসিপি সংখ্যা */}
        <div className="border-b border-gray-200 pb-5 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Delicious Recipes</h1>
            <p className="mt-2 text-sm text-gray-500">Explore our entire collection of amazing recipes.</p>
          </div>
          <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1.5 rounded-full">
            Total: {allRecipes.length} Recipes
          </span>
        </div>

        {/* 🎴 সব রেসিপির কার্ড গ্রিড (এখানে কোনো ৪টির লিমিট নেই) */}
        {allRecipes.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No recipes found in the database.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allRecipes.map((recipe) => (
              <div 
                key={recipe._id} 
                className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* ইমেজ */}
                <div className="h-44 w-full relative bg-gray-200">
                  <img
                    className="h-full w-full object-cover"
                    src={recipe.recipeImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                    alt={recipe.recipeName}
                  />
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {recipe.category}
                  </span>
                </div>

                {/* কন্টেন্ট */}
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">
                      {recipe.cuisineType || "Universal"} Cuisine
                    </span>
                    <h3 className="text-base font-bold text-gray-800 line-clamp-1">
                      {recipe.recipeName}
                    </h3>
                  </div>

                  {/* টাইম এবং ডিফিকাল্টি লেভেল */}
                  <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                       {recipe.preparationTime ? `${recipe.preparationTime}m` : "N/A"}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      recipe.difficultyLevel === 'Easy' ? 'bg-green-100 text-green-700' :
                      recipe.difficultyLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {recipe.difficultyLevel || "Easy"}
                    </span>
                  </div>
                    <Link 
        href={`/all-recipes/${recipe._id}`} 
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

export default AllRecipesPage;