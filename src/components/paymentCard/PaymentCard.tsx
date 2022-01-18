import React from "react";
import {
  Skeleton,
  Card,
  Button,
  Typography,
  Table,
} from "antd";
import { DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useSelector } from "../../redux/hooks";

const { Meta } = Card;
const { Title, Text } = Typography;

interface Item {
  key: number;
  item: string;
  amount: string | number | JSX.Element;
}

const columns: ColumnsType<Item> = [
  {
    title: "item",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "amount",
    dataIndex: "amount",
    key: "amount",
  },
];

interface PropsType {
  loading: boolean;
  originalPrice: number;
  price: number;
  payment: boolean;
  onShoppingCartClear: () => void;
  onCheckout: () => void;
}

export const PaymentCard: React.FC<PropsType> = ({
  loading,
  originalPrice,
  price,
  payment = false,
  onShoppingCartClear,
  onCheckout,

}) => {
  const paymentData: Item[] = [
    {
      key: 1,
      item: 'Original Price',
      amount: <Text delete>$ {originalPrice}</Text>,
    },
    {
      key: 3,
      item: 'Current Price',
      amount: (
        <Title type="danger" level={3}>
          $ {price}
        </Title>
      ),
    },
  ];

  const items = useSelector(s => s.shoppingCart.items);

  return (

    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <Button
          disabled={items.length < 1}
          type="primary"
          danger = {payment?false:true}
          
          onClick={onCheckout}
          loading={loading}>
          <CheckCircleOutlined />
          {payment ? 'Payment Successful' : 'Place Order'}
        </Button>,
        <Button onClick={onShoppingCartClear} loading={loading}>
          <DeleteOutlined />
          Clear
        </Button>,
      ]}
    >
      <Skeleton loading={loading} active>
        <Meta
          title={<Title level={2}>Total</Title>}
          description={
            <Table<Item>
              columns={columns}
              dataSource={paymentData}
              showHeader={false}
              size="small"
              bordered={false}
              pagination={false}
            />
          }
        />
      </Skeleton>
    </Card>
  );
};
