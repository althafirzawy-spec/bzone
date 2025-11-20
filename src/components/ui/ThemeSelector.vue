<template>
  <div class="theme-selector">
    <button 
      class="theme-selector-button" 
      @click="toggleDropdown"
      :aria-label="`Current theme: ${currentThemeName}`"
      :aria-expanded="isOpen"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 3a9 9 0 0 0-9 9c0 1.66.44 3.22 1.21 4.57L3 21l4.43-1.21A8.96 8.96 0 0 0 12 21a9 9 0 0 0 0-18zm0 16c-1.58 0-3.05-.47-4.28-1.27L4 19l1.27-3.72A7.96 7.96 0 0 1 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z"/>
        <circle cx="9" cy="12" r="1" fill="currentColor"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
        <circle cx="15" cy="12" r="1" fill="currentColor"/>
      </svg>
      <span class="theme-name">{{ currentThemeName }}</span>
      <svg 
        class="dropdown-arrow" 
        :class="{ 'is-open': isOpen }"
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M7 10l5 5 5-5z"/>
      </svg>
    </button>
    
    <transition name="dropdown">
      <div v-if="isOpen" class="theme-dropdown" ref="dropdown">
        <div class="theme-list">
          <button
            v-for="theme in availableThemes"
            :key="theme.id"
            class="theme-option"
            :class="{ 'is-active': colorTheme === theme.id }"
            @click="selectTheme(theme.id)"
          >
            <span class="theme-option-name">{{ theme.name }}</span>
            <span class="theme-option-desc">{{ theme.description }}</span>
            <svg 
              v-if="colorTheme === theme.id" 
              class="check-icon"
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useColorTheme, availableThemes } from '@/composables/useColorTheme.js';

const { colorTheme, setColorTheme } = useColorTheme();
const isOpen = ref(false);
const dropdown = ref(null);

const currentThemeName = computed(() => {
  const theme = availableThemes.find(t => t.id === colorTheme.value);
  return theme ? theme.name : 'Default';
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectTheme = (themeId) => {
  setColorTheme(themeId);
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target) && 
      !event.target.closest('.theme-selector-button')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.theme-selector {
  position: relative;
}

.theme-selector-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius, 4px);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.theme-selector-button:hover {
  background: var(--border-color);
  border-color: var(--primary-color);
}

.theme-selector-button svg:first-child {
  width: 18px;
  height: 18px;
  color: var(--primary-color);
}

.theme-name {
  font-weight: 500;
}

.dropdown-arrow {
  margin-left: auto;
  transition: transform 0.2s ease;
  color: var(--text-secondary);
}

.dropdown-arrow.is-open {
  transform: rotate(180deg);
}

.theme-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 220px;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius, 4px);
  box-shadow: 0 4px 12px var(--shadow-color);
  z-index: 1000;
  overflow: hidden;
}

.theme-list {
  max-height: 300px;
  overflow-y: auto;
}

.theme-option {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s ease;
  position: relative;
}

.theme-option:last-child {
  border-bottom: none;
}

.theme-option:hover {
  background: var(--border-color);
}

.theme-option.is-active {
  background: var(--primary-color-light);
  color: var(--primary-color);
}

.theme-option-name {
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.theme-option-desc {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.theme-option.is-active .theme-option-desc {
  color: var(--primary-color);
  opacity: 0.8;
}

.check-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-color);
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .theme-selector-button {
    padding: 0.5rem;
  }
  
  .theme-name {
    display: none;
  }
  
  .theme-dropdown {
    right: 0;
    left: auto;
    min-width: 200px;
  }
}
</style>

