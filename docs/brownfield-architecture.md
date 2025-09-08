# React Native GuideKit 브라운필드 아키텍처 문서

## 소개

이 문서는 React Native GuideKit 프로젝트의 **현재 상태**를 포착하며, 기술적 부채, 우회 방법, 실제 패턴을 포함합니다. AI 에이전트가 개선 작업을 수행할 때 참조할 수 있도록 작성되었습니다.

### 문서 범위

전체 시스템에 대한 포괄적인 문서화

### 변경 로그

| 날짜       | 버전 | 설명                 | 작성자      |
| ---------- | ---- | -------------------- | ----------- |
| 2024-12-19 | 1.0  | 초기 브라운필드 분석 | BMad Master |

## 빠른 참조 - 주요 파일 및 진입점

### 시스템 이해를 위한 중요 파일

- **메인 진입점**: `src/index.ts` - 라이브러리의 공개 API 정의
- **핵심 Provider**: `src/components/GuideKitProvider.tsx` - 전체 상태 관리 및 컨텍스트 제공
- **주요 컴포넌트**: `src/components/GuideMaskSection.tsx` - 가이드 마스크 영역 정의
- **타입 정의**: `src/types.ts` - 모든 타입스크립트 인터페이스
- **훅**: `src/hooks/useGuideKitState.ts`, `src/hooks/useGuideKitContext.ts`
- **예제 구현**: `example/app/(tabs)/index.tsx` - 라이브러리 사용 예제
- **빌드 설정**: `tsconfig.json`, `package.json`

### 라이브러리 사용 패턴

```typescript
// 1. Provider로 앱 감싸기
<GuideKit.GuideKitProvider>
  // 2. 가이드할 영역 마킹
  <GuideKit.GuideMaskSection
    guideKey="UNIQUE_KEY"
    type="mask"
    onPress={() => {}}
    tooltip={{...}}
  >
    <YourComponent />
  </GuideKit.GuideMaskSection>
</GuideKit.GuideKitProvider>

// 3. 가이드 시작
const { startGuide } = GuideKit.useGuideKitState();
startGuide({
  guideKeyList: ["UNIQUE_KEY"],
  onComplete: () => {},
  onClose: () => {}
});
```

## 상위 레벨 아키텍처

### 기술 요약

React Native 라이브러리로 앱 내 가이드 투어 및 온보딩 기능을 제공합니다. 마스크 오버레이와 툴팁을 통해 사용자에게 인터랙티브한 가이드 경험을 제공합니다.

### 실제 기술 스택

| 카테고리         | 기술               | 버전     | 비고                                     |
| ---------------- | ------------------ | -------- | ---------------------------------------- |
| 런타임           | React Native       | ^0.76.9  | 피어 의존성으로 관리                     |
| 언어             | TypeScript         | ^5.8.3   | 엄격한 타입 검사 활성화                  |
| 상태 관리        | Jotai              | ^2.12.5  | 내부적으로 사용되지 않음 (의존성만 존재) |
| UI 라이브러리    | React Native Paper | ^5       | 툴팁 컴포넌트에서 Chip 사용              |
| SVG 렌더링       | React Native SVG   | ^15.12.0 | 마스크 오버레이 및 화살표 아이콘         |
| 상태 관리 (실제) | React Context      | -        | 자체 구현된 컨텍스트 시스템              |
| 버전 관리 도구   | Changesets         | ^2.29.4  | 라이브러리 버전 관리                     |

### 리포지토리 구조 현실 확인

- 타입: 라이브러리 프로젝트 (Monorepo with example)
- 패키지 매니저: npm/yarn (yarn.lock 존재)
- 특이사항: example 디렉토리에 Expo 기반 데모 앱 포함

## 소스 트리 및 모듈 구성

### 프로젝트 구조 (실제)

