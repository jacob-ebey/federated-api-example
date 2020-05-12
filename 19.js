exports.id = 19;
exports.ids = [19];
exports.modules = {

/***/ 19:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const express = __webpack_require__(127);

const app = express();

app.get("/", (_, res) => res.send(JSON.stringify("pong")));

module.exports = app;


/***/ })

};
;