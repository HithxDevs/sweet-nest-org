import { Share2, Trash2, FileText, Image, Video, Music, ExternalLink, MoreHorizontal, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CardProps {
    type: "text" | "image" | "video" | "audio" | "twitter";
    title: string;
    content: string;
    tags?: string[];
    link?: string;
}

export const CardContent = ({ type, title, content, tags, link }: CardProps) => {
    const [twitterEmbedLoaded, setTwitterEmbedLoaded] = useState(false);

    // Load Twitter embed script
    useEffect(() => {
        if (type === 'twitter' && !twitterEmbedLoaded) {
            const script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            script.onload = () => setTwitterEmbedLoaded(true);
            document.body.appendChild(script);

            return () => {
                // Cleanup script if component unmounts
                const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
                if (existingScript) {
                    document.body.removeChild(existingScript);
                }
            };
        }
    }, [type, twitterEmbedLoaded]);

    // Extract Twitter/X post ID from URL
    const extractTwitterId = (url: string): string => {
        if (!url) return '';
        const patterns = [
            /twitter\.com\/\w+\/status\/(\d+)/,
            /x\.com\/\w+\/status\/(\d+)/
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        return '';
    };

    // Extract YouTube video ID from URL or return the ID if already provided
    const extractYouTubeId = (url: string): string => {
        if (!url) return '';
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
            /youtube\.com\/watch\?.*v=([A-Za-z0-9_-]{11})/
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        return url;
    };

    // Get the appropriate icon based on type
    const getTypeIcon = () => {
        switch (type) {
            case "text":
                return <FileText className="w-4 h-4 text-blue-600" />;
            case "image":
                return <Image className="w-4 h-4 text-blue-600" />;
            case "video":
                return <Video className="w-4 h-4 text-blue-600" />;
            case "audio":
                return <Music className="w-4 h-4 text-blue-600" />;
            case "twitter":
                return <Twitter className="w-4 h-4 text-blue-600" />;
            default:
                return <FileText className="w-4 h-4 text-blue-600" />;
        }
    };

    const renderContent = () => {
        switch (type) {
            case "text":
                return (
                    <div className="p-4">
                        <p className="text-gray-800 text-sm leading-relaxed mb-3">
                            {content}
                        </p>
                        {link && (
                            <a 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                            >
                                🔗 View Link
                                <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                        )}
                    </div>
                );

            case "image":
                return (
                    <div>
                        {link && (
                            <div className="w-full h-48 bg-gray-100">
                                <img 
                                    src={link} 
                                    alt={content}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        )}
                        <div className="p-4">
                            <p className="text-gray-700 text-sm italic">{content}</p>
                        </div>
                    </div>
                );

            case "video":
                { const videoId = link ? extractYouTubeId(link) : '';
                return (
                    <div >
                        {videoId ? (
                            <div className="relative w-full h-48 bg-black">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                                <div className="text-center">
                                    <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500 text-sm">No video available</p>
                                </div>
                            </div>
                        )}
                        <div className="p-4">
                            <p className="text-gray-700 text-sm">{content}</p>
                        </div>
                    </div>
                ); }

            case "audio":
                return (
                    <div className="p-4">
                        <p className="text-gray-800 text-sm font-medium mb-3">{content}</p>
                        {link ? (
                            <div className="bg-gray-50 rounded-lg p-3">
                                <audio 
                                    controls 
                                    className="w-full"
                                >
                                    <source src={link} type="audio/mpeg" />
                                    <source src={link} type="audio/wav" />
                                    <source src={link} type="audio/ogg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-lg p-4 text-center">
                                <Music className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">No audio file provided</p>
                            </div>
                        )}
                    </div>
                );

            case "twitter":
                { const tweetId = link ? extractTwitterId(link) : '';
                return (
                    <div className="p-4">
                        <p className="text-gray-800 text-sm mb-3">{content}</p>
                        {tweetId ? (
                            <div className="bg-gray-50 rounded-lg p-4">
                                {/* Method 1: Official Twitter Embed */}
                                <blockquote className="twitter-tweet" data-theme="light">
                                    <p lang="en" dir="ltr">Loading tweet...</p>
                                    <a href={link}>View Tweet</a>
                                </blockquote>
                                
                                {/* Fallback link */}
                                <div className="mt-2 pt-2 border-t border-gray-200">
                                    <a 
                                        href={link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                                    >
                                        🐦 View on X/Twitter
                                        <ExternalLink className="w-3 h-3 ml-1" />
                                    </a>
                                </div>
                            </div>
                        ) : link ? (
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-center">
                                    <Twitter className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500 text-sm mb-2">Custom Twitter Link</p>
                                    <a 
                                        href={link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                                    >
                                        🐦 Open Link
                                        <ExternalLink className="w-3 h-3 ml-1" />
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-lg p-4 text-center">
                                <Twitter className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">No Twitter/X link provided</p>
                            </div>
                        )}
                    </div>
                ); }

            default:
                return (
                    <div className="p-4">
                        <p className="text-gray-500 text-sm">Unknown content type</p>
                    </div>
                );
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex-shrink-0 w-80 h-96 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                    {getTypeIcon()}
                    <h3 className="text-blue-600 font-medium text-sm hover:underline cursor-pointer truncate">
                        {title}
                    </h3>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700">
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content - scrollable area */}
            <div className="flex-1 overflow-y-auto min-h-0">
                {renderContent()}
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="px-4 pb-3 flex-shrink-0 border-t border-gray-100 bg-gray-50">
                    <div className="flex flex-wrap gap-2 pt-3">
                        {tags.map((tag, index) => (
                            <span 
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded hover:bg-blue-100 cursor-pointer"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom border accent - always at bottom */}
            <div className="h-1 bg-blue-600 flex-shrink-0"></div>
        </div>
    );
};

// Demo component showing different content types including Twitter
export default function CardDemo() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dynamic Content Cards with Twitter Embed</h1>
            
            <div className="flex flex-wrap items-start justify-center gap-4 bg-gray-50 p-4">
                {/* Text Card */}
                <CardContent
                    type="text"
                    title="Text Post Example"
                    content="This is a text post with some interesting content. It can be multiple lines and even include line breaks."
                    tags={["announcement", "text", "update"]}
                    link="https://example.com"
                />

                {/* Twitter Card */}
                <CardContent
                    type="twitter"
                    title="Twitter Post Example"
                    content="Check out this interesting tweet about web development!"
                    tags={["twitter", "social", "web-dev"]}
                    link="https://twitter.com/elonmusk/status/1234567890123456789"
                />

                {/* Image Card */}
                <CardContent
                    type="image"
                    title="Image Post Example"
                    content="Beautiful sunset landscape captured in the mountains"
                    tags={["photography", "nature", "sunset"]}
                    link="https://picsum.photos/800/600"
                />

                {/* Video Card */}
                <CardContent
                    type="video"
                    title="Video Post Example"
                    content="Check out this amazing video content!"
                    tags={["video", "entertainment", "youtube"]}
                    link="https://youtu.be/JgDNFQ2RaLQ?si=Krp7JX35rgqOlg7v"
                />

                {/* Audio Card */}
                <CardContent
                    type="audio"
                    title="Audio Post Example"
                    content="Relaxing Nature Sounds - Forest Ambience"
                    tags={["audio", "nature", "relaxation"]}
                    link="https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
                />
            </div>
        </div>
    );
}