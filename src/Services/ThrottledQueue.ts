import { setTimeout } from "node:timers/promises"

type QueueItem = [Resolve: (value: any) => void, TaskFunction: (...Args: any[]) => any, Args: any[]]

export class ThrottledQueue {
    public Cooldown: number
    private QueueIndex: number = 0
    private IsProcessing: boolean = false
    private PendingTasks: (QueueItem | null)[] = []

    constructor(Cooldown: number) {
        this.Cooldown = Cooldown * 1000
    }

    private async ExecuteTask(Task: QueueItem) {
        const [Resolve, TaskFunction, Args] = Task
        try {
            Resolve(await TaskFunction(...Args))
        } catch {
            Resolve(undefined)
        }
    }

    private async RunScheduler() {
        let Index = 0

        while (true) {
            await setTimeout(this.Cooldown)

            const NextTask = this.PendingTasks[Index]
            if (!NextTask) break

            this.ExecuteTask(NextTask)
            this.PendingTasks[Index] = null
            Index++
        }

        if (Index > 0) this.PendingTasks = []

        this.QueueIndex = 0
        this.IsProcessing = false
    }

    public async Enqueue<T>(TaskFunction: (...Args: any[]) => T | Promise<T>, ...Args: any[]): Promise<T> {
        if (this.IsProcessing) {
            const { promise, resolve } = Promise.withResolvers<T>()

            this.PendingTasks[this.QueueIndex] = [resolve, TaskFunction, Args]
            this.QueueIndex++

            return await promise
        }

        this.IsProcessing = true
        this.RunScheduler()

        return await TaskFunction(...Args)
    }
}
