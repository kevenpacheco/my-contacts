import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { EditContact } from './pages/EditContact';
import { NewContact } from './pages/NewContact';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Routes>
  );
}
