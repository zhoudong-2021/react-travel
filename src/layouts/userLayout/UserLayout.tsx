import React from "react";
import styles from "./UserLayout.module.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button } from "antd";
import { Footer } from "../../components";
const { Header, Content } = Layout;

export const UserLayout: React.FC = (props) => {
  const menu = (
    <Menu>
      <Menu.Item>English</Menu.Item>
      <Menu.Item>中文</Menu.Item> 
    </Menu>
  );

  return (
    <Layout className={styles["user-layout-container"]}>
      <Header className={styles["header"]}>
        <div className={styles["lang"]}>
          <Dropdown overlay={menu}>
            <Button>
              {" "}
              Choose Language <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles["content"]}>
        <div className={styles["top"]}>
          <div className={styles["content-header"]}>
            <Link to="/">
              <img alt="logo" className={styles["logo"]} src={logo} />
              <span className={styles["title"]}>React Travel</span>
            </Link>
          </div>
          <div className={styles["desc"]}>
            Make your travel cheap and happy 
          </div>
          {props.children}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};
