import React, { useEffect, useRef } from 'react'

const DropDown = ({ children, size, showDrop, setShowDrop }: any) => {
    const dropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutside = (e: any) => {
            if (dropRef.current && !dropRef.current.contains(e.target)) {
                setShowDrop(false);
            }
        };
        window.addEventListener("mousedown", clickOutside);
        return () => window.removeEventListener("mousedown", clickOutside);
    }, [setShowDrop])

    return (
        <>
            {showDrop && (
                <div
                    ref={dropRef}
                    className={`shadows flex flex-col absolute right-0 top-[2rem] bg-white ${size}`}>
                    {children}
                </div>
            )}
        </>
    )
}

export default DropDown