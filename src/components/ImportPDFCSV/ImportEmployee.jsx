import { config } from "@/apis/config.js";
import apiClient from "@/utils/apiClient.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Papa from "papaparse";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiDownload } from "react-icons/fi";
import { handleApiError } from "../../utils/apiErrorHandler";
import CustomToaster from "../CustomToaster";
import ButtonSpinner from "../Loaders/ButtonSpinner";

export default function ImportEmployee({ handleClosePopup }) {
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState([]);
  const uploadEmployeeData = useMutation({
    mutationKey: ["import-employee"],
    mutationFn: async (payload) => {
      const { data } = await apiClient.post(
        `/v1.0/users/import`,
        payload,
        config()
      );
      return data;
    },
    onError: (error) => {
      if (error.response && error.response.status === 422) {
        const responseData = error.response.data;

        const tempErrors = [];

        // Check if errors are present in the response data
        if (responseData && responseData.errors) {
          // Iterate through each row's errors
          Object.keys(responseData.errors).forEach((rowIndex) => {
            const rowErrors = responseData.errors[rowIndex];

            // Prepare a formatted error object for this row
            const formattedErrors = {};
            Object.keys(rowErrors).forEach((field) => {
              // Concatenate error messages for each field
              formattedErrors[field] = rowErrors[field].join(" ");
            });

            // Add formatted errors to the tempErrors array
            tempErrors.push({
              row: parseInt(rowIndex), // Convert to a human-readable row number
              errors: formattedErrors
            });
          });

          // Example usage

          // You can now use `tempErrors` to update your UI
          // Example: Show errors in the UI
        }

        setErrors(tempErrors);
      }
      handleApiError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"]
      });
      setErrors([]);
      toast.custom((t) => (
        <CustomToaster
          t={t}
          type={"success"}
          text={`Employee Data Upload successfully!`}
        />
      ));
      handleClosePopup();
    }
  });

  // PREVIEW CSV
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [previewCol, setPreviewCol] = useState([]);

  useEffect(() => {
    setPreviewCol(csvData?.length > 0 ? Object.keys(csvData[0]) : []);
  }, [csvData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csv = event.target.result;
        Papa.parse(csv, {
          header: true, // Set this to true if you want the first row to be headers
          skipEmptyLines: true,
          complete: (results) => {
            setCsvData(results.data); // Store the parsed data
          }
        });
      };
      reader.readAsText(file);
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("import-employee-csv");

    if (!fileInput || !fileInput.files || !fileInput.files[0]) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    // Upload the file
    await uploadEmployeeData.mutateAsync(formData);
  };

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-5 m-5">
      {/* Download Button */}
      <div className={`flex justify-end items-center w-full`}>
        <a
          href="/employee.csv" // Path to your CSV file in the public directory
          download="employee.csv" // Optional: specify a filename for the download
          className="btn btn-sm btn-primary btn-outline mt-2"
        >
          <FiDownload />
          <span> Sample Format</span>
        </a>
      </div>
      {fileName ? (
        <label
          htmlFor={"import-employee-csv"}
          className={` flex-col w-full h-[200px] rounded-xl border-primary border-2 border-dashed flex justify-center items-center cursor-pointer`}
        >
          <p className={`text-primary `}>Selected File</p>
          <p className={`text-primary font-bold text-2xl`}>{fileName}</p>
          <p className={` btn btn-primary btn-sm mt-5`}>Click to Re-Upload</p>
        </label>
      ) : (
        <label
          htmlFor={"import-employee-csv"}
          className={` flex-col w-full h-[200px] rounded-xl border-primary border-2 border-dashed flex justify-center items-center cursor-pointer`}
        >
          <img src="/assets/csv-file.png" className={`w-20`} alt="" />
          <p className={`text-primary font-bold`}>Upload CSV File</p>
        </label>
      )}
      {csvData?.length > 0 ? (
        <div>
          <h1 className={`text-primary font-semibold`}>Preview:</h1>
          <div
            className={` w-full h-[300px] rounded-xl border-primary border-2  overflow-auto scrollbar`}
          >
            <table
              border={1}
              className="min-w-full bg-white border border-gray-300"
            >
              <thead>
                <tr className={`bg-primary text-base-300`}>
                  <th className="py-2 px-4 border-b border-gray-300 text-left whitespace-nowrap ">
                    Sr.
                  </th>
                  {previewCol.map((column) => (
                    <th
                      key={column}
                      className="py-2 px-4 border-b border-gray-300 text-left whitespace-nowrap border-x"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((employee, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-300 border">
                      {index + 1}
                    </td>

                    {previewCol.map((column) => (
                      <td
                        key={column}
                        className="py-2 px-4 border-b border-gray-300 border"
                      >
                        {employee[column]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}
      <input
        type="file"
        accept=".csv, .pdf"
        name="import-employee-csv"
        onChange={handleFileChange}
        id="import-employee-csv"
        className=" hidden w-full text-base text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-primary
      hover:file:bg-primary-content"
      />

      {/* Display Errors */}
      {errors.map(
        (errorObj, index) =>
          errorObj.errors && (
            <div key={index} className="text-red-500">
              <div className="font-bold">Errors in Row {errorObj.row + 1}:</div>
              {Object.keys(errorObj.errors).map((key) => (
                <p key={key}>
                  <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                  {errorObj.errors[key]}
                </p>
              ))}
            </div>
          )
      )}

      {/* SUBMIT BUTTON  */}
      <div
        data-auto="action-btn-container"
        className="sticky bottom-0 bg-base-300 py-5 z-[1000] flex flex-col md:flex-row w-full justify-center md:justify-end items-center mt-5 gap-2"
      >
        <button
          data-auto={`cancel-btn-user-letters`}
          disabled={uploadEmployeeData.isPending}
          onClick={handleClosePopup}
          className="btn w-full md:w-32 btn-outline btn-primary"
        >
          Cancel
        </button>
        <button
          type="submit"
          data-auto={`submit-btn-user-letters`}
          disabled={uploadEmployeeData.isPending}
          className="btn w-full md:w-32 btn-primary"
        >
          {uploadEmployeeData.isPending ? <ButtonSpinner /> : "Import"}
        </button>
      </div>
    </form>
  );
}
ImportEmployee.propTypes = {
  handleClosePopup: PropTypes.func
};
