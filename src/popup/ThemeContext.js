import React, { createContext, useState, useEffect, useContext } from 'react';
import ThemeManager from '../utils/ThemeManager';

// 创建主题上下文
const ThemeContext = createContext();

// 主题提供者组件
export const ThemeProvider = ({ children }) => {
  const [themeSettings, setThemeSettings] = useState(null);
  const [themeManager, setThemeManager] = useState(null);

  useEffect(() => {
    // 初始化主题管理器
    const manager = new ThemeManager();
    setThemeManager(manager);
    
    // 加载存储的主题设置
    const initTheme = async () => {
      const settings = await manager.initTheme();
      setThemeSettings(settings);
      
      // 应用主题到DOM
      applyThemeToDOM(settings);
    };
    
    initTheme();
  }, []);

  // 切换深色模式
  const toggleDarkMode = async () => {
    if (!themeManager) return;
    
    const newSettings = await themeManager.toggleDarkMode();
    setThemeSettings(newSettings);
    applyThemeToDOM(newSettings);
  };

  // 获取当前颜色
  const getCurrentColors = () => {
    if (!themeManager) return null;
    return themeManager.getCurrentColors();
  };

  // 应用主题到DOM
  const applyThemeToDOM = (settings) => {
    const root = document.documentElement;
    
    // 设置CSS变量
    root.style.setProperty('--is-dark-mode', settings.isDarkMode ? 'true' : 'false');
    
    const colors = settings.colors[settings.isDarkMode ? 'dark' : 'light'];
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
    
    // 添加或移除dark-mode类
    if (settings.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const contextValue = {
    themeSettings,
    toggleDarkMode,
    getCurrentColors,
    isDarkMode: themeSettings?.isDarkMode || false
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// 自定义Hook，便于组件使用主题

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;