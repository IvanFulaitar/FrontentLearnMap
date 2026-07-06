import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ padding: 24 }}>
          <Card style={{ padding: 24 }}>
            <h1>Щось пішло не так</h1>
            <p>Сторінка впала під час рендеру. Спробуй оновити застосунок.</p>
            <Button onClick={() => window.location.reload()}>Оновити сторінку</Button>
          </Card>
        </main>
      );
    }

    return this.props.children;
  }
}
