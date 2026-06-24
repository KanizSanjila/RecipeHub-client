import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardFooter, Button } from "@heroui/react";
import { FaCrown, FaCheckCircle, FaArrowRight, FaCheck, FaUtensils } from "react-icons/fa";
import Link from 'next/link';

export default async function Success({ searchParams }) {
const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams?.session_id;

  let session = null;

  // 🎯 sessionId থাকলে স্ট্রাইপ থেকে ডেটা ফেচ করা
  if (sessionId) {
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['customer'],
      });
    } catch (error) {
      console.error("Stripe error:", error);
    }
  }

  // ইমেইলটি বের করার জন্য ব্যাকআপ লজিক (যা কখনোই null হবে না)
  const userEmail = session?.customer_details?.email || session?.customer_email;
    return (
  <div className="min-h-[85vh] flex items-center justify-center bg-amber-50/20 px-4 py-16">
      
      {/* 🥞 রেসিপি হাব প্রিমিয়াম লাইট কার্ড */}
      <Card className="w-full max-w-md border border-orange-100 bg-white shadow-[0_20px_50px_-12px_rgba(234,88,12,0.06)] p-8 text-center" radius="3xl">
        
        {/* 👑 হেডার সেকশন */}
        <CardHeader className="flex flex-col items-center pb-4">
          {/* শেফ ও ক্রাউন মিক্সড গোল্ডেন আইকন */}
          <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-tr from-amber-500 to-orange-500 rounded-full text-white shadow-md shadow-orange-500/20 mb-4">
            <FaUtensils size={24} />
            <div className="absolute -top-1 -right-1 bg-yellow-400 p-1 rounded-full text-slate-900 border-2 border-white shadow-sm">
              <FaCrown size={10} />
            </div>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
            Welcome Chef!
          </h1>
          
          <p className="text-gray-500 text-xs mt-1.5 font-semibold tracking-wide uppercase">
            {userEmail && (
              <span className="text-orange-600 block font-bold normal-case mb-0.5">{userEmail}</span>
            )}
            Premium Chef Membership Activated
          </p>
        </CardHeader>

        {/* 🍳 রেসিপি হাব আনলকড ফিচারস */}
        <div className="py-6 my-2 border-y border-gray-100 text-left space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 p-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200/50 shrink-0">
              <FaCheck size={10} />
            </div>
            <div>
              <h4 className="text-slate-900 text-sm font-bold">Unlimited Recipe Publishing</h4>
              <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                The 2-recipe limit has been permanently lifted! Share your culinary creations without any restrictions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 p-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200/50 shrink-0">
              <FaCheck size={10} />
            </div>
            <div>
              <h4 className="text-slate-900 text-sm font-bold">Premium Badge & Profile Visibility</h4>
              <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                Get a sparkling &apos;Premium Chef&apos; badge on your recipes and stand out at the top of the feed.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 p-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200/50 shrink-0">
              <FaCheck size={10} />
            </div>
            <div>
              <h4 className="text-slate-900 text-sm font-bold">Advanced Engagement Analytics</h4>
              <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                Track who is liking, saving, and viewing your recipes in real time from your kitchen dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* 🔘 সিগনেচার ডার্ক-অরেঞ্জ বাটন */}
        <CardFooter className="pt-6 pb-0 flex justify-center">
          <Link href="/dashboard/user" className="w-full">
            <Button
              className="w-full bg-slate-950 text-white font-bold h-12 hover:bg-orange-600 active:scale-[0.98] transition-all duration-200 tracking-wide text-xs uppercase shadow-sm cursor-pointer"
              radius="xl"
              endContent={<FaArrowRight className="text-xs" />}
            >
              Open Kitchen Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
    )
}