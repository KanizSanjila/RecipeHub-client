const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addRecipe = async (recipe) => {
  const res = await fetch(`${baseUrl}/api/recipe`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(recipe),
  });

  const data = await res.json();

  return data;
};