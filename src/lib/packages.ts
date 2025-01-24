export const packages = [
  {
    name: "Starter",
    price: "$0 /month",
    description: "Perfect for individuals and small projects",
    features: [
      "50+ icons for design",
      "Basic AI chat (100 queries/month)",
      "3 button variants",
      "1 dashboard design",
      "Single 404 page design",
    ],
    subscriptionLink:
      "https://proggo.lemonsqueezy.com/buy/22976bc8-ca9f-4119-874b-a5e05039a117",
    getSubscriptionLink: (userId: string) =>
      `https://proggo.lemonsqueezy.com/buy/22976bc8-ca9f-4119-874b-a5e05039a117?checkout[custom][user_id]=${userId}`,
  },
  {
    name: "Professional",
    price: "$19 /month",
    description: "Ideal for startups and growing teams",
    features: [
      "200+ premium icons",
      "Unlimited AI chat",
      "10 button variants",
      "3 dashboard designs",
      "3 banner styles",
    ],
    subscriptionLink:
      "https://proggo.lemonsqueezy.com/buy/7d50cd10-912d-420d-a8ae-8354738bab4f",
    getSubscriptionLink: (userId: string) =>
      `https://proggo.lemonsqueezy.com/buy/7d50cd10-912d-420d-a8ae-8354738bab4f?checkout[custom][user_id]=${userId}`,
  },
  {
    name: "Enterprise",
    price: "$29 /month",
    description: "Best for agencies and enterprises",
    features: [
      "500+ premium icons",
      "AI-powered insights in dashboards",
      "25 banner styles",
      "Advanced 404 page customization",
      "Unlimited button variants",
    ],
    subscriptionLink:
      "https://proggo.lemonsqueezy.com/buy/422e1c3a-cae5-4824-a2c2-1e9ee4ff836c",
    getSubscriptionLink: (userId: string) =>
      `https://proggo.lemonsqueezy.com/buy/422e1c3a-cae5-4824-a2c2-1e9ee4ff836c?checkout[custom][user_id]=${userId}`,
  },
];

export default packages;
