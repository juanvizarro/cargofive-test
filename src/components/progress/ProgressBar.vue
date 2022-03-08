<template>
  <div class="progress">
    <div class="bg-blue-600 opacity-20 progress__background"></div>
    <div class="progress__indeterminate bg-blue-600"></div>
  </div>
</template>
<script setup></script>

<style lang="scss">
.progress {
  height: 4px;
  left: 0;
  z-index: 1;
  background: transparent;
  overflow: hidden;
  transition: 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  width: 100%;
  position: relative;
  &__indeterminate {
    width: auto;
    right: auto;
    top: 0;
    left: 0;
    height: inherit;
    will-change: left, right;
    position: absolute;

    animation: indeterminate-ltr 1s linear infinite;
  }
  &__background {
    left: 0%;
    width: 100%;
    height: 4px;
  }
}
@keyframes indeterminate-ltr {
  0% {
    left: -80%;
    right: 100%;
  }
  50% {
    left: -20%;
    right: 60%;
  }
  75% {
    left: 0%;
    right: 20%;
  }

  100% {
    left: 100%;
    right: -35%;
  }
}
</style>
