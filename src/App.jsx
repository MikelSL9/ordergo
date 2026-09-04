import { useState } from 'react';
import './App.css'
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';

let nextOrderId = 1

function App() {

  const [orders, setOrders] = useState([])

  const handleCreateOrder = (orderData) => {
    const newOrder = {
      id: nextOrderId,
      ...orderData,
      status: 'pending',
    }

    setOrders((currentOrders) => [...currentOrders, newOrder])
    nextOrderId++;
  }

  const handleToggleStatus = (orderId) => {
    setOrders((currentOrders) => currentOrders.map((order) => {
      if (order.id !== orderId) {
        return order
      }

      return {
        ...order,
        status: order.status === 'pending' ? 'delivered' : 'pending'
      }
    }))
  }

  return (
    <main className='app'>
      <header className='app-header'>
        <h1>OrderGo</h1>
        <p>Gestión rápida de pedidos</p>
      </header>
      <OrderForm
        onCreateOrder={handleCreateOrder}
      />

      <OrderList
        orders={orders}
        onToggleStatus={handleToggleStatus}
      />
    </main>
  )
}

export default App
