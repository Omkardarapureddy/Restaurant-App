import {Component} from 'react'
import DishCategory from '../DishCategory'
import DishList from '../DishList'
import CartItem from '../CartItem'
import Header from '../Header'

class Home extends Component {
  state = {
    categories: [],
    selectedCategory: null,
    dishes: [],
    cart: [],
    totalCartCount: 0,
  }

  componentDidMount() {
    this.fetchData()
  }

  getFormattedData = data => ({
    dishId: data.dish_id,
    dishName: data.dish_name,
    dishPrice: data.dish_price,
    dishImage: data.dish_image,
    dishCurrency: data.dish_currency,
    dishCalories: data.dish_calories,
    dishDescription: data.dish_description,
    dishAvailability: data.dish_Availability,
    addoncat: data.addoncat,
    count: 0,
  })

  fetchData = async () => {
    const apiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const fetchedData = await response.json()

      if (fetchedData && fetchedData[0]?.table_menu_list) {
        const dataFormat = fetchedData[0].table_menu_list.map(item => ({
          menuCategory: item.menu_category,
          menuCategoryId: item.menu_category_id,
          categoryDishes: item.category_dishes.map(this.getFormattedData),
        }))

        const defaultCategory = dataFormat[0]
        this.setState({
          categories: dataFormat,
          selectedCategory: defaultCategory.menuCategoryId,
          dishes: defaultCategory.categoryDishes,
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  fetchDishes = categoryId => {
    const {categories} = this.state
    const selectedCategory = categories.find(
      category => category.menuCategoryId === categoryId,
    )

    if (selectedCategory) {
      this.setState({dishes: selectedCategory.categoryDishes})
    }
  }

  handleCategoryClick = categoryId => {
    this.setState({selectedCategory: categoryId})
    this.fetchDishes(categoryId)
  }

  handleAddToCart = dishId => {
    const {dishes, cart} = this.state
    const selectedDish = dishes.find(dish => dish.dishId === dishId)

    if (selectedDish && selectedDish.dishAvailability) {
      const existingCartItem = cart.find(item => item.id === dishId)

      if (existingCartItem) {
        existingCartItem.quantity += 1
      } else {
        const newCartItem = {
          id: selectedDish.dishId,
          name: selectedDish.dishName,
          quantity: 1,
        }
        this.setState({cart: [...cart, newCartItem]})
      }

      this.setState(prevState => {
        const updatedDishes = prevState.dishes.map(dish =>
          dish.dishId === dishId && dish.dishAvailability
            ? {...dish, count: (dish.count || 0) + 1}
            : dish,
        )

        const updatedCart = prevState.cart.map(item =>
          item.id === dishId ? {...item, quantity: item.quantity + 1} : item,
        )

        return {
          dishes: updatedDishes,
          cart: updatedCart,
          totalCartCount: this.calculateTotalCartCount(updatedCart),
        }
      })
    }
  }

  handleRemoveFromCart = dishId => {
    const {dishes, cart} = this.state
    const selectedDish = dishes.find(dish => dish.dishId === dishId)
    const existingCartItem = cart.find(item => item.id === dishId)

    if (selectedDish && existingCartItem) {
      existingCartItem.quantity -= 1

      this.setState(prevState => {
        const updatedDishes = prevState.dishes.map(dish =>
          dish.dishId === dishId && dish.dishAvailability
            ? {...dish, count: (dish.count || 0) - 1}
            : dish,
        )

        const updatedCart = prevState.cart.map(item =>
          item.id === dishId ? {...item, quantity: item.quantity - 1} : item,
        )

        const filteredCart = updatedCart.filter(item => item.quantity > 0)

        return {
          dishes: updatedDishes,
          cart: filteredCart,
          totalCartCount: this.calculateTotalCartCount(filteredCart),
        }
      })
    }
  }

  calculateTotalCartCount = () => {
    const {cart} = this.state
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  render() {
    const {
      categories,
      selectedCategory,
      dishes,
      cart,
      totalCartCount,
    } = this.state
    console.log(selectedCategory)
    return (
      <div>
        <Header />
        <ul>
          {categories.map(eachCategory => (
            <DishCategory
              key={eachCategory.menuCategoryId}
              categories={eachCategory}
              handleCategoryClick={this.handleCategoryClick}
            />
          ))}
        </ul>
        <ul>
          {dishes.map(item => (
            <DishList
              key={item.dishId}
              dishes={item}
              handleAddToCart={this.handleAddToCart}
              handleRemoveFromCart={this.handleRemoveFromCart}
            />
          ))}
        </ul>

        <div>
          <h2>Cart</h2>
          {cart.map(cartItem => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
          <p>Total Cart Count: {totalCartCount}</p>
        </div>
      </div>
    )
  }
}
export default Home
