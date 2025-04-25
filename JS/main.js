document.addEventListener('DOMContentLoaded', function() {
    const eventListDiv = document.getElementById('event-list');
    const addEventButton = document.getElementById('add-event-button');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateSort = document.getElementById('dateSort');

    function loadEvents() {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        return events;
    }

    function displayEvents(events) {
        eventListDiv.innerHTML = '';

        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
                <h3>${event.name}</h3>
                <p>Дата: ${event.date}</p>
                <p>Категория: ${event.category}</p>
            `;

            eventCard.addEventListener('click', function() {
                window.location.href = `edit.html?id=${event.id}`;
            });

            eventListDiv.appendChild(eventCard);
        });
    }

    function filterEvents(category) {
        let events = loadEvents();
        if (category !== 'all') {
            events = events.filter(event => event.category === category);
        }
        return events;
    }

    function sortEvents(sortBy) {
        let events = loadEvents();
        events.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            if (sortBy === 'closest') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
        return events;
    }

    let events = loadEvents();
    displayEvents(events);

    categoryFilter.addEventListener('change', function() {
        const category = categoryFilter.value;
        let filteredEvents = filterEvents(category);
        let sortBy = document.getElementById('dateSort').value;
        if (sortBy !== null) {
        	filteredEvents = sortEvents(sortBy);
        }

        displayEvents(filteredEvents);
    });

    dateSort.addEventListener('change', function() {
        const sortBy = dateSort.value;
        let category = document.getElementById('categoryFilter').value;
        let sortedEvents = sortEvents(sortBy);
        if (category !== null && category != 'all') {
        	sortedEvents = filterEvents(category);
        }
        displayEvents(sortedEvents);
    });

    addEventButton.addEventListener('click', function() {
        window.location.href = 'add.html';
    });
});