import React from 'react';
import styles from './SideMenu.module.css';
import { sideMenuList } from './mockup';
import { Menu } from 'antd';
import { GifOutlined } from '@ant-design/icons';
import { generateKey } from '../../Utility';


export const SideMenu: React.FC = () => {
    return (
        <Menu mode='vertical' className={styles['side-menu']}>
            {sideMenuList.map((m) => (
                <Menu.SubMenu
                    key={generateKey()}
                    title={<span><GifOutlined />{m.title}</span>}
                >
                    {m.subMenu.map((s) => (
                        <Menu.SubMenu
                            key={generateKey()}
                            title={<span><GifOutlined />{s.title}</span>}
                        >
                            {s.subMenu.map((item) => (
                                <Menu.Item
                                    key={generateKey()}    
                                >
                                    <GifOutlined />{item}
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    ))}
                </Menu.SubMenu>
            ))}
        </Menu>
    )
}