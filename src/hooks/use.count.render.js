import {useRef} from "react";

export const useCountRenders = (title, reset = false) =>{
    const render = useRef(0)
    if (reset) render.current = 0;
    console.log(`--------------${title}`, render.current++);
}