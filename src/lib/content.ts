export type Service = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  items: string[];
  seoTitle?: string;
  seoDescription?: string;
};

export const services: Service[] = [
  {
    id: "water-treatment",
    slug: "water-treatment",
    title: "Water Treatment",
    summary:
      "Custom water purification systems for residential, hospitality, commercial and industrial requirements.",
    items: [
      "Reverse osmosis plants",
      "Water softening plants",
      "Iron removal systems",
      "DM plants",
    ],
  },
  {
    id: "wastewater-treatment",
    slug: "wastewater-treatment",
    title: "Wastewater Treatment",
    summary:
      "Compliant sewage and effluent treatment solutions engineered around your site and discharge requirements.",
    items: [
      "STP: conventional, MBR, SBR and Eco-SBR",
      "ETP: packaged FRP/MS systems",
      "ZLD, DAF and ozonation",
      "Sludge handling systems",
    ],
  },
  {
    id: "process-monitoring",
    slug: "process-monitoring",
    title: "Process Monitoring",
    summary:
      "Automation and instrumentation that improve process visibility while reducing manual intervention.",
    items: [
      "Flow, ORP and pH meters",
      "BOD, COD and TSS analysers",
      "TDS and conductivity sensors",
      "Level and temperature sensors",
    ],
  },
  {
    id: "operation-maintenance",
    slug: "operation-maintenance",
    title: "Operations & Maintenance",
    summary:
      "Reliable annual maintenance, operations and service contracts for consistent plant performance.",
    items: [
      "Preventive maintenance",
      "Plant operation support",
      "Spares and consumables",
      "Performance optimisation",
    ],
  },
  {
    id: "consultancy",
    slug: "consultancy",
    title: "Engineering Consultancy",
    summary:
      "Site surveys, process design, costing and project management led by environmental and chemical engineers.",
    items: [
      "Site survey",
      "Detailed process design",
      "Cost estimates",
      "Project management",
    ],
  },
  {
    id: "products",
    slug: "products",
    title: "Products & Components",
    summary:
      "Treatment media, pumps, FRP vessels, RO housings and specialist components from trusted manufacturers.",
    items: [
      "Softener and DM resins",
      "Iron removal media",
      "Pumps",
      "FRP pressure vessels",
    ],
  },
];
