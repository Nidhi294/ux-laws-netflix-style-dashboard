// Tooltip for law cards on hover
// Shows thumbnail, title, and rating after 200ms delay, positioned above the card
export function attachCardHoverTooltip(cardElement, law) {
  let tooltipEl = null;
  let hoverTimer = null;

  const createTooltip = () => {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'law-tooltip';
    tooltipEl.innerHTML = `
      <img src="${law.thumbnailUrl}" alt="${law.title}" class="tooltip-img" />
      <div class="tooltip-content">
        <h4 class="tooltip-title">${law.title}</h4>
        <span class="tooltip-rating">${'★'.repeat(Math.round(law.rating))} (${law.rating})</span>
      </div>
    `;
    document.body.appendChild(tooltipEl);
    // Position tooltip centered above the card
    const rect = cardElement.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();
    const top = rect.top - tooltipRect.height - 8; // 8px gap
    const left = rect.left + (rect.width - tooltipRect.width) / 2;
    tooltipEl.style.top = `${top < 0 ? rect.bottom + 8 : top}px`;
    tooltipEl.style.left = `${Math.max(0, left)}px`;
  };

  const showTooltip = () => {
    if (!tooltipEl) {
      createTooltip();
    }
  };

  const hideTooltip = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
    if (tooltipEl) {
      tooltipEl.remove();
      tooltipEl = null;
    }
  };

  cardElement.addEventListener('mouseenter', () => {
    hoverTimer = setTimeout(showTooltip, 200);
  });
  cardElement.addEventListener('mouseleave', hideTooltip);
}
