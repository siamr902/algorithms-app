import React, { useEffect, useState } from "react";

const Container = () => {
  const [value, setValue] = useState<string>("");
  const [valid, setValid] = useState<boolean>(false);
  const [stack, setStack] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    handleVerification(value) ? setValid(true) : setValid(false);
  }, [value, handleVerification]);

  const matchParenthesis = (input: string) =>
    input.match(/[\(\)\{\}\[\]]/g) ?? [];

  function handleVerification(value: string) {
    const stack = [];
    const dict = {
      "(": ")",
      "[": "]",
      "{": "}",
    };

    const validChars = matchParenthesis(value);

    for (let i = 0; i < validChars.length; i++) {
      const char = validChars[i];
      setStack(stack);

      if (dict[char as keyof typeof dict]) {
        stack.push(char);
      } else {
        const last = stack[stack.length - 1];
        if (char !== dict[last as keyof typeof dict]) return false;
        stack.pop();
      }
    }

    return stack.length === 0;
  };

  return (
    <div className="flex justify-center items-center mt-10 flex-col space-y-20">
      <input
        type="text"
        className="text-center p-4 w-[60%] focus:outline-none font-kalam text-3xl bg-transparent border-b-4"
        onChange={handleChange}
      />
      <div className="flex flex-col space-y-8 justify-center items-center text-5xl font-semibold max-w-[80%]">
        <div
          className={`${
            valid ? "" : "text-pink-300 brightness-125"
          } text-5xl font-kalam tracking-widest`}
        >
          {value ? !valid && "Invalid" : ""}
        </div>
        <div className="text-6xl text-black font-kalam">
          {!!matchParenthesis(value).length && !valid && (
            <div className={`${stack.length ? "inline-flex" : "hidden"} text-red-300`}>
              {JSON.stringify(stack)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Container;
