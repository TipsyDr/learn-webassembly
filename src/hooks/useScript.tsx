import { useEffect, useRef } from 'react';
import useUnmount from './useUnmount';

interface ScriptOptions {
  src: string;
}

const useScript = (opts: ScriptOptions) => {
  const isLoading = useRef(false);
  const error = useRef(false);
  const success = useRef(false);
  let script: HTMLScriptElement;

  const promise = new Promise((resolve, reject) => {
    useEffect(() => {
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = function () {
        isLoading.current = false;
        success.current = true;
        error.current = false;
        resolve('');
      };

      script.onerror = function (err) {
        isLoading.current = false;
        success.current = false;
        error.current = true;
        reject(err);
      };

      script.src = opts.src;
      document.head.appendChild(script);
    }, []);
    useUnmount(() => {
      script && script.remove();
    });
  });

  return {
    isLoading,
    error,
    success,
    toPromise: () => promise,
  };
};

export default useScript;
