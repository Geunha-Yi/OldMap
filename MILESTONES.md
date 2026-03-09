# 마일스톤별 커밋 가이드

각 마일스톤 완료 시 **별도 커밋**을 권장합니다.

## 마일스톤 체크리스트

### 1. 프로젝트 초기화

- [ ] Next.js + TypeScript + Tailwind 초기화
- [ ] Git 저장소 초기화, .gitignore 설정
- [ ] COMMIT_CONVENTION.md, MILESTONES.md 작성
- [ ] Husky + lint-staged 설정

**커밋**: `chore(init): setup Next.js, Tailwind, Git`

---

### 2. 지도 컴포넌트

- [ ] Leaflet/React-Leaflet 설치
- [ ] 기본 지도 컴포넌트 (OSM/MapTiler 타일)
- [ ] 줌, 팬, 반응형 레이아웃

**커밋**: `feat(map): add base map with Leaflet`

---

### 3. 타임라인

- [ ] 연도 범위 슬라이더 (1600–2000)
- [ ] 상태 관리 (URL searchParams 또는 store)

**커밋**: `feat(timeline): add year range filter`

---

### 4. 검색/API 연동

- [ ] Geosearch API 또는 iframe 임베드
- [ ] 지역/좌표 검색 기능
- [ ] 검색 결과 데이터 구조 정의

**커밋**: `feat(search): integrate geosearch API`

---

### 5. 결과 패널

- [ ] 검색 결과 패널, 지도 목록
- [ ] 지도 상세 모달/페이지

**커밋**: `feat(ui): add map list and detail view`

---

### 6. 스타일/반응형

- [ ] 반응형 레이아웃
- [ ] UI 폴리시

**커밋**: `style(ui): responsive layout and polish`
