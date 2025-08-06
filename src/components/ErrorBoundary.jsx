import PropTypes from "prop-types";
import { Component } from "react";

// The actual error boundary must be a class component
class ErrorBoundaryClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    // You can also log the error to an error reporting service here
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback({
        error: this.state.error,
        errorInfo: this.state.errorInfo,
        reset: () =>
          this.setState({
            hasError: false,
            error: null,
            errorInfo: null
          })
      });
    }

    return this.props.children;
  }
}

ErrorBoundaryClass.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.func.isRequired
};

// Functional component that provides the default error UI
const DefaultErrorFallback = ({ error, errorInfo, reset }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className=" max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong
        </h1>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 max-w-[300px] sm:max-w-[500px] md:max-w-[800px] lg:max-w-[1000px] overflow-x-auto">
          <p className="text-red-700 font-medium mb-2">
            {error?.message || "An unexpected error occurred"}
          </p>
          {errorInfo && (
            <div className="text-left max-w-full ">
              <div className="cursor-pointer text-gray-600 mb-2">
                Error Details
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap text-sm bg-base-300 p-4 rounded border border-red-100 ">
                {errorInfo.componentStack}
              </pre>
            </div>
          )}
        </div>

        <div className={`flex justify-end`}>
          <button
            onClick={() => {
              reset();
              window.location.reload();
            }}
            className="btn btn-primary w-28"
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  );
};

DefaultErrorFallback.propTypes = {
  error: PropTypes.object,
  errorInfo: PropTypes.object,
  reset: PropTypes.func.isRequired
};

// Functional wrapper component
const ErrorBoundary = ({
  children,
  FallbackComponent = DefaultErrorFallback
}) => {
  return (
    <ErrorBoundaryClass fallback={FallbackComponent}>
      {children}
    </ErrorBoundaryClass>
  );
};

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  FallbackComponent: PropTypes.func
};

export default ErrorBoundary;
