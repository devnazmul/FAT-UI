import { useEffect, useState } from "react";
import { FaGears } from "react-icons/fa6";
import { handleApiError } from "../../utils/apiErrorHandler";
import PropTypes from "prop-types";

export default function CustomFieldWithGenerateID({
  id,
  label,
  required = false,
  type,
  name,
  value,
  idGenerateFunc = () => {},
  placeholder,
  onChange,
  error,
  defaultValue,
  setFormData,
  formData,
  wrapperClassName,
  fieldClassName,
  toolTip = "Generate ID",
  idField,
  initialCall = true,
  onIdChange = (e) => e
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [employeeID, setEmployeeID] = useState("");
  useEffect(() => {
    if (initialCall && !value) {
      setIsLoading(true);
      idGenerateFunc()
        .then((res) => {
          setEmployeeID(res.user_id);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          handleApiError(error, "#00119");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onIdChange(employeeID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeID]);
  return (
    <div className={`relative ${wrapperClassName}`}>
      {/* LABEL */}
      <label
        data-auto={`custom-field-with-generate-id-label-all-page`}
        htmlFor={id}
        className="label"
      >
        <span className="label-text text-md font-bold">
          {label}{" "}
          {required && <span className="text-error font-bold text-md">*</span>}
        </span>
      </label>
      {/* FIELD  */}
      <button
        data-auto={`custom-field-with-generate-id-generate-id-button-all-page`}
        disabled={isLoading}
        data-tip={toolTip}
        className="absolute tooltip group tooltip-primary w-12 right-0 text-2xl rounded-r-md flex justify-center items-center h-12 bg-primary text-base-300"
        onClick={() => {
          setIsLoading(true);
          idGenerateFunc()
            .then((res) => {
              setFormData({ ...formData, [idField]: res?.user_id });
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);

              handleApiError(error, "#00119");
            });
        }}
      >
        {isLoading ? (
          <span className="loading loading-bars text-base-300" />
        ) : (
          <FaGears className="group-hover:scale-125 duration-150 transition-all" />
        )}
      </button>
      <input
        data-auto={`custom-field-with-generate-id-input-all-page`}
        id={id}
        onChange={onChange}
        value={value || defaultValue}
        type={type}
        name={name}
        // defaultValue={defaultValue}
        placeholder={`${placeholder}${required ? "*" : ""}`}
        className={`input bg-base-300  focus:outline-primary mr-12 focus:outline-none rounded-r-none rounded-l-md input-bordered ${fieldClassName}`}
      />
      {/* VALIDATION MESSAGE  */}
      {error && (
        <label
          data-auto={`custom-field-with-generate-id-error-message-all-page`}
          className="label h-7"
        >
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}

CustomFieldWithGenerateID.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  fieldClassName: PropTypes.string,
  error: PropTypes.string,
  wrapperClassName: PropTypes.string,
  toolTip: PropTypes.string,
  idGenerateFunc: PropTypes.func.isRequired,
  idField: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  initialCall: PropTypes.bool,
  onIdChange: PropTypes.func
};
