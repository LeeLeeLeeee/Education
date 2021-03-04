import React, {useState, useMemo, useCallback, useRef } from 'react'


const AboutUseMemo = ({num}) => {
    return (
        <div className={'bd-callout bd-callout-info'}>
            <p className={'text-primary h3'}> * useMemo 란? </p>
            <p className={"content"}>
                성능 최적화를 위하여 사용,
                두 번째 인자로 넘어온 값이 변경되어야만 실행 됨<br />
                <span className="code"> {'const memo = useMemo(() => func(), [])'} </span><br />
                <small className={"text-danger"}> !! 중요 : 첫 번째 인자에서 사용할 값을 두 번째 인자로 넣어주어야 최신 값이라는 것을 보장할 수 있음. </small>
            </p>
        </div>
    );
}

const AboutUseCallback = () => {
    return (
        <div className={'bd-callout bd-callout-info'}>
            <p className={'text-primary h3'}> * useCallback 이란?</p>
            <p className={"content"}>
                useMemo와 비슷하며 useMemo는 특정 결과값을 재사용 할 때 사용하는 반면, useCallback은 함수에 적용하는 것이다.<br />
                useMemo와 useCallback은 컴포넌트가 렌더링 될 때마다 내부에 선언된 표현식도 매번 다시 선언되는 React의 특징때문에 이를 최적화 하기 위해 사용하는 것 같다.
                <br /><span className="code"> {`useCallback(()=>{}, [])`} </span><br />
                <small className={"text-danger"}> !! 중요 : 첫 번째 인자에서 사용할 값을 두 번째 인자로 넣어주어야 최신 값이라는 것을 보장할 수 있음. </small>
            </p>
        </div>
    );
}

const AboutUseRef = () => {
    return (
        <div className={'bd-callout bd-callout-info'}>
            <p className={'text-primary h3'}> * useRef 란?</p>
            <p className={"content"}>
                특정 DOM을 선택하거나 렌더링이 되었을 때도 이전 값을 유지하고 싶은 변수들에 사용한다.<br />
                .current로 값을 받아올 수 있으며 리렌더링 되었을 때도 변수가 초기화되지 않는다.
                <br /><span className="code"> {`const ref = useRef('')`} </span>
            </p>
        </div>
    );
}

const ExampleUseMemo = ({setTxt, setNum }) => {
    return (
        <div className={'bd-callout bd-callout-info'}>
            <p className={'text-primary h3'}> * 사용 예제 - useMemo </p>
            <p className={"content"}>
                <span className="code d-block" id="code-1"> 
                    <pre className={'text-white'}>
                        {`
                        //TEXT-INPUT을 변경하여도 memo함수는 실행되지 않고 Number-INPUT 값이 변경될 때만 memo의 함수가 실행됨.
                        const [txt, setTxt] = useState('');
                        const [num, setNum] = useState(1);

                        const notMemoFunc = viexTxt(txt, 'notmemo'); // 계속 실행.

                        const memoFunc = useMemo(() => {
                            return viexTxt(txt , 'memo');
                        }, [num]);`}
                    </pre>
                </span>
                <div className={'bg-light p-2'}>
                    <label className={'pr-2'}>
                        TEXT : <input type="text" onChange={(e)=> setTxt(e.target.value)} />
                    </label>
                    <label>
                        Number : <input type="number" onChange={(e)=> setNum(e.target.value)} />
                    </label>
                </div>
            </p>
        </div>
    );
}

