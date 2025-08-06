import PropTypes from "prop-types";
import { BsFiletypeCsv } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa6";
import ButtonLoading from "../ButtonLoading.jsx";

const CreateAndExportDoubleButtonSection = ({
  createPermission1,
  createPermission2,
  createHandler1,
  createHandler2,
  pdfHandler,
  csvHandler,
  blueBtnTitle1,
  blueBtnTitle2,
  dataAuto,
  Icon1,
  Icon2,
  isLoadingExport
}) => {
  return (
    <div className="flex justify-end items-end gap-5 w-full">
      <div className="flex flex-col sm:flex-row md:flex-col screen864:flex-row justify-end gap-x-5 gap-y-2 w-full">
        {/* EXPORT OPTIONS */}
        <div className="flex justify-end items-center">
          {/* PDF EXPORT   */}
          {pdfHandler ? (
            <button
              disabled={isLoadingExport?.isLoading}
              data-auto={`create-and-export-double-button-section-pdf-all-page`}
              data-tip="Export as PDF"
              onClick={() => pdfHandler("pdf")}
              className={`text-primary tooltip tooltip-left rounded-md btn-sm `}
            >
              {isLoadingExport?.isLoading && isLoadingExport?.name === "pdf" ? (
                <ButtonLoading />
              ) : (
                <FaRegFilePdf className="text-2xl" />
              )}
            </button>
          ) : null}
          {/* CSV EXPORT  */}
          {csvHandler ? (
            <button
              disabled={isLoadingExport?.isLoading}
              data-auto={`create-and-export-double-button-section-csv-all-page`}
              data-tip="Export as CSV"
              onClick={() => csvHandler("csv")}
              className={`text-primary tooltip tooltip-left rounded-md btn-sm`}
            >
              {isLoadingExport?.isLoading && isLoadingExport?.name === "csv" ? (
                <ButtonLoading />
              ) : (
                <BsFiletypeCsv className="text-2xl" />
              )}
            </button>
          ) : null}
        </div>

        <div
          className={`flex flex-col justify-end sm:flex-row gap-x-5 gap-y-2 `}
        >
          {createPermission1 && (
            <button
              data-auto={`create-${dataAuto}`}
              onClick={createHandler1}
              className=" flex justify-center items-center bg-primary gap-1 px-5 py-2 rounded-lg transition-transform active:scale-90 text-primary-content"
            >
              <span className="flex items-center gap-1">
                {Icon1 ? <Icon1 /> : ""}
                <span>{blueBtnTitle1}</span>
              </span>
            </button>
          )}
          {createPermission2 && (
            <button
              data-auto={`create-and-export-double-button-section-button2-all-page`}
              onClick={createHandler2}
              className=" flex justify-center items-center bg-primary gap-1 px-5 py-2 rounded-lg transition-transform active:scale-90 text-primary-content"
            >
              <span className="flex items-center gap-1">
                {Icon2 ? <Icon2 /> : ""}
                <span>{blueBtnTitle2}</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
CreateAndExportDoubleButtonSection.propTypes = {
  createPermission1: PropTypes.bool,
  createPermission2: PropTypes.bool,
  createHandler1: PropTypes.func,
  createHandler2: PropTypes.func,
  pdfHandler: PropTypes.func.isRequired,
  csvHandler: PropTypes.func,
  blueBtnTitle1: PropTypes.string,
  blueBtnTitle2: PropTypes.string,
  dataAuto: PropTypes.string,
  Icon1: PropTypes.elementType,
  Icon2: PropTypes.elementType,
  isLoadingExport: PropTypes.func
};

export default CreateAndExportDoubleButtonSection;
