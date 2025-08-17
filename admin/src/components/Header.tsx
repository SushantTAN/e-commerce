import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('profile');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Welcome, Admin!</h2>
      <Button onClick={handleLogout} variant="destructive">
        Logout
      </Button>
    </header>
  );
};

export default Header;
