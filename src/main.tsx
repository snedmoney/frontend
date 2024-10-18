import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./providers/provider.tsx";
import "@/styles/globals.css";
import { ThemeProvider } from "./providers/theme/themeProvider.tsx";
import { PaymentWidgetProvider } from "./providers/paymentWidget/paymentWidgetProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Provider>
          <PaymentWidgetProvider>
            <App />
          </PaymentWidgetProvider>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
