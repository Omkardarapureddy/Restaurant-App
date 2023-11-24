const DishList = props => {
  const {dishes, handleAddToCart, handleRemoveFromCart} = props
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
    handleAddToCart(dishId)
  }
  const onClickRemove = () => {
    handleRemoveFromCart(dishId)
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
          <p>{count || 0}</p>
          <button type="button" onClick={onClickAdd}>
            +
          </button>
        </>
      ) : (
        <p>Not Available</p>
      )}
    </li>
  )
}
export default DishList
