export default class EventManager {
    private static instance: EventManager = new EventManager();
    private listeners: { [key: string]: Function[] } = {};

    private constructor() {
        if (EventManager.instance) {
            throw new Error("Erreur : Utilisez EventManager.getInstance() au lieu du new keyword.");
        }
    }

    public static getInstance(): EventManager {
        return EventManager.instance;
    }

    public static subscribe(eventType: string, listener: Function) {
        const instance = EventManager.getInstance();
        if (!instance.listeners[eventType]) {
            instance.listeners[eventType] = [];
        }
        instance.listeners[eventType].push(listener);
    }

    public static trigger(eventType: string, ...args: any[]) {
        const instance = EventManager.getInstance();
        instance.listeners[eventType]?.forEach(listener => listener(...args));
    }
}