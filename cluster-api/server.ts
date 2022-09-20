import http from 'http';
const processID = process.pid

const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
			for(let index = 0; index < 1e7; index++) {
				res.end("pid: " + processID)
			}	
})


server.listen(3000).once('listening', () => {
	console.log("Process running in: " + processID)
})

process.on('SIGINT', () => {
	console.log("ending...", new Date().toISOString())
	server.close()
})
