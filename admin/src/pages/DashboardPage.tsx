import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/products">Manage Products</Link>
          </li>
          {/* Add link to manage orders here when the page is created */}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardPage;