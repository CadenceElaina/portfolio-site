import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VariantSwitcher, { ScrollToHash } from './VariantSwitcher.jsx'

// Redesign comparison: ?v=ledger | graphite | tiles. No param renders the current site.
// Each variant is lazy-loaded so only its own CSS ends up on the page.
const VARIANTS = [
  { key: 'current', label: 'Current', load: () => import('./App.jsx') },
  { key: 'ledger', label: 'Ledger · Bars', load: () => import('./variants/Ledger.jsx') },
  { key: 'ledger-wave', label: 'Ledger · Wave', load: () => import('./variants/LedgerWave.jsx') },
  { key: 'graphite', label: 'Graphite', load: () => import('./variants/Graphite.jsx') },
  { key: 'tiles', label: 'Tiles', load: () => import('./variants/Tiles.jsx') },
]

const requested = new URLSearchParams(window.location.search).get('v')
const variant = VARIANTS.find((v) => v.key === requested) ?? VARIANTS[0]
const Page = lazy(variant.load)
const showSwitcher = import.meta.env.DEV || requested !== null

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      <Page />
      <ScrollToHash />
    </Suspense>
    {showSwitcher && <VariantSwitcher variants={VARIANTS} active={variant.key} />}
  </StrictMode>,
)
