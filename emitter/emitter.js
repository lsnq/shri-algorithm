// EMITTER
const emitter = {
    /**
     * Подписка обработчика на событие
     * @param {String} event
     * @param {Function} handler
     */
    on: function (event, handler) {  
        if (typeof(this.events[event]) === 'undefined') {
            this.events[event] = [];
        };
        this.events[event].push(handler); 
    },

    /**
     * Отписка от события
     * @param {String} event
     * @param {Function} handler
     */
    off: function (event, handler) {
        if (!this.events[event]) { return false };
        for (let i = this.events[event].length; i >= 0; i--) {
            if (this.events[event][i] === handler) {
                this.events[event].splice(i,1);
            };
        };
    
    },

    /**
     * Вызов события
     * @param {String} event
     */
    emit: function (event) { 
        if (!this.events[event]) { return false };
        for (let i = 0, l = this.events[event].length; i < l; i++) {
            if (typeof this.events[event][i] === 'function') {
                this.events[event][i]()
            };
        };
    },

    events: {}
};

// ТЕСТЫ
const handler1 = () => {
    console.log('h1: lasers activated');
};

const handler2 = () => {
    console.log('h2: kittens here');
};

const handler3 = () => {
    console.log('h3: little candy');
};

emitter.on('event1', handler1)
emitter.emit('event1')
// h1: lasers activated

emitter.on('event1', handler2)
emitter.emit('event1')
// h1: lasers activated
// h2: kittens here

emitter.off('event1', handler1)
emitter.emit('event1')
//h2: kittens here

emitter.on('event2', handler3)
emitter.emit('event2')
//h3: little candy