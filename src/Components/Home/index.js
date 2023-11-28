import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import DishCategory from '../DishCategory'
import DishList from '../DishList'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    categories: [],
    selectedCategory: null,
    dishes: [],
    quantity: 1, // Changed name to totalQuantity
    apiStatus: apiStatusConstants.initial,
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
  })

  fetchData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
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
          apiStatus: apiStatusConstants.success,
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

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

  handleAddToQuantity = dishId => {
    const {dishes, quantity} = this.state
    const selectedDish = dishes.find(dish => dish.dishId === dishId)

    if (selectedDish && selectedDish.dishAvailability) {
      this.setState(prevState => {
        const updatedDishes = prevState.dishes.map(dish =>
          dish.dishId === dishId && dish.dishAvailability
            ? {...dish, count: (dish.count || 0) + 1}
            : dish,
        )

        return {
          dishes: updatedDishes,
          quantity: quantity + 1,
        }
      })
    }
  }

  handleRemoveFromQuantity = dishId => {
    const {dishes, quantity} = this.state
    const selectedDish = dishes.find(dish => dish.dishId === dishId)

    if (selectedDish) {
      this.setState(prevState => {
        const updatedDishes = prevState.dishes.map(dish =>
          dish.dishId === dishId && dish.dishAvailability
            ? {...dish, count: Math.max((dish.count || 0) - 1, 0)}
            : dish,
        )

        return {
          dishes: updatedDishes,
          quantity: Math.max(quantity - 1, 0),
        }
      })
    }
  }

  renderSuccessView = () => {
    const {categories, dishes, selectedCategory} = this.state
    console.log(selectedCategory)
    return (
      <>
        <Header />
        <ul>
          {categories.map(category => (
            <DishCategory
              key={category.menuCategoryId}
              categories={category}
              handleCategoryClick={this.handleCategoryClick}
            />
          ))}
        </ul>
        <ul>
          {dishes.map(item => (
            <DishList
              key={item.dishId}
              dishes={item}
              handleAddToQuantity={this.handleAddToQuantity}
              handleRemoveFromQuantity={this.handleRemoveFromQuantity}
            />
          ))}
        </ul>
      </>
    )
  }

  renderAllSuccess = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderAllSuccess()}</div>
  }
}

export default Home