```text
react-native-guidekit/
├── src/                           # 라이브러리 소스 코드
│   ├── components/
│   │   ├── GuideKitProvider.tsx   # 메인 컨텍스트 프로바이더
│   │   ├── GuideMaskSection.tsx   # 가이드 영역 마킹 컴포넌트
│   │   ├── GuideKitDimComponent.tsx # 딤 컴포넌트 래퍼
│   │   └── MaskGuideDim.tsx       # 실제 마스크 오버레이 구현
│   ├── hooks/
│   │   ├── useGuideKitState.ts    # 공개 API 훅
│   │   └── useGuideKitContext.ts  # 내부 컨텍스트 훅
│   ├── types.ts                   # 모든 타입 정의
│   └── index.ts                   # 공개 API 엔트리포인트
├── example/                       # Expo 데모 앱
│   ├── app/                       # Expo Router 기반 앱
│   ├── components/                # 데모용 컴포넌트들
│   └── package.json               # 독립적인 패키지 설정
├── docs/                          # 생성된 문서 (이 파일)
├── lib/                           # 컴파일된 출력물 (git에서 제외)
├── package.json                   # 라이브러리 패키지 설정
├── tsconfig.json                  # TypeScript 설정
└── README.md                      # 기본 문서 (현재 비어있음)
```

### 주요 모듈과 용도

- **GuideKitProvider**: 전체 가이드 상태 관리, 시퀀스 제어, 콜백 처리
- **GuideMaskSection**: 가이드할 영역을 마킹하고 위치 정보 수집
- **MaskGuideDim**: SVG 기반 마스크 오버레이 및 툴팁 렌더링
- **useGuideKitState**: 외부 API용 간소화된 훅 (startGuide만 노출)
- **useGuideKitContext**: 내부 전체 컨텍스트 접근용 훅

## 데이터 모델 및 API

### 데이터 모델

실제 모델 파일 참조:

- **GuideKitCustomTypes**: `src/types.ts:1-3` - 커스텀 가이드 키 타입
- **MaskGuideType**: `src/types.ts:13-25` - 마스크 가이드 설정
- **GuideKitContextType**: `src/types.ts:29-45` - 컨텍스트 타입 정의
- **PointerPositionType**: `src/types.ts:5-11` - 툴팁 위치 옵션

### API 명세

**공개 API** (src/index.ts):

```typescript
export { GuideKitProvider } from "./components/GuideKitProvider";
export { useGuideKitState } from "./hooks/useGuideKitState";
export { GuideMaskSection } from "./components/GuideMaskSection";
```

**내부 API**:

- startGuide, goNextStep, closeGuide 메서드
- 위치 측정 및 애니메이션 프레임 관리
- 터치 이벤트 처리

## 기술적 부채 및 알려진 이슈

### 중요한 기술적 부채

1. **하드코딩된 상수들**:

   - `MaskGuideDim.tsx`에 툴팁 크기가 하드코딩됨 (TOOLTIP_WIDTH = 280)
   - 마스크 패딩 기본값이 하드코딩됨 (마스크*딤*패딩 = 8)

2. **안드로이드 측정 버그 우회**:

   - `GuideMaskSection.tsx:114`에 collapsable={false} 속성 추가
   - React Native 이슈 #29712에 대한 우회책

3. **타입 안전성 이슈**:

   - `GuideKitCustomTypes["guideKeyType"]`이 단순히 string으로 정의됨
   - 런타임에서 가이드 키 검증 없음

4. **성능 관련**:
   - `requestAnimationFrame`을 통한 지속적인 위치 측정
   - 메모리 누수 방지를 위한 `cancelAnimationFrame` 처리가 복잡함

### 우회 방법 및 주의사항

- **컨텍스트 명명 오타**: `GuideKetContext` (올바른 명칭: `GuideKitContext`)
- **측정 재시도 로직**: measure가 null을 반환할 때 애니메이션 프레임으로 재시도
- **툴팁 위치 계산**: 두 번의 레이아웃 측정 (invisible -> visible)

## 통합 지점 및 외부 의존성

### 외부 서비스

