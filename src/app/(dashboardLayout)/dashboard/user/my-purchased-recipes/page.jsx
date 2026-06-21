"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { FaEye, FaShoppingBag } from "react-icons/fa";

const purchasedRecipes = [
  {
    _id: "1",
    recipeName: "Grilled Chicken Steak",
    recipeImage:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    category: "Dinner",
    price: 12,
    purchaseDate: "2026-06-10",
    authorName: "Chef Mario",
  },
  {
    _id: "2",
    recipeName: "Beef Burger Deluxe",
    recipeImage:
      "https://images.unsplash.com/photo-1550547660-d9450f859349",
    category: "Fast Food",
    price: 8,
    purchaseDate: "2026-06-12",
    authorName: "Chef John",
  },
  {
    _id: "3",
    recipeName: "Chocolate Lava Cake",
    recipeImage:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    category: "Dessert",
    price: 6,
    purchaseDate: "2026-06-15",
    authorName: "Chef Anna",
  },
];

export default function MyPurchasedRecipes() {
  return (
    <section className="space-y-8">

      {/* Header */}
      <div className="border-b border-white/10 pb-5">

        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FaShoppingBag className="text-yellow-400" />
          My Purchased Recipes
        </h1>

        <p className="text-zinc-400 mt-2">
          All recipes you have purchased are listed below.
        </p>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {purchasedRecipes.map((recipe) => (
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
                Author: {recipe.authorName}
              </p>

              <p className="text-zinc-400 text-sm">
                Purchased: {recipe.purchaseDate}
              </p>

              <p className="text-yellow-400 font-semibold">
                Price: ${recipe.price}
              </p>

              {/* Button */}
              <Button
                as={Link}
                href={`/recipes/${recipe._id}`}
                className="w-full mt-2"
                startContent={<FaEye />}
              >
                View Details
              </Button>

            </div>

          </Card>
        ))}

      </div>
    </section>
  );
}