"use client";

import { addRecipe } from "@/lib/api/action/addRecipe";
import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddRecipePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const image = data.recipeImage[0];

      // image upload function
      const imageUrl = await uploadImage(image);

      const recipe = {
        recipeName: data.recipeName,
        recipeImage: imageUrl,
        category: data.category,
        cuisineType: data.cuisineType,
        difficultyLevel: data.difficultyLevel,
        preparationTime: Number(data.preparationTime),
        ingredients: data.ingredients,
        instructions: data.instructions,

        authorEmail: session?.user?.email,
        authorName: session?.user?.name,

        likesCount: 0,
        status: "pending",
        isFeatured: false,
      };

      const result = await addRecipe(recipe);

      if (result.insertedId) {
        toast.success("Recipe added successfully");
        router.push("/dashboard/user/my-recipes");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Add New Recipe
        </h1>

        <p className="text-zinc-500 mt-2">
          Publish your recipe to RecipeHub
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >

        {/* Recipe Name */}
        <input
          {...register("recipeName", {
            required: "Recipe name required",
          })}
          placeholder="Recipe Name"
          className="w-full border p-3 rounded-xl"
        />

        {errors.recipeName && (
          <p className="text-red-500">
            {errors.recipeName.message}
          </p>
        )}

        {/* Category */}
        <select
          {...register("category")}
          className="w-full border p-3 rounded-xl"
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Dessert</option>
        </select>

        {/* Cuisine */}
        <input
          {...register("cuisineType")}
          placeholder="Cuisine Type"
          className="w-full border p-3 rounded-xl"
        />

        {/* Difficulty */}
        <select
          {...register("difficultyLevel")}
          className="w-full border p-3 rounded-xl"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        {/* Time */}
        <input
          type="number"
          {...register("preparationTime")}
          placeholder="Preparation Time"
          className="w-full border p-3 rounded-xl"
        />

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          {...register("recipeImage", {
            required: "Recipe image required",
          })}
          className="w-full border p-3 rounded-xl"
        />

        {/* Ingredients */}
        <textarea
          rows={4}
          {...register("ingredients")}
          placeholder="Ingredients"
          className="w-full border p-3 rounded-xl"
        />

        {/* Instructions */}
        <textarea
          rows={6}
          {...register("instructions")}
          placeholder="Instructions"
          className="w-full border p-3 rounded-xl"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded-xl"
        >
          Add Recipe
        </button>

      </form>
    </div>
  );
};

export default AddRecipePage;