import React from "react";
import styles from './HomePage.module.css';
import { Row, Col, Typography, Spin } from 'antd';
import { Carousel, Footer, Header, ProductCollection, SideMenu, BusinessPartners } from '../../components';
import sideImage1 from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchRecommendProductsActionCreator } from "../../redux/recommendProducts/recommendProductsActions";
import { MainLayout } from "../../layouts/mainLayout";


const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProductList: () => {
      dispatch(fetchRecommendProductsActionCreator());
    }
  }
}

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component<PropsType> {

  componentDidMount() {
    this.props.fetchProductList();
  }

  render() {
    const { t } = this.props;
    const { productList, loading, error } = this.props;
    if (loading) return <Spin size='large' />
    if (error) return <div>{error}</div>

    return (
      <>
        <MainLayout>
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>
          <ProductCollection
            title={<Typography.Title level={3} type='warning'>
              {t('home_page.hot_recommended')}
            </Typography.Title>}
            sideImage={sideImage1}
            products={productList[0].touristRoutes}
          />
          <ProductCollection
            title={<Typography.Title level={3} type='danger'>
              {t('home_page.new_arrival')}
            </Typography.Title>}
            sideImage={sideImage2}
            products={productList[1].touristRoutes}
          />
          <ProductCollection
            title={<Typography.Title level={3} type='success'>
              {t('home_page.domestic_travel')}
            </Typography.Title>}
            sideImage={sideImage3}
            products={productList[2].touristRoutes}
          />
          <BusinessPartners />
        </MainLayout>
      </>
    )
  }
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent));