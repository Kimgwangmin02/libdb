// 도서 목록 불러오기
function loadBooks() {
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(books => {
            const list = document.getElementById('list');
            list.innerHTML = '';
            books.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `ID: ${book[0]}, 제목: ${book[1]}, 출판년도: ${book[2]}, 출판사: ${book[3]}, 저자: ${book[4]}`;
                list.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

// 페이지 로드시 도서 목록 불러오기
document.addEventListener('DOMContentLoaded', loadBooks);

// 도서 추가
document.getElementById('add-button').addEventListener('click', () => {
    const bookData = {
        book_id: document.getElementById('book_id').value,
        title: document.getElementById('title').value,
        publication_date: document.getElementById('publication_date').value,
        publisher: document.getElementById('publisher').value,
        author: document.getElementById('author').value
    };

    fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadBooks();
        // 입력 필드 초기화
        document.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
    })
    .catch(error => console.error('Error:', error));
});

// 도서 삭제
document.getElementById('delete-button').addEventListener('click', () => {
    const bookId = document.getElementById('book_id').value;
    
    fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadBooks();
        // 입력 필드 초기화
        document.getElementById('book_id').value = '';
    })
    .catch(error => console.error('Error:', error));
});