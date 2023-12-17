import { writable, type Updater } from "svelte/store";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

function createThemeStore() {
  const theme = writable<Theme>(document.documentElement.classList.contains(Theme.DARK) ? Theme.DARK : Theme.LIGHT);

  const updateClass = (theme: Theme) => {
    const classList = document.documentElement.classList;

    if (theme == "dark") {
      if (!classList.contains(Theme.DARK)) {
        classList.add(Theme.DARK);
      }
    } else {
      if (classList.contains(Theme.DARK)) {
        classList.remove(Theme.DARK);
      }
    }
  };

  const update = (updater: Updater<Theme>) => {
    theme.update((theme) => {
      const newTheme = updater(theme);
      updateClass(newTheme);
      return newTheme;
    });
  };

  const set = (newTheme: Theme) => {
    updateClass(newTheme);
    theme.set(newTheme);
  };

  return {
    subscribe: theme.subscribe,
    update,
    set,
    toggle: () => update((theme) => (theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)),
  };
}

export const theme = createThemeStore();
