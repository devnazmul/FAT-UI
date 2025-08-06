// ===========================================
// #00129
// ===========================================

import PropTypes from "prop-types";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function CustomToaster({
  t,
  type,
  text,
  errors = {},
  pageId = ""
}) {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      toast.dismiss(t?.id);
    }, [4000]);

    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${
        type === "error" && "border-red-600 bg-red-500  hover:border-red-500"
      } ${
        type === "success" &&
        "border-green-600 bg-green-500  hover:border-green-500"
      } ${
        type === "info" &&
        "border-indigo-600 bg-indigo-500 hover:border-indigo-500"
      } ${
        t?.visible ? "animate-enter" : "animate-leave"
      } border max-w-md w-full duration-300 bg-base-100 shadow-md rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-3">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            {/* {type === "error" && (
              <p className="text-sm font-medium text-red-600">Error</p>
            )} */}
            {type === "success" && (
              <p className="text-sm font-medium text-white">Done</p>
            )}
            {type === "info" && (
              <p className="text-sm font-medium text-white ">Tips</p>
            )}
            <p className="mt-1 text-sm text-white">
              {type !== "error" ? (
                <>
                  {pageId ? `${pageId} - ` : ""}
                  {text}
                </>
              ) : (
                <>
                  {Object.keys(errors).length > 0 ? (
                    <>
                      <h5 className="font-semibold text-white">
                        {pageId ? `${pageId} - ` : ""}There is some errors:
                      </h5>
                      <ul className="list-decimal ml-5 text-white">{text}</ul>
                      <ul className="list-decimal ml-5 text-white">
                        {Object.keys(errors).map((field) =>
                          errors[field].map((errorMessage, index) => (
                            <li key={`${field}-${index}`}>{errorMessage}</li>
                          ))
                        )}
                      </ul>
                    </>
                  ) : (
                    <>
                      <h5 className="font-semibold">There is some errors:</h5>
                      <ul className="list-decimal ml-5 text-white">{text}</ul>
                    </>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

CustomToaster.propTypes = {
  type: PropTypes.oneOf(["error", "success", "info"]).isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  pageId: PropTypes.string,
  errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  t: PropTypes.object.isRequired
};
