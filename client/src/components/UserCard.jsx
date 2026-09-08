import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import { truncateText } from '../utils/helpers';

export default function UserCard({ user, action }) {
  const navigate = useNavigate();

  return (
    <div
      className="user-card"
      onClick={() => navigate(`/profile/${user.id}`)}
      id={`user-card-${user.id}`}
    >
      <Avatar src={user.profile_image} name={user.name} />
      <div className="user-card-info">
        <div className="user-card-name">{user.name}</div>
        <div className="user-card-bio">
          {truncateText(user.bio || user.skills || 'Developer', 60)}
        </div>
      </div>
      {action && (
        <div onClick={(e) => e.stopPropagation()}>
          {action}
        </div>
      )}
    </div>
  );
}
