"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { FaHeart, FaTrash, FaEye } from "react-icons/fa";

const favoriteRecipes = [
  {
    _id: "1",
    recipeName: "Creamy Pasta",
    recipeImage:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    category: "Dinner",
    likes: 320,
  },

  {
    _id: "2",
    recipeName: "Chicken Burger",
    recipeImage:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    category: "Fast Food",
    likes: 580,
  },

  {
    _id: "3",
    recipeName: "Chocolate Cake",
    recipeImage:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    category: "Dessert",
    likes: 240,
  },
];

export default function MyFavorites() {
  return (
    <section className="space-y-8">

      {/* Header */}
      <div className="border-b border-white/10 pb-5">

        <h1 className="text-3xl font-bold">
          My Favorites ❤️
        </h1>

        <p className="text-zinc-400 mt-2">
          View and manage your favorite recipes.
        </p>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {favoriteRecipes.map((recipe) => (
          <Card
            key={recipe._id}
            className="overflow-hidden border border-white/5"
          >

            <div className="relative h-56">

              <Image
                src={recipe.recipeImage}
                alt={recipe.recipeName}
                fill
                className="object-cover"
              />

            </div>

            <div className="p-5 space-y-4">

              <div>

                <h3 className="text-xl font-bold">
                  {recipe.recipeName}
                </h3>

                <p className="text-zinc-400">
                  {recipe.category}
                </p>

              </div>

              <div className="flex items-center gap-2">

                <FaHeart className="text-red-500" />

                <span>
                  {recipe.likes} Likes
                </span>

              </div>

              <div className="flex gap-3">

                <Button
                  color="danger"
                  variant="flat"
                  className="flex-1"
                  startContent={<FaTrash />}
                >
                  Remove
                </Button>

                <Button
                  as={Link}
                  href={`/recipes/${recipe._id}`}
                  className="flex-1"
                  startContent={<FaEye />}
                >
                  Details
                </Button>

              </div>

            </div>

          </Card>
        ))}

      </div>
    </section>
  );
}