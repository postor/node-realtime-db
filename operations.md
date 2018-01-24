# operations

`Db.set` in `node-realtime-db-client` take 3 params, `path`,`value` and `options`, `options.operation` by default is `set`,

if `options` is a string, it will be used as `options.operation`

## set

replace server value with new one

`db.set('path.to.value',newValue)`

## incr

increase server value with value passed in, do nothing if server value is not number or undefined

`db.set('path.to.value', 1, Db.operations.incr)`

## decr

decrease server value with value passed in, do nothing if server value is not number or undefined

`db.set('path.to.value', 10, Db.operations.decr)`

## push

push one element into server array end, do nothing if server value is not array or undefined

`db.set('path.to.array', 10, Db.operations.push)`

## unshift

unshift one element into server array begin, do nothing if server value is not array or undefined

`db.set('path.to.array', 10, Db.operations.unshift)`

## splice

excute splice on server value, the value passed in should be an array and will be passed to splice, do nothing if server value is not array or undefined

`db.get('path.to.array')` is `[1,2,3,4,5]`

`db.set('path.to.array', [2,1,[6,7]], Db.operations.splice)` result to `[1,2,3,4,5].splice(2,1,[6,7])` is `[1,2,6,7,4,5]`

