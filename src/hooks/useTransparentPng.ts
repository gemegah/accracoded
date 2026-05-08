import { useEffect, useState } from 'react';

export function useTransparentPng(source: string) {
  const [cleanSource, setCleanSource] = useState(source);

  useEffect(() => {
    let isCancelled = false;

    const image = new Image();
    image.decoding = 'async';

    image.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const context = canvas.getContext('2d', { willReadFrequently: true });
        if (!context) {
          if (!isCancelled) {
            setCleanSource(source);
          }
          return;
        }

        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const { data } = imageData;

        for (let index = 0; index < data.length; index += 4) {
          const red = data[index];
          const green = data[index + 1];
          const blue = data[index + 2];
          const alpha = data[index + 3];

          if (alpha === 0) {
            continue;
          }

          const brightest = Math.max(red, green, blue);
          const darkest = Math.min(red, green, blue);

          if (brightest >= 240 && darkest >= 235) {
            data[index + 3] = 0;
            continue;
          }

          if (brightest >= 228 && darkest >= 220) {
            data[index + 3] = Math.min(alpha, Math.max(0, Math.round((240 - brightest) * 18)));
          }
        }

        context.putImageData(imageData, 0, 0);

        if (!isCancelled) {
          setCleanSource(canvas.toDataURL('image/png'));
        }
      } catch {
        if (!isCancelled) {
          setCleanSource(source);
        }
      }
    };

    image.onerror = () => {
      if (!isCancelled) {
        setCleanSource(source);
      }
    };

    image.src = source;

    return () => {
      isCancelled = true;
    };
  }, [source]);

  return cleanSource;
}
