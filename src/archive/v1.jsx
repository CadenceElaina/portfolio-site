import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import App from '../App.jsx'
import ArchiveBanner from './ArchiveBanner.jsx'

// Archived first version of the site, served at /v1/. App.jsx keeps its own inline
// content, so this page stays as it was even as the current site changes.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ArchiveBanner label="Past version · February 2026" />
  </StrictMode>,
)
