to be crossed later 

document.addEventListener("DOMContentLoaded", () => {
    fetch('public/curriculum-data.json')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('curriculum-list');
            list.innerHTML = ''; // Prevent duplication
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'curriculum-card';
                card.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    ${item.link ? `<a href="${item.link}" target="_blank">View PDF</a>` : ''}
                `;
                list.appendChild(card);
            });
        })
        .catch(err => {
            console.error('Error loading curriculum:', err);
        });
});