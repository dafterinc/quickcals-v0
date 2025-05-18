"use client";

import React, { useState } from "react";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MoreVertical, 
  UserPlus, 
  UserCheck, 
  UserX, 
  Edit, 
  Trash2, 
  Lock, 
  Unlock,
  Shield,
  CreditCard,
  Filter,
  Download,
  ChevronDown
} from "lucide-react";

// Mock data types
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive" | "pending";
  joinDate: Date;
  subscriptionStatus: "free" | "basic" | "premium" | "none";
}

interface Subscription {
  id: string;
  userId: string;
  plan: "free" | "basic" | "premium";
  status: "active" | "cancelled" | "expired";
  startDate: Date;
  endDate: Date;
  paymentMethod: string;
  amount: number;
}

// Mock data for users
const mockUsers: User[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    joinDate: new Date("2023-01-15"),
    subscriptionStatus: "premium"
  },
  {
    id: "u2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    status: "active",
    joinDate: new Date("2023-02-20"),
    subscriptionStatus: "basic"
  },
  {
    id: "u3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "user",
    status: "inactive",
    joinDate: new Date("2023-03-10"),
    subscriptionStatus: "free"
  },
  {
    id: "u4",
    name: "Bob Wilson",
    email: "bob.wilson@example.com",
    role: "user",
    status: "pending",
    joinDate: new Date("2023-04-05"),
    subscriptionStatus: "none"
  },
  {
    id: "u5",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    role: "user",
    status: "active",
    joinDate: new Date("2023-05-15"),
    subscriptionStatus: "premium"
  }
];

// Mock data for subscriptions
const mockSubscriptions: Subscription[] = [
  {
    id: "s1",
    userId: "u1",
    plan: "premium",
    status: "active",
    startDate: new Date("2023-01-15"),
    endDate: new Date("2024-01-15"),
    paymentMethod: "Credit Card",
    amount: 99.99
  },
  {
    id: "s2",
    userId: "u2",
    plan: "basic",
    status: "active",
    startDate: new Date("2023-02-20"),
    endDate: new Date("2024-02-20"),
    paymentMethod: "PayPal",
    amount: 49.99
  },
  {
    id: "s5",
    userId: "u5",
    plan: "premium",
    status: "active",
    startDate: new Date("2023-05-15"),
    endDate: new Date("2024-05-15"),
    paymentMethod: "Credit Card",
    amount: 99.99
  }
];

