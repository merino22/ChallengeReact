import React from "react";
import { Link } from "react-router-dom";

interface AddButtonProps {
    to: string;
    content: string;
    className?: string;
}

const AddButton: React.FC<AddButtonProps> = ({ to, content, className = '' }) => {
    return (
        <Link to={to} className={className} style={{textDecoration: 'none'}}>
            {content}
        </Link>
    );
};

export default AddButton;