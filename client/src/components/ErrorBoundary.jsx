import { useRouteError } from 'react-router-dom';

function ErrorBoundary() {
  const error = useRouteError();

  console.log('Error: ', error);

  return (
    <div className="error">
      <h2>{error.message}</h2>
      <Link to="/">Przejdź do strony głównej</Link>
    </div>
  );
}

export default ErrorBoundary