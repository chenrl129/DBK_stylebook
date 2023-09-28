"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    
    return (
        <Sheet>
            <SheetTrigger>
                <div className="flex flex-row justify-start">
                    <Button variant="ghost" size="icon" className="md:hidden mt-4 ml-4">
                        <Menu />
                    </Button>
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="p-2">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;