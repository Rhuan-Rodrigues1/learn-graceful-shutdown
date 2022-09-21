import os from 'os';
import cluster from 'cluster';

class runProcess {
	cpus: number
	constructor() {
		this.cpus = os.cpus().toString().length * 2 
	}

	runPrimaryProcess() {
		console.log("primary " + this.cpus + " is running")

		for(let index = 0; index < this.cpus; index++) {
			cluster.fork()

			cluster.on('exit', (worker, code, signal) => {
				if(code !== 0 && !worker.exitedAfterDisconnect) {
					console.log("Worker " + worker.process.pid + " died....")
					cluster.fork()
				}
			})
		}
	}

	 async runWorkerProcess() {
		return await import("./server")
	}
}

const process = new runProcess()

cluster.isPrimary ? process.runPrimaryProcess() : process.runWorkerProcess()
