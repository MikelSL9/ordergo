import { useState } from 'react';
import './App.css'

function App() {

  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [submittedCustomerName, setSubmittedCustomerName] = useState('')
  const [submittedCustomerPhone, setSubmittedCustomerPhone] = useState('')
  const [errorName, setErrorName] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = customerName.trim()
    const trimmedPhone = customerPhone.trim()

    setErrorName(!trimmedName)
    setErrorPhone(!trimmedPhone)

    if (!trimmedName || !trimmedPhone) {
      return
    }

    setSubmittedCustomerName(trimmedName)
    setSubmittedCustomerPhone(trimmedPhone)
    setCustomerName('')
    setCustomerPhone('')
  }

  return (
    <main className='app'>
      <header className='app-header'>
        <h1>OrderGo</h1>
        <p>Gestión rápida de pedidos</p>
      </header>
      <h2>Nuevo pedido:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor='name'>Nombre completo: </label>
          <input
            type="text"
            id='name'
            name='name'
            required
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          />

          {errorName && (
            <span>El nombre no es válido</span>
          )}
        </div>
        <div className='form-field'>
          <label htmlFor='phone'>Teléfono: </label>
          <input
            type="tel"
            id='phone'
            name='phone'
            required
            value={customerPhone}
            onChange={(event) => setCustomerPhone(event.target.value)}
          />

          {errorPhone && (
            <span>El teléfono no es válido</span>
          )}
        </div>
        <button type='submit'>Enviar</button>
      </form>

      {submittedCustomerName && (
        <p>Último cliente registrado: {submittedCustomerName} - {submittedCustomerPhone}</p>
      )}

    </main>
  )
}

export default App
