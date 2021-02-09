export class Task {
    constructor() {
        this.id = 0
        this.infinite = false
        this.for_name = ''
        this.for_id = ''
        this.not_before = new Date()
        this.task = ''
        this.payload = {}
    }

    for(id, name) {
        this.for_id = id
        this.for_name = name
        return this
    }

    notBefore(date) {
        this.not_before = date
    }

    asInfinite() {
        this.infinite = true
        return this
    }

    asAddObject(path) {
        this.task = 'AddObject'
        this.payload = {
            path: path
        }
    }

    asDeleteObjectTask(path) {
        this.task = 'DeleteObject'
        this.payload = {
            path: path
        }
    }

    asScriptTask(script) {
        this.task = 'RunScript'
        this.payload = {
            script: script
        }
    }

    asFirmwareUpdateTask(filetype, filename) {
        this.task = 'UploadFirmware'
        this.payload = {
            filetype: filetype,
            filename: filename,
        }
    }

    asReboot() {
        this.task = 'Reboot'
        this.payload = {}
    }
}

export function taskFromObject(obj) {
    let task = new Task()
    task = Object.assign(task, obj)
    return task
}