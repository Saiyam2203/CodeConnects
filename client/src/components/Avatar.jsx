import { getInitials } from '../utils/helpers';

export default function Avatar({ src, name, size = 'md' }) {
  const sizeClass = size === 'sm' ? 'avatar-sm'
    : size === 'lg' ? 'avatar-lg'
    : size === 'xl' ? 'avatar-xl'
    : size === '2xl' ? 'avatar-2xl'
    : '';

  return (
    <div className={`avatar ${sizeClass}`}>
      {src ? (
        <img src={src} alt={name || 'User'} onError={(e) => { e.target.style.display = 'none'; }} />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}
