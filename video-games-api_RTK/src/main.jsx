import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from 'react-redux' //provider configurado para acceso al store de Redux
import { store } from './store'
import App from "./App.jsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> {/* Acceso al store global a traves del provider */}
      <App />
    </Provider>
  </React.StrictMode>,
)