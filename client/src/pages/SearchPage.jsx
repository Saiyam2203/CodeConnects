import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { userService } from '../services/dataService';
import UserCard from '../components/UserCard';
import EmptyState from '../components/EmptyState';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      runSearch(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const runSearch = async (term) => {
    if (!term.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await userService.searchUsers(term);
      setResults(res.data.users);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchParams({ q: query.trim() });
    await runSearch(query);
  };

  return (
    <div className="page-container" style={{ maxWidth: '760px' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Find Developers</h1>
          <p className="page-subtitle">Search the community by name or skill.</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '18px' }}>
        <form onSubmit={handleSearch}>
          <div className="search-container">
            <span className="search-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'React', 'Python', 'Alex'..."
              id="search-input"
            />
          </div>
          <button className="btn btn-primary" type="submit" style={{ marginTop: '12px' }} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner" />
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <EmptyState
          icon="🔍"
          title="No developers found"
          description={`No results for "${query}". Try a different skill or name.`}
        />
      )}

      {!loading && results.length > 0 && (
        <>
          <div className="sort-row" style={{ marginBottom: '12px' }}>
            {results.length} result{results.length === 1 ? '' : 's'} found
          </div>
          <div className="connections-grid">
            {results.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </>
      )}

      {!searched && (
        <EmptyState
          icon="🔍"
          title="Search for Developers"
          description="Find collaborators by name or tech skill — e.g. React, Node.js, Python."
        />
      )}
    </div>
  );
}
