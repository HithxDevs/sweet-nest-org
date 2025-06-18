// Fixed useContent hook with TypeScript types
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../src/api';

// Define the content item type
interface ContentItem {
    _id: string;
    title: string;
    type: 'text' | 'image' | 'video' | 'audio';
    content?: string;
    tags?: { _id: string; title: string; }[];
    link?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

// Define the API response type
interface ContentResponse {
    content: ContentItem[];
    message: string;
}

export function useContent() {
    // Fixed: Initialize as empty array with proper typing
    const [content, setContent] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                
                // Handle potential null/undefined token
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No authentication token found');
                    setLoading(false);
                    return;
                }
                
                console.log('Fetching content from API:', `${API_BASE_URL}/api/v1/content`)
                const response = await axios.get<ContentResponse>(`${API_BASE_URL}/api/v1/content`, {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                
                console.log('API Response:', response.data); // Debug log
                setContent(response.data.content || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching content:', err);
    
                setContent([]);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []); 

    return { content, loading, error };
}