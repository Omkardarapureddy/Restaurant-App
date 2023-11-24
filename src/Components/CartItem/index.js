const CartItem = props => {
  const {cartItem} = props
  const {name, quantity} = cartItem
  return (
    <div>
      {name} - Quantity: {quantity}
    </div>
  )
}

export default CartItem
