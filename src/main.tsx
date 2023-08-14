import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import App from './App'

import 'assets/styles/index.scss'
import { queryClient } from 'clients/api'
import { Web3Wrapper } from './clients/web3'
import { ErrorLoggerProvider } from './context/ErrorLogger'
import { ToastContainer } from 'react-toastify'
import { HashRouter } from 'react-router-dom'
import { Layout } from 'components'
import { AuthProvider } from './context/AuthContext'
import { SuccessfulTransactionModalProvider } from './context/SuccessfulTransactionModalContext'
import { MuiThemeProvider } from './theme/MuiThemeProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorLoggerProvider>
      <Web3Wrapper>
        <QueryClientProvider client={queryClient}>
          <MuiThemeProvider>
            <AuthProvider>
              <SuccessfulTransactionModalProvider>
                <HashRouter>
                  <ToastContainer />
                  <Layout>
                    <App />
                  </Layout>
                </HashRouter>
              </SuccessfulTransactionModalProvider>
            </AuthProvider>
          </MuiThemeProvider>
        </QueryClientProvider>
      </Web3Wrapper>
    </ErrorLoggerProvider>
  </React.StrictMode>,
)
