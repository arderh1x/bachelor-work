import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
    const { user, logout, toggleProducerMode, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (loading) return <nav className={styles.navbar}><Link to="/">Main page</Link></nav>;

    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <Link to="/" className={styles.navLink}>Main page</Link>
                {!loading && user && (
                    <Link to="/profile" className={styles.profileLink}>
                        Hello, <strong>{user.username}</strong>!
                    </Link>
                )}
            </div>

            <div className={styles.rightSection}>

                {!loading ? (
                    !user ? (
                        <>
                            <Link to="/login" className={styles.navLink}>Login</Link>
                            <Link to="/register" className={styles.navLink}>Register</Link>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={toggleProducerMode}
                                className={`${styles.modeBtn} ${user.is_producer_mode ? styles.producerActive : styles.customerActive
                                    }`}
                            >
                                {user.is_producer_mode ? 'Producer Mode' : 'Buyer Mode'} (click to switch)
                            </button>
                            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
                        </>
                    )
                ) : (
                    <span>Loading...</span>
                )}
            </div>
        </nav>
    );
};

export default Navbar;