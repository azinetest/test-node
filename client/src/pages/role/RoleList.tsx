import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical, ArrowUpDown, UserPlus } from 'lucide-react';
import Listing from '@/components/ui/listing';

interface Role {
    id: number;
    name: string;
    description: string;
    userCount: number;
    status: string;
}

const RoleManagement = () => {
    const roles: Role[] = [
        { id: 1, name: 'Admin', description: 'Full access to all settings', userCount: 2, status: 'Active' },
        { id: 2, name: 'Moderator', description: 'Manage user content and moderation', userCount: 2, status: 'Active' },
        { id: 3, name: 'User', description: 'Standard user access', userCount: 4, status: 'Active' },
        { id: 4, name: 'Guest', description: 'Limited access to resources', userCount: 1, status: 'Inactive' },
        { id: 5, name: 'Editor', description: 'Can edit content', userCount: 3, status: 'Active' },
        { id: 6, name: 'Contributor', description: 'Can contribute content', userCount: 5, status: 'Active' },
        { id: 7, name: 'Subscriber', description: 'Subscribed users', userCount: 7, status: 'Active' },
        { id: 8, name: 'VIP', description: 'VIP users with perks', userCount: 1, status: 'Pending' },
        { id: 9, name: 'Tester', description: 'Users for testing', userCount: 2, status: 'Inactive' },
        { id: 10, name: 'Support', description: 'Customer support', userCount: 3, status: 'Active' },
        { id: 11, name: 'Manager', description: 'Manages teams', userCount: 4, status: 'Active' },
        { id: 12, name: 'Analyst', description: 'Analyzes data', userCount: 1, status: 'Pending' },
        { id: 13, name: 'Developer', description: 'Develops features', userCount: 6, status: 'Active' },
        { id: 14, name: 'Designer', description: 'Designs UI/UX', userCount: 2, status: 'Active' },
        { id: 15, name: 'Intern', description: 'Temporary intern', userCount: 1, status: 'Inactive' },
        { id: 16, name: 'Guest Editor', description: 'Limited edit rights', userCount: 2, status: 'Pending' },
        { id: 17, name: 'Auditor', description: 'Audits system', userCount: 1, status: 'Active' },
        { id: 18, name: 'HR', description: 'Human resources', userCount: 3, status: 'Active' },
        { id: 19, name: 'Trainer', description: 'Trains staff', userCount: 2, status: 'Active' },
        { id: 20, name: 'Consultant', description: 'External consultant', userCount: 1, status: 'Inactive' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'default';
            case 'Inactive': return 'secondary';
            case 'Pending': return 'destructive';
            default: return 'secondary';
        }
    };

    const columns: ColumnDef<Role>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="hover:bg-primary/10 transition-colors"
                >
                    Role Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
        },
        {
            accessorKey: 'description',
            header: () => <div>Description</div>,
            cell: ({ row }) => <div className="text-muted-foreground">{row.getValue('description')}</div>,
        },
        {
            accessorKey: 'userCount',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="hover:bg-primary/10 transition-colors"
                >
                    Users
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue('userCount')}</div>,
        },
        {
            accessorKey: 'status',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="hover:bg-primary/10 transition-colors"
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const status = row.getValue('status') as string;
                return (
                    <Badge variant={getStatusColor(status) as any} className="hover:scale-105 transition-transform">
                        {status}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:scale-105 transition-all duration-200">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-border/50">
                        <DropdownMenuItem className="hover:bg-primary/10 transition-colors">View Role</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-primary/10 transition-colors">Edit Role</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 hover:bg-destructive/10 transition-colors">Delete Role</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    return (
        <Listing
            title="Role Management"
            description="Manage roles and permissions assigned to your users."
            data={roles}
            columns={columns}
            searchKey="name"
            searchPlaceholder="Search roles by name or description..."
            addButtonText="Add Role"
            addButtonLink="/roles/create"
        />
    );
};

export default RoleManagement;