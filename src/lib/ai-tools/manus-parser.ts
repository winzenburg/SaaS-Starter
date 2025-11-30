/**
 * Parser for Manus discovery pack markdown responses
 * 
 * Manus returns discovery packs in markdown format with sections:
 * 1. Niche Narrative
 * 2. Pain Language Dictionary
 * 3. Detailed Persona
 * 4. Competitor Landscape
 * 5. Pricing Expectations
 * 6. Distribution Hooks
 * 7. References
 * 
 * This parser extracts structured data from the markdown format.
 */

export interface ParsedManusDiscoveryPack {
  narrative?: string;
  painLanguage?: string;
  persona?: {
    name?: string;
    role?: string;
    identity?: string;
    painPoints?: string[];
    emotionalDrivers?: string[];
    jtbd?: string[];
    triggers?: string[];
    successCriteria?: string[];
  };
  competitors?: Array<{
    name?: string;
    positioning?: string;
    gaps?: string[];
  }>;
  pricingExpectations?: string;
  distributionHooks?: string;
  sources?: Array<{
    number: string;
    citation: string;
    url?: string;
  }>;
}

export interface Source {
  number: string;
  citation: string;
  url?: string;
}

/**
 * Extract sources from the References section
 */
export function extractSources(content: string): Map<string, Source> {
  const sources = new Map<string, Source>();
  
  // Extract references section
  const referencesMatch = content.match(/## 7\. References\s*([\s\S]*?)$/);
  if (referencesMatch) {
    const referencesText = referencesMatch[1];
    
    if (!referencesText) return sources;
    
    // Match [number] citations - improved pattern to capture full citation
    const citationPattern = /\[(\d+)\]\s*([^\n]+(?:\n(?!\[\d+\]|$)[^\n]+)*)/g;
    let match;
    
    while ((match = citationPattern.exec(referencesText)) !== null) {
      const [, number, fullCitation] = match;
      if (!fullCitation || !number) continue;
      // Extract URL if present
      const urlMatch = fullCitation.match(/Retrieved from\s+(https?:\/\/[^\s]+)/);
      const url = urlMatch ? urlMatch[1] : undefined;
      
      // Clean up citation text (remove "Retrieved from URL" part)
      const citation = url 
        ? fullCitation.replace(/\s*Retrieved from\s+https?:\/\/[^\s]+/, "").trim()
        : fullCitation.trim();
      
      sources.set(number, {
        number,
        citation: citation,
        url: url,
      });
    }
  }
  
  return sources;
}

/**
 * Parse Manus discovery pack markdown into structured data
 */
export function parseManusDiscoveryPack(markdown: string): ParsedManusDiscoveryPack {
  const result: ParsedManusDiscoveryPack = {};
  
  // Extract Niche Narrative
  const nicheNarrativeMatch = markdown.match(/## 1\. Niche Narrative\s*([\s\S]*?)(?=## 2\.|$)/);
  if (nicheNarrativeMatch?.[1]) {
    result.narrative = nicheNarrativeMatch[1].trim();
  }
  
  // Extract Pain Language Dictionary
  const painLanguageMatch = markdown.match(/## 2\. Pain Language Dictionary\s*([\s\S]*?)(?=## 3\.|$)/);
  if (painLanguageMatch?.[1]) {
    result.painLanguage = painLanguageMatch[1].trim();
  }
  
  // Extract Detailed Persona
  const personaMatch = markdown.match(/## 3\. Detailed Persona\s*([\s\S]*?)(?=## 4\.|$)/);
  if (personaMatch?.[1]) {
    const personaText = personaMatch[1];
    
    // Extract persona name
    const nameMatch = personaText.match(/\*\*Persona:\s*([^\*]+)\*\*/);
    const name = nameMatch?.[1]?.trim();
    
    // Extract role from table
    const roleMatch = personaText.match(/\*\*Role\*\*\s*\|\s*([^\|]+)/);
    const role = roleMatch?.[1]?.trim();
    
    // Extract identity
    const identityMatch = personaText.match(/\*\*Identity & Psychographics\*\*\s*\|\s*([^\|]+)/);
    const identity = identityMatch?.[1]?.trim();
    
    // Extract pain points
    const painPointsSection = personaText.match(/\*\*Pain Points[^\*]*\*\*\s*\|\s*([^\|]+)/);
    let painPoints: string[] = [];
    if (painPointsSection?.[1]) {
      const painText = painPointsSection[1];
      // Extract bullet points
      painPoints = painText.split(/<br>|•|-/).map(p => p.trim()).filter(p => p.length > 0);
    }
    
    // Extract emotional drivers
    const emotionalDriversSection = personaText.match(/\*\*Emotional Drivers[^\*]*\*\*\s*\|\s*([^\|]+)/);
    let emotionalDrivers: string[] = [];
    if (emotionalDriversSection?.[1]) {
      const driversText = emotionalDriversSection[1];
      emotionalDrivers = driversText.split(/<br>|•|-/).map(d => d.trim()).filter(d => d.length > 0);
    }
    
    // Extract JTBD
    const jtbdSection = personaText.match(/\*\*Job-to-be-Done[^\*]*\*\*\s*\|\s*([^\|]+)/);
    let jtbd: string[] = [];
    if (jtbdSection?.[1]) {
      const jtbdText = jtbdSection[1];
      jtbd = jtbdText.split(/<br>|•|-/).map(j => j.trim()).filter(j => j.length > 0);
    }
    
    result.persona = {
      name,
      role,
      identity,
      painPoints: painPoints.length > 0 ? painPoints : undefined,
      emotionalDrivers: emotionalDrivers.length > 0 ? emotionalDrivers : undefined,
      jtbd: jtbd.length > 0 ? jtbd : undefined,
    };
  }
  
  // Extract Competitor Landscape
  const competitorsMatch = markdown.match(/## 4\. Competitor Landscape\s*([\s\S]*?)(?=## 5\.|$)/);
  if (competitorsMatch?.[1]) {
    const competitorsText = competitorsMatch[1];
    // Try to extract competitor information from tables
    // This is a simplified extraction - full parsing would be more complex
    const competitors: Array<{ name?: string; positioning?: string; gaps?: string[] }> = [];
    
    // Look for competitor categories
    const categoryMatches = competitorsText.matchAll(/\d+\.\s+\*\*([^\*]+)\*\*:([\s\S]*?)(?=\d+\.|$)/g);
    for (const match of categoryMatches) {
      const categoryName = match[1]?.trim();
      const categoryText = match[2];
      
      if (!categoryName || !categoryText) continue;
      
      // Extract examples from the category text
      const examplesMatch = categoryText.match(/Examples include\s+\*\*([^\*]+)\*\*/);
      if (examplesMatch?.[1]) {
        competitors.push({
          name: examplesMatch[1].trim(),
          positioning: categoryName,
        });
      }
    }
    
    if (competitors.length > 0) {
      result.competitors = competitors;
    }
  }
  
  // Extract Pricing Expectations
  const pricingMatch = markdown.match(/## 5\. Pricing Expectations[^#]*([\s\S]*?)(?=## 6\.|$)/);
  if (pricingMatch?.[1]) {
    result.pricingExpectations = pricingMatch[1].trim();
  }
  
  // Extract Distribution Hooks
  const distributionMatch = markdown.match(/## 6\. Distribution Hooks[^#]*([\s\S]*?)(?=## 7\.|$)/);
  if (distributionMatch?.[1]) {
    result.distributionHooks = distributionMatch[1].trim();
  }
  
  // Extract sources
  const sources = extractSources(markdown);
  if (sources.size > 0) {
    result.sources = Array.from(sources.values());
  }
  
  return result;
}

/**
 * Format citations in text by replacing [number] with [^number] footnotes
 */
export function formatCitations(text: string, sources: Map<string, Source>): string {
  return text.replace(/\[(\d+)\]/g, (match, number) => {
    const source = sources.get(number);
    if (source) {
      return `[^${number}]`;
    }
    return match;
  });
}

/**
 * Generate markdown sources section from extracted sources
 */
export function generateSourcesSection(sources: Map<string, Source>): string {
  if (sources.size === 0) return "";
  
  const sortedSources = Array.from(sources.entries())
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  
  return sortedSources.map(([number, source]) => {
    return `[^${number}]: ${source.citation}${source.url ? ` - ${source.url}` : ""}`;
  }).join("\n");
}