// Helper functions for UI elements
const getStatusBadge = (status: User['status']) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  };

  return (
    <Badge variant="outline" className={statusStyles[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const getSubscriptionBadge = (subscriptionStatus: User['subscriptionStatus']) => {
  const subscriptionStyles = {
    free: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    basic: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    premium: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    none: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  };

  return (
    <Badge variant="outline" className={subscriptionStyles[subscriptionStatus]}>
      {subscriptionStatus === "none" ? "No Plan" : subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1)}
    </Badge>
  );
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function CockpitPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [userStatusFilter, setUserStatusFilter] = useState("all");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [subscriptionPlanFilter, setSubscriptionPlanFilter] = useState("all");
  const [subscriptionStatusFilter, setSubscriptionStatusFilter] = useState("all");

  // Filter users based on search query and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchesStatus = userStatusFilter === "all" || user.status === userStatusFilter;
    const matchesRole = userRoleFilter === "all" || user.role === userRoleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  // Filter subscriptions based on filters
  const filteredSubscriptions = mockSubscriptions.filter(subscription => {
    const matchesPlan = subscriptionPlanFilter === "all" || subscription.plan === subscriptionPlanFilter;
    const matchesStatus = subscriptionStatusFilter === "all" || subscription.status === subscriptionStatusFilter;
    
    return matchesPlan && matchesStatus;
  });

  // Get user name from subscription
  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : "Unknown User";
  };

  return (
    <BaseLayout>
      <div className="container mx-auto py-6 max-w-6xl">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Cockpit</h1>
            <p className="text-muted-foreground">Manage users, subscriptions, and access control</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </header>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users" className="flex items-center justify-center gap-2">
              <UserCheck className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center justify-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Subscriptions</span>
            </TabsTrigger>
            <TabsTrigger value="access" className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Access Control</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <CardTitle>User Management</CardTitle>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters and search */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                    <div className="w-full sm:w-auto flex-1 sm:flex-none">
                      <Select value={userStatusFilter} onValueChange={setUserStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[140px]">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="w-full sm:w-auto flex-1 sm:flex-none">
                      <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
                        <SelectTrigger className="w-full sm:w-[140px]">
                          <Shield className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or email..."
                      className="pl-8"
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Users table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Subscription</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead className="w-[60px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="capitalize">{user.role}</TableCell>
                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                            <TableCell>{getSubscriptionBadge(user.subscriptionStatus)}</TableCell>
                            <TableCell>{formatDate(user.joinDate)}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  {user.status === "active" ? (
                                    <DropdownMenuItem className="cursor-pointer text-amber-600">
                                      <Lock className="h-4 w-4 mr-2" />
                                      Deactivate
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem className="cursor-pointer text-green-600">
                                      <Unlock className="h-4 w-4 mr-2" />
                                      Activate
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="cursor-pointer text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No users found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <CardTitle>Subscription Management</CardTitle>
                  <Button size="sm">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Subscription
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                    <div className="w-full sm:w-auto flex-1 sm:flex-none">
                      <Select value={subscriptionPlanFilter} onValueChange={setSubscriptionPlanFilter}>
                        <SelectTrigger className="w-full sm:w-[140px]">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Plans</SelectItem>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="w-full sm:w-auto flex-1 sm:flex-none">
                      <Select value={subscriptionStatusFilter} onValueChange={setSubscriptionStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[140px]">
                          <ChevronDown className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                {/* Subscriptions table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="w-[60px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubscriptions.length > 0 ? (
                        filteredSubscriptions.map((subscription) => (
                          <TableRow key={subscription.id}>
                            <TableCell className="font-medium">{getUserName(subscription.userId)}</TableCell>
                            <TableCell className="capitalize">{subscription.plan}</TableCell>
                            <TableCell className="capitalize">{subscription.status}</TableCell>
                            <TableCell>{formatDate(subscription.startDate)}</TableCell>
                            <TableCell>{formatDate(subscription.endDate)}</TableCell>
                            <TableCell>{subscription.paymentMethod}</TableCell>
                            <TableCell>${subscription.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Subscription
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer text-amber-600">
                                    <Lock className="h-4 w-4 mr-2" />
                                    Cancel Subscription
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No subscriptions found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Access Control Tab */}
          <TabsContent value="access" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Role & Permissions</CardTitle>
                <CardDescription>
                  Configure access control and permissions for different user roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Admin Role Card */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Admin Role</CardTitle>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          System Role
                        </Badge>
                      </div>
                      <CardDescription>Full access to all features</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 border-b">
                          <span>User Management</span>
                          <Badge>Full Access</Badge>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span>Subscription Management</span>
                          <Badge>Full Access</Badge>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span>Access Control</span>
                          <Badge>Full Access</Badge>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span>Dashboard & Analytics</span>
                          <Badge>Full Access</Badge>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span>System Settings</span>
                          <Badge>Full Access</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* User Role Card */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">User Role</CardTitle>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          System Role
                        </Badge>
                      </div>
                      <CardDescription>Limited access to features</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-2 border-b">
                          <span>User Management</span>
                          <Badge variant="outline">No Access</Badge>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span>Subscription Management</span>
                          <Badge variant="outline">Self Only</Badge>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span>Access Control</span>
                          <Badge variant="outline">No Access</Badge>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span>Dashboard & Analytics</span>
                          <Badge variant="outline">Self Only</Badge>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span>System Settings</span>
                          <Badge variant="outline">No Access</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Action Buttons */}
                  <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                    <Button variant="outline">Create New Role</Button>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BaseLayout>
  );
}
