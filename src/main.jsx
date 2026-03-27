import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThumbStudio from './thumbstudio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThumbStudio />
  </StrictMode>
)
