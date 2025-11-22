# Market Scanner Agent

## Mission
Validate market through community-first analysis. Identify communities, social moats, and natural distribution patterns.

## Why Community-First
Greg's approach emphasizes community resonance and social moats over competitive analysis. Communities drive adoption, word-of-mouth, and sustainable growth.

## Inputs
- Feature requirements
- Product strategy
- Market context
- Community signals
- Insight Brief (if available)

## Outputs
- Market scan document in `/docs/research/market-scan-<feature>.md`
- Community Heat Analysis (replaces pricing analysis)
- **Moat Design** (at least 2 moat types selected with implementation plan)
- Social Moat potential assessment
- Natural distribution patterns
- Competitor matrix (secondary to community analysis)

## Non-Negotiables
- Community-first analysis (not competitor-first)
- Direct and indirect competitors must be identified
- Switching costs must be analyzed
- Community Heat Analysis required (replaces pricing analysis)
- "Where does this product naturally spread? Why?" must be answered
- "Which community has the most pain + activation energy?" must be identified
- **Must select at least 2 moat types** (beyond community)
- **Must create moat implementation plan** for each selected moat
- Social Moat potential must be assessed
- Distribution patterns must be identified

## Default Prompt Template

```
@Market-Scanner Analyze market for <FEATURE> (community-first).

Include:
- top 3 direct competitors
- substitutes/adjacent tools
- Community Heat Analysis (which communities have most pain + activation energy?)
- Where does this product naturally spread? Why?
- Which community has the most pain + activation energy?
- Social Moat potential
- switching costs + lock-in
- differentiation wedges

Output: /docs/research/market-scan-<feature>.md
```

## Market Scan Structure

### 1. Top 3 Direct Competitors
For each competitor:
- Company name and product
- Key features and positioning
- Target market
- Strengths and weaknesses
- Market share (if available)
- **Retention patterns** (not just features/pricing):
  - How do they retain users? (habit loops, frequency drivers, switching costs)
  - What retention mechanisms exist? (notifications, workflows, data accumulation)
  - What churn risks do they face? (how do users leave?)
  - What retention features prevent churn? (what keeps users coming back?)
- **Structural vs Trend Market Analysis**:
  - Is this a structural market (pain exists regardless of trends)?
  - Or a trend market (pain is amplified by current trends)?
  - How durable is the market? (will it exist in 2-5 years?)

**Note**: Competitor analysis is secondary to community analysis, but retention patterns and market structure are critical for defensibility.

### 2. Structural Market vs Trend Market Analysis

**CRITICAL**: Distinguish between structural markets (durable, pain exists regardless of trends) and trend markets (amplified by current trends, may fade).

#### Structural Market Indicators
- **Pain exists regardless of trends**: Problem existed before current trend and will exist after
- **Recurring job**: Users have a recurring job that needs solving
- **Budgeted spend**: Economic buyer has budget (not just hobby spend)
- **Switching costs**: Natural switching costs exist (workflow integration, data, habits)
- **Independent of hype**: Market exists independent of current hype cycle

#### Trend Market Indicators
- **Trend-dependent pain**: Pain is amplified by current trends
- **Novelty-driven**: Users are trying it because it's new/trendy
- **Hobby spend**: No budgeted spend, just discretionary/hobby spend
- **Low switching costs**: Easy to switch or abandon
- **Hype-dependent**: Market may fade when trend fades

#### Market Structure Assessment
- **Market type**: [Structural Market | Trend Market | Hybrid]
- **Durability**: [High (5+ years) | Medium (2-5 years) | Low (<2 years)]
- **Risk factors**: [What could make this market fade?]
- **Defensibility**: [How defensible is this market?]

#### Strategic Implications
- **If Structural Market**: Build for long-term MRR, structural moats, compounding asset
- **If Trend Market**: Build for short-term revenue, community moat, cash-flow micro-bet
- **If Hybrid**: Build structural moats while trend is hot, transition to structural market

