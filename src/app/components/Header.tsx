// components/Header.tsx
import React from "react";

interface Props {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  showClear: boolean;
  setShowClear: (value: boolean) => void;
}

export default function Header({
  searchInput,
  setSearchInput,
  handleSearch,
  showClear,
  setShowClear,
}: Props) {
  return (
    <header
      style={{
        width: "100%",
        background: "#fff",
        padding: 0,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        height: 70,
        display: "flex",
        alignItems: "center",
        boxShadow: "0 1px 8px rgba(39,55,207,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div
          style={{
            color: "#222",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: 0.5,
            marginLeft: 16,
          }}
        >
          <span
            style={{
              color: "#7c3aed",
              fontWeight: 800,
              fontSize: 22,
              marginRight: 6,
            }}
          >
            🛒
          </span>
          B2B Marketplace
        </div>
      <form
  onSubmit={handleSearch}
  style={{
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 32,
    marginRight: 32,
    maxWidth: 520,
    position: "relative",
  }}
>
  {/* Input wrapper */}
  <div style={{ position: 'relative', flex: 1 }}>
    <input
      type="text"
      placeholder="Search products, suppliers…"
      value={searchInput}
      onChange={(e) => {
        setSearchInput(e.target.value);
        setShowClear(!!e.target.value);
      }}
      style={{
        color: "#222",
        width: "100%",
        fontSize: 16,
        padding: "10px 18px",
        paddingRight: 38,
        borderRadius: 24,
        border: "2px solid #bfc7f7",
        outline: "none",
        background: "#fff",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "#7c3aed")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "#bfc7f7")}
    />
    {showClear && searchInput && (
      <button
        type="button"
        aria-label="Clear"
        onClick={() => setSearchInput("")}
        style={{
          background: 'none',
          border: 'none',
          position: 'absolute',
          right: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 20,
          color: '#aaa',
          cursor: 'pointer',
          padding: 0,
          zIndex: 2,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    )}
  </div>

  {/* Search Button - moved outside input wrapper */}
  <button
    type="submit"
    style={{
      background: "#7c3aed",
      color: "#fff",
      fontWeight: 600,
      fontSize: 16,
      border: "none",
      borderRadius: 24,
      padding: "10px 26px",
      cursor: "pointer",
      boxShadow: "0 1px 4px rgba(124,58,237,0.09)",
      transition: "background 0.2s",
      marginLeft: 12, // spacing between input and button
    }}
    onMouseOver={(e) => (e.currentTarget.style.background = "#5b21b6")}
    onMouseOut={(e) => (e.currentTarget.style.background = "#7c3aed")}
  >
    Search
  </button>
</form>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginRight: 18,
          }}
        >
          <button
            type="button"
            aria-label="Sign In"
            style={{
              background: "#fff",
              color: "#7c3aed",
              border: "1px solid #7c3aed",
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 15,
              padding: "7px 22px",
              marginRight: 8,
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#f3e8ff";
              e.currentTarget.style.color = "#5b21b6";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#7c3aed";
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            aria-label="Post Requirement"
            style={{
              background: "#7c3aed",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 15,
              padding: "7px 22px",
              cursor: "pointer",
              transition: "background 0.2s",
              boxShadow: "0 1px 4px rgba(124,58,237,0.09)",
              marginLeft: 4,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#5b21b6";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#7c3aed";
            }}
          >
            Post Requirement
          </button>
        </div>
      </div>
    </header>
  );
}
