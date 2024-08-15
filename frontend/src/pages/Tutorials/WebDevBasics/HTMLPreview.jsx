import React, { useEffect, useRef, useState } from "react";

const HTMLPreview = ({ initialHtmlContent }) => {
  const iframeRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState(initialHtmlContent);

  useEffect(() => {
    // Update the iframe content based on textarea value
    const iframeDocument = iframeRef.current.contentDocument;
    iframeDocument.open();
    iframeDocument.write(htmlContent);
    iframeDocument.close();
  }, [htmlContent]);

  const handleInputChange = (e) => {
    setHtmlContent(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        justifyContent: "center",
        backgroundColor:"#bebdbf",
        padding:"15px",
        borderRadius: "5px",
      }}
    >
      <textarea
        value={htmlContent}
        onChange={handleInputChange}
        style={{
          width: "100%",
          height: "30vh",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          fontFamily: "monospace",
          backgroundColor: "#190630",
          color: "white",
        }}
      />
      <iframe
        ref={iframeRef}
        title="HTML Preview"
        style={{ width: "100%", height: "30vh", border: "1px solid #ddd", background:"white",borderRadius: "5px", }}
      />
    </div>
  );
};

export default HTMLPreview;
