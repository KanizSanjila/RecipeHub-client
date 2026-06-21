"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User, Image as ImageIcon, Save, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";

// 💡 তোমার প্রজেক্টের যে ফোল্ডারে uploadImage ফাংশনটি আছে, সেখান থেকে এটি ইম্পোর্ট করো
// উদাহরণস্বরূপ utils বা helpers ফোল্ডারে থাকলে:
// import { uploadImage } from "@/utils/uploadImage"; 

export default function ProfilePage() {
  const { data: session, status } = useSession(); 
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  
  const [userProfile, setUserProfile] = useState({
    name: "",
    image: "",
    email: ""
  });

  // সেশন থেকে ডেটা লোড করা
  useEffect(() => {
    if (session?.user) {
      const profileData = {
        name: session.user.name || "User",
        email: session.user.email || "",
        image: session.user.image || ""
      };
      setUserProfile(profileData);
      setValue("name", profileData.name);
    }
  }, [session, setValue]);

 const onSubmit = async (data) => {
  setLoading(true);
  try {
    let imageUrl = userProfile.image; // ডিফল্ট বা আগের ছবি

    // যদি ইউজার নতুন কোনো ছবি সিলেক্ট করে থাকে
    if (data.image && data.image[0]) {
      const imageFile = data.image[0];
      
      // তোমার ফাংশন কল করা হচ্ছে
      const uploadedUrl = await uploadImage(imageFile); 
      
      // যদি সফলভাবে লিংক আসে, তবেই কেবল imageUrl আপডেট হবে
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        // যদি আপলোড ফেইল হয়ে null আসে, তবে পুরো ফর্ম সাবমিট হওয়া এখানেই আটকে যাবে
        setLoading(false);
        return; 
      }
    }

    // ডাটাবেজে পাঠানোর জন্য অবজেক্ট তৈরি
    const updatedProfile = {
      ...userProfile,
      name: data.name.trim(),
      image: imageUrl,
    };
    
    setUserProfile(updatedProfile);
    toast.success("Profile updated successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update profile");
  } finally {
    setLoading(false);
  }
};

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 transition-colors my-5">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Profile</h2>

      {/* লাইভ প্রিভিউ কার্ড */}
      <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl mb-8 border border-gray-100 dark:border-gray-800">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-orange-500 shadow-md mb-4 bg-gray-200 flex items-center justify-center">
          {userProfile.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={userProfile.image} 
              alt="Profile Avatar" 
              className="w-full h-full object-cover"
              onError={() => setUserProfile(prev => ({ ...prev, image: "" }))}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white text-3xl font-bold uppercase select-none">
              {userProfile.name ? userProfile.name.charAt(0) : "U"}
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{userProfile.name || "User Name"}</h3>
      </div>

      {/* ফর্ম */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <User size={16} className="text-gray-400" /> Full Name *
          </label>
          <input 
            required 
            type="text" 
            {...register("name")} 
            className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500" 
            placeholder="Enter your full name" 
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <ImageIcon size={16} className="text-gray-400" /> Update Profile Image
          </label>
          <input 
            type="file" 
            accept="image/*"
            id="image"
            {...register("image")} 
            className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} /> Save Changes</>}
        </button>
      </form>
    </div>
  );
}