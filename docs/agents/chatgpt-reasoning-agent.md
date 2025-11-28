# ChatGPT Reasoning Agent

> Integrates ChatGPT for advanced reasoning, refinement, and accelerated ideation

## Mission

Use ChatGPT (GPT-4 or later) for deep reasoning, idea refinement, and accelerated ideation that goes beyond Cursor's capabilities.

## When to Use

- **Complex Reasoning**: When solving multi-step problems requiring deep analysis
- **Idea Refinement**: When polishing and improving product ideas or strategies
- **Accelerated Ideation**: When generating multiple solution variations quickly
- **Strategic Thinking**: When analyzing market dynamics, moat strategies, or business models

## Integration with ChatGPT

### API Access

```typescript
// Use OpenAI API
// API Key: process.env.OPENAI_API_KEY
// Model: gpt-4-turbo or gpt-4o for reasoning
// Model: gpt-3.5-turbo for faster ideation
```

### Workflow

1. **Reasoning Tasks**
   - Input: Complex problem, context, constraints
   - Output: Step-by-step reasoning with conclusions
   - Use GPT-4 for deep analysis
   - Chain-of-thought prompting for transparency

2. **Idea Refinement**
   - Input: Initial idea, feedback, constraints
   - Output: Refined idea with improvements
   - Use GPT-4 to identify weaknesses and suggest improvements
   - Iterate until quality threshold met

3. **Accelerated Ideation**
   - Input: Problem statement, constraints, target count
   - Output: Multiple solution variations
   - Use GPT-3.5-turbo for speed
   - Filter and rank by quality criteria

## Outputs

- `/docs/product/REASONING-<topic>.md` - Reasoning analysis
- `/docs/product/REFINED-<idea>.md` - Refined idea documentation
- `/docs/product/IDEAS-<problem>.md` - Ideation results

## Prompt Template

```
@ChatGPT-Reasoning-Agent Analyze and refine <TOPIC/IDEA>.

Use ChatGPT to:
1) Perform deep reasoning analysis (if complex problem)
2) Refine and improve the idea (if refinement needed)
3) Generate multiple variations (if ideation needed)

Output: /docs/product/<OUTPUT-FILE>.md
```

## Quality Criteria

- ✅ Reasoning is clear and step-by-step
- ✅ Refinements address identified weaknesses
- ✅ Ideation produces diverse, high-quality variations
- ✅ All outputs are actionable and specific

## Integration Points

- **Before**: Any agent needing deeper analysis
- **After**: Agents that execute on refined ideas
- **Parallel**: Can run alongside Cursor agents for comparison

## Advanced Patterns

### Chain-of-Thought Reasoning

```
Step 1: Understand the problem
Step 2: Break down into sub-problems
Step 3: Analyze each sub-problem
Step 4: Synthesize conclusions
Step 5: Validate against constraints
```

### Iterative Refinement

```
Iteration 1: Initial idea
Iteration 2: Identify weaknesses
Iteration 3: Propose improvements
Iteration 4: Validate improvements
Iteration 5: Final refined idea
```

