import {ImageIcon} from '@sanity/icons/Image';
import {defineField, defineType} from 'sanity';

export const brandLogoType = defineType({
  name: 'brandLogo',
  title: 'Brand logo',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Organisation name',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          description: 'Describe the logo for visitors using assistive technology.',
          type: 'string',
          validation: (rule) => rule.required().max(160),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).warning('Use a complete HTTPS URL.'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
});
