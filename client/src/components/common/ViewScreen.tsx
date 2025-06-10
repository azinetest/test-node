// ViewScreen.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Edit, Trash2, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export interface ViewField {
  label: string;
  value: string | number | React.ReactNode;
  type?: 'text' | 'badge' | 'avatar' | 'date' | 'custom';
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export interface ViewScreenProps {
  title: string;
  subtitle?: string;
  avatar?: {
    src?: string;
    fallback: string;
  };
  fields: ViewField[];
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  customActions?: React.ReactNode;
  className?: string;
}

const ViewScreen: React.FC<ViewScreenProps> = ({
  title,
  subtitle,
  avatar,
  fields,
  onBack,
  onEdit,
  onDelete,
  customActions,
  className = ''
}) => {
  const renderFieldValue = (field: ViewField) => {
    switch (field.type) {
      case 'badge':
        return (
          <Badge variant={field.variant as any} className="hover:scale-105 transition-transform">
            {field.value}
          </Badge>
        );
      case 'avatar':
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 ring-2 ring-primary/20">
              <AvatarImage src={field.value as string} />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                {typeof field.value === 'string' ? field.value.charAt(0) : 'U'}
              </AvatarFallback>
            </Avatar>
            <span>{field.value}</span>
          </div>
        );
      case 'date':
        return (
          <span className="font-medium">
            {field.value ? new Date(field.value as string).toLocaleDateString() : 'N/A'}
          </span>
        );
      case 'custom':
        return field.value;
      default:
        return <span className="text-foreground">{field.value}</span>;
    }
  };

  return (
    <div className={`space-y-6 animate-fade-in ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="hover:scale-105 transition-all duration-300 hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-4">
            {avatar && (
              <Avatar className="h-16 w-16 ring-4 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                <AvatarImage src={avatar.src} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-lg font-bold">
                  {avatar.fallback}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-foreground text-lg">{subtitle}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {customActions}
          {(onEdit || onDelete) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:scale-105 transition-all duration-300">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-border/50">
                {onEdit && (
                  <DropdownMenuItem onClick={onEdit} className="hover:bg-primary/10 transition-colors">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem onClick={onDelete} className="text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Content Card */}
      <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50">
          <CardTitle className="text-xl">Details</CardTitle>
          <CardDescription>
            Complete information and attributes
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field, index) => (
              <div
                key={index}
                className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {field.label}
                </label>
                <div className="text-base">
                  {renderFieldValue(field)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewScreen;