// Requêtes GROQ pour Sanity CMS

export const allProductsQuery = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  price,
  comparePrice,
  shortDescription,
  "images": images[]{
    _key,
    "url": asset->url,
    alt
  },
  "category": category->{
    _id,
    name,
    "slug": slug.current
  },
  inStock,
  featured,
  "createdAt": _createdAt
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  price,
  comparePrice,
  description,
  shortDescription,
  "images": images[]{
    _key,
    "url": asset->url,
    alt
  },
  "category": category->{
    _id,
    name,
    "slug": slug.current
  },
  inStock,
  featured,
  "createdAt": _createdAt
}`;

export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(_createdAt desc)[0...4] {
  _id,
  name,
  "slug": slug.current,
  price,
  comparePrice,
  shortDescription,
  "images": images[]{
    _key,
    "url": asset->url,
    alt
  },
  "category": category->{
    _id,
    name,
    "slug": slug.current
  },
  inStock,
  featured,
  "createdAt": _createdAt
}`;

export const allCategoriesQuery = `*[_type == "category"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  "image": image.asset->url
}`;

export const allBlogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "coverImage": coverImage.asset->url,
  author,
  publishedAt,
  tags
}`;

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  "coverImage": coverImage.asset->url,
  author,
  publishedAt,
  tags
}`;

export const allOrdersQuery = `*[_type == "order"] | order(_createdAt desc) {
  _id,
  orderNumber,
  customerName,
  customerEmail,
  items,
  totalAmount,
  status,
  stripeSessionId,
  shippingAddress,
  "createdAt": _createdAt
}`;
