import React, { useState } from 'react'

export default function PlatilloForm({ onPlatilloAgregado }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen_url: ''
  })

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

  const validateField = (name, value) => {
    let errorMsg = ''
    if (name === 'nombre') {
      if (!value.trim()) errorMsg = 'El nombre es obligatorio.'
      else if (value.trim().length < 3) errorMsg = 'El nombre debe tener al menos 3 caracteres.'
    }
    if (name === 'descripcion') {
      if (!value.trim()) errorMsg = 'La descripción es obligatoria.'
    }
    if (name === 'precio') {
      if (!value) errorMsg = 'El precio es obligatorio.'
      else if (parseFloat(value) <= 0) errorMsg = 'El precio debe ser mayor a 0.'
    }
    return errorMsg
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    const fieldError = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: fieldError }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {
      nombre: validateField('nombre', formData.nombre),
      descripcion: validateField('descripcion', formData.descripcion),
      precio: validateField('precio', formData.precio),
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some((err) => err !== '')) return

    setSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/platillos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          precio: parseFloat(formData.precio),
          imagen_url: formData.imagen_url || 'https://via.placeholder.com/300'
        }),
      })

      if (!response.ok) throw new Error('Error al registrar el platillo.')

      setFormData({ nombre: '', descripcion: '', precio: '', imagen_url: '' })
      onPlatilloAgregado()
      alert('¡Platillo registrado con éxito!')
    } catch (err) {
      alert(`Error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section style={{ maxWidth: '500px', margin: '0 auto 2.5rem auto', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#ffffff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginTop: 0, textAlign: 'center', color: '#333' }}>Registrar Nuevo Platillo</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.3rem' }}>Nombre del Platillo:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: errors.nombre ? '1px solid red' : '1px solid #ccc' }} />
          {errors.nombre && <small style={{ color: 'red', display: 'block', marginTop: '0.2rem' }}>{errors.nombre}</small>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.3rem' }}>Descripción:</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: errors.descripcion ? '1px solid red' : '1px solid #ccc' }} />
          {errors.descripcion && <small style={{ color: 'red', display: 'block', marginTop: '0.2rem' }}>{errors.descripcion}</small>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.3rem' }}>Precio ($):</label>
          <input type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: errors.precio ? '1px solid red' : '1px solid #ccc' }} />
          {errors.precio && <small style={{ color: 'red', display: 'block', marginTop: '0.2rem' }}>{errors.precio}</small>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.3rem' }}>URL de la Imagen (Opcional):</label>
          <input type="text" name="imagen_url" value={formData.imagen_url} onChange={handleChange} placeholder="https://..." style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <button type="submit" disabled={submitting} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          {submitting ? 'Guardando...' : 'Guardar Platillo'}
        </button>
      </form>
    </section>
  )
}