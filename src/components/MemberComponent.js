import React, {useState, useEffect} from 'react';
import Postcode from 'react-daum-postcode';

const MemberComponent = ({modalShowFn, 이용약관}) => {

    const onCompletePost=(data)=>{
        setField({...field, 주소1:data.roadAddress})
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

    const [field, setField] = useState({
        아이디:'',
        아이디중복확인:true,
        isShowId:false,
        isClassId:'',
        
        비밀번호:'',
        isShowPw:false,
        isClassPw1:'',
        isClassPw2:'',
        isClassPw3:'',

        비밀번호확인:'',
        isShowPwRe:false,
        isClassPwRe:'',

        이름:'',

        이메일:'',
        이메일확인:true,

        휴대폰:'',
        휴대폰확인:'',
        isDisabledHp:true,
        isShowHp:false,
        minutes: 2,
        seconds: 59,
        인증번호:'',
        setId:0,
        인증번호확인:'',
        인증번호확인Ok:false,
        isDisabledHpInput:false,
        isDisabledHpBtn:false,
        isClassHp1:false,
        isClassHp2:false,
        isShowHpSpan:true,

        주소1:'',
        주소2:'',
        isShowAddress:false,

        성별: '선택안함',

        년:'',
        월:'',
        일:'',
        isShowBirth:false,
        isShowBirthText:'',

        추가입력사항선택:'',
        isShowAdd:false,
        추가입력사항:'',
        
        이용약관동의: [],



    });

    //아이디
    const onChangeId=(e)=>{
        // const regExp = /^(((?=.*[A-Za-z])+(?=.*[0-9])*)+([^가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^&*\(\)\-_\=\+\\\{\}\[\]\?\/\.\,\<\>\~\`\:\;\'\"]))[^\s][A-Za-z0-9]{6,}$/g;
        const regExp = /^(?=.*[A-Za-z])+(?=.*[0-9])*[^\s][A-Za-z0-9]{5,20}$/g;
        let temp = '';
        
        if(regExp.test(e.target.value)===false){
            temp = false;
        }
        else{
            temp = true;
        }
        setField({...field, 아이디:e.target.value, isClassId:temp});
    }
    const onFocusId=(e)=>{
        setField({...field, isShowId:true});
    }

    //아이디 중복확인 버튼 클릭 이벤트: 모달창띄우기
    const onClickIdOk=(e)=>{
        e.preventDefault();
        //모달창띄우기 함수 호출실행
        if(field.아이디===''){
            modalShowFn('아이디를 입력하세요.');
        }
        else{
            if(field.isClassId===false){
                modalShowFn('잘못된 형식입니다.');
            }
            else{

                //로컬스토레이지 데이터 가져오기
                let temp = [];
                for(let i=0; i<localStorage.length; i++){
                    //console.log(localStorage.getItem(localStorage.key(i)));
                    //JSON.parse(): 객체변환
                    //console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
                    //임시배열에 데이터 밀어넣기(Push)
                    temp.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }

                let result = temp.map((item)=>item.아이디===field.아이디);
                // console.log(result);
                // console.log(result.includes(true));

                if(result.includes(true)){ //중복된 아이디
                    modalShowFn('중복된 아이디 입니다.');
                }
                else{
                    modalShowFn('사용 가능한 아이디 입니다.');
                }

            }
        }
    }


    //비밀번호
    const onFocusPw=(e)=>{
        setField({...field, isShowPw:true});
    }

    const onChangePw=(e)=>{
        const regExp1 = /.{10,}/;
        const regExp2 = /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%&*_-])+)+)[^\s][A-Za-z0-9!@#$%&*_-]{10,}/;
        const regExp3 = /(.)\1\1/; //긍정문
        let temp1 = '';
        let temp2 = '';
        let temp3 = '';

        //조건1
        if(regExp1.test(e.target.value)){
            temp1=true;
        }
        else{
            temp1=false;
        }
        //조건2
        if(regExp2.test(e.target.value)){
            temp2=true;
        }
        else{
            temp2=false;
        }
        //조건3
        if(regExp3.test(e.target.value)){
            temp3=false;
        }
        else{
            temp3=true;
        }
        setField({
            ...field, 
            비밀번호:e.target.value, 
            isClassPw1:temp1, 
            isClassPw2:temp2, 
            isClassPw3:temp3
        });
    }


    //비밀번호확인
    const onFocusPwRe=()=>{
        setField({...field, isShowPwRe:true});
    }
    const onChangePwRe=(e)=>{
        let temp = '';

        if(field.비밀번호 === e.target.value){
            temp = true;
        }
        else{
            temp = false;
        }
        setField({...field, 비밀번호확인:e.target.value, isClassPwRe:temp});
    }

    //이름
    const onChangeName=(e)=>{
        //영문,한글,공백만 입력 나머진 모두 삭제
        // $(this).val($(this).val().toString().replace( /[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, ''));
        const regExp = /[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g;
        let temp = '';
        temp = e.target.value.toString().replace(regExp,'');

        setField({...field, 이름:temp});
    }

    //이메일
    const onChangeEmail=(e)=>{
        const regExp = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        let temp = '';

        if(regExp.test(e.target.value)){
            temp = true;
        }
        else{
            temp = false;
        }
        setField({...field, 이메일:e.target.value, 이메일확인:temp})
    }

    //이메일 중복확인 버튼 클릭 이벤트
    const onClickEmailOk=(e)=>{
        e.preventDefault();
        //모달창띄우기 함수 호출실행
        if(field.이메일===''){
            modalShowFn('이메일을 입력하세요.');
        }
        else{
            if(field.이메일확인===false){
                modalShowFn('잘못된 이메일 형식입니다.');
            }
            else{
                //로컬스토레이지 데이터 가져오기
                let temp = [];
                for(let i=0; i<localStorage.length; i++){ 
                    temp.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }

                let result = temp.map((item)=>item.이메일===field.이메일);

                if(result.includes(true)){ //중복된 이메일
                    modalShowFn('중복된 이메일 입니다.');
                }
                else{
                    modalShowFn('사용 가능한 이메일 입니다.');
                }
            }
        }
    }

    //휴대폰
    const onChangeHp=(e)=>{
        const regExp = /^01[0|6|7|8|9]+\d{3,4}\d{4}$/g; 
        let temp = '';
    
        if(regExp.test(e.target.value)){
            temp = true;
        }
        else{
            temp = false;
        }
    
        setField({...field, 휴대폰: e.target.value, 휴대폰확인: temp, isDisabledHp:!temp})
    }

    //휴대폰인증
    const onMouseDownHp=()=>{
        clearInterval(field.setId)
        setField({...field, isShowHp:false});
    }

    const onClickHp=(e)=>{
        e.preventDefault();
        
        let num = Math.floor(Math.random()*900000+100000);
        setField({...field, isShowHp:true, 인증번호:num.toString()});
        modalShowFn(`인증번호(${num})가 전송되었습니다.`);
        
    }

    //휴대폰 인증번호 전송 카운트 타이머
    const countTimer=()=>{
        let minutes = 2;
        let seconds = 59;
        let setId = 0;

        //타이머 설정 setInterval();
        const setTimer=()=>{
            seconds--;
            if(seconds<=0){
                seconds = 59;
                minutes--;
                if(minutes<=0){
                    clearInterval(setId);
                    seconds = 0;
                    minutes = 0;
                }
            }
            setField({...field, seconds: seconds, minutes:minutes, setId:setId});
        }
        setId = setInterval(setTimer, 1000);
    }

    //useEffect()
    useEffect(()=>{
        field.isShowHp && countTimer();
    },[field.isShowHp]);

    //인증번호 확인 입력상자
    const onChangeHpNum=(e)=>{
        //입력시 곧바로 타이머 일시정지
        clearInterval(field.setId);
        setField({...field, 인증번호확인:e.target.value});
    }

    //인증확인번호 클릭 이벤트
    const onClickHpConfirm=(e)=>{
        e.preventDefault();
        if(field.인증번호===field.인증번호확인){
            modalShowFn('인증이 완료되었습니다.');
            
            //인증번호확인 입력상자&버튼 사용불가
            setField({
                ...field, 
                isDisabledHp:true,isDisabledHpInput:true, isDisabledHpBtn:true, 
                isClassHp1:true, isClassHp2:true,
                인증번호확인:'',
                isShowHpSpan:false,
                인증번호확인Ok:true
            })
        }
        else{
            modalShowFn('인증번호 오류입니다.');
        }
    }

    //주소 버튼 클릭
    const onClickAddress=(e)=>{
        e.preventDefault();
        setField({...field, isShowAddress:true});
    }

    //주소1
    const onChangeAddress1=(e)=>{
        setField({...field, 주소1:e.target.value});
    }

    //주소2
    const onChangeAddress2=(e)=>{
        setField({...field, 주소2:e.target.value});
    }

    //성별
    const onChangeGender=(e)=>{
        setField({...field, 성별: e.target.value});
    }

    //생년월일
    const onChangeYear=(e)=>{
        const regExp = /[^0-9]/g;
        let temp = e.target.value.trim().replace(regExp,'')

        setField({...field, 년:temp});
    }

    const onChangeMonth=(e)=>{
        const regExp = /[^0-9]/g;
        let temp = e.target.value.trim().replace(regExp,'')

        setField({...field, 월:temp});
    }

    const onChangeDate=(e)=>{
        const regExp = /[^0-9]/g;
        let temp = e.target.value.trim().replace(regExp,'')

        setField({...field, 일:temp});
    }

    //생년월일 공통사용 함수
    const birthDayCheck=()=>{
        const regExpYear = /^(?:19[0-9][0-9]|2[0-9][0-9][0-9])$/g;
        const regExpMonth = /^(?:0?[1-9]|1[0-2])$/g;
        const regExpDate = /^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;
        const {년,월,일} = field;

        //현재 년월일 날짜 데이터
        const nowYear = new Date().getFullYear(); //년 4자리
        const nowMonth = new Date().getMonth()+1; //월 0~11
        const nowDate = new Date().getDate(); //일
        const today = new Date( nowYear, nowMonth, nowDate ); //오늘 년월일


        if(년==='' && 월==='' && 일==='' ){
            return;
        }
        else{
            //생년이 정상이면
            if(regExpYear.test(년)===false){
                setField({...field, isShowBirth:true, isShowBirthText:'태어난 년도 4자리를 정확하게 입력하세요.'});
                return;
            }
            else{
                setField({...field, isShowBirth:false, isShowBirthText:''});

                //생월 체크
                if(regExpMonth.test(월)===false){
                    setField({...field, isShowBirth:true, isShowBirthText:'태어난 월을 정확하게 입력하세요.'});
                    return;
                }
                else{
                    setField({...field, isShowBirth:false, isShowBirthText:''});

                    //생일 체크
                    if(regExpDate.test(일)===false){
                        setField({...field, isShowBirth:true, isShowBirthText:'태어난 일을 정확하게 입력하세요.'});
                        return;
                    }
                    else{
                        setField({...field, isShowBirth:false, isShowBirthText:''});
                    }

                    // 입력 불가 조건 (안되는 조건)
                    // 추가 조건:  14이상, 120세초과, 미래

                    const birthDay  = new Date(년, 월, 일);  // 태어난 년월일
                    const nowYear120 = new Date(nowYear-120, nowMonth, nowDate);  //120세 초과 변수
                    const nowYear14 = new Date(nowYear-14, nowMonth, nowDate);  //14세 미만 변수

                    //1.   미래
                    //미래: 오늘 보다 더큰 날짜 는  미래
                    if( birthDay > today ){
                        setField({
                            ...field, isShowBirth: true, isShowBirthText:'생년월일이 미래로 입력되었어요.'});
                        return;
                    }
                    else{
                        setField({...field, isShowBirth: false, isShowBirthText:''});
                    }
        
                    //2. 14미만
                    if( birthDay > nowYear14 ){
                        setField({...field, isShowBirth: true, isShowBirthText:'만 14세 미만은 가입이 불가 합니다.'});
                        return;
                    }
                    else{
                        setField({ ...field, isShowBirth: false, isShowBirthText:''});
                    }    
        
                    //3. 120초과
                    if( birthDay < nowYear120 ){  //120세 초과 나이 120살 넘는 분들
                        setField({...field, isShowBirth: true, isShowBirthText:'생년월일을 다시 확인해주세요.'});
                        return;
                    }
                    else{
                        setField({...field, isShowBirth: false, isShowBirthText:''});
                    }
                }
            }
        }
    }

    //포커스 아웃시 생년월일 체크함수 호출실행
    const onBlurBirth=()=>{
        birthDayCheck();
    }

    //추가입력사항
    const onChangeAdd=(e)=>{
        setField({...field, isShowAdd:true, 추가입력사항선택:e.target.value});
    }

    const onChangeAddInput=(e)=>{
        setField({...field, 추가입력사항:e.target.value});
    }

    //이용약관
    const onChangeServiceAll=(e)=>{
        if(e.target.checked){
            setField({...field, 이용약관동의:이용약관});
        }
        else{
            setField({...field, 이용약관동의:[]}); //배열 초기화,삭제
        }
    }

    //체크박스 각 항목 체크시 멤버변수를 이용약관동의[] 배열에 저장
    const onChangeService=(e)=>{
        let temp = [];
        const {이용약관동의} = field;

        if(e.target.checked){
            if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의'){
                setField({...field, 이용약관동의:[...이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의','SMS','이메일']});
            }
            else if(field.이용약관동의.includes('SMS') && e.target.value==='이메일'){
                setField({...field, 이용약관동의:[...이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의','이메일']});
            }
            else if(field.이용약관동의.includes('이메일') && e.target.value==='SMS'){
                setField({...field, 이용약관동의:[...이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의','SMS']});
            }
            else{
                setField({...field, 이용약관동의:[...이용약관동의, e.target.value]});
            }
        }
        else{ //체크해제된 데이터만 filter()

            if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의'){
                temp = 이용약관동의.filter((item)=> item !== e.target.value);
                temp = temp.filter((item)=> item !== 'SMS');
                temp = temp.filter((item)=> item !== '이메일');
                setField({...field, 이용약관동의:temp});
            }
            else if(이용약관동의.includes('SMS') && e.target.value === '이메일'){
                temp = 이용약관동의.filter((item)=> item !== '이메일');
                temp = temp.filter((item)=> item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의');
                setField({...field, 이용약관동의:temp});
            }
            else if(이용약관동의.includes('이메일') && e.target.value === 'SMS'){
                temp = 이용약관동의.filter((item)=> item !== 'SMS');
                temp = temp.filter((item)=> item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의');
                setField({...field, 이용약관동의:temp});
            }
            else{
                temp = 이용약관동의.filter((item)=>item !== e.target.value);//삭제하고 나머지만 저장
                setField({...field, 이용약관동의:temp});
            }
        }

    }

    //submit 전송 : 버튼 클릭시 동작
    const onSubmitMember=(e)=>{
        e.preventDefault();
        const {아이디, 비밀번호, 비밀번호확인, 이름, 휴대폰, 이메일, 주소1, 주소2, 성별, 년, 월, 일, 추가입력사항선택, 추가입력사항, 이용약관동의, 아이디중복확인, 이메일확인, 인증번호확인Ok} =  field;
        
        
        

        //아이디 중복확인Ok, 이메일확인, 인증번호확인Ok
        
        if(아이디==='' || 비밀번호==='' || 비밀번호확인==='' || 이름==='' || 휴대폰==='' || 이메일==='' || 주소1==='' || 주소2==='' || 이용약관동의.length<3 || 아이디중복확인===false || 이메일확인=== false || 인증번호확인Ok===false){
            if(아이디===''){
                modalShowFn('아이디를 입력하세요.');
            }
            else if(비밀번호===''){
                modalShowFn('비밀번호를 입력하세요.');
            }
            else if(비밀번호확인===''){
                modalShowFn('비밀번호확인을 입력하세요.');
            }
            else if(이름===''){
                modalShowFn('이름을 입력하세요.');
            }
            else if(이메일===''){
                modalShowFn('이메일을 입력하세요.');
            }
            else if(휴대폰===''){
                modalShowFn('휴대폰을 입력하세요.');
            }
            else if(주소1===''){
                modalShowFn('주소를 입력하세요.');
            }
            else if(주소2===''){
                modalShowFn('세부주소를 입력하세요.');
            }
            else if(이용약관동의.length<3){
                modalShowFn('필수 이용약관을 동의해 주세요.');
            }
            else if(아이디중복확인===false){
                modalShowFn('아이디 중복확인을 진행하세요.');
            }
            else if(이메일확인===false){
                modalShowFn('이메일 중복확인을 진행하세요');
            }
            else if(인증번호확인Ok===false){
                modalShowFn('인증번호를 다시 확인하세요');
            }

            return;
        }
        else{
            //필수약관 3개미만이면 리턴
            let cnt=0;
            이용약관동의.map((item)=>{
                if(item.includes('필수')){
                    cnt++;
                }
            });

            if(cnt<3){
                modalShowFn('필수 이용약관을 동의해 주세요.');
                return;
            }
            else{

                let temp= {
                    아이디: 아이디,
                    비밀번호: 비밀번호,
                    비밀번호확인: 비밀번호확인,
                    이름: 이름,
                    이메일: 이메일,
                    휴대폰: 휴대폰,
                    주소: `${주소1} ${주소2}`,
                    성별: 성별,
                    생년월일: `${년}-${월}-${일}`,
                    추가입력사항: `${추가입력사항선택} : ${추가입력사항}`,
                    이용약관동의: 이용약관동의
                };
    
                //로컬스토레지는 객체저장 불가 > 문자열로 변환(JSON.stringify())
                localStorage.setItem(temp.아이디, JSON.stringify(temp));
    
                //저장완료 메세지
                modalShowFn('회원가입이 완료되었습니다.')
    
                //초기화
                setField({
                    ...field,
                    아이디:'',
                    아이디중복확인:true,
                    isShowId:false,
                    isClassId:'',
                    
                    비밀번호:'',
                    isShowPw:false,
                    isClassPw1:'',
                    isClassPw2:'',
                    isClassPw3:'',
    
                    비밀번호확인:'',
                    isShowPwRe:false,
                    isClassPwRe:'',
    
                    이름:'',
    
                    이메일:'',
                    이메일확인:true,
    
                    휴대폰:'',
                    휴대폰확인:'',
                    isDisabledHp:true,
                    isShowHp:false,
                    minutes: 2,
                    seconds: 59,
                    인증번호:'',
                    setId:0,
                    인증번호확인:'',
                    인증번호확인Ok:false,
                    isDisabledHpInput:false,
                    isDisabledHpBtn:false,
                    isClassHp1:false,
                    isClassHp2:false,
                    isShowHpSpan:true,
    
                    주소1:'',
                    주소2:'',
                    isShowAddress:false,
    
                    성별: '선택안함',
    
                    년:'',
                    월:'',
                    일:'',
                    isShowBirth:false,
                    isShowBirthText:'',
    
                    추가입력사항선택:'',
                    isShowAdd:false,
                    추가입력사항:'',
                    
                    이용약관동의: []
                });
            }

            

        }
    }

    return (
        <section id="member">
                <div className="container">
                    <div className="wrap">
                        {/* <!-- 타이틀 --> */}
                        <div className="title">
                            <h2>회원가입</h2>
                        </div>
                        {/* <!-- 전송할 회원가입폼 --> */}
                        <div className="content">
                            <form onSubmit={onSubmitMember} id="member" name="member" method="post" action="response.php" autoComplete='off'>
                                <ul id="memberForm">
                                    <li>
                                        <h3><i>*</i><span>필수입력사항</span></h3>
                                    </li>
                                    <li>
                                        <div className="left">
                                            <label><span>아이디</span><i>*</i></label>
                                        </div>
                                        <div className="right">
                                            <input 
                                            type="text" 
                                            id="inputId" 
                                            name="inputId" 
                                            placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합" 
                                            maxLength='20'
                                            onChange={onChangeId}
                                            onFocus={onFocusId}
                                            value={field.아이디}
                                            />
                                            <button onClick={onClickIdOk} className="id-double-btn">중복확인</button>
                                            {
                                                field.isShowId && (
                                                    <div className="guide-text guide-id">
                                                        <p className={field.isClassId===''?'':(field.isClassId===false ? 'error':'success')}>6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                                                        <p>아이디 중복확인</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <div className="left">
                                            <label><span>비밀번호</span><i>*</i></label>
                                        </div>
                                        <div className="right">
                                            <input 
                                            type="password" 
                                            id="inputPw" 
                                            name="inputPw" 
                                            placeholder="비밀번호를 입력해주세요" 
                                            maxLength='20'
                                            onChange={onChangePw}
                                            onFocus={onFocusPw}
                                            value={field.비밀번호}
                                            />
                                            {
                                                field.isShowPw && (
                                                    <div className="guide-text guide-pw">
                                                        <p className={field.isClassPw1===''?'':(field.isClassPw1 ? 'success':'error')}>10자 이상 입력</p>
                                                        <p className={field.isClassPw2===''?'':(field.isClassPw2 ? 'success':'error')}>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                                                        <p className={field.isClassPw3===''?'':(field.isClassPw3 ? 'success':'error')}>동일한 숫자 3개 이상 연속 사용 불가</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <div className="left">
                                            <label><span>비밀번호확인</span><i>*</i></label>
                                        </div>
                                        <div className="right">
                                            <input 
                                            type="password" 
                                            id="inputPwConfirm" 
                                            name="inputPwConfirm" 
                                            placeholder="비밀번호를 한번 더 입력해주세요" 
                                            maxLength='20'
                                            onChange={onChangePwRe}
                                            onFocus={onFocusPwRe}
                                            value={field.비밀번호확인}
                                            />
                                            {
                                                field.isShowPwRe && (
                                                    <div className="guide-text guide-pw-confirm">
                                                        <p className={field.isClassPwRe===''?'':(field.isClassPwRe?'success':'error')}>동일한 비밀번호를 입력해주세요.</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <div className="left">
                                            <label><span>이름</span><i>*</i></label>
                                        </div>
                                        <div className="right">
                                            <input 
                                            type="text" 
                                            id="inputName" 
                                            name="inputName" 
                                            placeholder="이름을 입력해주세요" 
                                            maxLength='30'
                                            onChange={onChangeName}
                                            value={field.이름}
                                            />
                                            
                                        </div>
                                    </li>
                                    <li>
                                        <div className="left">
                                            <label><span>이메일</span><i>*</i></label>
                                        </div>
                                        <div className="right">
                                            <input 
                                            type="email" 
                                            id="inputEmail" 
                                            name="inputEmail" 
                                            placeholder="예:marketkurly@kurly.com" 
                                            maxLength="50"
                                            onChange={onChangeEmail}
                                            value={field.이메일}

                                            />
                                            <button onClick={onClickEmailOk} className="email-double-btn">중복확인</button>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="left">
                                            <label><span>휴대폰</span><i>*</i></label>
                                        </div>
                                        <div className="right">
                                            <input 
                                            type="text" 
                                            id="inputPhone" 
                                            name="inputPhone" 
                                            placeholder="숫자만 입력해주세요" 
                                            maxLength='11'
                                            onChange={onChangeHp}
                                            value={field.휴대폰}
                                            />
                                            <button onMouseDown={onMouseDownHp} onClick={onClickHp} disabled={field.isDisabledHp} className={field.isDisabledHp?"phone-btn":"phone-btn on"}>인증번호 받기</button>
                                            
                                            {
                                                field.isShowHp && (
                                                    <>
                                                    <input disabled={field.isDisabledHpInput} onChange={onChangeHpNum} type="text" id="inputPhoneok" className={field.isClassHp1?'ok':''} name="inputPhoneok" placeholder="인증번호를 입력해주세요" maxLength='6' value={field.인증번호확인}/>
                                                    <button disabled={field.isDisabledHpBtn} onClick={onClickHpConfirm} className={field.isClassHp2?"phone-btn phone-ok-btn ok":"phone-btn phone-ok-btn"}>인증번호 확인</button>
                                                    
                                                    {
                                                        field.isShowHpSpan && (
                                                            <span className="count-timer">{field.minutes} : {field.seconds<10? `0${field.seconds}`:field.seconds}</span>
                                                        )
                                                    }
                                                    </>
                                                )
                                                
                                            }
                                        </div>
                                    </li>
                                    <li className="address">
                                        <div className="left">
                                            <label><span>주소</span><i>*</i></label>
                                        </div>
                                        <div className="right">
                                            {
                                                field.isShowAddress && (
                                                    <>
                                                    <input onChange={onChangeAddress1} value={field.주소1} type="text" name="inputAddress1" id="inputAddress1" placeholder="검색주소"/>
                                                    <input onChange={onChangeAddress2} value={field.주소2} type="text" name="inputAddress2" id="inputAddress2" placeholder="세부주소를 입력하세요"/>
                                                    </>
                                                )
                                            }
                                            <button onClick={onClickAddress} id="addressBtn" className="address-btn" title="주소검색"><span><img src="./images/ico_search.svg" alt=""/><i className="address-text">주소 검색</i></span></button>
                                            <div className="guide-text guide-transfer">
                                                <h4> </h4>
                                            </div>
                                            <p className="address-guidetext">배송지에 따라 상품 정보가 달라질 수 있습니다.</p>

                                            {/* 주소 검색 카카오 패키지 컴포넌트 API */}
                                            <div id="postcode">
                                                {
                                                    field.isShowAddress && (
                                                        <div>
                                                            <Postcode
                                                            style={postStyle}
                                                            onComplete={onCompletePost}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="left">
                                            <label><span>성별</span></label>
                                        </div>
                                        <div className="right gender">
                                            <label htmlFor="male">
                                                <input onChange={onChangeGender} checked={field.성별.includes('남자')} type="radio" id="male" name="gender" value="남자"/>
                                                <span>남자</span>
                                            </label>
                                            <label htmlFor="female">
                                                <input onChange={onChangeGender} checked={field.성별.includes('여자')} type="radio" id="female" name="gender" value="여자"/>
                                                <span>여자</span>
                                            </label>
                                            <label htmlFor="none">
                                                <input onChange={onChangeGender} checked={field.성별.includes('선택안함')} type="radio" id="none" name="gender" value="선택안함"/>
                                                <span>선택안함</span>
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="left">
                                            <label><span>생년월일</span></label>
                                        </div>
                                        <div className="right">
                                            <div className="date-box">
                                                <ul>
                                                    <li><input type="text" onChange={onChangeYear} onBlur={onBlurBirth} value={field.년} id="year" name="year" placeholder="YYYY" maxLength='4'/></li>
                                                    <li><span>/</span></li>
                                                    <li><input type="text" onChange={onChangeMonth} onBlur={onBlurBirth} onFocus={onBlurBirth} value={field.월} id="month" name="month" placeholder="MM" maxLength='2'/></li>
                                                    <li><span>/</span></li>
                                                    <li><input type="text" onChange={onChangeDate} onBlur={onBlurBirth} onFocus={onBlurBirth} value={field.일} id="date" name="date" placeholder="DD" maxLength='2'/></li>
                                                </ul>
                                            </div>
                                            <div className="guide-text guide-birthday-confirm">
                                                {
                                                    field.isShowBirth && (
                                                        <p className="error">{field.isShowBirthText}</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </li>
                                    <li className="add-input-item">
                                        <div className="left">
                                            <label><span>추가입력 사항</span></label>
                                        </div>
                                        <div className="right gender add">
                                            <label htmlFor="add1">
                                                <input onChange={onChangeAdd} checked={field.추가입력사항선택.includes('추천인 아이디')} type="radio" id="add1" name="add" className="add-radio" value="추천인 아이디"/>
                                                <span>추천인 아이디</span>
                                            </label>
                                            <label htmlFor="add2">
                                                <input onChange={onChangeAdd} checked={field.추가입력사항선택.includes('참여 이벤트')} type="radio" id="add2" name="add" className="add-radio" value="참여 이벤트"/>
                                                <span>참여 이벤트</span>
                                            </label>
                                            {
                                                field.isShowAdd && (
                                                    <div className="add-input-box">
                                                        <input onChange={onChangeAddInput} type="text" name="inputAdd" id="inputAdd" placeholder=""/>
                                                        <p>
                                                            추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                                                            가입 이후, 수정이 불가합니다.<br/>
                                                            대소문자 및 띄어쓰기에 유의해주세요.
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </li>
                                    
                                    <li>
                                        <hr/>
                                    </li>
                                    {/* <!-- 약관동의 (체크박스)--> */}
                                    <li className="check-box">
                                        <div className="left">
                                            <label><span>이용약관동의</span><i>*</i></label>
                                        </div>
                                        <div className="right service">
                                            <ol>
                                                <li>
                                                    <label htmlFor="chkAll">
                                                        <input onChange={onChangeServiceAll} checked={field.이용약관동의.length>=7 ? true : false} type="checkbox" id="chkAll" name="chkAll" value="전체동의합니다"/>
                                                        <span>전체 동의합니다.</span>
                                                    </label>
                                                    <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                                </li>
                                                <li className="view-box">
                                                    <label htmlFor="chk1">
                                                        <input onChange={onChangeService} checked={field.이용약관동의.includes('이용약관동의(필수)')} type="checkbox" id="chk1" name="chk1" className="chkbox-btn" value="이용약관동의(필수)"/>
                                                        <span>이용약관 동의<i>(필수)</i></span>
                                                    </label>
                                                    <span className="view-btn-box">
                                                        <a href="#!" title="약관보기">약관보기<i>&gt;</i></a>
                                                    </span>
                                                </li>
                                                <li className="view-box">
                                                    <label htmlFor="chk2">
                                                        <input onChange={onChangeService} checked={field.이용약관동의.includes('개인정보 수집·이용 동의(필수)')} type="checkbox" id="chk2" name="chk2" className="chkbox-btn" value="개인정보 수집·이용 동의(필수)"/>
                                                        <span>개인정보 수집·이용 동의<i>(필수)</i></span>
                                                    </label>
                                                    <span className="view-btn-box">
                                                        <a href="#!" title="약관보기">약관보기<i>&gt;</i></a>
                                                    </span>
                                                </li>
                                                <li className="view-box">
                                                    <label htmlFor="chk3">
                                                        <input onChange={onChangeService} checked={field.이용약관동의.includes('개인정보 수집·이용 동의(선택)')} type="checkbox" id="chk3" name="chk3" className="chkbox-btn" value="개인정보 수집·이용 동의(선택)"/>
                                                        <span>개인정보 수집·이용 동의<i>(선택)</i></span>
                                                    </label>
                                                    <span className="view-btn-box">
                                                        <a href="#!" title="약관보기">약관보기<i>&gt;</i></a>
                                                    </span>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk4">
                                                        <input onChange={onChangeService} checked={field.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의')} type="checkbox" id="chk4" name="chk4" className="chkbox-btn" value="무료배송, 할인쿠폰 등 혜택/정보 수신 동의"/>
                                                        <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의</span>
                                                    </label>
                                                    <dl>
                                                        <dd>
                                                            <label htmlFor="chk5">
                                                                <input onChange={onChangeService} checked={field.이용약관동의.includes('SMS')} type="checkbox" id="chk5" name="chk5" className="chkbox-btn" value="SMS"/>
                                                                <span>SMS</span>
                                                            </label>
                                                            <label htmlFor="chk6">
                                                                <input onChange={onChangeService} checked={field.이용약관동의.includes('이메일')} type="checkbox" id="chk6" name="chk6" className="chkbox-btn" value="이메일"/>
                                                                <span>이메일</span>
                                                            </label>
                                                        </dd>
                                                        <dt>
                                                            <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                                        </dt>
                                                    </dl>
                                                </li>
                                                <li>
                                                    <label htmlFor="chk7">
                                                        <input onChange={onChangeService} checked={field.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')} type="checkbox" id="chk7" name="chk7" className="chkbox-btn" value="본인은 만 14세 이상입니다.(필수)"/>
                                                        <span>본인은 만 14세 이상입니다.<i>(필수)</i></span>
                                                    </label>
                                                </li>
                                            </ol>
                                            
                                        </div>
                                    </li>
                                    <li className="bottom-line">
                                        <hr/>
                                    </li>
                                    <li className="button-box">
                                        <button type="submit" className="submit-btn">가입하기</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>
                
        </section>
    );
};

MemberComponent.defaultProps={
    이용약관: [
        '이용약관동의(필수)',
        '개인정보 수집·이용 동의(필수)',
        '개인정보 수집·이용 동의(선택)',
        '무료배송, 할인쿠폰 등 혜택/정보 수신 동의',
        'SMS',
        '이메일',
        '본인은 만 14세 이상입니다.(필수)'
    ]
}

export default MemberComponent;