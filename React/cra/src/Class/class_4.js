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
        </>
    );
}

export default function ClassThree(props){

    return (
        <>
            <AboutReactRouterDom />
            <AboutReactRouterDomHook />
        </>
    )
    
}