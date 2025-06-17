import { Share2, Trash2, FileText, Image, Video, Music, ExternalLink } from 'lucide-react';

interface CardProps {
    type: "text" | "image" | "video" | "audio";
    title: string;
    content: string;
    tags?: string[];
    link?: string;
}

export const CardContent = ({ type, title, content, tags, link }: CardProps) => {
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
        return url; // Return as-is if it's already an ID
    };

    // Get the appropriate icon based on type
    const getTypeIcon = () => {
        switch (type) {
            case "text":
                return <FileText className="w-4 h-4" />;
            case "image":
                return <Image className="w-4 h-4" />;
            case "video":
                return <Video className="w-4 h-4" />;
            case "audio":
                return <Music className="w-4 h-4" />;
            default:
                return <FileText className="w-4 h-4" />;
        }
    };

    // Unified styling for all types
    const typeStyles = {
        headerBg: "bg-blue-50",
        headerBorder: "border-l-blue-600",
        accentColor: "text-indigo-700",
        gradient: "bg-gradient-to-r from-blue-600 to-indigo-600"
    };

    const renderContent = () => {
        switch (type) {
            case "text":
                return (
                    <div className="space-y-4 h-100%">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-xs line-clamp-3">
                            {content}
                        </p>
                        {link && (
                            <a 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors duration-200 hover:underline"
                            >
                                🔗 View Link
                                <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                        )}
                    </div>
                );

            case "image":
                return (
                    <div className="space-y-4 h-100%">
                        {link && (
                            <div className="rounded-md overflow-hidden bg-gray-100 shadow-sm h-48">
                                <img 
                                    src={link} 
                                    alt={content}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSI0cHgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                                    }}
                                />
                            </div>
                        )}
                        {content && (
                            <p className="text-gray-700 text-xs italic line-clamp-1">{content}</p>
                        )}
                    </div>
                );

            case "video":
                const videoId = link ? extractYouTubeId(link) : '';
                return (
                    <div className="space-y-4 h-100%">
                        {videoId ? (
                            <div className="relative w-full bg-black rounded-md overflow-hidden shadow-lg h-48">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </div>
                        ) : (
                            <div className="bg-gray-100 rounded-md p-3 text-center border-2 border-dashed border-gray-300 h-24 flex flex-col justify-center">
                                <div className="flex justify-center mb-1">
                                    <Video className="w-6 h-6 text-gray-400" />
                                </div>
                                <p className="text-gray-500 font-medium text-xs">No video URL</p>
                            </div>
                        )}
                        {content && (
                            <p className="text-gray-700 text-xs line-clamp-1">{content}</p>
                        )}
                    </div>
                );

            case "audio":
                return (
                    <div className="space-y-4 h-100%">
                        <div className="flex-1">
                            <p className="font-medium text-indigo-900 text-xs line-clamp-1">{content}</p>
                        </div>
                        {link ? (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md p-3 border border-purple-100">
                                <audio 
                                    controls 
                                    className="w-full h-8 bg-white rounded-md shadow-sm"
                                    style={{ filter: 'sepia(20%) saturate(70%) hue-rotate(315deg)' }}
                                >
                                    <source src={link} type="audio/mpeg" />
                                    <source src={link} type="audio/wav" />
                                    <source src={link} type="audio/ogg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        ) : (
                            <div className="bg-gray-100 rounded-md p-4 text-center border-2 border-dashed border-gray-300 h-20 flex flex-col justify-center">
                                <div className="flex justify-center mb-2">
                                    <Music className="w-6 h-6 text-gray-400" />
                                </div>
                                <p className="text-gray-500 font-medium text-xs">No audio URL provided</p>
                            </div>
                        )}
                    </div>
                );

            default:
                return <p className="text-gray-500 text-xs">Unknown content type</p>;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden w-80 hover:shadow-lg transition-shadow duration-300">
            {/* Header with icon and title */}
            <div className={`${typeStyles.headerBg} ${typeStyles.headerBorder} border-l-4 px-3 py-2`}>
                <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0">
                        {getTypeIcon()}
                    </div>
                    <h3 className={`font-semibold text-sm ${typeStyles.accentColor} truncate flex-1`}>
                        {title}
                    </h3>
                    {/* Action buttons */}
                    <div className="flex items-center space-x-1">
                        <button className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
                            <Share2 className="w-3 h-3" />
                        </button>
                        <button className="p-1 rounded-full hover:bg-red-100 transition-colors duration-200">
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-3">
                {/* Content based on type */}
                {renderContent()}
                
                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-gray-100">
                        {tags.slice(0, 3).map((tag, index) => (
                            <span 
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-200 transition-all duration-200 cursor-pointer"
                            >
                                #{tag}
                            </span>
                        ))}
                        {tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                                +{tags.length - 3}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Subtle bottom accent */}
            <div className={`h-1 bg-gradient-to-r ${typeStyles.gradient}`}></div>
        </div>
    );
};