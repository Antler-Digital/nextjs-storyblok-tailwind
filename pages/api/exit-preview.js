export default async function exit(_, response) {
  // Exit the current user from "Preview Mode". This function accepts no args.
  response.clearPreviewData();

  // set the cookies to None
  const cookies = response.getHeader('Set-Cookie');
  response.setHeader(
    'Set-Cookie',
    cookies.map(cookie => cookie.replace('SameSite=Lax', 'SameSite=None'))
  );

  // Redirect the user back to the index page.
  response.redirect('/');
}
