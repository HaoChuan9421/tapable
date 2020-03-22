const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
} = require("./lib/index");

class Compiler {
	constructor() {
		this.hooks = {
			sync: new SyncHook(["arg1", "arg2"]),
			syncBail: new SyncBailHook(["arg1", "arg2"]),
			syncWaterfall: new SyncWaterfallHook(["arg1"]),

			syncLoop: new SyncLoopHook(["arg1", "arg2"]),

			asyncParallel: new AsyncParallelHook(["arg1", "arg2"]),
			asyncParallelBail: new AsyncParallelBailHook(["arg1", "arg2"]),

			asyncSeries: new AsyncSeriesHook(["arg1", "arg2"]),
			asyncSeriesBail: new AsyncSeriesBailHook(["arg1", "arg2"]),
			asyncSeriesWaterfall: new AsyncSeriesWaterfallHook(["arg1"])
		};
	}
}

const compiler = new Compiler();

// // 1. 同步顺序执行
// compiler.hooks.sync.tap("MyPlugin", (arg1, arg2) => {
// 	console.log("sync1:", arg1, arg2);
// });

// compiler.hooks.sync.tap("MyPlugin", (arg1, arg2) => {
// 	console.log("sync2:", arg1, arg2);
// });

// compiler.hooks.sync.tap("MyPlugin", (arg1, arg2) => {
// 	console.log("sync3:", arg1, arg2);
// });

// console.log(compiler.hooks.sync.call(1, 2));

// 2. 同步顺序执行，其中任意一个 return 非 undefined, 即停止
// compiler.hooks.syncBail.tap("MyPlugin", (arg1, arg2) => {
// 	console.log("syncBail1:", arg1, arg2);
// });

// compiler.hooks.syncBail.tap("MyPlugin", (arg1, arg2) => {
// 	console.log("syncBail2:", arg1, arg2);
// 	return "something";
// });

// compiler.hooks.syncBail.tap("MyPlugin", (arg1, arg2) => {
// 	console.log("syncBail3:", arg1, arg2);
// });

// console.log(compiler.hooks.syncBail.call(1, 2));

// 3. 同步顺序执行，上一步的返回值作为下一步的参数
// compiler.hooks.syncWaterfall.tap("MyPlugin", arg1 => {
// 	console.log("syncWaterfall1:", arg1);
// 	return arg1 + 1;
// });

// compiler.hooks.syncWaterfall.tap("MyPlugin", arg1 => {
// 	console.log("syncWaterfall2:", arg1);
// 	return arg1 + 2;
// });

// compiler.hooks.syncWaterfall.tap("MyPlugin", arg1 => {
// 	console.log("syncWaterfall3:", arg1);
// 	return arg1 + 3;
// });

// console.log(compiler.hooks.syncWaterfall.call(1, 2));

// 4. 同步执行，只有前一个返回 undefined 才执行下一个，一旦出现返回值非 undefined，就从头来过，直到所以都返回 undefined 为止
// compiler.hooks.syncLoop.tap("MyPlugin", (arg1, args2) => {
// 	const flag = Math.random() < 0.5;
// 	console.log("syncLoop1:", arg1, args2, flag);
// 	if (flag) {
// 		return "something";
// 	}
// });

// compiler.hooks.syncLoop.tap("MyPlugin", (arg1, args2) => {
// 	const flag = Math.random() < 0.5;
// 	console.log("syncLoop2:", arg1, args2, flag);
// 	if (flag) {
// 		return "something";
// 	}
// });

// compiler.hooks.syncLoop.tap("MyPlugin", (arg1, args2) => {
// 	const flag = Math.random() < 0.5;
// 	console.log("syncLoop3:", arg1, args2, flag);
// 	if (flag) {
// 		return "something";
// 	}
// });

// console.log(compiler.hooks.syncLoop.call(1, 2));

// // 5. 异步并行，可以通过 tap、tapAsync、tapPromise 添加，可以通过 callAsync、promise 调用，每次调用，所以注册的事件都会同时开始执行，最慢的一个执行完，回调被触发或 Promise 结束，类似 Promise.all
// compiler.hooks.asyncParallel.tap("MyPlugin", (arg1, arg2) => {
// 	console.log("asyncParallel1:", arg1, arg2);
// });

// compiler.hooks.asyncParallel.tapAsync("MyPlugin", (arg1, arg2, callback) => {
// 	console.log("asyncParallel2:", arg1, arg2);
// 	setTimeout(() => {
// 		callback(null, "something"); // 没有意义，不会作为结果
// 		// callback(new Error('some error'));
// 	}, 300);
// });

