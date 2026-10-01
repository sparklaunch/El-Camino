# El Camino

스페인 음식점 **El Camino**의 주문 키오스크 웹 앱입니다.
매장 식사·포장을 고르고, 메뉴를 살펴 장바구니에 담은 뒤 결제까지 진행할 수 있습니다.

## 주요 기능

- **주문 방식 선택**: 첫 화면에서 매장 식사 또는 포장을 선택합니다.
- **카테고리별 메뉴**: 타파스, 빠에야, 메인 요리, 디저트, 음료의 다섯 가지 카테고리를 제공하며, 카테고리를 누르면 해당 메뉴로 스크롤됩니다.
- **메뉴 상세 모달**: 메뉴 카드를 누르면 사진, 설명, 가격이 담긴 상세 창이 열립니다. 닫기 버튼, 창 바깥 클릭, ESC 키로 닫을 수 있습니다.
- **장바구니**: 메뉴를 담고 수량을 조절하거나 삭제할 수 있고, 주문 내역에서 합계를 확인할 수 있습니다.
- **쿠폰**: 특정 알고리즘에 의해 생성된 16자리의 쿠폰 번호로 가격을 할인 받을 수 있습니다.
- **결제**: 결제 버튼을 누르면 장바구니가 비워지고 결제 완료 페이지로 이동합니다.
- **다국어 지원**: 한국어, 영어, 그리고 스페인어를 지원합니다. 선택한 언어는 브라우저에 저장되어 새로고침 후에도 유지됩니다.

## 기술 스택

| 분류                 | 사용 기술                         |
| -------------------- | --------------------------------- |
| 프레임워크           | Next.js 16 (App Router), React 19 |
| 언어                 | TypeScript                        |
| 서버 상태 관리       | TanStack Query                    |
| 클라이언트 상태 관리 | Zustand (persist 미들웨어)        |
| 스타일               | CSS Modules, clsx                 |
| Mock API             | json-server                       |

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Mock API 서버 실행

메뉴와 장바구니 데이터는 `db.json`을 기반으로 한 json-server에서 제공합니다.

```bash
npm run server
```

`http://localhost:4000`에서 서버가 실행됩니다.

### 3. 개발 서버 실행

다른 터미널에서 실행합니다.

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에 접속하면 앱을 확인할 수 있습니다.

### 기타 스크립트

| 명령어           | 설명           |
| ---------------- | -------------- |
| `npm run build`  | 프로덕션 빌드  |
| `npm run start`  | 빌드 결과 실행 |
| `npm run lint`   | ESLint 검사    |
| `npm run coupon` | 쿠폰 번호 생성 |

## 페이지 구성

| 경로        | 설명                                       |
| ----------- | ------------------------------------------ |
| `/`         | 언어 선택과 주문 방식(매장 식사·포장) 선택 |
| `/main`     | 카테고리별 메뉴, 메뉴 상세 모달, 주문 내역 |
| `/complete` | 결제 완료                                  |

## 프로젝트 구조

```text
app/
├── api/          # json-server 요청 함수 (dishAPI, cartAPI)
├── assets/       # 로고 이미지, 폰트 (Pretendard)
├── components/   # UI 컴포넌트 (DishCard, DishModal, Invoice 등)
├── enums/        # Category, Language, Option
├── helpers/      # 유틸 함수
├── i18n/         # 번역 문구와 useTranslation 훅
├── stores/       # Zustand 스토어
├── types/        # Dish, CartDish 타입
├── main/         # /main 페이지
├── complete/     # /complete 페이지
├── layout.tsx
├── page.tsx      # / 페이지
└── providers.tsx # React Query Provider, 언어 설정 복원
public/assets/images/  # 메뉴 사진
db.json                # Mock 데이터 (dishes, cart)
```

## 데이터 구조

`db.json`의 `dishes`에 담긴 메뉴 한 개의 형태는 다음과 같습니다.

```json
{
	"allergens": ["gluten", "crustacean"],
	"category": "tapas",
	"description": "올리브유에 마늘과 고추를 넣고 새우를 지글지글 익힌 요리. 빵을 찍어 먹으면 더 맛있어요.",
	"englishDescription": "Shrimp sizzled in olive oil with garlic and chili. Best enjoyed with bread for dipping.",
	"favorite": true,
	"id": "RTeW25I5h6o",
	"name": "감바스 알 아히요",
	"price": 17000,
	"spanishDescription": "Gambas chisporroteantes en aceite de oliva con ajo y guindilla. Ideales para mojar pan.",
	"subname": "Gambas al Ajillo"
}
```

- `subname`은 스페인어 원래 이름이며, 메뉴 사진 파일명도 이 값으로 정해집니다.
  예: `Gambas al Ajillo` → `public/assets/images/gambas-al-ajillo.jpg`. 다이어크리틱(Diacritics)은 제거하고 공백은 하이픈으로 바꿉니다.
- `favorite`이 `true`인 메뉴에는 추천 표시(👍)가 붙습니다.

`cart`에는 장바구니에 담긴 메뉴가 저장되며, 메뉴 정보에 원래 메뉴의 `dishId`와 `quantity`가 추가됩니다.

## 번역 추가하기

화면 문구는 `app/i18n/translations.ts`에서 관리합니다.
새 언어를 추가하려면 `Translation` 타입에 맞춰 문구 객체를 작성하고 `translations`에 등록하면 됩니다.
번역이 등록되지 않은 언어를 선택하면 한국어로 표시됩니다.
