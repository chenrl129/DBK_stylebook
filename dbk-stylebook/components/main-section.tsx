import { Separator } from "@/components/ui/separator";
import { supabase } from '@/lib/api';
import { useEffect, useState } from 'react';

interface MainSectionProps {
    searchInput: string;
}

const MainSection: React.FC<MainSectionProps> = ({ searchInput }) => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data: fetchedData, error } = await supabase
                .from('stylebook')
                .select();

            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setData(fetchedData || []);
            }
        };

        fetchData();
    }, []);

    const lowercasedSearchInput = searchInput.toLowerCase();

    const highlightText = (text: string) => {
        if (searchInput.length < 2) {
            return text;
        } else {
            const parts = text.split(new RegExp(`(${searchInput})`, 'gi'));
            return <span> { parts.map((part, i) => 
            part.toLowerCase() === lowercasedSearchInput 
                ? <span key={i} className="bg-yellow-300">{part}</span> 
                : part 
            )} </span>;
        }
    }

    const filteredData = data.filter(item => 
        item.term.toLowerCase().includes(lowercasedSearchInput) || 
        item.definition.toLowerCase().includes(lowercasedSearchInput)
    );

    const groupByLetter = (items: any[]) => {
        return items.reduce((result, item) => {
            const letter = item.letter;
            if (!result[letter]) {
                result[letter] = [];
            }
            result[letter].push(item);
            return result;
        }, {} as { [key: string]: any[] });
    };

    const groupedData = groupByLetter(filteredData);

    return (
        <div>
            {Object.keys(groupedData).map((letter, index) => (
                <div key={index} className="mb-4">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{letter}</h1>
                        <Separator className="my-4"/>
                    </div>
                    {groupedData[letter].map((item: any, itemIndex: number) => (
                        <div
                            key={itemIndex}
                            id={item.term}
                            className="relative block overflow-hidden rounded-lg border border-gray-100 my-6 p-4 sm:p-6 lg:p-8"
                        >
                            <span className="absolute inset-x-0 bottom-0 h-2 bg-red-500"></span>

                            <div className="sm:flex sm:justify-between sm:gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                        {highlightText(item.term)}
                                    </h3>

                                    {item.important && <p className="mt-1 text-xs font-medium text-red-600">Important</p>}
                                    {item.sports && <p className="mt-1 text-xs font-medium text-red-600">Sports</p>}
                                    {item.ap && <p className="mt-1 text-xs font-medium text-red-600">AP Deviation</p>}
                                </div>
                            </div>

                            <div className="mt-4">
                            {typeof item.definition === 'string' && item.definition.split('\n').map((line: string, lineIndex: number) => (
                                <p key={lineIndex} className="text-sm text-gray-500">
                                    {highlightText(line)}
                                </p>
                            ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default MainSection;
