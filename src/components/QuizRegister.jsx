import React, {useEffect, useState} from 'react';

function QuizRegister(props) {

    const [answerObj, setAnswerObj] = useState({
        correct:null,
        incorrect1:null,
        incorrect2:null,
        incorrect3:null
    })

    /** 부모컴포넌트의 스테이트 변경을 위한 useEffect */
    useEffect(()=>{
        props.getQuestinObj(answerObj)
    },[answerObj])

    const answersOnChangeEventHandler = (e)=>{
        const target = e.target.id
        switch (target) {
            case 'correct':
                setAnswerObj({...answerObj, ...{correct : e.target.value}})
            break;
            case 'incorrect1':
                setAnswerObj({...answerObj, ...{incorrect1 : e.target.value}})
            break;
            case 'incorrect2':
                setAnswerObj({...answerObj, ...{incorrect2 : e.target.value}})
            break;
            case 'incorrect3':
                setAnswerObj({...answerObj, ...{incorrect3 : e.target.value}})
            break;
        }
    }

    const quizRegisterBtnEventHander = ()=>{
        console.log("유효성체크")
        if(!answerObj.correct || !answerObj.correct.trim()){ // null.undeifined..  || ''
            alert("정답 선택지는 필수입니다.")
            setAnswerObj({...answerObj, ...{correct:''}})
        }else{
            console.log("서버에 보낼 최종값. 부모컴포넌트로 부터 받음 : ", props.questionObj)
            // TODO 서버에 데이터 보내기
            // 서버랑 통신 후에 처리 -> 게시글로 이동하기
        }
    }

    return (
        <div>
            <div><input id="correct" type="text" value={answerObj.correct}       onChange={answersOnChangeEventHandler} placeholder='정답 선택지를 입력해주세요.'/></div>
            <div><input id="incorrect1" type="text" value={answerObj.incorrect1} onChange={answersOnChangeEventHandler} placeholder='다른 선택지를 입력해주세요. 입력 시 객관식문제를 낼 수 있습니다.'/></div>
            <div><input id="incorrect2" type="text" value={answerObj.incorrect2} onChange={answersOnChangeEventHandler} placeholder='다른 선택지를 입력해주세요. 입력 시 객관식문제를 낼 수 있습니다.'/></div>
            <div><input id="incorrect3" type="text" value={answerObj.incorrect3} onChange={answersOnChangeEventHandler} placeholder='다른 선택지를 입력해주세요. 입력 시 객관식문제를 낼 수 있습니다.'/></div>
            {/* TODO 긍정버튼 */}
            <div><button onClick={quizRegisterBtnEventHander}>등록</button></div>
        </div>
    );
}

export default QuizRegister;