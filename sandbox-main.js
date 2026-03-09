import { initModal } from './sandbox-modal.js';
import {initComments} from './sandbox-comments.js';
import {tags} from './sandbox-tags.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    initModal();
    initComments();
});