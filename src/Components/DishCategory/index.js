const DishCategory = props => {
  const {categories, handleCategoryClick} = props
  const {menuCategory, menuCategoryId} = categories
  const onClickDish = () => {
    handleCategoryClick(menuCategoryId)
  }

  return (
    <li>
      <button type="button" onClick={onClickDish}>
        {menuCategory}
      </button>
    </li>
  )
}

export default DishCategory
