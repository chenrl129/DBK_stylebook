"use client";

import { Separator } from "@/components/ui/separator"
import data from "@/lib/stylebook.json";

interface MainSectionProps {
    searchInput: string;
}

const MainSection: React.FC<MainSectionProps> = ({ searchInput }) => {
    const lowercasedSearchInput = searchInput.toLowerCase();

    return (
        <div>
            {Object.keys(data).map((letter, index) => {
                const filteredItems = (data as {[key: string]: any})[letter]
                    .filter((item: any) => {
                        const title = Object.keys(item)[0].toLowerCase();
                        const definition = item[Object.keys(item)[0]].definition.toLowerCase();
                        return title.includes(lowercasedSearchInput) || definition.includes(lowercasedSearchInput);
                    });

                if (filteredItems.length === 0) {
                    return null; 
                }

                return (
                    <div key={index} className="mb-4">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{letter}</h1>
                            <Separator className="my-4"/>
                        </div>
                        
                        {filteredItems.map((item: any, itemIndex: number) => {
                            const title = Object.keys(item)[0];
                            const content = item[title];
                            return (
                                <div key={itemIndex}
                                    id={title}
                                    className="relative block overflow-hidden rounded-lg border border-gray-100 my-6 p-4 sm:p-6 lg:p-8"
                                >
                                    <span
                                        className="absolute inset-x-0 bottom-0 h-2 bg-red-500"
                                    ></span>

                                    <div className="sm:flex sm:justify-between sm:gap-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                                {title}
                                            </h3>

                                            {content.important && <p className="mt-1 text-xs font-medium text-red-600">Important</p>}
                                            {content.sports && <p className="mt-1 text-xs font-medium text-red-600">Sports</p>}
                                            {content.ap && <p className="mt-1 text-xs font-medium text-red-600">AP Deviation</p>}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        {content.definition && content.definition.split('\n').map((line: string, lineIndex: number) => (
                                            <p key={lineIndex} className="text-sm text-gray-500">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default MainSection;