// compiler.hooks.asyncParallel.tapPromise("MyPlugin", (arg1, arg2) => {
// 	console.log("asyncParallel3:", arg1, arg2);
// 	return new Promise((resolve, reject) =>
// 		setTimeout(() => {
// 			resolve("something"); // 没有意义，不会作为结果
// 			// reject(new Error('some error'));
// 		}, 3000)
// 	);
// });

// compiler.hooks.asyncParallel.callAsync(1, 2, (err, res) => {
// 	if (err) {
// 		console.log("asyncParallel callback err", err);
// 		return;
// 	}
// 	console.log("asyncParallel callback res", res);
// });

// compiler.hooks.asyncParallel
// 	.promise(3, 4)
// 	.then(res => {
// 		console.log("asyncParallel promise res", res);
// 	})
// 	.catch(err => {
// 		console.log("asyncParallel promise err", err);
// 	});

// 6. 异步并行，可以通过 tap、tapAsync、tapPromise 添加，可以通过 callAsync、promise 调用，每次调用，所以注册的事件都会同时开始执行，最慢的一个执行完，进程结束，第一个注册的事件的结果，会作为返回值（这个有点奇怪）
// compiler.hooks.asyncParallelBail.tap("MyPlugin", (arg1, arg2) => {
// 	console.log("asyncParallelBail1:", arg1, arg2);
// });

// compiler.hooks.asyncParallelBail.tapAsync(
// 	"MyPlugin",
// 	(arg1, arg2, callback) => {
// 		console.log("asyncParallelBail2:", arg1, arg2);
// 		setTimeout(() => {
// 			callback(null, "something");
// 			// callback(new Error("some error"));
// 		}, 300);
// 	}
// );

// compiler.hooks.asyncParallelBail.tapPromise("MyPlugin", (arg1, arg2) => {
// 	console.log("asyncParallelBail3:", arg1, arg2);
// 	return new Promise((resolve, reject) =>
// 		setTimeout(() => {
// 			resolve("something else"); // 会作为结果
// 			// reject(new Error('some else error'));
// 		}, 3000)
// 	);
// });

// compiler.hooks.asyncParallelBail.callAsync(1, 2, (err, res) => {
// 	if (err) {
// 		console.log("asyncParallelBail callback err", err);
// 		return;
// 	}
// 	console.log("asyncParallelBail callback res", res);
// });

// compiler.hooks.asyncParallelBail
// 	.promise(3, 4)
// 	.then(res => {
// 		console.log("asyncParallelBail promise res", res);
// 	})
// 	.catch(err => {
// 		console.log("asyncParallelBail promise err", err);
// 	});

// 7. 异步串行，可以通过 tap、tapAsync、tapPromise 添加，可以通过 callAsync、promise 调用，每次调用，所以注册的事件都会按照顺序开始执行，一个个都按顺序执行完，回调才被触发或 Promise 结束
// compiler.hooks.asyncSeries.tap("MyPlugin", (arg1, arg2) => {
// 	console.log("asyncSeries1:", arg1, arg2);
// });

// compiler.hooks.asyncSeries.tapAsync("MyPlugin", (arg1, arg2, callback) => {
// 	console.log("asyncSeries2:", arg1, arg2);
// 	setTimeout(() => {
// 		callback();
// 	}, 3000);
// });

// compiler.hooks.asyncSeries.tapPromise("MyPlugin", (arg1, arg2) => {
// 	console.log("asyncSeries3:", arg1, arg2);
// 	return new Promise(resolve =>
// 		setTimeout(() => {
// 			resolve();
// 		}, 3000)
// 	);
// });

// compiler.hooks.asyncSeries.callAsync(1, 2, (err, res) => {
// 	if (err) {
// 		console.log("asyncSeries callback err", err);
// 		return;
// 	}
// 	console.log("asyncSeries callback res", res);
// });

// compiler.hooks.asyncSeries
// 	.promise(3, 4)
// 	.then(res => {
// 		console.log("asyncSeries promise res", res);
// 	})
// 	.catch(err => {
// 		console.log("asyncSeries promise err", err);
// 	});

// 8. 异步串行，可以通过 tap、tapAsync、tapPromise 添加，可以通过 callAsync、promise 调用，每次调用，所以注册的事件都会按照顺序开始执行，一旦其中一个有返回值，则整个流程结束，且返回值会被作为结果传递给 callback 或者 promise（时间短的要在前面，也有点奇怪）
// compiler.hooks.asyncSeriesBail.tap("MyPlugin", (arg1, arg2) => {
// 	console.log("asyncSeriesBail1:", arg1, arg2);
// });

// compiler.hooks.asyncSeriesBail.tapAsync("MyPlugin", (arg1, arg2, callback) => {
// 	console.log("asyncSeriesBail2:", arg1, arg2);
// 	setTimeout(() => {
// 		callback(null, "something");
// 	}, 2000);
// });

