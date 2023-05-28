# CruzHacks 2024 Frontend Challenge
This is my implementation of the CruzHacks 2024 Frontend Challenge. Implemented in a Javascript Create React App.

The application consists of 2 components
* `App.js`: the main schedule component. Displays the data from the RESTful API in a paged system in which all the events of that day are displayed upfront, with arrow buttons enabling the user to go to next or previous days.
* `EventModal.js`: modal where user can enter their name, email, and notification preferences upon clicking a clickable event.

The application also includes a test suite for each component
* `App.test.ts`: tests rendering the schedule, clicking the first "View Details" Button and clicking its corresponding "Close" button
* `EventModal.test.ts`: tests rendering the event modal and entering valid and invalid data. If an invalid email is entered, an alert should appear indicating such.

## Setup / Running the app
`npm install` to install all the necessary packages

`npm run start` to run the app.
For events that are clickable, you can click the "View Details" button. this opens up a modal where the user can enter their email, first and last name, and notification preferences. These are all stored in the state. Input is validated in the sense you have to fill out all the fields before clicking submit. Otherwise, it'll give you a notification/error on the empty fields telling you to fill them. this is achieved via `preventDefault()`

Emails are also checked for validity using regex
`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

This pattern checks if an email address is valid based on the following criteria:

-   The email address must have a non-empty local part (before the @ symbol) and domain part (after the @ symbol).
-   The local part and domain part cannot contain any whitespace characters.
-   The email address must have a domain with at least one period (e.g., example.com).

Here's a breakdown of the regex pattern:

-   `^` asserts the start of the string.
-   `[^\s@]+` matches one or more characters that are not whitespace or @. This represents the local part of the email address.
-   `@` matches the @ symbol.
-   `[^\s@]+` matches one or more characters that are not whitespace or @. This represents the domain part of the email address.
-   `\.` matches the period character (.) in the domain part.
-   `[^\s@]+` matches one or more characters that are not whitespace or @. This represents the top-level domain (TLD) part of the email address.
-   `$` asserts the end of the string.

The email regex enforces the basic structure of  `localpart@domain.tld`. The input type="email" isn't sufficient for checking emails, as the browser's validation is based on a simple pattern match for the email format, checking for the presence of an "@" symbol and a valid domain name. So, something like `email@domain` would pass, even though that's not a valid email address. The regex adds the additional format validation, invoking an alert if the formatting is not met. An email like `email@domain` would fail, and `email@domain.com` will pass

## Resources
https://www.codingthesmartway.com/how-to-fetch-api-data-with-react/

Used the `http-proxy-middleware` pakcage to address CORS cross-domain issues
```
Access to fetch at 'https://schedule-yoyys2e5pq-uc.a.run.app/api/schedule' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

The API response is visible on http://localhost:3000/api/schedule
```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://schedule-yoyys2e5pq-uc.a.run.app',
      changeOrigin: true,
    })
  );
};
```

CruzHacks Logo from Figma

Getting form data
https://stackoverflow.com/questions/23427384/get-form-data-in-react

https://legacy.reactjs.org/docs/forms.html

Overlay component on top of another one
https://stackoverflow.com/questions/57845109/reactjs-how-to-overlay-a-component-on-top-of-another-components-element