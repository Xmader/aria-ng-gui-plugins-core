import { PathLike } from "fs"

type fs = typeof import("fs").promises

export interface FsApiType extends fs {
    exists(path: PathLike): Promise<boolean>;

}

const FS: FsApiType = (() => {
    try {
        const fsPromises: FsApiType = require("fs").promises

        const { exists } = require("fs")
        fsPromises.exists = require("util").promisify(exists)

        return fsPromises
    } catch (_) {
        throw new Error("unimplemented")
    }
})()

export default FS
