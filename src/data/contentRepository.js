import { getJson } from '../lib/apiClient.js';
import { EXPLORE_RESOURCES } from './exploreDirectory.js';
import { FALLBACK_HOME_CATEGORY_METRICS } from './homeCategories';

const fallbackResourceMap = new Map(EXPLORE_RESOURCES.map((resource) => [resource.id, resource]));

function sortedMetrics(metrics) {
  return [...metrics]
    .filter((item) => item.enabled !== false)
    .sort((a, b) => Number(a.sortOrder || 999) - Number(b.sortOrder || 999));
}

function isBrokenLocalAssetReference(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return true;
  }

  return (
    value.startsWith('file:') ||
    value.includes('localhost') ||
    value.includes('127.0.0.1') ||
    value.includes('/src/assets/') ||
    value.startsWith('../assets/') ||
    value.startsWith('./assets/')
  );
}

function withProductionAssetFallback(resource) {
  const fallback = fallbackResourceMap.get(resource.id);

  if (!fallback) {
    return resource;
  }

  const nextResource = {
    ...resource,
    cardImage: isBrokenLocalAssetReference(resource.cardImage) ? fallback.cardImage : resource.cardImage
  };

  const gallery = Array.isArray(resource.gallery) ? resource.gallery : [];
  const hasBrokenGallery = gallery.some((item) => isBrokenLocalAssetReference(item?.src));

  if (gallery.length === 0 || hasBrokenGallery) {
    nextResource.gallery = fallback.gallery || [];
  }

  return nextResource;
}

export async function fetchHomeCategoryMetrics() {
  try {
    const response = await getJson('/home-metrics');
    const metrics = Array.isArray(response?.metrics) ? response.metrics : [];
    return metrics.length ? sortedMetrics(metrics) : FALLBACK_HOME_CATEGORY_METRICS;
  } catch {
    return FALLBACK_HOME_CATEGORY_METRICS;
  }
}

export async function fetchDirectoryResources() {
  try {
    const response = await getJson('/directory-resources');
    const resources = Array.isArray(response?.resources) ? response.resources : [];
    return resources.length ? resources.map(withProductionAssetFallback) : EXPLORE_RESOURCES;
  } catch {
    return EXPLORE_RESOURCES;
  }
}
