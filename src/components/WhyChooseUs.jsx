import { BookOpen, Award, Users, ShieldCheck } from 'lucide-react'; 

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-orange-500" />,
    title: "10k+ Verified Recipes",
    desc: "Explore a massive collection of diverse, thoroughly tested global recipes."
  },
  {
    icon: <Award className="w-8 h-8 text-orange-500" />,
    title: "Premium Cooking Perks",
    desc: "Go Premium to unlock unlimited recipe publishing and exclusive culinary badges."
  },
  {
    icon: <Users className="w-8 h-8 text-orange-500" />,
    title: "Active Food Community",
    desc: "Interact with passion-driven home cooks, share honest feedback, and like creations."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
    title: "Secured & Safe Platform",
    desc: "Enjoy safe recipe monetization with fully secure Stripe integration."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Why Foodies Love RecipeHub
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            We connect thousands of food lovers daily to share, learn, and grow their passion for cooking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center hover:shadow-md transition-all duration-300"
            >
              <div className="p-4 bg-orange-50 dark:bg-orange-950/40 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}