import { useState } from 'react';
import './App.css'

let nextOrderId = 1

function App() {

  const [orders, setOrders] = useState([])
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    pickupDate: false,
    pickupTime: false
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const trimmedName = formData.get('name').trim()
    const trimmedPhone = formData.get('phone').trim()
    const trimmedNotes = formData.get('notes').trim()

    const nextErrors = {
      name: !trimmedName,
      phone: !trimmedPhone,
      pickupDate: !formData.get('pickupDate'),
      pickupTime: !formData.get('pickupTime')
    }

    setErrors(nextErrors)

    if (
      nextErrors.name ||
      nextErrors.phone ||
      nextErrors.pickupDate ||
      nextErrors.pickupTime
    ) {
      return
    }

    const newOrder = {
      id: nextOrderId,
      customerName: trimmedName,
      customerPhone: trimmedPhone,
      pickupDate: formData.get('pickupDate'),
      pickupTime: formData.get('pickupTime'),
      notes: trimmedNotes
    }

    nextOrderId++;

    setOrders((currentOrders) => [...currentOrders, newOrder])

    event.target.reset()
  }

  return (
    <main className='app'>
      <header className='app-header'>
        <h1>OrderGo</h1>
        <p>Gestión rápida de pedidos</p>
      </header>
      <h2>Nuevo pedido:</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor='name'>Nombre completo: </label>
          <input
            type="text"
            id='name'
            name='name'
            required
          />
          {errors.name && <span>El nombre es obligatorio</span>}
        </div>
        <div className='form-field'>
          <label htmlFor='phone'>Teléfono: </label>
          <input
            type="tel"
            id='phone'
            name='phone'
            required
          />
          {errors.phone && <span>El teléfono es obligatorio</span>}
        </div>
        <div className='form-field'>
          <label htmlFor='pickupDate'>Fecha: </label>
          <input
            type="date"
            id='pickupDate'
            name='pickupDate'
            required
          />
          {errors.pickupDate && <span>La fecha es obligatoria</span>}
        </div>
        <div className='form-field'>
          <label htmlFor='pickupTime'>Hora: </label>
          <input
            type="time"
            id='pickupTime'
            name='pickupTime'
            required
          />
          {errors.pickupTime && <span>La hora es obligatoria</span>}
        </div>
        <div className='form-field'>
          <label htmlFor='notes'>Notas: </label>
          <textarea id='notes' name='notes' rows="5"></textarea>
        </div>
        <button type='submit'>Enviar</button>
      </form>
      <section>
        <h2>Pedidos: </h2>
        {orders.map((order) => (
          <p key={order.id}>
            Pedido {order.id}: {order.customerName} - {order.customerPhone} - {order.pickupDate} - {order.pickupTime} - {order.notes}
          </p>
        ))}
      </section>
    </main>
  )
}

export default App
