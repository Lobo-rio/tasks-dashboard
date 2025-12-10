import { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught error", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-900">
                    <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
                    <div className="bg-white p-6 rounded shadow-lg max-w-2xl overflow-auto border border-red-200">
                        <p className="font-semibold text-red-600 mb-2">{this.state.error && this.state.error.toString()}</p>
                        <pre className="text-xs text-slate-500 whitespace-pre-wrap">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Reload Application
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
