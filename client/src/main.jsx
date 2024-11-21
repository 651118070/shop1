import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";

import { PostHogProvider} from 'posthog-js/react'

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
}
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
    <PostHogProvider 
      apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <App />
    </PostHogProvider>
      <Toaster />
    </Provider>
  </BrowserRouter>
);
