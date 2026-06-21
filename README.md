#  RecipeHub — Recipe Sharing Platform (Client-Side)

RecipeHub is a dynamic, fully responsive web application where food enthusiasts can create, share, discover, and manage their favorite recipes. It offers a centralized space for culinary inspiration, featuring premium membership tiers, secured payment processing, interactive community features, and a robust admin management system.

---

##  Live Demo & Deployments
- **Live Site URL:** 

---

##  Features

###  For Users (Normal & Premium)
- **Dynamic Recipe Feed:** Browse recipes with advanced server-side pagination and category filtering (`MongoDB $in`).
- **Recipe Details:** View full instructions, ingredients, like recipes, or report inappropriate content via interactive modals.
- **Recipe Management:** Normal users can publish up to **2 recipes**. Upgrading to Premium unlocks unlimited recipe creations.
- **Stripe Integration:** Single recipe purchases and seamless Premium Membership upgrades with secure transaction logging.
- **Personalized Dashboards:** Tracks user analytics (Total Recipes, Favorites, Likes) along with custom profiles (ImgBB upload integration).
- **Favorites & Bookmarks:** Save recipes to a personalized wishlist.

###  For Admins
- **User Management:** Monitor community activity with abilities to block/unblock users.
- **Recipe Moderation:** Edit, delete, or promote high-quality recipes to the **Featured Recipes** section on the Home Page.
- **Report Analytics:** Dismiss or take action on reported spam, offensive content, or copyright violations.

### Core Enhancements
- **Dark / Light Theme:** Native theme toggle for comfortable night-time cooking.
- **Smooth Animations:** Integrated with `Framer Motion` for high-quality, professional UI transitions.
- **Secure Authentication:** Built using robust JWT / Better Auth practices ensuring route protections persist even after page reloads.

---

## Tech Stack & Libraries Used

- **Framework:** React.js / Next.js (App Router)
- **Styling:** Tailwind CSS, Lucide React (Icons)
- **Animation:** Framer Motion
- **State & Context:** React Context API
- **Authentication:** JWT Authentication / Better Auth
- **Payment Gateway:** Stripe Checkout
- **Database Layer:** MongoDB (connected via secure server APIs)

---

## Getting Started & Local Installation

Follow these steps to run the client-side of RecipeHub locally: