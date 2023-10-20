import { Separator } from "@/components/ui/separator";
import { supabase } from '@/lib/api';
import { useEffect, useState } from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { processMarkdown } from '@/lib/remark';


import { PenSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MainSectionProps {
    searchInput: string;
}

const MainSection: React.FC<MainSectionProps> = ({ searchInput }) => {
    const [data, setData] = useState<any[]>([]);
    const [editedContent, setEditedContent] = useState<string>('');
    const [isEditing, setIsEditing] = useState<string | null>(null);

    const [processedMarkdown, setProcessedMarkdown] = useState<string>('');

    useEffect(() => {
        fetchData();
        
        async function processDefinitions() {
            const processed = await Promise.all(
                data.map(async (item) => {
                    const processedItem = { ...item };
                    if (item.definition) {
                        processedItem.definition = await processMarkdown(item.definition);
                    }
                    return processedItem;
                })
            );
            setData(processed);
        }

        if (data.length > 0) {
            processDefinitions();
        }
    }, [data]);

    const fetchData = async () => {
        const { data: fetchedData, error } = await supabase
            .from('stylebook')
            .select()
            .order('id', { ascending: true }); 
    
        if (error) {
            console.error('Error fetching data:', error);
        } else {
            setData(fetchedData || []);
        }
    };

    const lowercasedSearchInput = searchInput.toLowerCase();

    const highlightText = (text: string) => {
        const parts = text.split(new RegExp(`(${searchInput})`, 'gi'));
        return <span>{parts.map((part, i) =>
            part.toLowerCase() === lowercasedSearchInput 
                ? <span key={i} className="bg-yellow-300">{part}</span> 
                : part 
        )}</span>;
    };

    const filteredData = data.filter(item => 
        item.term.toLowerCase().includes(lowercasedSearchInput) || 
        (item.definition && item.definition.toLowerCase().includes(lowercasedSearchInput))
    );
    

    const groupedByLetter = filteredData.reduce((groups, item) => {
        const letter = item.letter;
        if (!groups[letter]) {
            groups[letter] = [];
        }
        groups[letter].push(item);
        return groups;
    }, {} as { [key: string]: any[] });

    const updateContent = async (id: number, content: string) => {
        const { data, error } = await supabase
            .from('stylebook')
            .update({ definition: content })
            .eq('id', id)
    
        if (error) {
            console.error('Error updating content:', error)
        } else {
            console.log(data)
            fetchData();
        }
    };
    

    const sortedLetters = Object.keys(groupedByLetter).sort();

    return (
        <div>
            {sortedLetters.map((letter, index) => (
                <div key={index} className="mb-4">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{letter}</h1>
                        <Separator className="my-4"/>
                    </div>
                    {groupedByLetter[letter].map((item: any, itemIndex: number) => (
                        <div
                            key={itemIndex}
                            id={item.term}
                            className="relative block overflow-hidden rounded-lg border border-gray-100 my-6 p-4 sm:p-6 lg:p-8"
                        >
                            <span className="absolute inset-x-0 bottom-0 h-2 bg-red-500"></span>
                            <div className="sm:flex sm:justify-between sm:gap-4">
                                <div className="w-full flex flex-row justify-between">
                                    <div>
                                        <div className="w-full flex flex-row justify-between items-center">
                                            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                                {highlightText(item.term)}
                                            </h3>
                                        </div>
                                        
                                        {item.important && <p className="mt-1 text-xs font-medium text-red-600">Important</p>}
                                        {item.sports && <p className="mt-1 text-xs font-medium text-red-600">Sports</p>}
                                        {item.ap && <p className="mt-1 text-xs font-medium text-red-600">AP Deviation</p>}
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <div className="">
                                            {isEditing === item.term ? (
                                                <Button variant="outline" className="" onClick={() => { updateContent(item.id, editedContent); setIsEditing(null); }}>Save</Button>
                                            ) : (
                                                <Button variant="outline" size="icon" className="" onClick={() => { setIsEditing(item.term); setEditedContent(item.definition); }}>
                                                    <PenSquare className="h-6 w-6"/>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                {isEditing !== item.term && typeof item.definition === 'string' &&
                                    <div className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: item.definition }} />
                                }
                                {isEditing === item.term && <SimpleMDE value={editedContent} onChange={(value) => setEditedContent(value)} />}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default MainSection;