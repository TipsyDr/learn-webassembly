import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import '@assets/index.css';
import 'antd/dist/antd.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios, { AxiosContext } from './api/request';
import App from './App';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorBoundaryNode: any = ErrorBoundary;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  },
});

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const axiosValue = useMemo(() => {
    return axios;
  }, []);

  return (
    <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>
  );
};

ReactDOM.render(
  // <React.StrictMode>
  <AxiosProvider>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundaryNode
        fallbackRender={({ error, resetErrorBoundary }: any) => (
          <div>
            There was an error!{' '}
            <button onClick={() => resetErrorBoundary()}>Try again</button>
            <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
          </div>
        )}
      >
        <App />
      </ErrorBoundaryNode>
    </QueryClientProvider>
  </AxiosProvider>,
  // </React.StrictMode>,
  document.getElementById('root'),
);
