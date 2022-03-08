/* Constructs a URL search string from an object with key value pairs */
const buildParamString = params =>
        Object.entries(params)
                .map(([key, value]) => (Array.isArray(value) ? `${key}=${JSON.stringify(value)}` : `${key}=${value}`))
                .join("&");

let configPromise = null;

export const getConfig = () => {
  if (!configPromise) {
    configPromise = fetch('/composite/em/config.json')
      .then((response) => response.json())
      .catch(() => {
        console.warn('Failed to load config.json, falling back to dev defaults');
        return {
          serviceApiUrl: 'https://orc-dev-ocs-cm.develop.orckestra.cloud:443/api',
        };
      });
  }
  return configPromise;
};


export const buildUrl = (pathParts = [], parameters) =>
                               getConfig().then(config => `${config.serviceApiUrl}/${pathParts.join("/")}` + (parameters ? "?" + buildParamString(parameters) : ""));