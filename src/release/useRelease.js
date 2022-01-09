import { useState } from "react";
import LOADING_STATE from "../constants/loadingState";

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
  const [loading, setLoading] = useState(LOADING_STATE.NOT_ASKED);

  const request = async (id) => {
    if (!id) {
      return;
    }

    try {
      setLoading(LOADING_STATE.LOADING);

      const releaseResponse = await fetchRelease(
        id,
      );

      setRelease(releaseResponse);
      setLoading(LOADING_STATE.LOADED);
    } catch (error) {
      console.error(`Cannot fetch release ${id}: `, error);
      setLoading(LOADING_STATE.FAILED);
    }
  };

  const reset = () => {
    setRelease(null);
    setLoading(LOADING_STATE.NOT_ASKED);
  };

  return [release, loading, { request, reset }];
};

export default useRelease;
