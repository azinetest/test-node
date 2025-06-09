import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Filter } from 'lucide-react';
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
    tableTitle = 'Enhanced Data Table',
    tableDescription = 'Advanced data table with sorting, filtering, pagination and column visibility controls.',
}: ListingProps<T>) => {
    return (
        <div className={`space-y-6 animate-fade-in ${className}`}>
            <PageHeader
                title={title}
                description={description}
                addButtonLink={addButtonLink}
                addButtonText={addButtonText}
            />

            <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
                {/* <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50">
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-primary" />
                        {tableTitle}
                    </CardTitle>
                    <CardDescription>
                        {tableDescription}
                    </CardDescription>
                </CardHeader> */}
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