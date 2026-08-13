import React, { useState, useEffect, useRef } from 'react';

/**
 * High-Performance DOM Virtualized List for BusinessCollapse.Com
 * Renders ONLY the 15-20 viewport-visible cards (+ small buffer) to maintain 60 FPS on 49" Samsung G9 displays.
 */
export default function VirtualizedGraveyardList({
  items = [],
  itemHeight = 120, // Estimated height per card in compact mode
  overscan = 5,
  renderItem
}) {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(800);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerHeight(window.innerHeight || 800);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = items.length;
  const totalHeight = totalItems * itemHeight;

  // Calculate visible range
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(totalItems - 1, Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan);

  const visibleItems = items.slice(startIndex, endIndex + 1);

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: 'calc(100vh - 280px)',
        minHeight: '600px',
        overflowY: 'auto',
        position: 'relative',
        paddingRight: '6px'
      }}
    >
      <div style={{ height: `${totalHeight}px`, position: 'relative', width: '100%' }}>
        {visibleItems.map((item, idx) => {
          const actualIndex = startIndex + idx;
          const top = actualIndex * itemHeight;

          return (
            <div
              key={item.id || `virt-${actualIndex}`}
              style={{
                position: 'absolute',
                top: `${top}px`,
                left: 0,
                right: 0,
                height: `${itemHeight}px`,
                boxSizing: 'border-box'
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
