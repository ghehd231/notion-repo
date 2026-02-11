"use client";
import { Component, ErrorInfo, ReactNode } from "react";
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 text-center">
            <h2 className="text-lg font-semibold text-cyan-200">
              Something went wrong
            </h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
            >
              Try again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
