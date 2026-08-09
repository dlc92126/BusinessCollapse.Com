import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 24px', maxWidth: '800px', margin: '60px auto', background: '#0F172A', color: '#FFF', borderRadius: '12px', border: '1px solid #FF2A4B', fontFamily: 'sans-serif' }}>
          <h2 style={{ color: '#FF3B5C', marginBottom: '12px', fontSize: '1.8rem' }}>⚠️ Application Runtime Exception Detected</h2>
          <p style={{ color: '#94A3B8', marginBottom: '20px', lineHeight: 1.5 }}>
            A client-side JavaScript error occurred while rendering the application state.
          </p>
          
          <div style={{ background: '#070A0F', padding: '16px', borderRadius: '8px', border: '1px solid #334155', fontFamily: 'monospace', fontSize: '0.85rem', color: '#F87171', overflowX: 'auto', marginBottom: '20px' }}>
            <strong>{this.state.error && this.state.error.toString()}</strong>
            <pre style={{ marginTop: '10px', color: '#94A3B8', fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </div>

          <button
            onClick={() => {
              try { localStorage.clear(); } catch(e) {}
              window.location.reload();
            }}
            style={{ background: '#7C3AED', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            🔄 Reset Application Cache & Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);

