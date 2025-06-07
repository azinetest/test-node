import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define TypeScript interface for props
interface PageHeaderProps {
    title?: string;
    description?: string;
    addButtonLink?: string;
    addButtonText?: string;
    className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title = "Default Title",
    description = "Default description",
    addButtonLink,
    addButtonText = "Add Role",
    className = "",
}) => {
    return (
        <div className={`space-y-6 animate-fade-in ${className}`}>
            <div className="flex justify-between items-center">
                <div>
                    <h2
                        role="heading"
                        aria-level={2}
                        className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                    >
                        {title}
                    </h2>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                {addButtonLink != undefined && (
                    <Link to={addButtonLink}>
                        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <Plus className="mr-2 h-4 w-4" />
                            {addButtonText}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default PageHeader;