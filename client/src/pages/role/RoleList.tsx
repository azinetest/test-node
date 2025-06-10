import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical, ArrowUpDown } from 'lucide-react';
import Listing from '@/components/ui/listing';
import { getRoles } from '@/api/roles';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { UserProvider, useUser } from '@/contexts/UserContext';
import { CanAccess } from "@/guards/AccessControl";
import { PERMISSIONS } from '@/constants/permissions';

interface Role {
    _id: number;
    name: string;
    description: string;
    userCount: number;
    status: string;
    slug: string;
    editable: boolean;
}

const RoleManagement = () => {
    const { user } = useUser();
    const { toast } = useToast();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const role = await getRoles();
            if (role.statusCode != 200) {
                toast({
                    title: "Error fetching roles",
                    description: "Unable to load roles from the server.",
                    variant: "destructive",
                })
            }

            setRoles(role.data);
        };
        fetchData();
    }, []);

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
                        {status ? 'Active' : 'Inactive'}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                // if 'editable' does not exist in data, set default false
                const isEditable = row.original.editable ?? false;
                const isSuperAdminUser = user.role_id.slug === 'super-admin';
                const isSuperAdminRole = row.original.slug != 'super-admin';

                const canEdit = isSuperAdminRole && (isEditable || (isSuperAdminUser && !isSuperAdminRole));

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:scale-105 transition-all duration-200">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-border/50">
                            <Link to={`/roles/view/${row.original._id}`}>
                                <DropdownMenuItem className="hover:bg-primary/10 transition-colors">
                                    View Role
                                </DropdownMenuItem>
                            </Link>
                            {canEdit && (
                                <CanAccess permission={PERMISSIONS.ROLE.UPDATE}>
                                    <Link to={`/roles/edit/${row.original._id}`}>
                                        <DropdownMenuItem className="hover:bg-primary/10 transition-colors">
                                            Edit Role
                                        </DropdownMenuItem>
                                    </Link>
                                </CanAccess>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu >
                );
            },
        }
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
            permission={PERMISSIONS.ROLE.CREATE}
        />
    );
};

export default RoleManagement;