import CLOUDS from "vanta/dist/vanta.clouds.min";
import * as THREE from "three";
import SunCalc from "suncalc";

type Phase = "sunrise" | "day" | "sunset" | "night";

type PhaseColors = {
  skyColor: number;
  cloudColor: number;
  cloudShadowColor: number;
  sunColor: number;
  sunGlareColor: number;
  sunlightColor: number;
  speed: number;
};

type VantaCloudsInstance = {
  setOptions: (options: PhaseColors) => void;
  destroy?: () => void;
};

const PHASE_COLORS: Record<Phase, PhaseColors> = {
  sunrise: {
    skyColor: 0xffc870,
    cloudColor: 0xffb347,
    cloudShadowColor: 0xd67b35,
    sunColor: 0xffe6a7,
    sunGlareColor: 0xfff0c2,
    sunlightColor: 0xffd27f,
    speed: 0.6,
  },
  day: {
    skyColor: 0x7eb6ff,
    cloudColor: 0xffffff,
    cloudShadowColor: 0xbfd7ff,
    sunColor: 0xffffb3,
    sunGlareColor: 0xffffff,
    sunlightColor: 0xfff0c2,
    speed: 0.8,
  },
  sunset: {
    skyColor: 0xff9a8b,
    cloudColor: 0xffc1a3,
    cloudShadowColor: 0xe07b74,
    sunColor: 0xffd2a6,
    sunGlareColor: 0xffe6bf,
    sunlightColor: 0xffa36c,
    speed: 0.5,
  },
  night: {
    skyColor: 0x0f1b3f,
    cloudColor: 0x2d3f6f,
    cloudShadowColor: 0x0a1429,
    sunColor: 0xf0f4ff,
    sunGlareColor: 0xbec8ff,
    sunlightColor: 0x8aa0ff,
    speed: 0.2,
  },
};

function getCurrentPhase(times: SunCalc.GetTimesResult, now: Date): Phase {
  if (now >= times.sunrise && now < times.sunriseEnd) {
    return "sunrise";
  }

  if (now >= times.sunriseEnd && now < times.sunsetStart) {
    return "day";
  }

  if (now >= times.sunsetStart && now < times.sunset) {
    return "sunset";
  }

  return "night";
}

export function initLandscape(container: HTMLElement, lat: number, lng: number): () => void {
  const updateEffectPhase = (vantaEffect: VantaCloudsInstance): void => {
    const currentDate = new Date();
    const times = SunCalc.getTimes(currentDate, lat, lng);
    const phase = getCurrentPhase(times, currentDate);

    vantaEffect.setOptions(PHASE_COLORS[phase]);
  };

  const initialDate = new Date();
  const initialTimes = SunCalc.getTimes(initialDate, lat, lng);
  const initialPhase = getCurrentPhase(initialTimes, initialDate);
  const vantaEffect = CLOUDS({
    el: container,
    THREE,
    ...PHASE_COLORS[initialPhase],
  }) as unknown as VantaCloudsInstance;

  const FIFTEEN_MINUTES = 15 * 60 * 1000;
  const intervalId = window.setInterval(() => updateEffectPhase(vantaEffect), FIFTEEN_MINUTES);

  return () => {
    window.clearInterval(intervalId);
    vantaEffect.destroy?.();
  };
}
