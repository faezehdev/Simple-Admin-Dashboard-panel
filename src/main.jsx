import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './contexts/app/app-context.jsx'
const theme = localStorage.getItem("theme");
if (theme === "true") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
createRoot(document.getElementById('root')).render(
    <AppProvider>
    <App />
    </AppProvider>

)