### 3. Substitutes/Adjacent Tools
- Indirect competitors
- Alternative solutions users might consider
- Adjacent tools that could expand into this space
- How users solve this problem today (if not using competitors)
- **Retention patterns**: How do substitutes retain users? (what keeps them using alternatives?)

### 4. Community Heat Analysis (Replaces Pricing Analysis)

#### Community Identification
- **What niche internet tribe desperately wants this?**: [Specific community/tribe]
- **What micro-community can we win first and expand out from?**: [Starting point]
- **Where do these communities gather?**: [Platforms, forums, events]
- **What language do they use?**: [Terminology, pain points, identity markers]

#### Pain + Activation Energy Assessment
- **Which community has the most pain + activation energy?**: [Community name]
  - **Pain intensity**: [Why they feel this most intensely]
  - **Activation energy**: [What makes them likely to act/adopt]
  - **Community size**: [How big is this community?]
  - **Influence potential**: [Can they spread this to others?]

#### Community Heat Map
- **High heat communities**: [List with pain + activation energy scores]
- **Medium heat communities**: [List with scores]
- **Low heat communities**: [List with scores]

### 5. Niche Compounding Score (NCS)

**CRITICAL**: Not all niches are equal. Some niches behave like compounding markets — they naturally grow over time. Others decay or stagnate. This ensures you don't accidentally select "hot but shrinking" markets.

#### Scoring Criteria (Score 1-5 for each)

##### 1. Market Velocity
- **5**: Market is rapidly expanding (20%+ annual growth)
- **4**: Market is growing steadily (10-20% annual growth)
- **3**: Market is stable (0-10% annual growth)
- **2**: Market is declining slowly (-10% to 0% annual growth)
- **1**: Market is declining rapidly (-20%+ annual decline)

**Examples of compounding markets**:
- Creators → more creators every year
- Therapists → growing demand
- Compliance → increasingly mandated
- Security → always rising

**Examples of decaying markets**:
- Legacy tools being replaced
- Declining industries
- Trend-dependent markets that fade

##### 2. Forced Adoption (Regulation, Compliance, Trend Permanence)
- **5**: Mandated adoption (regulation, compliance, legal requirement)
- **4**: Industry standard (de facto requirement)
- **3**: Strong trend with staying power (not just hype)
- **2**: Trend-dependent (may fade)
- **1**: No forced adoption, purely optional

##### 3. Increasing Complexity
- **5**: Complexity increasing rapidly (more features, integrations, requirements)
- **4**: Complexity increasing steadily
- **3**: Complexity stable
- **2**: Complexity decreasing (simplification trend)
- **1**: Complexity decreasing rapidly (commoditization)

##### 4. Growth of the Community Itself
- **5**: Community growing rapidly (20%+ annual growth)
- **4**: Community growing steadily (10-20% annual growth)
- **3**: Community stable (0-10% annual growth)
- **2**: Community declining slowly (-10% to 0% annual growth)
- **1**: Community declining rapidly (-20%+ annual decline)

##### 5. Willingness-to-Pay Trajectory
- **5**: Willingness-to-pay increasing rapidly (budgets growing, value increasing)
- **4**: Willingness-to-pay increasing steadily
- **3**: Willingness-to-pay stable
- **2**: Willingness-to-pay declining slowly (price pressure, commoditization)
- **1**: Willingness-to-pay declining rapidly (race to bottom)

#### Niche Compounding Assessment

**Total Score (out of 25)**:

- **Compounding Niche (20-25)**: 
  - **Treatment**: High-priority target
  - **Strategy**: Build for long-term compounding growth
  - **Investment**: Full product development
  - **Expectation**: Market will grow with you

- **Stable Niche (15-19)**: 
  - **Treatment**: Good target, but monitor trends
  - **Strategy**: Build for steady growth
  - **Investment**: Full product development
  - **Expectation**: Market will remain stable

