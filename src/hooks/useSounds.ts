import { Howl } from 'howler';
import useSettingsStore from '@/stores/Settings.store';
import { asset } from '@/utils/asset';

export const useSounds = () => {
  const enableSounds = useSettingsStore((state) => state.enableSounds);
  const volume = useSettingsStore((state) => state.volume);

  const playSound = (): void => {
    if (!enableSounds) return;

    const sound = new Howl({
      src: [asset('/sounds/play.wav')],
      volume,
    });

    sound.play();
  };

  const resumeSound = (): void => {
    if (!enableSounds) return;

    const sound = new Howl({
      src: [asset('/sounds/resume.wav')],
      volume,
    });

    sound.play();
  };

  const radioSound = (): void => {
    if (!enableSounds) return;

    const sound = new Howl({
      src: [asset('/sounds/radio.mp3')],
      volume,
    });

    sound.play();
  };

  return {
    playSound,
    resumeSound,
    radioSound,
  };
};
