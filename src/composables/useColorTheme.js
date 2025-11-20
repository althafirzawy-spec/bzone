import { ref, onMounted } from 'vue';

// Daftar theme yang tersedia
export const availableThemes = [
  { id: 'default', name: 'Default', description: 'Green theme' },
  { id: 'midnight', name: 'Midnight', description: 'Dark blue theme' },
  { id: 'windy', name: 'Windy', description: 'Light blue theme' },
  { id: 'spiel', name: 'Spiel', description: 'Dark minimal theme' },
  { id: 'ocean', name: 'Ocean', description: 'Ocean blue theme' },
  { id: 'forest', name: 'Forest', description: 'Green nature theme' },
  { id: 'sunset', name: 'Sunset', description: 'Orange sunset theme' },
  { id: 'purple', name: 'Purple', description: 'Purple theme' },
];

const colorTheme = ref('default');
let themeLinkElement = null;

export function useColorTheme() {
  const loadThemeCSS = (themeId) => {
    if (typeof window === 'undefined') return;
    
    // Remove existing theme link if any
    if (themeLinkElement) {
      themeLinkElement.remove();
      themeLinkElement = null;
    }
    
    // Skip loading CSS for default theme (uses main.css)
    if (themeId === 'default') {
      return;
    }
    
    // Create and load theme CSS
    themeLinkElement = document.createElement('link');
    themeLinkElement.rel = 'stylesheet';
    themeLinkElement.href = `/src/assets/themes/${themeId}.css`;
    themeLinkElement.id = 'color-theme-stylesheet';
    document.head.appendChild(themeLinkElement);
  };

  const setColorTheme = (themeId) => {
    if (!availableThemes.find(t => t.id === themeId)) {
      console.warn(`Theme "${themeId}" not found, using default`);
      themeId = 'default';
    }
    
    colorTheme.value = themeId;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('colorTheme', themeId);
      loadThemeCSS(themeId);
      
      // Update body class for theme-specific styling
      document.body.className = document.body.className
        .replace(/\btheme-\w+/g, '')
        .trim();
      document.body.classList.add(`theme-${themeId}`);
    }
  };

  onMounted(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('colorTheme');
      if (savedTheme && availableThemes.find(t => t.id === savedTheme)) {
        setColorTheme(savedTheme);
      } else {
        setColorTheme('default');
      }
    }
  });

  return {
    colorTheme,
    setColorTheme,
    availableThemes,
  };
}

