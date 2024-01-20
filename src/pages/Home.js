import React from 'react';
import { Link  } from 'react-router-dom';
import Header from '../Header'

class Home extends React.Component {
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
        <Header />
        <div>
            <h2>Projects</h2>
            <ul>
              {this.state.projects.map(project => (
                <li key={project.id}>
                  <Link to={`/project/${project.id}`}>{project.name}</Link>
                </li>
              ))}
            </ul>

            <h2>Images</h2>
            <ul>
              <li>
                <Link to={`/images/film`}>Film</Link>
              </li>
            </ul>
        </div>
      </div>
    );
  }
}

export default Home;
