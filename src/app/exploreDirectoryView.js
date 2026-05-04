import { EXPLORE_CATEGORIES, EXPLORE_NEEDS, EXPLORE_RESOURCES } from '../data/exploreDirectory.js';

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

  const action = resource.href.startsWith('#s-') ? document.createElement('button') : document.createElement('a');
  action.className = 'explore-resource__action';
  action.textContent = resource.actionLabel;

  if (resource.href.startsWith('#s-')) {
    action.type = 'button';
    action.dataset.action = 'go-to';
    action.dataset.target = resource.href.slice(1);
  } else {
    action.href = resource.href;
  }

  if (resource.href.startsWith('http')) {
    action.target = '_blank';
    action.rel = 'noopener noreferrer';
  }

  article.append(logo, body, action);
  return article;
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
