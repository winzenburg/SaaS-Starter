# Niche Intelligence Agent

> Stage 1 of Product Discovery: Understand the niche - culture, vocabulary, identity, geography, income, communities, trends

## Mission

Understand the niche deeply: culture, vocabulary, identity, geography, income, communities, and trends. Map psychographics, subcultures, language patterns, identity signals, status markers, and entry points to earn trust in the niche.

## When to Use

- **Stage 1 of Product Discovery**: First stage after raw idea
- **Before Problem Analysis**: Must complete before Stage 2 (Pain Signal Analysis)
- **Discovery Workflow**: Step 3 in 8-step discovery pipeline

## AI Tool Integrations

- **Manus.im**: Raw narrative generation, competitive scans
- **ChatGPT**: Synthesis, cross-checking, analysis
- **Cursor**: Produce documentation

## Required Inputs

1. **Manus Niche Narrative** (REQUIRED)
   - Raw narrative from Manus
   - Niche insights and characteristics

2. **Competitor Landscape** (REQUIRED)
   - Competitor analysis from Manus
   - Competitive positioning

3. **Persona Overview** (REQUIRED)
   - Initial persona insights from Manus
   - Target audience characteristics

## Core Tasks

### 1. Map Niche Size, Psychographics, and Subcultures

**Tools**: ChatGPT + Cursor

**Mapping Elements**:
- Niche size (TAM, SAM, target market)
- Psychographics (values, beliefs, attitudes, lifestyle, personality traits)
- Subcultures (distinct groups within the niche)
- Demographics (if relevant)
- Geographic distribution
- Income levels

### 2. Extract Language Patterns, Identity Signals, Status Markers

**Tools**: Manus + ChatGPT

**Extraction Elements**:
- Language patterns (terminology, jargon, phrases)
- Identity signals (how niche members signal identity)
- Status markers (what indicates status or credibility)
- Communication style
- Cultural references (shared references, memes, inside jokes)

### 3. Identify Communities

**Tools**: ChatGPT + Cursor

**Community Platforms**:
- Reddit (subreddits)
- Slack (communities and workspaces)
- Discord (servers)
- Facebook Groups
- LinkedIn Clusters
- Other platforms (Twitter/X, forums, newsletters)

**For Each Community**:
- Community name and platform
- Size and engagement level
- Entry requirements
- Community culture and norms
- Key influencers and leaders

### 4. Define Entry Points (How Founders Earn Trust)

**Tools**: ChatGPT + Cursor

**Entry Point Elements**:
- Trust signals
- Credibility requirements
- Community participation strategies
- Value-first approaches
- Relationship building strategies
- Content strategy
- Distribution channels

### 5. Document Niche Worldview and Cultural Tensions

**Tools**: Manus + ChatGPT

**Worldview Elements**:
- Core beliefs
- Values
- Aspirations
- Fears
- Cultural tensions
- Taboos
- Status hierarchies

## Outputs

**Output**: `/docs/discovery/NICHE-INTEL-<idea-slug>.md`

**Required Sections**:
1. Niche Overview
2. Niche Size, Psychographics, and Subcultures
3. Language Patterns, Identity Signals, Status Markers
4. Communities (all platforms)
5. Entry Points (How Founders Earn Trust)
6. Niche Worldview and Cultural Tensions
7. Trends
8. Recommendations

## Quality Criteria

- ✅ Niche size mapped (TAM, SAM, target market, psychographics, subcultures)
- ✅ Language patterns extracted (terminology, jargon, phrases, communication style)
- ✅ Identity signals identified (how niche members signal identity, status markers)
- ✅ Communities identified (Reddit, Slack, Discord, Facebook groups, LinkedIn clusters)
- ✅ Entry points defined (how founders earn trust, credibility requirements, value-first approaches)
- ✅ Worldview documented (core beliefs, values, aspirations, fears, cultural tensions)
- ✅ Recommendations provided (niche viability, entry strategy, next steps)

## Integration Points

- **Before**: Raw product idea + Manus outputs
- **After**: Stage 2 (Pain Signal Analysis) - niche intelligence is required input
- **Rule**: `.cursor/rules/041-niche-intelligence.mdc`
- **Workflow**: `docs/DISCOVERY-WORKFLOW.md`

## Prompt Template

```
@Niche-Intelligence-Agent Understand the niche for <IDEA>.

Input:
- Manus niche narrative: [From Manus Narrative Agent]
- Competitor landscape: [From competitor analysis]
- Persona overview: [From persona research]
- Manus References section: [Full citations with URLs from Manus document]

Tasks:
1) Map niche size, psychographics, and subcultures
2) Extract language patterns, identity signals, status markers
3) Identify communities: Reddit, Slack, Discord, Facebook groups, LinkedIn clusters
4) Define "entry points" (how founders earn trust)
5) Document niche worldview and cultural tensions
6) Produce documentation (Cursor)

**CRITICAL: Citation Requirements**
- When referencing sources, you MUST include the full citation with URL, not just the number
- Format: "Source: [1] Author, A. (Year). Title. Publisher. - https://example.com/article"
- Example: "Source: [1] Moreno Celta, R. (2025). Design System Trends That Are Actually Worth Following in 2025. Design Systems Collective. - https://www.designsystemscollective.com/design-system-trends-that-are-actually-worth-following-in-2025-44a405348687"
- Do NOT use generic references like "Source: Manus Discovery Pack" or "Source: [1]"
- All claims must be backed by full citations with URLs from the Manus References section

Output: /docs/discovery/NICHE-INTEL-<idea-slug>.md
```

## See Also

- `.cursor/rules/041-niche-intelligence.mdc` - Niche intelligence rules
- `.cursor/rules/300-discovery-master.mdc` - Discovery master rule
- `.cursor/rules/302-discovery-workflow.mdc` - Discovery workflow
- `docs/agents/manus-narrative-agent.md` - Manus agent
- `docs/agents/chatgpt-reasoning-agent.md` - ChatGPT agent

