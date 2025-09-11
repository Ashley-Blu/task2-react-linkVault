import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LinkPage-Style.css';
import linkIcon from '../../assets/PICT.png';

interface Link {
  id: string;
  name: string;
  url: string;
  favorite: boolean;
}

const LinkPage: React.FC = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState<Link[]>([
    { id: '1', name: 'Google', url: 'https://www.google.com', favorite: false },
    { id: '2', name: 'React Docs', url: 'https://react.dev', favorite: true },
    { id: '3', name: 'GitHub', url: 'https://github.com', favorite: false },
  ]);

  const toggleFavorite = (id: string) => {
    setLinks(links.map(link =>
      link.id === id ? { ...link, favorite: !link.favorite } : link
    ));
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div className="linkpage-container">
      <div className="linkpage-header">
        <img src={linkIcon} alt="Link Icon" className="linkpage-icon" />
        <h2 className="linkpage-title">My Links</h2>
        <button className="linkpage-add-button" onClick={() => navigate('/addlinkpage')}>
          + Add New Link
        </button>
        <button className="linkpage-logout-button" onClick={() => navigate('/login')}>
          Logout
        </button>
      </div>
      <div className="linkpage-content">
        {links.length === 0 ? (
          <p className="linkpage-no-links">No links added yet. Add some!</p>
        ) : (
          <div className="link-list">
            {links.map(link => (
              <div key={link.id} className="link-item">
                <div className="link-info">
                  <span className="link-name">{link.name}</span>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-url">
                    {link.url}
                  </a>
                </div>
                <div className="link-actions">
                  <button
                    className={`link-action-button favorite-button ${link.favorite ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(link.id)}
                  >
                    {link.favorite ? '★' : '☆'}
                  </button>
                  <button className="link-action-button delete-button" onClick={() => deleteLink(link.id)}>
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkPage;
