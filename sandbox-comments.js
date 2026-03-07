// sandbox-comments.js



export function initComments() {
    // Note: Changed from '.submit' to '.click' to match your HTML
    const postBtn = document.querySelector('.click');
    const userCommentInput = document.querySelector('.comment-input');
    const commentsDisplay = document.querySelector('.comments');

    if (!postBtn || !userCommentInput) return;

    postBtn.addEventListener('click', () => {
        const text = userCommentInput.value.trim();

        // Validation logic
        if (text.length < 3) {
            alert("Please enter at least 3 characters.");
            return;
        }

        // Create the comment structure
        const newComment = document.createElement('div');
        newComment.classList.add('comment-item'); // Good for CSS tracking!
        
        const now = new Date().toLocaleDateString();
        
        newComment.innerHTML = `
            <p class="comment-text">${text}</p>
            <span class="author">Guest User</span>
            <span class="date">${now}</span>
            <hr>
        `;

        // Add it to the top of the list
        commentsDisplay.prepend(newComment);

        // Clear input and close modal (optional)
        userCommentInput.value = '';
        document.querySelector('.modal').classList.remove('active');
    });
}

export function post(message) {
    console.log("Posting:", message);
    
    // Create a new element to show the comment
    const commentDisplay = document.createElement('p');
    commentDisplay.textContent = message;
    commentDisplay.style.margin = "10px 0";
    commentDisplay.style.borderBottom = "1px solid #eee";

    // Append it to the modal content
    document.querySelector('.modal-content').appendChild(commentDisplay);
}