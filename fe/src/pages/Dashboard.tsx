import { Button } from '../components/Button';
import { PlusIcon } from '../../Icons/PlusIcon';
import { ShareIcon } from '../../Icons/ShareIcon';
import { CardContent } from '../components/Card';
import { CreateModel } from '../components/CreateModel';
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../../hooks/useContent';

export const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const { content, loading, error } = useContent();

    // Transform the data to match CardContent expectations
    type ContentItem = {
        _id?: string;
        type: string;
        title: string;
        content?: string;
        tags?: Array<string | { title?: string; name?: string }>;
        link?: string;
    };

    const transformContentForCard = (item: ContentItem) => {
        return {
            type: item.type as "text" | "image" | "video" | "audio" | "twitter", // Type assertion
            title: item.title,
            content: item.content || '', // Ensure content is never undefined
            tags: item.tags
                ? item.tags
                    .map(tag => typeof tag === 'string' ? tag : tag.title || tag.name)
                    .filter((tag): tag is string => typeof tag === 'string' && !!tag)
                : [], // Handle both populated and unpopulated tags
            link: item.link || undefined
        };
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            
            <div className={`transition-all duration-300 p-8 ${
                isSidebarOpen ? 'md:ml-64 lg:ml-80' : 'ml-0'
            }`}>
                <div className="flex justify-end p-4 gap-4">
                    <Button 
                        startIcon={<PlusIcon />}
                        variant="primary"
                        text="Add Post"
                        size="sm"
                        onClick={() => setOpen(true)}
                    />
                    <Button 
                        startIcon={<ShareIcon />}
                        variant="secondary"
                        text="Share Posts"
                        size="sm"
                        onClick={() => alert("Hello, World")}
                    />
                </div>
                
                <CreateModel open={open} onClose={() => setOpen(false)} />
                
                <div className="justify-center relative flex items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Nesting Posts.org@community
                    </h1>
                </div>
                
                <div className="flex flex-wrap items-start justify-center gap-4 bg-gray-50 p-4">
                    {loading && (
                        <div className="flex items-center justify-center w-full">
                            <div className="text-gray-600">Loading your posts...</div>
                        </div>
                    )}
                    
                    {error && (
                        <div className="flex items-center justify-center w-full">
                            <div className="text-red-500 bg-red-50 p-4 rounded-lg">
                                Error: {error}
                            </div>
                        </div>
                    )}
                    
                    {!loading && !error && content && content.length > 0 ? (
                        content.map((item, index) => {
                            const transformedItem = transformContentForCard(item);
                            return (
                                <CardContent
                                    key={item._id || index}
                                    type={transformedItem.type}
                                    title={transformedItem.title}
                                    content={transformedItem.content}
                                    tags={transformedItem.tags}
                                    link={transformedItem.link}
                                />
                            );
                        })
                    ) : (
                        !loading && !error && (
                            <div className="flex items-center justify-center w-full">
                                <div className="text-center text-gray-500 bg-white p-8 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                                    <p className="text-sm">Click "Add Post" to create your first post!</p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};