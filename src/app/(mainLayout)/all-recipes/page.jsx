"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaHeart, FaBookmark, FaExclamationTriangle } from "react-icons/fa";

const AllRecipesPage = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // 🎯 তোমার সেশন অনুযায়ী কারেন্ট ইউজারের ইমেইল এখানে বসাবে
  const currentUserEmail = "chef.user@example.com"; 

  // ব্যাকএন্ড URL
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await fetch(`${backendUrl}/all-recipes`);
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
  }, [backendUrl]);

  // ==========================================
  // ❤️ ১. লাইক হ্যান্ডলার (PATCH)
  // ==========================================
  const handleLike = async (recipeId) => {
    try {
      const response = await fetch(`${backendUrl}/recipes/${recipeId}/like`, {
        method: "PATCH",
      });

      if (response.ok) {
        setAllRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe._id === recipeId
              ? { ...recipe, likesCount: (recipe.likesCount || 0) + 1 }
              : recipe
          )
        );
        toast.success("Liked the recipe! ❤️");
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
      toast.error("Failed to like recipe");
    }
  };

  // ==========================================
  // ⭐ ২. ফেভারিট হ্যান্ডলার (POST)
  // ==========================================
  const handleFavorite = async (recipe) => {
    try {
      const response = await fetch(`${backendUrl}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: currentUserEmail,
          recipeId: recipe._id,
          recipeName: recipe.recipeName,
        }),
      });

      if (response.ok) {
        // UI-তে ইনস্ট্যান্ট ফেভারিট কাউন্ট বাড়িয়ে দেওয়া
        setAllRecipes((prevRecipes) =>
          prevRecipes.map((r) =>
            r._id === recipe._id
              ? { ...r, favoritesCount: (r.favoritesCount || 0) + 1 }
              : r
          )
        );
        toast.success("Added to Favorites! ⭐");
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      toast.error("Failed to add to favorites");
    }
  };

  // ==========================================
  // 🚨 ৩. রিপোর্ট হ্যান্ডলার (POST)
  // ==========================================
  const handleReport = async (recipeId) => {
    const reason = prompt("Enter the reason for reporting this recipe:");
    if (!reason) return; 

    try {
      const response = await fetch(`${backendUrl}/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipeId: recipeId,
          userEmail: currentUserEmail,
          reason: reason,
        }),
      });

      if (response.ok) {
        // UI-তে ইনস্ট্যান্ট রিপোর্ট কাউন্ট বাড়িয়ে দেওয়া
        setAllRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe._id === recipeId
              ? { ...recipe, reportsCount: (recipe.reportsCount || 0) + 1 }
              : recipe
          )
        );
        toast.success("Recipe reported successfully 🚨");
      }
    } catch (error) {
      console.error("Error reporting recipe:", error);
      toast.error("Failed to submit report");
    }
  };

  // ফিল্টারিং লজিক
  const filteredRecipes = selectedCategory === "All"
    ? allRecipes
    : allRecipes.filter((recipe) => recipe.category?.toLowerCase() === selectedCategory.toLowerCase());

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
        
        {/* পেজ হেডার ও ফিল্টার কন্ট্রোল */}
        <div className="border-b border-gray-200 pb-5 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Delicious Recipes</h1>
            <p className="mt-2 text-sm text-gray-500">Explore our entire collection of amazing recipes.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-800 focus:outline-none cursor-pointer min-w-[120px]"
              >
                <option value="All">All</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-2 rounded-xl text-center">
              Showing: {filteredRecipes.length} Recipes
            </span>
          </div>
        </div>

        {/* রেসিপির কার্ড গ্রিড */}
        {filteredRecipes.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No recipes found for "{selectedCategory}" category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <div 
                key={recipe._id} 
                className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                {/* ইমেজ সেকশন */}
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

                {/* কন্টেন্ট সেকশন */}
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mb-1">
                      {recipe.cuisineType || "Universal"} Cuisine
                    </span>
                    <h3 className="text-base font-bold text-gray-800 line-clamp-1">
                      {recipe.recipeName}
                    </h3>
                  </div>

                  {/* 📊 👍 Likes, 🔖 Favorites, 🚨 Reports কাউন্টার গ্রিড */}
                  <div className="grid grid-cols-3 gap-1 items-center justify-between mt-4 bg-white p-2 rounded-xl border border-gray-100 text-center">
                    
                    {/* Like Button */}
                    <button 
                      onClick={() => handleLike(recipe._id)}
                      className="flex flex-col items-center justify-center gap-0.5 text-gray-500 hover:text-red-500 transition-colors duration-200"
                      title="Like Recipe"
                    >
                      <FaHeart size={14} className={recipe.likesCount > 0 ? "text-red-500" : "text-gray-300"} />
                      <span className="text-[11px] font-bold text-gray-700">{recipe.likesCount || 0}</span>
                    </button>

                    {/* Favorite Button */}
                    <button 
                      onClick={() => handleFavorite(recipe)}
                      className="flex flex-col items-center justify-center gap-0.5 text-gray-500 hover:text-amber-500 transition-colors duration-200 border-x border-gray-100"
                      title="Add to Favorites"
                    >
                      <FaBookmark size={13} className={recipe.favoritesCount > 0 ? "text-amber-500" : "text-gray-300"} />
                      <span className="text-[11px] font-bold text-gray-700">{recipe.favoritesCount || 0}</span>
                    </button>

                    {/* Report Button */}
                    <button 
                      onClick={() => handleReport(recipe._id)}
                      className="flex flex-col items-center justify-center gap-0.5 text-gray-500 hover:text-orange-600 transition-colors duration-200"
                      title="Report Recipe"
                    >
                      <FaExclamationTriangle size={13} className={recipe.reportsCount > 0 ? "text-orange-500" : "text-gray-300"} />
                      <span className="text-[11px] font-bold text-gray-700">{recipe.reportsCount || 0}</span>
                    </button>

                  </div>

                  {/* টাইম এবং ডিফিকাল্টি লেভেল */}
                  <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs text-gray-600 mb-4">
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