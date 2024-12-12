import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link
    aria-label="this is the link to redirect to home page"
    to="/"
    className="text-2xl"
  >
    BookStore
  </Link>
  )
}

export default Logo
