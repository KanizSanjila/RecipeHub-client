"use client";
import Link from "next/link";
import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form} from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { uploadImage } from "@/utils/uploadImage";
import { redirect } from "next/navigation";

export default function RegisterPage() {
     const { register, handleSubmit, formState: { errors } } = useForm();
    //  console.log(errors)

      const onSubmit = async (data) => {
        const imageFile = data.image[0];
       const imageUrl = await uploadImage(imageFile)
    //    console.log(imageUrl);

        const { data: signUpData, error: signUpError } = await authClient.signUp.email({
           email:data.email,
           password:data.password,
           name:data.name,
           image:imageUrl,
           role:data.role
        })

        // console.log(signUpData,signUpError);

        if(signUpError){
            toast.error("User already exists. Use another email.")
        }
        else{
            redirect("/")
        }

    }
    return (
        <Card className="w-full max-w-lg border border-white/5 bg-white backdrop-blur-xl shadow-2xl p-4 mx-auto">
            <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
                <Logo />
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    Create an Account
                </h1>
                <p className="text-black text-sm mt-1">
                   Join RecipeHub to discover delicious recipes, share your own creations, and connect with food lovers around the world.
                </p>
            </CardHeader>
            <CardBody className="gap-4">
                <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                     {...register("name", { required: "Name is Required" })}
                        id="name"
                        placeholder="John Doe"
                        labelPlacement="outside"
                        startContent={<FaUser className="text-black text-sm" />}
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                    />
                      {
                      errors.name && <p className="text-red-500">{errors.name.message}</p>
                        }
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                          {...register("email", { required: "Email is Required" })}
                        id="email"
                        placeholder="john@example.com"
                        type="email"
                        labelPlacement="outside"
                        startContent={<FaEnvelope className="text-slate-400 text-sm" />}
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                    />
                        {
                            errors.email && <p className="text-red-500">{errors.email.message}</p>
                        }
                    <Label htmlFor="image">Profile Image URL</Label>
                    <Input
                     {...register("image", { required: "image is Required" })}
                        id="image"
                        type="file"
                        accept="image/*"
                        placeholder="https://example.com/avatar.jpg"
                        labelPlacement="outside"
                        startContent={<FaImage className="text-slate-400 text-sm" />}
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                    />
                     {
                            errors.image && <p className="text-red-500">{errors.image.message}</p>
                        }
                    <Label htmlFor="password">Password</Label>
                    <Input
                       {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                    message:
                                        "Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, and one number",
                                },
                            })}
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        labelPlacement="outside"
                        startContent={<FaLock className="text-slate-400 text-sm" />}
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                    />
                       {
                            errors.password && <p className="text-red-500">{errors.password.message}</p>
                        }
                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="role" className="text-sm font-semibold text-black">Select Role</Label>
                       <select
                                id="role"
                                {...register("role", { required: "Role is required" })} className="w-full bg-slate-900/50 border-none  p-3">
                                <option value="user">
                                    User
                                </option>
                            </select>
                    </div>
                         {
                                errors.role && <p className="text-red-500">{errors.role.message}</p>
                            }
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
                        radius="lg"
                    >
                        Create Account
                    </Button>
                </Form>

                <div className="flex items-center my-3">
                    <div className="flex-grow border-t border-white/5" />
                    <span className="mx-4 text-xs text-black font-semibold uppercase">Or Sign Up With</span>
                    <div className="flex-grow border-t border-white/5" />
                </div>

                <Button
                    variant="bordered"
                    className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-black font-semibold h-11"
                    radius="lg"
                    startContent={<FaGoogle className="text-pink-500" />}
                >
                    Google OAuth
                </Button>

                <p className="text-center text-sm text-slate-400 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-red-500 hover:text-pink-400 font-semibold hover:underline">
                        Log In
                    </Link>
                </p>
            </CardBody>
        </Card>
    );
}
