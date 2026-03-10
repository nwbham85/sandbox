import { tags } from './sandbox-tags.js'

const STORAGE_KEY = 'sandbox_comments_v1';

// Helper Functions
function getCommentsFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveCommentsToStorage(comments) {
    // FIX: Changed JSON.parse to JSON.stringify
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

function renderComments(container) {
    const comments = getCommentsFromStorage();
    container.innerHTML = ''; 

    comments.forEach(comment => {
        const div = document.createElement('div');
        div.classList.add('comment-item');
        div.setAttribute('data-id', comment.id);

        // FIX: Moved this INSIDE the forEach loop
        div.innerHTML = `
            <p class="comment-text">${comment.text}</p>
            <span class="author">Guest User</span>
            <span class="date">${comment.date}</span>
            <span class="button"><button class="editBtn primaryBtn">Edit</button></span>
        `;
        container.appendChild(div);
    });
}

export function initComments() {
    const postBtn = document.querySelector('.click');
    const userCommentInput = document.querySelector('.comment-input');
    const commentsDisplay = document.querySelector('.comments');

    if (!postBtn || !userCommentInput || !commentsDisplay) return;

    // Load initial data
    renderComments(commentsDisplay);
    edit(commentsDisplay);

    postBtn.addEventListener('click', () => {
        const text = userCommentInput.value.trim();
        if (text.length < 3) return;

        const allComments = getCommentsFromStorage();
        const newComment = {
            id: Date.now(),
            text: text,
            date: new Date().toLocaleDateString()
        };

        allComments.unshift(newComment);
        saveCommentsToStorage(allComments);
        renderComments(commentsDisplay);

        userCommentInput.value = '';
    });
}

export function edit(commentsDisplay) {
    const editModal = document.querySelector('.edit-modal');
    const editInput = editModal.querySelector('.edit-comment');
    const updateBtn = editModal.querySelector('.click');
    const closeBtn = editModal.querySelector('.modal-close');
    
    let currentCommentTextElement = null;

    commentsDisplay.addEventListener('click', (e) => {
        if (e.target.classList.contains('editBtn')) {
            const commentItem = e.target.closest('.comment-item');
            currentCommentTextElement = commentItem.querySelector('.comment-text');
            editInput.value = currentCommentTextElement.textContent;
            editModal.classList.add('active');
        }
    });

    updateBtn.addEventListener('click', () => {
        const newText = editInput.value.trim();
        if (newText.length < 2) return;

        // FIX: Changed activeTextElement to currentCommentTextElement
        const commentId = currentCommentTextElement.closest('.comment-item').getAttribute('data-id');
        let comments = getCommentsFromStorage();

        const commentToUpdate = comments.find(c => c.id == commentId);
        if (commentToUpdate) {
            commentToUpdate.text = newText;
            saveCommentsToStorage(comments);
            renderComments(commentsDisplay);
            editModal.classList.remove('active');
        }
    });

    closeBtn.addEventListener('click', () => {
        editModal.classList.remove('active');
    });
}