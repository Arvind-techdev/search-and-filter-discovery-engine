import React, { useState, useEffect, useRef } from "react";

interface SidebarProps {
  filterOptions: any;
  selectedFilters: any;
  setSelectedFilters: (filters: any) => void;
  onApply: () => void;
}

export default function Sidebar({
  filterOptions,
  selectedFilters,
  setSelectedFilters,
  onApply,
}: SidebarProps) {
  const initialMin = Array.isArray(selectedFilters.price)
    ? selectedFilters.price[0]
    : 0;
  const initialMax = Array.isArray(selectedFilters.price)
    ? selectedFilters.price[1]
    : 10000;

  const [minPrice, setMinPrice] = useState(initialMin);
  const [maxPrice, setMaxPrice] = useState(initialMax);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Debounce Effect
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setSelectedFilters((prev: any) => ({
        ...prev,
        price: [minPrice, maxPrice],
      }));
    }, 300); // debounce delay in ms
  }, [minPrice, maxPrice]);

  const handleCheckbox = (key: string, value: string) => {
    setSelectedFilters((prev: any) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v: string) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
    setMinPrice(0);
    setMaxPrice(10000);
  };

  const handleChange = (key: string, value: string) => {
    setSelectedFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const renderCheckboxGroup = (
    title: string,
    key: string,
    values: string[]
  ) => {
    if (!values?.length) return null;
    return (
      <div style={{ color: "black", marginBottom: 12 }}>
        <div style={{ fontWeight: 600, fontSize: 18, margin: "16px 0 8px 0" }}>
          {title}
        </div>
        {values.map((val: string) => (
          <div key={val} style={{ fontSize: 14, marginBottom: 6 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="checkbox"
                checked={(selectedFilters[key] || []).includes(val)}
                onChange={() => handleCheckbox(key, val)}
              />
              {val}
            </label>
          </div>
        ))}
      </div>
    );
  };
  return (
    <aside
      style={{
        width: 260,
        minWidth: 200,
        maxWidth: 280,
        background: "#fff",
        border: "1px solid #e0e2e6",
        borderRadius: 14,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        padding: 24,
        marginRight: 32,
        position: "sticky",
        top: 88,
        alignSelf: "flex-start",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        transition: "box-shadow 0.2s",
        height: "calc(100vh - 100px)", // limit height
        overflowY: "auto",
      }}
    >
      {/* Search */}
      <label
        style={{
          color: "black",
          fontWeight: 800,
          fontSize: 20,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Search
      </label>

      {/* Filter clear */}
      <button
        onClick={handleClearFilters}
        style={{
          backgroundColor: "#ef4444",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "8px 12px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: 14,
          marginBottom: 10,
          alignSelf: "center",
        }}
      >
        Clear All Filters
      </button>

      {/* Category Dropdown */}
<div style={{ marginBottom: 20 }}>
  <label
    style={{
      color: "black",
      fontWeight: 600,
      fontSize: 15,
      marginBottom: 6,
      display: "block",
    }}
  >
    Category
  </label>
 <select
  value={selectedFilters.category || ""}
  onChange={(e) => handleChange("category", e.target.value)}
  style={{
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
  }}
>
  <option value="">All Categories</option>
  {filterOptions.categories?.map((cat: any) => (
    <option key={cat._id} value={cat._id}>
      {cat.name}
    </option>
  ))}
</select>

</div>

      {/* Price Range */}
      <label
        style={{
          color: "black",
          fontWeight: 600,
          fontSize: 15,
          marginBottom: 10,
        }}
      >
        Price Range
      </label>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginBottom: 16,
        }}
      >
        <span style={{ color: "#7c3aed", fontWeight: 600, fontSize: 22 }}>
          ${minPrice} - ${maxPrice}
        </span>
        <label style={{ color: "black", fontSize: 13 }}>Min Price</label>
        <input
          type="range"
          min={0}
          max={maxPrice - 10}
          step={10}
          value={minPrice}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxPrice - 10);
            setMinPrice(value);
          }}
        />
        <label style={{ color: "black", fontSize: 13, marginTop: 8 }}>
          Max Price
        </label>
        <input
          type="range"
          min={minPrice + 10}
          max={10000}
          step={10}
          value={maxPrice}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), minPrice + 10);
            setMaxPrice(value);
          }}
        />
      </div>

      {/* Shared Checkbox Sections */}
      {renderCheckboxGroup("Brands", "brands", filterOptions.brands || [])}
      {renderCheckboxGroup(
        "Locations",
        "locations",
        filterOptions.locations || []
      )}
      {renderCheckboxGroup("Types", "types", filterOptions.types || [])}
      {renderCheckboxGroup("NPK Ratios", "npks", filterOptions.npks || [])}
      {renderCheckboxGroup(
        "Use Cases",
        "use_cases",
        filterOptions.use_cases || []
      )}
      {renderCheckboxGroup("Colors", "colors", filterOptions.colors || [])}
      {renderCheckboxGroup(
        "Materials",
        "materials",
        filterOptions.materials || []
      )}
      {renderCheckboxGroup("Genders", "genders", filterOptions.genders || [])}
      {renderCheckboxGroup(
        "Screen Sizes",
        "screen_sizes",
        filterOptions.screen_sizes || []
      )}
      {renderCheckboxGroup(
        "Resolutions",
        "resolutions",
        filterOptions.resolutions || []
      )}
    </aside>
  );
}
