import os from 'os';
import cluster from 'cluster';

interface IcpuProcess {
	cpus: number;
}

class runProcess implements IcpuProcess {
	cpus: number
	constructor() {
		this.cpus = os.cpus().length() * 2 
	}

	runPrimaryProcess() {
		console.log("primary " + this.cpus + "is running")

		for(let index = 0; index < this.cpus; index++) {
			cluster.fork()
		}
	}

	 async runWorkerProcess() {
		await import "./server.ts"
	}
}

const process = new runProcess()

cluster.isPrimary() ? process.runPrimaryProcess() : process.runWorkerProcess()
