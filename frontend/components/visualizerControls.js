// Visualizer Controls Component
export function initVisualizerControls(visualizer) {
  const controls = {
    rotationSpeed: 0.01,
    resetRotation: () => {
      // Reset the visualizer rotation
      visualizer.rotation.x = 0;
      visualizer.rotation.y = 0;
    },
  };

  return controls;
}