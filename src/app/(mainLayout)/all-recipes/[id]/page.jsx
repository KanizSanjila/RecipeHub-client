"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Card, Button, Input } from "@heroui/react";
import { FaHeart, FaRegHeart, FaThumbsUp, FaFlag, FaClock, FaUtensils, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // ইন্টারেকশন স্টেটস
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  // 📥 ব্যাকএন্ড থেকে নির্দিষ্ট রেಸಿপির ডাটা নিয়ে আসা
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/recipes/${id}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setRecipe(data);
        setLikeCount(data.likes || 0);
      } catch (error) {
        console.error(error);
        toast.error("Could not load recipe details!");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRecipeDetails();
  }, [id]);

  // 👍 লাইক হ্যান্ডলার
  const handleLike = async () => {
    try {
      // আপাতত ফ্রন্টএন্ড স্টেট টগল (প্রয়োজনীয় ব্যাকএন্ড এপিআই হিট করতে পারো)
      if (!isLiked) {
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
        toast.success("Liked the recipe! 👍");
      } else {
        setLikeCount((prev) => prev - 1);
        setIsLiked(false);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // ❤️ ফেভারিট হ্যান্ডলার
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(!isFavorite ? "Added to favorites! ❤️" : "Removed from favorites");
  };

  // 🚩 রিপোর্ট সাবমিট হ্যান্ডলার
  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportReason.trim()) return toast.error("Please enter a reason");
    
    toast.success("Recipe reported successfully. Admin will review it.");
    setIsReportModalOpen(false);
    setReportReason("");
  };

  // 💳 স্ট্রাইপ পেমেন্ট চেকআউট হ্যান্ডলার
  const handlePurchase = async () => {
    try {
      toast.loading("Redirecting to Stripe payment...");
      const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipeId: recipe._id,
          name: recipe.name,
          price: recipe.price || 5, // ডিফল্ট ৫ ডলার টেস্ট পারপাস
          image: recipe.image
        }),
      });

      const session = await response.json();
      if (session.url) {
        window.location.href = session.url; // স্ট্রাইপ হোস্টেড চেকআউট পেজে রিডিরেক্ট
      } else {
        toast.dismiss();
        toast.error("Stripe session creation failed!");
      }
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error("Payment integration error!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!recipe) {
    return <p className="text-center text-zinc-400 py-10">Recipe not found!</p>;
  }

  return (
    <section className="max-w-4xl mx-auto py-10 px-4 space-y-8 relative text-white">
      {/* Recipe Meta Header */}
      <div className="relative h-[400px] w-full bg-zinc-800 rounded-3xl overflow-hidden border border-white/10">
        <Image
          src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
          alt={recipe.name}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-8 space-y-3">
          <span className="bg-orange-500 text-white font-bold text-xs px-3 py-1 rounded-full w-fit uppercase">
            {recipe.category}
          </span>
          <h1 className="text-4xl font-extrabold">{recipe.name}</h1>
          
          <div className="flex flex-wrap gap-5 text-sm text-zinc-300 pt-2">
            <span className="flex items-center gap-2"><FaUtensils className="text-orange-400" /> Cuisine: {recipe.cuisineType || "N/A"}</span>
            <span className="flex items-center gap-2"><FaClock className="text-orange-400" /> Prep: {recipe.prepTime || "0"} mins</span>
            <span className="flex items-center gap-2"><FaThumbsUp className="text-orange-400" /> {likeCount} Likes</span>
          </div>
        </div>
      </div>

      {/* Control Buttons Panel */}
      <div className="flex flex-wrap gap-3 justify-between items-center p-4 bg-zinc-900/50 border border-white/5 rounded-2xl">
        <div className="flex gap-2">
          {/* Like Button */}
          <Button 
            onClick={handleLike} 
            color={isLiked ? "primary" : "default"} 
            variant={isLiked ? "solid" : "flat"}
            startContent={<FaThumbsUp />}
          >
            {isLiked ? "Liked" : "Like"} ({likeCount})
          </Button>

          {/* Favorite Button */}
          <Button 
            onClick={handleFavorite} 
            color="danger" 
            variant={isFavorite ? "solid" : "flat"}
            startContent={isFavorite ? <FaHeart /> : <FaRegHeart />}
          >
            {isFavorite ? "Favorite" : "Add Favorite"}
          </Button>
        </div>

        <div className="flex gap-2">
          {/* Report Button */}
          <Button 
            onClick={() => setIsReportModalOpen(true)} 
            color="warning" 
            variant="flat"
            startContent={<FaFlag />}
          >
            Report
          </Button>

          {/* Purchase Button */}
          <Button 
            onClick={handlePurchase} 
            className="bg-orange-500 text-white font-bold px-6 shadow-lg shadow-orange-500/20"
          >
            Buy Recipe (${recipe.price || "5.00"})
          </Button>
        </div>
      </div>

      {/* Description & Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 bg-zinc-900/40 border border-white/5 space-y-4">
            <h3 className="text-xl font-bold border-b border-white/10 pb-2 text-orange-400">Cooking Instructions</h3>
            <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
              {recipe.instructions || "No instructions provided for this recipe."}
            </p>
          </Card>
        </div>

        {/* Sidebar details */}
        <div className="space-y-6">
          <Card className="p-6 bg-zinc-900/40 border border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-orange-400 border-b border-white/10 pb-2">Recipe Owner</h3>
            <div className="text-sm space-y-1">
              <p className="text-zinc-400">Posted by:</p>
              <p className="font-medium text-white">{recipe.creatorEmail || "Anonymous Chef"}</p>
            </div>
          </Card>
        </div>
      </div>

      {/* 🔮 টেইলউইন্ড সিএসএস কাস্টম রিপোর্ট মডাল (টার্বোপ্যাক সেফ) */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-white/5">
              <h2 className="text-xl font-bold flex items-center gap-2"><FaFlag className="text-amber-500" /> Report Recipe</h2>
              <button onClick={() => setIsReportModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white">
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleReportSubmit}>
              <div className="p-6 space-y-4">
                <p className="text-sm text-zinc-400">Please provide a valid reason for reporting this recipe content.</p>
                <Input 
                  label="Reason for Report" 
                  variant="bordered" 
                  placeholder="e.g., Plagiarism, Wrong ingredients, Inappropriate content"
                  value={reportReason} 
                  onChange={(e) => setReportReason(e.target.value)} 
                  required 
                />
              </div>

              <div className="flex justify-end gap-3 px-6 py-4 bg-zinc-900/40 border-t border-white/5">
                <Button type="button" variant="flat" onClick={() => setIsReportModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" color="danger" className="font-bold">
                  Submit Report
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}