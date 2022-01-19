export default async function preview(request, response) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (request.query.secret !== process.env.STORYBLOK_PREVIEW_API_KEY) {
    return response.status(401).json({ message: 'Invalid token' });
  }

  // Enable Preview Mode by setting the cookies
  response.setPreviewData({});

  // // Set cookie to None, so it can be read in the Storyblok iframe
  const previous = response.getHeader('Set-Cookie');
  previous.forEach((cookie, index) => {
    previous[index] = cookie.replace('SameSite=Lax', 'SameSite=None;Secure');
  });
  response.setHeader(`Set-Cookie`, previous);

  // Redirect to the entry location
  let slug = request.query.slug;

  // Handle home slug
  if (slug === 'home') {
    slug = '';
  }

  // Redirect to the path from entry
  response.redirect(`/${slug}`);
}
