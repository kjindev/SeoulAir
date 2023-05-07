# 서울시 대기환경 데이터 Dashboard

서울시의 대기환경 데이터를 차트로 표현한 웹 페이지입니다.

### 주제

- REST API를 이용한 프론트엔드와 백엔드의 HTTP 통신 구현
- 차트 라이브러리를 이용한 데이터의 시각화
- 배포 Page : [https://seoul-air.vercel.app/](https://seoul-air.vercel.app/)

### 개요

- 개발 인원 : 1인 (개인 프로젝트)
- 개발 기간 : 2022.04. ~ 2023.05.

#### 사용 기술

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=flat-square&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=Chart.js&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>

서울 지도 SVG 파일 출처 : http://www.gisdeveloper.co.kr/?p=8555

### Frontend 개발 내용

- **구**
  - 지도를 클릭하면 해당 구의 대기환경 데이터를 차트로 확인할 수 있습니다.
  - 하단의 물음표 아이콘을 클릭하면 해당 구의 측정소 위치를 지도로 확인할 수 있습니다.
- **서울 전체**
  - 시간을 선택하여 특정 시간의 서울 전체 대기환경 데이터를 확인할 수 있습니다.
  - 해당 시간의 미세먼지 상황을 지도의 색깔로 확인할 수 있으며, 그 외의 대기환경 데이터는 차트로 확인할 수 있습니다.

### Backend 개발 내용

- **Github** : [https://github.com/kjindev/SeoulAir-Server](https://github.com/kjindev/SeoulAir-Server)

### 개발 과정에서의 문제 해결

- HTTP GET, POST를 이용하여 데이터를 요청하는 함수가 자주 사용되어 반복되는 코드가 생겼습니다. 따라서 Custom Hook을 생성하여 반복되는 함수를 재사용하여 코드의 양을 줄였습니다.

- 다양한 차트를 사용하기 때문에 로딩 시간이 길어진다는 문제가 있어, React의 lazy와 Suspense를 이용하여 코드를 분할하였습니다.
