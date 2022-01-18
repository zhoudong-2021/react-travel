import React from 'react';
import { Footer, Header } from '../../components';
import styles from './MainLayout.module.css';

export const MainLayout: React.FC = ({children}) => {
    return (
        <>
            <Header />
            {/* Main Content */}
            <div className={styles['page-content']}>
                {children}
            </div>
            <Footer />
        </>
    )
}