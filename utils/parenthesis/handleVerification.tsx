  export const handleVerification = (value: string) => {
    const stack = [];
    const dict = {
      "(": ")",
      "[": "]",
      "{": "}",
    };

    const validChars = value.match(/[\(\)\{\}\[\]]/g) ?? [];

    for (let i = 0; i < validChars.length; i++) {
      const char = validChars[i];

      if (dict[char as keyof typeof dict]) {
        stack.push(char);
      } else {
        const last = stack.pop();
        if (char !== dict[last as keyof typeof dict]) return false;
      }
    }

    return stack.length === 0;
  };