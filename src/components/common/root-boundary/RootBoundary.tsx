import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const RootBoundary = () => {
  const error = useRouteError();

  console.log('%c⇒ error', 'color: #89DDF7', error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
};