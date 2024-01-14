import { InfinitySpin } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="loader">
      <InfinitySpin visible={true} width="150" color="#ffffff" ariaLabel="infinity spin loading" />
    </div>
  )
}

export default Loader