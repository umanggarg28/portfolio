import {defineField, defineType} from 'sanity'

export default defineType({
name: "education",
title: "Education",
type: "document",
  fields: [
    defineField({
      name: 'university_name',
      title: 'University Name',
      type: 'string',
    }),
    defineField({
      name: 'degree',
      title: 'Degree',
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
      name: 'gpa',
      title: 'GPA',
      type: 'string',
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
