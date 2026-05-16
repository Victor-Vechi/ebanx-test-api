

export class EventInvalidException extends Error {
    constructor(event: string) {
        super(`Unknown event type: ${event}`);
        this.name = 'EventInvalidException';
    }
}