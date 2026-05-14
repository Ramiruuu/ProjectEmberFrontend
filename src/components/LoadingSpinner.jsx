import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading your fitness data...</p>
    </div>
  );
};

export default LoadingSpinner;