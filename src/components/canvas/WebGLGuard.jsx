import { Component } from "react";

// Cached so we only probe once per page load
let webGLSupported = null;

export const isWebGLAvailable = () => {
  if (webGLSupported !== null) return webGLSupported;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    webGLSupported = !!gl;
  } catch {
    webGLSupported = false;
  }
  return webGLSupported;
};

// Renders children only when WebGL works; otherwise renders the fallback.
// Also an error boundary, since context creation can still fail at runtime
// (driver blocklists, too many live contexts) even when detection passes.
class WebGLGuard extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn("WebGL unavailable, skipping 3D scene:", error?.message);
  }

  render() {
    if (this.state.failed || !isWebGLAvailable()) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default WebGLGuard;
