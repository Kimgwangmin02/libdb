const express = require('express');
const oracledb = require('oracledb');
const app = express();

app.use(express.json());
app.use(express.static('.')); // 현재 디렉토리의 정적 파일 제공

// 오라클 데이터베이스 연결 설정
const dbConfig = {
    user: 'your_username',
    password: 'your_password',
    connectString: 'localhost:1521/your_service_name'
};

// 도서 추가
app.post('/add', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const data = req.body.data;
        
        // 도서 정보 삽입 (5개의 필드가 있다고 가정)
        const sql = `INSERT INTO BOOKS 
            (BOOK_ID, TITLE, AUTHOR, PUBLISHER, PUBLICATION_YEAR) 
            VALUES (:1, :2, :3, :4, :5)`;
        
        await connection.execute(sql, data, { autoCommit: true });
        
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

// 도서 삭제
app.post('/delete', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const data = req.body.data;
        
        // BOOK_ID를 기준으로 삭제
        const sql = `DELETE FROM BOOKS WHERE BOOK_ID = :1`;
        
        await connection.execute(sql, [data[0]], { autoCommit: true });
        
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

// 도서 목록 조회
app.get('/list', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        
        const result = await connection.execute(
            `SELECT * FROM BOOKS ORDER BY BOOK_ID`,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});