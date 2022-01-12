import { Col, Row, Spin, DatePicker, Space, Divider, Typography, Anchor, Menu } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Footer, Header, ProductComments, ProductIntro } from '../../components';
import { useSelector } from '../../redux/hooks';
import { fetchFail, fetchStart, fetchSuccess, getProductDetail } from '../../redux/productDetail/slice';
import { RootState } from '../../redux/store';
import { generateKey } from '../../Utility';
import styles from './DetailPage.module.css';
import { commentMockData } from './mockup';

interface Props {
    touristRouteId: string;
}


export const DetailPage: React.FC<RouteComponentProps<Props>> = (props) => {
    const { touristRouteId } = useParams<Props>();
    // const [loading, setLoading] = useState(true);
    // const [product, setProduct] = useState<any>(null);
    // const [error, setError] = useState<string | null>(null);

    const loading = useSelector((state: RootState) => state.productDetail.loading);
    const product = useSelector((state: RootState) => state.productDetail.data);
    const error = useSelector((state: RootState) => state.productDetail.error);
    const dispatch = useDispatch();

    const { RangePicker } = DatePicker;

    useEffect(() => {
        dispatch(getProductDetail(touristRouteId));
    }, []);

    if (loading) return <Spin size='large' />
    if (error) return <div>{error}</div>

    return (
        <>
            <Header />
            <div className={styles['page-content']}>
                {/* product intro and date picker */}
                <div className={styles['product-intro-container']}>
                    <Row>
                        <Col span={13}>
                            <ProductIntro
                                title={product.title}
                                shortDescription={product.shortDescription}
                                price={product.price}
                                coupons={product.coupons}
                                points={product.points}
                                discount={product.discount}
                                rating={product.rating}
                                pictures={product.touristRoutePictures.map((p: any) => p.url)}
                            />
                        </Col>
                        <Col span={11}>
                            <RangePicker open style={{ marginTop: '20px' }} />
                        </Col>
                    </Row>
                </div>
                {/* menu with anchor */}
                <Anchor className={styles['product-detail-anchor']}>
                    <Menu mode='horizontal'>
                        <Menu.Item key={generateKey()}>
                            <Anchor.Link href='#feature' title='产品特色'></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key={generateKey()}>
                            <Anchor.Link href='#fees' title='费用'></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key={generateKey()}>
                            <Anchor.Link href='#notes' title='预定须知'></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key={generateKey()}>
                            <Anchor.Link href='#comments' title='用户评价'></Anchor.Link>
                        </Menu.Item>
                    </Menu>
                </Anchor>
                {/* product features */}
                <div id='feature' className={styles['product-detail-container']}>
                    <Divider orientation='center'>
                        <Typography.Title level={3}>产品特色</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.features }}
                        style={{ margin: 50 }}>
                    </div>
                </div>
                {/* price */}
                <div id='fees' className={styles['product-detail-container']}>
                    <Divider orientation='center'>
                        <Typography.Title level={3}>价格</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.fees }}
                        style={{ margin: 50 }}>
                    </div>
                </div>
                {/* notice */}
                <div id='notes' className={styles['product-detail-container']}>
                    <Divider orientation='center'>
                        <Typography.Title level={3}>预定须知</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.notes }}
                        style={{ margin: 50 }}>
                    </div>
                </div>
                {/* comments */}
                <div id='comments' className={styles['product-detail-container']}>
                    <Divider orientation='center'>
                        <Typography.Title level={3}>用户评价</Typography.Title>
                    </Divider>
                    <div style={{ margin: 50 }}>
                        <ProductComments data={commentMockData} />
                    </div>

                </div>
            </div>
            <Footer />
        </>

    )
}