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

* 테이블이 SELECT된 내용으로 생성됨. [View, 임시테이블 활용]
CREATE TABLE [TABLE명]
AS
SELECT
    productLine,
    YEAR(orderDate) orderYear,
    SUM(quantityOrdered * priceEach) orderValue
FROM
    orderDetails
    INNER JOIN
        orders USING (orderNumber)
    INNER JOIN
        products USING (productCode)
    GROUP BY
        productLine ,
        YEAR(orderDate);

    SELECT
    *
    FROM
    sales;

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
# SELECT * from [TABLE] GROUP BY A HAVING A > 1000; -- MYSQL은 GROUP BY한 항목을 바로 정렬할 수 있다.
# SELECT * from [TABLE] GROUP BY YEAR(DATE); -- 표현 식으로 행을 그룹화 할 수 있다.
# SELECt * from [TABLE] Limit 5 -- 5개 한정
# SELECt * from [TABLE] Limit 5, 4 -- 5번 row부터 4개까지

```

# JOIN
### MYSQL에서 JOIN은 4가지로 구분
#### OUTER JOIN
#### INNER JOIN
#### SELF JOIN
```
# OUTERJOIN[LEFT, RIGHT]
 SELECT * from [TABLE_A] as TA LEFT JOIN [TABLE_B] as TB on TA.col = TB.col;
 SELECT * from [TABLE_A] as TA RIGHT JOIN [TABLE_B] as TB on TA.col = TB.col;

# INNER JOIN
SELECT * from [TABLE_A] as TA JOIN [TABLE_B] as TB on TA.col = TB.col;
SELECT * from [TABLE_A] as TA, [TABLE_B] as TB where TA.col = TB.col;

# SELF JOIN
 * 각 인원의 ID가 있고 각 인원은 boss컬럼에 자신의 보스 ID가 있을 경우
 ** 셀프 조인을 이용하여 자신의 boss 네임을 가져오는 쿼리
 SELECT c.name AS child, p.name AS parent
 FROM [TABLE] as p
 JOIN [TABLE] as c,
 on p.id = c.boss;

# MULTI TABLE JOIN
SELECT *
FROM [TABLE_A] as TA
JOIN [TABLE_B] as TB
ON TA.col = TB.col
JOIN [TABLE_C] as TC
ON TB.col1 = TC.col1

```

2일차 [02. 19]
-----------------

# ROLLUP

```

# 그룹화 된 항목의 토탈을 까지 한 번에 출력할 때 사용
# 그룹 네임에는 NULL이 출력 됨.

SELECT
    productLine,
    SUM(orderValue) totalOrderValue
FROM
    sales
GROUP BY
    productline WITH ROLLUP;

# GROUPING()함수
## ROLLUP으로 그룹화된 행이면 1 아니면 0
## IF(GROUPING(컬럼명), TURE겨우, FALSE 경우) 활용하여 컬럼 값 넣어줄 수 있음.

SELECT
    orderYear,
    productLine,
    SUM(orderValue) totalOrderValue,
    GROUPING(orderYear), # 추가
    GROUPING(productLine) # 추가
FROM
    sales
GROUP BY
    orderYear,
    productline
WITH ROLLUP;

```

# Subquery

```
    # 다른 쿼리 내에 중첩 된 쿼리.
    # 서브 쿼리는 해당 표현식이 사용되는 모든 곳에서 사용할 수 있으며 괄호로 묶어야 함.

    ** 여러 행 비교
    SELECT *
    FROM [TABLE_A]
    WHERE ID IN ( SELECT ID FROM [TABLE_B] )

    ** 서브 쿼리가 단일 값을 리턴하면 비교 연산자를 사용할 수 있다.
    SELECT *
    FROM [TABLE_A]
    WHERE ID = ( SELECT ID FROM [TABLE_B] LIMIT 1 )

    ** EXISTS, NOT EXISTS 사용
    --> error (
                EXISTS는 MSSQL커서 처럼 한 ROW씩 비교를 하고 결과가 존재하면 1 없으면 0으로 판단한다.
                즉 아래의 코드는 모두 결과가 존재하게 서브 쿼리가 있기 때문에 의도했던 B에있는 ID만 출력이 이루어지지 않는다.
            )
    SELECT *
    FROM [TABLE_A]
    WHERE ID EXISTS( SELECT ID FROM [TABLE_B] )

    --> error fix
    SELECT *
    FROM [TABLE_A] as A
    WHERE ID EXISTS( SELECT ID FROM [TABLE_B] as B WHERE A.ID = B.ID )

    ** Inline View
    *** 인라인 뷰, 혹은 파생 테이블이라고 하며 FROM 절에 사용되는 독립 서브 쿼리를 의미함. (별칭 필수)
    SELECT *
    FROM (
        SELECT *
        FROM [TABLE명]
    ) AS INLINE_TABLE
    WHERE INLINE_TABLE.col = 'AAA'
```

# Common Table Expressions [CTE]

```
    # CTE란 - SQL 실행 범위 내에서만 존재하는 캐쉬 테이블. 실행이 끝나면 사라짐.
    ** 동일한 쿼리에서 여러 번 재귀하여 참조할 수 있다.

    WITH [CTE_TABLE] AS (
        SELECT *
        FROM [TABLE_A]
        WHER COL IN ('1', '2', '3')
    )
    SELECT * FROM [CTE_TABLE];

