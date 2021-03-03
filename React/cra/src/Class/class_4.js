import React from 'react'
import {
    useHistory,
    useLocation,
    useParams,
    useRouteMatch
} from 'react-router-dom'

const AboutReactRouterDomComponent = () => {
    return (
        <div className={'bd-callout bd-callout-info'}>
            <p className={'text-primary h3'}> * react-router-dom Component</p>
            <p className={"content"}>
                BrowserRouter, HashRouter, Link, Navlink, MemoryRouter, Redirect,
                Route, Router, StaticRouter, Switch가 있다.
            </p>
        </div>
    );
}

const ComponentExample = () => {
    return (
        <>
            <div className={'bd-callout bd-callout-info'}>
                <p className={'text-primary h3'}> {'<BrowserRouter>'} </p>
                <p className={'content'}>
                    HTML5 history API(pushState, replaceState)를 지원해주는 Component이며 react-route-dom을 적용시키고
                    싶은 최상위 컴포넌트에 감싸주는 wrapper이다.<br />
                    * Prop List<br /> 
                        - basename : string [자식 컴포넌트 엘리먼트의 경로 앞에 삽입된다]<br />
                        - getUserConfirmation : function []<br />
                        - forceRefresh : bool [페이지 전부 새로고침할 건지 서버 사이드 렌더링 처럼] <br />
                        - keyLength : number [location.key의 길이 지정]  <br />
                </p>
            </div>
            <div className={'bd-callout bd-callout-info'}>
                <p className={'text-primary h3'}> {'<HashRouter>'} </p>
                <p className={'content'}>
                    Hash를 지원하는 Router<br />
                    * Prop List<br /> 
                        - basename : string [자식 컴포넌트 엘리먼트의 경로 앞에 삽입된다]<br />
                        - getUserConfirmation : function []<br />
                        - hasyType : string [window.location.hash의 인코딩 타입]  <br />
                </p>
            </div>
            <div className={'bd-callout bd-callout-info'}>
                <p className={'text-primary h3'}> {'<Link>'} </p>
                <p className={'content'}>
                    Navigation할 수있게 해주는 Component<br />
                    * Prop List<br /> 
                        - to : string [이동할 location 지정]<br />
                        - to : object [pathname, search, hash, state로 구성된 값]<br />
                        - to : function [location을 받아오는 callback 함수 구성할 수 있음] <br />
                        - replace : boolean [true일 경우 history에 쌓이지 않음] <br />
                        - innerRef : function [inner 태그를 받아오는 callback함수 ]<br />
                        - component : JSX [Link에 구성할 컴포넌트 삽입]
                </p>
            </div>
            <div className={'bd-callout bd-callout-info'}>
                <p className={'text-primary h3'}> {'<NavLink>'} </p>
                <p className={'content'}>
                    Link에 스타일을 추가할 수 있는 Component<br />
                    * Prop List<br /> 
                        - activeClassName : string [active할 때 주는 클래스명 기존 클래스명과 결합됨]<br />
                        - activeStyle : object [active할 때 주는 스타일]<br />
                        - exact : bool [true일 경우 URL이 완벽 일치해야함]<br />
                        - strict : bool [true일 경우 후행 슬래시를 포함한 URL이 일치 뒤는 상관 안함]<br />
                        * strict, exact가 true인 경우 <span className={'code'}>/one</span>는 <span className={'code'}>/one</span>하고만 매칭됨.<br />
                        * strict만 true인 경우 <span className={'code'}>/one/</span>는 <span className={'code'}>/one/ 과 /one/two </span>하고만 매칭됨.<br />
                        * exact만 true인 경우 <span className={'code'}>/one</span>는 <span className={'code'}>/one 과 /one/ </span>하고만 매칭됨.<br />
                        - isActive : function [match와 location을 받는 콜백 함수 호출하며 return true여야 Active 시킴]
                </p>
            </div>
            <div className={'bd-callout bd-callout-info'}>
                <p className={'text-primary h3'}> {'<Prompt>'} </p>
                <p className={'content'}>
                    유저가 다른 페이지로 이동하려고 할 때 실행되는 Component<br />
                    * Prop List<br /> 
                        - when : boolean [true면 Confirm창 등장, false면 넘어감]<br />
                        - message : string [해당 값을 Confirm 메세지로 전달]<br />
                        - message : function [location, action을 갖는 콜백 함수 반환]<br />
                </p>
            </div>
            <div className={'bd-callout bd-callout-info'}>
                <p className={'text-primary h3'}> {'<Redirect>'} </p>
                <p className={'content'}>
                    기존 Location을 새로운 Location으로 Navigate 시켜주는 것 <br />
                    * Prop List<br /> 
                        - to : string [path값이다.]<br />
                        - push : boolean [true일 경우 replace하면서 이동한다.]<br />
                </p>
            </div>
            <div className={'bd-callout bd-callout-info'}>
                <p className={'text-primary h3'}> {'<Switch>'} </p>
                <p className={'content'}>
                    path에 매칭된 첫번째 Route를 렌더링 시켜주는 Component <br />
                    * Prop List<br /> 
                        - to : string [path값이다.]<br />
                        - push : boolean [true일 경우 replace하면서 이동한다.]<br />
                </p>
            </div>
        </>
    );
}

const AboutReactRouterDomEtc = () => {
    return (
        <div className={'bd-callout bd-callout-info'}>
            <p className={'text-primary h3'}> * react-router-dom Etc</p>
            <p className={"content"}>
                generatePath, matchPath, withRouter 함수와
                history, match 객체가 있다
            </p>
        </div>
    );
}

const EtcExample = () => {
    return (
        <>
            <div className={'bd-callout bd-callout-info'}>
                <p className={'text-primary h3'}> {'generatePath'} </p>
                <p className={'content'}>
                    path-to-regexp 라이브러리를 사용한 path 생성기이다.
                    세팅한 정규식 패턴에 맞지 않으면 error를 호출한다.<br />
                    * 매개변수<br /> 
                        - pattern : string [path의 정규식 패턴을 설정한다.]<br />
                        - params : object [path에 전달할 파라미터를 설정한다.]<br />
                </p>
            </div>
            <div className={'bd-callout bd-callout-info'}>
                <p className={'text-primary h3'}> {'matchPath'} </p>
                <p className={'content'}>
                    path가 match하는 지 확인하는 함수이며 match되면 match를 반환한다.<br />
                    * 매개변수<br /> 
                        - pathname : string [match하고 싶은 path를 작성한다.]<br />
                        - props : object [Route에서 설정하는 path와 strict, exact모드를 설정 값을 입력]<br />
                </p>
            </div>
            <div className={'bd-callout bd-callout-info'}>
                <p className={'text-primary h3'}> {'withRouter'} </p>
                <p className={'content'}>
                    Component를 감싸 history를 쓸 수 있게 해주나 요즘엔 useHistory로 많이 대체되는 듯 하다.<br />
                </p>
            </div>
            <div className={'bd-callout bd-callout-info'}>
                <p className={'text-primary h3'}> {'history'} </p>
                <p className={'content'}>
                    주소 정보를 가지고 있는 객체 정도라고 생각하면 됨.
                </p>
            </div>
            <div className={'bd-callout bd-callout-info'}>
                <p className={'text-primary h3'}> {'match'} </p>
                <p className={'content'}>
                    Route path와 URL의 매치 정보를 가지고 있다.
                </p>
            </div>
        </>
    )
}

export default function ClassThree(props){

    return (
        <>
            <AboutReactRouterDomComponent />
            <ComponentExample />
            <AboutReactRouterDomEtc />
            <EtcExample />
        </>
    )
    
}