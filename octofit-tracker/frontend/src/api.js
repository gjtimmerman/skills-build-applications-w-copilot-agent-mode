const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

const codespacesApiBaseUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`;
const localApiBaseUrl = 'http://localhost:8000/api';

export const apiBaseUrl = codespaceName ? codespacesApiBaseUrl : localApiBaseUrl;

export function getApiUrl(component) {
  return `${apiBaseUrl}/${component}/`;
}

export function getCollectionItems(responseBody) {
  if (Array.isArray(responseBody)) {
    return responseBody;
  }

  if (Array.isArray(responseBody?.results)) {
    return responseBody.results;
  }

  if (Array.isArray(responseBody?.data)) {
    return responseBody.data;
  }

  if (Array.isArray(responseBody?.items)) {
    return responseBody.items;
  }

  if (Array.isArray(responseBody?.docs)) {
    return responseBody.docs;
  }

  return [];
}