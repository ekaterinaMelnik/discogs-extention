import { useState } from "react";
import LOADING_STATE from "../constants/loadingState";

const ENDPOINT = 'https://api.discogs.com';

const formatLabel = (label) => {

  if (!label) {
    return null;
  }

  if (!label.catno) {
    return label.name;
  }

  return `${label.name} ${label.catno}`;
}

const COUNTRY_LABEL = {
  US: 'USA'
}

const formatCountry = (country) => {
  return COUNTRY_LABEL[country] || country;
}

const deserializeResponse = (response) => ({
  year: `℗${response.year}`,
  uri: response.uri,
  country: formatCountry(response.country),
  title: `«${response.title}»`,
  artists: response.artists.map((artist) => artist.name?.toUpperCase())?.join(', '),
  label: formatLabel(response.labels[0]),
});

const fetchRelease = (id) =>
  fetch(`${ENDPOINT}/releases/${id}`)
    .then((response) => {
      if (!response.ok && response.status !== 404) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(response => deserializeResponse(response))

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
