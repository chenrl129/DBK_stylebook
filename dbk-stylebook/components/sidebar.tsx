"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import data from "@/lib/stylebook.json"; // Importing the JSON data

const Sidebar = () => {
    const handleScroll = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <ScrollArea className="w-full h-full">
                <div className="flex h-screen flex-col justify-between border-e bg-white">
                    <div className="px-4">
                        <ul className="mt-6 space-y-1">
                            {
                                Object.keys(data).map((letter: string) => (
                                    <li key={letter}>
                                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                                            <summary
                                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                            >
                                                <span className="text-sm font-medium">{letter}</span> {/* Displaying the letter here */}

                                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            </summary>

                                            <ul className="mt-2 space-y-1 px-4">
                                                {
                                                    (data as {[key: string]: any})[letter].map((item: any, index: number) => {
                                                        const title = Object.keys(item)[0];
                                                        return (
                                                            <li key={index}>
                                                                <a
                                                                    onClick={(e) => handleScroll(e, title)} // Updated line
                                                                    className="hover:cursor-pointer block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                                >
                                                                    {title}
                                                                </a>

                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </details>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}

export default Sidebar;
