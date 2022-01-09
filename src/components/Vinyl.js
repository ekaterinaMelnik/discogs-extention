import { useEffect, useRef } from "react";
import { Animate } from '../utils/Animate';
import LOADING_STATE from '../constants/loadingState';

export function Vinyl({ loading, onClick }) {
    const animation = useRef();

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
        <button id="btn" class="vinyl" onClick={onClick}>
            <div class="vinyl-text">Copy</div>
        </button>
    )
}