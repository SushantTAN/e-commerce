import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import { useSidebar } from '@/context/sidebar';

const Header = () => {
  const navigate = useNavigate();
  const { toggle } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem('profile');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md px-4 py-2 flex justify-between items-center">
      {/* Mobile hamburger button */}
      <div className="md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="rounded-md"
          onClick={toggle}
        >
          <Menu size={20} />
        </Button>
      </div>
      <h2 className="text-lg font-semibold">Welcome to MeroCommerce</h2>
      <Button onClick={handleLogout} variant="destructive" className='size-8'>
        <LogOut />
      </Button>
    </header>
  );
};

export default Header;
