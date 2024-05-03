import React, { useEffect, useState} from "react";
import './App.css';

const App = () => {

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/groups')
        .then(res => res.json())
        .then(date => setGroups(date));
    setLoading(false);
  }, []);

  if(loading) {
    return <p> Loading......</p>
  }
  return (
      <div className="App">
        <header className="App-header">
          <div className="App-intro">
            <h2> Available Groups</h2>
            {groups.map(group =>
              <div key={group.id}>
                {group.name}
              </div>
            )}
          </div>
        </header>

      </div>
  )
}

export default App;
