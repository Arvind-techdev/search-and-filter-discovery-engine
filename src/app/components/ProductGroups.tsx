// components/ProductGroups.tsx
import React from "react";

interface Props {
  grouped: Record<string, any[]>;
}

export default function ProductGroups({ grouped }: Props) {
  return (
    <div style={{ flex: 1 }}>
      {Object.entries(grouped).map(([catName, catProducts]) => (
            <div key={catName} style={{ marginBottom: 28 }}>
              <h2
                style={{
                  fontSize: 18,
                  margin: "0 0 18px 0",
                  color: "#222",
                  fontWeight: 500,
                }}
              >
                {catName}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 20,
                  background: "none",
                  padding: "0 8px",
                }}
              >
                {catProducts.map((product) => (
                  <div
                    key={product._id}
                    style={{
                      border: "1px solid #e0e2e6",
                      borderRadius: 14,
                      background: "#fff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                      padding: 18,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minHeight: 340,
                      maxWidth: 260,
                      margin: "0 auto",
                    }}
                  >
                    <img
                      src={
                        product.image ||
                        "https://via.placeholder.com/120x120?text=No+Image"
                      }
                      alt={product.title}
                      style={{
                        width: 110,
                        height: 110,
                        objectFit: "cover",
                        borderRadius: 8,
                        marginBottom: 12,
                        background: "#fafbfc",
                        border: "1px solid #f0f0f0",
                      }}
                    />
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        marginBottom: 6,
                        textAlign: "center",
                        color: "#222",
                        minHeight: 34,
                      }}
                    >
                      {product.title}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 17,
                        color: "#7c3aed",
                        marginBottom: 4,
                      }}
                    >
                      {'\u20B9'}{product.price ?? 200}
                    </div>
                 <div
  style={{
    fontSize: 13,
    color: "#f59e42",
    marginBottom: 3,
  }}
>
  <span style={{ color: "#f59e42", fontSize: 16 }}>
    {Array.from({ length: 5 }).map((_, i) => {
      if (i < Math.floor(product.rating)) {
        return "★"; // full star
      } else if (i < product.rating) {
        return "☆"; // could do half star here if needed, but using empty star for simplicity
      } else {
        return "☆"; // empty star
      }
    })}
  </span>{" "}
  <span style={{ color: "#888", fontSize: 12 }}>
    ({product.rating ?? 43})
  </span>
</div>

                       <div
                      style={{
                        fontSize: 13,
                        color: "#f59e42",
                        marginBottom: 3,
                      }}
                    >

                            {product.attributes?.location || "Location unknown"}
                            </div>

                    <div
                      style={{
                        fontSize: 13,
                        color: "#888",
                        marginBottom: 10,
                        textAlign: "center",
                        minHeight: 32,
                      }}
                    >
                      {product.description ??
                        "High quality organic fertilizer suitable for Soil application."}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        gap: 8,
                        marginTop: "auto",
                      }}
                    >
                      <button
                        style={{
                          background: "#f5f6fa",
                          color: "#222",
                          border: "1px solid #e0e2e6",
                          borderRadius: 6,
                          fontWeight: 500,
                          fontSize: 14,
                          padding: "7px 0",
                          flex: 1,
                          cursor: "pointer",
                          marginRight: 0,
                        }}
                      >
                        Contact
                      </button>
                      <button
                        style={{
                          background: "#7c3aed",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          fontWeight: 600,
                          fontSize: 14,
                          padding: "7px 0",
                          flex: 1,
                          cursor: "pointer",
                          marginLeft: 0,
                          transition: "background 0.2s",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.background = "#5b21b6")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.background = "#7c3aed")
                        }
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
    </div>
  );
}
