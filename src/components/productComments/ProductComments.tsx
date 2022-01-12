import { Comment, List } from 'antd';
import React from 'react';

interface PropType {
    data: {
        author: string;
        avatar: string;
        content: string;
        createDate: string;
    }[]
}

export const ProductComments: React.FC<PropType> = ({ data }) => {
    return (
        <List
            dataSource={data}
            itemLayout='horizontal'
            renderItem={(item) =>
                <li>
                    <Comment
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.createDate}
                    />
                </li>
            }
        >

        </List>
    )
}