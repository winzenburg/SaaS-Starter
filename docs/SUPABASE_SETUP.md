# Supabase Database Setup

## Getting Your Connection String

1. Go to your [Supabase project dashboard](https://supabase.com/dashboard/project/qfxxoxpxtmxdyvrnmexu)
2. Click **Settings** (gear icon) → **Database**
3. Scroll to **Connection string** section
4. Under **Connection pooling**, select **Transaction mode**
5. Copy the connection string (it will look like):
   ```
   postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

## Setting Up Your Environment

1. Open `.env.local` in your project root
2. Update or add the `DATABASE_URL`:
   ```bash
   DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```
   
   **Important**: Use the **Transaction mode** connection string for Drizzle migrations.

## Running Database Migrations

Once your `DATABASE_URL` is set, run:

```bash
# Push the schema to your Supabase database
npm run db:push
```

This will create the following tables:
- `users` - User accounts
- `workflows` - Discovery and validation workflows

## Verifying the Setup

After running migrations, you can verify in Supabase:
1. Go to **Table Editor** in your Supabase dashboard
2. You should see `users` and `workflows` tables

## Importing Existing Discovery Documents

Once your database is set up, import your discovery documents as workflows:

```bash
npx tsx scripts/import-discovery-documents-as-workflow.ts enterprise-design-system-startups
```

This will:
- Find all discovery documents for the project
- Create a workflow record in the database
- Mark steps as completed based on existing documents
- Link documents to workflow steps

## Troubleshooting

### Connection Refused
- Make sure you're using the **Transaction mode** connection string
- Check that your IP is allowed in Supabase (Settings → Database → Connection pooling)

### Migration Errors
- Ensure your Supabase project is active
- Check that the connection string is correct
- Verify you have the correct password

### Import Script Errors
- Make sure `DATABASE_URL` is set correctly
- Verify the database tables exist (run `npm run db:push` first)
- Check that discovery documents exist in `docs/discovery/`

