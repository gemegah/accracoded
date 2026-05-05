import { EXPLORE_CATEGORIES, EXPLORE_NEEDS, EXPLORE_RESOURCES } from '../data/exploreDirectory.js';
import { goTo } from './navigation.js';

let activeCategory = 'all';
let activeQuery = '';

function matchesCategory(resource) {
  return activeCategory === 'all' || resource.categories.includes(activeCategory);
}

function matchesQuery(resource) {
  const query = activeQuery.trim().toLowerCase();

  if (!query) {
    return true;
  }

  return [
    resource.name,
    resource.location,
    resource.summary,
    ...resource.tags
  ].some((value) => value.toLowerCase().includes(query));
}

function createIcon(icon) {
  const element = document.createElement('iconify-icon');
  element.setAttribute('icon', icon);
  element.setAttribute('aria-hidden', 'true');
  return element;
}

function createCategoryButton(category) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'explore-chip';
  button.dataset.action = 'filter-explore';
  button.dataset.category = category.id;
  button.setAttribute('aria-pressed', String(category.id === activeCategory));

  button.appendChild(createIcon(category.icon));
  button.append(category.label);
  return button;
}

function createNeedButton(need) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'need-tile';
  button.dataset.action = 'filter-explore';
  button.dataset.category = need.category === 'urgent' ? 'mental-health' : need.category;

  const icon = document.createElement('span');
  icon.className = 'need-tile__icon';
  icon.appendChild(createIcon(need.icon));

  const label = document.createElement('span');
  label.className = 'need-tile__label';
  label.textContent = need.label;

  button.append(icon, label);
  return button;
}

function createTag(tag) {
  const element = document.createElement('span');
  element.className = 'explore-tag';
  element.textContent = tag;
  return element;
}

function createResourceCard(resource) {
  const article = document.createElement('article');
  article.className = 'explore-resource';

  const logo = document.createElement('div');
  logo.className = 'explore-resource__logo';
  logo.textContent = resource.logoText;
  logo.setAttribute('aria-hidden', 'true');

  const body = document.createElement('div');
  body.className = 'explore-resource__body';

  const title = document.createElement('h3');
  title.className = 'explore-resource__title';
  title.textContent = resource.name;

  const tags = document.createElement('div');
  tags.className = 'explore-resource__tags';
  resource.tags.forEach((tag) => {
    tags.appendChild(createTag(tag));
  });

  const summary = document.createElement('p');
  summary.className = 'explore-resource__summary';
  summary.textContent = resource.summary;

  const location = document.createElement('p');
  location.className = 'explore-resource__location';
  location.appendChild(createIcon('tabler:map-pin'));
  location.append(resource.location);

  body.append(title, tags, summary, location);

  const action = document.createElement('button');
  action.className = 'explore-resource__action';
  action.type = 'button';
  action.dataset.action = 'view-resource';
  action.dataset.resourceId = resource.id;
  action.textContent = resource.actionLabel;

  article.append(logo, body, action);
  return article;
}

function createDetailTag(tag) {
  const element = document.createElement('span');
  element.className = 'explore-detail-tag';
  element.textContent = tag;
  return element;
}

function createDetailGallery(resource) {
  const gallery = document.createElement('section');
  gallery.className = 'explore-detail-gallery';
  gallery.setAttribute('aria-label', `${resource.name} gallery`);

  if (!resource.gallery || resource.gallery.length === 0) {
    gallery.classList.add('explore-detail-gallery--fallback');

    const fallback = document.createElement('div');
    fallback.className = 'explore-detail-gallery__fallback';

    const mark = document.createElement('div');
    mark.className = 'explore-detail-gallery__mark';
    mark.textContent = resource.logoText;
    mark.setAttribute('aria-hidden', 'true');

    const copy = document.createElement('div');
    copy.className = 'explore-detail-gallery__copy';

    const title = document.createElement('p');
    title.className = 'explore-detail-gallery__title';
    title.textContent = resource.name;

    copy.append(title);
    fallback.append(mark, copy);
    gallery.appendChild(fallback);
    return gallery;
  }

  gallery.classList.add('explore-detail-gallery--carousel');

  if (resource.gallery.length === 1) {
    gallery.classList.add('is-single');
  }

  resource.gallery.slice(0, 3).forEach((image, index) => {
    const figure = document.createElement('figure');
    figure.className = 'explore-detail-gallery__item';

    const img = document.createElement('img');
    img.className = 'explore-detail-gallery__image';
    img.src = image.src;
    img.alt = image.alt || resource.name;
    img.loading = index === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.fetchPriority = index === 0 ? 'high' : 'low';
    img.width = image.width || 960;
    img.height = image.height || 720;

    figure.appendChild(img);
    gallery.appendChild(figure);
  });

  return gallery;
}

function createDetailList(items) {
  const list = document.createElement('div');
  list.className = 'explore-detail-list';

  items.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'explore-detail-list__item';
    row.appendChild(createIcon('tabler:check'));

    const label = document.createElement('span');
    label.textContent = item;
    row.appendChild(label);
    list.appendChild(row);
  });

  return list;
}

