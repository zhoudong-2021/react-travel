import { Col, Row } from 'antd';
import React from 'react';
import { MainLayout } from '../../layouts/mainLayout';

export const PlaceOrderPage:React.FC =  () => {
    return(
        <MainLayout>
            <Row>
                <Col span={12}></Col>
                <Col span={12}></Col>
            </Row>
        </MainLayout>
    )
}