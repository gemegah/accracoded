export function runLandingTypewriter() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const landingContent = document.querySelector('#s-landing .hero-stack');
  if (!landingContent) {
    return;
  }

  const textNodes = [];
  const walker = document.createTreeWalker(landingContent, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  while (walker.nextNode()) {
    const node = walker.currentNode;
    textNodes.push({ node, text: node.textContent });
    node.textContent = '';
  }

  const totalChars = textNodes.reduce((sum, item) => sum + item.text.length, 0);
  if (totalChars === 0) {
    return;
  }

  const baseDelay = 45;
  let shownChars = 0;

  function render(charCount) {
    let remaining = charCount;
    textNodes.forEach((item) => {
      const visibleLength = Math.min(item.text.length, Math.max(remaining, 0));
      item.node.textContent = item.text.slice(0, visibleLength);
      remaining -= item.text.length;
    });
  }

  function tick() {
    shownChars += 1;
    render(shownChars);

    if (shownChars >= totalChars) {
      return;
    }

    const typed = textNodes.map((item) => item.node.textContent).join('');
    const lastChar = typed.charAt(typed.length - 1);
    const pause = /[.,!?]/.test(lastChar) ? 90 : 0;
    window.setTimeout(tick, baseDelay + pause);
  }

  tick();
}
