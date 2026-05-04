import React from 'react';

interface HighlightTextProps {
  text: string;
  search: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({ text, search }) => {
  const searchTerm = search.trim();
  if (!searchTerm) return <>{text}</>;
  
  // Escape special regex characters to prevent crashes
  const escapedSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    const parts = text.split(new RegExp(`(${escapedSearch})`, 'gi'));
    
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <mark key={i} className="bg-yellow-100 text-slate-900 rounded-sm px-0.5">{part}</mark>
          ) : (
            part
          )
        )}
      </>
    );
  } catch (e) {
    return <>{text}</>;
  }
};
