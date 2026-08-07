import React, { useEffect, useState } from 'react'

export default function Menu({ reloadTrigger }) {
  const [platillos, setPlatillos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

  useEffect(() => {
    const fetchPlatillos = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_URL}/platillos`)
        if (!response.ok) throw new Error('No se pudo conectar con la API del restaurante.')
        
        const data = await response.json()
        setPlatillos(data)
      } catch (err) {
        setError(err.message || 'Error al cargar el menú.')
      } finally {
        setLoading(false)
      }
    }

    fetchPlatillos()
  }, [reloadTrigger, API_URL])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ fontSize: '1.2rem', color: '#007bff' }}>⏳ Cargando datos desde la API REST...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#ffe6e6', borderRadius: '8px', color: '#d9534f' }}>
        <h3>❌ Error al cargar datos</h3>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <section style={{ padding: '1rem 0' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Menú del Restaurante</h2>
      
      {platillos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No hay platillos registrados aún.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {platillos.map((item) => (
            <div key={item.id || item._id} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              {item.imagen_url && (
                <img src={item.imagen_url} alt={item.nombre} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px' }} />
              )}
              <h3 style={{ marginTop: '0.8rem', color: '#222' }}>{item.nombre}</h3>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>{item.descripcion}</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#e63946', marginTop: '0.5rem' }}>
                ${Number(item.precio).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}