// compiler.hooks.asyncSeriesBail.tapPromise("MyPlugin", (arg1, arg2) => {
// 	console.log("asyncSeriesBail3:", arg1, arg2);
// 	return new Promise(resolve =>
// 		setTimeout(() => {
// 			resolve();
// 		}, 3000)
// 	);
// });

// compiler.hooks.asyncSeriesBail.callAsync(1, 2, (err, res) => {
// 	if (err) {
// 		console.log("asyncSeriesBail callback err", err);
// 		return;
// 	}
// 	console.log("asyncSeriesBail callback res", res);
// });

// compiler.hooks.asyncSeriesBail
// 	.promise(3, 4)
// 	.then(res => {
// 		console.log("asyncSeriesBail promise res", res);
// 	})
// 	.catch(err => {
// 		console.log("asyncSeriesBail promise err", err);
// 	});

// 9. 异步串行，可以通过 tap、tapAsync、tapPromise 添加，可以通过 callAsync、promise 调用，每次调用，所以注册的事件都会按照顺序开始执行，上一步的返回值会作为下一步的参数，直到整个流程结束，最后的一个返回值会被作为结果传递给 callback 或者 promise
// compiler.hooks.asyncSeriesWaterfall.tap("MyPlugin", arg1 => {
// 	console.log("asyncSeriesWaterfall1:", arg1);
// 	return "something 1th";
// });

// compiler.hooks.asyncSeriesWaterfall.tapAsync("MyPlugin", (arg1, callback) => {
// 	console.log("asyncSeriesWaterfall2:", arg1);
// 	setTimeout(() => {
// 		callback(null, "something 2th");
// 	}, 3000);
// });

// compiler.hooks.asyncSeriesWaterfall.tapPromise("MyPlugin", arg1 => {
// 	console.log("asyncSeriesWaterfall3:", arg1);
// 	return new Promise(resolve =>
// 		setTimeout(() => {
// 			resolve();
// 		}, 3000)
// 	);
// });

// compiler.hooks.asyncSeriesWaterfall.callAsync(1, (err, res) => {
// 	if (err) {
// 		console.log("asyncSeriesWaterfall callback err", err);
// 		return;
// 	}
// 	console.log("asyncSeriesWaterfall callback res", res);
// });

// compiler.hooks.asyncSeriesWaterfall
// 	.promise(2)
// 	.then(res => {
// 		console.log("asyncSeriesWaterfall promise res", res);
// 	})
// 	.catch(err => {
// 		console.log("asyncSeriesWaterfall promise err", err);
// 	});

// 总结：
// 1. sync 类型的钩子只能通过 tap 注册事件，只能通过 call 触发
// 2. async 类型的钩子可以通过 tap、tapAsync、tapPromise 添加，可以通过 callAsync、promise 调用，callAsync 的最后一个参数会作为 callback 传递给 tapAsync 回调函数的最后一个参数，tapPromise 需要返回 Promise，而 promise 调用时需要通过 then、catch 来接受结果
// 3. bail 类型的钩子，只要其中一个事件结束，整个流程即结束，返回值会作为结果输出（异步的两个bail有点奇怪，和事件注册顺序也有关系）
// 4. waterfall 类型的钩子，所有事件顺序执行，当所有事件结束时，整个流程才结束，且返回值会作为下一个事件的参数，最后一个返回值会作为结果输出
// 5. 异步钩子有 Series 和 Parallel 两种，前者是串行，后者是并行，Series 和 同步钩子类似，既可以和 bail 组合也可以和 waterfall 组合，而 Parallel 只支持和 bail 组合
// 6. 同步类型中一个奇葩的 loop 型，这个钩子要求所有的事件的返回值都为空，否则就会从头再来

compiler.hooks.syncLoop.tap("MyPlugin", (arg1, args2) => {
	const flag = Math.random() < 0.5;
	console.log("syncLoop1:", arg1, args2, flag);
	if (flag) {
		return "something";
	}
});

compiler.hooks.syncLoop.tap(
	{
		name: "MyPlugin",
		context: true
	},
	(arg1, args2) => {
		const flag = Math.random() < 0.5;
		console.log("syncLoop2:", arg1, args2, flag);
		if (flag) {
			return "something";
		}
	}
);

compiler.hooks.syncLoop.intercept({
	context: true,
	call: (arg1, arg2) => {
		console.log("intercept call", arg1, arg2);
	},
	tap: (context, tap) => {
		console.log("intercept tap", context, tap);
		if(context){
      context.boy = "郑昊川"
    }
	},
	register: tapInfo => {
		console.log("intercept register", tapInfo);
		return tapInfo;
	},
	loop: (...args) => {
		console.log("intercept loop", args);
	}
});

console.log(compiler.hooks.syncLoop.call(1, 2));
