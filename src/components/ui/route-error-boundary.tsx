import React from 'react';
import { ErrorState } from './error-state';
import { ViewState } from '../../types';

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  resetKey?: string;
  onNavigate?: (view: ViewState) => void;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
}

export class RouteErrorBoundary extends React.Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  constructor(props: RouteErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): RouteErrorBoundaryState {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: RouteErrorBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title="Halaman Gagal Dimuat"
          message="Koneksi sempat terputus atau modul halaman belum berhasil dimuat. Silakan coba muat ulang halaman ini."
          onRetry={this.handleRetry}
          onNavigate={this.props.onNavigate}
          fullScreen={false}
        />
      );
    }

    return this.props.children;
  }
}
