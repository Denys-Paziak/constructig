import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./languages/config/i18n";

createRoot(document.getElementById("root")!).render(<App />);
