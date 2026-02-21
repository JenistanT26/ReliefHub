import { RouterProvider } from 'react-router';
import { router } from './routes.jsx';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