```

# UNION 

```
    ** 규칙 : FIELD 수와 순서는 동일해야함, 데이터 유형 동일하거나 호환 가능해야 함
    SELECT FIELD1
    FROM [TABLE_A]
    UNION [DISTINCT | ALL] -- DISTINCT는 중복 행 제거이며 명시하지 않을 경우 Default값이다.
    SELECT FIELD1
    FROM [TABLE_B]

```


# INSERT

```
    1. INSERT INTO [TABLE] (FIELD1, FIELD2, ...)
        VALUES(DATA1, DATA2, ...);
    2. INSERT INTO [TABLE]
        VALUES(DATA1, DATA2, ...);
    ** 위의 경우 스키마와 같은 순서대로 필드 값이 자동 대입 됨.
    -> 생략할 수 있는 필드 (NUll 허용, Default 설정, Auto_Increment 설정)
    
    ** 여러 ROW 한 번에 INSERT
    INSERT INTO [TABLE] (FIELD1, FIELD2, ...)
    VALUES
    (VALUE1, VALUE2, ...),
    (VALUE1, VALUE2, ...),
    (VALUE1, VALUE2, ...),
    (VALUE1, VALUE2, ...);

```

# UPDATE

```
    # 기본 업데이트
    UPDATE [TABLE]
    SET FIELD1 = DATA1, ....
    WHERE FIELD_WHERE = VALUE1;

    # 조인 업데이트
    UPDATE [TABLE_A] as A
    JOIN [TABLE_B] as B
    ON A.FIELD = B.FIELD
    SET B.FIELD_NAME = A.FIELD_NAME
    WHERE B.FIELD_CODE = LEFT(A.FIELD_CODE, 2)
```

# DELETE
```
   DELETE FROM [TABLE] WHERE FIELD = VALUE;

   # ON DELETE CASCADE
   ** 특정 행 삭제 시 다른 테이블에 영향이 있게 하는 거
    CREATE TABLE TABLE_A ( 
        num INT PRIMARY KEY AUTO_INCREMENT,
        name varchar(255)
    )

    CREATE TABLE TABLE_B (
        B_no INT PRIMARY KEY AUTO_INCREMENT,
        name varchar(255),
        num INT NOT NULL,
        FOREIGN KEY (num)
            REFERENCES TABLE_A (num)
            ON DELETE CASCADE
    )

    ** 데이터 베이스에서 삭제 규칙이 연결된 테이블 검색
    USE information_schema;

    SELECT table_name
    FROM referential_constraints
    WHERE referenced_table_name = 'TABLE_A'
    AND delete_rule = 'CASCADE';

```

# 트랜잭션

```
    # MySQL 트랜잭션을 사용하면 데이터베이스에 부분 작업의 결과가 포함되지 않도록 설정할 수 있다.
      작업 집합의 일련의 작업에서 각각의 작업이 실패하면 롤백이 발생하여 원래상태로 복원 됨.
      작업 집합이 모두 성공할 경우 데이터베이스에 커밋 됨.

      START TRANSACTION -- 트랜잭션 시작
      COMMIT -- 커밋하고 영구적으로 변경
      ROLLBACK -- 트랜잭션 롤백하고 변경 사항 취소
      SET autocommit -- 자동 커밋 모드 상태값 (1, 0 혹은 ON, OFF)
      ** Savepoint를 사용하여 저장 지점을 만들 수 있음.

      ** 사용 예시 첫 FIELD1은 'START'로 설정했다고 가정
      SET AUTOCOMMIT = FALSE -- 자동 저장 종료
      START TRANSATION; -- 트랜잭션 시작

      UPDATE TABLE_A SET FIELD1 = 'A'
      SAVEPOINT A; -- savepoint 지정 [추후 rollback으로 돌아갈 수 있게]

      UPDATE TABLE_A SET FIELD1 = 'B'
      SAVEPOINT B; -- savepoint 지정 [추후 rollback으로 돌아갈 수 있게]

      UPDATE TABLE_A SET FIELD1 = 'C'
      SAVEPOINT C; -- savepoint 지정 [추후 rollback으로 돌아갈 수 있게]

      # COMMIT을 하면 FIELD1은                C
      # ROLLABCK 하면 FIELD1은                START
      # ROLLBACK TO SAVEPOINT B 하면 FIELD1은 B
      *** COMMIT을 하고 나면 더이상 ROLLBACK을 할 수 없다.
```

# 데이터 타입

```
    # CHAR와 VARCHAR
    ** CHAR(고정 길이), VARCHAR(가변 길이)

    # TEXT 타입
    ** 1바이트 ~ 4 GB까지 텍스트 문자열을 저장하는데 유용하지만 느림.

    # CAST, CONVERT
    ** 데이터 자료형을 변경하는 함수
    *** CONVERT( EXPRESSION, 데이터 형식[길이])
    *** CAST( EXPRESSION AS 데이터 형식[길이])
```