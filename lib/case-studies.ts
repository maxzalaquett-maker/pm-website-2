import { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "unifying-fragmented-financial-accounts",
    title: "Unifying Fragmented Financial Accounts",
    summary:
      "Designing a system-level account panel that allowed investors to see their full financial picture across fragmented financial services.",
    industry: "Financial services",
    role: "Product strategist / UX strategy lead",
    skills: ["Platform strategy", "Information architecture", "Stakeholder alignment"],
    whyThisMattered:
      "Customers were managing relationships across multiple account types and providers, but the product experience made those services feel disconnected. That fragmentation reduced confidence and made routine planning harder than it should have been.",
    problem:
      "Investors could not easily understand which accounts they held, how those accounts related to one another, or where to take action. Internal teams had optimized individual experiences, but not the full customer system.",
    myRole:
      "I led product strategy and experience definition for a unified account panel, aligning product, design, and business stakeholders around a shared model for how account information should be grouped, labeled, and prioritized.",
    discoveryAndInsights: [
      "Customers interpreted account ownership, status, and available actions differently depending on where they entered the experience.",
      "Key account details were present in the ecosystem, but hidden behind inconsistent naming and navigation patterns.",
      "Teams needed a system pattern that could scale across multiple financial products without creating new maintenance overhead.",
    ],
    keyDecisions: [
      "Created a single account panel pattern that grouped related services around the customer mental model instead of internal business lines.",
      "Defined a clearer hierarchy for balances, account relationships, and next-step actions.",
      "Recommended shared language standards so customers could recognize similar states and actions across experiences.",
    ],
    outcome:
      "The resulting direction gave teams a scalable framework for presenting complex account ecosystems more clearly. It improved internal alignment and established a foundation for a more trustworthy investor experience.",
    skillsDemonstrated: [
      "Systems thinking",
      "Product framing",
      "Cross-functional facilitation",
      "Customer trust design",
    ],
  },
  {
    slug: "improving-portfolio-analysis",
    title: "Improving Portfolio Analysis for Better Investment Decisions",
    summary:
      "Redesigning a portfolio analysis experience to help investors better understand diversification and performance.",
    industry: "Investment platform",
    role: "Product strategist / product design partner",
    skills: ["Product discovery", "Decision support design", "Data communication"],
    whyThisMattered:
      "Investors rely on portfolio views to make high-consequence decisions. When the analysis experience was difficult to interpret, it created hesitation and reduced the product's value as a decision-making tool.",
    problem:
      "The existing portfolio analysis flow surfaced a large amount of data, but it did not help customers identify what was important, what was risky, or what they should consider doing next.",
    myRole:
      "I helped define the product strategy for a redesigned analysis experience, shaping the narrative, information priorities, and interaction model needed to turn data into clearer decision support.",
    discoveryAndInsights: [
      "Users wanted a fast sense of whether their portfolio was balanced before diving into detailed metrics.",
      "Performance and diversification signals were available, but not sequenced in a way that supported understanding.",
      "A clearer explanatory layer was needed so less-experienced investors could interpret the information with confidence.",
    ],
    keyDecisions: [
      "Reframed the experience around a top-level summary first, with deeper analysis available progressively.",
      "Paired performance metrics with plain-language explanations to reduce ambiguity.",
      "Prioritized diversification insights that connected the data to concrete investor questions.",
    ],
    outcome:
      "The redesigned approach made the experience more legible and better aligned with the decisions customers were actually trying to make. It clarified how portfolio data should support confidence, not just reporting.",
    skillsDemonstrated: [
      "Analytical UX",
      "Prioritization",
      "Product storytelling",
      "Complex information design",
    ],
  },
  {
    slug: "healthcare-feedback-community",
    title: "Designing a Customer Feedback Community for a Healthcare Nonprofit",
    summary:
      "Defining a digital platform enabling healthcare customers to share insights and influence product improvements.",
    industry: "Healthcare nonprofit",
    role: "Product strategist / service design lead",
    skills: ["Service design", "Research synthesis", "Roadmap definition"],
    whyThisMattered:
      "The organization wanted a more direct relationship with the people it served, but lacked a structured way to gather ongoing customer insight and turn that input into product improvements.",
    problem:
      "Feedback channels were fragmented, episodic, and difficult for teams to act on. Customers had few clear signals that their input was being heard, which weakened engagement and trust.",
    myRole:
      "I defined the product concept for a digital feedback community, including its member value proposition, participation model, governance considerations, and how insights would flow back into internal decision-making.",
    discoveryAndInsights: [
      "Customers were willing to share experiences when the purpose, privacy expectations, and impact were clearly explained.",
      "Internal teams needed structured synthesis, not just raw comments, to use community input effectively.",
      "Long-term participation depended on showing contributors how their input influenced change.",
    ],
    keyDecisions: [
      "Established a community model centered on transparent participation and feedback loops.",
      "Defined a lightweight operating framework for collecting, synthesizing, and distributing insights internally.",
      "Recommended experience patterns that balanced accessibility, trust, and responsible moderation.",
    ],
    outcome:
      "The concept gave the organization a practical foundation for continuous listening and stronger product learning. It positioned the community as both a research asset and a trust-building channel with customers.",
    skillsDemonstrated: [
      "Opportunity framing",
      "Voice of customer strategy",
      "Stakeholder communication",
      "Experience governance",
    ],
  },
];

export const caseStudiesBySlug = Object.fromEntries(
  caseStudies.map((caseStudy) => [caseStudy.slug, caseStudy]),
);