function createDetailAction(resource) {
  if (!resource.contactHref) {
    return null;
  }

  const isInternal = resource.contactHref.startsWith('#s-');
  const action = isInternal ? document.createElement('button') : document.createElement('a');
  action.className = 'explore-detail-action';
  action.appendChild(createIcon(isInternal ? 'tabler:arrow-right' : 'tabler:external-link'));
  action.append(resource.contactLabel || 'Open');

  if (isInternal) {
    action.type = 'button';
    action.dataset.action = 'go-to';
    action.dataset.target = resource.contactHref.slice(1);
  } else {
    action.href = resource.contactHref;

    if (resource.contactHref.startsWith('http')) {
      action.target = '_blank';
      action.rel = 'noopener noreferrer';
    }
  }

  return action;
}

function createDetailSection(title, content, options = {}) {
  const section = document.createElement('section');
  section.className = 'explore-detail-section';

  if (options.card) {
    section.classList.add('explore-detail-section--card');
  }

  const heading = document.createElement('h2');
  heading.className = 'explore-detail-section__title';
  heading.textContent = title;

  section.appendChild(heading);
  section.appendChild(content);
  return section;
}

function renderResourceDetail(resource) {
  const root = document.getElementById('explore-detail');

  if (!root) {
    return;
  }

  root.textContent = '';

  const hero = document.createElement('section');
  hero.className = 'explore-detail-hero';

  const title = document.createElement('h1');
  title.className = 'explore-detail-title';
  title.textContent = resource.name;

  const meta = document.createElement('p');
  meta.className = 'explore-detail-location';
  meta.appendChild(createIcon('tabler:map-pin'));
  meta.append(resource.location);

  const tags = document.createElement('div');
  tags.className = 'explore-detail-tags';
  resource.tags.forEach((tag) => {
    tags.appendChild(createDetailTag(tag));
  });

  const description = document.createElement('p');
  description.className = 'explore-detail-summary';
  description.textContent = resource.description || resource.summary;

  hero.append(title, meta, tags, description);

  const about = document.createElement('div');
  about.className = 'explore-detail-copy';
  (resource.about || [resource.description || resource.summary]).forEach((line) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = line;
    about.appendChild(paragraph);
  });

  const actions = document.createElement('div');
  actions.className = 'explore-detail-actions';
  const primaryAction = createDetailAction(resource);
  if (primaryAction) {
    actions.appendChild(primaryAction);
  }

  if (resource.mapHref) {
    const map = document.createElement('a');
    map.className = 'explore-detail-action explore-detail-action--secondary';
    map.href = resource.mapHref;
    map.target = '_blank';
    map.rel = 'noopener noreferrer';
    map.appendChild(createIcon('tabler:map-2'));
    map.append('Get directions');
    actions.appendChild(map);
  }

  if (resource.email) {
    const email = document.createElement('a');
    email.className = 'explore-detail-action explore-detail-action--secondary';
    email.href = `mailto:${resource.email}`;
    email.appendChild(createIcon('tabler:mail'));
    email.append('Email');
    actions.appendChild(email);
  }

  root.append(
    createDetailGallery(resource),
    hero,
    createDetailSection('About', about)
  );

  if (resource.services && resource.services.length > 0) {
    root.append(createDetailSection('Services', createDetailList(resource.services), { card: true }));
  }

  if (actions.childElementCount > 0) {
    root.append(actions);
  }
}

function renderExploreCategories() {
  const root = document.getElementById('explore-categories');

  if (!root) {
    return;
  }

  root.textContent = '';
  EXPLORE_CATEGORIES.forEach((category) => {
    root.appendChild(createCategoryButton(category));
  });
}

function renderExploreNeeds() {
  const root = document.getElementById('explore-needs');

  if (!root) {
    return;
  }

  root.textContent = '';
  EXPLORE_NEEDS.forEach((need) => {
    root.appendChild(createNeedButton(need));
  });
}

function renderExploreResources() {
  const root = document.getElementById('explore-resources');
  const empty = document.getElementById('explore-empty');

  if (!root || !empty) {
    return;
  }

  const resources = EXPLORE_RESOURCES.filter((resource) => matchesCategory(resource) && matchesQuery(resource));
  root.textContent = '';
  resources.forEach((resource) => {
    root.appendChild(createResourceCard(resource));
  });

  empty.hidden = resources.length > 0;
}

export function filterExplore(category) {
  activeCategory = category || 'all';
  renderExploreCategories();
  renderExploreResources();
}

export function searchExplore(query) {
  activeQuery = query || '';
  renderExploreResources();
}

export function renderExploreDirectory() {
  renderExploreCategories();
  renderExploreNeeds();
  renderExploreResources();
}

export function viewResource(resourceId) {
  const resource = EXPLORE_RESOURCES.find((entry) => entry.id === resourceId);

  if (!resource) {
    return;
  }

  renderResourceDetail(resource);
  goTo('s-explore-detail');
}
