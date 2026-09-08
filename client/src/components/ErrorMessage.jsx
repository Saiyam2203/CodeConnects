export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="error-message">
      <span>⚠️</span>
      <span>{message}</span>
    </div>
  );
}
