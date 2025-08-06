import { getFullName } from "@/utils/getFullName.js";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { formatText } from "../../utils/formatText";
import { getFullImageLink } from "../../utils/getFullImageLink";

const TableProfile = ({
  img1,
  title,
  firstName,
  middleName,
  lastName,
  departments,
  roles,
  email,
  pageLink,
  nameTextClass = "text-primary",
  is_clocked_in = false,
}) => (
  <div className="flex flex-row items-cneter gap-3">
    {/* PROFILE  */}
    {img1 ? (
      <div className={`avatar ${is_clocked_in && "online"} `}>
        <div className="w-10 h-10 rounded-full">
          <img src={`${getFullImageLink(img1)}`} />
        </div>
      </div>
    ) : (
      <div
        className={`avatar placeholder duration-100 ${
          is_clocked_in && "online"
        } `}
      >
        <div className={`w-10 h-10 rounded-full text-base-300 bg-primary`}>
          <span>{`${firstName?.slice(0, 1)}${
            middleName ? middleName?.slice(0, 1) : ""
          }${lastName?.slice(0, 1)}`}</span>
        </div>
      </div>
    )}
    {/* NAME AND EMAIL  */}
    <div className="flex flex-col items-start">
      <NavLink
        className={`link link-hover font-medium flex flex-wrap justify-center md:justify-normal  ${nameTextClass}`}
        to={pageLink ? pageLink : ""}
      >
        {getFullName({
          first_Name: firstName,
          middle_Name: middleName,
          last_Name: lastName,
          title,
        })}
      </NavLink>
      <span className="font-semibold text-xs text-gray-500 ">
        {departments?.map((dep, index) => {
          if (index + 1 < departments?.length) {
            return `${dep?.name},` + " ";
          } else {
            return `${dep?.name}`;
          }
        })}
      </span>
      <span className="text-xs font-medium">
        {roles?.map((r) => formatText(r?.name)).join()}
      </span>
      <span className="text-xs">{email}</span>
    </div>
  </div>
);

TableProfile.propTypes = {
  img1: PropTypes.string,
  title: PropTypes.string,
  firstName: PropTypes.string,
  middleName: PropTypes.string,
  lastName: PropTypes.string,
  departments: PropTypes.array,
  roles: PropTypes.array,
  email: PropTypes.string,
  pageLink: PropTypes.string,
  nameTextClass: PropTypes.string,
  is_clocked_in: PropTypes.bool,
};
export default TableProfile;
