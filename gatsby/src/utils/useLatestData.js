import { useEffect, useState } from 'react';

// Using this to trick VS code to autoformat
const gql = String.raw;

const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

export default function useLatestData() {
  // Hot Slices
  const [hotSlices, setHotSlices] = useState();
  // Slicemasters
  const [slicemasters, setSlicemasters] = useState();
  // Use a side effect to fetch the data from the GraphQL endpoint
  useEffect(function () {
    // When the component loads, fetch the data - When variables change, we can add them to the array so it will update
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    }).then((res) =>
      res.json().then((resp) => {
        // TODO: Check for errors
        // Set the data to state
        setHotSlices(resp.data.StoreSettings.hotSlices);
        setSlicemasters(resp.data.StoreSettings.slicemaster);
      })
    );
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
}
