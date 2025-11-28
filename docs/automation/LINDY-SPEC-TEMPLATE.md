# Lindy Automation Spec — <AUTOMATION_NAME>

## Purpose

Briefly state what this automation does and why it exists.

## Owner

- Human owner: <your name>
- Primary Cursor agent: <agent name>
- Linked idea: <IDEA NAME / #>

## Trigger

**Trigger type:** (choose one)
- New form submission
- New spreadsheet row
- New inbox message
- Scheduled time
- Webhook/API event
- Manual trigger

**Trigger source:**
- Tool/app: <Tally/Typeform/Google Sheet/Gmail/Slack/etc.>
- Location/identifier: <link or sheet/tab name>

**Trigger condition logic:**
- Condition 1: <e.g., `segment = "Pro"`>
- Condition 2: <e.g., `intent_score >= 7`>
- If multiple, specify AND/OR.

## Inputs (Data Fields)

List all fields Lindy must read.

| Field | Type | Required? | Example |
|------|------|-----------|---------|
| email | string | Yes | user@domain.com |
| name | string | No | Chris |
| niche | string | Yes | HVAC SMB |
| segment | enum | Yes | Solo / Team / Enterprise |
| source | enum | Yes | LinkedIn / X / Reddit / Ads |
| pain | string | No | "Billing is a mess" |
| intent_score | number | No | 8 |

## Actions (Step-by-Step)

Each action is atomic, 1 job per step.

1. **Action name:** <short verb phrase>
   - Tool/app: <Gmail/Slack/Sheets/Calendar/etc.>
   - Action type: <send message / update row / schedule / tag / summarize>
   - Inputs used: <list fields>
   - Output produced: <what Lindy generates>
   - Failure fallback: <manual step or retry>

2. **Action name:** ...
   - …

## Branching / Routing

Specify decision branches.

- **Branch A condition:** <logic>
  - Steps executed: <list action numbers>
- **Branch B condition:** <logic>
  - Steps executed: …

## Timing / Delays

If delays exist, list them explicitly.

- Delay after step X: <e.g., 48 hours>
- Retry policy: <e.g., retry 1× after 2 hours>

## Success Metrics

What makes this automation "working"?

- Metric 1: <e.g., open rate >= 40%>
- Metric 2: <e.g., reply rate >= 20%>
- Metric 3: <e.g., WTP survey completion >= 10%>

## Logging

Where actions/results go.

- Primary log: <Sheet/Notion/Airtable link>
  - **Exact sheet/tab name:** `<Sheet Name> - <Tab Name>` (e.g., `Validation Metrics - Waitlist Intake`)
- Fields written:
  - <status>
  - <timestamp>
  - <outcome>
  - <notes>
- Repo log file:
  - **Exact path:** `/docs/validation/RESULTS-<idea>.md` (append daily summaries)

## Dependencies

Tools or assets required. **MUST include exact paths and links.**

- Manus output: **Exact path:** `/docs/discovery/NARRATIVE-<idea>.md`
- Validation thresholds: **Exact path:** `/docs/validation/VALIDATION-PLAN-<idea>.md`
- Landing copy: **Exact path:** `/docs/validation/LANDING-<idea>.md`
- Voice assets: **Exact ElevenLabs link(s):** `<full URL or file path>`
- Visuals folder: **Exact path:** `/docs/validation/assets/<idea>/`

## Notes / Edge Cases

- Edge case 1
- Edge case 2

