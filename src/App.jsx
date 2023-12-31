import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LayoutPage from "./pages/LayoutPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePostPage from "./pages/CreatePostPage";
import BookKeepingPage from "./pages/BookKeepingPage";
//import styles 👇
import "react-modern-drawer/dist/index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<Homepage />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="createpost" element={<CreatePostPage />} />
          <Route path="bookKeeping" element={<BookKeepingPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />{" "}
    </BrowserRouter>
  );
}

export default App;
