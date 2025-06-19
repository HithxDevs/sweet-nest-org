import { Share2,  FileText, Image, Video, Music, ExternalLink, MoreHorizontal, Twitter, Heart, Bookmark } from 'lucide-react';
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
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Load Twitter embed script
    useEffect(() => {
        if (type === 'twitter' && !twitterEmbedLoaded) {
            const script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            script.onload = () => setTwitterEmbedLoaded(true);
            document.body.appendChild(script);

            return () => {
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

    // Get the appropriate icon and color based on type
    const getTypeConfig = () => {
        switch (type) {
            case "text":
                return { 
                    icon: <FileText className="w-4 h-4" />, 
                    color: "bg-blue-50 text-blue-600 border-blue-200",
                    accent: "bg-gradient-to-r from-blue-500 to-blue-600"
                };
            case "image":
                return { 
                    icon: <Image className="w-4 h-4" />, 
                    color: "bg-green-50 text-green-600 border-green-200",
                    accent: "bg-gradient-to-r from-green-500 to-green-600"
                };
            case "video":
                return { 
                    icon: <Video className="w-4 h-4" />, 
                    color: "bg-red-50 text-red-600 border-red-200",
                    accent: "bg-gradient-to-r from-red-500 to-red-600"
                };
            case "audio":
                return { 
                    icon: <Music className="w-4 h-4" />, 
                    color: "bg-purple-50 text-purple-600 border-purple-200",
                    accent: "bg-gradient-to-r from-purple-500 to-purple-600"
                };
            case "twitter":
                return { 
                    icon: <Twitter className="w-4 h-4" />, 
                    color: "bg-sky-50 text-sky-600 border-sky-200",
                    accent: "bg-gradient-to-r from-sky-500 to-sky-600"
                };
            default:
                return { 
                    icon: <FileText className="w-4 h-4" />, 
                    color: "bg-gray-50 text-gray-600 border-gray-200",
                    accent: "bg-gradient-to-r from-gray-500 to-gray-600"
                };
        }
    };

    const typeConfig = getTypeConfig();

    const renderContent = () => {
        switch (type) {
            case "text":
                return (
                    <div className="p-6">
                        <p className="text-gray-700 text-base leading-relaxed mb-4 font-medium">
                            {content}
                        </p>
                        {link && (
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <a 
                                    href={link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-semibold hover:underline transition-colors"
                                >
                                    🔗 View Link
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                </a>
                            </div>
                        )}
                    </div>
                );

            case "image":
                return (
                    <div>
                        {link && (
                            <div className="w-full h-52 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                <img 
                                    src={link} 
                                    alt={content}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>
                        )}
                        <div className="p-6">
                            <p className="text-gray-600 text-sm italic leading-relaxed">{content}</p>
                        </div>
                    </div>
                );

            case "video":
                { const videoId = link ? extractYouTubeId(link) : '';
                return (
                    <div>
                        {videoId ? (
                            <div className="relative w-full h-52 bg-black rounded-t-none overflow-hidden">
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
                            <div className="w-full h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <div className="text-center">
                                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500 text-sm font-medium">No video available</p>
                                </div>
                            </div>
                        )}
                        <div className="p-6">
                            <p className="text-gray-700 text-sm font-medium">{content}</p>
                        </div>
                    </div>
                ); }

            case "audio":
                return (
                    <div className="p-6">
                        <p className="text-gray-800 text-base font-semibold mb-4">{content}</p>
                        {link ? (
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                                <audio 
                                    controls 
                                    className="w-full h-10"
                                >
                                    <source src={link} type="audio/mpeg" />
                                    <source src={link} type="audio/wav" />
                                    <source src={link} type="audio/ogg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 text-center border border-purple-100">
                                <Music className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                                <p className="text-purple-600 text-sm font-medium">No audio file provided</p>
                            </div>
                        )}
                    </div>
                );

            case "twitter":
                { const tweetId = link ? extractTwitterId(link) : '';
                return (
                    <div className="p-6">
                        <p className="text-gray-800 text-base font-medium mb-4">{content}</p>
                        {tweetId ? (
                            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 border border-sky-100">
                                <blockquote className="twitter-tweet" data-theme="light">
                                    <p lang="en" dir="ltr">Loading tweet...</p>
                                    <a href={link}>View Tweet</a>
                                </blockquote>
                                
                                <div className="mt-3 pt-3 border-t border-sky-200">
                                    <a 
                                        href={link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sky-600 hover:text-sky-700 text-sm font-semibold hover:underline transition-colors"
                                    >
                                        🐦 View on X/Twitter
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                </div>
                            </div>
                        ) : link ? (
                            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 border border-sky-100">
                                <div className="text-center">
                                    <Twitter className="w-10 h-10 text-sky-400 mx-auto mb-3" />
                                    <p className="text-sky-600 text-sm font-medium mb-3">Custom Twitter Link</p>
                                    <a 
                                        href={link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sky-600 hover:text-sky-700 text-sm font-semibold hover:underline transition-colors"
                                    >
                                        🐦 Open Link
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 text-center border border-sky-100">
                                <Twitter className="w-8 h-8 text-sky-400 mx-auto mb-3" />
                                <p className="text-sky-600 text-sm font-medium">No Twitter/X link provided</p>
                            </div>
                        )}
                    </div>
                ); }

            default:
                return (
                    <div className="p-6">
                        <p className="text-gray-500 text-sm">Unknown content type</p>
                    </div>
                );
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex-shrink-0 w-80 max-h-96 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0 bg-white">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className={`p-2 rounded-xl border ${typeConfig.color}`}>
                        {typeConfig.icon}
                    </div>
                    <h3 className="text-gray-900 font-semibold text-base hover:text-gray-700 cursor-pointer truncate transition-colors">
                        {title}
                    </h3>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                    <button 
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-2 rounded-lg transition-all ${isLiked ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`}
                    >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                    <button 
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`p-2 rounded-lg transition-all ${isBookmarked ? 'bg-blue-50 text-blue-500 hover:bg-blue-100' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`}
                    >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700 transition-all">
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700 transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                {renderContent()}
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="px-4 pb-4 flex-shrink-0 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex flex-wrap gap-2 pt-4">
                        {tags.map((tag, index) => (
                            <span 
                                key={index}
                                className="px-3 py-1.5 bg-white text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-100 hover:border-gray-300 cursor-pointer transition-all hover:scale-105"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom accent */}
            <div className={`h-1 ${typeConfig.accent} flex-shrink-0`}></div>
        </div>
    );
};

// Demo component showing different content types
export default function CardDemo() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-8 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Dynamic Content Cards
                </h1>
                <p className="text-gray-600 text-lg">
                    Beautiful, interactive cards with modern design
                </p>
            </div>
            
            {/* Cards Grid */}
            <div className="p-8">
                <div className="flex flex-wrap items-start justify-center gap-6 max-w-7xl mx-auto">
                    {/* Text Card */}
                    <CardContent
                        type="text"
                        title="Announcement"
                        content="This is an important announcement with some detailed information. It includes multiple lines and demonstrates how text content is displayed in a clean, readable format."
                        tags={["announcement", "important", "update"]}
                        link="https://example.com"
                    />

                    {/* Twitter Card */}
                    <CardContent
                        type="twitter"
                        title="Social Media Post"
                        content="Check out this interesting tweet about the latest developments in web technology and design!"
                        tags={["twitter", "social", "web-dev"]}
                        link="https://twitter.com/elonmusk/status/1234567890123456789"
                    />

                    {/* Image Card */}
                    <CardContent
                        type="image"
                        title="Photography Showcase"
                        content="Stunning mountain landscape captured during golden hour"
                        tags={["photography", "nature", "landscape"]}
                        link="https://picsum.photos/800/600"
                    />

                    {/* Video Card */}
                    <CardContent
                        type="video"
                        title="Tutorial Video"
                        content="Learn advanced React concepts in this comprehensive tutorial"
                        tags={["video", "tutorial", "react"]}
                        link="https://youtu.be/JgDNFQ2RaLQ?si=Krp7JX35rgqOlg7v"
                    />

                    {/* Audio Card */}
                    <CardContent
                        type="audio"
                        title="Podcast Episode"
                        content="Relaxing Nature Sounds - Forest Ambience for Focus"
                        tags={["audio", "nature", "relaxation", "focus"]}
                        link="https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
                    />

                    {/* Additional demo cards */}
                    <CardContent
                        type="text"
                        title="Design Tips"
                        content="Modern UI design emphasizes clean lines, thoughtful spacing, and purposeful color choices. These principles help create interfaces that are both beautiful and functional."
                        tags={["design", "ui", "tips"]}
                    />
                </div>
            </div>
        </div>
    );
}