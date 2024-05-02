import {defineField, defineType} from 'sanity'

export default defineType({
name: "project",
title: "Project",
type: "document",
  fields: [
    defineField({
      name: 'title',
      title: 'University Name',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
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
      type: 'string',
    }),
    defineField({
      name: 'technologies_used',
      title: 'Technologies Used',
      type: 'string',
    }),
    defineField({
        name: "projectType",
        title: "Project type",
        type: "string",
        options: {
          list: [
            { value: "personal", title: "Personal" },
            { value: "client", title: "Client" },
            { value: "school", title: "School" },
          ],
        },
      }),
      defineField({
        name: 'link',
        title: 'Link',
        type: 'url',
      }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
