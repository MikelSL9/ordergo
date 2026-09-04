import OrderItem from './OrderItem';

function OrderList({ orders, onToggleStatus }) {

  return (
    <section className='orders-list'>
      {orders.length === 0 ? (
        <p>No hay pedidos todavía</p>
      ) : (
        <>
          <h2>Pedidos: </h2>
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </>
      )}
    </section>
  )
}
export default OrderList
