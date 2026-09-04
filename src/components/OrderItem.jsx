import { PRODUCT_CATALOG } from '../data/productCatalog';

function OrderItem({ order, onToggleStatus }) {

  const statusLabel = order.status === 'pending' ? 'Pendiente' : 'Listo'

  const handleStatusClick = () => {
    onToggleStatus(order.id)
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
      <div className="order-card-status">
        <button
          type='button'
          className={`order-status-button order-status-button--${order.status}`}
          onClick={handleStatusClick}
        >
          {statusLabel}
        </button>
      </div>
    </article>
  )
}

export default OrderItem
