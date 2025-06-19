import { X, FileText, Image, Video, Music } from "lucide-react";
import { useRef, useState } from "react";

const API_BASE_URL = "https://api.example.com"; // Mock API URL

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

    const contentTypes = [
        { value: "text", label: "Text Content", icon: <FileText className="w-4 h-4" /> },
        { value: "image", label: "Image Content", icon: <Image className="w-4 h-4" /> },
        { value: "video", label: "Video Content", icon: <Video className="w-4 h-4" /> },
        { value: "audio", label: "Audio Content", icon: <Music className="w-4 h-4" /> }
    ];

    const getFormData = () => {
        return {
            title: titleRef.current?.value || "",
            content: contentRef.current?.value || "",
            type: typeRef.current?.value || "",
            link: linkRef.current?.value || "",
            tags: tagRef.current?.value || ""
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

    async function handleSubmit() {
        const formData = getFormData();
        
        if (!formData.title || !formData.content || !formData.type) {
            alert("Please fill in all required fields");
            return;
        }

        console.log("Creating post:", formData);
        
        try {
            // Mock API call - replace with actual axios call
            const response = await fetch(API_BASE_URL + "/api/v1/content", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                alert("Failed to create post");
                return;
            }

            alert("Post Created Successfully!");
            resetForm();
            onClose();
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post");
        }
    }

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleTypeChange = (value: string) => {
        setContentType(value);
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
                            <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                            placeholder="Enter post title"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Content <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none"
                            placeholder="Enter post content"
                            rows={3}
                            ref={contentRef}
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
                            //@ts-ignore
                            selectRef={typeRef}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Link {contentType && (
                                <span className="text-xs text-gray-500">
                                    ({contentType === 'video' ? 'YouTube URL' : 
                                      contentType === 'image' ? 'Image URL' : 
                                      contentType === 'audio' ? 'Audio URL' : 'Reference URL'})
                                </span>
                            )}
                        </label>
                        <Input
                            placeholder={
                                contentType === 'video' ? "https://youtube.com/watch?v=..." :
                                contentType === 'image' ? "https://example.com/image.jpg" :
                                contentType === 'audio' ? "https://example.com/audio.mp3" :
                                "Enter link (optional)"
                            }
                            type="url"
                            //@ts-ignore
                            inputRef={linkRef}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Tags</label>
                        <Input
                            placeholder="Enter tags separated by commas"
                            //@ts-ignore
                            inputRef={tagRef}
                        />
                        <p className="text-xs text-gray-500">
                            Example: javascript, react, tutorial
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
                    />
                    <Button
                        text="Create Post"
                        variant="primary"
                        size="md"
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Modal Demo</h1>
                <Button
                    text="Open Create Post Modal"
                    variant="primary"
                    size="lg"
                    onClick={() => setIsOpen(true)}
                />
            </div>
            
            <CreateModel 
                open={isOpen} 
                onClose={() => setIsOpen(false)} 
            />
        </div>
    );
}