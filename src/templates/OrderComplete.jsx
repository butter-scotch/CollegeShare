import React, {useCallback} from 'react';
import {PrimaryButton} from "../components/UIkit";
import {useDispatch, useSelector} from "react-redux";
import {push} from "connected-react-router"
import '../assets/section.css'
import '../assets/spacer.css'
import { getUserId, getSchoolId } from '../reducks/users/selectors';

const OrderComplete = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const uid = getUserId(selector)
    const sid = getSchoolId(selector)

    const goBackToTop = useCallback(() => {
        dispatch(push('/' + sid + '/' + uid))
    }, [])

    return (
        <div className="c-section-container-white center">
            <p>ご注文ありがとうございました！</p>
            <div className="module-spacer--medium" />
            <PrimaryButton label="ショッピングを続ける" onClick={goBackToTop} />
        </div>
    );
};

export default OrderComplete;