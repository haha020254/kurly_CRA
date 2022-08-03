import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const Postcode = () => {

    const onCompletePost=(data)=>{
        console.log(data);
        console.log(data.address);
        console.log(data.jibunAddress);
        console.log(data.zonecode);
    }

    const postStyle = {
        position:'fixed',
        top:'50%',
        left:'50%',
        width:'400px',
        height:'500px',
        background:'#fff',
        zIndex:'2',
        border:'1px solid #ccc',
        marginTop:'-250px',
        marginLeft:'-200px'
    }

    return (
        <div>
            <DaumPostcode style={postStyle} onComplete={onCompletePost} />
        </div>
    );
};

export default Postcode;