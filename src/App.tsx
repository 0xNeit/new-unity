import { useEffect, useState } from 'react'
import { Switch, Redirect, Route, useLocation, useHistory } from 'react-router-dom'
import { routes } from 'constants/routing'
import { useAuth } from 'context/AuthContext'
import Vaults from 'pages/Vault'
import 'assets/styles/App.scss'

const App = () => {
  const { accountAddress } = useAuth();
  const location = useLocation();
  const history = useHistory();

  // Redirect to account page if user has already connected their wallet and is
  // visiting the dashboard. If they refresh the page while being on the
  // dashboard, the redirection will not happen
  useEffect(() => {
    if (!!accountAddress && location.pathname === routes.dashboard.path && history.length <= 2) {
      history.replace(routes.account.path);
    }
  }, [location, accountAddress, history]);

  return (
    <Switch>
      <Route exact path={routes.vaults.path} component={Vaults} />

      <Redirect to={routes.dashboard.path} />
    </Switch>
  )
}

export default App
