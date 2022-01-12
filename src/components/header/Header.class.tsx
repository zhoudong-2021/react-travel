import React from 'react';
import styles from './Header.module.css';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.svg';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { WithTranslation, withTranslation } from 'react-i18next';
import { addLanguageActionCreator, changeLanguageActionCreator } from '../../redux/language/languageActions';
import { connect } from 'react-redux';
import {Dispatch} from 'redux';

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    changeLanguage: (code:'zh'|'en')=>{
      const action = changeLanguageActionCreator(code);
      dispatch(action);
    },
    addLanguage: (name:string, code:string) => {
      const action = addLanguageActionCreator(name, code);
      dispatch(action);
    }
  }
}

type PropsType = RouteComponentProps // react-router props type
  & WithTranslation //i18n props type
  & ReturnType<typeof mapStateToProps> // redux store state type
  & ReturnType<typeof mapDispatchToProps> //redux dispatch type

class HeaderComponent extends React.Component<PropsType> {

  handleMenuClick = (e: any) => {
    if (e.key === 'new') {
      this.props.addLanguage('new language', 'new language');
    }
    else {
      this.props.changeLanguage(e.key);
    }
  }
  render() {
    const { history, t } = this.props;

    return (
      <div className={styles['App-header']}>
        {/* {top-header} */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={(e) => this.handleMenuClick(e)}>
                  {this.props.languageList.map(lang => {
                    return <Menu.Item key={lang.code}>
                      {lang.name}</Menu.Item>
                  })}
                  <Menu.Item key={'new'}>
                    {t('header.add_new_language')}
                  </Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {this.props.language === 'en' ? 'Language' : '中文'}
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button
                onClick={() => history.push('/register')}
              >
                {t('header.register')}
              </Button>
              <Button
                onClick={() => history.push('/login')}
              >
                {t('header.signin')}
              </Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <Link to={'/'}>
            <img src={logo} alt="" className={styles['App-logo']} />
            <Typography.Title level={3} className={styles.title}>
              {t('header.title')}
            </Typography.Title>
          </Link>
          <Input.Search
            placeholder={'Search destinations'}
            className={styles['search-input']}
          />
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles['main-menu']}>
          <Menu.Item key={1}>{t('header.home_page')}</Menu.Item>
          <Menu.Item key={2}>{t('header.weekend')}</Menu.Item>
          <Menu.Item key={3}>{t('header.group')}</Menu.Item>
          <Menu.Item key={4}>{t('header.backpack')}</Menu.Item>
          <Menu.Item key={5}>{t('header.private')}</Menu.Item>
          <Menu.Item key={6}>{t('header.cruise')}</Menu.Item>
          <Menu.Item key={7}>{t('header.hotel')}</Menu.Item>
          <Menu.Item key={8}>{t('header.local')}</Menu.Item>
          <Menu.Item key={9}>{t('header.custom')}</Menu.Item>
        </Menu>
      </div>
    )
  }
}

export const Header = connect(mapStateToProps, mapDispatchToProps)
  (withTranslation()(withRouter(HeaderComponent)));