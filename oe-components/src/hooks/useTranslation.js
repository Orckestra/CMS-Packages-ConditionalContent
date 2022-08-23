export const LOCALIZATION_DEFAULT_PROVIDER = 'Orckestra.Tools.ConditionalContent';

export function useTranslation() {
  const t = (string, ...args) => {
    var result = null;
    var provider = null;
    var key = string;
    if (key.indexOf(':') > -1) {
      provider = key.split(':')[0];
      key = key.split(':')[1];
    }
    // eslint-disable-next-line no-restricted-globals
    if (top.Application) {
      provider = provider || LOCALIZATION_DEFAULT_PROVIDER;
      // eslint-disable-next-line no-restricted-globals
      result = top.StringBundle.getString(provider, key) || key;
    }
    result = result || key;
    for (var i = 0; i < args.length; i++) {
      result = result.replace(`{${i}}`, args[i]);
    }
    return result;
  };
  return { t };
}
