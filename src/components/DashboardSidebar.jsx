import Logo from "@/components/Logo";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { FaBookOpen, FaChartBar, FaHeart, FaHome, FaMoneyCheckAlt, FaPlus, FaShoppingBag, FaSignOutAlt, FaTachometerAlt, FaUserCircle, FaUsers, FaUtensils } from "react-icons/fa";

const DashboardSidebar = () => {
      const { data: session } = useSession();
           const handleLogout = () => {
    
      }
    
            const userMenu = [
        { key: "overview", label: "Overview", icon:  FaTachometerAlt, href: "/dashboard/user" },
        { key: "add-recipe", label: "Add Recipe ", icon: FaPlus, href: "/dashboard/user/add-recipe" },
        { key: "my-recipes", label: "My Recipes", icon: FaBookOpen, href: "/dashboard/user/my-recipes" },
        { key: "my-favorites", label: "My Favorites", icon:   FaHeart, href: "/dashboard/user/my-favorites" },
        { key: "my-purchased-recipes", label: "My purchased recipes", icon:  FaShoppingBag, href: "/dashboard/user/my-purchased-recipes" },
        { key: "profile", label: "Profile", icon:  FaUserCircle, href: "/dashboard/user/profile" },
      ]
    
        const adminMenu = [
        { key: "overview", label: "Overview", icon:  FaTachometerAlt, href: "/dashboard/overview" },
        { key: "manage-users", label: "Manage Users", icon: FaUsers, href: "/dashboard/manage-users" },
        { key: "manage-recipes", label: "Manage Recipes", icon: FaUtensils, href: "/dashboard/manage-recipes" },
        { key: "reports", label: "Reports", icon:  FaChartBar, href: "/dashboard/reports" },
        { key: "transaction", label: "Transaction", icon:  FaMoneyCheckAlt, href: "/dashboard/transaction" },
      ]
            const role = session?.user?.role;
    
              const menuItems = role === "user" ? userMenu : role === "admin" ? adminMenu : null;
    return (
       <aside className="w-64 h-screen border-r  bg-gray-200">
                <div className="h-full flex flex-col  backdrop-blur-xl">
      {/* Brand / Logo */}
      <div className="px-6 py-5 border-b border-white/5">
        <Logo />
      </div>

      {/* User Profile */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500/60 shrink-0">
            <Image
              width={40}
              height={40}
              src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent("Jane Doe")}&background=7c3aed&color=fff&bold=true`}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="overflow-hidden">
            <p className=" text-sm font-bold truncate leading-tight">
              {session?.user?.name}
            </p>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${role === "admin" ? "text-yellow-400" :  "text-red-600"}`}>
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest px-3 pb-2">Navigation</p>
       {
        menuItems?.map(({ key, label, icon: Icon, href })=>{

            return(
                 <Link
                  key={key}
                  href={href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left cursor-pointer hover:bg-white/5"
                            `}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors`}>
                    <Icon size={20} />
                  </span>
                  <span>{label}</span>


                  {/* {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-400" />} */}
                </Link>
            )
        })
       }
      </nav>

      {/* Bottom Links */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold  hover:bg-white/5 transition-all duration-150">
          <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <FaHome size={13} />
          </span>
          Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold hover:text-red-800 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
        >
          <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <FaSignOutAlt size={13} />
          </span>
          Sign Out
        </button>
      </div>
    </div>
            </aside>
    );
};

export default DashboardSidebar;