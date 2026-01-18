import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditLinkPage-Style.css";
import linkIcon from "../../assets/PICT.png";
import { loadLinks, saveLinks } from "../../utils/localStorage";

// Define Link interface locally to avoid import issues
interface Link {
  id: string;
  name: string;
  url: string;
  favorite: boolean;
}

const EditLinkPage: React.FC = () => {
  const navigate = useNavigate();
  const { linkId } = useParams<{ linkId: string }>();
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [error, setError] = useState("");

  /**
   * Load the link data on component mount
   * Finds the link by ID and populates the form
   */
  useEffect(() => {
    if (!linkId) {
      setError("No link ID provided");
      return;
    }

    const links = loadLinks();
    const linkToEdit = links.find((link) => link.id === linkId);

    if (!linkToEdit) {
      setError("Link not found");
      return;
    }

    setLinkName(linkToEdit.name);
    setLinkUrl(linkToEdit.url);
  }, [linkId]);

  /**
   * Handles edit form submission
   * Validates inputs and updates the link in local storage
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!linkName.trim()) {
      setError("Link name is required");
      return;
    }

    if (!linkUrl.trim()) {
      setError("Link URL is required");
      return;
    }

    if (!linkId) {
      setError("No link ID provided");
      return;
    }

    try {
      const links = loadLinks();
      const linkIndex = links.findIndex((link) => link.id === linkId);

      if (linkIndex === -1) {
        setError("Link not found");
        return;
      }

      // Update the link
      links[linkIndex] = {
        ...links[linkIndex],
        name: linkName,
        url: linkUrl,
      };

      saveLinks(links);
      alert(`Link "${linkName}" updated!`);
      navigate("/linkpage");
    } catch (err) {
      setError("Failed to update link. Please try again.");
      console.error("Error updating link:", err);
    }
  };

  return (
    <div className="editlink-container">
      <div className="editlink-card">
        <img src={linkIcon} alt="Link Icon" className="editlink-icon" />
        <h2 className="editlink-title">Edit Link</h2>
        {error && <p className="editlink-error">{error}</p>}
        {!error && (
          <form onSubmit={handleSubmit} className="editlink-form">
            <div className="editlink-input-group">
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
            <div className="editlink-input-group">
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
            <button type="submit" className="editlink-button">
              Save Changes
            </button>
          </form>
        )}
        <button
          className="editlink-back-button"
          onClick={() => navigate("/linkpage")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditLinkPage;
