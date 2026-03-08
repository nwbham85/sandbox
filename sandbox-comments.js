const STORAGE_KEY = 'sandbox_comments_v1';

export function initComments() {
    const postBtn = document.querySelector('.click');
    const userCommentInput = document.querySelector('.comment-input');
    const commentsDisplay = document.querySelector('.comments');

    if (!postBtn || !userCommentInput || !commentsDisplay) return;

    // Initialize the edit listener once
    edit(commentsDisplay);

    postBtn.addEventListener('click', () => {
        const text = userCommentInput.value.trim();
        if (text.length < 3) return alert("Please enter at least 3 characters.");

        const newComment = document.createElement('div');
        newComment.classList.add('comment-item'); 
        
        const now = new Date().toLocaleDateString();
        newComment.innerHTML = `
            <p class="comment-text">${text}</p>
            <span class="author">Guest User</span>
            <span class="date">${now}</span>
            <span class="button"><button class="editBtn primaryBtn">Edit</button></span>
        `;

        commentsDisplay.prepend(newComment);
        userCommentInput.value = '';
        
        // Ensure we only close the 'Create' modal, not the 'Edit' one
        const createModal = document.querySelector('.modal:not(.edit-modal)');
        if (createModal) createModal.classList.remove('active');
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

export function edit(commentsDisplay) {
    const editModal = document.querySelector('.edit-modal');
    const editInput = editModal.querySelector('.edit-comment');
    const updateBtn = editModal.querySelector('.click');
    const closeBtn = editModal.querySelector('.modal-close');
    
    let currentCommentTextElement = null;

    // 1. Listen for clicks on the comments container (Event Delegation)
    commentsDisplay.addEventListener('click', (e) => {
        if (e.target.classList.contains('editBtn')) {
            // Find the text element related to this specific button
            const commentItem = e.target.closest('.comment-item');
            currentCommentTextElement = commentItem.querySelector('.comment-text');

            // Pre-fill the modal input with existing text
            editInput.value = currentCommentTextElement.textContent;

            // Open the modal
            editModal.classList.add('active');
        }
    });

    // 2. Handle the "Update" button inside the modal
    updateBtn.addEventListener('click', () => {
        if (editInput.value.trim().length >= 2) {
            // Update the text in the UI
            currentCommentTextElement.textContent = editInput.value.trim();
            // Close modal
            editModal.classList.remove('active');
        } else {
            alert("Comment must be at least 2 characters.");
        }
    });

    // 3. Handle closing the modal
    closeBtn.addEventListener('click', () => {
        editModal.classList.remove('active');
    });
}

function getCommentsFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.parse(comments));
}