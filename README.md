<div align="center">
  <img src="https://github.com/user-attachments/assets/edb50792-ded1-4b43-ae8c-b7900ae1e73d" width="500" />
  <h1>Starry-Scope 🌌</h1>

  <p>인터랙티브 3D 별자리 탐색기</p>

  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Three.js](https://img.shields.io/badge/Three.js-0.171.0-000000?style=flat-square&logo=three.js)](https://threejs.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
  [![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-8.17.10-44a4bc?style=flat-square)](https://github.com/pmndrs/react-three-fiber)
  
  <p>
    <a href="https://starry-scope.vercel.app">🌟 Live Demo</a>
  </p>

</div>

## 소개

Starry-Scope는 인터랙티브 3D 환경에서 12개의 별자리를 탐색할 수 있는 Web 애플리케이션입니다.
<br><br>

## <a name="features"></a>✨ 기능

- **3D 별자리 모델 뷰 / 별자리 정보**
- **내 생일로 별자리 찾기**
- **오늘의 별자리 운세**
- **배경음악 재생 기능**
<br><br>

## <a name="tech-stack"></a>🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **3D 렌더링**: Three.js, React Three Fiber, React Spring
- **개발 도구**: Vite, ESLint
<br><br>

## 3D 모델

<img src="https://github.com/user-attachments/assets/3d5cf938-39e6-4bee-b400-5349702f37fa" width="500" />
<br>

이 프로젝트에 사용된 모든 3D 별자리 모델은 [Meshy AI](https://meshy.ai/)를 사용하여 생성되었습니다.<br>
예시 모델은 [Sketchfab](https://skfb.ly/psyGt)에서 확인할 수 있습니다.<br>

<br>

## <a name="structure"></a>📁 프로젝트 구조

```
starry/
├── public/                  # 정적 파일
│   ├── fonts/               # 사용자 정의 폰트
│   ├── images/              # 이미지 파일
│   ├── models/              # 3D 모델 (GLB 포맷)
│   └── music/               # 배경 음악
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── AudioPlayer.tsx  # 음악 플레이어
│   │   ├── FindZodiac.tsx   # 별자리 찾기 기능
│   │   ├── ModelView.tsx    # 3D 모델 뷰어
│   │   ├── StarField.tsx    # 별 배경 효과
│   │   ├── ZodiacCircle.tsx # 별자리 배치 구성
│   │   └── ZodiacModel.tsx  # 개별 별자리 모델
│   ├── constants/           # 상수 및 데이터
│   ├── styles/              # 전역 스타일
│   ├── App.tsx              # 메인 앱 컴포넌트
│   └── main.tsx             # 앱 진입점
└── package.json             # 프로젝트 의존성
```

## 설치 및 실행

로컬에서 Starry-Scope를 실행하려면:

```bash
# 저장소 클론
git clone https://github.com/yourusername/starry-scope.git
cd starry-scope

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```
<br>

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Sarang-Han">Sarang-Han</a></p>
  <p>2024 Starry-Scope</p>
</div>
