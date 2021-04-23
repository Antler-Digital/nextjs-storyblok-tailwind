export default async function exit(request, response) {
  // Exit the current user from "Preview Mode". This function accepts no args.
  response.clearPreviewData();

  // take the slug appended in the preview and use to redirect to none preview page
  const slug = request?.query?.slug || '';

  // set the cookies to None
  const cookies = response.getHeader('Set-Cookie');
  response.setHeader(
    'Set-Cookie',
    cookies.map(cookie => cookie.replace('SameSite=Lax', 'SameSite=None'))
  );

  // Redirect the user back to the index page.
  response.writeHead(307, { Location: `/${slug}` });
  response.end();
}
