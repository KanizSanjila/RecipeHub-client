"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaHeart, FaUser, FaUtensils } from "react-icons/fa";

const PopularRecipes = () => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ব্যাকএন্ড URL
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const response = await fetch(`${backendUrl}/all-recipes`);
        if (!response.ok) throw new Error("Failed to fetch recipes");
        
        const data = await response.json();
        
        // 🔥 লাইক কাউন্টের ওপর ভিত্তি করে বড় থেকে ছোট (Descending Order) শর্টিং লজিক
        const sortedRecipes = data
          .sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
          .slice(0, 4); // প্রথম ৪টি সবচেয়ে পপুলার রেসিপি ফিল্টার করে নেওয়া হলো (চাইলে ৮ করতে পারো)

        setPopularRecipes(sortedRecipes);
      } catch (error) {
        console.error("Error fetching popular recipes:", error);
        toast.error("Could not load popular recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularRecipes();
  }, [backendUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50/10 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* সেকশন হেডার */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-orange-100">
            <FaUtensils size={10} />
            Trending Now
          </div>
          <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
            Popular Recipes
          </h2>
          <p className="mt-3 text-sm text-gray-500 max-w-md leading-relaxed">
            Discover the community&apos;s absolute favorites! Highly rated and most liked dishes prepared by our top chefs.
          </p>
        </div>

        {/* কার্ড গ্রিড লেআউট */}
        {popularRecipes.length === 0 ? (
          <p className="text-center text-gray-500">No popular recipes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRecipes.map((recipe) => (
              <div 
                key={recipe._id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group"
              >
                {/* রেসিপি ইমেজ ও টপ লাইক ব্যাজ */}
                <div className="h-48 w-full relative bg-gray-100 overflow-hidden">
                  <img
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={recipe.recipeImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                    alt={recipe.recipeName}
                  />
                  {/* ফ্লোটিং রিয়েল-টাইম লাইক কাউন্ট ব্যাজ */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm shadow-sm px-2.5 py-1 rounded-full flex items-center gap-1 text-red-500 font-bold text-xs">
                    <FaHeart size={12} />
                    <span className="text-gray-800">{recipe.likesCount || 0}</span>
                  </div>
                </div>

                {/* কার্ড কন্টেন্ট */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    {/* রেসিপি নাম */}
                    <h3 className="text-base font-bold text-gray-800 line-clamp-2 hover:text-orange-500 transition-colors duration-200 mb-3 min-h-[3rem]">
                      <Link href={`/all-recipes/${recipe._id}`}>
                        {recipe.recipeName}
                      </Link>
                    </h3>

                    {/* মেম্বার বা অথর নেম ইনফো */}
                    <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100 mb-4">
                      <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                        <FaUser size={10} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider leading-none">Recipe By</p>
                        <p className="text-xs font-bold text-gray-700 truncate mt-0.5">
                          {recipe.creatorName || recipe.authorName || "Anonymous Chef"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ভিউ ডিটেইলস বাটন */}
                  <Link 
                    href={`/all-recipes/${recipe._id}`} 
                    className="w-full bg-slate-950 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 text-center active:scale-[0.98]"
                  >
                    View Full Recipe
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default PopularRecipes;