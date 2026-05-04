function applyAttributes(element, attributes = {}) {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    element.setAttribute(key, String(value));
  });
}

export function createButton({
  label,
  variant = 'primary',
  href = null,
  type = 'button',
  attributes = {}
}) {
  const element = document.createElement('sl-button');
  const variantMap = {
    primary: 'primary',
    secondary: 'default',
    ghost: 'text',
    danger: 'danger'
  };

  element.setAttribute('variant', variantMap[variant] || 'default');
  element.setAttribute('data-ui', 'accracoded');
  element.setAttribute('pill', '');
  element.textContent = label;

  if (href) {
    element.setAttribute('href', href);
  } else {
    element.setAttribute('type', type);
  }

  applyAttributes(element, attributes);
  return element;
}

export function createHeading(level, className, text) {
  const heading = document.createElement(level);
  heading.className = className;
  heading.textContent = text;
  return heading;
}

export function createParagraph(className, text) {
  const p = document.createElement('p');
  p.className = className;
  p.textContent = text;
  return p;
}
