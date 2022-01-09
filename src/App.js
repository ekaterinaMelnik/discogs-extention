/* global chrome */
import React, { useCallback, useEffect } from 'react';
import useRelease from "./release/useRelease";
import copyToClipboard from "./utils/copyToClipboard";
import parseIdFromUrl from "./utils/parseIdFromUrl";
import normalizeReleaseToCSV from "./utils/normalizeReleaseToCSV";
import './App.css';

function App() {
  const [release, { request }] = useRelease();

  const handleClick = useCallback(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      const id = parseIdFromUrl(tabs[0].url);
      request(id);
    });
  }, []);

  useEffect(() => {
    if (release) {
      const csv = normalizeReleaseToCSV(release);
      copyToClipboard(csv);
    }
  }, [release]);

  return (
    <div className="app">
      <button className="vinyl" onClick={handleClick}>
        COPY
      </button>
    </div>
  );
}

export default App;
