MYSQL 교육 정리
===============

1일차 [02. 18]
-----------------
### 교육 내용
#### 1. SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY
#### 2. JOIN( INNER, OUTER SELF, CROSS, THREE WAYS, Example)
#### 3. Grouping Data (Group by, Having)
#### 4. SubQuery
#### 5. Set Operator ( UNION, UNION ALL, INTERSECT, MINUS )


# DATABASE(Shema) 생성
```
* CREATE DATABASE [데이터 베이스 생성]
create database test;
* DROP DATABSE [데이터 베이스 삭제]
drop database test;
```

# SHOW
```
* DB 목록
show databases
* 테이블 목록
show tables; 
```

# DESC
```
    desc [테이블 명] -- 테이블 내 컬럼 목록 출력
```


# SELECT
### SELECT 구문의 7가지 대표 절
##### SELECT 컬럼,
##### FROM 테이블, 뷰, 인라인 뷰
##### WHERE 조건식
##### GROUP BY 그룹
##### HAVING 그룹 조건
##### ORDER BY 컬럼 ASC/DESC
##### LIMIT [offset, ] 행 개수;
```
# SELECT * FROM [TABLE명];
# SELECT * FROM [DB명].[TABLE명];
# SELECT now(); -- 현재 시간
# SELECT date_add(now(), interval 100 DAY) -- 현재로부터 100일 후
# select now() "현재 시간"; -- 이런 식으로 alias 가능
# SELECT * from [TABLE명] ORDER BY A ASC, B DESC; -- A 오름 차순 후, B 내림 차순
# SELECT * from [TABLE명] ORDER BY FIELD(A, 'B', 'A', 'C') -- B, A, C 순서로 정렬해라
 ** FIELD(STR, 'Param1', 'Param2')는 첫번째 매개변수인 STR의 위치를 반환한다.
 *** STR = 'Param1' 이면 1, STR = 'Param2' 이면 2, 없으면 0 
# SELECT * from [TABLE명] WHERE NUMBER BETWEEN 1 and 3 -- NUMBER가 1 ~ 3인 것들만
# SELECT * from [TABLE명] WHERE NAME LIKE '%hyun' AND AGE LIKE '2_' -- %는 여러 문자 매치, _는 단일 문자 매치
 ** %, _를 찾고싶은 경우 escape 문자 사용해서 찾을 수 있음
# IS NOT NULL, IS NULL, IN 모두 사용 가능
# SELECT DISTINCT * from [TABLE명] -- 중복 행 제거
```