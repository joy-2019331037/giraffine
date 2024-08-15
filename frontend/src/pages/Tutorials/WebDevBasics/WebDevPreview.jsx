import React, { useEffect, useRef, useState } from "react";

const WebDevPreview = ({
  initialHtmlContent,
  initialCssContent,
  initialJsContent,
}) => {
  // Static initial content for HTML, CSS, and JavaScript
  const staticHtmlContent = `<div class="container">
    <h1>Hello, World!</h1>
    <p>This is a paragraph with some sample text.</p>
  </div>`;

  const staticCssContent = `.container {
    text-align: center;
    margin-top: 50px;
  }

  h1 {
    color: darkblue;
  }

  p {
    color: darkgreen;
  }`;

  const staticJsContent = `document.querySelector('h1').addEventListener('click', () => {
    alert('Hello, World!');
  });`;

  const iframeRef = useRef(null);

  const [htmlContent, setHtmlContent] = useState(
    initialHtmlContent || staticHtmlContent
  );
  const [cssContent, setCssContent] = useState(
    initialCssContent || staticCssContent
  );
  const [jsContent, setJsContent] = useState(
    initialJsContent || staticJsContent
  );

  useEffect(() => {
    // Update the iframe content based on textarea values
    const iframeDocument = iframeRef.current.contentDocument;
    iframeDocument.open();
    iframeDocument.write(`
      <html>
        <head>
          <style>${cssContent}</style>
        </head>
        <body>
          ${htmlContent}
          <script>${jsContent}</script>
        </body>
      </html>
    `);
    iframeDocument.close();
  }, [htmlContent, cssContent, jsContent]);

  const handleHtmlChange = (e) => setHtmlContent(e.target.value);
  const handleCssChange = (e) => setCssContent(e.target.value);
  const handleJsChange = (e) => setJsContent(e.target.value);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          justifyContent: "center",
          backgroundColor: "#bebdbf",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        <div style={{ width: "100%" }}>
          <h3
            style={{ color: "indigo", marginBottom: "10px", marginTop: "0px" }}
          >
            HTML
          </h3>
          <textarea
            value={htmlContent}
            onChange={handleHtmlChange}
            placeholder="HTML"
            style={{
              width: "90%",
              height: "50vh",
              padding: "15px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontFamily: "monospace",
              backgroundColor: "#190630",
              color: "white",
            }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <h3
            style={{
              color: "indigo",
              marginBottom: "10px",
              marginTop: "0px",
            }}
          >
            CSS
          </h3>
          <textarea
            value={cssContent}
            onChange={handleCssChange}
            placeholder="CSS"
            style={{
              width: "90%",
              height: "50vh",
              padding: "15px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontFamily: "monospace",
              backgroundColor: "#190630",
              color: "white",
            }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <h3
            style={{
              color: "indigo",
              marginBottom: "10px",
              marginTop: "0px",
            }}
          >
            JavaScript
          </h3>
          <textarea
            value={jsContent}
            onChange={handleJsChange}
            placeholder="JavaScript"
            style={{
              width: "90%",
              height: "50vh",
              padding: "15px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontFamily: "monospace",
              backgroundColor: "#190630",
              color: "white",
            }}
          />
        </div>
      </div>

      <iframe
        ref={iframeRef}
        title="Web Development Preview"
        style={{
          width: "100%",
          height: "60vh",
          border: "1px solid #ddd",
          background: "white",
          borderRadius: "5px",
          margin: "2rem 0rem 0rem 0rem",
        }}
      />
    </>
  );
};

export default WebDevPreview;
