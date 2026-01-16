export const pricingPlans = {
  education: [
    {
      title: 'Student',
      slug: 'student-plan',
      price: 0,
      billingPeriod: 'monthly',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Perfect for individual learners getting started',
                },
              ],
            },
          ],
        },
      },
      features: [
        { feature: 'Access to 5 free courses', included: true },
        { feature: 'Community forum access', included: true },
        { feature: 'Course completion certificates', included: true },
        { feature: 'Mobile app access', included: true },
        { feature: 'Live instructor sessions', included: false },
        { feature: 'Priority support', included: false },
      ],
      highlighted: false,
      ctaLabel: 'Start Learning',
      ctaLink: '/signup',
    },
    {
      title: 'Professional',
      slug: 'professional-plan',
      price: 29,
      billingPeriod: 'monthly',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Unlimited learning for serious students',
                },
              ],
            },
          ],
        },
      },
      features: [
        { feature: 'Access to all courses', included: true },
        { feature: 'Live instructor sessions', included: true },
        { feature: 'Downloadable resources', included: true },
        { feature: 'Priority support', included: true },
        { feature: 'Career guidance', included: true },
        { feature: 'Team collaboration', included: false },
      ],
      highlighted: true,
      ctaLabel: 'Get Started',
      ctaLink: '/signup',
      metadata: {
        maxUsers: 1,
        supportLevel: 'priority',
      },
    },
    {
      title: 'Institution',
      slug: 'institution-plan',
      price: 199,
      billingPeriod: 'monthly',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'For schools and organizations',
                },
              ],
            },
          ],
        },
      },
      features: [
        { feature: 'Everything in Professional', included: true },
        { feature: 'Up to 50 student accounts', included: true },
        { feature: 'Admin dashboard', included: true },
        { feature: 'Progress tracking', included: true },
        { feature: 'Custom branding', included: true },
        { feature: 'Dedicated account manager', included: true },
      ],
      highlighted: false,
      ctaLabel: 'Contact Sales',
      ctaLink: '/contact',
      metadata: {
        maxUsers: 50,
        supportLevel: 'dedicated',
      },
    },
  ],
  ecommerce: [
    {
      title: 'Starter',
      slug: 'ecommerce-starter',
      price: 0,
      billingPeriod: 'monthly',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Start selling online for free',
                },
              ],
            },
          ],
        },
      },
      features: [
        { feature: 'Up to 10 products', included: true },
        { feature: 'Basic payment processing', included: true },
        { feature: 'Email support', included: true },
        { feature: 'Mobile responsive', included: true },
        { feature: 'Advanced analytics', included: false },
        { feature: 'Multi-currency', included: false },
      ],
      highlighted: false,
      ctaLabel: 'Get Started',
      ctaLink: '/signup',
    },
    {
      title: 'Business',
      slug: 'ecommerce-business',
      price: 79,
      billingPeriod: 'monthly',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Scale your online business',
                },
              ],
            },
          ],
        },
      },
      features: [
        { feature: 'Unlimited products', included: true },
        { feature: 'Advanced payment options', included: true },
        { feature: 'Analytics & reporting', included: true },
        { feature: 'Multi-currency support', included: true },
        { feature: 'Priority support', included: true },
        { feature: 'Custom domain', included: true },
      ],
      highlighted: true,
      ctaLabel: 'Start Free Trial',
      ctaLink: '/signup',
      metadata: {
        supportLevel: 'priority',
      },
    },
    {
      title: 'Enterprise',
      slug: 'ecommerce-enterprise',
      price: 299,
      billingPeriod: 'monthly',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Complete e-commerce solution',
                },
              ],
            },
          ],
        },
      },
      features: [
        { feature: 'Everything in Business', included: true },
        { feature: 'API access', included: true },
        { feature: 'Custom integrations', included: true },
        { feature: 'Dedicated infrastructure', included: true },
        { feature: '99.9% uptime SLA', included: true },
        { feature: 'White-label option', included: true },
      ],
      highlighted: false,
      ctaLabel: 'Contact Sales',
      ctaLink: '/contact',
      metadata: {
        supportLevel: 'dedicated',
      },
    },
  ],
  agency: [
    {
      title: 'Freelancer',
      slug: 'agency-freelancer',
      price: 0,
      billingPeriod: 'monthly',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Perfect for independent contractors',
                },
              ],
            },
          ],
        },
      },
      features: [
        { feature: '3 active projects', included: true },
        { feature: 'Basic templates', included: true },
        { feature: 'Client portal', included: true },
        { feature: 'Invoicing', included: true },
        { feature: 'Team collaboration', included: false },
        { feature: 'White-label reports', included: false },
      ],
      highlighted: false,
      ctaLabel: 'Start Free',
      ctaLink: '/signup',
    },
    {
      title: 'Agency',
      slug: 'agency-pro',
      price: 99,
      billingPeriod: 'monthly',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'For growing marketing agencies',
                },
              ],
            },
          ],
        },
      },
      features: [
        { feature: 'Unlimited projects', included: true },
        { feature: 'Team collaboration (5 users)', included: true },
        { feature: 'White-label reports', included: true },
        { feature: 'Advanced analytics', included: true },
        { feature: 'Priority support', included: true },
        { feature: 'Custom branding', included: true },
      ],
      highlighted: true,
      ctaLabel: 'Start Trial',
      ctaLink: '/signup',
      metadata: {
        maxUsers: 5,
        supportLevel: 'priority',
      },
    },
    {
      title: 'Enterprise',
      slug: 'agency-enterprise',
      price: 299,
      billingPeriod: 'monthly',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'For established agencies',
                },
              ],
            },
          ],
        },
      },
      features: [
        { feature: 'Everything in Agency', included: true },
        { feature: 'Unlimited team members', included: true },
        { feature: 'API access', included: true },
        { feature: 'Custom integrations', included: true },
        { feature: 'Dedicated account manager', included: true },
        { feature: 'SLA guarantee', included: true },
      ],
      highlighted: false,
      ctaLabel: 'Contact Sales',
      ctaLink: '/contact',
      metadata: {
        supportLevel: 'dedicated',
      },
    },
  ],
}
