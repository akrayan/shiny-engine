import IComponent from "./IComponent";

export default interface IScript extends IComponent {

    start(): void;
    update(): void;
}