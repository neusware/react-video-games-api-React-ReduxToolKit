import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from 'react-redux' //provider configurado para acceso al store de Redux
import { store } from './store'
import App from "./App.jsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Accceso al store */}
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>,
)