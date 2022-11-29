import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  name: string;
  img: string;
  path: string;
}

const Project = ({ img, name, path }: Props) => {
  return (
    <div className="flex flex-col space-y-3 items-center">
      <Link href={`/projects/${path}`}>
        <div className="text-[4.5vw] sm:text-2xl lg:text-3xl font-kalam text-center cursor-pointer">
          {name}
        </div>
      </Link>

      <Link href={`/projects/${path}`} passHref>
        <div>
          <Image
            src={img}
            alt={img}
            width={700}
            height={500}
            className="object-contain cursor-pointer active:scale-95 transition duration-200 ease-in-out"
          />
        </div>
      </Link>
    </div>
  );
};

export default Project;
