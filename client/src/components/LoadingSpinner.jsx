export default function LoadingSpinner({ size = 'md', text }) {
  return (
    <div className="loading-container">
      <div className={`spinner ${size === 'sm' ? 'spinner-sm' : size === 'lg' ? 'spinner-lg' : ''}`} />
      {text && <p>{text}</p>}
    </div>
  );
}
