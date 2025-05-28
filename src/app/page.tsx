// app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProductGroups from "./components/ProductGroups";
import Loader from "./components/Loader";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showClear, setShowClear] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [filterOptions, setFilterOptions] = useState<any>({});

useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  setLoading(true);
  setError("");

  // Extract categoryId from filters if it exists
  const categoryId = filters?.category;
  const { category, ...restFilters } = filters || {};

  const params = [
    search.trim() ? `q=${encodeURIComponent(search)}` : null,
    categoryId ? `categoryId=${encodeURIComponent(categoryId)}` : null,
    restFilters && Object.keys(restFilters).length > 0
      ? `filters=${encodeURIComponent(JSON.stringify(restFilters))}`
      : null,
    "page=1",
    "limit=60",
  ]
    .filter(Boolean)
    .join("&");

  fetch(`/api/search?${params}`, { signal })
    .then(async (res) => {
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.results || []);
      setFilterOptions(data.filters || {});
    })
    .catch((err) => {
      if (err.name === "AbortError") return;
      setError(err.message);
    })
    .finally(() => setLoading(false));

  return () => {
    controller.abort();
  };
}, [search, filters]); // ✅ No need to add categoryId



  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const grouped: Record<string, any[]> = {};
  products.forEach((product) => {
    const cat = product.categoryData?.name || "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(product);
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fd" }}>
      {loading && <Loader />}
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        showClear={showClear}
        setShowClear={setShowClear}
      />
      <main
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: "96px 0 32px 0",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Sidebar
          filterOptions={filterOptions}
          selectedFilters={filters}
          setSelectedFilters={setFilters}
          onApply={() => { /* Optionally trigger fetch or close sidebar */ }}
        />
        <ProductGroups grouped={grouped} />
      </main>
    </div>
  );
}
