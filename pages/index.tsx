import type { NextPage } from "next";
import Image from "next/image";

const LandingPage: NextPage = () => {
  return (
    <>
      <header className="px-4 grid place-items-center">
        <div className="w-100 py-12 flex justify-center">
          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="A Logo of Thrion"
          />
        </div>
        <div className="max-w-md">
          <p className="text-center font-light text-2xl">
            This should be a description of what Thrion is
          </p>
        </div>
      </header>
    </>
  );
};

export default LandingPage;
