export const throttle = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};
