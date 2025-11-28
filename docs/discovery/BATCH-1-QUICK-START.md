# Batch 1 Discovery - Quick Start

> Run initial validation for all 5 Batch 1 projects in one command

## 🚀 Quick Start

### Run Step 1 (Manus Discovery Pack) for All 5 Projects

```bash
npm run discovery:batch-1
```

This will:
1. ✅ Execute Manus API calls for each project
2. ✅ Generate niche narrative, persona, and competitor analysis
3. ✅ Save results to `docs/discovery/MANUS-<slug>.md`
4. ✅ Create workflows in database (if DATABASE_URL is set)

**Time**: ~10-15 minutes

## 📋 What Gets Generated

For each of the 5 projects:

```
docs/discovery/
├── MANUS-amazon-fba-seller-intelligence.md
├── MANUS-real-estate-investor-flipper.md
├── MANUS-ai-meeting-assistant.md
├── MANUS-ai-code-review-docs.md
└── MANUS-enterprise-design-system-startups.md
```

Each file contains:
- **Niche Narrative**: Culture, vocabulary, identity, communities, trends
- **Persona**: Target buyer profile and psychographics
- **Competitor Analysis**: Landscape, gaps, differentiation opportunities
- **Raw Data**: Complete JSON output for further processing

## ✅ Prerequisites

1. **API Keys** in `.env.local`:
   ```env
   MANUS_API_KEY=your_manus_api_key
   DATABASE_URL=your_database_url  # Optional, for workflow persistence
   ```

2. **Dependencies installed**:
   ```bash
   npm install
   ```

## 📊 Projects in Batch 1

1. **Amazon FBA Seller Intelligence**
2. **Real Estate Investor & Flipper Platform**
3. **AI Meeting Assistant**
4. **AI Code Review & Documentation Tool**
5. **Enterprise Design System for Startups**

## 🔄 Next Steps

After Step 1 completes:

1. **Review outputs** - Check `docs/discovery/MANUS-*.md` files
2. **Run Step 2** - ChatGPT Refinement (manual or via workflows UI)
3. **Run Steps 3-6** - Cursor agents for each project
4. **Calculate scores** - Opportunity Score for each idea
5. **Select top 3** - Ideas with Score ≥ 8.0 proceed to validation

## 🛠️ Troubleshooting

### API Key Missing
```
Error: MANUS_API_KEY is required
```
**Fix**: Add `MANUS_API_KEY=your_key` to `.env.local`

### Database Not Connected
```
⚠️  DATABASE_URL not set - skipping workflow creation
```
**Fix**: Add `DATABASE_URL=your_connection_string` to `.env.local` (optional)

### Rate Limiting
If you hit rate limits, the script includes delays. For manual execution:
- Run projects individually
- Increase delay in script (currently 2 seconds)

## 📚 Full Documentation

- **Execution Guide**: `docs/discovery/BATCH-1-EXECUTION-GUIDE.md`
- **Workflow Guides**: `docs/discovery/WORKFLOW-*.md`
- **Status Tracker**: `docs/portfolio/BATCH-1-STATUS.md`
