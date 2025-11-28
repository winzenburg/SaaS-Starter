/**
 * Workflow Detail Page
 * 
 * Detailed view of a single workflow
 */

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { WorkflowSteps } from "@/components/workflows/workflow-steps";
import { WorkflowActions } from "@/components/workflows/workflow-actions";
import { ValidationThresholds } from "@/components/workflows/validation-thresholds";
import type { Workflow } from "@/lib/workflows/types";

export default function WorkflowDetailPage() {
  const params = useParams();
  const workflowId = params.id as string;
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkflow() {
      try {
        const response = await fetch(`/api/workflows/${workflowId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setWorkflow(null);
            setLoading(false);
            return;
          }
          throw new Error("Failed to load workflow");
        }
        const data = await response.json();
        if (data.success && data.workflow) {
          setWorkflow(data.workflow);
        } else {
          setWorkflow(null);
        }
      } catch (error) {
        console.error("Error loading workflow:", error);
        setWorkflow(null);
      } finally {
        setLoading(false);
      }
    }

    if (workflowId) {
      loadWorkflow();
    }
  }, [workflowId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-white">Loading workflow...</p>
        </div>
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Card className="text-center max-w-md glass-card">
          <CardHeader>
            <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <CardTitle className="text-3xl mb-4 text-white">Workflow Not Found</CardTitle>
            <CardDescription className="text-base mb-6 text-gray-400">
              The workflow you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/workflows">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Workflows
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusIcon = (status: Workflow["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5" />;
      case "in_progress":
        return <Clock className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusVariant = (status: Workflow["status"]) => {
    switch (status) {
      case "completed":
        return "default";
      case "in_progress":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
              <Link href="/workflows">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Workflows
              </Link>
            </Button>
            <span className="text-gray-600">•</span>
            <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
              <Link href={`/hub?project=${workflow.ideaSlug}`}>
                View Project in Hub
              </Link>
            </Button>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-2">
            {workflow.ideaName}
          </h1>
          <p className="text-lg text-gray-400 font-medium">{workflow.ideaSlug}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white">Workflow Steps</CardTitle>
                <CardDescription className="text-gray-400">Track your progress through each step</CardDescription>
              </CardHeader>
              <CardContent>
                <WorkflowSteps workflow={workflow} onUpdate={setWorkflow} />
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white">Actions</CardTitle>
                <CardDescription className="text-gray-400">Manage your workflow</CardDescription>
              </CardHeader>
              <CardContent>
                <WorkflowActions workflow={workflow} onUpdate={setWorkflow} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Status Card */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white">Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-400">Phase</span>
                  <Badge variant="outline" className="capitalize border-slate-700 text-gray-300">
                    {workflow.phase}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-400">Status</span>
                  <Badge variant={getStatusVariant(workflow.status)} className="capitalize">
                    {getStatusIcon(workflow.status)}
                    <span className="ml-2">{workflow.status.replace("_", " ")}</span>
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-400">Progress</span>
                  <span className="font-bold text-white">
                    {workflow.steps.filter((s) => s.status === "completed").length} / {workflow.steps.length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Score Card (Discovery) */}
            {workflow.phase === "discovery" && "score" in workflow && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-white">Opportunity Score</CardTitle>
                  <CardDescription className="text-gray-400">Overall opportunity assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      {workflow.score?.toFixed(1) || "—"}
                    </div>
                    <div className="text-sm font-medium text-gray-400">out of 10</div>
                  </div>
                  {workflow.scoreBreakdown && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
                        <span className="text-sm font-medium text-gray-400">Niche Viability</span>
                        <span className="font-bold text-white">
                          {workflow.scoreBreakdown.nicheViability.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
                        <span className="text-sm font-medium text-gray-400">Pain Intensity</span>
                        <span className="font-bold text-white">
                          {workflow.scoreBreakdown.painIntensity.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
                        <span className="text-sm font-medium text-gray-400">Persona Clarity</span>
                        <span className="font-bold text-white">
                          {workflow.scoreBreakdown.personaClarity.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
                        <span className="text-sm font-medium text-gray-400">Moat Potential</span>
                        <span className="font-bold text-white">
                          {workflow.scoreBreakdown.moatPotential.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Validation Thresholds */}
            {workflow.phase === "validation" && (
              <ValidationThresholds workflow={workflow} onUpdate={setWorkflow} />
            )}

            {/* Metadata */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white">Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-400">Created</span>
                  <span className="text-sm font-medium text-white">
                    {new Date(workflow.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-400">Updated</span>
                  <span className="text-sm font-medium text-white">
                    {new Date(workflow.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

