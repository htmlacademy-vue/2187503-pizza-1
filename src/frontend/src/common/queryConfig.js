export const ADDRESSES_CONFIG = {
  params: {
    filter: {
      fields: {
        id: true,
        name: true,
      },
      include: [
        {
          relation: "user",
          scope: {
            fields: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      ],
    },
  },
};
