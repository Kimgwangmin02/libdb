const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Oracle DB 연결 설정
const dbConfig = {
    user: 'your_username',
    password: 'your_password',
    connectString: 'localhost:1521/your_service_name'
};

// 도서 목록 조회
app.get('/books', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            'SELECT * FROM books'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 에러' });
    } finally {
        if (connection) {
            await connection.close();
        }
    }
});

// 도서 추가
app.post('/books', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const { book_id, title, publication_date, publisher, author } = req.body;
        await connection.execute(
            `INSERT INTO books (book_id, title, publication_date, publisher, author) 
             VALUES (:1, :2, :3, :4, :5)`,
            [book_id, title, publication_date, publisher, author],
            { autoCommit: true }
        );
        res.json({ message: '도서가 추가되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 에러' });
    } finally {
        if (connection) {
            await connection.close();
        }
    }
});

// 도서 삭제
app.delete('/books/:id', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        await connection.execute(
            'DELETE FROM books WHERE book_id = :1',
            [req.params.id],
            { autoCommit: true }
        );
        res.json({ message: '도서가 삭제되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 에러' });
    } finally {
        if (connection) {
            await connection.close();
        }
    }
});

app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 실행중입니다.');
});