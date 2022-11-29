import React, { useEffect, useRef, useState } from "react";
import InputField from "./InputField";
import SortButtons from "./SortButtons";
import { randomizeInput } from "../../utils/sorting/randomizeInput";
import { sleep } from "../../utils/sleep";
import { animate } from "framer-motion";

const SortContainer = () => {
  const [selectedBtn, setSelectedBtn] = useState<string>("Bubble");
  const [sortInput, setSortInput] = useState<string>("");
  const [numArray, setNumArray] = useState<number[]>([0]);
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const sortRefs = useRef<HTMLDivElement[] | null[]>([]);
  const speedRef = useRef<number>(500);

  useEffect(() => {
    const value = randomizeInput().numArray;
    setNumArray(value);
    setSortInput(value.join(","));
  }, []);

  useEffect(() => {
    sortRefs.current.forEach((el) => {
      el?.classList.remove("greater");
      el?.classList.remove("opacity");
    });
  }, [sortInput, selectedBtn]);

  const handleSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = 1000;
    const speed = max - Number(e.target.value);
    speedRef.current = speed;
  };

  const clearOpacity = () => {
    for (let i = 0; i < sortRefs.current.length; i++) {
      sortRefs.current[i]!.classList.remove("opacity");
    }
  };

  const clearClass = () => {
    sortRefs.current.forEach((el) => el?.classList.remove("greater"));
    sortRefs.current.forEach((el) => el?.classList.remove("opacity"));
  };

  const animate = () => {
    sortRefs.current.forEach((el) => el?.classList.add("greater"));
  };

  const runGame = async () => {
    setGameRunning(true);
    switch (selectedBtn) {
      case "Bubble":
        await bubbleSort();
        break;
      case "Insertion":
        await insertionSort();
        break;
      case "Selection":
        await selectionSort();
        break;
      case "Merge":
        await mergeSort(numArray).then((res) => setNumArray(res));
        animate();
        break;
      case "Quick":
        await quickSort(numArray).then((res) => setNumArray(res));
        clearClass();
        break;
      default:
        break;
    }
    setGameRunning(false);
  };

  const bubbleSort = async () => {
    const dupeNums = [...numArray];
    for (let i = 0; i < dupeNums.length - 1; i++) {
      for (let j = 0; j < dupeNums.length - 1 - i; j++) {
        await sleep(speedRef.current);
        if (dupeNums[j] > dupeNums[j + 1]) {
          let temp = dupeNums[j];
          dupeNums[j] = dupeNums[j + 1];
          dupeNums[j + 1] = temp;
          sortRefs.current[j]!.innerText = dupeNums[j].toString();
          sortRefs.current[j + 1]!.innerText = dupeNums[j + 1].toString();
          sortRefs.current[j]!.classList.remove("greater");
          sortRefs.current[j + 1]!.classList.add("greater");
        } else {
          sortRefs.current[j + 1]!.classList.add("greater");
          sortRefs.current[j]!.classList.remove("greater");
        }
      }
    }
    sortRefs.current[0]!.classList.add("greater");
    setNumArray(dupeNums);
  };

  const insertionSort = async () => {
    const dupeNums = [...numArray];
    for (let i = 0; i < dupeNums.length; i++) {
      const element = dupeNums[i];
      let j = i - 1;
      while (j >= 0 && element < dupeNums[j]) {
        await sleep(speedRef.current);
        dupeNums[j + 1] = dupeNums[j];
        sortRefs.current[j + 1]!.innerText = dupeNums[j].toString();
        sortRefs.current[j + 1]!.classList.add("opacity");
        j -= 1;
      }
      dupeNums[j + 1] = element;
      clearOpacity();
      sortRefs.current[j + 1]!.innerText = element.toString();
      sortRefs.current[i]!.classList.add("greater");
    }
    setNumArray(dupeNums);
  };

  const selectionSort = async () => {
    const dupeNums = [...numArray];
    let min;
    for (let i = 0; i < dupeNums.length; i++) {
      min = i;
      for (let j = i + 1; j < dupeNums.length; j++) {
        await sleep(speedRef.current);
        clearOpacity();
        if (dupeNums[j] < dupeNums[min]) {
          min = j;
          sortRefs.current[j]!.classList.add("opacity");
        }
      }

      if (i != min) {
        let temp = dupeNums[i];
        dupeNums[i] = dupeNums[min];
        dupeNums[min] = temp;
        sortRefs.current[i]!.innerText = dupeNums[i].toString();
        sortRefs.current[min]!.innerText = dupeNums[min].toString();
      }
      sortRefs.current[i]!.classList.add("greater");
    }
    setNumArray(dupeNums);
  };

  const merge = async (
    left: number[],
    right: number[]
  ): Promise<(number | undefined)[]> => {
    const sortedArr = [];
    while (left?.length && right?.length) {
      await sleep(speedRef.current);
      const leftElement = (sortRefs.current as HTMLDivElement[]).find(
        (el: HTMLDivElement) => Number(el.innerText) === left[0]
      );
      const rightElement = (sortRefs.current as HTMLDivElement[]).find(
        (el: HTMLDivElement) => Number(el.innerText) === right[0]
      );
      leftElement?.classList.add("opacity");
      rightElement?.classList.add("opacity");
      if (left[0] <= right[0]) {
        sortedArr.push(left.shift());
        leftElement?.classList.add("greater");
      } else {
        sortedArr.push(right.shift());
        rightElement?.classList.add("greater");
      }
      await sleep(speedRef.current);
      leftElement?.classList.remove("opacity");
      rightElement?.classList.remove("opacity");
    }
    return [...sortedArr, ...left, ...right];
  };

  const mergeSort = async (dupeNums: number[]): Promise<any[]> => {
    if (dupeNums.length < 2) return dupeNums;
    const middle = Math.floor(dupeNums.length >> 1);
    const left = dupeNums.slice(0, middle);
    const right = dupeNums.slice(middle);

    const leftMerge = await mergeSort(left);
    const rightMerge = await mergeSort(right);

    return await merge(leftMerge, rightMerge);
  };

  const quickSort = async (dupeNums: number[]): Promise<any[]> => {
    if (dupeNums.length < 2) return dupeNums;

    clearClass();

    let pivot = dupeNums[dupeNums.length - 1];
    sortRefs.current[dupeNums.length - 1]?.classList.add("greater");

    const left = [];
    const right = [];
    for (let i = 0; i < dupeNums.length - 1; i++) {
      await sleep(speedRef.current);
      if (dupeNums[i] < pivot) {
        left.push(dupeNums[i]);
        sortRefs.current[i]?.classList.add("opacity");
      } else {
        right.push(dupeNums[i]);
      }
    }

    const leftMerge = await quickSort(left);
    const rightMerge = await quickSort(right);

    return [...leftMerge, pivot, ...rightMerge];
  };

  return (
    <>
      <div className="w-full flex items-center justify-center mt-2">
        <SortButtons
          selectedBtn={selectedBtn}
          setSelectedBtn={setSelectedBtn}
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <InputField
          sortInput={sortInput}
          setSortInput={setSortInput}
          setNumArray={setNumArray}
          gameRunning={gameRunning}
          runGame={runGame}
        />
      </div>

      <div className="flex items-center justify-center flex-col space-y-8 mt-24">
        <div className="flex space-x-4 w-full justify-center">
          <div className="font-kalam text-black text-2xl font-semibold">
            SPEED
          </div>
          <input
            type="range"
            className="accent-red-600 outline-none w-[50%]"
            onChange={handleSpeed}
            min={100}
            max={1000}
          />
        </div>
        <div className="flex gap-x-1 gap-y-3 flex-wrap items-center justify-center">
          {numArray.map((value: number, idx) => (
            <div
              key={idx}
              ref={(el) => (sortRefs.current[idx] = el)}
              className="w-16 h-16 bg-[#FF7377] shadow-lg shadow-white text-white font-semibold text-xl font-kalam flex items-center justify-center text-center rounded-lg"
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SortContainer;
