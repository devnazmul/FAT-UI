import PropTypes from "prop-types";
import { BsFiletypeCsv } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa";

export default function ExportOptions({
  pdfHandler,
  csvHandler,
  dataAuto = ""
}) {
  return (
    <div className="flex gap-2 justify-end items-center">
      {/* PDF EXPORT   */}
      <button
        data-auto={`pdf-export${dataAuto}`}
        data-tip="Export as PDF"
        onClick={() => pdfHandler("pdf")}
        className={`text-primary tooltip tooltip-left rounded-md btn-sm `}
      >
        <FaRegFilePdf className="text-2xl" />
      </button>
      {/* CSV EXPORT  */}
      <button
        data-auto={`csv-export${dataAuto}`}
        data-tip="Export as CSV"
        onClick={() => csvHandler("csv")}
        className={`text-primary tooltip tooltip-left rounded-md btn-sm`}
      >
        <BsFiletypeCsv className="text-2xl" />
      </button>
    </div>
  );
}

ExportOptions.propTypes = {
  pdfHandler: PropTypes.func.isRequired,
  csvHandler: PropTypes.func.isRequired,
  dataAuto: PropTypes.string
};
