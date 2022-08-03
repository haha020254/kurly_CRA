import React, { useState } from 'react';
import HeaderComponent from './HeaderComponent.js';
import MainComponent from './MainComponent.js';
import FooterComponent from './FooterComponent.js';
import ModalComponent from './ModalComponent.js';

const WrapComponent = () => {

    //모달 상태관리
    const [modal, setModal] = useState({
        title:'',isShow:false
    });

    //모달 hide 함수
    const modalCloseFn=()=>{
        setModal({...modal, isShow:false});
    }

    //모달 show 함수
    const modalShowFn=(tit)=>{
        setModal({...modal, title:tit, isShow:true})
    }

    return (
        <div id='wrap'>
            <HeaderComponent/>
            <MainComponent modal={modal} modalShowFn={modalShowFn} />
            <FooterComponent/>
            <ModalComponent modal={modal} modalCloseFn={modalCloseFn} />
        </div>
    );
};

export default WrapComponent;