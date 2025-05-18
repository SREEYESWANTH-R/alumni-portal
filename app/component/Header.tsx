// components/ui/Header.tsx
"use client";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { getDetailsfromToken } from "@/app/lib/getDetails";


export default function Header() {
    const router = useRouter();
    const pathName = usePathname();
    const [showDropdown, setShowDropdown] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const name = getDetailsfromToken();
        if (name) setUsername(name);
    }, []);

    const handleLogout = () => {
        try {
            localStorage.removeItem("userToken");
            router.push("/login");
        } catch (error: unknown) {
            console.log((error as Error).message)
        }
    }



    return (
        <header className="relative z-10 flex items-center justify-between p-4">
            <Link href={"/home/feed"}>
                <Image src={logo} alt="logo" className="w-32" />
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href={`/home/${username}/articles`}>Article</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    {/* <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/learning">Learning</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem> */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href={`/home/${username}/jobs`}>Job</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    {/* <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href={`/home/${username}/meetings`}>Meetings</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem> */}

                </NavigationMenuList>

            </NavigationMenu>

            {/* Home menu bar */}

            {!["/", "/register", "/login"].includes(pathName) && <div className="relative hidden md:block">
                <button onClick={() => setShowDropdown(!showDropdown)}>
                    <Image
                        src="https://github.com/shadcn.png"
                        alt="Avatar"
                        className="w-10 h-10 rounded-full border"
                        width={10}
                        height={10}
                    />
                </button>

                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow border">
                        <div className="px-4 py-2 border-b text-sm font-semibold">My Account</div>
                        {username && (
                            <>
                                <Link href={`/profile/${username}`} className="block px-4 py-2 hover:bg-gray-100">
                                    Profile
                                </Link>
                                <Link href={`/profile/${username}/create-post`} className="block px-4 py-2 hover:bg-gray-100">
                                    Create Post
                                </Link>

                            </>
                        )}
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                    </div>
                )}
            </div>}

            {/* Desktop Buttons */}
            {
                ["/", "/register", "/login"].includes(pathName) && <div className="hidden md:flex gap-2">
                    <Button onClick={() => router.push("/register")}>Join Now</Button>
                    <Button onClick={() => router.push("/login")} variant="outline">Sign In</Button>
                </div>
            }

            {/* Mobile Menu (Sheet) */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 px-5">
                        <div className="flex flex-col gap-4 mt-6">
                            <Link href="/article">
                                <p className="hover:underline">Article</p>
                            </Link>
                            <Link href="/learning">
                                <p className="hover:underline">Learning</p>
                            </Link>
                            <Link href="/job">
                                <p className="hover:underline">Job</p>
                            </Link>
                            <Link href="/meetings">
                                <p className="hover:underline">Meetings</p>
                            </Link>
                            <div className="pt-4 space-y-2">
                                <Button className="w-full" onClick={() => router.push("/register")}>Join Now</Button>
                                <Button className="w-full" onClick={() => router.push("/login")} variant="outline">Sign In</Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header >
    );
}