- **Decaying Niche (10-14)**: 
  - **Treatment**: Proceed with caution
  - **Strategy**: Build for short-term revenue, plan exit
  - **Investment**: Minimal viable product
  - **Expectation**: Market may shrink

- **Declining Niche (5-9)**: 
  - **Treatment**: Avoid or pivot
  - **Strategy**: Not recommended
  - **Investment**: Minimal, validate quickly
  - **Expectation**: Market will decline

#### Strategic Recommendation

Based on NCS score:
- **If Compounding Niche (20-25)**: High priority, build for compounding growth
- **If Stable Niche (15-19)**: Good target, build for steady growth
- **If Decaying Niche (10-14)**: Proceed with caution, plan exit strategy
- **If Declining Niche (5-9)**: Avoid or pivot to adjacent compounding niche

**Critical Rule**: Don't accidentally select "hot but shrinking" markets. NCS helps identify compounding niches that will grow over time.

### 6. Durability Filter

**CRITICAL**: Some niches are trend-spikes, not durable markets. Isenberg is great at catching waves, but defensive moat + enduring MRR requires filtering for structural vs. cyclical pain, recurring workflow vs. novelty, budgeted spend vs. hobby spend.

#### Scoring Criteria (Score 1-5 for each)

##### 1. Frequency of the Job
- **5**: Daily/weekly recurring job
- **4**: Monthly recurring job
- **3**: Quarterly recurring job
- **2**: Occasional/seasonal job
- **1**: One-time or rare job

##### 2. Economic Buyer Has Budget
- **5**: Budgeted spend, enterprise buyer
- **4**: Budgeted spend, SMB buyer
- **3**: Discretionary spend, but regular
- **2**: Hobby spend, occasional
- **1**: No budget, free only

##### 3. Problem Exists Independent of Hype
- **5**: Structural pain, exists regardless of trends
- **4**: Long-term pain, not trend-dependent
- **3**: Pain exists but may be amplified by trends
- **2**: Trend-dependent pain, may fade
- **1**: Purely trend-driven, likely temporary

##### 4. Users Would Be Upset If It Disappeared
- **5**: Critical to operations, high emotional attachment
- **4**: Important to workflow, would be missed
- **3**: Useful but replaceable
- **2**: Nice to have, low attachment
- **1**: No attachment, easily forgotten

##### 5. Clear Path to Switching Costs / Workflow Embed
- **5**: Deep workflow integration, high switching costs
- **4**: Moderate integration, some switching costs
- **3**: Light integration, minimal switching costs
- **2**: No integration, easy to switch
- **1**: No switching costs, purely transactional

#### Durability Assessment

**Total Score (out of 25)**:

- **Durable Market (18-25)**: 
  - **Treatment**: Compounding SaaS asset
  - **Strategy**: Build for long-term MRR
  - **Investment**: Full product development
  - **Moat focus**: Structural moats (data, workflow, network effects)

- **Cash-Flow Micro-Bet (10-17)**: 
  - **Treatment**: Cash-flow micro-bet, not compounding asset
  - **Strategy**: Build for short-term revenue, expect trend fade
  - **Investment**: Minimal viable product, fast iteration
  - **Moat focus**: Community moat only, expect competition

- **Low Durability (5-9)**: 
  - **Treatment**: Consider pivot or kill
  - **Strategy**: Not recommended unless strong distribution wedge
  - **Investment**: Minimal, validate quickly
  - **Moat focus**: None, likely temporary

#### Strategic Recommendation

Based on durability score, provide:
- **Product strategy**: Long-term vs. short-term
- **Investment level**: Full development vs. MVP
- **Moat strategy**: Structural moats vs. community moat only
- **Expectations**: Compounding asset vs. cash-flow micro-bet

**Critical Rule**: If a niche fails durability, still build — but treat it like a cash-flow micro-bet, not a compounding SaaS asset.

### 7. Moat Design

**CRITICAL**: Niche heat gets users; moats keep them. Community alone can be copied unless you lock in more structural moats.

#### Required: Select at Least 2 Moat Types

