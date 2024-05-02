import {defineField, defineType} from 'sanity'

export default defineType({
name: "experience",
title: "Experience",
type: "document",
  fields: [
    defineField({
      name: 'company_name',
      title: 'Company Name',
      type: 'string',
    }),
    defineField({
      name: 'job_title',
      title: 'Job Title',
      type: 'string',
    }),
    defineField({
      name: 'date_from',
      title: 'Date From',
      type: 'datetime',
    }),
    defineField({
      name: 'date_to',
      title: 'Date To',
      type: 'datetime',
    }),
    defineField({
      name: 'place',
      title: 'Place',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
