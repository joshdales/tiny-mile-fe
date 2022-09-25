# Tiny Mile Front End challenge

## Get the project up and running

Install dependencies: `npm i`.

Then add a `.env` file that contains the following information:

```conf
API_URL="url"
API_AUTH_HEADER="name_of_header_property"
API_AUTH_TOKEN="your_api_key"
```

Start the dev server `npm run dev`.

Go to `localhost:3000?delivery_job_id=36599ca3-03e3-2a86-e3b3-37ad440edcc9` to see your order details,
or replace the search param with any other id to fetch that record.

## Running the test suite

I'm using [Cypress](https://www.cypress.io/) for testing - and there are two parts to it, component testing, and End-to-End testing. Both can be viewed by running `npm run test` which will launch the
cypress client and you can select the type of testing that you want to view

### E2E Tests

If you want run the e2e tests make sure that the dev server is running as well.
