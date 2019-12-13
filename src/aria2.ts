
export interface Task {
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
