const debounce = (func: Function) => {
  let timer: string | number | NodeJS.Timeout | null | undefined;
  return function (...args: any) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 1000);
  };
};

export default debounce;
