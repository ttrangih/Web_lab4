import React from "react";
import "./UploadInfo.css"; 
function UploadInfo({ username, description, song }) {
  return (
    <div className="upload-info-panel">
      <h4>Video Info</h4>
      <p><strong>User:</strong> @{username}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Song:</strong> {song}</p>
    </div>
  );
}

export default UploadInfo;
