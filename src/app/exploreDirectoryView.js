import { EXPLORE_CATEGORIES, EXPLORE_NEEDS, EXPLORE_RESOURCES, HOME_FEATURED_FILTERS } from '../data/exploreDirectory.js';
import { fetchDirectoryResources } from '../data/contentRepository.js';
import { goTo } from './navigation.js';

let activeCategory = 'all';
let activeQuery = '';
let activeHomeFeaturedCategory = 'all';
let directoryResources = EXPLORE_RESOURCES;
let hasRequestedRemoteResources = false;
let activeDetailResourceId = '';
const fallbackResourceMap = new Map(EXPLORE_RESOURCES.map((resource) => [resource.id, resource]));

function getLocalImageFallbackSources(resourceId, options = {}) {
  const fallback = fallbackResourceMap.get(resourceId);

  if (!fallback) {
    return [];
  }

  const includeCardImage = options.includeCardImage !== false;
  const includeGallery = options.includeGallery !== false;
  const preferredGalleryIndex = Number.isInteger(options.preferredGalleryIndex) ? options.preferredGalleryIndex : null;
  const sources = [];

  if (includeCardImage && fallback.cardImage) {
    sources.push(fallback.cardImage);
  }

  if (includeGallery && Array.isArray(fallback.gallery) && fallback.gallery.length > 0) {
    if (preferredGalleryIndex !== null && fallback.gallery[preferredGalleryIndex]?.src) {
      sources.push(fallback.gallery[preferredGalleryIndex].src);
    }

    fallback.gallery.forEach((item, index) => {
      if (index !== preferredGalleryIndex && item?.src) {
        sources.push(item.src);
      }
    });
  }

  return [...new Set(sources)];
}

function attachImageFallback(img, fallbackSources) {
  const baseHref = globalThis.location?.href || 'http://localhost/';
  const toAbsoluteSource = (value) => {
    try {
      return new URL(value, baseHref).href;
    } catch {
      return value;
    }
  };

  const seen = new Set();
  const sources = fallbackSources
    .filter((src) => typeof src === 'string' && src.trim() !== '')
    .filter((src) => {
      const absolute = toAbsoluteSource(src);
      if (seen.has(absolute)) {
        return false;
      }
      seen.add(absolute);
      return true;
    });

  if (sources.length === 0) {
    return;
  }

  let nextSourceIndex = 0;
  const currentAbsoluteSource = () => toAbsoluteSource(img.currentSrc || img.src || '');

  img.addEventListener('error', function handleError() {
    while (nextSourceIndex < sources.length && toAbsoluteSource(sources[nextSourceIndex]) === currentAbsoluteSource()) {
      nextSourceIndex += 1;
    }

    if (nextSourceIndex >= sources.length) {
      img.removeEventListener('error', handleError);
      return;
    }

    img.src = sources[nextSourceIndex];
    nextSourceIndex += 1;
  });
}

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

function createListingBadge(label) {
  const element = document.createElement('span');
  element.className = 'listing-card__badge-pill';
  element.textContent = label;
  return element;
}

function createListingCard(resource, options = {}) {
  const context = options.context || 'directory';
  const article = document.createElement('article');
  article.className = `listing-card listing-card--${context}`;
  article.dataset.resourceId = resource.id;

  const media = document.createElement('div');
  media.className = 'listing-card__media';

  const image = document.createElement('img');
  image.className = 'listing-card__image';
  const fallbackSources = getLocalImageFallbackSources(resource.id);
  image.src = resource.cardImage || resource.gallery?.[0]?.src || fallbackSources[0] || '';
  image.alt = resource.name;
  image.loading = context === 'featured' ? 'eager' : 'lazy';
  image.decoding = 'async';
  image.fetchPriority = context === 'featured' ? 'high' : 'low';
  attachImageFallback(image, fallbackSources);
  media.append(image);

  const content = document.createElement('div');
  content.className = 'listing-card__content';

  const header = document.createElement('div');
  header.className = 'listing-card__header';

  const headingGroup = document.createElement('div');
  headingGroup.className = 'listing-card__heading-group';

  const title = document.createElement('h3');
  title.className = 'listing-card__title';
  title.textContent = resource.name;

  const subtitle = document.createElement('p');
  subtitle.className = 'listing-card__subtitle';
  subtitle.textContent = resource.cardType || resource.tags?.[0] || resource.resourceType || '';

  headingGroup.append(title, subtitle);

  const location = document.createElement('p');
  location.className = 'listing-card__location';
  location.appendChild(createIcon('tabler:map-pin'));
  location.append(resource.cardLocation || resource.location);

  header.append(headingGroup, location);

  const divider = document.createElement('span');
  divider.className = 'listing-card__divider';
  divider.setAttribute('aria-hidden', 'true');

  const description = document.createElement('p');
  description.className = 'listing-card__description';
  description.textContent = resource.cardDescription || resource.summary;

  const footer = document.createElement('div');
  footer.className = 'listing-card__footer';

  const badges = document.createElement('div');
  badges.className = 'listing-card__badges';
  (resource.cardBadges || []).forEach((badge) => {
    badges.appendChild(createListingBadge(badge));
  });

  const action = document.createElement('span');
  action.className = 'listing-card__action';
  action.textContent = 'View Profile';
  action.appendChild(document.createTextNode(' '));
  action.appendChild(createIcon('tabler:arrow-right'));

  const hitArea = document.createElement('button');
  hitArea.type = 'button';
  hitArea.className = 'listing-card__hit-area';
  hitArea.dataset.action = 'view-resource';
  hitArea.dataset.resourceId = resource.id;
  hitArea.setAttribute('aria-label', `View profile for ${resource.name}`);

  footer.append(badges, action);
  content.append(header, divider, description, footer);
  article.append(media, content, hitArea);
  return article;
}

