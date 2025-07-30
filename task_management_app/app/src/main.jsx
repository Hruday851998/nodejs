import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Tasks from './view/Tasks'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tasks />
  </StrictMode>,
)
