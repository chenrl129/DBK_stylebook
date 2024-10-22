import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { Tables } from "@/lib/utils/types";

interface MobileSidebarProps {
    initialData: Tables<'stylebook'>[];
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ initialData }) => {
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
                <Sidebar initialData={initialData} />
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;
