import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { TouchpointProvider } from './contexts/TouchpointContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'
import Commands from './pages/Commands'
import ConfigureTouchpoint from './pages/ConfigureTouchpoint'

function App() {
  return (
    <Router>
      <TouchpointProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/commands" element={<Commands />} />
              <Route path="/configure" element={<ConfigureTouchpoint />} />
            </Routes>
          </Layout>
        </TouchpointProvider>
    </Router>
  )
}

export default App