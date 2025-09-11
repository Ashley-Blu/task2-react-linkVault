// Local storage utility functions for Links-in application

// Define types locally to avoid import issues
interface Link {
  id: string;
  name: string;
  url: string;
  favorite: boolean;
}

type NewLink = Omit<Link, 'id'>;

const LINKS_STORAGE_KEY = 'links-in-saved-links';

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.error('localStorage is not available:', e);
    return false;
  }
};

// Save links to local storage
export const saveLinks = (links: Link[]): void => {
  try {
    if (isLocalStorageAvailable()) {
      localStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(links));
    }
  } catch (e) {
    console.error('Failed to save links to localStorage:', e);
  }
};

// Type guard to validate if an object is a Link
const isLink = (item: any): item is Link => {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.url === 'string' &&
    typeof item.favorite === 'boolean'
  );
};

// Type guard to validate if an array contains only Link objects
const isLinkArray = (items: any[]): items is Link[] => {
  return Array.isArray(items) && items.every(isLink);
};

// Load links from local storage with type validation
export const loadLinks = (): Link[] => {
  try {
    if (isLocalStorageAvailable()) {
      const savedLinks = localStorage.getItem(LINKS_STORAGE_KEY);
      if (!savedLinks) return [];
      
      const parsedData = JSON.parse(savedLinks);
      
      // Validate that parsed data is an array of Link objects
      if (isLinkArray(parsedData)) {
        return parsedData;
      } else {
        console.error('Invalid data format in localStorage');
        return [];
      }
    }
    return [];
  } catch (e) {
    console.error('Failed to load links from localStorage:', e);
    return [];
  }
};

// Add a new link to local storage
export const addLink = (link: NewLink): Link => {
  const links = loadLinks();
  const newLink = {
    ...link,
    id: Date.now().toString(), // Generate a unique ID
  };
  
  saveLinks([...links, newLink]);
  return newLink;
};

// Delete a link from local storage
export const deleteLink = (id: string): void => {
  const links = loadLinks();
  const updatedLinks = links.filter(link => link.id !== id);
  saveLinks(updatedLinks);
};

// Toggle favorite status of a link
export const toggleFavorite = (id: string): void => {
  const links = loadLinks();
  const updatedLinks = links.map(link =>
    link.id === id ? { ...link, favorite: !link.favorite } : link
  );
  saveLinks(updatedLinks);
};