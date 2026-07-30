import {TransferIcon} from '@sanity/icons/Transfer';
import {defineArrayMember, defineField, defineType} from 'sanity';

export const distributorType = defineType({
  name: 'distributor',
  title: 'Authorised distributor',
  type: 'object',
  icon: TransferIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Brand name',
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
          type: 'string',
          validation: (rule) => rule.required().max(160),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'offerings',
      title: 'Authorised products',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).unique(),
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
      subtitle: 'offerings.0',
      media: 'logo',
    },
  },
});
