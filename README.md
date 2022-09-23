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
