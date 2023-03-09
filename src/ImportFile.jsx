import React, { useState } from 'react';
// import { Proskomma } from "proskomma-core";

function ImportFile(props) {
  const [hover, setHover] = useState(false);

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      const contents = event.target.result;
      props.onFileUpload(contents);
    };
    reader.readAsText(file);
    setHover(false);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setHover(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setHover(false);
  }

  return (
    <div
      className={hover ? "file-input hover" : "file-input"}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <p>Drag and drop a TXT file here</p>
    </div>
  );
}

export default ImportFile;
