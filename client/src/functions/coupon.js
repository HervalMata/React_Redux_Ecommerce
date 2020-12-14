import axios from 'axios';

export const getCoupons = async () =>
    await axios.get(`${process.env.REACT_APP_API}/coupons`);

export const removeCoupon = async (couponId, autotoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
        headers: {
            autotoken,
        },
    });

export const createCoupon = async (coupon, autotoken) =>
    await axios.post(`${process.env.REACT_APP_API}/coupon`, { coupon },{
        headers: {
            autotoken,
        },
    });