document.getElementById('add-button').addEventListener('click', function() {
    const textareas = document.querySelectorAll('#input-container textarea');
    const data = Array.from(textareas).map(textarea => textarea.value);

    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // 데이터베이스에서 데이터를 가져와 리스트를 업데이트하는 함수를 호출합니다.
        updateList();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('delete-button').addEventListener('click', function() {
    const textareas = document.querySelectorAll('#input-container textarea');
    const data = Array.from(textareas).map(textarea => textarea.value);

    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // 데이터베이스에서 데이터를 가져와 리스트를 업데이트하는 함수를 호출합니다.
        updateList();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function updateList() {
    fetch('/list')
    .then(response => response.json())
    .then(data => {
        const listContainer = document.getElementById('list');
        listContainer.innerHTML = ''; // 기존 리스트를 초기화합니다.
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listContainer.appendChild(li);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}