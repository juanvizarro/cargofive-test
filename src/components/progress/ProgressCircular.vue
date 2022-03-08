<template>
  <div class="progress-circular flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="21.904761904761905 21.904761904761905 43.80952380952381 43.80952380952381"
      style="transform: rotate(0deg)"
    >
      <circle
        fill="transparent"
        cx="43.80952380952381"
        cy="43.80952380952381"
        r="20"
        stroke-width="3.8095238095238093"
        stroke-dasharray="125.664"
        stroke-dashoffset="125.66370614359172px"
        class="progress-circular--overlay"
      ></circle>
    </svg>
  </div>
</template>

<style lang="scss">
.progress-circular {
  &--overlay {
    stroke-linecap: round;
    animation: progress-circular-dash 1.4s ease-in-out infinite;
    stroke-dasharray: 80, 200;
    stroke-dashoffset: 0px;
    stroke: currentColor;
    z-index: 2;
    transition: all 0.6s ease-in-out;
  }
  svg {
    animation: progress-circular-rotate 1.4s linear infinite;
    transform-origin: center center;
    transition: all 0.2s ease-in-out;
  }
}

@keyframes progress-circular-rotate {
  100% {
    transform: rotate(1turn);
  }
}
</style>
