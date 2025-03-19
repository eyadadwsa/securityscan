"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Shield,
  Users,
  UserCog,
  Lock,
  Eye,
  EyeOff,
  Save,
  Filter,
} from "lucide-react";

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
};

type Permission = {
  id: string;
  name: string;
  description: string;
  category: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  customPermissions: string[];
  lastLogin: string;
  status: "active" | "inactive" | "locked";
};

export function RolePermissionManager() {
  // Sample data
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Administrator",
      description: "Full system access with all permissions",
      permissions: ["all"],
      userCount: 3,
    },
    {
      id: "2",
      name: "Manager",
      description: "Can manage users and view reports",
      permissions: ["users.view", "users.create", "users.edit", "reports.view"],
      userCount: 5,
    },
    {
      id: "3",
      name: "Analyst",
      description: "Can view and analyze reports",
      permissions: ["reports.view", "analytics.view"],
      userCount: 12,
    },
    {
      id: "4",
      name: "User",
      description: "Basic user with limited access",
      permissions: ["dashboard.view", "profile.edit"],
      userCount: 45,
    },
  ]);

  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "1",
      name: "users.view",
      description: "View users",
      category: "User Management",
    },
    {
      id: "2",
      name: "users.create",
      description: "Create users",
      category: "User Management",
    },
    {
      id: "3",
      name: "users.edit",
      description: "Edit users",
      category: "User Management",
    },
    {
      id: "4",
      name: "users.delete",
      description: "Delete users",
      category: "User Management",
    },
    {
      id: "5",
      name: "roles.view",
      description: "View roles",
      category: "Role Management",
    },
    {
      id: "6",
      name: "roles.create",
      description: "Create roles",
      category: "Role Management",
    },
    {
      id: "7",
      name: "roles.edit",
      description: "Edit roles",
      category: "Role Management",
    },
    {
      id: "8",
      name: "roles.delete",
      description: "Delete roles",
      category: "Role Management",
    },
    {
      id: "9",
      name: "reports.view",
      description: "View reports",
      category: "Reports",
    },
    {
      id: "10",
      name: "reports.create",
      description: "Create reports",
      category: "Reports",
    },
    {
      id: "11",
      name: "reports.export",
      description: "Export reports",
      category: "Reports",
    },
    {
      id: "12",
      name: "analytics.view",
      description: "View analytics",
      category: "Analytics",
    },
    {
      id: "13",
      name: "settings.edit",
      description: "Edit system settings",
      category: "Settings",
    },
    {
      id: "14",
      name: "dashboard.view",
      description: "View dashboard",
      category: "Dashboard",
    },
    {
      id: "15",
      name: "profile.edit",
      description: "Edit own profile",
      category: "Profile",
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      roles: ["Administrator"],
      customPermissions: [],
      lastLogin: "2023-10-15T14:30:00Z",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      roles: ["Manager"],
      customPermissions: ["reports.export"],
      lastLogin: "2023-10-14T09:45:00Z",
      status: "active",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      roles: ["Analyst"],
      customPermissions: [],
      lastLogin: "2023-10-10T11:20:00Z",
      status: "inactive",
    },
    {
      id: "4",
      name: "Alice Williams",
      email: "alice@example.com",
      roles: ["User"],
      customPermissions: ["analytics.view"],
      lastLogin: "2023-10-12T16:30:00Z",
      status: "active",
    },
    {
      id: "5",
      name: "Charlie Brown",
      email: "charlie@example.com",
      roles: ["User", "Analyst"],
      customPermissions: [],
      lastLogin: "2023-10-13T10:15:00Z",
      status: "locked",
    },
  ]);

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

  // State for edit dialogs
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(
    null,
  );
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showAddRoleDialog, setShowAddRoleDialog] = useState(false);
  const [showAddPermissionDialog, setShowAddPermissionDialog] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);

  // New role/permission/user form state
  const [newRole, setNewRole] = useState<Omit<Role, "id" | "userCount">>({
    name: "",
    description: "",
    permissions: [],
  });
  const [newPermission, setNewPermission] = useState<Omit<Permission, "id">>({
    name: "",
    description: "",
    category: "",
  });
  const [newUser, setNewUser] = useState<Omit<User, "id" | "lastLogin">>({
    name: "",
    email: "",
    roles: [],
    customPermissions: [],
    status: "active",
  });

  // Filter functions
  const filteredPermissions = permissions.filter((permission) => {
    const matchesSearch =
      permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !categoryFilter || permission.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || user.status === statusFilter;
    const matchesRole = !roleFilter || user.roles.includes(roleFilter);
    return matchesSearch && matchesStatus && matchesRole;
  });

  const filteredRoles = roles.filter((role) => {
    return (
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Helper functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      case "locked":
        return <Badge className="bg-red-500">Locked</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAddRole = () => {
    const newRoleWithId: Role = {
      id: (roles.length + 1).toString(),
      ...newRole,
      userCount: 0,
    };
    setRoles([...roles, newRoleWithId]);
    setNewRole({ name: "", description: "", permissions: [] });
    setShowAddRoleDialog(false);
  };

  const handleAddPermission = () => {
    const newPermissionWithId: Permission = {
      id: (permissions.length + 1).toString(),
      ...newPermission,
    };
    setPermissions([...permissions, newPermissionWithId]);
    setNewPermission({ name: "", description: "", category: "" });
    setShowAddPermissionDialog(false);
  };

  const handleAddUser = () => {
    const newUserWithId: User = {
      id: (users.length + 1).toString(),
      ...newUser,
      lastLogin: new Date().toISOString(),
    };
    setUsers([...users, newUserWithId]);
    setNewUser({
      name: "",
      email: "",
      roles: [],
      customPermissions: [],
      status: "active",
    });
    setShowAddUserDialog(false);
  };

  const handleUpdateRole = () => {
    if (editingRole) {
      setRoles(
        roles.map((role) => (role.id === editingRole.id ? editingRole : role)),
      );
      setEditingRole(null);
    }
  };

  const handleUpdatePermission = () => {
    if (editingPermission) {
      setPermissions(
        permissions.map((permission) =>
          permission.id === editingPermission.id
            ? editingPermission
            : permission,
        ),
      );
      setEditingPermission(null);
    }
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      setUsers(
        users.map((user) => (user.id === editingUser.id ? editingUser : user)),
      );
      setEditingUser(null);
    }
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handleDeletePermission = (id: string) => {
    setPermissions(permissions.filter((permission) => permission.id !== id));
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const togglePermissionForRole = (roleId: string, permissionName: string) => {
    setRoles(
      roles.map((role) => {
        if (role.id === roleId) {
          const hasPermission = role.permissions.includes(permissionName);
          return {
            ...role,
            permissions: hasPermission
              ? role.permissions.filter((p) => p !== permissionName)
              : [...role.permissions, permissionName],
          };
        }
        return role;
      }),
    );
  };

  const togglePermissionForUser = (userId: string, permissionName: string) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          const hasPermission = user.customPermissions.includes(permissionName);
          return {
            ...user,
            customPermissions: hasPermission
              ? user.customPermissions.filter((p) => p !== permissionName)
              : [...user.customPermissions, permissionName],
          };
        }
        return user;
      }),
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users & Access
          </TabsTrigger>
        </TabsList>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Role Management</CardTitle>
                <CardDescription>
                  Create and manage roles with specific permissions
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search roles..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Dialog
                  open={showAddRoleDialog}
                  onOpenChange={setShowAddRoleDialog}
                >
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Role</DialogTitle>
                      <DialogDescription>
                        Create a new role with specific permissions
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="role-name">Role Name</Label>
                        <Input
                          id="role-name"
                          placeholder="e.g., Content Editor"
                          value={newRole.name}
                          onChange={(e) =>
                            setNewRole({ ...newRole, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role-description">Description</Label>
                        <Input
                          id="role-description"
                          placeholder="Brief description of this role"
                          value={newRole.description}
                          onChange={(e) =>
                            setNewRole({
                              ...newRole,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Permissions</Label>
                        <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                          <div className="space-y-2">
                            {permissions.map((permission) => (
                              <div
                                key={permission.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`permission-${permission.id}`}
                                  checked={newRole.permissions.includes(
                                    permission.name,
                                  )}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setNewRole({
                                        ...newRole,
                                        permissions: [
                                          ...newRole.permissions,
                                          permission.name,
                                        ],
                                      });
                                    } else {
                                      setNewRole({
                                        ...newRole,
                                        permissions: newRole.permissions.filter(
                                          (p) => p !== permission.name,
                                        ),
                                      });
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor={`permission-${permission.id}`}
                                  className="text-sm font-normal"
                                >
                                  {permission.description} ({permission.name})
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddRoleDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddRole}>Create Role</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No roles found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRoles.map((role) => (
                        <TableRow key={role.id}>
                          <TableCell className="font-medium">
                            {role.name}
                          </TableCell>
                          <TableCell>{role.description}</TableCell>
                          <TableCell>{role.userCount}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.includes("all") ? (
                                <Badge>All Permissions</Badge>
                              ) : (
                                role.permissions
                                  .slice(0, 2)
                                  .map((permission) => (
                                    <Badge key={permission} variant="outline">
                                      {permission}
                                    </Badge>
                                  ))
                              )}
                              {role.permissions.length > 2 && (
                                <Badge variant="outline">
                                  +{role.permissions.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setEditingRole(role)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Role</DialogTitle>
                                    <DialogDescription>
                                      Update role details and permissions
                                    </DialogDescription>
                                  </DialogHeader>
                                  {editingRole && (
                                    <div className="space-y-4 py-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-role-name">
                                          Role Name
                                        </Label>
                                        <Input
                                          id="edit-role-name"
                                          value={editingRole.name}
                                          onChange={(e) =>
                                            setEditingRole({
                                              ...editingRole,
                                              name: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-role-description">
                                          Description
                                        </Label>
                                        <Input
                                          id="edit-role-description"
                                          value={editingRole.description}
                                          onChange={(e) =>
                                            setEditingRole({
                                              ...editingRole,
                                              description: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Permissions</Label>
                                        <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                                          <div className="space-y-2">
                                            <div className="flex items-center space-x-2 pb-2 border-b">
                                              <Checkbox
                                                id="all-permissions"
                                                checked={editingRole.permissions.includes(
                                                  "all",
                                                )}
                                                onCheckedChange={(checked) => {
                                                  if (checked) {
                                                    setEditingRole({
                                                      ...editingRole,
                                                      permissions: ["all"],
                                                    });
                                                  } else {
                                                    setEditingRole({
                                                      ...editingRole,
                                                      permissions: [],
                                                    });
                                                  }
                                                }}
                                              />
                                              <Label
                                                htmlFor="all-permissions"
                                                className="font-medium"
                                              >
                                                All Permissions
                                              </Label>
                                            </div>
                                            {permissions.map((permission) => (
                                              <div
                                                key={permission.id}
                                                className="flex items-center space-x-2"
                                              >
                                                <Checkbox
                                                  id={`edit-permission-${permission.id}`}
                                                  checked={
                                                    editingRole.permissions.includes(
                                                      "all",
                                                    ) ||
                                                    editingRole.permissions.includes(
                                                      permission.name,
                                                    )
                                                  }
                                                  disabled={editingRole.permissions.includes(
                                                    "all",
                                                  )}
                                                  onCheckedChange={(
                                                    checked,
                                                  ) => {
                                                    if (checked) {
                                                      setEditingRole({
                                                        ...editingRole,
                                                        permissions: [
                                                          ...editingRole.permissions,
                                                          permission.name,
                                                        ],
                                                      });
                                                    } else {
                                                      setEditingRole({
                                                        ...editingRole,
                                                        permissions:
                                                          editingRole.permissions.filter(
                                                            (p) =>
                                                              p !==
                                                              permission.name,
                                                          ),
                                                      });
                                                    }
                                                  }}
                                                />
                                                <Label
                                                  htmlFor={`edit-permission-${permission.id}`}
                                                  className="text-sm font-normal"
                                                >
                                                  {permission.description} (
                                                  {permission.name})
                                                </Label>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() => setEditingRole(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button onClick={handleUpdateRole}>
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteRole(role.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Permission Management</CardTitle>
                <CardDescription>
                  Create and manage system permissions
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search permissions..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={categoryFilter || ""}
                  onValueChange={(value) => setCategoryFilter(value || null)}
                >
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="All Categories" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {Array.from(
                      new Set(permissions.map((p) => p.category)),
                    ).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog
                  open={showAddPermissionDialog}
                  onOpenChange={setShowAddPermissionDialog}
                >
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Permission
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Permission</DialogTitle>
                      <DialogDescription>
                        Create a new system permission
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="permission-name">Permission Name</Label>
                        <Input
                          id="permission-name"
                          placeholder="e.g., reports.export"
                          value={newPermission.name}
                          onChange={(e) =>
                            setNewPermission({
                              ...newPermission,
                              name: e.target.value,
                            })
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          Use dot notation for better organization (e.g.,
                          module.action)
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="permission-description">
                          Description
                        </Label>
                        <Input
                          id="permission-description"
                          placeholder="What this permission allows"
                          value={newPermission.description}
                          onChange={(e) =>
                            setNewPermission({
                              ...newPermission,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="permission-category">Category</Label>
                        <Select
                          value={newPermission.category}
                          onValueChange={(value) =>
                            setNewPermission({
                              ...newPermission,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger id="permission-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from(
                              new Set(permissions.map((p) => p.category)),
                            ).map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                            <SelectItem value="New Category">
                              + Add New Category
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {newPermission.category === "New Category" && (
                          <Input
                            className="mt-2"
                            placeholder="Enter new category name"
                            onChange={(e) =>
                              setNewPermission({
                                ...newPermission,
                                category: e.target.value,
                              })
                            }
                          />
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddPermissionDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddPermission}>
                        Create Permission
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Permission Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPermissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No permissions found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPermissions.map((permission) => (
                        <TableRow key={permission.id}>
                          <TableCell className="font-medium">
                            {permission.name}
                          </TableCell>
                          <TableCell>{permission.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {permission.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      setEditingPermission(permission)
                                    }
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Permission</DialogTitle>
                                    <DialogDescription>
                                      Update permission details
                                    </DialogDescription>
                                  </DialogHeader>
                                  {editingPermission && (
                                    <div className="space-y-4 py-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-permission-name">
                                          Permission Name
                                        </Label>
                                        <Input
                                          id="edit-permission-name"
                                          value={editingPermission.name}
                                          onChange={(e) =>
                                            setEditingPermission({
                                              ...editingPermission,
                                              name: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-permission-description">
                                          Description
                                        </Label>
                                        <Input
                                          id="edit-permission-description"
                                          value={editingPermission.description}
                                          onChange={(e) =>
                                            setEditingPermission({
                                              ...editingPermission,
                                              description: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-permission-category">
                                          Category
                                        </Label>
                                        <Select
                                          value={editingPermission.category}
                                          onValueChange={(value) =>
                                            setEditingPermission({
                                              ...editingPermission,
                                              category: value,
                                            })
                                          }
                                        >
                                          <SelectTrigger id="edit-permission-category">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {Array.from(
                                              new Set(
                                                permissions.map(
                                                  (p) => p.category,
                                                ),
                                              ),
                                            ).map((category) => (
                                              <SelectItem
                                                key={category}
                                                value={category}
                                              >
                                                {category}
                                              </SelectItem>
                                            ))}
                                            <SelectItem value="New Category">
                                              + Add New Category
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                        {editingPermission.category ===
                                          "New Category" && (
                                          <Input
                                            className="mt-2"
                                            placeholder="Enter new category name"
                                            onChange={(e) =>
                                              setEditingPermission({
                                                ...editingPermission,
                                                category: e.target.value,
                                              })
                                            }
                                          />
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() => setEditingPermission(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button onClick={handleUpdatePermission}>
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleDeletePermission(permission.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permission Matrix</CardTitle>
              <CardDescription>
                Manage which roles have which permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Permission</TableHead>
                      {roles.map((role) => (
                        <TableHead key={role.id} className="text-center">
                          {role.name}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{permission.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {permission.description}
                            </div>
                          </div>
                        </TableCell>
                        {roles.map((role) => (
                          <TableCell key={role.id} className="text-center">
                            <Checkbox
                              checked={
                                role.permissions.includes("all") ||
                                role.permissions.includes(permission.name)
                              }
                              disabled={role.permissions.includes("all")}
                              onCheckedChange={() =>
                                togglePermissionForRole(
                                  role.id,
                                  permission.name,
                                )
                              }
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>User Access Management</CardTitle>
                <CardDescription>
                  Manage users, their roles, and permissions
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={statusFilter || ""}
                  onValueChange={(value) => setStatusFilter(value || null)}
                >
                  <SelectTrigger className="w-[150px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="All Statuses" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="locked">Locked</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={roleFilter || ""}
                  onValueChange={(value) => setRoleFilter(value || null)}
                >
                  <SelectTrigger className="w-[150px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="All Roles" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog
                  open={showAddUserDialog}
                  onOpenChange={setShowAddUserDialog}
                >
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Create a new user and assign roles
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="user-name">Full Name</Label>
                        <Input
                          id="user-name"
                          placeholder="John Doe"
                          value={newUser.name}
                          onChange={(e) =>
                            setNewUser({ ...newUser, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-email">Email</Label>
                        <Input
                          id="user-email"
                          type="email"
                          placeholder="john@example.com"
                          value={newUser.email}
                          onChange={(e) =>
                            setNewUser({ ...newUser, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Roles</Label>
                        <div className="border rounded-md p-4 max-h-[150px] overflow-y-auto">
                          <div className="space-y-2">
                            {roles.map((role) => (
                              <div
                                key={role.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`role-${role.id}`}
                                  checked={newUser.roles.includes(role.name)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setNewUser({
                                        ...newUser,
                                        roles: [...newUser.roles, role.name],
                                      });
                                    } else {
                                      setNewUser({
                                        ...newUser,
                                        roles: newUser.roles.filter(
                                          (r) => r !== role.name,
                                        ),
                                      });
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor={`role-${role.id}`}
                                  className="text-sm font-normal"
                                >
                                  {role.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-status">Status</Label>
                        <Select
                          value={newUser.status}
                          onValueChange={(
                            value: "active" | "inactive" | "locked",
                          ) => setNewUser({ ...newUser, status: value })}
                        >
                          <SelectTrigger id="user-status">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="locked">Locked</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddUserDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddUser}>Create User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No users found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {user.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {user.roles.map((role) => (
                                <Badge key={role} variant="outline">
                                  {role}
                                </Badge>
                              ))}
                              {user.customPermissions.length > 0 && (
                                <Badge variant="secondary">
                                  +{user.customPermissions.length} custom
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>{formatDate(user.lastLogin)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setEditingUser(user)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit User</DialogTitle>
                                    <DialogDescription>
                                      Update user details, roles, and
                                      permissions
                                    </DialogDescription>
                                  </DialogHeader>
                                  {editingUser && (
                                    <div className="space-y-4 py-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-user-name">
                                          Full Name
                                        </Label>
                                        <Input
                                          id="edit-user-name"
                                          value={editingUser.name}
                                          onChange={(e) =>
                                            setEditingUser({
                                              ...editingUser,
                                              name: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-user-email">
                                          Email
                                        </Label>
                                        <Input
                                          id="edit-user-email"
                                          type="email"
                                          value={editingUser.email}
                                          onChange={(e) =>
                                            setEditingUser({
                                              ...editingUser,
                                              email: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Roles</Label>
                                        <div className="border rounded-md p-4 max-h-[150px] overflow-y-auto">
                                          <div className="space-y-2">
                                            {roles.map((role) => (
                                              <div
                                                key={role.id}
                                                className="flex items-center space-x-2"
                                              >
                                                <Checkbox
                                                  id={`edit-role-${role.id}`}
                                                  checked={editingUser.roles.includes(
                                                    role.name,
                                                  )}
                                                  onCheckedChange={(
                                                    checked,
                                                  ) => {
                                                    if (checked) {
                                                      setEditingUser({
                                                        ...editingUser,
                                                        roles: [
                                                          ...editingUser.roles,
                                                          role.name,
                                                        ],
                                                      });
                                                    } else {
                                                      setEditingUser({
                                                        ...editingUser,
                                                        roles:
                                                          editingUser.roles.filter(
                                                            (r) =>
                                                              r !== role.name,
                                                          ),
                                                      });
                                                    }
                                                  }}
                                                />
                                                <Label
                                                  htmlFor={`edit-role-${role.id}`}
                                                  className="text-sm font-normal"
                                                >
                                                  {role.name}
                                                </Label>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                          <Label>Custom Permissions</Label>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 text-xs"
                                            onClick={() =>
                                              setEditingUser({
                                                ...editingUser,
                                                customPermissions: [],
                                              })
                                            }
                                          >
                                            Clear All
                                          </Button>
                                        </div>
                                        <div className="border rounded-md p-4 max-h-[150px] overflow-y-auto">
                                          <div className="space-y-2">
                                            {permissions.map((permission) => (
                                              <div
                                                key={permission.id}
                                                className="flex items-center space-x-2"
                                              >
                                                <Checkbox
                                                  id={`edit-permission-${permission.id}`}
                                                  checked={editingUser.customPermissions.includes(
                                                    permission.name,
                                                  )}
                                                  onCheckedChange={(
                                                    checked,
                                                  ) => {
                                                    if (checked) {
                                                      setEditingUser({
                                                        ...editingUser,
                                                        customPermissions: [
                                                          ...editingUser.customPermissions,
                                                          permission.name,
                                                        ],
                                                      });
                                                    } else {
                                                      setEditingUser({
                                                        ...editingUser,
                                                        customPermissions:
                                                          editingUser.customPermissions.filter(
                                                            (p) =>
                                                              p !==
                                                              permission.name,
                                                          ),
                                                      });
                                                    }
                                                  }}
                                                />
                                                <Label
                                                  htmlFor={`edit-permission-${permission.id}`}
                                                  className="text-sm font-normal"
                                                >
                                                  {permission.description} (
                                                  {permission.name})
                                                </Label>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-user-status">
                                          Status
                                        </Label>
                                        <Select
                                          value={editingUser.status}
                                          onValueChange={(
                                            value:
                                              | "active"
                                              | "inactive"
                                              | "locked",
                                          ) =>
                                            setEditingUser({
                                              ...editingUser,
                                              status: value,
                                            })
                                          }
                                        >
                                          <SelectTrigger id="edit-user-status">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="active">
                                              Active
                                            </SelectItem>
                                            <SelectItem value="inactive">
                                              Inactive
                                            </SelectItem>
                                            <SelectItem value="locked">
                                              Locked
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() => setEditingUser(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button onClick={handleUpdateUser}>
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Permission Matrix</CardTitle>
              <CardDescription>
                Manage custom permissions for individual users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Permission</TableHead>
                      {filteredUsers.map((user) => (
                        <TableHead key={user.id} className="text-center">
                          <div className="truncate max-w-[120px]">
                            {user.name}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{permission.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {permission.description}
                            </div>
                          </div>
                        </TableCell>
                        {filteredUsers.map((user) => {
                          // Check if user has this permission through roles
                          const hasViaRole = user.roles.some((roleName) => {
                            const role = roles.find((r) => r.name === roleName);
                            return (
                              role &&
                              (role.permissions.includes("all") ||
                                role.permissions.includes(permission.name))
                            );
                          });

                          // Check if user has this permission directly
                          const hasDirectly = user.customPermissions.includes(
                            permission.name,
                          );

                          return (
                            <TableCell key={user.id} className="text-center">
                              {hasViaRole ? (
                                <div className="flex justify-center">
                                  <Badge
                                    variant="outline"
                                    className="bg-muted/50"
                                  >
                                    Via Role
                                  </Badge>
                                </div>
                              ) : (
                                <Checkbox
                                  checked={hasDirectly}
                                  onCheckedChange={() =>
                                    togglePermissionForUser(
                                      user.id,
                                      permission.name,
                                    )
                                  }
                                />
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
