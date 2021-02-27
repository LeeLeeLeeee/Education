import React, {useState, useEffect } from 'react'


const AboutUseState = ({num}) => {
    return (
        <div className={'bd-callout bd-callout-info'}>
            <p className={'text-primary h3'}> * useState 란? [{num}] </p>
            <p className={"content"}>
                Class형 컴포넌트를 사용하지 않고 state를 관리할 수 있게 해주는 것.
                State 값이 변경될 경우 페이지를 다시 렌더링 한다.<br />
                <span className="code"> const [param, setParam] = useState({"<variable\>"}) </span>
            </p>
        </div>
    );
}

const AboutUseEffect = () => {
    return (
        <div className={'bd-callout bd-callout-info'}>
            <p className={'text-primary h3'}> * useEffect 란?</p>
            <p className={"content"} data-source={"useEffect"}>
                라이프사이클 함수와 관련이 있다.
                첫 번째 지정한 라이프사이클[ 마운트(componentDidMount), 언마운트(componentWillUmMount), 업데이트(componentDidUpdate) ]마다 호출할 코드를 작성하며
                두 번째 배열 인수의 값을 넣으면 해당 값이 변경될 때마다 첫 번째 인수를 실행, 없을 경우 처음만 실행합니다.<br />
                <br /><span className="code"> {`useEffect(()=>{}, [])`} </span>
            </p>
        </div>
    );
}

const ExampleUse = ({ num, setNum }) => {
    return (
        <div className={'bd-callout bd-callout-info'}>
            <p className={'text-primary h3'}> 사용 예제 <button className={'btn btn-sm btn-primary'} onClick={()=> setNum(num+1) }>Num ++</button> </p>
            <p className={"content"}>
                <span className="code d-block" id="code-1">
                    <pre className={'text-white'}>
                    {`
                    //예제의 Num ++ 버튼을 클릭
                    const [num, setNum] = useState(0) 
                    useEffect(()=>{ 
                        // UseEffect 내용 하이라이트 후 종료.
                        return () => {
                            alert("Component Unmount - BYEBYE");
                        }
                    }, [num])`}
                    </pre>
                </span>
                
                
            </p>
        </div>
    );
}

const nextLine = (text) => text.split('\n').filter(text=> text.trim() === '' ? false : true ).join("<br />");

export default function ClassOne(props){

    const [num, setNum] = useState(0)

    useEffect(()=>{
        return () => {
            alert("Component Unmount - BYEBYE")
        }
    }, [])

    useEffect(()=>{
        document.querySelector('.content[data-source=useEffect]').classList.add('highlight');
        window.setTimeout(()=>{
            document.querySelector('.content[data-source=useEffect]').classList.remove('highlight');
        }, 100);
    },[num])

    return (
        <>
            <AboutUseState num={num}/>
            <AboutUseEffect />
            <ExampleUse num={num} setNum={setNum} />
        </>
    )
    
}