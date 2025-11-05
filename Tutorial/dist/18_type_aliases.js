"use strict";
const person1 = {
    id: '1',
    address: 'Dhaka',
    salary: 1000,
};
function getNextActionMessage(status) {
    switch (status) {
        case 'loading':
            return 'Please wait, loading in progress.';
        case 'success':
            return 'Loaded successfully.';
        case 'error':
            return 'An error occurred while loading.';
    }
}
