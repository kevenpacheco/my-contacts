import { Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { EditContact } from './pages/EditContact';
import { NewContact } from './pages/NewContact';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/new" component={NewContact} />
      <Route exact path="/edit/:id" component={EditContact} />
    </Switch>
  );
}
