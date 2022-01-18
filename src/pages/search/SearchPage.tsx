import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { FilterArea, Footer, Header, ProductList } from '../../components';
import { MainLayout } from '../../layouts/mainLayout';
import { useSelector } from '../../redux/hooks';
import { searchProduct } from '../../redux/productSearch/slice';
import { RootState } from '../../redux/store';
import styles from './SearchPage.module.css';

interface PropsType {
    keywords: string;
}

export const SearchPage: React.FC = () => {
    const { keywords } = useParams<PropsType>();
    const dispatch = useDispatch();
    const location = useLocation();

    const loading = useSelector(state => state.productSearch.loading);
    const error = useSelector(state => state.productSearch.error);
    const data = useSelector(state=> state.productSearch.data);
    const pagination = useSelector(state => state.productSearch.pagination);

    useEffect(() => {
        dispatch(searchProduct({
            nextPage: 1,
            pageSize: 10,
            keywords
        }));
    }, [location])


    const onPageChange = (nextPage: string | number, pageSize: string | number) => {
        dispatch(searchProduct({
            nextPage,
            pageSize,
            keywords
        }))
    }

    if (loading) return <Spin size='large' />
    if (error) return <div>{error}</div>

    return (
        <>
            <MainLayout>
                {/* product filter */}
                <div className={styles['product-list-container']}>
                    <FilterArea />
                </div>
                {/* product list */}
                <div className={styles['product-list-container']}>
                    <ProductList
                        data={data}
                        paging={pagination}
                        onPageChange={onPageChange}
                    />
                </div>
            </MainLayout>
        </>
    )
}