// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Vdom = require("./vdom.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");

function batch(subs) {
  return /* Batch */Block.__(0, [subs]);
}

function registration(key, enableCall) {
  return /* Registration */Block.__(1, [
            key,
            (function (callbacks) {
                return Curry._1(enableCall, callbacks.contents);
              }),
            {
              contents: undefined
            }
          ]);
}

function map(msgMapper, sub) {
  var func = function (callbacks) {
    return Vdom.wrapCallbacks(msgMapper, callbacks);
  };
  return /* Mapper */Block.__(2, [
            func,
            sub
          ]);
}

function mapFunc(func, sub) {
  return /* Mapper */Block.__(2, [
            func,
            sub
          ]);
}

function run(oldCallbacks, newCallbacks, oldSub, newSub) {
  var enable = function (_callbacks, _param) {
    while(true) {
      var param = _param;
      var callbacks = _callbacks;
      if (typeof param === "number") {
        return /* () */0;
      } else {
        switch (param.tag | 0) {
          case /* Batch */0 :
              var subs = param[0];
              if (subs) {
                return List.iter((function(callbacks){
                          return function (param) {
                            return enable(callbacks, param);
                          }
                          }(callbacks)), subs);
              } else {
                return /* () */0;
              }
          case /* Registration */1 :
              param[2].contents = Curry._1(param[1], callbacks);
              return /* () */0;
          case /* Mapper */2 :
              var subCallbacks = Curry._1(param[0], callbacks);
              _param = param[1];
              _callbacks = subCallbacks;
              continue ;
          
        }
      }
    };
  };
  var disable = function (_callbacks, _param) {
    while(true) {
      var param = _param;
      var callbacks = _callbacks;
      if (typeof param === "number") {
        return /* () */0;
      } else {
        switch (param.tag | 0) {
          case /* Batch */0 :
              var subs = param[0];
              if (subs) {
                return List.iter((function(callbacks){
                          return function (param) {
                            return disable(callbacks, param);
                          }
                          }(callbacks)), subs);
              } else {
                return /* () */0;
              }
          case /* Registration */1 :
              var diCB = param[2];
              var match = diCB.contents;
              if (match !== undefined) {
                diCB.contents = undefined;
                return Curry._1(match, /* () */0);
              } else {
                return /* () */0;
              }
          case /* Mapper */2 :
              var subCallbacks = Curry._1(param[0], callbacks);
              _param = param[1];
              _callbacks = subCallbacks;
              continue ;
          
        }
      }
    };
  };
  if (typeof oldSub === "number") {
    if (typeof newSub === "number") {
      return newSub;
    }
    
  } else {
    switch (oldSub.tag | 0) {
      case /* Batch */0 :
          if (typeof newSub !== "number" && !newSub.tag) {
            var aux = function (_oldList, _newList) {
              while(true) {
                var newList = _newList;
                var oldList = _oldList;
                if (oldList) {
                  var oldRest = oldList[1];
                  var oldSubSub = oldList[0];
                  if (newList) {
                    run(oldCallbacks, newCallbacks, oldSubSub, newList[0]);
                    _newList = newList[1];
                    _oldList = oldRest;
                    continue ;
                  } else {
                    disable(oldCallbacks, oldSubSub);
                    _newList = /* [] */0;
                    _oldList = oldRest;
                    continue ;
                  }
                } else if (newList) {
                  enable(newCallbacks, newList[0]);
                  _newList = newList[1];
                  _oldList = /* [] */0;
                  continue ;
                } else {
                  return /* () */0;
                }
              };
            };
            aux(oldSub[0], newSub[0]);
            return newSub;
          }
          break;
      case /* Registration */1 :
          if (typeof newSub !== "number" && newSub.tag === /* Registration */1 && oldSub[0] === newSub[0]) {
            newSub[2].contents = oldSub[2].contents;
            return newSub;
          }
          break;
      case /* Mapper */2 :
          if (typeof newSub !== "number" && newSub.tag === /* Mapper */2) {
            var olderCallbacks = Curry._1(oldSub[0], oldCallbacks);
            var newerCallbacks = Curry._1(newSub[0], newCallbacks);
            run(olderCallbacks, newerCallbacks, oldSub[1], newSub[1]);
            return newSub;
          }
          break;
      
    }
  }
  disable(oldCallbacks, oldSub);
  enable(newCallbacks, newSub);
  return newSub;
}

var none = /* NoSub */0;

exports.none = none;
exports.batch = batch;
exports.registration = registration;
exports.map = map;
exports.mapFunc = mapFunc;
exports.run = run;
/* No side effect */