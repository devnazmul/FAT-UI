import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { IoCloudUploadSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { getFullImageLink } from "../../utils/getFullImageLink";
import CustomPopup from "../CustomPopup";
import FileViewer from "../FileViewer";

export default function CustomSingleFileUploader({
  accept,
  files,
  setFiles,
  details,
  label = "Attachment",
  isFileUploading = false,
  onRemove = (e) => e,
  required = false,
  onDrop = (e) => e,
  index = 0,
  idItemId = "text",
  size = "w-[200px] h-[200px]",
  error = "",
  dataAuto
}) {
  const [dragOver, setDragOver] = useState(false);
  useEffect(() => {
    setDragOver(false);
  }, [files]);

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop(e);
  };

  const onChangeInput = (e) => {
    setFiles(e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const inputRef = useRef(null);

  const handleFileRemove = (e) => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onRemove(e);
  };

  // POPUP OPTIONS
  const [popupOption, setPopupOption] = useState({
    open: false,
    type: "",
    id: null,
    onClose: () => {
      setPopupOption({ ...popupOption, open: false });
    },
    overlayStyle: { background: "red" },
    closeOnDocumentClick: false
  });
  // HANDLE VIEW FILES
  const handleViewFiles = (files) => {
    setPopupOption({
      open: true,
      type: "viewFiles",
      title: "View Files",
      files: files,
      onClose: () => {
        setPopupOption({ ...popupOption, open: false });
      },
      id: null,
      closeOnDocumentClick: false
    });
  };

  return (
    <div id="single-file-uploader cursor-pointer">
      <CustomPopup
        popupClasses={`w-[70vw]`}
        popupOption={popupOption}
        setPopupOption={setPopupOption}
        Component={
          <>
            {popupOption?.type === "viewFiles" && (
              <FileViewer
                files={popupOption?.files}
                handleClosePopup={() => {
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    files: [],
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false
                  });
                }}
              />
            )}
          </>
        }
      />
      {label && (
        <label
          data-auto={`custom-single-file-uploader-label-all-page`}
          htmlFor={`fl-${idItemId}-${index}`}
          className="label"
        >
          <span className={`label-text text-md font-bold`}>
            {label}{" "}
            {label && required && (
              <span className="text-error font-bold text-md">*</span>
            )}
          </span>
        </label>
      )}
      <div
        id="single-file-upload-section"
        className={`bg-base-300 border border-primary-content shadow-md ${size} rounded-xl py-4`}
      >
        <div id="single-file-inputContainer" className="px-5 relative">
          {isFileUploading && (
            <div
              data-auto={`custom-single-file-uploader-loading-all-page`}
              className={`absolute bg-opacity-70 top-0 left-[1.25rem] h-full flex gap-2 flex-col justify-center items-center w-[calc(100%-2.5rem)] rounded-xl z-40 bg-primary-content`}
            >
              <span
                className={`loading loading-spinner text-primary loading-lg`}
              ></span>

              <h1 className={`text-primary `}>Uploading...</h1>
            </div>
          )}
          <div
            id="single-file-uploader-container"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`${
              dragOver ? "opacity-70" : "opacity-100"
            } relative flex justify-center px-5 items-center border-2 h-auto border-gray-500 border-dashed  py-5 rounded-xl flex-col `}
          >
            {files?.length === 0 && (
              <label
                htmlFor={`fl-${idItemId}-${index}`}
                className="absolute h-full w-full top-0 left-0"
              ></label>
            )}
            <input
              ref={inputRef}
              data-auto={dataAuto}
              onChange={(e) => {
                onChangeInput(e);
              }}
              multiple={false}
              className="hidden"
              id={`fl-${idItemId}-${index}`}
              type="file"
              accept={accept}
            />

            {files[0] === "" || files[0] === undefined || files[0] === null ? (
              <label
                htmlFor={`fl-${idItemId}-${index}`}
                className={`w-[calc(100%-10px)] h-[120px] flex justify-center items-center flex-col gap-2 cursor-pointer`}
              >
                <IoCloudUploadSharp className="text-3xl text-gray-500 " />
                <span className="text-sm md:text-md font-semibold text-center">
                  Choose a file or drag & drop it here
                </span>
                <span
                  data-auto={`custom-single-file-uploader-details-all-page`}
                  className="text-xs font-light text-center"
                >
                  {details}
                </span>
                <div disabled className="border py-1 px-2 rounded-md">
                  Browse File
                </div>
              </label>
            ) : (
              <div className="w-full grid grid-cols-2 sm:grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 h-auto">
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="relative w-[120px] h-[120px] shadow-md rounded-xl group flex justify-center items-center"
                    key={index}
                  >
                    <div onClick={() => handleViewFiles([files[0]])}>
                      {files[0]?.endsWith(".png") ||
                      files[0]?.endsWith(".jpg") ||
                      files[0]?.endsWith(".jpeg") ||
                      files[0]?.endsWith(".JPEG") ||
                      files[0]?.endsWith(".JPG") ? (
                        <img
                          data-auto={`${dataAuto}-images`}
                          src={getFullImageLink(files[0])}
                          alt={files[0].name}
                          className="h-full w-full duration-200 absolute top-0 cursor-pointer  rounded-xl  right-0 object-cover "
                        />
                      ) : (
                        <div
                          data-auto={`custom-single-file-uploader-file-lines-all-page`}
                          className="h-full w-full duration-200 absolute top-0 cursor-pointer  rounded-xl  right-0 object-cover  flex justify-center items-center"
                        >
                          <FaRegFileLines className={`text-4xl text-primary`} />
                        </div>
                      )}
                    </div>

                    <button
                      data-auto={`${dataAuto}-remove_image-${index}`}
                      className="absolute -top-2 hover:scale-125 duration-200 -right-2 flex justify-center items-center bg-error w-7 h-7 rounded-full overflow-hidden shadow-md"
                      onClick={() => handleFileRemove(files[0])}
                    >
                      <RxCross2 className="text-base-300" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VALIDATION MESSAGE  */}
      {error && (
        <label
          data-auto={`custom-single-file-uploader-error-message-all-page`}
          className="label h-7"
        >
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}

CustomSingleFileUploader.propTypes = {
  accept: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFiles: PropTypes.func.isRequired,
  details: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string
  }).isRequired,
  label: PropTypes.string,
  isFileUploading: PropTypes.bool,
  onRemove: PropTypes.func,
  required: PropTypes.bool,
  onDrop: PropTypes.func,
  index: PropTypes.number,
  idItemId: PropTypes.string,
  size: PropTypes.string,
  error: PropTypes.string,
  dataAuto: PropTypes.string.isRequired
};
