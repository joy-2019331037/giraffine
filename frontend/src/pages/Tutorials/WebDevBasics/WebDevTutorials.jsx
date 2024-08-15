import React, { useState } from 'react';
import htmlTutorials from '../../../assets/data/webdevData/htmlTutorials';
import cssTutorials from '../../../assets/data/webdevData/cssTutorials';
import HTMLPreview from './HTMLPreview';

const TutorialsPage = () => {
  const [htmlSelected,setHtmlSelected]=useState(true);
  const [selectedHtmlTutorial, setSelectedHtmlTutorial] = useState(0);
  const [selectedCssTutorial, setSelectedCssTutorial] = useState(0);

  return (
    <div style={{ maxWidth: '1200px', padding: '16px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '16px', textAlign: 'center' }}>
        HTML & CSS Tutorials
      </h1>
      <div style={{ display: 'flex', marginBottom: '16px' }}>
        <label style={{ cursor: 'pointer', marginRight: '8px' }}>
          <input
            type="radio"
            name="tab"
            value="html"
            onClick={() => setHtmlSelected(true)}
            defaultChecked
          /> HTML Tutorials
        </label>
        <label style={{ cursor: 'pointer' }}>
          <input
            type="radio"
            name="tab"
            value="css"
            onClick={() => setHtmlSelected(false)}
          /> CSS Tutorials
        </label>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Left side list */}
        <div style={{ flex: 1, marginRight: '16px', maxHeight: '500px', overflowY: 'auto' }}>
          {/* HTML Tutorials */}
          {htmlSelected  && htmlTutorials.map((tutorial, index) => (
            <div
              key={index}
              onClick={() => setSelectedHtmlTutorial(index)}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '8px',
                backgroundColor: selectedHtmlTutorial === index ? '#f0f8ff' : '#fff',
                cursor: 'pointer'
              }}
            >
              <p style={{ color: '#2c7a7b', fontWeight: 'bold', margin: 0 }}>
                {tutorial.title}
              </p>
            </div>
          ))}

          {/* CSS Tutorials */}
          {!htmlSelected && cssTutorials.map((tutorial, index) => (
            <div
              key={index}
              onClick={() => setSelectedCssTutorial(index)}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '8px',
                backgroundColor: selectedCssTutorial === index ? '#f0f8ff' : '#fff',
                cursor: 'pointer'
              }}
            >
              <p style={{ color: '#2c7a7b', fontWeight: 'bold', margin: 0 }}>
                {tutorial.title}
              </p>
            </div>
          ))}
        </div>

        {/* Right side content display */}
        <div style={{ flex: 3 }}>
          {htmlSelected && selectedHtmlTutorial !== null && (
            <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}>
              {/* <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#2c7a7b' }}>
                {htmlTutorials[selectedHtmlTutorial].title}
              </h2> */}
              <p>{htmlTutorials[selectedHtmlTutorial].description}</p>
              <hr style={{ margin: '16px 0' }} />
              <div dangerouslySetInnerHTML={{ __html: htmlTutorials[selectedHtmlTutorial].content }} />
              <hr style={{ margin: '16px 0' }} />
              <p style={{fontSize:"20px", fontWeight:'bold', color:'indigo'}}>Customize and View</p>
              <HTMLPreview
                key={selectedHtmlTutorial}  // Add this key prop to force re-render
                initialHtmlContent={htmlTutorials[selectedHtmlTutorial].preview}
              />
            </div>
          )}

          {!htmlSelected && selectedCssTutorial !== null && (
            <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}>
              {/* <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#2c7a7b' }}>
                {cssTutorials[selectedCssTutorial].title}
              </h2> */}
              <p>{cssTutorials[selectedCssTutorial].description}</p>
              <hr style={{ margin: '16px 0' }} />
              <div dangerouslySetInnerHTML={{ __html: cssTutorials[selectedCssTutorial].content }} />
              <p style={{fontSize:"20px", fontWeight:'bold', color:'indigo'}}>Customize and View</p>
              <HTMLPreview
                key={selectedCssTutorial}  // Add this key prop to force re-render
                initialHtmlContent={cssTutorials[selectedCssTutorial].preview}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialsPage;
