import CartContext from '../../context/CartContext'

const DishList = props => (
  <CartContext.Consumer>
    {value => {
      const {dishes, handleAddToQuantity, handleRemoveFromQuantity} = props
      const {
        dishId,
        dishName,
        dishImage,
        dishPrice,
        dishCurrency,
        dishCalories,
        dishDescription,
        dishAvailability,
        count,
      } = dishes
      const onClickAdd = () => {
        handleAddToQuantity(dishId)
      }
      const onClickRemove = () => {
        handleRemoveFromQuantity(dishId)
      }

      const {addCartItem} = value
      const onClickAddToCart = () => {
        addCartItem({...dishes, quantity: count || 1})
      }

      return (
        <li>
          <h1>{dishName}</h1>
          <img src={dishImage} alt={dishName} />
          <p>
            {dishCurrency} {dishPrice}
          </p>
          <p> {dishCalories} Calories</p>
          <p>{dishDescription}</p>
          {dishAvailability ? (
            <>
              <button type="button" onClick={onClickRemove}>
                -
              </button>
              <p>{count !== undefined ? count : 1}</p>
              <button type="button" onClick={onClickAdd}>
                +
              </button>
              <button
                type="button"
                className="button add-to-cart-btn"
                onClick={onClickAddToCart}
              >
                ADD TO CART
              </button>
            </>
          ) : (
            <p>Not Available</p>
          )}
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default DishList
