# El Camino

![로고](/docs/logo.png)

스페인 음식점 **El Camino**의 주문 키오스크 웹 앱입니다.
매장 식사·포장을 고르고, 메뉴를 살펴 장바구니에 담은 뒤 결제까지 진행할 수 있습니다.
비대면 시대가 다가옴에 따라 스페인 음식점에도 혁신을 가해야겠다는 생각에 해당 프로젝트를 기획하게 되었습니다.
주요 사용자는 이색적인 스페인 요리를 맛보고자 하는 누구나입니다.

**개발 기간: 2026-09-29 ~ 2026-10-01**

## 주요 기능

- **주문 방식 선택**: 첫 화면에서 매장 식사 또는 포장을 선택합니다.
- **카테고리별 메뉴**: 타파스, 빠에야, 메인 요리, 디저트, 음료의 다섯 가지 카테고리를 제공합니다. 카테고리를 누르면 해당 메뉴로 스크롤되고, 메뉴를 스크롤하면 현재 보고 있는 카테고리가 자동으로 선택됩니다.
- **채식 필터**: 전체 / 비건 / 채식(락토-오보) 중에서 골라 메뉴를 걸러 볼 수 있습니다. 비건 메뉴는 채식 필터에도 함께 표시됩니다.
- **알레르기 정보**: 글루텐, 갑각류, 연체류, 생선, 달걀, 우유, 견과류, 아황산류 8가지 알레르기 유발 성분을 아이콘으로 표시합니다.
- **메뉴 상세 모달**: 메뉴 카드를 누르면 사진, 설명, 알레르기 성분, 가격이 담긴 상세 창이 열립니다. 닫기 버튼, 창 바깥 클릭, ESC 키로 닫을 수 있으며 닫힐 때 페이드 아웃 애니메이션이 재생됩니다.
- **장바구니 담기**: 담기 버튼을 누르거나, 메뉴 카드를 주문 내역으로 **드래그 앤 드롭**해서 담을 수 있습니다. 같은 메뉴를 다시 담으면 수량이 늘어납니다.
- **주문 내역**: 담은 메뉴와 합계를 확인하고 초기화할 수 있습니다. 금액은 공항 출발 안내판 같은 스플릿 플랩 애니메이션으로 바뀝니다.
- **과다 주문 알림**: 합계가 100,000원을 넘는 순간 돼지 알림이 뜹니다.
- **쿠폰**: 특정 알고리즘으로 생성된 16자리 쿠폰 번호를 입력하면 모든 메뉴가 50% 할인됩니다.
- **결제**: 결제 버튼을 누르면 장바구니가 비워지고 결제 완료 페이지로 이동합니다.
- **다국어 지원**: 한국어, 영어, 스페인어와 함께 잼민이체, 어르신체를 지원합니다. 선택한 언어는 브라우저에 저장되어 새로고침 후에도 유지됩니다.
- **로딩·에러 화면**: 메뉴를 불러오는 중이거나 실패했을 때 전용 화면을 보여 주며, 에러 화면에서 다시 시도할 수 있습니다.

## 기술 스택

| 분류                 | 사용 기술                                         |
| -------------------- | ------------------------------------------------- |
| 프레임워크           | Next.js 16 (App Router), React 19 (ViewTransition) |
| 언어                 | TypeScript                                        |
| 서버 상태 관리       | TanStack Query                                    |
| 클라이언트 상태 관리 | Zustand (persist 미들웨어)                        |
| 스타일               | CSS Modules, clsx                                 |
| Mock API             | json-server                                       |

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
다른 주소의 API 서버를 사용하려면 `NEXT_PUBLIC_API_URL` 환경 변수를 지정합니다.

### 3. 개발 서버 실행

다른 터미널에서 실행합니다.

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에 접속하면 앱을 확인할 수 있습니다.

### 기타 스크립트

| 명령어                    | 설명                          |
| ------------------------- | ----------------------------- |
| `npm run build`           | 프로덕션 빌드                 |
| `npm run start`           | 빌드 결과 실행                |
| `npm run lint`            | ESLint 검사                   |
| `npm run coupon -- [개수]` | 쿠폰 번호 생성 (기본 1개)     |

## 페이지 구성

| 경로        | 설명                                                                |
| ----------- | ------------------------------------------------------------------- |
| `/`         | 언어 선택과 주문 방식(매장 식사·포장) 선택                          |
| `/main`     | 채식 필터, 카테고리별 메뉴, 메뉴 상세 모달, 주문 내역, 쿠폰 적용    |
| `/complete` | 결제 완료                                                           |

페이지를 이동할 때는 React의 `ViewTransition`으로 페이드 전환이 적용됩니다.

