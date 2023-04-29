import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import Container from '@components/Container';
import styles from './Header.module.scss';
import { useAuthorizer } from '@authorizerdev/authorizer-react';
import { useRouter } from 'next/router';

const Header = () => {
  const { user, setUser, setToken, authorizerRef } = useAuthorizer();
  const router = useRouter();
  const onLogout = async () => {
    setUser(null);
    setToken(null);
    await authorizerRef.logout();
    await fetch('api/logout');
    router.push('/');
  }

  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            Home
          </Link>
        </p>
        <ul className={styles.headerLinks}>
          {user ? (
            <>
              <Link className={styles.headerButton} href="/profile">
                Profile
              </Link>
              <button
							  className={styles.headerButton}
							  onClick={onLogout}
						  >
							  Logout
						  </button>
            </>
          ) : (
            <>
              <Link className={styles.headerButton} href="/login">
                Login
              </Link>
            </>
          )}
        </ul>
      </Container>
    </header>
  );
};

export default Header;
