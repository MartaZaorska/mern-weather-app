import { useSelector } from 'react-redux';

import Location from '../components/Location';

export function Component(){
  const { user, saveLocations, searchHistory } = useSelector(state => state.app);

  return (
    <>
      {user && saveLocations.length > 0 && (
        <section className="location">
          <header>
            <h2>Twoje zapisane lokalizacje</h2>
          </header>
          <div className="location__content">
            {[...saveLocations].sort((a, b) => {
              return a.weather ? -1 : (b.weather ? 1 : 0);
            }).map(item => <Location key={`save-${item.lat}-${item.lon}`} unit={user?.unit || "metric"} data={item} />)}
          </div>
        </section>
      )}
      {searchHistory.length > 0 && (
        <section className="location">
          <header>
            <h2>Ostatnio wyszukiwane</h2>
          </header>
          <div className="location__content">
            {[...searchHistory].sort((a, b) => {
              return a.weather ? -1 : (b.weather ? 1 : 0);
            }).map(item => <Location key={`search-${item.lat}-${item.lon}`} unit={user?.unit || "metric"} data={item} />)}
          </div>
        </section>
      )}
    </>
  )
}

Component.displayName = "Main";