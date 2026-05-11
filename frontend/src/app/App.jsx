import { RouterProvider } from 'react-router';
import { router } from './routes.jsx';
import { Toaster } from './components/ui/sonner';
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
