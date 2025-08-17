import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <nav className="space-y-2">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'w-full justify-start bg-gray-100 text-blue-600' : 'w-full justify-start text-gray-600'} >
          <Button variant="ghost" className="w-full justify-start">
            Dashboard
          </Button>
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'w-full justify-start bg-gray-100 text-blue-600' : 'w-full justify-start text-gray-600'}>
          <Button variant="ghost" className="w-full justify-start">
            Products
          </Button>
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => isActive ? 'w-full justify-start bg-gray-100 text-blue-600' : 'w-full justify-start text-gray-600'}>
          <Button variant="ghost" className="w-full justify-start">
            Orders
          </Button>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