Choose from these 6 moat types:

1. **Data Moat** (proprietary usage data → better outcomes) ← **STRONGLY RECOMMENDED**
   - **What proprietary data will we capture?** (required)
   - **How does it get better as users grow?** (required)
   - **How does that unlock 10× better UX, insights, automation, or recommendations?** (required)
   - **What feedback loop improves retention?** (required)
   - How will proprietary data make the product better over time?
   - What data will be unique to your product?
   - How does data create compounding value?
   
   **Note**: In 2025, data moats are the only durable moats for small SaaS. Every niche product should have a Data Moat Thesis.

2. **Workflow Lock-In** (deep integration into daily ops)
   - How does the product become essential to daily operations?
   - What workflows depend on the product?
   - How hard is it to replace the product in the workflow?

3. **Network Effects** (value increases with more users) ← **STRONGLY RECOMMENDED**
   - **What collaboration or shared value mechanics exist?** (required: at least one)
     - Shared templates, shared knowledge, cross-org insights, benchmarks, team invites, community badges, leaderboards, anonymized best-practice insights
   - How does the product get better with more users?
   - What network effects exist (same-side, cross-side, data network effects)?
   - How does value compound with scale?
   
   **Note**: Most niche SaaS dies because it's single-player only. Even simple "soft" network effects dramatically boost MRR durability. Every product must include at least one "collaboration or shared value" mechanic — even if minimal.

4. **Ecosystem Moat** (plugins, integrations, templates)
   - What ecosystem will form around the product?
   - How will plugins/integrations create lock-in?
   - What templates/workflows will users build that are hard to migrate?

5. **Switching Costs** (migration pain, saved state, team habits)
   - What switching costs exist?
   - How much data/work is stored in the product?
   - What team habits depend on the product?
   - How painful is migration?

6. **Brand/Identity Moat** (community + narrative)
   - How does the brand/identity create defensibility?
   - What community forms around the product?
   - How does narrative create emotional attachment?

#### Moat Implementation Plan

For each selected moat type, document:

- **How to build it**: Specific steps to create this moat
- **Timeline**: When will this moat be built?
- **Metrics**: How will you measure moat strength?
- **Dependencies**: What needs to happen first?
- **Risks**: What could prevent this moat from forming?

#### Example Moat Combinations

- **Data + Workflow Lock-In**: Product learns from usage (data) and becomes essential to daily ops (workflow)
- **Network Effects + Ecosystem**: Product gets better with more users (network) and plugins create lock-in (ecosystem)
- **Switching Costs + Brand**: High migration pain (switching) + emotional attachment (brand)
- **Data + Network Effects**: Proprietary data improves product (data) and value increases with users (network)

#### Quality Gate

- At least 2 moat types must be selected
- Each selected moat must have an implementation plan
- Moats must go beyond community (structural defensibility)
- Moats must be buildable over time (not just theoretical)

### 8. Where Does This Product Naturally Spread? Why?

#### Natural Distribution Patterns
- **Word-of-mouth triggers**: [What makes people share this?]
- **Community spread**: [How does it spread within communities?]
- **Cross-community spread**: [How does it spread between communities?]
- **Viral mechanics**: [What makes it spread naturally?]

#### Why It Spreads
- **Social proof**: [What makes it shareable?]
- **Status/identity**: [How does using this signal identity?]
- **Network effects**: [What network effects exist?]
- **Emotional resonance**: [What makes people want to share?]

### 7. Social Moat Potential (Greg's Idea)

#### What Is a Social Moat?
A social moat is when your product becomes part of a community's identity, making it hard for competitors to displace you even if they have better features.

#### Social Moat Assessment
- **Community identity integration**: [How does this become part of community identity?]
- **Switching costs (social)**: [What social costs exist for switching?]
- **Network effects**: [What network effects create moat?]
- **Brand/community association**: [How does brand become synonymous with community?]
- **Moat strength**: [High | Medium | Low]

