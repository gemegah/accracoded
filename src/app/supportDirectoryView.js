import { getCrisisEntries, getResourcesByGroup } from '../data/supportDirectory.js';

function createButton(contact) {
  const button = document.createElement('a');
  const variant = contact.variant || 'primary';
  button.className = `c-button c-button--${variant}`;
  button.textContent = contact.label;

  if (contact.kind === 'phone') {
    button.href = `tel:${contact.value}`;
    return button;
  }

  button.href = contact.href || '#';
  if (contact.kind === 'link') {
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
  }

  return button;
}

function createResourceCard(entry) {
  const card = document.createElement('article');
  card.className = 'c-list-item';

  const title = document.createElement('h3');
  title.className = 'resource-name';
  title.textContent = entry.name;
  card.appendChild(title);

  const description = document.createElement('p');
  description.className = 'resource-desc';
  description.textContent = entry.summary;
  card.appendChild(description);

  const meta = document.createElement('p');
  meta.className = 'resource-meta';
  meta.textContent = `${entry.offerings} | Coverage: ${entry.coverage}`;
  card.appendChild(meta);

  const row = document.createElement('div');
  row.className = 'resource-row';

  entry.contacts.forEach((contact) => {
    row.appendChild(createButton(contact));
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

    const heading = document.createElement('h3');
    heading.className = 'resource-group__title';
    heading.textContent = group.title;
    wrapper.appendChild(heading);

    const intro = document.createElement('p');
    intro.className = 'resource-group__intro';
    intro.textContent = group.description;
    wrapper.appendChild(intro);

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

    const title = document.createElement('h3');
    title.className = 'dialog-item__title';
    title.textContent = entry.name;
    item.appendChild(title);

    const meta = document.createElement('p');
    meta.className = 'dialog-item__meta';
    meta.textContent = `${entry.offerings} | ${entry.coverage}`;
    item.appendChild(meta);

    entry.contacts
      .filter((contact) => contact.kind === 'phone')
      .forEach((contact) => {
        item.appendChild(createButton(contact));
      });

    fragment.appendChild(item);
  });

  root.appendChild(fragment);
}

export function renderSupportDirectory() {
  renderResourcesDirectory();
  renderCrisisDirectory();
}
