import { getFullImageLink } from "./getFullImageLink.js";
import { getFullName } from "./getFullName.js";

export const getRoundedImageLikeProfile = (data) =>
  data?.image ? (
    <span className={`avatar`}>
      <div className="w-10 rounded-full">
        <img
          className={`object-cover`}
          src={`${getFullImageLink(data?.image)}`}
          alt={getFullName(data)}
        />
      </div>
    </span>
  ) : (
    <div className={`avatar placeholder duration-100 uppercase`}>
      <div className="w-10 rounded-full bg-primary text-base-300">
        <span>{`${data?.first_Name?.slice(0, 1)}${
          data?.middle_Name ? data?.middle_Name?.slice(0, 1) : ""
        }${data?.last_Name?.slice(0, 1)}`}</span>
      </div>
    </div>
  );
