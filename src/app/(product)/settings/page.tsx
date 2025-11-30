"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Shield, CreditCard, Trash2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-light text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Email Notifications</label>
                <p className="text-sm text-muted-foreground">Receive email updates about workflows and projects</p>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="h-px bg-border my-4" />
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Workflow Updates</label>
                <p className="text-sm text-muted-foreground">Get notified when workflow steps complete</p>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <Button>Save Preferences</Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
              <Input id="current-password" type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </div>
            <Button>Update Password</Button>
          </CardContent>
        </Card>

        {/* Billing */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <div>
                <CardTitle>Billing</CardTitle>
                <CardDescription>Manage your subscription and billing</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Current Plan</span>
                <Badge variant="outline">Free</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Upgrade to unlock advanced features and higher limits
              </p>
            </div>
            <Button>Manage Subscription</Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-destructive" />
              <div>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible and destructive actions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-destructive/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-destructive">Delete Account</label>
                  <p className="text-sm text-muted-foreground">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

