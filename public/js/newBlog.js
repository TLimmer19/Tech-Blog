const addpostFormHandler = async (event) => {
    event.preventDefault();


const subject = document.querySelector('#subject-addpost').value.trim();
const textBody = document.querySelector('#textBody').value.trim();



if (subject && textBody) {
    const response = await fetch('/api/users/addpost', {
        method: 'POST',
        body: JSON.stringify({subject, textBody}),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to add post.');
    }
}
};


document
.querySelector('.addpost-form')
.addEventListener('submit', addpostFormHandler);