import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getFullImageLink } from "../utils/getFullImageLink";

const FileViewer = ({ files, onClose, handleClosePopup }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : files.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < files.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling when the file viewer is open
    return () => {
      document.body.style.overflow = "auto"; // Enable scrolling when the file viewer is closed
    };
  }, []);

  return (
    <div className="file-viewer pb-5">
      <div
        data-auto={`file-viewer-close-all-page`}
        className="overlay"
        onClick={onClose}
      ></div>

      <div className="viewer-container pl-2 relative">
        <h2 className={`pt-5 text-primary text-xl font-bold`}>
          Total {files?.length} {files?.length > 1 ? "files" : "file"}{" "}
          found{" "}
        </h2>
        {files.map((file, index) => (
          <div
            key={index}
            className={`file-slide pt-5 ${
              index === currentIndex ? "block" : "hidden"
            }`}
          >
            {file.endsWith(".pdf") ? (
              <>
                <div className="file-info flex justify-between items-center mb-3 pr-2">
                  <span className="file-name text-primary font-semibold">{`${
                    index + 1
                  }. ${file.split("/")[file.split("/").length - 1]}`}</span>
                </div>
                <iframe
                  data-auto={`file-viewer-iframe-all-page`}
                  src={
                    file.split("/")[0] === "" ? getFullImageLink(file) : file
                  }
                  className={`w-full h-[550px] md:h-[800px]`}
                />
              </>
            ) : (
              <div className={`min-h-[550px] md:min-h-[600px]`}>
                <div className="file-info flex justify-between items-center mb-3 pr-2">
                  <span className="file-name text-primary font-semibold">{`${
                    index + 1
                  }. ${file.split("/")[file.split("/").length - 1]}`}</span>
                </div>
                <img
                  data-auto={`file-viewer-image-all-page`}
                  src={
                    file.split("/")[0] === "" ? getFullImageLink(file) : file
                  }
                  alt={`${file.split("/")[file.split("/").length - 1]}`}
                />
              </div>
            )}
          </div>
        ))}
        {files.length > 1 && (
          <div className="flex justify-between items-center mt-5 absolute top-[230px] -left-4 -right-4">
            <button
              data-auto={`file-viewer-previous-button-all-page`}
              data-tip="previous"
              className="h-10 w-10 rounded-full bg-primary flex justify-center items-center"
              onClick={handlePrev}
            >
              <IoIosArrowBack className="text-base-300 text-xl" />
            </button>
            <button
              data-auto={`file-viewer-next-button-all-page`}
              data-tip="next"
              className="h-10 w-10 rounded-full bg-primary flex justify-center items-center"
              onClick={handleNext}
            >
              <IoIosArrowForward className="text-base-300 text-xl" />
            </button>
          </div>
        )}
      </div>

      {/* CLOSE BUTTON  */}
      <div
        data-auto={`file-viewer-close-button-all-page`}
        className="sticky bottom-0 bg-base-300 py-5 z-[1000] flex flex-col md:flex-row w-full justify-center md:justify-end items-center mt-5 gap-2"
      >
        <button onClick={handleClosePopup} className="btn w-full btn-primary">
          Close
        </button>
      </div>
    </div>
  );
};

export default FileViewer;