| 서비스             | 용도               | 통합 유형 | 주요 파일                         |
| ------------------ | ------------------ | --------- | --------------------------------- |
| React Native Paper | UI 컴포넌트 (Chip) | 컴포넌트  | `src/components/MaskGuideDim.tsx` |
| React Native SVG   | 마스크 및 아이콘   | 컴포넌트  | `src/components/MaskGuideDim.tsx` |

### 내부 통합 지점

- **React Context API**: 컴포넌트 간 상태 공유
- **React Native 측정 API**: 컴포넌트 위치 및 크기 측정
- **터치 이벤트 시스템**: 마스크 영역 클릭 감지
- **애니메이션 프레임**: 위치 측정 최적화

## 개발 및 배포

### 로컬 개발 설정

1. 의존성 설치: `npm install` 또는 `yarn install`
2. 라이브러리 빌드: `npm run build` (TypeScript 컴파일)
3. 예제 앱 실행: `cd example && npm start`

### 빌드 및 배포 프로세스

- **빌드 명령어**: `npm run build` (tsc 컴파일러 사용)
- **출력 디렉토리**: `lib/` (TypeScript 컴파일 결과)
- **타입 정의**: 자동 생성됨 (declaration: true)
- **버전 관리**: Changesets 사용

## 테스트 현황

### 현재 테스트 커버리지

- 단위 테스트: 없음
- 통합 테스트: 없음
- E2E 테스트: 없음
- 수동 테스트: example 앱을 통한 기본 동작 확인

### 테스트 실행

현재 테스트 스크립트 없음. example 앱에서 수동 테스트만 가능.

## 사용 패턴 및 제약사항

### 현재 지원하는 가이드 타입

1. **마스크 가이드만 지원**: 현재는 `type: "mask"`만 구현됨
2. **순차적 가이드**: guideKeyList 배열 순서대로 진행
3. **단일 활성 가이드**: 한 번에 하나의 가이드만 활성화

### 제약사항

- **플랫폼 특이사항**: 안드로이드에서 measure 버그로 인한 성능 저하 가능
- **툴팁 위치**: 6가지 위치만 지원 (topLeft, topRight, topCenter, bottomLeft, bottomRight, bottomCenter)
- **스타일링**: 툴팁 스타일이 하드코딩되어 커스터마이징 제한적

## 향후 개선 사항

### 아키텍처 개선 포인트

1. **타입 안전성 강화**: 가이드 키를 enum 또는 union type으로 관리
2. **컴포넌트 재사용성**: 툴팁 컴포넌트 분리 및 커스터마이징 가능
3. **성능 최적화**: 위치 측정 로직 개선
4. **테스트 커버리지**: 단위 테스트 및 통합 테스트 추가
5. **문서화**: README 및 API 문서 작성

### 확장 가능성

- **다양한 가이드 타입**: spotlight, highlight, callout 등
- **애니메이션 지원**: 부드러운 전환 효과
- **접근성 개선**: 스크린 리더 지원
- **테마 시스템**: 다크/라이트 모드 지원

## 부록 - 유용한 명령어 및 스크립트

### 자주 사용하는 명령어

```bash
# 라이브러리 빌드
npm run build

# 예제 앱 실행 (iOS)
cd example && npm run ios

# 예제 앱 실행 (Android)
cd example && npm run android

# 예제 앱 실행 (Web)
cd example && npm run web
```

### 디버깅 및 문제 해결

- **위치 측정 이슈**: measure() 호출이 실패하면 애니메이션 프레임으로 재시도
- **컨텍스트 오류**: GuideKitProvider 내부에서만 훅 사용 가능
- **툴팁 표시 안됨**: guideKey와 startGuide의 guideKeyList 일치 확인
- **안드로이드 레이아웃 문제**: collapsable={false} 속성 확인

### 코드 예제 참조

완전한 구현 예제는 `example/app/(tabs)/index.tsx` 파일을 참조하세요.
