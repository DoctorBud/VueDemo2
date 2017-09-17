export default {
    fetch: function fetch(storageKey) {
        return JSON.parse(localStorage.getItem(storageKey) || '[]');
    },
    save: function save(storageKey, todos) {
        localStorage.setItem(storageKey, JSON.stringify(todos));
    },
};
