import toast from 'react-hot-toast';

export const uploadImage = async (imageFile) => {
  if (!imageFile) {
    toast.error("No image file selected");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return data.data.url; 
    }

    console.error("ImgBB API Error:", data);
    toast.error(data?.error?.message || 'Image upload failed');
    return null;

  } catch (error) {
    console.error("Network error during image upload:", error);
    toast.error('Network error or server unreachable');
    return null;
  }
};