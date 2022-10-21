import Nav from "./Nav"

export const Layout = ({children}) => {
  return (
    <div className='m-8 lg:mx-48'>
        <Nav />
        {children}
    </div>
  )
}
