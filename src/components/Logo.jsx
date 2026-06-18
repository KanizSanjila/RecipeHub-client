import Link from "next/link";
import { FaUtensils } from "react-icons/fa";

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg text-white shadow-md shadow-pink-500/20">
                <FaUtensils className="text-xl" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                RecipeHub
            </span>
        </Link>
    );
};

export default Logo;