![처음 화면](/docs/First.png)
![메인 화면](/docs/Second.png)
![완료 화면](/docs/Third.png)

## 프로젝트 구조

코드는 `src/` 아래에 역할별 계층으로 나뉘어 있으며, `@/*` 경로 별칭이 `src/*`를 가리킵니다.

```text
src/
├── app/                      # 라우팅 계층 (Next.js App Router)
│   ├── page.tsx              # / 페이지
│   ├── main/                 # /main 페이지
│   ├── complete/             # /complete 페이지
│   ├── layout.tsx            # Pretendard 폰트, Providers 적용
│   ├── providers.tsx         # React Query Provider, 저장된 언어 복원
│   └── globals.css
│
├── features/                 # 기능 단위 모듈
│   ├── cart/                 # 장바구니·주문 내역
│   │   ├── api/cartAPI.ts
│   │   ├── hooks/            # useCart, useAddToCart, useClearCart, useCheckout,
│   │   │                     # useDishDrop, useOverLimitAlert
│   │   ├── lib/dishDrag.ts   # 드래그 앤 드롭 데이터 처리
│   │   ├── ui/               # Invoice, PigModal
│   │   └── index.ts          # 공개 API
│   ├── coupon/               # 쿠폰 입력
│   │   ├── hooks/useCouponInput.ts
│   │   └── ui/CouponModal.tsx
│   ├── language/             # 언어 선택
│   │   └── ui/LanguageSelector.tsx
│   ├── menu/                 # 메뉴판
│   │   ├── api/dishAPI.ts
│   │   ├── hooks/            # useDishes, useCategoryScrollSpy
│   │   ├── lib/              # 알레르기·채식 아이콘, 메뉴 이미지 경로
│   │   └── ui/               # CategoryNav, DietFilter, MenuList, DishCard, DishModal
│   └── order/                # 주문 방식 선택
│       ├── hooks/useStartOrder.ts
│       ├── model/useOptionStore.ts
│       └── ui/WelcomeScreen.tsx
│
├── domain/                   # 프레임워크에 의존하지 않는 타입과 비즈니스 규칙
│   ├── cart/                 # CartDish 타입, 합계·할인 계산(pricing), findCartDish
│   ├── coupon/               # 쿠폰 생성·검증·포맷
│   ├── menu/                 # Dish, Category, Allergen, Diet, matchesDiet
│   └── order/                # Option (매장 식사·포장)
│
├── i18n/                     # 다국어
│   ├── Language.ts, languages.ts
│   ├── translations.ts       # 화면 문구
│   ├── localizeDish.ts       # 메뉴 이름·설명 현지화
│   ├── useLanguageStore.ts   # 선택한 언어 (Zustand persist)
│   ├── useLanguageSync.ts    # 언어 복원과 <html lang> 동기화
│   └── useTranslation.ts
│
└── shared/                   # 기능과 무관하게 재사용되는 코드
    ├── api/http.ts           # fetch 래퍼
    ├── assets/               # 로고, Pretendard 폰트
    ├── hooks/                # useModal, useScrollIndicator
    ├── lib/removeDiacritics.ts
    └── ui/                   # SplitFlap, PageTransition, LoadingScreen, ErrorScreen

public/assets/images/         # 메뉴 사진
scripts/generateCoupon.mjs    # 쿠폰 번호 생성 스크립트
db.json                       # Mock 데이터 (dishes, cart)
```

### 계층 규칙

```text
app → features → i18n → domain
          ↓
        shared
```

- **`domain`** 과 **`shared`** 는 다른 계층을 가져오지 않습니다. 가격 계산, 쿠폰 검증, 채식 필터 조건 같은 규칙은 React 없이 `domain`에 순수 함수로 둡니다.
- **`i18n`** 은 `domain`의 타입(Category, Allergen, Diet, Dish)만 참조합니다.
- **`features`** 는 각 폴더의 `index.ts`를 공개 API로 삼습니다. 페이지나 다른 기능은 `@/features/<기능>`으로만 가져오고 내부 파일을 직접 참조하지 않습니다.
  예: `DishCard`는 `@/features/cart`에서 `useAddToCart`, `setDishDragData`를, `Invoice`는 `@/features/coupon`에서 `CouponModal`을 가져옵니다.
- 각 기능 폴더는 `api`(서버 요청), `hooks`(상태·동작), `lib`(헬퍼), `model`(클라이언트 스토어), `ui`(컴포넌트)로 나눕니다.
- **`app`** 의 페이지는 기능 컴포넌트를 조합하는 역할만 합니다.

### 상태 관리

