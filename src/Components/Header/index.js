import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )
  return (
    <nav>
      <h1>UNI Resto Cafe</h1>
      <Link to="/" className="nav-link">
        Home
      </Link>
      <p>My Orders</p>
      <Link to="/cart" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
          alt="nav cart"
          className="nav-bar-img"
        />
        {renderCartItemsCount()}
      </Link>
      <button
        type="button"
        className="logout-desktop-btn"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
