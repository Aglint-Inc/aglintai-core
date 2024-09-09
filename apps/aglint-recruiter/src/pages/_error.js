import React from 'react';
// import ErrorBoundary from '../components/ErrorBoundary';

class CustomError extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    const errorMessage = err ? err.message : 'An unexpected error has occurred';
    return { statusCode, errorMessage };
  }

  render() {
    const { statusCode, errorMessage } = this.props;
    return (
      <div>
        <h1>Error {statusCode}</h1>
        <p>{statusCode === 404 ? 'Page not found' : errorMessage}</p>
        {process.env.NODE_ENV === 'development' && (
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        )}
      </div>
    );
  }
}

const ErrorPageWithBoundary = (props) => (
  // <ErrorBoundary>
  <CustomError {...props} />
  // </ErrorBoundary>
);

export default ErrorPageWithBoundary;
