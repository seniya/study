# Vue-Boilerplate SPA
> Vue-boilerplate for OpenObject

### 1. 기본 구성 환경 
- Node v14.15.1
- npm 6.14.8
- @vue/cli 4.5
- vue 2.6.11
- eslint 6.7.2
- json-server 0.16.3 <-- 로컬 테스트용 서버


### 2. 개발 환경
- Visual Studio Code 1.52.1
- plugins: Auto Close Tag
- plugins: Auto Rename Tag
- plugins: ESLint
- plugins: indent-rainbow
- plugins: Live Server
- plugins: Korean Language Pack
- plugins: Vetur
- plugins: Vue 3 Snippets
- plugins: Vue VSCode Snippets
- plugins: Git History


### 3. 설치
```sh
git clone https://github.com/seniya/vue-boilerplate.git
cd vue-boilerplate
npm install

npm run serve 

# 또는 
npm run serveBe 
npm run serveFe 
# 각각 실행

npm run build
```

### 4. Source Structure

```
- .vscode
  - settings.json : 현재 프로젝트 내에서 사용되는 에디터 설정

- public 

- src 
  - api : axios 인스턴스 생성, Server API 또는 Native API 분류에 따른 파일 생성
    - common : axios interceptors 설정. 토큰 및 공통 에러 처리(선택) 
    - demo : HTTP API 테스를 위한 임의의 JSON 서버 설정

  - assets : css, fonts, images 등 파일 위치

  - components : APP 내 공통으로 사용되는 컨포넌트 위치(메인 메뉴 등)
    
  - router : index.js 이하 모듈로 큰 메뉴 단위로 관리
           : 일반 라우팅, 부모 컨포넌트를 포함한 라우팅, 권한 처리를 위한 전처리 라우팅 예제

  - store : 각 API 에 대응 하여 모듈로 관리

  - util : 공통 사용 및 상수 정의 모듈 위치

  - views : 각 화면 정의
    - _container : 메인 컨테이너 예제 (페이지 인증)
    - articles : CRUD with Vuex (조금 이용)
    - letters : CRUD without Vuex 
    - posts : CRUD with Vuex (완전히 이용)
    - pages : 페이지 별 권한 예제
    - sign : 토큰을 이용한 로그인/로그아웃 예제
    ...
  - .evn.development(production) : 빌드 환경에 따른 변수설정
  - .eslintrc.js : 코딩 컨벤션 설정 (standrad 추천)
  - jsconfig.json : 코드 내에서 줄임 주소 (~, @) 사용
  ...

```

### 기타 설명
- 프로젝트의 팀원들은 공통된 개발환경(vscode)과 코딩 컨벤션 강제를 권장합니다.
- 가능하면 `posts` 메뉴 예제에 서술된 Vuex 사용 패턴 개발을 권장합니다.
- 가능하면 메소드 이름은 [`request`, `prepare`, `on`, `cb`, `action`] 으로 시작하길 권장합니다.
- 가능하면 부모 컨포넌트와 자식 컨포넌트의 역할을 분리하여 자식 컨포넌트의 재활용을 할 수 있기를 권장합니다.
- css 는 각 페이지에서 진행하지 않으며 하나의 css (혹은 적은수의) 파일로 메인에서 한번만 로드 되기를 권장합니다. (SI 프로젝트에서는 각 모듈별 스타일 적용 방식 개발 어려움)
- 가능하면 파일이름은 소문자로 권장합니다. (형상관리 대비)
- 가능하면 `vue` - `watch` 기능을 사용하지 않습니다.
- 가능하면 모든 비동기는 `async`, `await` 으로 동기적으로 제작하고 그에 따른 렌더링등의 어색함은 로직이 단단하게 완성된 후 하나씩 최적화를 합니다. (예측할수 없는 비동기의 순서가 대부분의 오류의 원인입니다.)
- 데이터 캐시에 대한 정책은 주요 설계에 영향을 미치므로 미리 확인 되어야 합니다.
