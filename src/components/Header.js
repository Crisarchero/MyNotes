import { Link } from 'react-router-dom'

const Header = (props) => {
  return (
    <div>
      <header className={"navbar bg-primary shadow "}>
        <Link to="/">
          <h1 className={'text-light text-decoration-none'}>{props.title}</h1>
        </Link>
        <Link to ="/settings" className = "text-light mx-2">Account Settings</Link>
      </header>
    </div>
  )
}

Header.defaultProps = {
  title: 'MyNotes'
}

export default Header