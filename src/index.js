import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';
import theme from './theme';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert } from '@material-ui/lab';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <CssBaseline />
      <RecoilRoot>
        <Suspense fallback={<CircularProgress />}>
          <ErrorBoundary
            fallback={<Alert severity="error">Something is broken :(</Alert>}
          >
            <App />
          </ErrorBoundary>
        </Suspense>
      </RecoilRoot>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

reportWebVitals();
