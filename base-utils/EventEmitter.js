class EventEmitter {
    constructor() {
        this.emit = this.emit.bind(this);
        this.callbacks = {};
        this.singularCallbacks = {};
    }

    emit(event, data) {
        if (event in this.callbacks) {
            this.callbacks[event].forEach(callback => {
                callback(data);
            })
        }

        if (event in this.singularCallbacks) {
            this.singularCallbacks[event].forEach(callback => {
                callback(data);
            });
            delete this.singularCallbacks[event];
        }
    }

    removeListener(event, removedCallback) {
        if (event in this.callbacks) {
            this.callbacks[event] = this.callbacks[event].filter(callback => callback !== removedCallback);
        }

        if (event in this.singularCallbacks) {
            this.singularCallbacks[event] = this.singularCallbacks[event].filter(callback => callback !== removedCallback);
        }
    }

    on(event, callback) {
        if (!(event in this.callbacks)) {
            this.callbacks[event] = [];
        }

        this.callbacks[event].push(callback)
    }

    once(event, callback){
        if (!(event in this.singularCallbacks)) {
            this.singularCallbacks[event] = [];
        }

        this.singularCallbacks[event].push(callback)
    }
}

module.exports = EventEmitter;
