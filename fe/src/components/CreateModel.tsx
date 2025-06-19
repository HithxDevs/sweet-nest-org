import { X, FileText, Image, Video, Music, Twitter } from "lucide-react";
import { useRef, useState } from "react";
import { API_BASE_URL } from "../api";

interface CreateModelProps {
    open: boolean;
    onClose: () => void;
}

interface InputProps {
    onChange?: (value: string) => void;
    placeholder: string;
    value?: string;
    type?: string;
    inputRef?: React.RefObject<HTMLInputElement>;
}

export const Input = ({ onChange, placeholder, value = "", type = "text", inputRef }: InputProps) => {
    return (
        <input
            ref={inputRef}
            type={type}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            placeholder={placeholder}
            defaultValue={value}
            onChange={(e) => onChange && onChange(e.target.value)}
        />
    );
};

const Select = ({ options, onChange, placeholder, value = "", selectRef }: {
    options: { value: string; label: string; icon?: React.ReactNode }[];
    onChange?: (value: string) => void;
    placeholder: string;
    value?: string;
    selectRef?: React.RefObject<HTMLSelectElement>;
}) => {
    return (
        <select
            ref={selectRef}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            defaultValue={value}
            onChange={(e) => onChange && onChange(e.target.value)}
        >
            <option value="" disabled>{placeholder}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

const Button = ({ text, variant, size, onClick, disabled }: {
    text: string;
    variant: 'primary' | 'secondary';
    size: 'sm' | 'md' | 'lg';
    onClick: () => void;
    disabled?: boolean;
}) => {
    const baseClasses = "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2";
    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400"
    };
    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
    };
    
    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export const CreateModel = ({ open, onClose }: CreateModelProps) => {
    // Using useRef for all form inputs
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const typeRef = useRef<HTMLSelectElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);

    // Only keeping contentType state for conditional placeholder text
    const [contentType, setContentType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Updated content types to match CardContent component (using "twitter" instead of "Tweet")
    const contentTypes = [
        { value: "text", label: "Text Content", icon: <FileText className="w-4 h-4" /> },
        { value: "image", label: "Image Content", icon: <Image className="w-4 h-4" /> },
        { value: "twitter", label: "Twitter/X Post", icon: <Twitter className="w-4 h-4" /> },
        { value: "video", label: "Video Content", icon: <Video className="w-4 h-4" /> },
        { value: "audio", label: "Audio Content", icon: <Music className="w-4 h-4" /> }
    ];

    const getFormData = () => {
        const tagsString = tagRef.current?.value || "";
        // Convert comma-separated tags to array and trim whitespace
        const tagsArray = tagsString
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        return {
            title: titleRef.current?.value || "",
            content: contentRef.current?.value || "",
            type: typeRef.current?.value || "",
            link: linkRef.current?.value || "",
            tags: tagsArray // Send as array instead of string
        };
    };

    const resetForm = () => {
        if (titleRef.current) titleRef.current.value = "";
        if (contentRef.current) contentRef.current.value = "";
        if (typeRef.current) typeRef.current.value = "";
        if (linkRef.current) linkRef.current.value = "";
        if (tagRef.current) tagRef.current.value = "";
        setContentType("");
    };

    const isFormValid = () => {
        const data = getFormData();
        return data.title && data.content && data.type;
    };

    // Enhanced Twitter URL validation
    const isValidTwitterUrl = (url: string) => {
        const twitterPatterns = [
            /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+/,
            /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/i\/web\/status\/\d+/
        ];
        return twitterPatterns.some(pattern => pattern.test(url));
    };

    async function handleSubmit() {
        if (isSubmitting) return;
        
        const formData = getFormData();
        
        if (!formData.title || !formData.content || !formData.type) {
            alert("Please fill in all required fields");
            return;
        }

        // Validate Twitter URL if type is twitter and link is provided
        if (formData.type === 'twitter' && formData.link && !isValidTwitterUrl(formData.link)) {
            alert("Please enter a valid Twitter/X URL (e.g., https://twitter.com/username/status/123456789)");
            return;
        }

        setIsSubmitting(true);
        console.log("Creating post:", formData);
        
        try {
            // Get token from localStorage or wherever you store it
            const token = localStorage.getItem('token'); // Adjust based on your auth implementation
            
            if (!token) {
                alert("Please login first");
                setIsSubmitting(false);
                return;
            }

            const requestBody = {
                title: formData.title,
                content: formData.content,
                type: formData.type,
                tags: formData.tags, // Already an array
                ...(formData.link && { link: formData.link }) // Only include link if it exists
            };

            console.log("Request body:", requestBody);

            const response = await fetch(API_BASE_URL + "/api/v1/content", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add auth header
                },
                body: JSON.stringify(requestBody),
            });

            const responseData = await response.json();
            console.log("Response:", responseData);

            if (!response.ok) {
                if (responseData.errors) {
                    // Handle validation errors
                    const errorMessages = responseData.errors.map((err: { message: string }) => err.message).join(', ');
                    alert(`Validation errors: ${errorMessages}`);
                } else {
                    alert(responseData.message || "Failed to create post");
                }
                setIsSubmitting(false);
                return;
            }

            alert("Post Created Successfully!");
            resetForm();
            onClose();
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleTypeChange = (value: string) => {
        setContentType(value);
    };

    // Get content-specific help text
    const getContentHelp = () => {
        switch (contentType) {
            case 'twitter':
                return "Describe the tweet or add your commentary about it";
            case 'video':
                return "Describe the video content";
            case 'image':
                return "Describe the image or add a caption";
            case 'audio':
                return "Describe the audio content";
            case 'text':
                return "Enter your text content or article";
            default:
                return "Enter post content";
        }
    };

    const getLinkHelp = () => {
        switch (contentType) {
            case 'twitter':
                return "Enter the full Twitter/X post URL (e.g., https://twitter.com/username/status/123456789)";
            case 'video':
                return "Enter YouTube video URL";
            case 'image':
                return "Enter direct image URL";
            case 'audio':
                return "Enter direct audio file URL";
            case 'text':
                return "Enter reference link (optional)";
            default:
                return "Enter link (optional)";
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            />
            
            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            {contentType === 'twitter' ? (
                                <Twitter className="w-4 h-4 text-blue-600" />
                            ) : (
                                <FileText className="w-4 h-4 text-blue-600" />
                            )}
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Create New {contentType === 'twitter' ? 'Tweet' : 'Post'}
                        </h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        disabled={isSubmitting}
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            ref={titleRef}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                            placeholder={contentType === 'twitter' ? "Enter tweet title/description" : "Enter post title"}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Content <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                            placeholder={getContentHelp()}
                            rows={3}
                            ref={contentRef}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Content Type <span className="text-red-500">*</span>
                        </label>
                        <Select
                            options={contentTypes}
                            onChange={handleTypeChange}
                            placeholder="Choose content type"
                            selectRef={typeRef}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Link {contentType && (
                                <span className="text-xs text-gray-500">
                                    ({contentType === 'video' ? 'YouTube URL' : 
                                      contentType === 'twitter' ? 'Twitter/X URL' :
                                      contentType === 'image' ? 'Image URL' : 
                                      contentType === 'audio' ? 'Audio URL' : 'Reference URL'})
                                </span>
                            )}
                            {contentType === 'twitter' && <span className="text-red-500"> *</span>}
                        </label>
                        <Input
                            placeholder={
                                contentType === 'video' ? "https://youtube.com/watch?v=..." :
                                contentType === 'twitter' ? "https://twitter.com/username/status/123456789" :
                                contentType === 'image' ? "https://example.com/image.jpg" :
                                contentType === 'audio' ? "https://example.com/audio.mp3" :
                                "Enter link (optional)"
                            }
                            type="url"
                            inputRef={linkRef}
                        />
                        {contentType === 'twitter' && (
                            <p className="text-xs text-blue-600">
                                💡 Tip: Copy the tweet URL from your browser address bar or from "Share Tweet" → "Copy Link"
                            </p>
                        )}
                        {contentType && (
                            <p className="text-xs text-gray-500">
                                {getLinkHelp()}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Tags</label>
                        <Input
                            placeholder={
                                contentType === 'twitter' ? "e.g., social, twitter, news" :
                                contentType === 'video' ? "e.g., tutorial, education, review" :
                                "Enter tags separated by commas"
                            }
                            inputRef={tagRef}
                        />
                        <p className="text-xs text-gray-500">
                            Example: {contentType === 'twitter' ? "social, twitter, viral" : "javascript, react, tutorial"}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100 bg-gray-50">
                    <Button
                        text="Cancel"
                        variant="secondary"
                        size="md"
                        onClick={handleClose}
                        disabled={isSubmitting}
                    />
                    <Button
                        text={isSubmitting ? "Creating..." : `Create ${contentType === 'twitter' ? 'Tweet Post' : 'Post'}`}
                        variant="primary"
                        size="md"
                        onClick={handleSubmit}
                        disabled={!isFormValid() || isSubmitting}
                    />
                </div>
            </div>
        </div>
    );
};

// Demo component to show the modal
export default function ModalDemo() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 flex items-center justify-center p-8">
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Content Modal</h1>
                <p className="text-gray-600 mb-6 max-w-md">
                    Create various types of content including text posts, images, videos, audio, and Twitter/X posts.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Make sure you have a valid JWT token in localStorage to test the API
                    </p>
                </div>
                <Button
                    text="Open Create Post Modal"
                    variant="primary"
                    size="lg"
                    onClick={() => setIsOpen(true)}
                />
                
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
                    <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-600 mb-2" />
                        <span className="text-xs text-blue-600 font-medium">Text</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
                        <Image className="w-6 h-6 text-green-600 mb-2" />
                        <span className="text-xs text-green-600 font-medium">Image</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-sky-50 rounded-lg">
                        <Twitter className="w-6 h-6 text-sky-600 mb-2" />
                        <span className="text-xs text-sky-600 font-medium">Twitter</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-red-50 rounded-lg">
                        <Video className="w-6 h-6 text-red-600 mb-2" />
                        <span className="text-xs text-red-600 font-medium">Video</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg">
                        <Music className="w-6 h-6 text-purple-600 mb-2" />
                        <span className="text-xs text-purple-600 font-medium">Audio</span>
                    </div>
                </div>
            </div>
            
            <CreateModel 
                open={isOpen} 
                onClose={() => setIsOpen(false)} 
            />
        </div>
    );
}