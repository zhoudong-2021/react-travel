import React, { useState } from 'react';
import styles from './ShoppingCart.module.css';
import { Row, Col, Affix } from 'antd';
import { MainLayout } from '../../layouts/mainLayout';
import { PaymentCard, ProductList } from '../../components';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { deleteShoppingCartItems } from '../../redux/shoppingCart/slice';
import { useHistory } from 'react-router-dom';


export const ShoppingCartPage: React.FC = () => {
    const loading = useSelector(s => s.shoppingCart.loading);
    const items = useSelector(s => s.shoppingCart.items);
    const jwt = useSelector(s => s.user.token) as string;
    const dispatch = useDispatch();
    const [payment, setPayment] = useState(false);
    const history = useHistory();

    // const getTotalPrice = (discount) => items.map(item => item.originalPrice * discount ).reduce((a, b) => a + b, 0);
    return (
        <MainLayout>
            <Row>
                {/* shopping list */}
                <Col span={16}>
                    <div className={styles['product-list-container']}>
                        <ProductList
                            data={items.map(item => item.touristRoute)}
                        // paging={undefined} 
                        />
                    </div>
                </Col>
                {/* payment options */}
                <Col span={8}>
                    <Affix>
                        <div className={styles['payment-card-container']}>
                            <PaymentCard
                                loading={loading}
                                originalPrice={items.map(item => item.originalPrice).reduce((a, b) => a + b, 0)}
                                price={items.map(item => item.originalPrice *
                                    (item.discountPresent ? item.discountPresent : 1)).reduce((a, b) => a + b, 0)}
                                payment = {payment}
                                onShoppingCartClear={
                                    () => dispatch(deleteShoppingCartItems({ jwt, id: items.map(i => i.id) }))
                                }
                                onCheckout={() => {
                                    setPayment(true);
                                    setTimeout(() => {
                                        history.push('/');
                                    }, 1000)
                                }} />
                        </div>
                    </Affix>

                </Col>
            </Row>
        </MainLayout>

    )
}