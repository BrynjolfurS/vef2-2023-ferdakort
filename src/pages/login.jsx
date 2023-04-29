import { useEffect } from 'react';
import { Authorizer, useAuthorizer } from '@authorizerdev/authorizer-react';
import { useRouter } from 'next/router';
import Layout from '@components/Layout/Layout';
import styles from '@styles/UserPages.module.scss';

export default function Login() {
	const { token } = useAuthorizer();
	const router = useRouter();
	useEffect(() => {
		if (token) {
			router.push('/');
		}
	}, [token]);
	return (
		<Layout>
			<div className={styles.loginContainer}>
				<div className={styles.customLoginWrapper}>
					<Authorizer />
				</div>
			</div>
		</Layout>
	);
}