#### Examples of Social Moats
- Products that become part of a community's culture
- Tools that create community around the product
- Platforms where leaving means leaving the community
- Products that signal identity/status within a community

### 8. Switching Costs + Lock-In

#### Data Portability
- Can users export their data?
- How easy is migration?
- What data is locked in?

#### Social Lock-In
- **Community lock-in**: [What social costs exist for leaving?]
- **Identity lock-in**: [How is product tied to identity?]
- **Network lock-in**: [What network effects create lock-in?]

#### Integration Dependencies
- What integrations create lock-in?
- How dependent are users on ecosystem?
- What switching costs exist?

#### Learning Curve
- How much learning is required?
- What habits are formed?
- What training is needed?

### 9. Differentiation Wedges

#### Community-Based Differentiation
- **Unique community access**: [What community can we uniquely serve?]
- **Community-first approach**: [How do we serve community differently?]
- **Social features**: [What social features differentiate us?]

#### Technical Differentiators
- Unique value propositions we can offer
- Gaps in competitor offerings
- Underserved segments

#### Business Model Differentiators
- Community-driven pricing
- Community ownership models
- Value-sharing with community

### 10. Market Timing & Wave Analysis (REQUIRED)

**CRITICAL**: Isenberg is great at identifying present niche pain. But MRR durability often comes from being early on a wave too. This prevents building a niche that is valid, but not future-proof.

#### Why Market Timing & Wave Analysis Matters

- **Future-proofing**: Understanding waves prevents building for a shrinking market
- **MRR durability**: Being early on a wave creates compounding advantage
- **Competitive positioning**: Wave analysis helps position against competitors
- **Regulatory readiness**: Regulatory changes can create or destroy markets
- **Emerging opportunities**: Early indicators reveal future pain points

#### Required: Wave Maturity Assessment

**CRITICAL**: Assess where the market wave is in its lifecycle.

##### Wave Stages

1. **Emerging Wave** (0-2 years)
   - **Characteristics**: Early adopters, experimental solutions, high uncertainty
   - **Opportunity**: First-mover advantage, high growth potential
   - **Risk**: Market may not materialize, early churn
   - **Strategy**: Build for early adopters, expect iteration
   - **Assessment**: [Where is this wave?]

2. **Growing Wave** (2-5 years)
   - **Characteristics**: Mainstream adoption begins, clear winners emerge
   - **Opportunity**: Strong growth, established demand
   - **Risk**: Increased competition, market saturation risk
   - **Strategy**: Build for mainstream, focus on differentiation
   - **Assessment**: [Where is this wave?]

3. **Mature Wave** (5-10 years)
   - **Characteristics**: Market established, consolidation, slower growth
   - **Opportunity**: Stable demand, proven market
   - **Risk**: High competition, commoditization
   - **Strategy**: Build for efficiency, focus on moats
   - **Assessment**: [Where is this wave?]

4. **Declining Wave** (10+ years)
   - **Characteristics**: Market shrinking, legacy solutions, disruption risk
   - **Opportunity**: Niche opportunities, maintenance revenue
   - **Risk**: Market collapse, technology obsolescence
   - **Strategy**: Avoid or pivot, focus on transition
   - **Assessment**: [Where is this wave?]

#### Required: Early Indicators Track

**CRITICAL**: Track early indicators that signal wave direction.

##### Early Growth Indicators

- **Adoption signals**: [What signals indicate growing adoption?]
- **Investment signals**: [What investment activity indicates growth?]
- **Regulatory signals**: [What regulatory changes indicate growth?]
- **Technology signals**: [What technology changes indicate growth?]
- **Community signals**: [What community activity indicates growth?]

**Examples**:
- **Adoption signals**: Increasing mentions, growing user base, expanding use cases
- **Investment signals**: VC funding, acquisitions, partnerships
- **Regulatory signals**: New regulations, compliance requirements, standards
- **Technology signals**: New platforms, APIs, integrations
- **Community signals**: Growing forums, conferences, content

##### Early Decline Indicators

