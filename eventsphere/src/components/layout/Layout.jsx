import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Toast from '../ui/Toast';
import { useTheme } from '../../context/ThemeContext';

export default function Layout() {
    const { theme } = useTheme();
    return (
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <Toast />
        </div>
    );
}

