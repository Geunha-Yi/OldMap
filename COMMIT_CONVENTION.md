# 커밋 메시지 규칙

## 형식

```
type(scope): subject
```

## Type

| type       | 용도                                    |
| ---------- | --------------------------------------- |
| `feat`     | 새 기능                                 |
| `fix`      | 버그 수정                               |
| `docs`     | 문서만 변경                             |
| `style`    | 포맷, 세미콜론 등 (코드 동작 변화 없음) |
| `refactor` | 리팩터링                                |
| `test`     | 테스트 추가/수정                        |
| `chore`    | 빌드, 설정, 의존성 등                   |

## Scope (선택)

- `map` - 지도 컴포넌트
- `timeline` - 타임라인
- `search` - 검색/API
- `ui` - UI/레이아웃
- `init` - 초기화
- `deps` - 의존성

## 예시

```
feat(map): add Leaflet map component
feat(timeline): implement year range slider
fix(search): correct coordinate parsing
chore(deps): add react-leaflet
docs: update README
```