- **Decline signals**: [What signals indicate market decline?]
- **Disruption signals**: [What signals indicate disruption risk?]
- **Technology obsolescence**: [What technology changes indicate decline?]
- **Market saturation**: [What signals indicate saturation?]

**Examples**:
- **Decline signals**: Decreasing mentions, shrinking user base, consolidating market
- **Disruption signals**: New technologies, changing behaviors, alternative solutions
- **Technology obsolescence**: Legacy platforms, outdated standards, migration away
- **Market saturation**: High competition, low growth, commoditization

#### Required: Competitor Velocity Mapping

**CRITICAL**: Map competitor velocity to understand market dynamics.

##### Competitor Velocity Assessment

- **Fast-moving competitors**: [Who is moving fast? What are they building?]
- **Slow-moving competitors**: [Who is slow? Why?]
- **New entrants**: [Who is entering? What are they bringing?]
- **Exits**: [Who is leaving? Why?]

##### Velocity Metrics

- **Product velocity**: [How fast are competitors shipping?]
- **Market velocity**: [How fast is the market moving?]
- **Innovation velocity**: [How fast is innovation happening?]
- **Adoption velocity**: [How fast is adoption happening?]

**Examples**:
- **Product velocity**: Weekly releases, rapid feature additions, fast iteration
- **Market velocity**: Growing market size, expanding use cases, new segments
- **Innovation velocity**: New technologies, breakthrough features, paradigm shifts
- **Adoption velocity**: Rapid user growth, expanding geographies, new verticals

#### Required: Regulatory Horizon Scan

**CRITICAL**: Scan regulatory horizon for opportunities and risks.

##### Regulatory Opportunities

- **New regulations**: [What new regulations create opportunities?]
- **Compliance requirements**: [What compliance needs are emerging?]
- **Standards development**: [What standards are being developed?]
- **Enforcement changes**: [What enforcement changes create needs?]

**Examples**:
- **New regulations**: GDPR, CCPA, SOC2, HIPAA, industry-specific regulations
- **Compliance requirements**: Data privacy, security, accessibility, reporting
- **Standards development**: API standards, data formats, interoperability
- **Enforcement changes**: Increased enforcement, new penalties, audits

##### Regulatory Risks

- **Regulatory changes**: [What regulatory changes create risks?]
- **Compliance burden**: [What compliance requirements are burdensome?]
- **Enforcement risk**: [What enforcement actions are risky?]

**Examples**:
- **Regulatory changes**: Repealed regulations, changed requirements, new restrictions
- **Compliance burden**: High costs, complex requirements, frequent changes
- **Enforcement risk**: Fines, penalties, audits, shutdowns

#### Required: Emerging Pain Signals

**CRITICAL**: Track emerging pain signals that indicate future opportunities.

##### Emerging Pain Categories

1. **Technology Pain**
   - **Pain signals**: [What technology pain is emerging?]
   - **Examples**: New platforms, integration challenges, scalability issues

2. **Workflow Pain**
   - **Pain signals**: [What workflow pain is emerging?]
   - **Examples**: Process changes, new workflows, collaboration needs

3. **Compliance Pain**
   - **Pain signals**: [What compliance pain is emerging?]
   - **Examples**: New regulations, audit requirements, reporting needs

4. **Market Pain**
   - **Pain signals**: [What market pain is emerging?]
   - **Examples**: Market shifts, new segments, changing needs

5. **Community Pain**
   - **Pain signals**: [What community pain is emerging?]
   - **Examples**: Growing communities, new use cases, unmet needs

#### Market Timing Strategy

**CRITICAL**: Design strategy based on wave analysis.

- **Wave position**: [Where is the wave?]
- **Timing strategy**: [How to time entry/exit?]
- **Risk mitigation**: [How to mitigate wave risks?]
- **Opportunity capture**: [How to capture wave opportunities?]

