"use client";

import { useEffect } from "react";

export default function Background({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const glow = document.getElementById("glow");
        const gridContainer = document.querySelector(".grid-base");
    
        if (!gridContainer || !glow) {
          console.error("Required elements not found:", { glow: !!glow, gridContainer: !!gridContainer });
          return;
        }
    
        const handleMouseMove = (event: MouseEvent) => {
          const rect = gridContainer.getBoundingClientRect();
          if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
    
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
            glow.style.display = "block";
          } else {
            glow.style.display = "none";
          }
        };
    
        window.addEventListener("mousemove", handleMouseMove as EventListener);
    
        return () => {
          window.removeEventListener("mousemove", handleMouseMove as EventListener);
        };
      }, []);

  return (
    <div className="relative w-full ">
      <div className="grid-container fixed inset-0 z-10 min-h-screen"></div>
      <div className="grid-base inset-0">
        <div id="glow" className="absolute"></div>
      </div>
      <div className="z-20 relative">
        {children}
      </div>
    </div>
    
  );
}
