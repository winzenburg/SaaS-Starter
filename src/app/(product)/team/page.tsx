"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Mail, Shield, Crown, UserX } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
  status: "active" | "invited" | "suspended";
  avatar?: string;
}

export default function TeamPage() {
  const [members] = useState<TeamMember[]>([
    {
      id: "1",
      name: "You",
      email: "you@example.com",
      role: "owner",
      status: "active",
    },
    {
      id: "2",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
    },
    {
      id: "3",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "member",
      status: "invited",
    },
  ]);

  const getRoleIcon = (role: TeamMember["role"]) => {
    switch (role) {
      case "owner":
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case "admin":
        return <Shield className="w-4 h-4 text-blue-500" />;
      default:
        return <UserPlus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: TeamMember["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case "invited":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Invited</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
    }
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-light text-foreground mb-2">
            Team
          </h1>
          <p className="text-muted-foreground">
            Manage your team members and their permissions
          </p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="space-y-6">
        {/* Invite Member Card */}
        <Card>
          <CardHeader>
            <CardTitle>Invite Team Member</CardTitle>
            <CardDescription>
              Send an invitation to join your team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                />
              </div>
              <div className="flex-1 space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <select
                  id="role"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Invitation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members List */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members ({members.length})</CardTitle>
            <CardDescription>
              View and manage your team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{member.name}</span>
                        {getRoleIcon(member.role)}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="capitalize">
                      {member.role}
                    </Badge>
                    {getStatusBadge(member.status)}
                    {member.role !== "owner" && (
                      <Button variant="ghost" size="icon">
                        <UserX className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roles & Permissions */}
        <Card>
          <CardHeader>
            <CardTitle>Roles & Permissions</CardTitle>
            <CardDescription>
              Understand what each role can do
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold">Owner</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Full access to all features</li>
                  <li>• Manage team members</li>
                  <li>• Billing and subscription</li>
                  <li>• Delete account</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold">Admin</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Create and edit workflows</li>
                  <li>• Manage projects</li>
                  <li>• Invite members</li>
                  <li>• View analytics</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <UserPlus className="w-5 h-5 text-muted-foreground" />
                  <h3 className="font-semibold">Member</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• View workflows</li>
                  <li>• Execute workflow steps</li>
                  <li>• View projects</li>
                  <li>• Limited access</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

