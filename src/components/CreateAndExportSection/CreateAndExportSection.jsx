import PropTypes from "prop-types";
import { BsFiletypeCsv } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa6";
import ButtonLoading from "../ButtonLoading.jsx";

const CreateAndExportSection = ({
  exportBtn,
  createPermission,
  createHandler,
  pdfHandler,
  csvHandler,
  blueBtnTitle = "Create",
  dataAuto,
  show_create_button = true,
  Icon,
  isLoadingExport
}) => (
  <div
    data-auto={`container_create_and_export_${dataAuto}`}
    className="flex items-center"
  >
    {exportBtn && (
      // EXPORT OPTIONS
      <div
        data-auto={`export_btn_container_${dataAuto}`}
        className="flex items-center "
      >
        {/* PDF EXPORT   */}
        {pdfHandler ? (
          <button
            disabled={isLoadingExport?.isLoading}
            data-auto={`pdf_export_button_${dataAuto}`}
            data-tip="Export as PDF"
            onClick={() => pdfHandler("pdf")}
            className={`text-primary tooltip tooltip-left rounded-md btn-sm `}
          >
            {isLoadingExport?.name === "pdf" && isLoadingExport?.isLoading ? (
              <ButtonLoading />
            ) : (
              <FaRegFilePdf className="text-2xl" />
            )}
          </button>
        ) : (
          ""
        )}

        {/* CSV EXPORT  */}
        {csvHandler ? (
          <button
            disabled={isLoadingExport?.isLoading}
            data-auto={`csv_export_button_${dataAuto}`}
            data-tip="Export as CSV"
            onClick={() => csvHandler("csv")}
            className={`text-primary tooltip tooltip-left rounded-md btn-sm`}
          >
            {isLoadingExport?.name === "csv" && isLoadingExport?.isLoading ? (
              <ButtonLoading />
            ) : (
              <BsFiletypeCsv className="text-2xl" />
            )}
          </button>
        ) : (
          ""
        )}
      </div>
    )}

    {createPermission && show_create_button && (
      <button
        data-auto={`create_${dataAuto}`}
        onClick={createHandler}
        className="relative flex justify-center items-center bg-primary gap-1 px-5 py-2 rounded-lg transition-transform active:scale-90 text-primary-content"
      >
        <span className="flex items-center gap-1">
          {Icon ? <Icon /> : ""}
          <span>{blueBtnTitle}</span>
        </span>
      </button>
    )}
  </div>
);

CreateAndExportSection.propTypes = {
  exportBtn: PropTypes.bool,
  createPermission: PropTypes.bool,
  createHandler: PropTypes.func,
  pdfHandler: PropTypes.func,
  csvHandler: PropTypes.func,
  blueBtnTitle: PropTypes.string,
  dataAuto: PropTypes.string,
  show_create_button: PropTypes.bool,
  Icon: PropTypes.elementType,
  isLoadingExport: PropTypes.bool
};

export default CreateAndExportSection;
