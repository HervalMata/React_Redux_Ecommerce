import React from 'react';
import {Card} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
const { Meta } = Card;

const AdminProductCard = ({ product }) => {
    const { title, description, images } = product;
    
    return (
        <Card 
            cover={
                <img 
                    src={images && images.length ? images[0].url : ""}
                    style={{ height: "150px", objectFit: "cover" }}
                    className="p-1"
                    alt="" />
            }
            actions={[
                <EditOutlined className="text-warning" />,
                <DeleteOutlined className="text-danger" />,
            ]}
            >
            <Meta
                title={title}
                description={`${description && description.substring(0, 40)}...`} />
        </Card>
    );
};

export default AdminProductCard;