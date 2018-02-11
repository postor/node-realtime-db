# operations | set操作说明

`Db.set` in `node-realtime-db-client` take 3 params, `path`,`value` and `options`, `options.operation` by default is `set`, if `options` is a string, it will be used as `options.operation`

`node-realtime-db-client` 中的 `Db.set` 需要3个参数, `path`,`value` 和 `options`, `options.operation` 默认为 `set`, 如果 `options` 是字符串则视作 `options.operation`


## set | 强制更新

replace server value with new one | 替换服务端的值

`db.set('path.to.value',newValue)`

## incr | 增长

increase server value with value passed in, do nothing if server value is not number or undefined 

以传入值增长服务端对应的值，如果不是number或undefined则不做任何操作

`db.set('path.to.value', 1, Db.operations.incr)`

## decr | 减少

decrease server value with value passed in, do nothing if server value is not number or undefined

以传入值减少服务端对应的值，如果不是number或undefined则不做任何操作

`db.set('path.to.value', 10, Db.operations.decr)`

## push 

push one element into server array end, do nothing if server value is not array or undefined

将传入值插入到数组尾部，如果不是array或undefined则不做任何操作

`db.set('path.to.array', 10, Db.operations.push)`

## unshift

unshift one element into server array begin, do nothing if server value is not array or undefined

将传入值插入到数组头部，如果不是array或undefined则不做任何操作

`db.set('path.to.array', 10, Db.operations.unshift)`

## splice

excute splice on server value, the value passed in should be an array and will be passed to splice, do nothing if server value is not array or undefined

在服务端值上执行splice操作，传入的数组中元素依次作为splice的参数，如果不是array或undefined则不做任何操作

`db.get('path.to.array')` is `[1,2,3,4,5]`

`db.set('path.to.array', [2,1,[6,7]], Db.operations.splice)` result to `[1,2,3,4,5].splice(2,1,[6,7])` is `[1,2,6,7,4,5]`

