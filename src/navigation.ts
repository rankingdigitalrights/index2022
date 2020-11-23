import {companyIndices} from "./data";

export type NavigationNode = {
  label: string;
  href?: string;
  nodes?: NavigationNode[];
};

const generateNavigation = async (): Promise<NavigationNode[]> => {
  const indices = await companyIndices();

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
          nodes: indices
            .sort((a, b) => {
              if (a.company < b.company) return -1;
              if (a.company > b.company) return 1;
              return 0;
            })
            .map(({id, company}) => ({
              label: company,
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
        {label: "Indicators", href: "/indicators"},
      ],
    },
  ];
};

export default generateNavigation;
