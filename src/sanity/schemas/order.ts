const order = {
  name: 'order',
  title: 'Commande',
  type: 'document',
  fields: [
    {
      name: 'orderNumber',
      title: 'Numéro de commande',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'customerName',
      title: 'Nom du client',
      type: 'string',
    },
    {
      name: 'customerEmail',
      title: 'Email du client',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Articles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'productId', title: 'ID Produit', type: 'string' },
            { name: 'name', title: 'Nom', type: 'string' },
            { name: 'price', title: 'Prix', type: 'number' },
            { name: 'quantity', title: 'Quantité', type: 'number' },
            { name: 'image', title: 'Image URL', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'totalAmount',
      title: 'Montant total (TND)',
      type: 'number',
    },
    {
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'En attente', value: 'pending' },
          { title: 'Confirmée', value: 'confirmed' },
          { title: 'Expédiée', value: 'shipped' },
          { title: 'Livrée', value: 'delivered' },
          { title: 'Annulée', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    },
    {
      name: 'stripeSessionId',
      title: 'ID Session Stripe',
      type: 'string',
    },
    {
      name: 'shippingAddress',
      title: 'Adresse de livraison',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'orderNumber',
      subtitle: 'status',
    },
  },
};

export default order;
