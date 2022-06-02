// import fs from 'fs'
import { Link } from "../Link";
export const getServerSideProps = () => {
  return { message: 'Hello from the server!' }
}

type Props = {
  message: string;
}

const HomePage = ({message}: Props) => {
  return (<div onClick={() => { console.log('hello')}}>
    {message}
    <Link to="/test">Go to test</Link>
  </div>)
}

export default HomePage