const ExampleUseCallback = ({onChangeHandler, setTxt2, onChangeHandlerTxt2, onChangeHandlerTxt3}) => {
    return (
        <div className={'bd-callout bd-callout-info'}>
            <p className={'text-primary h3'}> * 사용 예제 - useCallback </p>
            <p className={"content"}>
                <span className="code d-block" id="code-1"> 
                    <pre className={'text-white'}>
                        {`
                        //TEXT-INPUT을 변경하여도 memo함수는 실행되지 않고 Number박스의 값이 변경될 때만 memo의 함수가 실행됨.
                        const [txt2, setTxt2] = useState('');

                        const onChangeHandler = useCallback(e=> {
                            // txt2의 값을 보장할 수 없음.
                            alert(txt2)
                        },[])

                        const onChangeHandlerTxt2 = useCallback(e=> {
                            //txt2가 변경될 때 마다 생성되며, txt2를 넣어야 최신 txt2를 보장할 수 있음.
                            alert(txt2)
                        },[txt2])
                        `}
                    </pre>
                </span>
                <div className={'bg-light p-2'}>
                    <label className={'pr-2'}>
                        TEXT2 : <input type="text" onChange={(e)=> setTxt2(e.target.value)} />
                    </label>
                    <button type="button" className={"btn btn-sm btn-primary mr-2"} onClick={onChangeHandler}>TEXT2(두 번째 인자 없음)</button>
                    <button type="button" className={"btn btn-sm btn-primary mr-2"} onClick={onChangeHandlerTxt2}>TEXT2(두 번쨰 인자 있음)</button>
                    <button type="button" className={"btn btn-sm btn-primary"} onClick={onChangeHandlerTxt3}>useCallback 아님</button>
                </div>
                
            </p>
        </div>
    );
}

const ExampleUseRef = ({refHandler, test_value, test_ref}) => {
    return (
        <div className={'bd-callout bd-callout-info'}>
            <p className={'text-primary h3'}> * 사용 예제 - useRef </p>
            <p className={"content"}>
                <span className="code d-block" id="code-1"> 
                    <pre className={'text-white'}>
                        {`
                        // txt3가 변경될 때마다 test_value, test_ref 모두 더해주지만 test_value의 값은 렌더링될 때마다 초기화가 되는 것을 확인할 수 있다.
                        const [txt3, setTxt3] = useState('');
                        let test_value = 1;
                        const test_ref = useRef(1)
                        
                        const refHandler = (e) => {
                            test_value += 1;
                            test_ref.current += 1;
                            setTxt3(e.target.value);
                        }
                        `}
                    </pre>
                </span>
                <div className={'bg-light p-2'}>
                    <label className={'pr-2'}>
                        REF : <input type="text" onChange={refHandler} /><br />
                        not_ref_value : {test_value}<br />
                        ref_value : {test_ref}
                    </label>
                </div>
                
            </p>
        </div>
    );
}

const viexTxt = (txt, type) => {
    console.log(`call func ${txt} -- ${type}`);
    return txt;
}

export default function ClassTwo(props){

    /* for - useMemo  */
    const [txt, setTxt] = useState('');
    const [num, setNum] = useState(1);
    
    const notMemoFunc = viexTxt(txt, 'notmemo');

    const memoFunc = useMemo(() => {
        return viexTxt(txt , 'memo');
    }, [num]);

    /* for - useCallback  */
    const [txt2, setTxt2] = useState('');
    
    const onChangeHandler = useCallback(e=> {
        // 이것은 이벤트 핸들러 용, 렌더링 처음에 함수가 생성된 후 재생성 안됨.
        alert(txt2)
    },[])

    const onChangeHandlerTxt2 = useCallback(e=> {
        // 이것은 이벤트 핸들러 용, txt2가 변경될 때 마다 생성되며, txt2를 넣어야 최신 txt2를 보장할 수 있음.
        // txt2가 변경되어야 함수를 생성
        alert(txt2)
    },[txt2])

    const onChangeHandlerTxt3 = e => {
        // 컴포넌트가 렌더 될 때마다 함수 재 호출.
        alert(txt2)
    }

    /* for - useRef */

    const [txt3, setTxt3] = useState('');
    let test_value = 1;
    const test_ref = useRef(1)

    const refHandler = (e) => {
        test_value += 1;
        test_ref.current += 1;
        setTxt3(e.target.value);
    }
    
    return (
        <>
            <AboutUseMemo />
            <ExampleUseMemo setTxt={setTxt} setNum={setNum} />
            <div className={"p-1 border"}>
                notMemoFunc : {notMemoFunc}<br />
                momeFunc : {memoFunc}
            </div>
            <AboutUseCallback />
            <ExampleUseCallback onChangeHandler={onChangeHandler} setTxt2={setTxt2} onChangeHandlerTxt2={onChangeHandlerTxt2} onChangeHandlerTxt3={onChangeHandlerTxt3} />
            <AboutUseRef />
            <ExampleUseRef test_value={test_value} test_ref={test_ref.current} refHandler={refHandler} />

        </>
    )
}
