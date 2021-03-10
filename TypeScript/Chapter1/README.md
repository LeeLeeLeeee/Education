## 환경 구성

[메인 화면으로](../)

**환경 설치 순서**  
1. nodejs 설치
2. vscode 설치
3. typescript 설치
```bash
npm i -g typescript
tsc -v # 타입스크립트 파일 변환용
```
4. ts-node 설치
```bash
npm i -g ts-node # 타입스크립트를 변환 및 실행 시켜줌.
ts-node -v
```

**프로젝트 생성**
```bash
    # 생성하려는 Path에서 bash, cmd 실행v
    mkdir sample
    cd ./sample
    npm init --y
    npm i -D typescript ts-node # i = install, -D = --save-dev (only use when Dev mode)
    npm i -D @types/node 
    tsc --init # tsconfig.json파일 생성
```
```javascript
    //package.json 수정
    {
        "script": {
            "dev": "ts-node src", // index.ts로 했기 때문에 파일명 안써도 됨
            "build" : "tsc && node dist" // ts를 js로 변환시키고 dist 파일에 저장함.
        }
    }
```
**tsconfig Option** 
```bash
    
    modude # 프로젝트가 구동될 플랫폼이 웹 브라우저인지, Node인지 구분해 그에 맞는 모듈 방식을 설정
    -> (node, amd, system,commonjs,umd)
    
    moduleResolution #모듈 해석 방법
    -> (node, classic)

    target # 트랜스파일할 대상 자바스크립트의 버전을 설정
    -> (ES3, ES5, ES2016...)

    baseUrl, outDir # 트랜스파일된 JS파일 저장하는 디렉터리 설정

    paths # 소스 파일의 import 문에서 from 부분을 해석할 때 찾아야하는 디렉터리
    -> (보통 nodemodules/* 설정)
    
    esModuleInterop # AMD방식으로 구현된 라이브러리를 CommonJS 방식으로 돌아가게 하기 위해
    -> (true, false)

    sourceMap # js 파일 이외의 js.map 파일이 만들어진다. map 파일은 js - ts 파일의 매칭 정보를 가지고 있다.

    downlevelIteration # 생성기(yeild)가 정상적으로 작동하려면 true가 설정되어야 함
    -> (true, false)

    noImplicitAny # 타입을 지정하지 않으면 Any로 자동 타입 설정하는데 이걸 금지할 것인지. false면 Any 사용.
    -> (true, false)
```