import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.svg';
import { Link, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { addLanguageActionCreator, changeLanguageActionCreator } from '../../redux/language/languageActions';
import { t } from 'i18next';
import jwt_decode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode';
import { userSlice } from '../../redux/user/slice';

interface JwtPayload extends DefaultJwtPayload {
  username: string
}

export const Header: React.FC = () => {
  const history = useHistory();
  // const location = useLocation();
  // const params = useParams();
  // const match = useRouteMatch();

  const language = useSelector(s => s.language.language);
  const languageList = useSelector(s=> s.language.languageList);

  const shoppingCartItems = useSelector(s => s.shoppingCart.items);
  const shoppingCartLoading = useSelector(s => s.shoppingCart.loading);

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');

  const handleMenuClick = (e: any) => {
    if (e.key === 'new') {
      dispatch(addLanguageActionCreator('new language', 'new language'))
    }
    else {
      dispatch(changeLanguageActionCreator(e.key));
    }
  }

  const jwt = useSelector(s => s.user.token);

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt);
      setUsername(token.username);
    }
  }, [jwt])

  const onLogout = () => {
    dispatch(userSlice.actions.logOut());
    history.push('/');
  }

  return (
    <div className={styles['App-header']}>
      {/* {top-header} */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t('header.slogan')}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={(e) => handleMenuClick(e)}>
                {languageList.map(lang => {
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
            {language === 'en' ? 'Language' : '中文'}
          </Dropdown.Button>
          {jwt ?
            (<Button.Group className={styles['button-group']}>
              <span>{t("header.welcome")+ ' '} 
                <Typography.Text strong>{username}</Typography.Text>
              </span>
              <Button
              style={{marginLeft:5}}
              loading = {shoppingCartLoading} 
              onClick={()=> history.push('/shoppingCart')}>
                {t("header.shoppingCart")}({shoppingCartItems.length})</Button>
              <Button onClick={onLogout}>{t("header.signOut")}</Button>
            </Button.Group>)
            :
            (<Button.Group className={styles['button-group']}>
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
            </Button.Group>)}
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
          onSearch={(keywords) => history.push(`/search/${keywords}`)}
        />
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles['main-menu']}>
        <Menu.Item key={1} onClick={()=>history.push('/')}>{t('header.home_page')}</Menu.Item>
        <Menu.Item key={2} onClick={()=>history.push('/')}>{t('header.weekend')}</Menu.Item>
        <Menu.Item key={3} onClick={()=>history.push('/')}>{t('header.group')}</Menu.Item>
        <Menu.Item key={4} onClick={()=>history.push('/')}>{t('header.backpack')}</Menu.Item>
        <Menu.Item key={5} onClick={()=>history.push('/')}>{t('header.private')}</Menu.Item>
        <Menu.Item key={6} onClick={()=>history.push('/')}>{t('header.cruise')}</Menu.Item>
        <Menu.Item key={7} onClick={()=>history.push('/')}>{t('header.hotel')}</Menu.Item>
        <Menu.Item key={8} onClick={()=>history.push('/')}>{t('header.local')}</Menu.Item>
        <Menu.Item key={9} onClick={()=>history.push('/')}>{t('header.custom')}</Menu.Item>
      </Menu>
    </div>
  )
}