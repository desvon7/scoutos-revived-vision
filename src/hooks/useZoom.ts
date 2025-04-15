import { useState } from 'react';

export function useZoom() {
  // State for zoom level
  const [zoom, setZoom] = useState(1);

  // Handle zoom in
  const zoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 2));
  };

  // Handle zoom out
  const zoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5));
  };

  return {
    zoom,
    zoomIn,
    zoomOut,
  };
}
