import React, { useState } from "react";
import { BsInfoLg } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

const InfoModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div>
      <BsInfoLg
        className="w-8 h-7 text-sky-400 cursor-pointer hover:scale-90 transition ease-out duration-200"
        onClick={() => setShowModal(true)}
      />
      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
  );
};

const Modal = ({ setShowModal }: { setShowModal: (v: boolean) => void }) => {
  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50 bg-gray-900 p-5 flex flex-col items-center justify-center space-y-4 shadow-md shadow-black">
      <IoMdClose
        className="absolute h-6 w-6 top-3 right-3 text-red-400 cursor-pointer"
        onClick={() => setShowModal(false)}
      />
      <div className="font-oswald text-2xl text-sky-300">What's Going On?</div>
      <p className="text-center font-mono leading-10">
        The objective is to find the cheapest path from the top-left corner cell
        to the bottom-right corner cell. The constraints are that you can only
        move <span className="text-orange-300 font-bold">down</span> or{" "}
        <span className="text-orange-300 font-bold">right</span>. Obviously if
        we allowed diagonal movement the cheapest path would end up being the
        diagonal 99.6207 % of the time. We must make it somewhat interesting and
        have some variety!
      </p>
    </div>
  );
};

export default InfoModal;
