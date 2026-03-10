 const tags = { // create tag object
    extractTags(text) {
        //extract hashtag style tags from comment string
        //return array of normalized tags strings ex 'city'
        if (!text || typeof text !== 'string') return [];
        const matches = text.match(/#[\w-]+/g);
        return matches ? matches.map(tag => this.normalizeTag(tag)) : [];
    },

    normalizeTag(tag){

    },

    searchCommentsByTag(comments,search) {

    },

    hasTag(comment,tag) {

    },

    getAllTags(comments) {

    },

    renderTags(tags) {

    }
}

