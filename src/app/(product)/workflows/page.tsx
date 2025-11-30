/**
 * Workflows Dashboard
 * 
 * Visualize and manage discovery and validation workflows
 */"use client";

import { useState, useEffect, useMemo } from"react";
import { useSearchParams } from"next/navigation";
import Link from"next/link";
import { Button } from"@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from"@/components/ui/card";
import { Badge } from"@/components/ui/badge";
import { WorkflowCard } from"@/components/workflows/workflow-card";
import { CreateWorkflowDialog } from"@/components/workflows/create-workflow-dialog";
import { Plus, Workflow as WorkflowIcon, FolderKanban, Filter } from"lucide-react";
import type { Workflow, WorkflowPhase } from"@/lib/workflows/types";

export default function WorkflowsPage() {
  const searchParams = useSearchParams();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(
    searchParams.get("project")
  );
  const [createForProject, setCreateForProject] = useState<string | null>(
    searchParams.get("create")
  );

  useEffect(() => {
    // Ensure we're on the client before rendering
    setMounted(true);

    // Load workflows from API
    async function loadWorkflows() {
      try {
        const response = await fetch("/api/workflows");
        if (!response.ok) {
          throw new Error("Failed to load workflows");
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.workflows)) {
          setWorkflows(data.workflows);
        } else if (data.workflows && Array.isArray(data.workflows)) {
          // Handle case where workflows array exists but success might be false
          setWorkflows(data.workflows);
        } else {
          // Fallback to empty array
          setWorkflows([]);
        }
      } catch (error) {
        console.error("Error loading workflows:", error);
        // Set empty array on error so UI doesn't break
        setWorkflows([]);
      } finally {
        setLoading(false);
      }
    }

    loadWorkflows();
  }, []);

  // Group workflows by project (ideaSlug)
  const workflowsByProject = useMemo(() => {
    const grouped: Record<string, Workflow[]> = {};
    workflows.forEach((workflow) => {
      const key = workflow.ideaSlug;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(workflow);
    });
    return grouped;
  }, [workflows]);

  // Get unique project names
  const projects = useMemo(() => {
    const projectMap = new Map<string, string>();
    workflows.forEach((workflow) => {
      if (!projectMap.has(workflow.ideaSlug)) {
        projectMap.set(workflow.ideaSlug, workflow.ideaName);
      }
    });
    return Array.from(projectMap.entries()).map(([slug, name]) => ({
      slug,
      name,
    }));
  }, [workflows]);

  // Filter workflows by selected project
  const filteredWorkflows = useMemo(() => {
    if (!selectedProject) return workflows;
    return workflows.filter((w) => w.ideaSlug === selectedProject);
  }, [workflows, selectedProject]);

  // Show create dialog if createForProject is set
  useEffect(() => {
    if (createForProject) {
      setShowCreateDialog(true);
    }
  }, [createForProject]);

  const handleCreateWorkflow = (workflow: {
    ideaSlug: string;
    ideaName: string;
    phase: WorkflowPhase;
  }) => {
    (async () => {
      try {
        const endpoint =
          workflow.phase ==="discovery"
            ?"/api/workflows/discovery"
            :"/api/workflows/validation";

        const response = await fetch(endpoint, {
          method:"POST",
          headers: {"Content-Type":"application/json" },
          body: JSON.stringify({
            ideaSlug: workflow.ideaSlug,
            ideaName: workflow.ideaName,
            phase: workflow.phase,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create workflow");
        }

        const data = await response.json();
        if (data.success && data.workflow) {
          // Reload all workflows to get the latest state
          const workflowsResponse = await fetch("/api/workflows");
          if (workflowsResponse.ok) {
            const workflowsData = await workflowsResponse.json();
            if (workflowsData.success && workflowsData.workflows) {
              setWorkflows(workflowsData.workflows);
            }
          }
        }
        setShowCreateDialog(false);
        setCreateForProject(null);
      } catch (error) {
        console.error("Error creating workflow:", error);
        alert("Failed to create workflow");
      }
    })();
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[var(--primary)] mx-auto"></div>
          <p className="mt-4 text-lg font-semibold text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F7] min-h-screen">
      <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-heading font-light text-foreground mb-2">
                Workflows
              </h1>
              <p className="text-muted-foreground">
                Manage discovery and validation workflows for your ideas
              </p>
            </div>
            <Button
              onClick={() => setShowCreateDialog(true)}
              size="lg"
              className="bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Analysis
            </Button>
          </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[var(--primary)] mx-auto mb-4"></div>
            <p className="text-base font-medium text-muted-foreground">Loading workflows...</p>
          </div>
        ) : workflows.length === 0 ? (
          <Card className="text-center py-12 border-dashed bg-white border border-border rounded-lg shadow-sm">
            <CardHeader>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-border bg-muted/50">
                <WorkflowIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl mb-2 text-foreground">No workflows yet</CardTitle>
              <CardDescription className="text-base mb-6 text-muted-foreground">
                Create your first workflow to start validating your ideas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setShowCreateDialog(true)}
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Workflow
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Project Filter */}
            {projects.length > 0 && (
              <div className="mb-6 flex items-center gap-3 flex-wrap">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filter by project:</span>
                <Button
                  variant={selectedProject === null ?"default" :"outline"}
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                  className="text-xs"
                >
                  All Projects ({workflows.length})
                </Button>
                {projects.map((project) => {
                  const count = workflowsByProject[project.slug]?.length || 0;
                  return (
                    <Button
                      key={project.slug}
                      variant={selectedProject === project.slug ?"default" :"outline"}
                      size="sm"
                      onClick={() => setSelectedProject(project.slug)}
                      className="text-xs"
                    >
                      {project.name} ({count})
                    </Button>
                  );
                })}
              </div>
            )}

            {/* Grouped by Project View */}
            {selectedProject ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FolderKanban className="w-5 h-5 text-[var(--primary)]" />
                    <h2 className="text-2xl font-bold text-foreground">
                      {workflowsByProject[selectedProject]?.[0]?.ideaName || selectedProject}
                    </h2>
                    <Link
                      href="/hub"
                      className="text-sm text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors"
                    >
                      View in Hub →
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWorkflows.map((workflow) => (
                    <WorkflowCard
                      key={workflow.id}
                      workflow={workflow}
                      onUpdate={(updated) => {
                        setWorkflows(
                          workflows.map((w) =>
                            w.id === updated.id ? updated : w
                          )
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* All Workflows Grouped by Project */
              <div className="space-y-8">
                {Object.entries(workflowsByProject).map(([projectSlug, projectWorkflows]) => (
                  <div key={projectSlug} className="space-y-4">
                    <div className="flex items-center justify-between border-b  pb-3">
                      <div className="flex items-center gap-3">
                        <FolderKanban className="w-5 h-5 text-[var(--primary)]" />
                        <h2 className="text-xl font-bold text-foreground">
                          {projectWorkflows[0]?.ideaName || projectSlug}
                        </h2>
                        <Badge variant="outline" className="text-muted-foreground">
                          {projectWorkflows.length} workflow{projectWorkflows.length !== 1 ?"s" :""}
                        </Badge>
                      </div>
                      <Link
                        href={`/hub?project=${projectSlug}`}
                        className="text-sm text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors flex items-center gap-1"
                      >
                        View Project →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projectWorkflows.map((workflow) => (
                        <WorkflowCard
                          key={workflow.id}
                          workflow={workflow}
                          onUpdate={(updated) => {
                            setWorkflows(
                              workflows.map((w) =>
                                w.id === updated.id ? updated : w
                              )
                            );
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {showCreateDialog && (
          <CreateWorkflowDialog
            onClose={() => {
              setShowCreateDialog(false);
              setCreateForProject(null);
            }}
            onCreate={handleCreateWorkflow}
            initialSlug={createForProject || undefined}
          />
        )}
    </div>
  );
}

