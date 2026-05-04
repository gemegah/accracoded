import { getCrisisEntries, getResourcesByGroup } from '../data/supportDirectory.js';
import { createButton, createHeading, createParagraph } from '../ui/primitives.js';

function createContactButton(contact) {
  if (contact.kind === 'phone') {
    return createButton({
      label: contact.label,
      variant: contact.variant || 'primary',
      href: `tel:${contact.value}`
    });
  }

  const button = createButton({
    label: contact.label,
    variant: contact.variant || 'primary',
    href: contact.href || '#'
  });

  if (contact.kind === 'link') {
    button.setAttribute('target', '_blank');
    button.setAttribute('rel', 'noopener noreferrer');
  }

  return button;
}

function createResourceCard(entry) {
  const card = document.createElement('article');
  card.className = 'c-list-item';

  card.appendChild(createHeading('h3', 'resource-name', entry.name));
  card.appendChild(createParagraph('resource-desc', entry.summary));
  card.appendChild(createParagraph('resource-meta', `${entry.offerings} | Coverage: ${entry.coverage}`));

  const row = document.createElement('div');
  row.className = 'resource-row';

  entry.contacts.forEach((contact) => {
    row.appendChild(createContactButton(contact));
  });

  card.appendChild(row);
  return card;
}

function renderResourcesDirectory() {
  const root = document.getElementById('resources-directory');
  if (!root) {
    return;
  }

  root.textContent = '';
  const groups = getResourcesByGroup();
  const fragment = document.createDocumentFragment();

  groups.forEach((group) => {
    const wrapper = document.createElement('section');
    wrapper.className = 'resource-group';

    wrapper.appendChild(createHeading('h3', 'resource-group__title', group.title));
    wrapper.appendChild(createParagraph('resource-group__intro', group.description));

    const list = document.createElement('div');
    list.className = 'resource-group__list';
    group.entries.forEach((entry) => {
      list.appendChild(createResourceCard(entry));
    });

    wrapper.appendChild(list);
    fragment.appendChild(wrapper);
  });

  root.appendChild(fragment);
}

function renderCrisisDirectory() {
  const root = document.getElementById('crisis-directory');
  if (!root) {
    return;
  }

  root.textContent = '';
  const entries = getCrisisEntries();
  const fragment = document.createDocumentFragment();

  entries.forEach((entry) => {
    const item = document.createElement('article');
    item.className = 'dialog-item';

    item.appendChild(createHeading('h3', 'dialog-item__title', entry.name));
    item.appendChild(createParagraph('dialog-item__meta', `${entry.offerings} | ${entry.coverage}`));

    entry.contacts
      .filter((contact) => contact.kind === 'phone')
      .forEach((contact) => {
        item.appendChild(createContactButton(contact));
      });

    fragment.appendChild(item);
  });

  root.appendChild(fragment);
}

export function renderSupportDirectory() {
  renderResourcesDirectory();
  renderCrisisDirectory();
}
