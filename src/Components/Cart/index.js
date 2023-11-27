import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        removeAllCartItems,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const showEmptyView = cartList.length === 0

      const onClickRemoveBtn = () => {
        removeAllCartItems()
      }

      const handleIncrement = itemId => {
        incrementCartItemQuantity(itemId)
      }

      const handleDecrement = itemId => {
        decrementCartItemQuantity(itemId)
      }

      const handleRemove = itemId => {
        removeCartItem(itemId)
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <div className="empty-cart">
                <img
                  src="path-to-empty-cart-image.png"
                  alt="empty-cart"
                  className="empty-cart-image"
                />
                <p>Your cart is empty.</p>
              </div>
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button type="button" onClick={onClickRemoveBtn}>
                  Remove All
                </button>
                <CartItem
                  cartList={cartList}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onRemove={handleRemove}
                />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
