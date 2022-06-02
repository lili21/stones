import path from 'path';
import { Link } from "../Link"
export const getServerSideProps = () => {
  return { message: 'Hello from the server test!' }
}
const Test = (props) => {
  return (
    <div>
      {props.message}
      <Link to="/">Go Home</Link>
    </div>
  )
}

export default Test
