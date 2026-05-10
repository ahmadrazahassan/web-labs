import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import CreateItem from './pages/CreateItem.jsx';
import ItemsList from './pages/ItemsList.jsx';
import ItemDetail from './pages/ItemDetail.jsx';
import EditItem from './pages/EditItem.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="items" element={<ItemsList />} />
        <Route path="items/new" element={<CreateItem />} />
        <Route path="items/:id" element={<ItemDetail />} />
        <Route path="items/:id/edit" element={<EditItem />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
