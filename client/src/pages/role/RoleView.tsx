import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Trash2, MoreVertical } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/contexts/UserContext';
import { getRoleById } from '@/api/roles';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/ui/pageHeader';

interface Permission {
  _id: string;
  name: string;
}

interface CreatedBy {
  first_name: string;
  last_name: string;
  username: string;
}

interface UpdatedBy {
  first_name: string;
  last_name: string;
  username: string;
}

interface Role {
  _id: string;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
  created_by?: CreatedBy;
  updated_by?: UpdatedBy;
  editable: string;
}

const RoleView = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const { toast } = useToast();

  const [role, setRole] = useState<Role | null>(null);

  const isSuperAdmin = user?.role_id?.slug === 'super-admin';
  const isEditable = role?.editable ?? false;
  const isSuperAdminRole = role?.slug !== 'super-admin';
  const canEdit = isEditable || (isSuperAdmin && !isSuperAdminRole);

  useEffect(() => {
    const fetchRole = async () => {
      if (!id) return;
      try {
        const res = await getRoleById(id);
        if (res.statusCode === 200 && res.data) {
          setRole(res.data);
        } else {
          toast({
            title: "Not Found",
            description: "Role not found.",
            variant: "destructive",
          });
        }
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.message || "Failed to fetch role.",
          variant: "destructive",
        });
      }
    };
    fetchRole();
  }, [id, toast]);

  const statusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'default';
    }
  };

  if (!role) {
    return <div className="text-center py-20">Loading role...</div>;
  }

  return (
    <div className="w-full px-6 space-y-8 animate-fade-in">
      <PageHeader
        title="View Role"
        description="Detailed information and permissions associated with this role"
      />

      {/* Role Details */}
      <div className="w-full bg-background border border-border/50 rounded-lg shadow-md p-6 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold text-primary">{role.name}</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform"
              >
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-border/50">
              {canEdit && (
                <Link to={`/role/edit/${role._id}`}>
                  <DropdownMenuItem className="hover:bg-primary/10 flex items-center gap-2">
                    <Edit className="w-4 h-4" /> Edit
                  </DropdownMenuItem>
                </Link>
              )}
              <DropdownMenuItem
                onClick={() => alert('Delete clicked')}
                className="text-destructive hover:bg-destructive/10 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
            <p>{role.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
            <Badge variant={statusVariant(role.status)}>{role.status}</Badge>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Created At</h3>
            <p>{new Date(role.createdAt).toLocaleDateString()}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Last Updated</h3>
            <p>{new Date(role.updatedAt).toLocaleDateString()}</p>
          </div>

          {isSuperAdmin && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Created By</h3>
              <p>{role.created_by ? role.created_by.first_name + " " + role.created_by.last_name : '—'}</p>
            </div>
          )}

          {isSuperAdmin && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Last Updated By</h3>
              <p>{role.updated_by ? role.updated_by.first_name + " " + role.updated_by.last_name : '—'}</p>
            </div>
          )}
        </div>

        {/* Permissions */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase">Permissions</h3>
          {role.permissions?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {role.permissions.map((perm) => (
                <Badge key={perm._id} variant="secondary" className="uppercase text-xs">
                  {perm.name.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">No permissions assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleView;