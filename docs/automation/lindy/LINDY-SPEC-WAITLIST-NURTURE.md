# Lindy Automation Spec — Waitlist Nurture

## Purpose

Convert waitlist signups into high-signal validation by segmenting, nurturing, and collecting WTP evidence.

## Owner

- Human owner: Ryan
- Primary Cursor agent: Landing-Builder
- Linked idea: <IDEA>

## Trigger

**Trigger type:** New form submission  

**Trigger source:** Tally / Typeform / Carrd form  

**Trigger condition logic:** Always runs on new signup

## Inputs (Data Fields)

| Field | Type | Required? | Example |
|------|------|-----------|---------|
| email | string | Yes | user@domain.com |
| name | string | No | Sam |
| role | string | Yes | "Agency owner" |
| company_size | enum | No | Solo / 2-10 / 11-50 |
| biggest_pain | string | No | "RFPs take forever" |
| source | enum | Yes | LinkedIn / X / Reddit / Ads |

## Actions (Step-by-Step)

1. **Segment user**
   - Tool/app: Lindy internal
   - Action type: classify
   - Inputs used: role, company_size, biggest_pain
   - Output produced: segment = {Solo, Pro, Team}
   - Failure fallback: default segment = "Solo"

2. **Send welcome email**
   - Tool/app: Gmail/Email
   - Action type: send message
   - Inputs used: email, name, segment
   - Output produced: welcome + value prop + waitlist position
   - Failure fallback: retry once after 1h

3. **Send founder intro audio**
   - Tool/app: Email
   - Action type: send message
   - Inputs used: email, segment
   - Output produced: ElevenLabs intro link
   - Failure fallback: include text-only version

4. **Nurture Day 2**
   - Tool/app: Email
   - Action type: send message
   - Inputs used: email, segment
   - Output produced: pain story + mini-case
   - Failure fallback: skip

5. **Nurture Day 5**
   - Tool/app: Email
   - Action type: send message
   - Inputs used: email
   - Output produced: "how it works" + CTA
   - Failure fallback: skip

6. **WTP survey request Day 7**
   - Tool/app: Email + Tally
   - Action type: send message
   - Inputs used: email
   - Output produced: 3-question WTP survey link
   - Failure fallback: skip

7. **Log signup + segment**
   - Tool/app: Google Sheets
   - Action type: add row/update row
   - Inputs used: all fields + segment
   - Output produced: row appended
   - Failure fallback: retry once

## Timing / Delays

- After step 3 → wait 48h before step 4  
- After step 4 → wait 72h before step 5  
- After step 5 → wait 48h before step 6  

## Success Metrics

- Welcome open rate ≥ 40%
- WTP survey completion ≥ 10%
- Positive WTP signal ≥ 3 users / 7 days

## Logging

- Primary log: Validation Metrics Sheet
- Repo log file: `/docs/validation/RESULTS-<idea>.md`

## Dependencies

- Landing copy: `/docs/validation/LANDING-<idea>.md`
- ElevenLabs audio: <link>

