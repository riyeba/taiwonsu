import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Members from "./Members";
import ResponsiveAppBar from "./Nav";
import WelcomeSpeech from "./WelcomeSpeech";
import FormEditor from "./FormEdit";
import Footer from "./FooterPage";
import FormSubmit from "./FormSubmit";
import About from "./About";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<WelcomeSpeech />} />
          <Route path="/register" element={<FormSubmit />} />
          <Route path="/info" element={<Members />} />
          <Route path="/edit" element={<FormEditor />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </div>
  );
}

export default App;
