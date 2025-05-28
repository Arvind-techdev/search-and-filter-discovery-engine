// components/Loader.tsx
import React from "react";

export default function Loader() {
  return (
    <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <span
            style={{
              width: 56,
              height: 56,
              border: "6px solid #7c3aed",
              borderTop: "6px solid #fff",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              display: "inline-block",
            }}
          />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            `}</style>
          </div>
  );
}
