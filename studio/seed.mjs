import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "hytzqone",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_EDITOR_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_EDITOR_TOKEN) {
  throw new Error("SANITY_EDITOR_TOKEN is required");
}

const standardPlans = [
  { _id: "rita-standard-pkg-1", _type: "standardPlan", planId: "pkg-1", title: "Discover", subgroup: "8-10", price: 5500, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"], order: 1 },
  { _id: "rita-standard-pkg-2", _type: "standardPlan", planId: "pkg-2", title: "Discover Plus+", subgroup: "8-10", price: 15000, features: ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"], order: 2 },
  { _id: "rita-standard-pkg-3", _type: "standardPlan", planId: "pkg-3", title: "Achieve Online", subgroup: "10-12", price: 5999, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"], order: 3 },
  { _id: "rita-standard-pkg-4", _type: "standardPlan", planId: "pkg-4", title: "Achieve Plus+", subgroup: "10-12", price: 10599, features: ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"], order: 4 },
  { _id: "rita-standard-pkg-5", _type: "standardPlan", planId: "pkg-5", title: "Ascend Online", subgroup: "college", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"], order: 5 },
  { _id: "rita-standard-pkg-6", _type: "standardPlan", planId: "pkg-6", title: "Ascend Plus+", subgroup: "college", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"], order: 6 },
  { _id: "rita-standard-mp-3", _type: "standardPlan", planId: "mp-3", title: "Ascend Online", subgroup: "working", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"], order: 7 },
  { _id: "rita-standard-mp-2", _type: "standardPlan", planId: "mp-2", title: "Ascend Plus+", subgroup: "working", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"], order: 8 },
];

const customPlans = [
  { _id: "rita-custom-career-report", _type: "customPlan", planId: "career-report", title: "Career Report", price: 1500, description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider.", order: 1 },
  { _id: "rita-custom-career-report-counselling", _type: "customPlan", planId: "career-report-counselling", title: "Career Report + Career Counselling", price: 3000, description: "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at.", order: 2 },
  { _id: "rita-custom-knowledge-gateway", _type: "customPlan", planId: "knowledge-gateway", title: "Knowledge Gateway + Career Helpline Access", price: 100, description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love.", order: 3 },
  { _id: "rita-custom-one-to-one-session", _type: "customPlan", planId: "one-to-one-session", title: "One-to-One Session with a Career Expert", price: 3500, description: "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field.", order: 4 },
  { _id: "rita-custom-college-admission-planning", _type: "customPlan", planId: "college-admission-planning", title: "College Admission Planning", price: 3000, description: "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner.", order: 5 },
  { _id: "rita-custom-exam-stress-management", _type: "customPlan", planId: "exam-stress-management", title: "Exam Stress Management", price: 1000, description: "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators. Increase your chances of acing exams with a calm and clear mind.", order: 6 },
  { _id: "rita-custom-cap-100", _type: "customPlan", planId: "cap-100", title: "College Admissions Planner - 100 (CAP-100)", price: 199, description: "Rs. 199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter: Indian Ivy League, Target, Smart Backup, and Safe Bet colleges. You can then shortlist colleges based on where you stand!", order: 7 },
];

const blogPosts = [
  {
    _id: "rita-blog-career-clarity",
    _type: "blogPost",
    title: "Building Career Clarity with Leadership Coaching",
    slug: { _type: "slug", current: "career-clarity-leadership" },
    excerpt: "Practical steps to align your career goals with your strengths.",
    content: "Career clarity starts with self-awareness, guided exploration, and intentional decision-making supported by expert mentorship.",
    publishedAt: new Date().toISOString(),
  },
];

const services = [
  { _id: "rita-service-students", _type: "services", title: "For Students", subtitle: "Strategic academic and career foundation", features: ["Career Counselling & Admission Guidance", "Psychometric Assessment", "Strategic Academic Planning", "1:1 Mentorship Sessions"], order: 1 },
  { _id: "rita-service-professionals", _type: "services", title: "For Working Professionals", subtitle: "Career growth and leadership development", features: ["Career & Skills Assessment", "Resume & LinkedIn Guidance", "Professional Mentorship", "Career Transition Support"], order: 2 },
  { _id: "rita-service-corporates", _type: "services", title: "For Corporates", subtitle: "Team development and workshops", features: ["Corporate Workshops & Seminars", "Employee Mentorship Programs", "Career Pathing & Guidance", "Team Development"], order: 3 },
];

const testimonials = [
  { _id: "rita-testimonial-1", _type: "testimonials", name: "Priya S.", role: "Marketing Manager", achievement: "Promoted to Senior Manager", quote: "Rita's coaching helped me navigate a challenging career transition with confidence and clarity.", order: 1 },
  { _id: "rita-testimonial-2", _type: "testimonials", name: "Rajesh K.", role: "Software Engineer", achievement: "Leadership Role", quote: "The emotional intelligence training transformed how I lead my team and communicate with stakeholders.", order: 2 },
];

for (const doc of [...standardPlans, ...customPlans, ...blogPosts, ...services, ...testimonials]) {
  await client.createOrReplace(doc);
}

console.log("Seed completed");
