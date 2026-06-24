"use client";
import { Button } from "@heroui/react";

const UpgradePremiumButton = () => {
        const updateToPremium = async () => {
        const res = await fetch("/api/checkout_sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ type: "subscription" })
        });
        const data = await res.json();
        console.log(data);
        if (data?.url) {
            window.location.href = data.url;
        }

    }

    return (
        <Button onClick={updateToPremium} radius="lg" className="bg-yellow-500 text-black font-bold px-8 h-12 hover:bg-yellow-600 transition-colors cursor-pointer">
                      Upgrade Now
                    </Button>
    );
};

export default UpgradePremiumButton;