import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddLinkPage-Style.css';
import linkIcon from '../../assets/PICT.png';
import { addLink } from '../../utils/localStorage';
// Define NewLink type locally to avoid import issues
const AddLinkPage: React.FC = () => {
  const navigate = useNavigate();
  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add the new link to local storage
    addLink({
      name: linkName,
      url: linkUrl,
      favorite: false
    });
    alert(`Link "${linkName}" added!`);
    navigate('/linkpage');
  };

  return (
    <div className="addlink-container">
      <div className="addlink-card">
        <img src={linkIcon} alt="Link Icon" className="addlink-icon" />
        <h2 className="addlink-title">Add New Link</h2>
        <form onSubmit={handleSubmit} className="addlink-form">
          <div className="addlink-input-group">
            <label htmlFor="linkName">Link Name</label>
            <input
              type="text"
              id="linkName"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
              placeholder="e.g., My Favorite Blog"
              required
            />
          </div>
          <div className="addlink-input-group">
            <label htmlFor="linkUrl">Link URL</label>
            <input
              type="url"
              id="linkUrl"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="e.g., https://www.example.com"
              required
            />
          </div>
          <button type="submit" className="addlink-button">Add Link</button>
        </form>
        <button className="addlink-back-button" onClick={() => navigate('/linkpage')}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddLinkPage;
