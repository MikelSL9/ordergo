import { useState } from 'react';
import { PRODUCT_CATALOG } from '../data/productCatalog';

function OrderForm({ onCreateOrder }) {

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    pickupDate: false,
    pickupTime: false,
    products: false,
    quantities: false
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const trimmedName = formData.get('name').trim()
    const trimmedPhone = formData.get('phone').trim()
    const trimmedNotes = formData.get('notes').trim()

    const productsWithQuantity = PRODUCT_CATALOG.map((product) => {
      const inputName = `quantity-${product.id}`
      const quantity = Number(formData.get(inputName))

      return {
        productId: product.id,
        quantity: quantity
      }
    })

    const hasInvalidQuantity = productsWithQuantity.some((product) => !Number.isInteger(product.quantity) || product.quantity < 0)

    const selectedProducts = productsWithQuantity.filter((product) => product.quantity > 0)

    const nextErrors = {
      name: !trimmedName,
      phone: !trimmedPhone,
      pickupDate: !formData.get('pickupDate'),
      pickupTime: !formData.get('pickupTime'),
      products: selectedProducts.length === 0 && !hasInvalidQuantity,
      quantities: hasInvalidQuantity
    }

    setErrors(nextErrors)

    if (
      nextErrors.name ||
      nextErrors.phone ||
      nextErrors.pickupDate ||
      nextErrors.pickupTime ||
      nextErrors.products ||
      nextErrors.quantities
    ) {
      return
    }

    const orderData = {
      customerName: trimmedName,
      customerPhone: trimmedPhone,
      pickupDate: formData.get('pickupDate'),
      pickupTime: formData.get('pickupTime'),
      products: selectedProducts,
      notes: trimmedNotes
    }

    onCreateOrder(orderData)
    event.target.reset()
  }

  return (
    <section>
      <h2>Nuevo pedido: </h2>
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

        <fieldset>
          <legend>Productos</legend>
          <div className='products-grid'>
            {PRODUCT_CATALOG.map((product) => (
              <div className="product-field" key={product.id}>
                <label htmlFor={`quantity-${product.id}`}>
                  {product.name}
                </label>

                <input
                  type="number"
                  id={`quantity-${product.id}`}
                  name={`quantity-${product.id}`}
                  min="0"
                  step="1"
                  defaultValue="0"
                />
              </div>
            ))}
          </div>
          {errors.products && (
            <span>Selecciona al menos un producto</span>
          )}
          {errors.quantities && (
            <span>Cantidad inválida</span>
          )}
        </fieldset>
        <button type='submit'>Enviar</button>
      </form>
    </section>

  )
}

export default OrderForm
