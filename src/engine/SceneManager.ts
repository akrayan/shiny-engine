import GameObject from "./GameObject";
import { ISerializedScene } from "./IScene";
import RessourcesLoader from "./RessourcesLoader";
import { ComponentFactory } from "./components/ComponentFactory";

    //TODO create a sceneLoader class
export async function loadScene(scenePath: string) {
    //load the json
    const serializedScene = await RessourcesLoader.getInstance().loadAsset(scenePath) as ISerializedScene
    console.info("file scene loaded", serializedScene)
    //load the dependencies
    RessourcesLoader.getInstance().loadTextures(serializedScene.dependencies.images, () => { })
    await RessourcesLoader.getInstance().loadAssets(serializedScene.dependencies.json)// TODO should await or handle the callback

    //
    const gameObjects = []
    for (const go of serializedScene.gameObjects) {
        const gameObject = new GameObject(go.name)
        gameObject.transform = go.transform
        for (const cmp of go.components)
            gameObject.addComponent(ComponentFactory.getInstance().createComponent(cmp.type, cmp.params))
        gameObjects.push(gameObject)
    }
    return gameObjects
}