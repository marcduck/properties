import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'balance',
      title: 'Balance',
      type: 'number',
      defaultValue: 10000,
    },
    {
      name: 'bidderID',
      title: 'Bidder ID',
      type: 'string',
      defaultValue: 'GXR',
    },
    {
      name: 'bids',
      title: 'Bids',
      type: 'object',
      fields: [
        {
          name: 'auctionID',
          title: 'Auction ID',
          type: 'string',
        },
        {
          name: 'amount',
          title: 'Amount',
          type: 'number',
        },
      ],
      defaultValue: {},
    },
    {
      name: 'communityPosts',
      title: 'Community Posts',
      type: 'object',
      fields: [
        {
          name: 'postID',
          title: 'Post ID',
          type: 'string',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'text',
        },
      ],
      defaultValue: {},
    },
  ],
})
