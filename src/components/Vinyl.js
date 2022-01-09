import { useEffect, useRef } from "react";
import { Animate } from '../utils/Animate';
import LOADING_STATE from '../constants/loadingState';

const getLabel = (loading) => {
  switch (loading) {
    case LOADING_STATE.LOADING:
      return 'Loading';
    case LOADING_STATE.LOADED:
      return 'Copied';
    default:
      return 'Copy';
  }
}

export function Vinyl({ loading, onClick }) {
  const animation = useRef();

  const label = getLabel(loading);

  useEffect(() => {
    animation.current = new Animate('#btn');
  }, []);

  useEffect(() => {
    switch (loading) {
      case LOADING_STATE.LOADING:
        animation.current.start();
        break;
      case LOADING_STATE.LOADED:
        animation.current.next();
        break;
      default:
        break;
    }
  }, [loading]);

  return (
    <button id="btn" className="vinyl" onClick={onClick}>
      <div className="vinyl-text">{label}</div>
    </button>
  )
}
