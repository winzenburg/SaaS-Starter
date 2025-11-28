# Lindy Automation Spec — Daily Validation Brief

## Purpose

Auto-summarize validation results daily and compare to thresholds.

## Owner

- Human owner: Ryan
- Primary Cursor agent: Demand-Validator
- Linked idea: <IDEA>

## Trigger

**Trigger type:** Scheduled time  

**Trigger source:** Daily at 8:00am local

## Inputs

- Validation Metrics Sheet
- Thresholds from `/docs/validation/VALIDATION-PLAN-<idea>.md`

## Actions

1. **Pull latest metrics**
   - Tool: Google Sheets
   - Output: signups, conversion %, CTR, DM replies, WTP signals

2. **Compare to thresholds**
   - Tool: Lindy internal
   - Output: pass/fail per test

3. **Generate recommendation**
   - Tool: Lindy internal
   - Output: Proceed / Pivot / Kill + reasoning

4. **Post summary**
   - Tool: Slack or Email
   - Output: daily brief message

5. **Append to repo results**
   - Tool: manual step (Cursor)
   - Output: paste into `/docs/validation/RESULTS-<idea>.md`

## Success Metrics

- Daily brief posted without fail
- Threshold drift detected within 24h

## Logging

- Primary log: Validation Metrics Sheet
- Repo log file: `/docs/validation/RESULTS-<idea>.md`

## Dependencies

- Threshold doc: `/docs/validation/VALIDATION-PLAN-<idea>.md`

