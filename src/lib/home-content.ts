import {services as fallbackServices, type Service} from '@/lib/content';

export type PortableTextBlock = {
  _key: string;
  _type: 'block';
  style: string;
  markDefs: Array<Record<string, unknown>>;
  children: Array<{
    _key: string;
    _type: 'span';
    marks: string[];
    text: string;
  }>;
};

export type LogoItem = {
  _key: string;
  name: string;
  imageUrl: string;
  alt: string;
  website?: string;
};

export type Distributor = LogoItem & {
  offerings: string[];
};

export type HomePageContent = {
  servicesSection: {
    eyebrow: string;
    heading: string;
    introduction?: string;
    services: Service[];
  };
  about: {
    eyebrow: string;
    heading: string;
    body: PortableTextBlock[];
    processSteps: Array<{
      _key: string;
      title: string;
      description: string;
    }>;
  };
  clientShowcase: {
    eyebrow: string;
    heading: string;
    introduction?: string;
    clients: LogoItem[];
  };
  distributorship: {
    eyebrow: string;
    heading: string;
    introduction?: string;
    partners: Distributor[];
  };
};

export const fallbackHomePage: HomePageContent = {
  servicesSection: {
    eyebrow: 'Our services',
    heading: 'Complete treatment solutions, not isolated equipment',
    introduction:
      'End-to-end engineering, equipment and lifecycle support tailored to each site.',
    services: fallbackServices,
  },
  about: {
    eyebrow: 'About Zero Droplet',
    heading: 'Engineering expertise with accountable delivery',
    body: [
      {
        _key: 'about-overview',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'about-overview-text',
            _type: 'span',
            marks: [],
            text: 'Based in Margao, Goa, our environmental experts and chemical engineers support the full project lifecycle—from site survey and detailed design to procurement, commissioning, operations and maintenance.',
          },
        ],
      },
      {
        _key: 'about-mission',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'about-mission-text',
            _type: 'span',
            marks: [],
            text: 'Our mission is to deliver practical, cost-effective treatment solutions with dependable performance, timely execution and responsive after-sales support.',
          },
        ],
      },
    ],
    processSteps: [
      {
        _key: 'survey',
        title: 'Survey',
        description: 'Understand source water, effluent, space and compliance needs.',
      },
      {
        _key: 'design',
        title: 'Design',
        description: 'Engineer the right process and lifecycle cost.',
      },
      {
        _key: 'deliver',
        title: 'Deliver',
        description: 'Procure, install, test and commission.',
      },
      {
        _key: 'support',
        title: 'Support',
        description: 'Maintain performance with responsive service.',
      },
    ],
  },
  clientShowcase: {
    eyebrow: 'Trusted partnerships',
    heading: 'Our esteemed clients',
    introduction:
      'Chosen by hospitality, healthcare, pharmaceutical and industrial organisations across India.',
    clients: [
      ['itc-grand', 'ITC Grand Goa', 'itc-grand.png'],
      ['radisson', 'Radisson Hotels', 'radisson.png'],
      ['park-regis', 'Park Regis', 'park-regis.png'],
      ['caravela', 'Caravela Beach Resort', 'caravela.png'],
      ['kings', "King's", 'kings.png'],
      ['st-regis', 'The St. Regis', 'st-regis.png'],
      ['the-fern', 'The Fern Hotels & Resorts', 'the-fern.png'],
      ['grand-hyatt', 'Grand Hyatt', 'grand-hyatt.png'],
      ['micro-labs', 'Micro Labs Limited', 'micro-labs.png'],
      ['deltin', 'Deltin Group', 'deltin.png'],
      ['country-inn', 'Country Inn & Suites', 'country-inn.png'],
    ].map(([key, name, filename]) => ({
      _key: key,
      name,
      imageUrl: `/logos/clients/${filename}`,
      alt: `${name} logo`,
    })),
  },
  distributorship: {
    eyebrow: 'Product partnerships',
    heading: 'Authorised distributorship',
    introduction:
      'Genuine treatment components from established manufacturers, selected and supported by our engineering team.',
    partners: [
      {
        _key: 'havells',
        name: 'Havells',
        imageUrl: '/logos/distributors/havells.png',
        alt: 'Havells logo',
        offerings: [
          'Softener resins',
          'DM plant resins',
          'Iron removal media',
        ],
      },
      {
        _key: 'autus',
        name: 'Autus',
        imageUrl: '/logos/distributors/autus.png',
        alt: 'Autus logo',
        offerings: ['Pumps'],
      },
      {
        _key: 'vili-composites',
        name: 'Vili Composites',
        imageUrl: '/logos/distributors/vili-composites.png',
        alt: 'Vili Composites logo',
        offerings: ['FRP pressure vessels', 'Reverse osmosis housings'],
      },
    ],
  },
};
