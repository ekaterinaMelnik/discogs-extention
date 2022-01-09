/* global chrome */
import React, { useCallback, useEffect } from 'react';
import './App.css';
import { Vinyl } from './components/Vinyl';
import useRelease from "./release/useRelease";
import copyToClipboard from "./utils/copyToClipboard";
import normalizeReleaseToCSV from "./utils/normalizeReleaseToCSV";
import parseIdFromUrl from "./utils/parseIdFromUrl";

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
      <Vinyl onClick={handleClick} />
    </div>
  );
}

export default App;
