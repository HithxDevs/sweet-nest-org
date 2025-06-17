import { X, FileText, Image, Video, Music } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";
interface CreateModelProps {
    open: boolean;
    onClose: () => void;
}

interface InputProps {
    onChange: (value: string) => void;
    placeholder: string;
    value?: string;
    type?: string;
}

const Input = ({ onChange, placeholder, value = "", type = "text" }: InputProps) => {
    return (
        <input
            type={type}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

const Select = ({ options, onChange, placeholder, value = "" }: {
    options: { value: string; label: string; icon?: React.ReactNode }[];
    onChange: (value: string) => void;
    placeholder: string;
    value?: string;
}) => {
    return (
        <select
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            value={value}
            onChange={(e) => onChange(e.target.value)}
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

export const CreateModel = ({ open, onClose }: CreateModelProps) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        type: "",
        link: "",
        tags: ""
    });

    const contentTypes = [
        { value: "text", label: "Text Content", icon: <FileText className="w-4 h-4" /> },
        { value: "image", label: "Image Content", icon: <Image className="w-4 h-4" /> },
        { value: "video", label: "Video Content", icon: <Video className="w-4 h-4" /> },
        { value: "audio", label: "Audio Content", icon: <Music className="w-4 h-4" /> }
    ];

    const handleSubmit = () => {
        if (!formData.title || !formData.content || !formData.type) {
            alert("Please fill in all required fields");
            return;
        }
        console.log("Creating post:", formData);
        alert("Post Created Successfully!");
        // Reset form
        setFormData({
            title: "",
            content: "",
            type: "",
            link: "",
            tags: ""
        });
        onClose();
    };

    const handleClose = () => {
        setFormData({
            title: "",
            content: "",
            type: "",
            link: "",
            tags: ""
        });
  
        onClose();
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
                        <Input
                            onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                            placeholder="Enter post title"
                            value={formData.title}
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
                            value={formData.content}
                            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Content Type <span className="text-red-500">*</span>
                        </label>
                        <Select
                            options={contentTypes}
                            onChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                            placeholder="Choose content type"
                            value={formData.type}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Link {formData.type && (
                                <span className="text-xs text-gray-500">
                                    ({formData.type === 'video' ? 'YouTube URL' : 
                                      formData.type === 'image' ? 'Image URL' : 
                                      formData.type === 'audio' ? 'Audio URL' : 'Reference URL'})
                                </span>
                            )}
                        </label>
                        <Input
                            onChange={(value) => setFormData(prev => ({ ...prev, link: value }))}
                            placeholder={
                                formData.type === 'video' ? "https://youtube.com/watch?v=..." :
                                formData.type === 'image' ? "https://example.com/image.jpg" :
                                formData.type === 'audio' ? "https://example.com/audio.mp3" :
                                "Enter link (optional)"
                            }
                            value={formData.link}
                            type="url"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Tags</label>
                        <Input
                            onChange={(value) => setFormData(prev => ({ ...prev, tags: value }))}
                            placeholder="Enter tags separated by commas"
                            value={formData.tags}
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
                        disabled={!formData.title || !formData.content || !formData.type}
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