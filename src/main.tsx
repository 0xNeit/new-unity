import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'assets/styles/index.scss'
import { Web3Wrapper } from 'clients/web3'
import { ErrorLoggerProvider } from 'context/ErrorLogger'
import { ToastContainer } from 'react-toastify'
import { HashRouter } from 'react-router-dom'
// import { AnalyticsProvider } from 'context/Analytics'
import { AuthProvider } from 'context/AuthContext'
import { SuccessfulTransactionModalProvider } from 'context/SuccessfulTransactionModalContext'
import { MuiThemeProvider } from 'theme/MuiThemeProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorLoggerProvider>
      <Web3Wrapper>
        <MuiThemeProvider>
          <AuthProvider>
            <SuccessfulTransactionModalProvider>
              <HashRouter>
                <ToastContainer />

                <App />
              </HashRouter>
            </SuccessfulTransactionModalProvider>
          </AuthProvider>
        </MuiThemeProvider>
      </Web3Wrapper>
    </ErrorLoggerProvider>
  </React.StrictMode>,
)
