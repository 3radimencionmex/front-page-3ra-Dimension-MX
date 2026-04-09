"use client";
import { useState, useRef, useEffect } from "react";

export default function AudioToggle() {
  const [playing, setPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(45, ctx.currentTime);
      
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(150, ctx.currentTime);

      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(1.5, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(5, ctx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);

      osc.start();
      gainNodeRef.current = gain;
    }

    if (!playing) {
      if (audioCtxRef.current.state === 'suspended') {
         audioCtxRef.current.resume();
      }
      gainNodeRef.current?.gain.setTargetAtTime(0.04, audioCtxRef.current.currentTime, 1);
      setPlaying(true);
    } else {
      gainNodeRef.current?.gain.setTargetAtTime(0, audioCtxRef.current!.currentTime, 0.5);
      setPlaying(false);
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="nothing-btn"
      aria-label={playing ? "Silenciar ambiente" : "Activar ambiente"}
      style={{
        position: "fixed",
        bottom: "32px",
        left: "32px",
        zIndex: 9980,
        width: "48px",
        height: "48px",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
        border: "1px solid var(--color-border)",
        color: playing ? "var(--color-accent)" : "var(--color-muted)",
        boxShadow: playing ? "0 0 16px var(--color-accent-glow)" : "none",
        transition: "all 0.3s ease"
      }}
    >
      {playing ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      )}
    </button>
  );
}