| 상태               | 위치                                      | 방식                                                       |
| ------------------ | ----------------------------------------- | ---------------------------------------------------------- |
| 메뉴 목록          | `features/menu/hooks/useDishes.ts`        | TanStack Query. 한 번 불러온 뒤 채식 필터는 `select`로 거름 |
| 장바구니           | `features/cart/hooks/useCart.ts` 외       | TanStack Query. 변경 요청은 같은 `scope`로 순서대로 처리, 비우기는 낙관적 업데이트 |
| 쿠폰 적용 여부     | `features/cart/hooks/useCheckout.ts`      | React state                                                |
| 주문 방식          | `features/order/model/useOptionStore.ts`  | Zustand persist (`option-storage`)                         |
| 언어               | `i18n/useLanguageStore.ts`                | Zustand persist (`language-storage`), 마운트 후 복원       |

## 데이터 구조

`db.json`의 `dishes`에 담긴 메뉴 한 개의 형태는 다음과 같습니다.

```json
{
	"allergens": ["egg"],
	"category": "tapas",
	"description": "바삭하게 튀긴 감자에 매콤한 브라바스 소스와 알리올리를 곁들였어요.",
	"diet": "vegetarian",
	"englishDescription": "Crispy fried potatoes topped with spicy bravas sauce and aioli.",
	"favorite": true,
	"id": "AujAKdX4sKw",
	"jamminDescription": "...",
	"name": "파타타스 브라바스",
	"price": 11000,
	"spanishDescription": "...",
	"subname": "Patatas Bravas",
	"teulttakDescription": "..."
}
```

| 필드                                                                                   | 설명                                                                                     |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `category`                                                                             | `tapas`, `paella`, `principales`, `postre`, `bebidas` 중 하나                             |
| `name` / `subname`                                                                     | 한국어 이름 / 스페인어 원래 이름. 영어·스페인어 화면에서는 `subname`을 이름으로 사용      |
| `description`                                                                          | 한국어 설명                                                                              |
| `englishDescription`, `spanishDescription`, `jamminDescription`, `teulttakDescription` | 언어별 설명. 없으면 한국어 설명을 사용                                                   |
| `allergens`                                                                            | `gluten`, `crustacean`, `mollusc`, `fish`, `egg`, `milk`, `nuts`, `sulfites` 중 해당 성분 |
| `diet`                                                                                 | `vegan` 또는 `vegetarian`. 고기나 해산물이 들어가면 생략                                  |
| `favorite`                                                                             | `true`이면 추천 표시(따봉)                                                                  |

- 메뉴 사진 파일명은 `subname`으로 정해집니다. 다이어크리틱(Diacritics)을 제거하고 소문자로 바꾼 뒤 공백을 하이픈으로 바꿉니다.
  예: `Patatas Bravas` → `public/assets/images/patatas-bravas.jpg`
- `cart`에는 장바구니에 담긴 메뉴가 저장되며, 메뉴 정보에 원래 메뉴의 `dishId`와 `quantity`가 추가됩니다. json-server가 POST 시 `id`를 새로 발급하기 때문에 원래 `id`는 `dishId`로 따로 보관합니다.

## 쿠폰

쿠폰 번호는 무작위 본문 13자리와 검증 코드 3자리로 이루어진 16자리 알파벳 대문자·숫자입니다.
검증 코드는 비밀 키와 본문을 FNV-1a로 해시해서 만들기 때문에 `npm run coupon`으로 생성한 번호만 검증을 통과합니다.
입력 창에서는 4자리마다 하이픈을 넣어 `XXXX-XXXX-XXXX-XXXX` 형태로 표시합니다.

> 비밀 키가 클라이언트 코드에 포함되므로 데모용입니다. 실제 서비스에서는 서버에서 검증해야 합니다.

할인율과 과다 주문 기준 금액은 각각 `src/domain/coupon/coupon.ts`의 `COUPON_DISCOUNT_RATE`, `src/domain/cart/pricing.ts`의 `OVER_LIMIT_PRICE`에서 바꿀 수 있습니다.

## 번역 추가하기

화면 문구는 `src/i18n/translations.ts`에서 관리합니다. 새 언어를 추가하려면 다음 순서를 따릅니다.

1. `src/i18n/Language.ts`의 `Language` enum에 언어를 추가합니다.
2. `src/i18n/languages.ts`의 `languages`에 표시 이름과 `<html lang>` 값을 등록합니다.
3. `src/i18n/translations.ts`에서 `Translation` 타입에 맞춰 문구 객체를 작성하고 `translations`에 등록합니다.
4. 메뉴 설명도 번역하려면 `Dish` 타입과 `db.json`에 설명 필드를 추가하고 `src/i18n/localizeDish.ts`에서 연결합니다.

번역이 등록되지 않은 언어를 선택하면 한국어로 표시됩니다.
