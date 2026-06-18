"use client";

import { Button } from "@heroui/react";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-7xl mx-auto px-6 text-white">

          <h1 className="text-5xl font-bold mb-6">
            Discover & Share Amazing Recipes
          </h1>

          <p className="text-lg mb-8 max-w-xl">
            Explore thousands of delicious recipes and share your cooking journey.
          </p>

          <div className="flex gap-4">
            <Button color="warning">
              Explore Recipes
            </Button>

            <Button variant="bordered">
              Upload Recipe
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}