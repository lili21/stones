// import fs from 'fs'
export const getServerSideProps = () => {
  return { message: 'Hello from the server!' }
}

type Props = {
  message: string;
}

const HomePage = ({message}: Props) => {
  return (<div onClick={() => { console.log('hello')}}>
    {message}
  </div>)
}

export default HomePage