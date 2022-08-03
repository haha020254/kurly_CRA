(function($){

    var idOk = false;
    var pw1Ok = false;
    var pw2Ok = false;
    var pw3Ok = false;
    var pwConfirmOk=false;
    var emailOk = false;
    var ok =false; //휴대폰 인증
    

    //아이디 입력제한
    //정규표현식 : 아이디 - 6자 이상, 영문으로 입력
    // /정규표현식/ 슬래쉬는 정규표현식 앞뒤를 감싼다.
    //시작: ^   끝: $   문자범위: []  숫자[0-9]: digit(\d)  숫자가 아닌것[^0-9] : digit(\D) 
    //수량: {6,} - 6자 이상  {6,20} - 6자 이상 20자 이내   [^]: 대괄호 안에 ^는 부정의 의미
    //const regExpId = /[A-Za-z0-9]{6,}/; 
    //const regExpId = /^[A-Za-z0-9]{6,20}$/;
    //const regExpId = /^[A-Za-z0-9]{6,}$/;
    //모든문자: .
    // \s 역슬래쉬 s space 공백허용
    // ^\s 역슬래쉬 s space 공백불가
    //const regExpId = /.[^\s]{10,}/; //글자길이만 체크,공백 불허

    //테스트
        /* console.log(regExpId.test('love')); //적합 (true)
        console.log(regExpId.test('1234love'));
        console.log(regExpId.test('러브 러브')); //한글,공백 오류 (false)
        console.log(regExpId.test('!@#$')); //특수문자 오류 (false)
        console.log(regExpId.test('avbdf')); //특수문자 오류 (false)
 */
   
   //마우스가 입력상자에 클릭 다운되면 가이드 텍스트 보이기
    $('#inputId').on({
        mousedown: function(){
            $('.guide-id').show();
        }
    });
    $('#inputPw').on({
        mousedown: function(){
            $('.guide-pw').show();
        }
    });
    
   
    //아이디 정규표현식
    //+: 필수,1회이상 연속사용 *: 선택사항,0회 이상 연속사용  ?: 1자리 연속불가
    //6자 이상의 영문+ 혹은 영문과 숫자*를 조합
    //(?=.*[A-Za-z])+ 영문은 반드시 1자이상 와야한다.
    //(?=.*[0-9])* 숫자는 1자이상 올수도 있다.
    //[A-Za-z0-9] 문자, 숫자 포함 범위
    //{6,} 6자 이상
    //const regExpId = /(?=.*[가-힣ㄱ-ㅎㅏ-ㅣ])(){6,}/;

    //console.log(event);
            //console.log(event.keyCode);
            //console.log(event.currentTarget);
            //console.log(event.originalEvent.key);
            //console.log(event.originalEvent.keyCode);
            //if(event.originalEvent.keyCode === 13){
            /* if(event.keyCode === 13){
                alert('엔터키');
            }
            if(event.keyCode === 37){
                alert('왼쪽방향키');
            }
            if(event.keyCode === 38){
                alert('위쪽방향키');
            }
            if(event.keyCode === 39){
                alert('오른쪽방향키');
            }
            if(event.keyCode === 40){
                alert('아래쪽방향키');
            }
            if(event.keyCode === 27){
                alert('취소되었습니다');
            }
            if(event.keyCode === 18){
                alert('ALT');
            } */
    
            //글자 단위로(문자열) 진위여부 체크
            //var idValue = $(this).val();
            //console.log('idValue',idValue);
            //console.log('idValue.toString()',idValue.toString()); //입력값을 문자열로 변환

   //키보드가 내려가서 올라올 때 점검
    $('#inputId').on({
        keyup: function(event){
            event.preventDefault();
            var regExp = /^(((?=.*[A-Za-z])+(?=.*[0-9])*)+([^가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^&*\(\)\-_\=\+\\\{\}\[\]\?\/\.\,\<\>\~\`\:\;\'\"]))[^\s][A-Za-z0-9]{6,}$/g;
            var idValue = $(this).val().toString();

            //입력값이 없을때
            if(idValue===''){
                $('.guide-id p').eq(0).removeClass('error');
                $('.guide-id p').eq(0).removeClass('success');
                idOk=false;
            }
            //입력값이 있을때
            else{
                if(regExp.test(idValue)===true){
                    $('.guide-id p').eq(0).removeClass('error');
                    $('.guide-id p').eq(0).addClass('success');
                    idOk=true;
                }
                else if(regExp.test(idValue)===false){
                    $('.guide-id p').eq(0).removeClass('success');
                    $('.guide-id p').eq(0).addClass('error');
                    idOk=false;
                }
            }
            
        }
    });
    
    //아이디 중복체크 함수
    function idDoubleCheck(){
        //아이디 중복 체크
        //1.아이디 입력값
        //2.로컬스토레이지에 저장된 데이터(데이터베이스) 가져오기
        //3.가져온 데이터 아이디만 추출하기
        //4.반복 비교하기 $('#inputId').val() === 로컬스토레이지.아이디
        //$('#inputId').val() === localStorage.아이디  
        //같다면 =>이미 등록된 아이디 입니다.
        //다르면 =>사용이 가능합니다.

        //1.아이디 입력값
        var inputId = $('#inputId').val();
        console.log('입력된글자', inputId);
        var ok =false; //중복확인 변수

        //2.로컬스토레이지에 저장된 데이터 가져오기
        for(let i=0; i<localStorage.length; i++){
            //console.log(localStorage.key(i)); //key 가져오기
            //console.log(localStorage.getItem(localStorage.key(i))); //value가져오기
            //console.log(JSON.parse(localStorage.getItem(localStorage.key(i))).아이디); //JSON 객체변환
            if(JSON.parse(localStorage.getItem(localStorage.key(i))).아이디===inputId){
                ok =true; //중복
               
            }
        }
        //반복비교가 끝나고 결과를 비교한다.
        if(ok===true){
            alert('이미 등록된 아이디입니다');
            idOk=false;
            $('.guide-id p').eq(1).removeClass('success');
            $('.guide-id p').eq(1).addClass('error');
        }
        else{
            alert('사용가능한 아이디입니다.');
            idOk=true;
            $('.guide-id p').eq(1).removeClass('error');
            $('.guide-id p').eq(1).addClass('success');
        }
    }

    //아이디 버튼 클릭 이벤트
    $('.id-double-btn').on({
        click: function(e){
            e.preventDefault();
            var regExp = /^(((?=.*[A-Za-z])+(?=.*[0-9])*)+([^가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^&*\(\)\-_\=\+\\\{\}\[\]\?\/\.\,\<\>\~\`\:\;\'\"]))[^\s][A-Za-z0-9]{6,}$/g;
            var idValue = $('#inputId').val().toString();
            
            //입력값이 없을때
            if(idValue===''){
                $('.guide-id p').eq(0).removeClass('error');
                $('.guide-id p').eq(0).removeClass('success');
                modal('아이디를 입력해주세요.');
                idOk=false;
                return;
            }
            //입력값이 있을때
            else{
                if(regExp.test(idValue)===true){
                    $('.guide-id p').eq(0).removeClass('error');
                    $('.guide-id p').eq(0).addClass('success');
                    
                    //중복체크 함수 호출
                    idDoubleCheck();
                    
                }
                else if(regExp.test(idValue)===false){
                    $('.guide-id p').eq(0).removeClass('success');
                    $('.guide-id p').eq(0).addClass('error');
                    modal('아이디는 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다')
                    idOk=false;
                    return;
                }
            }
        }
    });


    //비밀번호
    //1.10자이상
    //2.영문필수 이고(and &)
    //  숫자* 또는 (or |) 특수문자* 두가지 중에 한가지 이상 조합, 공백제외, 2개이상 조합
    //3.동일한 숫자 3개이상 연속사용불가
    $('#inputPw').on({
        keyup: function(e){
            e.preventDefault();
            var regExp1 = /.{10,}/;
            var regExp2 = /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%&*_-])+)+)[^\s][A-Za-z0-9!@#$%&*_-]{10,}/;
            var regExp3 = /(.)\1\1/; //긍정문
            var pwValue = $(this).val().toString();
            //1.10자이상
            if(pwValue===''){
                $('.guide-pw p').eq(0).removeClass('error');
                $('.guide-pw p').eq(0).removeClass('success');
                pw1Ok=false;
            }
            else{
                if(regExp1.test(pwValue)){
                $('.guide-pw p').eq(0).removeClass('error');
                $('.guide-pw p').eq(0).addClass('success');
                pw1Ok=true;
                }
                else{
                $('.guide-pw p').eq(0).removeClass('success');
                $('.guide-pw p').eq(0).addClass('error');
                pw1Ok=false;
                }
            }
            //2.영문필수, 숫자 or 특수문자 > 2가지 이상 조합
            if(pwValue===''){
                $('.guide-pw p').eq(1).removeClass('error');
                $('.guide-pw p').eq(1).removeClass('success');
                pw2Ok=false;
            }
            else{
                if(regExp2.test(pwValue)){
                $('.guide-pw p').eq(1).removeClass('error');
                $('.guide-pw p').eq(1).addClass('success');
                pw2Ok=true;
                }
                else{
                $('.guide-pw p').eq(1).removeClass('success');
                $('.guide-pw p').eq(1).addClass('error');
                pw2Ok=false;
                }
            }
            //3.동일한 숫자 3개 연속 사용 불가
            if(pwValue===''){
                $('.guide-pw p').eq(2).removeClass('error');
                $('.guide-pw p').eq(2).removeClass('success');
                pw3Ok=false;
            }
            else{
                if(regExp3.test(pwValue)){ //숫자 연속 3개이상 사용했다면
                $('.guide-pw p').eq(2).removeClass('success');
                $('.guide-pw p').eq(2).addClass('error');
                pw3Ok=false;
                }
                else{
                $('.guide-pw p').eq(2).removeClass('error');
                $('.guide-pw p').eq(2).addClass('success');
                pw3Ok=true;
                }
            }


        }
    });


    //비밀번호 확인
    $('#inputPwConfirm').on({
        keyup: function(){
            if($(this).val()===''){
                $('.guide-pw-confirm').hide();
                $('.guide-pw-confirm p').removeClass('error')
                $('.guide-pw-confirm p').removeClass('success')
                pwConfirmOk=false;
            }
            else{
                $('.guide-pw-confirm').show();
                if($('#inputPw').val()===$(this).val()){
                    $('.guide-pw-confirm p').removeClass('error')
                    $('.guide-pw-confirm p').addClass('success')
                    pwConfirmOk=true;
                }
                else{
                    $('.guide-pw-confirm p').removeClass('success')
                    $('.guide-pw-confirm p').addClass('error')
                    pwConfirmOk=false;
                }
            }
        }
    });




    //이름
    $('#inputName').on({
        keyup: function(){
            //영문,한글,공백만 입력 . 나머진 모두 삭제
            $(this).val($(this).val().toString().replace( /[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, ''));
        }
    });




    //이메일
    //Seyeon@naver.com
    //Se-yeon@green.go.kr
    //Se_yeon@green.co.kr
    //Seyeon96@green.co.kr
    //96Seyeon@green.co.kr
    //입력이 완료되면, 중복확인 버튼을 클릭하여 입력정보 데이터를 정규표현식으로 전위여부를 판단
    //입력 데이터 오류가 있으면 알림창을 모달창으로 띄운다.
    //오류가 없으면 저장된 데이터 전체와 입력데이터를 비교하여 중복확인한다.


    //이메일 중복 체크 함수
    function emailDoubleCheck(){
        //1.이메일 입력 데이터
        //2.저장된 로컬스토레이지(데이터) 가져오기
        //3.가져온 데이터에서 이메일 추출 비교 변수 저장
        //4.저장된 변수 값 비교 중복체크 경고창
        var inputEmail = $('#inputEmail').val();
        var ok = false;

        for(let i=0; i<localStorage.length; i++){
            if( JSON.parse(localStorage.getItem(localStorage.key(i))).이메일 === inputEmail){
                ok=true;
            }
        }
        //중복체크
        if(ok===true){
            alert('중복된 이메일 입니다.');
            emailOk=false;
        }
        else{
            alert('사용이 가능합니다.');
            emailOk=true;
        }
    }


    $('.email-double-btn').on({
        click: function(e){
            e.preventDefault();

            var inputEmailValue = $('#inputEmail').val();
            var inputEmail = $('#inputEmail');
            var regExpEmail = /^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
            var message = '';

            //버튼 클릭시 초기화
            inputEmail.removeClass('error');

            if(inputEmailValue===''){ //입력값이 없으면 알림창 띄우기
                message= '이메일 주소를 입력해주세요.';
                modal(message);
                emailOk=false;
            }
            else{ //아니면 정규표현식 검증
                if(regExpEmail.test(inputEmailValue)===false){
                    inputEmail.addClass('error');
                    inputEmail.focus();
                    message='잘못된 이메일 형식입니다.';
                    modal(message);
                    emailOk=false;
                }
                else{
                    inputEmail.removeClass('error');
                    
                    //중복 이메일 함수 호출 실행
                    emailDoubleCheck();
                }                
            }
            
        }
    });
    
    
    //휴대폰 입력제한
    $('#inputPhone').on({
        keyup: function(e){
            var phoneValue = $('#inputPhone').val();
            var regExp1 = /[^0-9]/g; //숫자가 아닌것 판별 그리고 삭제(문자를 공백으로 치환(Replace))
                
                //숫자가 아니면 모두 자동 삭제
                $('#inputPhone').val(phoneValue.replace(regExp1,''));
                if(phoneValue===''){
                    $(this).removeClass('error');
                    $('.phone-btn').removeClass('on');
                }
                else{
                    if(phoneValue.length>=10){
                        $('.phone-btn').addClass('on');
                    }
                    else{
                        $('.phone-btn').removeClass('on');
                    }
                }
            
        }
    });

    //휴대폰 인증번호 받기 클릭이벤트
    $('.phone-btn').eq(0).on({
        click: function(e){
            e.preventDefault();
            var phoneValue = $('#inputPhone').val();
            var regExp2 = /^01[0|6|7|8|9]+\d{3,4}\d{4}$/;
            //var regExp3 = /^\d{2,3}+\d{3,4}\d{4}$/;


            //휴대폰 번호 입력값이 없으면 클릭 불가
            if($('#inputPhone').val()<10){
                return;
            }
            if(regExp2.test(phoneValue)===false){
                $('#inputPhone').addClass('error');
                modal('잘못된 번호입니다. 다시 시도해주세요.')
            }
            else{
                modal('인증번호가 발송되었습니다.')
                $('#inputPhone').removeClass('error');
                $('#inputPhoneok, .phone-ok-btn, .count-timer').show();
                //카운트 타이머함수 호출 실행
                countTimer();

            }
        }
    });


    //카운트 타이머함수
    var setId = 0;
    function countTimer (){
        //타이머 3분 카운트
        var seconds = 60;
        var minutes = 2;

        setId = setInterval(function(){
            seconds--;
            if(seconds<0){
                minutes--;
                seconds=59; //초 초기화(59~00)
                if(minutes<0){
                    clearInterval(setId); //타이머 종료
                    $('#inputPhoneok, .phone-ok-btn').prop('disabled',true);
                    $('#inputPhoneok, .phone-ok-btn').addClass('ok');
                    modal('인증 제한 시간이 지났습니다.');
                    $('.count-timer').html('');
                    return;
                }
            }
            $('.count-timer').html(minutes + ':' + (seconds<10?('0'+seconds) : seconds));
            
        },1000);
        
    }

    //인증번호 확인 버튼 클릭 이벤트
    
    $('.phone-btn').eq(1).on({
        click: function(e){
            e.preventDefault();
            var okkey = '123456';

            if($('#inputPhoneok').val()===okkey){
                clearInterval(setId); //타이머 종료
                $('#inputPhoneok, .phone-ok-btn').prop('disabled',true);
                $('#inputPhoneok, .phone-ok-btn').addClass('ok');
                $('.count-timer').html('');
                $('#inputPhoneok').val('');
                modal('인증이 완료되었습니다.');
                ok=true;
                return;
            }
            else{
                modal('다시 한번 인증을 시도해 주세요.');
                return;
            }
        }
    });





    //주소 검색 버튼 클릭 이벤트
    $('#addressBtn').on({
        click: function(e){
            e.preventDefault();
            $('.address input').show();
            var txt = '';
            var str = '';

            //주소검색 카카오(다음) 구현
            new daum.Postcode({
                oncomplete: function(data){
                    /* console.log(data);
                    console.log(data.zonecode); //우편번호
                    console.log(data.address); //도로명주소
                    console.log(data.roadAddress); //도로명주소
                    console.log(data.roadAddressEnglish); //도로명주소 (영문)
                    console.log(data.JibunAddress); //지번주소 */

                    $('#inputAddress1').val(`${data.zonecode} ${data.address}`);
                    $('#inputAddress2').focus(); //입력대기 (커서 깜빡임)
                    $('.guide-transfer').addClass('on');
                    //샛별배송|택배배송|배송불가
                   
                    str = $('#inputAddress1').val();

                    //검색정보 값이 없으면 -1,  있으면 글자 시작위치의 인덱스 번호
                    console.log($('#inputAddress1').val().indexOf('서울'))
                    if(str.indexOf('서울') >=0){
                        txt='샛별배송';
                        $('.guide-transfer h4').removeClass('not');
                    }
                    else if(str.indexOf('경기') >=0){
                        txt='샛별배송';
                        $('.guide-transfer h4').removeClass('not');
                    }
                    else if(str.indexOf('제주') >=0){
                        txt='배송불가';
                        $('.guide-transfer h4').addClass('not');
                    }
                    else if(str.indexOf('울릉') >=0 ){
                        txt='배송불가';
                        $('.guide-transfer h4').addClass('not');
                    }
                    else if(str.indexOf('독도') >=0){
                        txt='배송불가';
                        $('.guide-transfer h4').addClass('not');
                    }   
                    else{
                        txt ='택배배송';
                        $('.guide-transfer h4').removeClass('not');
                    }
                
                    $('.guide-transfer h4').text(txt);
                    $('#addressBtn').removeClass('address-btn');
                    $('.address-text').text('재검색');

                }
            }).open();

            
        }
    });




    //성별



 //////////////////////////////////////////////////////////////////////////////////////////////////////

    //생년월일
    //입력상자 포커스 이벤트 
    //년: 만 14세 미만은 가입이 불가합니다. hide | show
    //월: x태어난 월을 정확하게 입력해주세요. show | hide
    //일: x태어난 일을 정확하게 입력해주세요. hide | show

    //<p class="error">만 14세 미만은 가입이 불가합니다.</p>
    //<p class="error">태어난 월을 정확하게 입력해주세요.</p>
    //<p class="error">태어난 일을 정확하게 입력해주세요.</p>


    //나이계산: 14세미만


    //날짜(일): 월별 마지막날 체크
    /* console.log(new Date());
    console.log(new Date().getFullYear()); //1900~
    console.log(new Date().getMonth()+1); // 0~11
    console.log(new Date().getDate()); // 1~31
    console.log(new Date().getDay()); //0~6

    //월체크
    var y = new Date().getFullYear();
    var m = new Date().getMonth()+1;
    var d = new Date().getDate();

    if(new Date().getDay()===0){
        console.log(d+ '일요일');
    }
    else if(new Date().getDay()===1){
        console.log(d+ '월요일');
    }
    else if(new Date().getDay()===2){
        console.log(d+ '화요일');
    }
    else if(new Date().getDay()===3){
        console.log(d+ '수요일');
    }
    else if(new Date().getDay()===4){
        console.log(d+ '목요일');
    }
    else if(new Date().getDay()===5){
        console.log(d+ '금요일');
    }
    else{
        console.log(d+ '토요일');
    }

    console.log(new Date(y,m,0).getDate()); //월 마지막날 */

    
    
    //입력상자의 값이 숫자가 아니면 모두 제거
    function inputBoxRegExpCheck(value){ 
        var regExp = /[^0-9]/g;
        return value.trim().replace(regExp,'');
        
    }
    //생년월일 입력상자 체크함수
    function birthdayCheck(){
        //현재 년월일 데이터
        var nowYear = new Date().getFullYear();
        var nowMonth = new Date().getMonth()+1;
        var nowDate = new Date().getDate();
        var nowDay = new Date().getDay();
        var nowHours = new Date().getHours();
        var nowMinutes = new Date().getMinutes();
        var nowSeconds = new Date().getSeconds();

        //현재 년월일
        var today = new Date(nowYear, nowMonth, nowDate);

        //생년월일 데이터
        var year = $('#year').val().trim().toString();
        var month = $('#month').val().trim().toString();
        var date = $('#date').val().trim().toString();
        var birthLastDate = new Date(year, month, 0); //생년월일 : 말일

        
        

        //2022년 달력에 말일 모두 표시
        /* console.log( '01월', new Date(2022, 01, 0));
        console.log( '02월', new Date(2022, 02, 0));
        console.log( '03월', new Date(2022, 03, 0));
        console.log( '04월', new Date(2022, 04, 0));
        console.log( '05월', new Date(2022, 05, 0));
        console.log( '06월', new Date(2022, 06, 0));
        console.log( '07월', new Date(2022, 07, 0));
        console.log( '08월', new Date(2022, 08, 0));
        console.log( '09월', new Date(2022, 09, 0));
        console.log( '10월', new Date(2022, 10, 0));
        console.log( '11월', new Date(2022, 11, 0));
        console.log( '12월', new Date(2022, 12, 0)); */


        //1. 모두 빈 값이면 반응 없음
        if($('#year').val()==='' && $('#month').val()==='' && $('#date').val()==='' ){
            return;
        }
        else{ //하나이상 빈칸이 있으면
            //year
        
                //if(!/^(?:19\d\d|2\d\d\d)$/g.test(value)){ // 가이드 텍스트 보이기(show)
                if(!/^(?:19[0-9][0-9]|2[0-9][0-9][0-9])$/g.test(year)){ // 가이드 텍스트 보이기(show)
                    $('.guide-birthday-confirm p').show().text('태어난 년도 4자리를 정확하게 입력하세요.');
                    return;
                }
                else{ // 가이드 텍스트 숨기기 (hide) year정상
                    $('.guide-birthday-confirm p').hide();
                    
                    //month
                    if(!/^(?:0?[1-9]|1[0-2])$/g.test(month)){
                        $('.guide-birthday-confirm p').show().text('태어난 월을 정확하게 입력하세요.');
                        return;
                    }
                    else{
                        //month정상
                        $('.guide-birthday-confirm p').hide();
                        
                        //date
                        //추가항목: 태어난 월의 말일을 찾아서 본인 생일의 날짜랑 비교
                        //생일이 크면 오류
                        /* console.log(date);
                        console.log(birthLastDate);
                        console.log(birthLastDate.getFullYear()); //마지막 년
                        console.log(birthLastDate.getMonth()+1); //마지막 월
                        console.log(birthLastDate.getDate()); //마지막 일 */
                        if(!/^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g.test(date) || date > birthLastDate.getDate() ){
                            $('.guide-birthday-confirm p').show().text('태어난 일을 정확하게 입력하세요.');
                            return;
                        }
                        else{ //date정상
                            $('.guide-birthday-confirm p').hide();

                            //일까지 모두 정상이면,
                            
                            //14세미만
                            //14세 미만
                            //현재 년도의 년,월,일
                            const nowYear14 = new Date(nowYear-14, nowMonth, nowDate); //14세 미만 변수
                            const nowYear120 = new Date(nowYear-120, nowMonth, nowDate); //120세 미만 변수
                            const birthDay = new Date(year, month, date); //생년월일

                            
                            //생년월일 모두 입력 완료 된 후에 처리 할 내용 3가지: 미래, 14세미만, 120세 초과
                            
                            //-1살미만 즉 미래
                            if(birthDay > today){
                                $('.guide-birthday-confirm p').show().text('생년월일이 미래로 입력되었어요.');
                                return;
                            }
                            else{
                                $('.guide-birthday-confirm p').hide();
                            }
                            
                            //14세 미만 체크 확인
                            //birthday > nowYear14 => 14세미만
                            //console.log(nowYear14); //2022-14 = 2008
                            //console.log(birthDay); //2009

                            if(birthDay > nowYear14){
                                $('.guide-birthday-confirm p').show().text('만 14세 미만은 가입이 불가합니다.');
                                return;
                            }
                            else{
                                $('.guide-birthday-confirm p').hide();
                            }

                            //120세초과
                            if(birthDay < nowYear120){ //120세 초과 나이
                                $('.guide-birthday-confirm p').show().text('생년월일을 다시 확인해주세요.');
                                return;
                            }
                            else{
                                $('.guide-birthday-confirm p').hide();
                            }
                        }
                    }
                    
                }
        }
    }
    
    //년도 입력상자 이벤트 : keyup, focusin, focusout
    $('#year').on({
        keyup: function(){
            $(this).val(inputBoxRegExpCheck($(this).val()));
        },
        focusout: function(){
            birthdayCheck($(this).val());
        }
    });
    //월 입력상자 이벤트
    $('#month').on({
        keyup: function(){
            $(this).val(inputBoxRegExpCheck($(this).val()));
        },
        focusout: function(){
            birthdayCheck();
        },
        focusin: function(){
            birthdayCheck();
        }
    });
    //일 입력상자 이벤트
    $('#date').on({
        keyup: function(){
            $(this).val(inputBoxRegExpCheck($(this).val()));
        },
        focusout: function(){
            birthdayCheck();
        },
        focusin: function(){
            birthdayCheck();
        }
    });

    //추가입력사항
    $('.add-radio').on({
        change: function(){
            $('.add-input-box').show();
            if($(this).val()==='추천인 아이디'){
                //Attribute속성
                $('#inputAdd').attr("placeholder",'추천인 아이디를 입력해주세요.')
            }
            else{
                $('#inputAdd').attr("placeholder",'참여 이벤트명을 입력해주세요.')
            }
        }
    });

    
    //체크박스
    var chkboxBtn = $('.chkbox-btn');

    $('#chk4').on({
        change: function(){
            if($(this).is(':checked')){
                $('#chk5').prop('checked',true);
                $('#chk6').prop('checked',true);
            }
            else{
                $('#chk5').prop('checked',false);
                $('#chk6').prop('checked',false);
            }
        }
    });


    //chk5 & chk6 변화에 따라 ch4의 체크상태 변경
    $('#chk5').on({
        change: function(){
            if($('#chk5').is(':checked')===false || $('#chk6').is(':checked')===false){
                $('#chk4').prop('checked',false);
            }
            else{ //모두 true
                $('#chk4').prop('checked',true);
            }
        }
    });

    $('#chk6').on({
        change: function(){
            if($('#chk5').is(':checked')===false || $('#chk6').is(':checked')===false){
                $('#chk4').prop('checked',false);
            }
            else{
                $('#chk4').prop('checked',true);
            }
        }
    });

    //부분체크한 모든 내용은 위에 코딩한다
    //여기에서는 전체 체크상태를 확인 그리고 카운트 체크하여 변경사항을 반영
    //체크박스 이벤트
    //.chkbox-btn 7개 반복처리 - each() 사용
    chkboxBtn.each(function(idx){
        //console.log(idx);
        $(this).on({
            change:  function(){
                //console.log(idx); //선택한 체크번호 인덱스 번호
                //console.log($(this).is(':checked')); //체크 상태 확인
                //console.log($(this).val()); //선택 항몫의 값

                var cnt=0; //카운트 체크박스 체크된것만 전체갯수 증가하는 변수
                for(var i=0; i<chkboxBtn.length; i++){
                    if($(chkboxBtn).eq(i).is(':checked')===true){ // 7개를 반복 확인
                        cnt++;
                    }
                }

                 //선택된 체크박스 갯수 확인
                 //console.log(cnt);
                 if(cnt===7){
                     $('#chkAll').prop('checked', true); //전체선택(chkAll)을 체크(true)한다.
                 }
                 else{
                    $('#chkAll').prop('checked', false); //전체선택(chkAll)을 해제(false)한다.
                 }
            }
        });
    });



    //모두 체크하는 chkAll 버튼 이벤트
    $('#chkAll').on({
        change: function(){
            if($(this).is(':checked')){ //chkAll가 true이면
                $('.chkbox-btn').prop('checked',true); //7개 모두 체크
            }
            else{
                $('.chkbox-btn').prop('checked',false); //7개 모두 체크 해제
            }
        }
    });


    //모달창 이벤트 함수
    function modal(message){
        $('.modal-message').text(message);
        $('#modal').addClass('show');
    }

    $('.modal-close').on({
        click: function(){
            $('#modal').removeClass('show');  
        }
    });

    
    //////////////////////////////////////////////////////////////////

    //전송버튼 클릭 이벤트
    $('.submit-btn').on({
        click: function(e){
            e.preventDefault();
            
            var idVal = $('#inputId').val();  //필
            var pwVal = $('#inputPw').val(); //필
            var nameVal = $('#inputName').val(); //필
            var emailVal = $('#inputEmail').val(); //필
            var phoneVal = $('#inputPhone').val(); //필
            var addressVal = $('#inputAddress1').val()+ ' ' + $('#inputAddress2').val(); //필
            var genderVal = '';
            var birthDayVal = $('#year').val()+'-'+$('#month').val()+'-'+$('#date').val();
            var addInputVal = '';
            var serviceVal = []; //필

            //성별
            if($('#male').is(':checked')){
                genderVal = $('#male').val();
            }
            else if($('#female').is(':checked')){
                genderVal = $('#female').val();
            }
            else{
                genderVal = $('#none').val();
            }

            //추가입력
            if($('#add1').is(':checked')){
                addInputVal = $('#add1').val();
            }
            else{
                addInputVal = $('#add2').val();
            }

            //약관동의
            //serviceVal.push('누적할 체크박스 값');

            //반복문 사용하여 체크상자가 선택된 값을 배열에 저장한다.
            $('.chkbox-btn').each(function(){
                if($(this).is(':checked')){
                    serviceVal.push($(this).val());
                }
            });


            //필수입력사항 - 만약 하나라도 필수 입력사항이 빠지면 전송 취소 그리고 입력대기

            //체크박스 필수 항목 체크 카운트 3게 필수
            var cnt=0;
            for(var i=0; i<serviceVal.length; i++){
                if(serviceVal[i].indexOf('필수')!==-1 )
                cnt++;
            }

            if(
                idVal==='' || pwVal==='' || nameVal==='' || emailVal==='' || phoneVal==='' || addressVal==='' || 
                cnt<3 || ok === false || $('#inputAddress2').val()===''){
                if(idVal===''){
                    alert('아이디를 입력하세요.');
                }
                else if(pwVal===''){
                    alert('비밀번호를 입력하세요.')
                }
                else if(nameVal===''){
                    alert('이름을 입력하세요.')
                }
                else if(emailVal===''){
                    alert('이메일을 입력하세요.')
                }
                else if(phoneVal===''){
                    alert('휴대폰 번호를 입력하세요.')
                }
                else if(ok===false){
                    alert('휴대폰 인증을 하세요.')
                }
                else if(addressVal===''){
                    alert('주소를 입력하세요.')
                }
                else if($('#inputAddress2').val()===''){
                    alert('세부주소를 입력하세요.')
                }
                else if(cnt<3){
                    alert('필수 약관을 동의해 주세요.')
                }
                return;
            }
            else if(idOk===false|| pw1Ok===false|| pw2Ok===false ||pw3Ok===false ||pwConfirmOk===false || emailOk===false){
                if(idOk===false){
                    alert('아이디를 확인하세요.')
                }
                else if(pw1Ok===false){
                    alert('비밀번호는 10자 이상 입니다.')
                }
                else if(pw2Ok===false){
                    alert('영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합해 주세요.')
                }
                else if(pw3Ok===false){
                    alert('동일한 숫자 3개 이상 연속 사용 불가합니다.')
                }
                else if(pwConfirmOk===false){
                    alert('동일한 비밀번호를 입력해주세요.')
                }
                else if(emailOk===false){
                    alert('이메일을 확인하세요.');
                }
                
            
                return;
            }
            else{
                

                //저장할 데이터 확인
                //저장데이터를 최종 객체로 변환 후 스트링(JSON.stringfy())으로 변환 로컬스토레이지에 저장
                //console.log(idVal, pwVal, nameVal, emailVal, phoneVal, addressVal, birthDayVal,addInputVal, serviceVal);
                //정형화된 객체로 저장
                var 회원가입 = {
                    아이디:idVal,
                    비밀번호:pwVal,
                    이름:nameVal,
                    이메일:emailVal,
                    휴대폰:phoneVal,
                    주소:addressVal,
                    생년월일:birthDayVal,
                    추가입력사항:addInputVal,
                    이용약관:serviceVal
                }
                
                //로컬스토레이지 저장
                //localStorage.setItem(key,value);
                localStorage.setItem(회원가입.아이디, JSON.stringify(회원가입));

                
                format();
                
            }


            function format(){
                 //초기화
                $('#inputId').val('');
                $('#inputPw').val('');
                $('#inputPwConfirm').val('');
                $('#inputName').val('');
                $('#inputEmail').val('');
                $('#inputPhone').val('');
                $('#inputAddress1').val('');
                $('#inputAddress2').val('');
                $('#year').val('');
                $('#month').val('');
                $('#date').val('');
                serviceVal = [];
            


                //라디오버튼 초기화
                
                //성별
                $('#male').prop('checked',false);
                $('#female').prop('checked',false);
                $('#none').prop('checked',false);

                //추가입력
                $('#add1').prop('checked',false);
                $('#add2').prop('checked',false);

                //체크박스 초기화
                $('#chkAll').prop('checked',false);

                $('.chkbox-btn').each(function(){
                    $(this).prop('checked',false);
                });


                //모든 입력제한 으로 인한 클래스 지정 속성들 초기화
                $('.guide-text').hide();
                $('.guide-id p').removeClass('error');
                $('.guide-id p').removeClass('success');
                $('.guide-pw p').removeClass('error');
                $('.guide-pw p').removeClass('success');
                $('.guide-pw-confirm').hide();
                $('.guide-pw-confirm p').removeClass('error')
                $('.guide-pw-confirm p').removeClass('success')
                $('#inputEmail').removeClass('error');
                $('.phone-btn').removeClass('on');
                $('#inputPhone').removeClass('error')
                $('#inputPhoneok, .phone-ok-btn, .count-timer').hide();
                $('#inputPhoneok, .phone-ok-btn').prop('disabled', false);
                $('#inputPhoneok, .phone-ok-btn').removeClass('ok');
                $('.guide-birthday-confirm p').hide();
                $('.address input').hide();
                $('#addressBtn').addClass('address-btn');
                $('.address-text').text('주소 검색');
                $('#inputId').focus();
            }
        }
    }); //전송버튼 클릭 이벤트




        /* $('.submit-btn').on({
            click: function(e){
                e.preventDefault();
                    //약관동의 필수 사항 체크
                    var cnt=0;
                    var serviceVal = [];
                    $('.chkbox-btn').each(function(){
                         if($(this).is(':checked')){
                             serviceVal.push($(this).val());
                         }
                    });

                    //접근방식은 내용의 특정문자를 검색
                    for(i=0; i<serviceVal.length; i++){
                        if(serviceVal[i].indexOf('필수') !==-1 ){
                            cnt++;                            
                        }
                    }
                    console.log(cnt);

            }
        }); */


})(jQuery);