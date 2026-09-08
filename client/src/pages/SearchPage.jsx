import { useState } from 'react';
import { userService } from '../services/dataService';
import UserCard from '../components/UserCard';
import EmptyState from '../components/EmptyState';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await userService.searchUsers(query);
      setResults(res.data.users);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '700px' }}>
      <div className="page-header">
        <h1 className="page-title">Find Developers</h1>
      </div>

      <form onSubmit={handleSearch} style={{ marginBottom: '24px' }}>
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or skill..."
            id="search-input"
          />
        </div>
      </form>

      {loading && (
        <div className="loading-container">
          <div className="spinner" />
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <EmptyState
          icon="🔍"
          title="No developers found"
          description={`No results for "${query}". Try a different search term.`}
        />
      )}

      {!loading && results.length > 0 && (
        <div className="connections-grid">
          {results.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {!searched && (
        <EmptyState
          icon="🔍"
          title="Search for Developers"
          description="Find developers by name or skills."
        />
      )}
    </div>
  );
}
