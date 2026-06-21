import { Card, Button } from "@heroui/react";

import {
  FaCrown,
  FaUtensils,
  FaHeart,
  FaThumbsUp,
} from "react-icons/fa";

const UserOverviewItems = () => {
  const stats = {
    totalRecipes: 15,
    totalFavorites: 450,
    totalLikes: 2500,
  };

  const isPremium = false;

  return (
    <div className="space-y-6 mt-6">
       <div className="border-b border-white/5 pb-5">
  <h1 className="text-3xl font-extrabold">
    Dashboard Overview
  </h1>

  <p className="text-zinc-400 mt-2">
    Track your recipes, favorites, and engagement in one place.
  </p>
</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Recipes */}
        <Card
          className="bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/10"
          radius="lg"
        >
          <div className="p-6 flex justify-between items-center">

            <div>
              <p className="text-xs uppercase text-zinc-400 font-semibold">
                Total Recipes
              </p>

              <h2 className="text-3xl font-bold">
                {stats.totalRecipes}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-orange-500/15 text-orange-400">
              <FaUtensils size={24} />
            </div>

          </div>
        </Card>

        {/* Favorites */}
        <Card
          className="bg-gradient-to-br from-pink-500/10 to-rose-500/5 border border-pink-500/10"
          radius="lg"
        >
          <div className="p-6 flex justify-between items-center">

            <div>
              <p className="text-xs uppercase text-zinc-400 font-semibold">
                Total Favorites
              </p>

              <h2 className="text-3xl font-bold">
                {stats.totalFavorites}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-pink-500/15 text-pink-400">
              <FaHeart size={24} />
            </div>

          </div>
        </Card>

        {/* Likes */}
        <Card
          className="bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-green-500/10"
          radius="lg"
        >
          <div className="p-6 flex justify-between items-center">

            <div>
              <p className="text-xs uppercase text-zinc-400 font-semibold">
                Total Likes Received
              </p>

              <h2 className="text-3xl font-bold">
                {stats.totalLikes}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-green-500/15 text-green-400">
              <FaThumbsUp size={24} />
            </div>

          </div>
        </Card>

      </div>

      {!isPremium && (
        <Card
          className="overflow-hidden border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-orange-500/5 to-transparent"
          radius="lg"
        >
          <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">

            <div>

              <h3 className="text-2xl font-bold flex items-center gap-3">
                <FaCrown className="text-yellow-400" />

                Go Premium
              </h3>

              <p className="mt-2 text-sm text-zinc-400 max-w-xl">
                Free users can publish up to
                <strong> 3 recipes</strong>.
                Upgrade to Premium and unlock
                unlimited recipe publishing.
              </p>

            </div>

            <Button
              radius="lg"
              className="bg-yellow-500 text-black font-bold px-8 h-12"
            >
              Upgrade Now
            </Button>

          </div>
        </Card>
      )}
    </div>
  );
};

export default UserOverviewItems;