function renderMissingResourceDetail(resourceId) {
  const root = document.getElementById('explore-detail');

  if (!root) {
    return;
  }

  root.textContent = '';

  const section = document.createElement('section');
  section.className = 'explore-detail-section explore-detail-section--card';

  const heading = document.createElement('h1');
  heading.className = 'explore-detail-title';
  heading.textContent = 'Resource not found';

  const copy = document.createElement('p');
  copy.className = 'explore-detail-summary';
  copy.textContent = resourceId
    ? 'This listing is not available yet. Return to Explore to view the current directory.'
    : 'Choose a resource from Explore to view its profile.';

  section.append(heading, copy);
  root.appendChild(section);
}

function createHomeFeaturedFilterButton(filter) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'home-featured__pill';
  button.dataset.action = 'filter-home-featured';
  button.dataset.category = filter.id;
  button.setAttribute('aria-pressed', String(filter.id === activeHomeFeaturedCategory));
  button.textContent = filter.label;
  return button;
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
    attachImageFallback(
      img,
      getLocalImageFallbackSources(resource.id, { includeCardImage: false, preferredGalleryIndex: index })
    );

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

  const resources = directoryResources.filter((resource) => matchesCategory(resource) && matchesQuery(resource));
  root.textContent = '';
  resources.forEach((resource) => {
    root.appendChild(createListingCard(resource, { context: 'featured' }));
  });

  empty.hidden = resources.length > 0;
}

function renderHomeFeaturedFilters() {
  const root = document.getElementById('home-featured-filters');

  if (!root) {
    return;
  }

  root.textContent = '';
  HOME_FEATURED_FILTERS.forEach((filter) => {
    root.appendChild(createHomeFeaturedFilterButton(filter));
  });
}

function renderHomeFeaturedCards() {
  const root = document.getElementById('home-featured-cards');

  if (!root) {
    return;
  }

  const featuredResources = directoryResources
    .filter((resource) => resource.featured)
    .filter((resource) => activeHomeFeaturedCategory === 'all' || resource.categories.includes(activeHomeFeaturedCategory))
    .sort((a, b) => (a.featuredRank || 999) - (b.featuredRank || 999))
    .slice(0, 3);

  root.textContent = '';

  featuredResources.forEach((resource) => {
    root.appendChild(createListingCard(resource, { context: 'featured' }));
  });

  if (featuredResources.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'home-featured__empty';
    empty.textContent = 'No featured listings in this category yet.';
    root.appendChild(empty);
  }
}

export function filterExplore(category) {
  activeCategory = category || 'all';
  renderExploreCategories();
  renderExploreResources();
}

export function filterHomeFeatured(category) {
  activeHomeFeaturedCategory = category || 'all';
  renderHomeFeaturedFilters();
  renderHomeFeaturedCards();
}

export function searchExplore(query) {
  activeQuery = query || '';
  renderExploreResources();
}

export function renderExploreDirectory() {
  renderExploreCategories();
  renderExploreNeeds();
  renderExploreResources();
  renderHomeFeaturedFilters();
  renderHomeFeaturedCards();

  if (!hasRequestedRemoteResources) {
    hasRequestedRemoteResources = true;
    void fetchDirectoryResources().then((resources) => {
      directoryResources = resources;
      renderExploreResources();
      renderHomeFeaturedCards();
      if (activeDetailResourceId) {
        renderResourceDetailById(activeDetailResourceId);
      }
    });
  }
}

export function renderResourceDetailById(resourceId) {
  activeDetailResourceId = resourceId || '';
  const resource = directoryResources.find((entry) => entry.id === resourceId);

  if (!resource) {
    renderMissingResourceDetail(resourceId);
    return;
  }

  renderResourceDetail(resource);
}

export function viewResource(resourceId) {
  if (!resourceId) {
    return;
  }

  renderResourceDetailById(resourceId);
  goTo('s-explore-detail');
}
