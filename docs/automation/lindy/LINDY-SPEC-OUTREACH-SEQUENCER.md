# Lindy Automation Spec — Outreach Sequencer

## Purpose

Run automated DM/email outreach for validation and schedule interviews.

## Owner

- Human owner: Ryan
- Primary Cursor agent: Distribution-Operator
- Linked idea: <IDEA>

## Trigger

**Trigger type:** New spreadsheet row  

**Trigger source:** Google Sheet "Prospects" tab  

**Trigger condition logic:** status = "New"

## Inputs (Data Fields)

| Field | Type | Required? | Example |
|------|------|-----------|---------|
| name | string | No | Taylor |
| handle_or_email | string | Yes | @taylor / taylor@x.com |
| channel | enum | Yes | LinkedIn / X / Email |
| angle | enum | Yes | Speed / Money / Status |
| script_variant | enum | Yes | A / B / C |
| status | enum | Yes | New / Sent / Replied / Booked / Closed |

## Actions

1. **Select script**
   - Tool/app: Lindy internal
   - Action type: choose variant
   - Inputs used: angle, script_variant
   - Output: outreach message body

2. **Send outreach**
   - Tool/app: LinkedIn / X / Email
   - Action type: send message
   - Inputs: handle_or_email, message body
   - Output: message sent
   - Fallback: retry once after 2h

3. **Wait 48h**
   - Tool/app: Lindy scheduler

4. **If no reply → follow-up**
   - Tool/app: same channel
   - Action type: send message
   - Inputs: follow-up script

5. **Tag reply sentiment**
   - Tool/app: Lindy internal
   - Action: classify
   - Output: Interested / Not now / No

6. **If Interested → send calendar link**
   - Tool/app: Email/DM
   - Action: send message
   - Inputs: Calendly/Calendar link

7. **Update Sheet status**
   - Tool/app: Google Sheets
   - Action: update row
   - Inputs: status, sentiment, notes

## Branching

- If reply = Interested → steps 6–7
- If reply = Not now or No → step 7 only

## Success Metrics

- Reply rate ≥ 20%
- "Interested" rate ≥ 5–10%
- 5+ interviews booked / week

## Logging

- Prospect Sheet + `/docs/validation/RESULTS-<idea>.md`

## Dependencies

- DM scripts from `/docs/validation/DISTRIBUTION-<idea>.md`

