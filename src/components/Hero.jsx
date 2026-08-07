import React from 'react'

export default function Hero() {
  return (
    <header style={{ textAlign: 'center', padding: '2.5rem 1rem', backgroundColor: '#f8f9fa', borderRadius: '12px', marginBottom: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '0.5rem' }}>🍽️ Restaurante Gourmet</h1>
      <p style={{ fontSize: '1.1rem', color: '#555', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
        Bienvenido a nuestra experiencia gastronómica. Explora nuestro menú actualizado en tiempo real y gestiona la carta.
      </p>
      <img 
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80" 
        alt="Restaurante Gourmet" 
        style={{ width: '100%', maxHeight: '320px', objectFit: 'cover', borderRadius: '8px' }} 
      />
    </header>
  )
}