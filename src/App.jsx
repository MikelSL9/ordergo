import { useState } from 'react';
import './App.css'

let nextOrderId = 1

function App() {

  const [orders, setOrders] = useState([])
  const [errorName, setErrorName] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const trimmedName = formData.get('name').trim()
    const trimmedPhone = formData.get('phone').trim()

    //Campo vacio aparece el <span> con el error
    setErrorName(!trimmedName)
    setErrorPhone(!trimmedPhone)

    //Campo vacio bloquea el submit
    if (!trimmedName || !trimmedPhone) {
      return
    }

    const newOrder = {
      id: nextOrderId,
      customerName: trimmedName,
      customerPhone: trimmedPhone
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

          {errorName && <span>El nombre es obligatorio</span>}
        </div>
        <div className='form-field'>
          <label htmlFor='phone'>Teléfono: </label>
          <input
            type="tel"
            id='phone'
            name='phone'
            required
          />

          {errorPhone && <span>El teléfono es obligatorio</span>}
        </div>

        <button type='submit'>Enviar</button>
      </form>

      <section>
        <h2>Pedidos: </h2>
        {orders.map((order) => (
          <p key={order.id}>
            Pedido {order.id}: {order.customerName} - {order.customerPhone}
          </p>
        ))}
      </section>

    </main>
  )
}

export default App
