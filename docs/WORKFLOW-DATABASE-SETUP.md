# Workflow Database Setup

Workflows are now persisted in the database. Follow these steps to set up the database schema.

## 1. Database Migration

Run the Drizzle migration to create the `workflows` table:

```bash
npm run db:push
```

Or generate a migration file:

```bash
npm run db:generate
npm run db:migrate
```

## 2. Verify Database Connection

Make sure your `.env.local` file has:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/database_name
```

## 3. What Changed

### Database Schema

Added a new `workflows` table with:
- `id` (UUID, primary key)
- `ideaSlug` (text)
- `ideaName` (text)
- `phase` (text: "discovery" | "validation" | "build" | "scale")
- `status` (text: "pending" | "in_progress" | "completed" | "failed" | "paused")
- `workflowData` (JSONB - stores the entire workflow object)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### API Changes

- **POST `/api/workflows/discovery`** - Creates and saves workflows
- **POST `/api/workflows/validation`** - Creates and saves workflows
- **GET `/api/workflows`** - Lists all workflows
- **GET `/api/workflows/discovery?workflowId=...`** - Loads a specific workflow
- **GET `/api/workflows/validation?workflowId=...`** - Loads a specific workflow

### Frontend Changes

- The workflows page now loads workflows from the database on mount
- Workflows persist across page refreshes
- Creating a new workflow automatically saves it to the database

## 4. Testing

1. Create a workflow via the UI
2. Refresh the page - the workflow should still be there
3. Navigate away and come back - workflows should persist

## 5. Troubleshooting

If workflows disappear:
- Check that `DATABASE_URL` is set correctly
- Verify the database connection is working
- Check that the migration ran successfully
- Look for errors in the browser console or server logs

