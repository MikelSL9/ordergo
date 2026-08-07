import OrderItem from './OrderItem';

function OrderList({ orders }) {

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
            />
          ))}
        </>
      )}
    </section>
  )
}
export default OrderList
