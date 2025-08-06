import PropTypes from "prop-types";

export default function CustomSingleFileField({
  id,
  label,
  required = false,
  name,
  placeholder,
  onChange,
  error,
  defaultValue,
  disable,
  wrapperClassName,
  accept,

  // FILE UPLOADING
  isFileUploading = false,
  dataAuto
}) {
  return (
    <div className={`${wrapperClassName}`} id="singleFile">
      {/* LABEL */}
      <label htmlFor={id} className="label flex justify-between">
        <span
          className={`label-text text-md font-bold ${
            disable && "text-gray-500"
          }`}
        >
          {label}{" "}
          {required && <span className="text-error font-bold text-md">*</span>}
        </span>
        {isFileUploading ? (
          <>
            <span className="loading loading-spinner text-primary loading-md"></span>
          </>
        ) : (
          <></>
        )}
      </label>
      {/* FIELD  */}
      <input
        id={dataAuto}
        data-auto={dataAuto}
        // style={{ display: "none" }}
        disabled={disable}
        onChange={onChange}
        // value={value}
        type="file"
        accept={accept}
        name={name}
        defaultValue={defaultValue}
        placeholder={`${placeholder}${required ? "*" : ""}`}
        className="file-input file-input-bordered file-input-primary w-full ${fieldClassName}"
      />
      {/* <button onClick={handleUploadButtonClick}>Upload {fileName}</button> */}
      {/* VALIDATION MESSAGE  */}
      {error && (
        <label className="label h-7">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}

CustomSingleFileField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  disable: PropTypes.bool.isRequired,
  wrapperClassName: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  // FILE UPLOADING
  isFileUploading: PropTypes.bool,
  dataAuto: PropTypes.string.isRequired,
  fieldClassName: PropTypes.string
};
