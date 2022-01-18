import React from 'react';
import styles from './BusinessPartners.module.css';
import {Divider,Typography, Row, Col} from 'antd';
import image1 from '../../assets/images/facebook-807588_640.png';
import image2 from '../../assets/images/follow-826033_640.png';
import image3 from '../../assets/images/icon-720944_640.png';
import image4 from '../../assets/images/microsoft-80658_640.png';
import { generateKey } from '../../Utility';


const companies = [
    {src:image1},
    {src:image2},
    {src:image3},
    {src:image4}
]

export const BusinessPartners:React.FC = () => {
    return(
        <div className={styles.content}>
            <Divider orientation='left'>
                <Typography.Title level={3}>合作企业</Typography.Title>
            </Divider>
            <Row>
                {companies.map((c)=>(
                    <Col span={6} key={generateKey()}>
                        <img
                            alt='business-partners'
                            src={c.src}
                            style={{
                                width:80,
                                display:'block',
                                margin:'0 auto'
                            }}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )
}