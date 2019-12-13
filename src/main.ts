
import AsyncEventEmitter from "@xmader/async-event-emitter"

import { Task } from "./aria2"
import FS from "./fs"

import os from "os-browserify"
import path from "path-browserify"

export interface Plugin {
    activate: (context: PluginsCore) => void | Promise<void>,
    deactivate?: (context: PluginsCore) => void | Promise<void>,
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
    "request-if-file-exists": (path: string) => boolean | Promise<boolean>,

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

export class PluginsCore extends AsyncEventEmitter<AriaNgGUIEvents> {

    readonly fs = FS

    readonly path: typeof import("path").posix = path

    readonly os: typeof import("os") = os

    constructor() {
        super()
    }

    registerPlugin(plugin: Plugin) {

        window.addEventListener("beforeunload", () => {
            if (plugin.deactivate && typeof plugin.deactivate == "function") {
                plugin.deactivate(this)
            }
        })

        plugin.activate(this)

    }

}

export const PluginsHelper = new PluginsCore()

export default PluginsHelper
