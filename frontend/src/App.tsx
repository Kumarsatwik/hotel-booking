import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={<span className="text-4xl">Home Page</span>}
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
