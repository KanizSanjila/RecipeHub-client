"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, Plus, Clock, ChefHat, Layers } from "lucide-react";
import { uploadImage } from "@/utils/uploadImage";

export default function AddRecipe() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   try {
  //     // ১. ইমেজ ফাইল চেক ও ImgBB-তে আপলোড
  //     if (!data.recipeImage || !data.recipeImage[0]) {
  //       toast.error("Please upload a recipe image");
  //       setLoading(false);
  //       return;
  //     }

  //     const imageFile = data.recipeImage[0];
  //     const uploadedImageUrl = await uploadImage(imageFile);

  //     if (!uploadedImageUrl) {
  //       setLoading(false);
  //       return;
  //     }

  //     const recipeData = {
  //       name: data.recipeName.trim(),
  //       image: uploadedImageUrl,
  //       category: data.category,
  //       cuisineType: data.cuisineType,
  //       difficulty: data.difficulty,
  //       prepTime: parseInt(data.prepTime),
  //       ingredients: data.ingredients.split("\n").map(item => item.trim()).filter(Boolean),
  //       instructions: data.instructions.trim(),
  //       createdAt: new Date(),
  //     };

  //     // ৩. সার্ভারে POST রিকোয়েস্ট পাঠানো
  //     const response = await fetch("http://localhost:5000/recipes", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(recipeData),
  //     });

  //     const result = await response.json();

  //     if (result.insertedId) {
  //       toast.success("Recipe added successfully!");
  //       reset(); // ফর্ম ক্লিয়ার করার জন্য
  //     } else {
  //       toast.error("Failed to add recipe to database");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (data) => {
  setLoading(true);
  try {
    // -------------------------------------------------------------
    // 🚧 সাময়িকভাবে ImgBB আপলোড বন্ধ করে ডিরেক্ট লিংক বসানো হলো
    // -------------------------------------------------------------
    
    // ১. তোমার আসল uploadImage কলটি কমেন্ট আউট করে রাখো:
    /*
    if (!data.recipeImage || !data.recipeImage[0]) {
      toast.error("Please upload a recipe image");
      setLoading(false);
      return;
    }
    const imageFile = data.recipeImage[0];
    const uploadedImageUrl = await uploadImage(imageFile);
    if (!uploadedImageUrl) {
      setLoading(false);
      return;
    }
    */

    // ২. টেস্ট করার জন্য সরাসরি একটি অনলাইন ইমেজ লিংক বসিয়ে দাও:
    const uploadedImageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500"; 

    // -------------------------------------------------------------

    // ৩. বাকি কোড আগের মতোই থাকবে (যা ডাটাবেজে ডাটা পাঠাবে)
    const recipeData = {
      name: data.recipeName.trim(),
      image: uploadedImageUrl, // এখানে এখন Unsplash-এর লিংকটি চলে যাবে
      category: data.category,
      cuisineType: data.cuisineType,
      difficulty: data.difficulty,
      prepTime: parseInt(data.prepTime),
      ingredients: data.ingredients.split("\n").map(item => item.trim()).filter(Boolean),
      instructions: data.instructions.trim(),
      createdAt: new Date(),
    };

    // সার্ভারে POST রিকোয়েস্ট পাঠানো
    const response = await fetch("http://localhost:5000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    const result = await response.json();

    if (result.insertedId) {
      toast.success("Recipe added successfully! (Test Mode)");
      reset(); // ফর্ম ক্লিয়ার হবে
    } else {
      toast.error("Failed to add recipe to database");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 my-10">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <Plus className="text-orange-500" /> Add New Recipe
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Recipe Name & Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Recipe Name *</label>
            <input
              type="text"
              required
              {...register("recipeName")}
              className="w-full px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., Spicy Chicken Curry"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Recipe Image *</label>
            <input
              type="file"
              accept="image/*"
              required
              {...register("recipeImage")}
              className="w-full px-4 py-1.5 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
          </div>
        </div>

        {/* Category & Cuisine Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
              <Layers size={16} /> Category *
            </label>
            <select
              required
              {...register("category")}
              className="w-full px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
              <ChefHat size={16} /> Cuisine Type *
            </label>
            <input
              type="text"
              required
              {...register("cuisineType")}
              className="w-full px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., Indian, Italian, Mexican"
            />
          </div>
        </div>

        {/* Difficulty & Prep Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Difficulty Level *</label>
            <select
              required
              {...register("difficulty")}
              className="w-full px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
              <Clock size={16} /> Prep Time (Minutes) *
            </label>
            <input
              type="number"
              required
              min="1"
              {...register("prepTime")}
              className="w-full px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., 30"
            />
          </div>
        </div>

        {/* Ingredients (Textarea) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ingredients * <span className="text-xs text-gray-400">(Enter each ingredient on a new line)</span>
          </label>
          <textarea
            required
            rows={4}
            {...register("ingredients")}
            className="w-full px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            placeholder="500g Chicken&#10;2 tbsp Ginger Paste&#10;1 cup Chopped Onion"
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instructions / Steps *</label>
          <textarea
            required
            rows={5}
            {...register("instructions")}
            className="w-full px-4 py-2 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            placeholder="Step 1: Marinate the chicken...&#10;Step 2: Heat oil in a pan..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit Recipe"}
        </button>
      </form>
    </div>
  );
}