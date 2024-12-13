// Registration form handling
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            eventName: document.getElementById('eventName').value
        };
        
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            const messageDiv = document.getElementById('message');
            messageDiv.className = 'success';
            messageDiv.innerHTML = `Registration successful! Your ticket number is: ${data.ticketNumber}`;
            registrationForm.reset();
        } catch (error) {
            const messageDiv = document.getElementById('message');
            messageDiv.className = 'error';
            messageDiv.innerHTML = 'Registration failed. Please try again.';
        }
    });
}

// View registrations handling
const viewAllBtn = document.getElementById('viewAll');
const searchByNameBtn = document.getElementById('searchByName');
const searchByEventBtn = document.getElementById('searchByEvent');
const deleteTicketBtn = document.getElementById('deleteTicket');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

if (viewAllBtn) {
    viewAllBtn.addEventListener('click', async () => {
        const response = await fetch('/api/registrations');
        const data = await response.json();
        displayResults(data);
    });
}

if (searchByNameBtn) {
    searchByNameBtn.addEventListener('click', async () => {
        const name = searchInput.value.trim();
        if (!name) {
            alert('Please enter a name to search');
            return;
        }
        const response = await fetch(`/api/registrations/byname/${name}`);
        const data = await response.json();
        displayResults(data);
    });
}

if (searchByEventBtn) {
    searchByEventBtn.addEventListener('click', async () => {
        const eventName = searchInput.value.trim();
        if (!eventName) {
            alert('Please enter an event name to search');
            return;
        }
        const response = await fetch(`/api/registrations/event/${eventName}`);
        const data = await response.json();
        displayResults(data);
    });
}

if (deleteTicketBtn) {
    deleteTicketBtn.addEventListener('click', async () => {
        const ticketNumber = searchInput.value.trim();
        if (!ticketNumber) {
            alert('Please enter a ticket number to delete');
            return;
        }
        const response = await fetch(`/api/registrations/cancel/${ticketNumber}`);
        const data = await response.json();
        alert(data.message);
        if (response.ok) {
            searchInput.value = '';
            viewAllBtn.click();
        }
    });
}

function displayResults(data) {
    if (!resultsDiv) return;
    
    if (!Array.isArray(data) || data.length === 0) {
        resultsDiv.innerHTML = '<p>No registrations found.</p>';
        return;
    }
    
    const html = data.map(registration => `
        <div class="registration-card">
            <h3>Ticket: ${registration.ticketNumber}</h3>
            <p><strong>Name:</strong> ${registration.name}</p>
            <p><strong>Email:</strong> ${registration.email}</p>
            <p><strong>Event:</strong> ${registration.eventName}</p>
            <p><strong>Registration Date:</strong> ${new Date(registration.registrationDate).toLocaleString()}</p>
        </div>
    `).join('');
    
    resultsDiv.innerHTML = html;
}