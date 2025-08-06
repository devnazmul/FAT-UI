import toast from "react-hot-toast";
import Swal from "sweetalert2";
import CustomToaster from "../components/CustomToaster";

export const handleApiError = (
  error,
  errorId = "#00121",
  isOnlyMessage = false
) => {
  let errorMessage = "An unexpected error occurred";
  let errors = [];

  const stackTrace = new Error().stack;
  console.warn({ stackTrace });

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage =
      error.response.data?.message || "Server responded with an error";
    errors = error.response.data?.errors || [];
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = "No response received from the server";
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = error.message || "Error in setting up request";
  }

  if (error.code === "ECONNABORTED") {
    // Network error specific handling
    errorMessage =
      "A network error occurred. Please check your internet connection and try again.";
  }
  if (error.code === "ERR_BAD_REQUEST") {
    // Network error specific handling
    errorMessage =
      "A network error occurred. Please check your internet connection and try again.";
  }
  if (error.code === "ERR_CANCELED") {
    return;
  }
  if (error.request && error.code !== "ECONNABORTED" && !error.response) {
    return;
  }

  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    if (error?.response?.status !== 422) {
      if (
        JSON.parse(localStorage.getItem("userData"))?.email_verified_at !== null
      ) {
        let message = error?.response?.data?.message;
        Swal.fire({
          title: "Warning!",
          text: message
            ? isOnlyMessage
              ? JSON.parse(error?.response?.data?.message?.split("-")[2])
                  ?.message
              : message.split("-")[2]
            : "Something went wrong!",
          icon: "warning"
        });
      }
    } else {
      let message = error?.response?.data?.message;

      const popupHTML = `
      <div>
        <h1>${message}</h1>
        <ul>
        ${Object.keys(error?.response?.data?.errors || {})
          .map((err, i) => {
            return `
              <li>${i + 1}.${error?.response?.data?.errors[err][0]}</li>
            `;
          })
          .join("")}
        </ul>
      </div>
      `;
      Swal.fire({
        title: "Error!",
        html: popupHTML,
        icon: "warning"
      });
    }
  } else {
    if (
      JSON.parse(localStorage.getItem("userData"))?.email_verified_at !== null
    ) {
      toast.custom((t) => (
        <CustomToaster
          t={t}
          type={"error"}
          text={`ID: ${errorId} - ${
            error?.response?.data?.message ||
            errorMessage ||
            "Something went wrong! please contact customer care."
          }`}
          errors={errors}
        />
      ));
    }
  }
};
