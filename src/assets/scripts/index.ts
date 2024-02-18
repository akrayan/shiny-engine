import AScript from "../../engine/components/AScript";
import { ScriptMap } from "../../engine/GameEngine"
import BGScript from "./BGScript";
import Player from "./Player"

const scriptMap: ScriptMap  = {
    "Player": Player,
    "BGScript": BGScript
}

export default scriptMap;