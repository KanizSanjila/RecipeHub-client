"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { FaEye, FaEdit, FaTrash, FaUtensils } from "react-icons/fa";

const myRecipes = [
  {
    _id: "1",
    recipeName: "Spicy Chicken Curry",
    recipeImage:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    category: "Dinner",
    status: "published",
    likes: 120,
  },
  {
    _id: "2",
    recipeName: "Veggie Pasta",
    recipeImage:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    category: "Lunch",
    status: "draft",
    likes: 45,
  },
  {
    _id: "3",
    recipeName: "Chocolate Cake",
    recipeImage:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    category: "Dessert",
    status: "published",
    likes: 300,
  },
];

export default function MyRecipes() {
  return (
    <section className="space-y-8">

      {/* Header */}
      <div className="border-b border-white/10 pb-5">

        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FaUtensils className="text-orange-400" />
          My Recipes
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your created recipes here.
        </p>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {myRecipes.map((recipe) => (
          <Card
            key={recipe._id}
            className="overflow-hidden border border-white/5"
          >

            {/* Image */}
            <div className="relative h-56">
              <Image
                src={recipe.recipeImage}
                alt={recipe.recipeName}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">

              <h2 className="text-xl font-bold">
                {recipe.recipeName}
              </h2>

              <p className="text-zinc-400 text-sm">
                Category: {recipe.category}
              </p>

              <p className="text-zinc-400 text-sm">
                Status:{" "}
                <span
                  className={
                    recipe.status === "published"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {recipe.status}
                </span>
              </p>

              <p className="text-zinc-400 text-sm">
                Likes: {recipe.likes}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 mt-3">

                <Button
                  as={Link}
                  href={`/recipes/${recipe._id}`}
                  className="flex-1"
                  startContent={<FaEye />}
                >
                  View
                </Button>

                <Button
                  as={Link}
                  href={`/dashboard/user/edit/${recipe._id}`}
                  color="warning"
                  variant="flat"
                  className="flex-1"
                  startContent={<FaEdit />}
                >
                  Edit
                </Button>

                <Button
                  color="danger"
                  variant="flat"
                  className="flex-1"
                  startContent={<FaTrash />}
                >
                  Delete
                </Button>

              </div>

            </div>

          </Card>
        ))}

      </div>
    </section>
  );
}