import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Filter } from 'lucide-react'; // Keeping 'Filter' as it was in your original code
import PageHeader from '@/components/ui/pageHeader';

interface ListingProps<T> {
    title: string;
    description: string;
    data: T[];
    columns: ColumnDef<T>[];
    searchKey: string;
    searchPlaceholder?: string;
    addButtonText?: string;
    addButtonLink?: string;
    className?: string;
    permission?: string;
    tableTitle?: string;
    tableDescription?: string;
}

const Listing = <T,>({
    title,
    description,
    data,
    columns,
    searchKey,
    searchPlaceholder = 'Search...',
    addButtonText = 'Add New',
    addButtonLink,
    className,
    permission,
    tableTitle = 'Enhanced Data Table',
    tableDescription = 'Advanced data table with sorting, filtering, pagination and column visibility controls.',
}: ListingProps<T>) => {
    return (
        <div className={`space-y-6 animate-fade-in ${className}`}>
            {/* Page Header component for the overall page title and description */}
            <PageHeader
                title={title}
                description={description}
                addButtonLink={addButtonLink}
                addButtonText={addButtonText}
                permission={permission}
            />

            {/* Main card container for the data table, consistent with dashboard styling */}
            <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl rounded-xl">
                {/* Header for the data table card, providing a title and description for the table itself */}
                <CardHeader className="bg-card/70 backdrop-blur-md border-b border-border/50 p-6 rounded-t-xl">
                    <CardTitle className="flex items-center gap-2 text-primary font-bold">
                        <Filter className="h-5 w-5" /> {/* Icon for the table title */}
                        {tableTitle}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        {tableDescription}
                    </CardDescription>
                </CardHeader>

                {/* Content area for the actual DataTable component */}
                <CardContent className="p-6">
                    <DataTable
                        columns={columns}
                        data={data}
                        searchKey={searchKey}
                        searchPlaceholder={searchPlaceholder}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default Listing;