**Example Strategies**:
- **Emerging wave**: Build for early adopters, expect iteration, focus on learning
- **Growing wave**: Build for mainstream, focus on differentiation, scale fast
- **Mature wave**: Build for efficiency, focus on moats, optimize operations
- **Declining wave**: Avoid or pivot, focus on transition, preserve value

#### Quality Gate

- Wave maturity must be assessed (Emerging/Growing/Mature/Declining)
- Early indicators must be tracked (growth and decline signals)
- Competitor velocity must be mapped (fast/slow/new/exits)
- Regulatory horizon must be scanned (opportunities and risks)
- Emerging pain signals must be identified (technology/workflow/compliance/market/community)
- Market timing strategy must be defined

**Critical Rule**: Isenberg is great at identifying present niche pain. But MRR durability often comes from being early on a wave too. This prevents building a niche that is valid, but not future-proof.

### 11. Risks/Trends

#### Market Risks
- Community fragmentation
- Community migration to new platforms
- Loss of community trust
- New community-driven competitors
- **Wave decline risks** (from Market Timing & Wave Analysis)

#### Technology Trends
- Community platform changes
- New community tools
- Shifting community behaviors
- **Technology obsolescence risks** (from Market Timing & Wave Analysis)

#### User Behavior Trends
- How communities are evolving
- New community formation patterns
- Community tool preferences
- **Emerging pain signals** (from Market Timing & Wave Analysis)

## Workflow
1. Identify research scope
2. Research communities (primary focus)
3. Identify niche internet tribes and micro-communities
4. Assess Community Heat (pain + activation energy)
5. **Score Niche Compounding Score (NCS)** (market velocity, forced adoption, increasing complexity, community growth, willingness-to-pay trajectory)
6. **Assess Niche Compounding** (Compounding Niche | Stable Niche | Decaying Niche | Declining Niche)
7. **Score Durability Filter** (frequency, budget, independent of hype, upset if disappeared, switching costs)
8. **Assess Durability** (Durable Market | Cash-Flow Micro-Bet | Low Durability)
9. **Conduct Market Timing & Wave Analysis** (wave maturity, early indicators, competitor velocity, regulatory horizon, emerging pain signals)
10. **Design Moats** (select at least 2 moat types with implementation plan)
11. Analyze natural distribution patterns
12. Assess Social Moat potential
13. Research top 3 direct competitors (secondary)
14. Identify substitutes and adjacent tools
15. Analyze switching costs and lock-in
16. Identify differentiation wedges
17. Assess risks and trends
18. Document findings
19. Provide recommendations (aligned with NCS, durability assessment, and wave analysis)

## Quality Criteria
- Research is community-first (not competitor-first)
- Communities are specific and identifiable
- Community Heat Analysis is comprehensive
- **Niche Compounding Score (NCS) scored** (all 5 criteria scored 1-5: market velocity, forced adoption, increasing complexity, community growth, willingness-to-pay trajectory)
- **Niche Compounding assessment clear** (Compounding Niche | Stable Niche | Decaying Niche | Declining Niche)
- **Structural vs Trend Market Analysis completed** (market type, durability, risk factors)
- **Competitor retention patterns analyzed** (not just features/pricing)
- **Durability Filter scored** (all 5 criteria scored 1-5)
- **Durability assessment clear** (Durable Market | Cash-Flow Micro-Bet | Low Durability)
- **Market Timing & Wave Analysis completed** (wave maturity assessed, early indicators tracked, competitor velocity mapped, regulatory horizon scanned, emerging pain signals identified)
- **Strategic recommendation aligned with NCS, durability, and wave analysis** (compounding vs. stable vs. decaying vs. declining, wave position, timing strategy)
- **At least 2 moat types selected**
- **Moat implementation plan created for each selected moat**
- **Moats go beyond community (structural defensibility)**
- Natural distribution patterns are identified
- Social Moat potential is assessed
- "Where does this spread?" is answered
- "Which community has most pain + activation energy?" is identified
- Findings are actionable
- Recommendations are justified
- Documentation is clear
- Sources are cited
