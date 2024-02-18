class Events {
    callbacks = [];
    nextId = 0;

    // emit events
    emit(eventName, value) {
        this.callbacks.forEach((call) => {
            if (call.eventName === eventName) {
                call.callback(value);
            }
        })
    }

    // subscribe to the events
    on(eventName, caller, callback) {
        this.nextId += 1;
        this.callbacks.push({
            id: this.nextId,
            eventName,
            caller,
            callback,
        });

        return this.nextId;
    }

    // remove the subscription
    off(id) {
        this.callbacks = this.callbacks.filter((call) => call.id !== id)
    }

    unsubscribe(caller) {
        this.callbacks = this.callbacks.filter((call) => call.caller !== caller)
    }
}

export const events = new Events();