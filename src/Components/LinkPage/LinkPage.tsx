import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LinkPage-Style.css";
import linkIcon from "../../assets/PICT.png";
import { loadLinks, saveLinks } from "../../utils/localStorage";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteSweep } from "react-icons/md";
// Define Link interface locally to avoid import issues
interface Link {
  id: string;
  name: string;
  url: string;
  favorite: boolean;
}

const LinkPage: React.FC = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState<Link[]>([]);

  // Load links from local storage on component mount
  useEffect(() => {
    const savedLinks = loadLinks();
    setLinks(savedLinks);
  }, []);

  const toggleFavorite = (id: string) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, favorite: !link.favorite } : link,
    );
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  /**
   * Handles link deletion with user confirmation
   * Prevents accidental deletion by requiring confirmation
   *
   * @function handleDeleteLink
   * @param {string} id - The ID of the link to delete
   * @returns {void}
   */
  const handleDeleteLink = (id: string) => {
    const linkToDelete = links.find((link) => link.id === id);
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${linkToDelete?.name}"?`,
    );

    if (confirmDelete) {
      deleteLink(id);
    }
  };

  const deleteLink = (id: string) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  return (
    <div className="linkpage-container">
      <div className="linkpage-header">
        <img src={linkIcon} alt="Link Icon" className="linkpage-icon" />
        <h2 className="linkpage-title">My Links</h2>
        <button
          className="linkpage-add-button"
          onClick={() => navigate("/addlinkpage")}
        >
          + Add New Link
        </button>
        <button
          className="linkpage-logout-button"
          onClick={() => navigate("/login")}
        >
          Logout
        </button>
      </div>
      <div className="linkpage-content">
        {links.length === 0 ? (
          <p className="linkpage-no-links">No links added yet. Add some!</p>
        ) : (
          <div className="link-list">
            {links.map((link) => (
              <div key={link.id} className="link-item">
                <div className="link-info">
                  <span className="link-name">{link.name}</span>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-url"
                  >
                    {link.url}
                  </a>
                </div>
                <div className="link-actions">
                  <button
                    className={`link-action-button favorite-button ${link.favorite ? "favorited" : ""}`}
                    onClick={() => toggleFavorite(link.id)}
                  >
                    {link.favorite ? "★" : "☆"}
                  </button>
                  <button
                    className="link-action-button edit-button"
                    onClick={() => navigate(`/editlinkpage/${link.id}`)}
                    title="Edit link"
                  >
                    <CiEdit />
                  </button>
                  <button
                    className="link-action-button delete-button"
                    onClick={() => handleDeleteLink(link.id)}
                  >
                    <MdOutlineDeleteSweep />
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
