import React from "react";

const DownloadProductsButton = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/export-products",
        {
          method: "GET",
          headers: {
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "products.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <button
      className="px-4 py-0.5 border border-black rounded-sm"
      onClick={handleDownload}
    >
      Download Products as Excel
    </button>
  );
};

export default DownloadProductsButton;
