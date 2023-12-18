<template>
    <VBtn v-model="darkMode" :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" size="large" @click="toggleTheme"></VBtn>
</template>

<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
theme.global.name.value = "light";
const darkMode = ref(true);

const toggleTheme = () => {
  if (darkMode.value) {
    darkMode.value = false;
  } else {
    darkMode.value = true;
  }
  theme.global.name.value = !darkMode.value ? "dark" : "light";
};
</script>
