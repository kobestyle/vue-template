'use strict';
var fs = require('fs');
var app = require('koa')();
var path = require('path');
var router = require('koa-router')();
var json = require('koa-json');


app.use(function*(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms')
});

app.use(function*(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms)
});

app.use(json());

router.post('/mock/*', function *() {
    console.log(this.request.url);
    var data = require(path.join(process.cwd(), this.request.url) + '.js')
    this.body = data();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, function(err) {
    if (err) {
        console.log(err);
        return
    }
    var uri = 'http://localhost:3000';
    console.log('Listening at ' + uri + '\n');
});

app.on('error', (err) => {
    console.log(err.stack)
});

