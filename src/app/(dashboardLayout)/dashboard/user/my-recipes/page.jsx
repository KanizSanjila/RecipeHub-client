"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Button } from "@heroui/react";
import { FaEye, FaEdit, FaTrash, FaUtensils } from "react-icons/fa";
import toast from "react-hot-toast";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📥 ডাটাবেজ থেকে ডাটা নিয়ে আসা (আপাতত সব রেসিপি দেখাচ্ছি টেস্ট করার জন্য)
  const fetchMyRecipes = async () => {
    try {
      // 💡 নোট: যদি ইমেইল ছাড়া সব দেখতে চাও তবে ব্যাকএন্ডের সাধারণ '/all-recipes' বা '/recipes' এ হিট করো
      const response = await fetch(`http://localhost:5000/all-recipes`); 
      if (!response.ok) throw new Error("Failed to load");
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
      toast.error("Could not fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  // ❌ ডিলিট হ্যান্ডলার
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const response = await fetch(`http://localhost:5000/recipes/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        toast.success("Recipe deleted successfully 🎉");
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
      } else {
        toast.error("Failed to delete recipe");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <h1 className="text-3xl font-bold flex items-center gap-2 ">
          <FaUtensils className="text-orange-400" />
          My Recipes ({recipes.length})
        </h1>
        <p className="mt-2">Manage your created recipes here.</p>
      </div>

      {/* Grid */}
      {recipes.length === 0 ? (
        <p className=" text-center py-10">You have not created any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card
              key={recipe._id}
              className="overflow-hidden border border-white/5 bg-zinc-900/50"
            >
              {/* Image */}
              <div className="relative h-56 w-full bg-zinc-800">
                <Image
                  src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} // 👈 'recipeImage' বদলে শুধু 'image'
                  alt={recipe.name || "Recipe"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h2 className="text-xl font-bold  line-clamp-1">
                  {recipe.name} {/* 👈 'recipeName' বদলে শুধু 'name' */}
                </h2>

                <p className=" text-sm">
                  Category: {recipe.category}
                </p>

                <p className="text-sm">
                  Cuisine: {recipe.cuisineType || "N/A"}
                </p>

                <p className="text-sm">
                  Prep Time: {recipe.prepTime ? `${recipe.prepTime} mins` : "N/A"} {/* 👈 'prepTime' */}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-3">
                  <Button
                    as={Link}
                    href={`/recipes/${recipe._id}`}
                    className="flex-1 text-xs"
                    startContent={<FaEye />}
                  >
                    View
                  </Button>

                  <Button
                    as={Link}
                    href={`/dashboard/user/edit/${recipe._id}`}
                    color="warning"
                    variant="flat"
                    className="flex-1 text-xs"
                    startContent={<FaEdit />}
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => handleDelete(recipe._id)}
                    color="danger"
                    variant="flat"
                    className="flex-1 text-xs"
                    startContent={<FaTrash />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}