// 主题管理器，用于处理深色/浅色模式切换

// 默认主题设置
const DEFAULT_THEME = {
  isDarkMode: false,
  colors: {
    light: {
      primary: '#ab5fff',
      background: 'rgba(255, 255, 255, 0.5)',
      text: '#333333',
      sidebar: 'rgba(255, 255, 255, 0.8)',
      card: 'rgba(255, 255, 255, 0.7)',
      blurBackground: 'rgba(255, 255, 255, 0.5)',
    },
    dark: {
      primary: '#c6acfc',
      background: 'rgba(20, 20, 30, 0.9)',
      text: '#f0f0f0',
      sidebar: 'rgba(30, 30, 40, 0.95)',
      card: 'rgba(40, 40, 50, 0.8)',
      blurBackground: 'rgba(20, 20, 30, 0.8)',
    }
  }
};

const THEME_STORAGE_KEY = 'ThemeSettings';

class ThemeManager {
  constructor() {
    this.themeSettings = DEFAULT_THEME;
  }

  // 初始化主题设置
  async initTheme() {
    const result = await this.getThemeFromStorage();
    if (result && result[THEME_STORAGE_KEY]) {
      this.themeSettings = { ...DEFAULT_THEME, ...result[THEME_STORAGE_KEY] };
    }
    return this.themeSettings;
  }

  // 从存储中获取主题设置
  getThemeFromStorage() {
    return new Promise((resolve) => {
      chrome.storage.local.get([THEME_STORAGE_KEY], (result) => {
        resolve(result);
      });
    });
  }

  // 保存主题设置到存储
  saveThemeToStorage(themeSettings) {
    this.themeSettings = themeSettings;
    return new Promise((resolve) => {
      chrome.storage.local.set({ [THEME_STORAGE_KEY]: themeSettings }, () => {
        resolve();
      });
    });
  }

  // 切换深色模式
  async toggleDarkMode() {
    const newThemeSettings = {
      ...this.themeSettings,
      isDarkMode: !this.themeSettings.isDarkMode
    };
    await this.saveThemeToStorage(newThemeSettings);
    return newThemeSettings;
  }

  // 获取当前主题颜色
  getCurrentColors() {
    const mode = this.themeSettings.isDarkMode ? 'dark' : 'light';
    return this.themeSettings.colors[mode];
  }

  // 获取当前主题设置
  getCurrentTheme() {
    return this.themeSettings;
  }
}

export default ThemeManager;