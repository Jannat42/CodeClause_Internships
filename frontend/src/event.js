document.addEventListener('DOMContentLoaded', function() {
    const createEventForm = document.getElementById('createEventForm');
    const eventsList = document.getElementById('eventsList');

    // Function to fetch events from the backend and render them
    async function fetchAndRenderEvents() {
        eventsList.innerHTML = ''; // Clear existing events

        try {
            const response = await fetch('/events');
            const events = await response.json();
            events.forEach(event => {
                const li = document.createElement('li');
                li.textContent = `${event.title} - ${new Date(event.date).toDateString()} - ${event.location}`;
                eventsList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    // Event listener for form submission to create a new event
    createEventForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(createEventForm);
        const newEvent = {
            title: formData.get('title'),
            date: formData.get('date'),
            location: formData.get('location')
        };

        try {
            const response = await fetch('/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEvent)
            });
            if (response.ok) {
                // Event created successfully, fetch and render updated events
                await fetchAndRenderEvents();
                // Clear form fields
                createEventForm.reset();
            } else {
                console.error('Failed to create event:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    });

    // Fetch and render events on page load
    fetchAndRenderEvents();
});
