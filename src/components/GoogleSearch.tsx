'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/components/ui/input';

interface GoogleSearchProps {
    className?: string;
    inputClassName?: string;
    placeholder?: string;
    onSearch?: (query: string) => void;
}

export default function GoogleSearch({
    className = '',
    inputClassName = '',
    placeholder = 'Search...',
    onSearch,
}: GoogleSearchProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const query = searchQuery.trim();
        if (!query) return;

        router.push(`/search?q=${encodeURIComponent(query)}`);
        setSearchQuery('');
        onSearch?.(query);
    };

    return (
        <form onSubmit={handleSubmit} className={`relative group ${className}`.trim()}>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
            <Input
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-12 ${inputClassName}`.trim()}
            />
        </form>
    );
}
