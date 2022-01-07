/* global chrome */
import React, { useState, useCallback, useEffect } from 'react';
import useRelease from "./release/useRelease";
import copyToClipboard from "./utils/copyToClipboard";
import parseIdFromUrl from "./utils/parseIdFromUrl";
import normalizeReleaseToCSV from "./utils/normalizeReleaseToCSV";
import './App.css';

function App() {
  const [releaseId, setReleaseId] = useState(null);
  const [release, { request }] = useRelease();

  const handleClick = useCallback((id) => {
    request(id);
  }, []);

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      const id = parseIdFromUrl(tabs[0].url);
      setReleaseId(id);
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
      <button className="vinyl" onClick={() => handleClick(releaseId)}>
        COPY
      </button>
    </div>
  );
}

export default App;
