import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Ledger from './Ledger.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ledger />
  </StrictMode>,
)
