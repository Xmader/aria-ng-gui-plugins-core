
import AsyncEventEmitter from "@xmader/async-event-emitter"

import { Task } from "./aria2"
import FS from "./fs"

import os from "os-browserify"
import path from "path-browserify"

export interface Plugin {
    activate: (context: PluginsCore) => void | Promise<void>,
    deactivate?: (context: PluginsCore) => void | Promise<void>,
}

type OptionsObj = { [key: string]: string }

export type AriaNgGUIEvents = {
    /** 请求触发桌面提醒事件 */
    "notify": (title: string, message: string) => void,

    /** 单击右键事件 */
    "contextmenu": (event: MouseEvent) => void,

    /**
     * 更新下载进度事件
     * @param percent 如果没有正在下载中的认为，则为 -1
     */
    "progress": (/** @param percent 如果没有正在下载中的认为，则为 -1 */ percent: number | -1, value?: number, total?: number) => void,

    /**
     * 更新正在下载中的任务和进度事件 
     */
    "downloading": (tasks: Task[]) => void,

    "ariang-config-changed": (changedOptions: OptionsObj) => void,
    "aria2-config-changed": (changedOptions: OptionsObj) => void,

    /** AriaNg MainController loaded */
    "ready": () => void,
}

export interface ExtraMethods {
    /**
     * 文件或目录是否存在  
     * @returns {boolean} 文件或目录存在
     */
    fileExists?: (path: string) => boolean | Promise<boolean>;
    fileExistsSync?: (path: string) => boolean;

    /** 在文件管理器中显示文件 */
    showFile?: (path: string) => void;

    /** 在文件管理器中打开指定文件夹 */
    openDir?: (dir: string) => void;

    /** 更改 aria2 设置 */
    changeAria2Config?: (changedOptions: OptionsObj) => void;

    /** 更改 AriaNg 设置 */
    changeAriaNgConfig?: (changedOptions: OptionsObj) => void;

    [x: string]: Function;
}

export class PluginsCore extends AsyncEventEmitter<AriaNgGUIEvents> {

    readonly fs = FS

    readonly path: typeof import("path").posix = path

    readonly os: typeof import("os") = os

    readonly extra: ExtraMethods = {}

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
