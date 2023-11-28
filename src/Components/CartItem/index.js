const CartItem = props => {
  const {cartList, onIncrement, onDecrement, onRemove} = props

  return (
    <div className="cart-item-container">
      {cartList.map(cart => (
        <div key={cart.dishId} className="cart-item">
          <img src={cart.dishImage} alt={cart.dishName} />
          <p>{cart.dishName}</p>
          <p>Quantity: {cart.quantity}</p>
          <button type="button" onClick={() => onIncrement(cart.id)}>
            +
          </button>
          <button type="button" onClick={() => onDecrement(cart.id)}>
            -
          </button>
          <button type="button" onClick={() => onRemove(cart.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

export default CartItem
