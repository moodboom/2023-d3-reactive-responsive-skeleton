import './About.scss'
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

export const About = () => {
  return (
    <main>
      <div className="aboutHorizontalCenteredGrid">
        <div className="aboutVerticalCenteredFlex">
          <Card className="aboutBox">
            <h4><a href="https://gitlab.com/moodboom/2023-d3-reactive-responsive-skeleton">2023 D3 Reactive Responsive skeleton</a></h4>
            {' '}<br />
            moodboom's projects:
            <ul>
              <li><Link to='https://gitlab.com/users/moodboom/projects'>GitLab</Link></li>
              <li><Link to='https://github.com/moodboom?tab=repositories'>GitHub</Link></li>
              <li><Link to='https://bitpost.com/wiki/Projects'>Projects</Link></li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  );
}
