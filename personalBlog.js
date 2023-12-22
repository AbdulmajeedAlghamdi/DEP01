const Hobby = (hobby, rank, when, totalHours) => ({ hobby, rank, when, totalHours });
(() => {
    const populateHobbiesTable = (hobbies) => {
        const tableBody = document.getElementById("dynamicTable");
        const rows = hobbies.map(item => createTableRow(tableBody, item));
        tableBody.append(...rows);
    };

    const createTableRow = (tableBody, item) => {
        const row = tableBody.insertRow();
        [item.hobby, item.rank, item.when, item.totalHours].forEach(data => addCellToRow(row, data));
        return row;
    };

    const addCellToRow = (row, data) => {
        const cell = row.insertCell();
        cell.innerHTML = data;
    };

    const fetchCatImage = () => {
        const handleSuccess = (data) => {
            const catImageElement = document.getElementById('catImage');
            const imageUrl = data && data.length > 0 ? data[0].url : null;
            if (imageUrl) {
                const img = createImageElement(imageUrl);
                catImageElement.appendChild(img);
            } else {
                catImageElement.textContent = 'Failed to load cat image.';
            }
        };

        const handleError = (error) => {
            const catImageElement = document.getElementById('catImage');
            catImageElement.textContent = 'Error fetching cat image.';
            console.error('Error:', error);
        };

        fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => response.json())
            .then(handleSuccess)
            .catch(handleError);
    };

    const createImageElement = (url) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Random Cat';
        return img;
    };

    document.addEventListener('DOMContentLoaded', () => {
        const hobbiesData = [
            Hobby("Sleeping", "#1", "Every night", "5 to 8"),
            Hobby("Walking", "#2", "Every morning", "30 minutes to 1 hour"),
            Hobby("Studying", "#3", "Anytime", "2 to 8 hours")
        ];
        populateHobbiesTable(hobbiesData);

        fetchCatImage();
    });
})();
