import { useCallback, useRef } from "react";

const createOscillatorSound = (
  ctx: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  gain: number = 0.03
) => {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

export const useAudio = () => {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const tick = useCallback(() => {
    try {
      createOscillatorSound(getCtx(), 800, 0.08, "sine", 0.02);
    } catch {}
  }, [getCtx]);

  const click = useCallback(() => {
    try {
      createOscillatorSound(getCtx(), 300, 0.12, "triangle", 0.04);
    } catch {}
  }, [getCtx]);

  return { tick, click };
};
