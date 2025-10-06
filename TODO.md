# Fix Portfolio Contact Form on Netlify

## Information Gathered

- Portfolio is static HTML with Netlify functions for backend.
- Contact form uses data-netlify="true" but has custom function for MongoDB storage.
- Form submission may not be working properly, causing updates not to show well on Netlify.
- Need to switch to custom form handling via fetch to /.netlify/functions/contact.

## Plan

- [x] Update index.html: Remove data-netlify="true" from contact form, remove hidden form-name input.
- [x] Update script.js: Add event listener for form submission, handle via fetch to /.netlify/functions/contact, add success/error messages.
- [x] Ensure form data is sent as JSON to match function expectations.

## Dependent Files to Edit

- new-portfolio/index.html
- new-portfolio/script.js

## Followup Steps

- [ ] Deploy changes to Netlify.
- [ ] Test contact form submission.
- [ ] Verify messages are saved in MongoDB.
- [ ] Check if portfolio updates are now displaying correctly.
