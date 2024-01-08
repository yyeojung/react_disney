import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (e) => {
            //내부 클릭하면 이벤트 작동x
            if(!ref.current || ref.current.contains(e.target)) {
                return;
            }
            handler()
        }

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("mousedown", listener);
        }
    }, [ref, handler])
}