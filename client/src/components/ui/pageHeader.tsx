import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CanAccess } from "@/guards/AccessControl";

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
  addButtonText = "Add Role", // Default text for the button
  className = "",
  permission, // Permission string for access control
}) => {
  return (
    // Outer container with enhanced styling for a more premium look
    <div
      className={`
        rounded-xl border border-border/50
        bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-md
        shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10
        p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4
        transition-all duration-300 ease-in-out
        relative overflow-hidden
        ${className}
      `}
    >
      {/* Subtle background gradient overlay for visual interest */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Content for Title and Description */}
      <div className="relative z-10"> {/* Ensure content is above background effects */}
        <h2
          role="heading"
          aria-level={2}
          className="
            text-3xl font-extrabold tracking-tight
            bg-gradient-to-r from-primary via-primary/80 to-primary/60
            bg-clip-text text-transparent
            leading-tight mb-1
          "
        >
          {title}
        </h2>
        <p className="text-muted-foreground text-base">
          {description}
        </p>
      </div>

      {/* Conditional rendering for the Add Button with access control */}
      {addButtonLink && (
        <CanAccess permission={permission}>
          <Link to={addButtonLink} className="relative z-10"> {/* Ensure button is above background effects */}
            <Button
              className="
                bg-gradient-to-r from-primary to-primary/80
                hover:from-primary/90 hover:to-primary
                hover:scale-[1.03] transition-all duration-300 ease-in-out
                shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                flex items-center gap-2
              "
            >
              <Plus className="h-4 w-4" /> {/* Icon is already good */}
              {addButtonText}
            </Button>
          </Link>
        </CanAccess>
      )}
    </div>
  );
};

export default PageHeader;