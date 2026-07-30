import {HomeIcon} from '@sanity/icons/Home';
import {defineArrayMember, defineField, defineType} from 'sanity';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'services', title: 'Services'},
    {name: 'about', title: 'About'},
    {name: 'clients', title: 'Clients'},
    {name: 'distributors', title: 'Distributorship'},
  ],
  fields: [
    defineField({
      name: 'servicesSection',
      title: 'Services section',
      type: 'object',
      group: 'services',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Section label',
          type: 'string',
          validation: (rule) => rule.required().max(60),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (rule) => rule.required().max(100),
        }),
        defineField({
          name: 'introduction',
          title: 'Introduction',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(240),
        }),
        defineField({
          name: 'services',
          title: 'Featured services',
          description:
            'Select and reorder the service documents displayed on the home page.',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{type: 'service'}],
            }),
          ],
          validation: (rule) => rule.required().min(1).unique(),
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About Zero Droplet',
      type: 'object',
      group: 'about',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Section label',
          type: 'string',
          validation: (rule) => rule.required().max(60),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (rule) => rule.required().max(100),
        }),
        defineField({
          name: 'body',
          title: 'Description',
          type: 'array',
          of: [defineArrayMember({type: 'block'})],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: 'processSteps',
          title: 'Process steps',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'processStep',
              title: 'Process step',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (rule) => rule.required().max(50),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                  validation: (rule) => rule.required().max(180),
                }),
              ],
              preview: {
                select: {title: 'title', subtitle: 'description'},
              },
            }),
          ],
          validation: (rule) => rule.required().min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: 'clientShowcase',
      title: 'Client showcase',
      type: 'object',
      group: 'clients',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Section label',
          type: 'string',
          validation: (rule) => rule.required().max(60),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (rule) => rule.required().max(100),
        }),
        defineField({
          name: 'introduction',
          title: 'Introduction',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(240),
        }),
        defineField({
          name: 'clients',
          title: 'Client logos',
          type: 'array',
          of: [defineArrayMember({type: 'brandLogo'})],
          validation: (rule) => rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: 'distributorship',
      title: 'Authorised distributorship',
      type: 'object',
      group: 'distributors',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Section label',
          type: 'string',
          validation: (rule) => rule.required().max(60),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (rule) => rule.required().max(100),
        }),
        defineField({
          name: 'introduction',
          title: 'Introduction',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(240),
        }),
        defineField({
          name: 'partners',
          title: 'Distributor brands',
          type: 'array',
          of: [defineArrayMember({type: 'distributor'})],
          validation: (rule) => rule.required().min(1),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Home page',
      subtitle: 'Services, about, clients and authorised distributors',
    }),
  },
});
