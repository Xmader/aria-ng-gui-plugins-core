
import AsyncEventEmitter from "@xmader/async-event-emitter"

interface Task {
    gid: number,

    status: "waiting" | "paused" | "complete" | "error" | "removed",

    totalLength: number,

    completedLength: number,
    completePercent?: number, /** if totalLength > 0  */

    remainLength: number,
    remainPercent: number,

    /** if P2P downloading */
    uploadLength?: number,
    shareRatio?: number,
    uploadSpeed?: number,

    downloadSpeed: number,

    connections,

    numPieces: number,
    completedPieces,
    pieceLength: number,

    /** downloadSpeed == 0 */
    idle: boolean,

    remainTime: number,

    numSeeders?: number,
    seeder: boolean,

    verifiedLength?: number,
    verifiedPercent?: number,

    hasTaskName: boolean,
    /** if hasTaskName == true */
    taskName?: string,

    errorCode?: number,
    errorDescription?: string,

    files,
}

export type AriaNgGUIEvents = {
    /** 请求触发桌面提醒事件 */
    "notify": (title: string, message: string) => void,

    /** 单击右键事件 */
    "contextmenu": (event: MouseEvent) => void,

    /** 请求在文件管理器中打开指定文件夹事件 */
    "request-open-download-dir": (dir: string) => void,

    /** 请求在文件管理器中显示文件事件 */
    "request-show-file": (path: string) => void,

    /**
     * 请求检测文件或目录是否存在事件  
     * should return {boolean} 文件或目录存在
     */
    "request-if-file-exists": (path: string) => boolean,

    /**
     * 更新下载进度事件
     * @param percent 如果没有正在下载中的认为，则为 -1
     */
    "progress": (/** @param percent 如果没有正在下载中的认为，则为 -1 */ percent: number | -1, value?: number, total?: number) => void,

    /**
     * 更新正在下载中的任务和进度事件 
     */
    "downloading": (tasks: Task[]) => void,

    "ariang-config-changed": (changedOptions: { [key: string]: string }) => void,
    "aria2-config-changed": (changedOptions: { [key: string]: string }) => void,
}

export class AriaNgGUIPluginsCore extends AsyncEventEmitter<AriaNgGUIEvents> {

    

}

export const AriaNgGUIEventTarget = new AriaNgGUIPluginsCore()

window["AriaNgGUI"] = AriaNgGUIEventTarget

export default AriaNgGUIEventTarget
