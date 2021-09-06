const newBlogFormHandler = async (event) => {
    event.preventDefault();


const subject = document.querySelector('#subject-addpost').value.trim();
const textBody = document.querySelector('#textBody').value.trim();
var posting_date = new Date();

console.log(user);
console.log(text);
console.log(posting_date);

if (subject && textBody) {
    const response = await fetch('/api/blogs', {
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