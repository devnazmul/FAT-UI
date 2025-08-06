import { useEffect, useRef, useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { ImFilesEmpty } from "react-icons/im";
import { IoCloudUploadSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { getFullImageLink } from "../../utils/getFullImageLink";
import CustomPopup from "../CustomPopup";
import FileViewer from "../FileViewer";
import PropTypes from "prop-types";

export default function CustomFileUploader({
  accept,
  files = [],
  onFileSelect = (event) => event,
  details,
  isFileUploading = false,
  onRemove = (event) => event,
  onDrop = (event) => event,
  dataAuto,
  wrapperClassName,
  required = false,
  id = "fl",
  disabled = false
}) {
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    setDragOver(false);
  }, [files]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    onDrop(droppedFiles);
  };

  const onChangeInput = (e) => {
    onFileSelect(e.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const inputRef = useRef(null);
  const handleFileRemove = (file_url) => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onRemove(file_url);
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
      closeOnDocumentClick: false
    });
  };

  return (
    <div id="file-uploader" className={wrapperClassName}>
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

      <div className={`flex items-center gap-1`}>
        <p className="text-sm font-semibold mb-2" id={`label-${dataAuto}`}>
          Attachment
        </p>
        {!disabled && required && (
          <span className="text-error font-bold text-md">*</span>
        )}
      </div>
      <div
        id="file-uploader-container"
        className="bg-base-300 border border-primary-content shadow-md rounded-xl pb-4"
        data-auto="file-uploader-container"
      >
        <div
          className="px-5 py-2 flex items-star md:items-center justify-start gap-2"
          data-auto="file-uploader-header"
        >
          <div className="border rounded-full border-gray-500 h-8 w-8 md:h-10 md:w-10 flex justify-center items-center">
            <ImFilesEmpty className="text-sm text-gray-500" />
          </div>
          {disabled ? (
            <div>
              <h3 className="text-sm md:text-md font-medium ">Files</h3>
            </div>
          ) : (
            <div>
              <h3 className="text-sm md:text-md font-medium ">Upload files</h3>
              <h5 className="text-xs md:text-md font-light ">
                Select and upload the files of your choice
              </h5>
            </div>
          )}
        </div>
        <hr className="mb-5" />

        <div className="px-5 relative" id="file-upload-section">
          {isFileUploading && (
            <div
              className={`absolute bg-opacity-70 top-0 left-[1.25rem]  h-full flex gap-2 flex-col justify-center items-center w-[calc(100%-2.5rem)] rounded-xl z-40 bg-primary-content`}
              data-auto="uploading-indicator"
            >
              <span
                className={`loading loading-spinner text-primary loading-lg`}
              ></span>
              <h1 className={`text-primary `}>Uploading...</h1>
            </div>
          )}
          <div
            id="inputContainer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`${
              dragOver ? "opacity-70" : "opacity-100"
            } relative flex justify-center px-5 items-center border-2 h-auto border-gray-500 border-dashed  py-10 rounded-xl flex-col`}
            data-auto="drop-zone"
          >
            {files?.length === 0 && (
              <label
                htmlFor={id}
                className="absolute h-full w-full top-0 left-0"
                data-auto="file-input-label"
              ></label>
            )}
            <input
              ref={inputRef}
              onChange={onChangeInput}
              multiple
              id={id}
              className="hidden"
              type="file"
              accept={accept}
              data-auto={`${dataAuto}`}
            />

            {files.length === 0 ? (
              <>
                <IoCloudUploadSharp className="text-3xl text-gray-500 " />
                <span className="text-sm md:text-md font-semibold text-center">
                  Choose a file or drag & drop it here
                </span>
                <span className="text-xs font-light text-center">
                  {details}
                </span>
                <label
                  htmlFor={id}
                  disabled
                  className="border mt-5 opacity-50 px-2 md:px-10 py-1 md:py-2 rounded-md border-gray-500 text-gray-500"
                  data-auto="browse-file-button"
                >
                  Browse File
                </label>
              </>
            ) : (
              <div
                className="w-full grid grid-cols-2 sm:grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 h-auto"
                data-auto="file-list"
              >
                {files?.map((file, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center"
                    data-auto={`file-item-${index}`}
                  >
                    <div
                      className="relative w-[100px] h-[100px] shadow-md rounded-xl group flex justify-center items-center"
                      key={index}
                      data-auto="file-item-container"
                    >
                      {file !== "" && (
                        <div onClick={() => handleViewFiles([file])}>
                          {file.endsWith(".png") ||
                          file.endsWith(".jpg") ||
                          file.endsWith(".jpeg") ||
                          file.endsWith(".JPEG") ||
                          file.endsWith(".JPG") ? (
                            <img
                              data-auto={`${dataAuto}-images`}
                              src={getFullImageLink(file)}
                              alt={file.name}
                              className="h-full w-full duration-200 absolute top-0 cursor-pointer rounded-xl right-0 object-cover group-hover:opacity-20"
                            />
                          ) : (
                            <div className="h-full w-full duration-200 absolute top-0 cursor-pointer rounded-xl right-0 object-cover group-hover:opacity-20 flex justify-center items-center">
                              <FaRegFileLines
                                className={`text-4xl text-primary`}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* REMOVE ICON  */}
                      {!disabled && (
                        <button
                          className="absolute -top-2 hover:scale-125 duration-200 -right-2 flex justify-center items-center bg-error w-7 h-7 rounded-full overflow-hidden shadow-md"
                          onClick={() => {
                            handleFileRemove(file);
                          }}
                          data-auto={`${dataAuto}-remove_image-${index}`}
                        >
                          <RxCross2 className="text-base-300" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {!disabled && (
                  <label
                    data-tip="Add more"
                    htmlFor={id}
                    className="flex flex-col items-center tooltip tooltip-right tooltip-primary"
                    data-auto="add-more-files"
                  >
                    <div className="w-[100px] h-[100px] bg-base-300 shadow-md rounded-xl border-2 border-dashed group flex justify-center items-center hover:border-primary cursor-pointer text-gray-500 hover:text-primary">
                      <FiPlus className="text-5xl md:text-3xl" />
                    </div>
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

CustomFileUploader.propTypes = {
  accept: PropTypes.string,
  files: PropTypes.array,
  onFileSelect: PropTypes.func,
  details: PropTypes.string,
  isFileUploading: PropTypes.bool,
  onRemove: PropTypes.func,
  onDrop: PropTypes.func,
  dataAuto: PropTypes.string,
  wrapperClassName: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
  disabled: PropTypes.bool
};
