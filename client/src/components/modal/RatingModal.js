import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {StarOutlined} from "@ant-design/icons";
import {Modal} from "antd";
import {toast} from "react-toastify";
import { useHistory } from 'react-router-dom';

const RatingModal =({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);

    let history = useHistory();

    const handleModal = () => {
        if (user && user.token) {
            setModalVisible(true);
        } else {
            history.push("/login");
        }
    }

    return (
        <>
            <div onClick={handleModal}>
                <StarOutlined className="text-danger" />
                <br/>
                {" "}
                {user ? "Avaliar o produto" : "Login para avaliar"}
            </div>
            <Modal
                title="Deixe sua avaliação" centered visible={modalVisible}
                onOk={() => {
                    setModalVisible(false);
                    toast.success("Obrigado pela sua avaliação.");
                }}
                onCancel={() => setModalVisible(false)}
            >
                {children}
            </Modal>
        </>
    );
};

export default RatingModal;