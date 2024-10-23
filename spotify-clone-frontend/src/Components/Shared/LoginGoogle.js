import { Icon } from "@iconify/react";

const LoginGoogle = () => {
  return (
    <button className="sm:full w-full text-base flex flex-row items-center space-x-4 border border-gray-500 px-6 py-2.5 rounded-full text-white bg-transparent hover:border-white">
      <div className="grid sm:grid-cols-12 grid-cols-1 w-full">
        <div className="bg-transparent col-span-2 flex align-middle items-center w-full">
          <Icon icon="logos:google-icon" width="20px" />
        </div>
        <div className="text-white font-medium pad1y bg-transparent col-span-10 align-middle text-center">
          Continue with Google
        </div>
      </div>
    </button>
  );
};

export default LoginGoogle;
