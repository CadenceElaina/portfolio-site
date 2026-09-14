import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VariantSwitcher, { ScrollToHash } from './VariantSwitcher.jsx'

// Redesign comparison: ?v=ledger | console | studio. No param renders the current site.
// Each variant is lazy-loaded so only its own CSS ends up on the page.
const VARIANTS = [
  { key: 'current', label: 'Current', load: () => import('./App.jsx') },
  { key: 'ledger', label: '1 · Ledger', load: () => import('./variants/Ledger.jsx') },
  { key: 'console', label: '2 · Console', load: () => import('./variants/Console.jsx') },
  { key: 'studio', label: '3 · Studio', load: () => import('./variants/Studio.jsx') },
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
