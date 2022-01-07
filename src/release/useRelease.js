import { useState } from "react";

const ENDPOINT = 'https://api.discogs.com';

const fetchRelease = (id) =>
  fetch(`${ENDPOINT}/releases/${id}`)
    .then((response) => {
      if (!response.ok && response.status !== 404) {
        throw new Error(response.statusText);
      }
      return response.json();
    })

const useRelease = () => {
  const [release, setRelease] = useState([]);

  const request = async (id) => {
    if (!id) {
      return;
    }

    try {
      const releaseResponse = await fetchRelease(
        id,
      );
      setRelease(releaseResponse);
    } catch (error) {
      console.error(`Cannot fetch release ${id}: `, error);
    }
  };

  const reset = () => {
    setRelease(null);
  };

  return [release, { request, reset }];
};

export default useRelease;
