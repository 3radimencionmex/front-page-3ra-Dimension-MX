"use client";

import { Component, ReactNode } from "react";

interface Props {
  fallback?: ReactNode;
  children: ReactNode;
}

interface State {
  crashed: boolean;
}

/**
 * Catches WebGL context creation errors from Three.js / R3F.
 * Always tries to render the Canvas first; only shows fallback on actual failure.
 */
export class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { crashed: false };
  }

  static getDerivedStateFromError(): State {
    return { crashed: true };
  }

  // Swallow componentDidCatch so Next.js dev overlay doesn't show it
  componentDidCatch() {}

  render() {
    if (this.state.crashed) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

/**
 * Reliable WebGL detection: tries WebGL2 first (modern Chrome default), then WebGL1.
 * Actually calls getParameter() to verify the context is usable, not just created.
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const ctx =
      (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ??
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!ctx) return false;

    // Actually exercise the context — if GPU is broken, this returns null or throws
    const version = ctx.getParameter(ctx.VERSION);
    if (!version) return false;

    // Clean up
    ctx.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}
