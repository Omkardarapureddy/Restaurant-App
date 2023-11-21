const CartItem = ({cartItem}) => (
  <div>
    {cartItem.name} - Quantity: {cartItem.quantity}
  </div>
)

export default CartItem
