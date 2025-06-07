import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
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
}: ListingProps<T>) => {
    return (
        <div className={`space-y-6 animate-fade-in ${className}`}>
            <PageHeader
                title={title}
                description={description}
                addButtonLink={addButtonLink}
            />


            <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl border-border/50 shadow-xl">
                <CardContent className="p-6">
                    <DataTable
                        columns={columns}
                        data={data}
                        searchKey={searchKey}
                        searchPlaceholder={searchPlaceholder}
                    />
                </CardContent>
            </Card>
        </div >
    );
};

export default Listing;