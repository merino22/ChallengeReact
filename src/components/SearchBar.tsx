import React from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        onSearch(query);
    };

    return (
        <div className="search-container">
            <input 
                type="text"
                placeholder="Buscar..."
                onChange={handleInputChange}
                className="search-bar"
                />
        </div>
    );
};

export default SearchBar;

