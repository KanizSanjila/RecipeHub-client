"use client";

import { useEffect, useState } from "react";
import { Card, Button } from "@heroui/react";
import { FaCrown, FaUtensils, FaHeart, FaThumbsUp } from "react-icons/fa";
// 🎯 ১. ক্লায়েন্ট সেশনের জন্য সঠিক ইম্পোর্ট
import { useSession } from "@/lib/auth-client"; 
import UpgradePremiumButton from "@/components/UpgradePremiumButton";

const UserOverviewItems = () => {
  const { data: session, isPending } = useSession(); // 🎯 ২. সেশন ডেটা নিয়ে আসা হলো
  
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalFavorites: 0,
    totalLikes: 0,
  });
  const [loading, setLoading] = useState(true);

  // // 🎯 ৩. ইউজারের রোল বা প্ল্যান অনুযায়ী প্রিমিয়াম স্ট্যাটাস চেক (তোমার লজিক অনুযায়ী 'premium' বা 'admin' হলে true)
  const isPremium = session?.user?.role === "premium" || session?.user?.role === "admin";

  // const isPremium  = false;

  useEffect(() => {
    // যদি ইউজার লগইন করা থাকে, তার আইডি বা সেশন অনুযায়ী ডাটা ফেচ করতে পারো
    fetch("http://localhost:5000/user-stats") 
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading stats:", err);
        setLoading(false);
      });
  }, [session]); 

  return (
    <div className="space-y-6 mt-6 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-white/5 pb-5">
        <h1 className="text-3xl font-extrabold">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600 dark:text-slate-400">
          Track your recipes, favorites, and engagement in one place.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Recipes */}
        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/10 shadow-sm" radius="lg">
          <div className="p-6 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase font-semibold text-gray-500 dark:text-slate-400">Total Recipes</p>
              <h2 className="text-3xl font-bold mt-1">
                {loading ? "..." : stats.totalRecipes}
              </h2>
            </div>
            <div className="p-4 rounded-2xl bg-orange-500/15 text-orange-500 dark:text-orange-400">
              <FaUtensils size={24} />
            </div>
          </div>
        </Card>

        {/* Favorites */}
        <Card className="bg-gradient-to-br from-pink-500/10 to-rose-500/5 border border-pink-500/10 shadow-sm" radius="lg">
          <div className="p-6 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase font-semibold text-gray-500 dark:text-slate-400">Total Favorites</p>
              <h2 className="text-3xl font-bold mt-1">
                {loading ? "..." : stats.totalFavorites}
              </h2>
            </div>
            <div className="p-4 rounded-2xl bg-pink-500/15 text-pink-500 dark:text-pink-400">
              <FaHeart size={24} />
            </div>
          </div>
        </Card>

        {/* Likes */}
        <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-green-500/10 shadow-sm" radius="lg">
          <div className="p-6 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase font-semibold text-gray-500 dark:text-slate-400">Total Likes Received</p>
              <h2 className="text-3xl font-bold mt-1">
                {loading ? "..." : stats.totalLikes}
              </h2>
            </div>
            <div className="p-4 rounded-2xl bg-green-500/15 text-green-600 dark:text-green-400">
              <FaThumbsUp size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Premium Banner */}
      {/* 🎯 ৪. সেশন লোড হওয়া শেষ হলে এবং ইউজার প্রিমিয়াম না হলে ব্যানারটি দেখাবে */}
      {!isPending && !isPremium && (
        <Card className="overflow-hidden border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-orange-500/5 to-transparent shadow-sm" radius="lg">
          <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-3 text-amber-600 dark:text-yellow-400">
                <FaCrown /> Go Premium
              </h3>
              <p className="mt-2 text-sm max-w-xl text-gray-600 dark:text-slate-300">
               Free users can publish up to <strong>2 recipes</strong>. Upgrade to Premium for only <strong>$49.00 / monthly</strong> and unlock unlimited recipe publishing!
              </p>
            </div>
            <UpgradePremiumButton></UpgradePremiumButton>
          </div>
        </Card>
      )}
     
      {/* 👑 ২. ইউজার প্রিমিয়াম হলে এই স্পেশাল কার্ডটি দেখাবে */}
{isPremium && (
  <Card className="overflow-hidden border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent shadow-sm" radius="lg">
    <div className="p-8 flex flex-col md:flex-row items-center gap-5">
      <div className="p-4 rounded-2xl bg-amber-500/15 text-amber-500 dark:text-amber-400 shrink-0">
        <FaCrown size={32} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Premium Account Active
        </h3>
        <p className="text-sm text-gray-600 dark:text-slate-300 mt-2 max-w-xl">
          You have unlocked unlimited recipe publishing and premium features. Thank you for being a valuable member of our platform!
        </p>
      </div>
    </div>
  </Card>
)}
    </div>
  );
};

export default UserOverviewItems;