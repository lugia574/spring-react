# Swagger 란?

> 서버로 요청되는 API 리스트를 HTML 화면으로 문서화하여 테스트 할 수 있는 라이브러리

이 라이브러리는 서버가 가동되면서 @RestController를 읽어 API 를 분석하여 HTML 문서를 작성함

## 필요한 이유

REST APi 의 스펙을 문서화 하는 것은 매우 중요

api를 변경할 때 마다 Reference 문서를 계속 바꿔야하는 불편함이 있음

## 설정 방법

@Configuration : 어노테이션 기반의 환경 구성을 돕는 어노테이션 IoC Container 에게 해당 클래스를 Bean 구성 Class 임을 알려줌

@Bean 개발자가 직접 제어가 불가능한 외부 라이브러리 등을 Bean으로 만들 경우에 사용
