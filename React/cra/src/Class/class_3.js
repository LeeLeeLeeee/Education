import React from 'react'
import {
    useHistory,
    useLocation,
    useParams,
    useRouteMatch
} from 'react-router-dom'

const AboutReactRouterDom = () => {
    return (
        <div className={'bd-callout bd-callout-info'}>
            <p className={'text-primary h3'}> * react-router-dom Hook</p>
            <p className={"content"}>
                useHistroy, useLocation, useParams, useRouteMatch가 있다<br />
            </p>
        </div>
    );
}

const AboutReactRouterDomHook = () => {
    return (
        <div className={'bd-callout bd-callout-info'}>
            <p className={'text-primary h3'}> * HOOK 정리</p>
            <p className={"content"}>
                <strong>* useHistory - 사용자가 navigate한 history를 반환한다.</strong> <br />
                <span className="code d-block"> 
                    <pre>
                        {`
                        let history = useHistory();

                        function handleClick() {
                          history.push("/home");
                        }

                        `}
                    </pre>
                </span>
                <strong>* useLocation - location 객체를 반환한다. 페이지 이동이 있을 때마다 특정 구문을 실행할 때 사용할 수 있다.</strong>  <br />
                <span className="code d-block"> 
                    <pre>
                        {`
                            function usePageViews() {
                                let location = useLocation();
                                React.useEffect(() => {
                                ga.send(["pageview", location.pathname]);
                                }, [location]);
                            }                        
                        `}
                    </pre>
                </span>
                <strong>* useParams - Route의 match.params 속성 값을 가져온다.</strong> <br />
                <span className="code d-block"> 
                    <pre>
                        {`
                            function BlogPost() {
                                let { slug } = useParams();
                                return <div>Now showing post {slug}</div>;
                              }          
                        `}
                    </pre>
                </span>
                <strong>* useRouteMatch - match 객체의 값에 접근할 수 있게 해주는 hook</strong> <br />
                Route컴포넌트의 프로퍼티(path, strict, sensitive, exact)을 가진 객체를 받을 수 있으며<br />
                path와 현재 URL이 일치할 경우 해당 path의 match 객체를 반환합니다.
                <span className="code d-block">
                    <pre>
                {`
                // 페이지의 url이 "/BLOG/:slug/"와 일치할 때 BlogPost 컴포넌트를 렌더링하고 싶은 경우

                // <= v5.0
                function App() {
                return (
                    <div>
                    <Route
                        path="/BLOG/:slug/"
                        strict
                        sensitive
                        render={({ match }) => {
                        return match ? <BlogPost match={match} /> : <NotFound />
                        }}
                    />
                    </div>
                )
                }

                // <= v5.1
                import { useRouteMatch } from 'react-router'
                function App() {
                const match = useRouteMatch({
                    path: '/BLOG/:slug/',
                    strict: true,
                    sensitive: true
                })
                return <div>{match ? <BlogPost match={match} /> : <NotFound />}</div>
                }
                `}
                </pre>
                </span>
            </p>
        </div>
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