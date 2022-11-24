import { CameraIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface Props {
  id: string;
  rounded?: string;
  width?: number;
  height?: number;
  className?: string;
  url?: string;
}

const ImageInput: React.FC<Props> = ({
  id,
  height,
  width,
  rounded,
  className,
  url,
}) => {
  return (
    <>
      <label
        className={`p-2 border border-dashed inline-block border-slate-400 relative group cursor-pointer ${
          rounded || "rounded-full"
        } ${className}`}
        htmlFor={id}
      >
        {url ? (
          <div
            className={`z-10 bg-black/30 dark:bg-black/50 w-full h-full absolute top-0 left-0 hidden group-hover:flex items-center justify-center flex-col ${
              rounded || "rounded-full"
            } `}
          >
            <CameraIcon className="w-5 h-5 text-white" />
            <span className="text-white text-sm">Update image</span>
          </div>
        ) : null}
        {url ? (
          <Image
            src="/avatar.jpg"
            alt="profile"
            width={width || 120}
            height={height || 120}
            className={`${
              rounded || "rounded-full"
            } w-full h-full object-cover`}
          />
        ) : (
          <div
            className={`flex w-full h-full items-center justify-center flex-col`}
          >
            <CameraIcon className="w-5 h-5 dark:text-white z-10" />
            <span className="dark:text-white text-sm z-10">
              Upload an image
            </span>
          </div>
        )}
        <input type="file" className="hidden" id={id} />
      </label>
    </>
  );
};

export default ImageInput;
