import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CanAccess } from "@/components/common/AccessControl";

// Define TypeScript interface for props
interface PageHeaderProps {
    title?: string;
    description?: string;
    addButtonLink?: string;
    addButtonText?: string;
    className?: string;
    permission?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title = "Default Title",
    description = "Default description",
    addButtonLink,
    addButtonText = "Add Role",
    className = "",
    permission,
}) => {
    return (
        <div
            className={`rounded-md border border-border/50 bg-gradient-to-r from-primary/5 to-primary/10 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${className}`}
        >
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

            {addButtonLink && (
                <CanAccess permission={permission}>
                    <Link to={addButtonLink}>
                        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <Plus className="mr-2 h-4 w-4" />
                            {addButtonText}
                        </Button>
                    </Link>
                </CanAccess>
            )}
        </div>
    );
};

export default PageHeader;