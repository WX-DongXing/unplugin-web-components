<script setup lang="ts">
import WCExample from './lib/WCExample.vue'
</script>

<template>
  <header>
    <h3>Unplugin-Web-Components</h3>
  </header>
  <main>
    <section>
      <WCExample />
    </section>
    <section>
      <iframe src="../playground.html" frameborder="0" />
    </section>
  </main>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

header {
  height: 48px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  background: black;
}

h3 {
  margin: 0;
  color: white;
}

main {
  display: flex;
  flex-flow: row nowrap;
  height: calc(100vh - 48px);
  width: 100vw;
}

section {
  flex: 1;
}

section:nth-of-type(1) {
  background: rgba(0, 0, 0, .2);
}

iframe {
  width: 100%;
  height: 100%;
}
</style>
