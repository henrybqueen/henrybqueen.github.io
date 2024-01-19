import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [
        // Replace with your actual projects
        { id: 1, name: 'Complex Power Visualization' },
        // ... more projects
      ],
    };
  }

  render() {
    return (
      <div>
        <header>
          <h1>Henry Queen's Website</h1>
        </header>
        <main>
          <h2>Projects</h2>
          <ul>
            {this.state.projects.map(project => (
              <li key={project.id}>
                <Link to={`/project/${project.id}`}>{project.name}</Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  }
}

export default HomePage;
