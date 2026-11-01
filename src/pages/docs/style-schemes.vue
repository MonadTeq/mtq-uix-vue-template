<script lang="ts" setup>
import { useTheme } from "@/features/theme"
import { Button, Card } from "@/shared/ui"

const { themeList, activeThemeName, setTheme } = useTheme()

const schemes = [
  {
    name: "normal",
    title: "Normal",
    description: "Light scheme — blue primary on white surfaces."
  },
  {
    name: "dark",
    title: "Dark",
    description: "Dark neutral scheme — blue primary on near-black surfaces."
  },
  {
    name: "dark-blue",
    title: "Deep Blue",
    description: "Navy scheme — teal primary on deep-blue surfaces."
  },
  {
    name: "dracula",
    title: "Dracula",
    description: "Deep violet-gray with neon pink/green/cyan accents."
  },
  {
    name: "nord",
    title: "Nord",
    description: "Arctic, muted blue-gray palette."
  },
  {
    name: "solarized-dark",
    title: "Solarized Dark",
    description: "Dark teal background with warm/cool dual accents."
  },
  {
    name: "solarized-light",
    title: "Solarized Light",
    description: "Cream background with the Solarized accent set."
  },
  {
    name: "one-dark",
    title: "One Dark",
    description: "Balanced, muted cool-gray with soft accents."
  },
  {
    name: "gruvbox",
    title: "Gruvbox",
    description: "Warm, earthy retro palette."
  },
  {
    name: "catppuccin-mocha",
    title: "Catppuccin Mocha",
    description: "Pastel, cozy dark scheme."
  },
  {
    name: "catppuccin-latte",
    title: "Catppuccin Latte",
    description: "Pastel, cozy light scheme."
  },
  {
    name: "tokyo-night",
    title: "Tokyo Night",
    description: "Deep indigo background with bright, harmonious accents."
  }
]
</script>

<template>
  <div class="app-container">
    <h1>Style Schemes</h1>
    <p class="lead">
      Schemes are defined in <code>app/styles/themes/</code>, one
      <code>[data-theme="…"]</code> block per scheme. Switching toggles the
      <code>data-theme</code> attribute on the root element.
    </p>

    <Card title="Switch scheme" class="section">
      <div class="row">
        <Button
          v-for="theme in themeList"
          :key="theme.name"
          :variant="activeThemeName === theme.name ? 'primary' : 'secondary'"
          @click="(e) => setTheme(e, theme.name)"
        >
          {{ theme.title }}
        </Button>
      </div>
      <p class="hint">Current scheme: <code>{{ activeThemeName }}</code></p>
    </Card>

    <Card title="Schemes" class="section">
      <div class="cards">
        <div v-for="scheme in schemes" :key="scheme.name" class="scheme-card">
          <h3>{{ scheme.title }}</h3>
          <p class="scheme-card__desc">{{ scheme.description }}</p>
          <div class="swatches">
            <span class="swatch swatch--surface" />
            <span class="swatch swatch--action" />
            <span class="swatch swatch--text" />
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.lead {
  color: var(--color-text-regular);
  margin-bottom: var(--space-5);
}

.section {
  margin-bottom: var(--space-5);
}

.row {
  display: flex;
  gap: var(--space-2);
}

.hint {
  margin-top: var(--space-3);
  color: var(--color-text-secondary);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-4);
}

.scheme-card {
  padding: var(--space-4);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-default);
}

.scheme-card__desc {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.swatches {
  display: flex;
  gap: var(--space-2);
}

.swatch {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-default);
}

.swatch--surface {
  background-color: var(--color-surface-default);
}

.swatch--action {
  background-color: var(--color-action-primary);
}

.swatch--text {
  background-color: var(--color-text-primary);
}
</style>
