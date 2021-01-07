import {allCompanies, allIndicators} from "./data";

export type NavigationNode = {
  label: string;
  href?: string;
  nodes?: NavigationNode[];
};

const generateNavigation = async (): Promise<NavigationNode[]> => {
  const [companies, indicators] = await Promise.all([
    allCompanies(),
    allIndicators(),
  ]);

  return [
    {label: "Home", href: "/"},

    {
      label: "Stories + Insights",
      nodes: [
        {
          label: "Key Findings",
          href: "/key-findings",
        },
        {
          label: "Spotlights",
          nodes: [
            {label: "Spotlight One", href: "/spotlights/spotlight-one"},
            {label: "Spotlight Two", href: "/spotlights/spotlight-two"},
            {label: "Spotlight Three", href: "/spotlights/spotlight-three"},
          ],
        },
      ],
    },

    {
      label: "Company Report Cards",
      nodes: [
        {
          label: "Companies",
          nodes: companies
            .sort((a, b) => {
              if (a.id < b.id) return -1;
              if (a.id > b.id) return 1;
              return 0;
            })
            .map(({id, name}) => ({
              label: name,
              href: `/companies/${id}`,
            })),
        },
      ],
    },

    {
      label: "Policy Recommendations",
      href: "/policy-recommendations",
    },

    {
      label: "Data + Methods",
      nodes: [
        {label: "Explore our Data", href: "/explore-our-data"},
        {
          label: "Indicators",
          nodes: indicators
            .sort((a, b) => {
              if (a.id < b.id) return -1;
              if (a.id > b.id) return 1;
              return 0;
            })
            .map(({id, label}) => ({
              label: `${id} ${label}`,
              href: `/indicators/${id}`,
            })),
        },
      ],
    },
  ];
};

export default generateNavigation;
