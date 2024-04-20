import React, { useState } from 'react';

function Tooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false);
  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && <div className="tooltip-content">{content}</div>}
    </div>
  );
}

export default Tooltip;
