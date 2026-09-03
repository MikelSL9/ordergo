import { PRODUCT_CATALOG } from '../data/productCatalog';

function OrderItem({ order, onToggleFulfillmentStatus }) {

  const fulfillmentStatusLabel = order.fulfillmentStatus === 'pending' ? 'Pendiente' : 'Entregado'

  const handleFulfillmentStatusClick = () => {
    onToggleFulfillmentStatus(order.id)
  }

  return (
    <article className='order-card'>
      <header className="order-card-header">
        <h3>Pedido {order.id}</h3>
        <time dateTime={`${order.pickupDate}T${order.pickupTime}`}>
          {order.pickupDate} · {order.pickupTime}
        </time>
      </header>

      <div className="order-card-customer">
        <p>
          <strong>{order.customerName}</strong>
        </p>
        <a href={`tel:${order.customerPhone}`}>
          {order.customerPhone}
        </a>
      </div>

      <ul>
        {order.products.map((product) => {
          const catalogProduct = PRODUCT_CATALOG.find(
            (catalogProduct) => catalogProduct.id === product.productId
          )
          return (
            <li key={product.productId}>
              {catalogProduct.name}: {product.quantity}
            </li>
          )
        })}
      </ul>
      <p>{order.notes}</p>
      <button
        type='button'
        className={`order-fulfillment-status-button order-fulfillment-status-button--${order.fulfillmentStatus}`}
        aria-pressed={order.fulfillmentStatus === 'delivered'}
        onClick={handleFulfillmentStatusClick}
      >
        {fulfillmentStatusLabel}
      </button>
    </article>
  )
}

export default OrderItem
