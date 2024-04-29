import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'likes',
      type: 'number',
      title: 'Likes',
      readOnly: true,
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price',
    }),
    defineField({
      name: 'bidCount',
      type: 'number',
      title: 'Bid Count',
    }),
    defineField({
      name: 'highestBidder',
      type: 'string',
      title: 'Highest Bidder',
    }),
    // Add a field for a list of tags
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{type: 'string'}],
    }),
    // Add a field for date created
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      readOnly: true,
    }),
  ],
  initialValue: {
    likes: 0,
    bidCount: 0,
    price: 1000,
    createdAt: new Date().toISOString(),
    tags: [],
  },
})
