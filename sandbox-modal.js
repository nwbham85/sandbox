// sandbox-modal.js

export function initModal() {
    const modalDiv = document.querySelector('.modal');
    const modalOpenBtn = document.querySelector('.modal-open');
    const modalCloseBtn = document.querySelector('.modal-close');

    if (!modalOpenBtn || !modalDiv) return; // Safety check

    // Open logic
    modalOpenBtn.addEventListener('click', () => {
        modalDiv.classList.add('active');
    });

    // Close logic (X button)
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modalDiv.classList.remove('active');
        });
    }

    // Close on background click
    window.addEventListener('click', (event) => {
        if (event.target === modalDiv) {
            modalDiv.classList.remove('active');
        }
    });
}