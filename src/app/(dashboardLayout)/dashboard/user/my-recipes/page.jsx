"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Button, Input } from "@heroui/react";
import { FaEye, FaEdit, FaTrash, FaUtensils, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔮 পিওর রিয়্যাক্ট স্টেট দিয়ে মডাল ওপেন/ক্লোজ ট্র্যাকিং
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // এডিট রেসিপি স্টেট
  const [editingRecipe, setEditingRecipe] = useState({
    name: "",
    image: "",
    category: "",
    cuisineType: "",
    prepTime: "",
    instructions: ""
  });

  // 📥 ডাটাবেজ থেকে ডাটা নিয়ে আসা
  const fetchMyRecipes = async () => {
    try {
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

  // 📝 এডিট বাটন ক্লিক
  const handleEditClick = (recipe) => {
    setEditingRecipe({
      ...recipe,
      prepTime: recipe.prepTime || "",
      instructions: recipe.instructions || ""
    });
    setIsModalOpen(true); // টেইলউইন্ড মডাল অন হবে
  };

  // 🔄 আপডেট সাবমিট
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/recipes/${editingRecipe._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingRecipe),
      });
      
      if (response.ok) {
        toast.success("Recipe updated successfully! 🎉");
        setIsModalOpen(false); // মডাল অফ হবে
        fetchMyRecipes();
      } else {
        toast.error("Failed to update recipe");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

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
    <section className="space-y-8 relative">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FaUtensils className="text-orange-400" />
          My Recipes ({recipes.length})
        </h1>
        <p className="mt-2">Manage your created recipes here.</p>
      </div>

      {/* Grid */}
      {recipes.length === 0 ? (
        <p className="text-center py-10 ">You have not created any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card
              key={recipe._id}
              className="overflow-hidden border border-white/5 bg-zinc-900/50"
            >
              <div className="relative h-56 w-full bg-zinc-800">
                <Image
                  src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                  alt={recipe.name || "Recipe"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="p-5 space-y-3">
                <h2 className="text-xl font-bold line-clamp-1">
                  {recipe.name}
                </h2> 

                <p className=" text-sm">Category: {recipe.category}</p>
                <p className=" text-sm">Cuisine: {recipe.cuisineType || "N/A"}</p>
                <p className="
                 text-sm">Prep Time: {recipe.prepTime ? `${recipe.prepTime} mins` : "N/A"}</p>

                <div className="flex gap-2 mt-3">
                  <Button as={Link} href={`/recipes/${recipe._id}`} className="flex-1 text-xs" startContent={<FaEye />}>
                    View
                  </Button>

                  <Button onClick={() => handleEditClick(recipe)} color="warning" variant="flat" className="flex-1 text-xs" startContent={<FaEdit />} >
                    Edit
                  </Button>

                  <Button onClick={() => handleDelete(recipe._id)} color="danger" variant="flat" className="flex-1 text-xs" startContent={<FaTrash />}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 🔮 ১০০% কাস্টম টেইলউইন্ড ডার্ক মডাল (কোনো ইমপোর্ট এরর আসবে না) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-white/5">
              <h2 className="text-xl font-bold">Update Recipe Details</h2>
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                className="p-1 hover:bg-white/10 rounded-full transition-colors hover:text-white"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleUpdateSubmit}>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <Input 
                  label="Recipe Name" 
                  variant="bordered" 
                  value={editingRecipe.name} 
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, name: e.target.value })} 
                  required 
                />
                
                <Input 
                  label="Image URL" 
                  variant="bordered" 
                  value={editingRecipe.image} 
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, image: e.target.value })} 
                  required 
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <Input 
                    label="Category" 
                    variant="bordered" 
                    value={editingRecipe.category} 
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, category: e.target.value })} 
                    required 
                  />
                  <Input 
                    label="Cuisine Type" 
                    variant="bordered" 
                    value={editingRecipe.cuisineType} 
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, cuisineType: e.target.value })} 
                    required 
                  />
                </div>
                
                <Input 
                  type="number" 
                  label="Prep Time (mins)" 
                  variant="bordered" 
                  value={editingRecipe.prepTime} 
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, prepTime: e.target.value })} 
                  required 
                />
                
                <Input 
                  label="Instructions" 
                  variant="bordered" 
                  value={editingRecipe.instructions} 
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, instructions: e.target.value })} 
                  required 
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 bg-zinc-900/40 border-t border-white/5">
                <Button type="button" color="danger" variant="flat" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-500 text-white font-bold px-5">
                  Save Changes
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}
    </section>
  );
}