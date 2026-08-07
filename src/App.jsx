import React, { useState } from 'react'
import Hero from './components/Hero'
import Menu from './components/Menu'
import PlatilloForm from './components/PlatilloForm'

export default function App() {
  const [reload, setReload] = useState(0)

  const handlePlatilloAgregado = () => {
    setReload((prev) => prev + 1)
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      <Hero />
      <PlatilloForm onPlatilloAgregado={handlePlatilloAgregado} />
      <Menu reloadTrigger={reload} />
    </div>
  )
}