function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i3 = 0; i3 < list.length; i3++) {
    map[list[i3]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
const isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i3 = 0; i3 < value.length; i3++) {
      const item = value[i3];
      const normalized = normalizeStyle(isString(item) ? parseStringStyle(item) : item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i3 = 0; i3 < value.length; i3++) {
      const normalized = normalizeClass(value[i3]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function looseCompareArrays(a4, b3) {
  if (a4.length !== b3.length)
    return false;
  let equal = true;
  for (let i3 = 0; equal && i3 < a4.length; i3++) {
    equal = looseEqual(a4[i3], b3[i3]);
  }
  return equal;
}
function looseEqual(a4, b3) {
  if (a4 === b3)
    return true;
  let aValidType = isDate$2(a4);
  let bValidType = isDate$2(b3);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a4.getTime() === b3.getTime() : false;
  }
  aValidType = isArray(a4);
  bValidType = isArray(b3);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a4, b3) : false;
  }
  aValidType = isObject$1(a4);
  bValidType = isObject$1(b3);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a4).length;
    const bKeysCount = Object.keys(b3).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a4) {
      const aHasKey = a4.hasOwnProperty(key);
      const bHasKey = b3.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a4[key], b3[key])) {
        return false;
      }
    }
  }
  return String(a4) === String(b3);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const toDisplayString = (val) => {
  return val == null ? "" : isObject$1(val) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i3 = arr.indexOf(el);
  if (i3 > -1) {
    arr.splice(i3, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate$2 = (val) => val instanceof Date;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  ",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn2) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn2(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i3 = 0; i3 < fns.length; i3++) {
    fns[i3](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const effectStack = [];
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
function isEffect(fn2) {
  return fn2 && fn2._isEffect === true;
}
function effect(fn2, options = EMPTY_OBJ) {
  if (isEffect(fn2)) {
    fn2 = fn2.raw;
  }
  const effect2 = createReactiveEffect(fn2, options);
  if (!options.lazy) {
    effect2();
  }
  return effect2;
}
function stop(effect2) {
  if (effect2.active) {
    cleanup(effect2);
    if (effect2.options.onStop) {
      effect2.options.onStop();
    }
    effect2.active = false;
  }
}
let uid$2 = 0;
function createReactiveEffect(fn2, options) {
  const effect2 = function reactiveEffect() {
    if (!effect2.active) {
      return options.scheduler ? void 0 : fn2();
    }
    if (!effectStack.includes(effect2)) {
      cleanup(effect2);
      try {
        enableTracking();
        effectStack.push(effect2);
        activeEffect = effect2;
        return fn2();
      } finally {
        effectStack.pop();
        resetTracking();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };
  effect2.id = uid$2++;
  effect2.allowRecurse = !!options.allowRecurse;
  effect2._isEffect = true;
  effect2.active = true;
  effect2.raw = fn2;
  effect2.deps = [];
  effect2.options = options;
  return effect2;
}
function cleanup(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i3 = 0; i3 < deps.length; i3++) {
      deps[i3].delete(effect2);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (!shouldTrack || activeEffect === void 0) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = /* @__PURE__ */ new Set());
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger$1(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const effects = /* @__PURE__ */ new Set();
  const add2 = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach((effect2) => {
        if (effect2 !== activeEffect || effect2.allowRecurse) {
          effects.add(effect2);
        }
      });
    }
  };
  if (type === "clear") {
    depsMap.forEach(add2);
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        add2(dep);
      }
    });
  } else {
    if (key !== void 0) {
      add2(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          add2(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          add2(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const run = (effect2) => {
    if (effect2.options.scheduler) {
      effect2.options.scheduler(effect2);
    } else {
      effect2();
    }
  };
  effects.forEach(run);
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = {};
["includes", "indexOf", "lastIndexOf"].forEach((key) => {
  const method = Array.prototype[key];
  arrayInstrumentations[key] = function(...args) {
    const arr = toRaw(this);
    for (let i3 = 0, l2 = this.length; i3 < l2; i3++) {
      track(arr, "get", i3 + "");
    }
    const res = method.apply(arr, args);
    if (res === -1 || res === false) {
      return method.apply(arr, args.map(toRaw));
    } else {
      return res;
    }
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
  const method = Array.prototype[key];
  arrayInstrumentations[key] = function(...args) {
    pauseTracking();
    const res = method.apply(this, args);
    resetTracking();
    return res;
  };
});
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? readonlyMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    const oldValue = target[key];
    if (!shallow) {
      value = toRaw(value);
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result2 = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger$1(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger$1(target, "set", key, value);
      }
    }
    return result2;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result2 = Reflect.deleteProperty(target, key);
  if (result2 && hadKey) {
    trigger$1(target, "delete", key, void 0);
  }
  return result2;
}
function has(target, key) {
  const result2 = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result2;
}
function ownKeys$6(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys: ownKeys$6
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get$1(target, key, isReadonly2 = false, isShallow = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap2 = isReadonly2 ? toReadonly : isShallow ? toShallow : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap2(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap2(target.get(rawKey));
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add$1(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto2 = getProto(target);
  const hadKey = proto2.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger$1(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger$1(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger$1(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result2 = target.delete(key);
  if (hadKey) {
    trigger$1(target, "delete", key, void 0);
  }
  return result2;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result2 = target.clear();
  if (hadItems) {
    trigger$1(target, "clear", void 0, void 0);
  }
  return result2;
}
function createForEach(isReadonly2, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap2 = isReadonly2 ? toReadonly : isShallow ? toShallow : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap2(value), wrap2(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap2 = isReadonly2 ? toReadonly : isShallow ? toShallow : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap2(value[0]), wrap2(value[1])] : wrap2(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
const mutableInstrumentations = {
  get(key) {
    return get$1(this, key);
  },
  get size() {
    return size(this);
  },
  has: has$1,
  add: add$1,
  set: set$1,
  delete: deleteEntry,
  clear,
  forEach: createForEach(false, false)
};
const shallowInstrumentations = {
  get(key) {
    return get$1(this, key, false, true);
  },
  get size() {
    return size(this);
  },
  has: has$1,
  add: add$1,
  set: set$1,
  delete: deleteEntry,
  clear,
  forEach: createForEach(false, true)
};
const readonlyInstrumentations = {
  get(key) {
    return get$1(this, key, true);
  },
  get size() {
    return size(this, true);
  },
  has(key) {
    return has$1.call(this, key, true);
  },
  add: createReadonlyMethod("add"),
  set: createReadonlyMethod("set"),
  delete: createReadonlyMethod("delete"),
  clear: createReadonlyMethod("clear"),
  forEach: createForEach(true, false)
};
const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
iteratorMethods.forEach((method) => {
  mutableInstrumentations[method] = createIterableMethod(method, false, false);
  readonlyInstrumentations[method] = createIterableMethod(method, true, false);
  shallowInstrumentations[method] = createIterableMethod(method, false, true);
});
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: createInstrumentationGetter(true, false)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (target && target["__v_isReadonly"]) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers) {
  if (!isObject$1(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const proxyMap = isReadonly2 ? readonlyMap : reactiveMap;
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  return observed && toRaw(observed["__v_raw"]) || observed;
}
const convert = (val) => isObject$1(val) ? reactive(val) : val;
function isRef(r2) {
  return Boolean(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value);
}
class RefImpl {
  constructor(_rawValue, _shallow = false) {
    this._rawValue = _rawValue;
    this._shallow = _shallow;
    this.__v_isRef = true;
    this._value = _shallow ? _rawValue : convert(_rawValue);
  }
  get value() {
    track(toRaw(this), "get", "value");
    return this._value;
  }
  set value(newVal) {
    if (hasChanged(toRaw(newVal), this._rawValue)) {
      this._rawValue = newVal;
      this._value = this._shallow ? newVal : convert(newVal);
      trigger$1(toRaw(this), "set", "value", newVal);
    }
  }
}
function createRef(rawValue, shallow = false) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ObjectRefImpl {
  constructor(_object, _key) {
    this._object = _object;
    this._key = _key;
    this.__v_isRef = true;
  }
  get value() {
    return this._object[this._key];
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key) {
  return isRef(object[key]) ? object[key] : new ObjectRefImpl(object, key);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2) {
    this._setter = _setter;
    this._dirty = true;
    this.__v_isRef = true;
    this.effect = effect(getter, {
      lazy: true,
      scheduler: () => {
        if (!this._dirty) {
          this._dirty = true;
          trigger$1(toRaw(this), "set", "value");
        }
      }
    });
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    if (this._dirty) {
      this._value = this.effect();
      this._dirty = false;
    }
    track(toRaw(this), "get", "value");
    return this._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed$1(getterOrOptions) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return new ComputedRefImpl(getter, setter, isFunction(getterOrOptions) || !getterOrOptions.set);
}
const stack = [];
function warn(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i3) => {
    logs.push(...i3 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function callWithErrorHandling(fn2, instance, type, args) {
  let res;
  try {
    res = args ? fn2(...args) : fn2();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn2, instance, type, args) {
  if (isFunction(fn2)) {
    const res = callWithErrorHandling(fn2, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i3 = 0; i3 < fn2.length; i3++) {
    values.push(callWithAsyncErrorHandling(fn2[i3], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i3 = 0; i3 < errorCapturedHooks.length; i3++) {
          if (errorCapturedHooks[i3](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;
function nextTick(fn2) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn2 ? p2.then(this ? fn2.bind(this) : fn2) : p2;
}
function findInsertionIndex(job) {
  let start2 = flushIndex + 1;
  let end = queue.length;
  const jobId = getId(job);
  while (start2 < end) {
    const middle = start2 + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < jobId ? start2 = middle + 1 : end = middle;
  }
  return start2;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    const pos = findInsertionIndex(job);
    if (pos > -1) {
      queue.splice(pos, 0, job);
    } else {
      queue.push(job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i3 = queue.indexOf(job);
  if (i3 > -1) {
    queue.splice(i3, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index) {
  if (!isArray(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a4, b3) => getId(a4) - getId(b3));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  flushPreFlushCbs(seen);
  queue.sort((a4, b3) => getId(a4) - getId(b3));
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn2) {
  if (!seen.has(fn2)) {
    seen.set(fn2, 1);
  } else {
    const count = seen.get(fn2);
    if (count > RECURSION_LIMIT) {
      throw new Error(`Maximum recursive updates exceeded. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
    } else {
      seen.set(fn2, count + 1);
    }
  }
}
function emit(instance, event, ...rawArgs) {
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a4) => a4.trim());
    } else if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  let handlerName = toHandlerKey(camelize(event));
  let handler = props[handlerName];
  if (!handler && isModelListener2) {
    handlerName = toHandlerKey(hyphenate(event));
    handler = props[handlerName];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      (instance.emitted = {})[handlerName] = true;
    } else if (instance.emitted[handlerName]) {
      return;
    }
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  if (!appContext.deopt && comp.__emits !== void 0) {
    return comp.__emits;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      hasExtends = true;
      extend(normalized, normalizeEmitsOptions(raw2, appContext, true));
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    return comp.__emits = null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  return comp.__emits = normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  currentRenderingInstance = instance;
}
let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx } = instance;
  let result2;
  currentRenderingInstance = instance;
  try {
    let fallthroughAttrs;
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result2 = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result2 = normalizeVNode(render2.length > 1 ? render2(props, false ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit: emit2
      } : { attrs, slots, emit: emit2 }) : render2(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
    let root = result2;
    let setRoot = void 0;
    if (false)
      ;
    if (Component.inheritAttrs !== false && fallthroughAttrs) {
      const keys = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root;
      if (keys.length) {
        if (shapeFlag & 1 || shapeFlag & 6) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
          }
          root = cloneVNode(root, fallthroughAttrs);
        } else if (false)
          ;
      }
    }
    if (vnode.dirs) {
      if (false)
        ;
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      if (false)
        ;
      root.transition = vnode.transition;
    }
    if (false)
      ;
    else {
      result2 = root;
    }
  } catch (err) {
    handleError(err, instance, 1);
    result2 = createVNode(Comment);
  }
  currentRenderingInstance = null;
  return result2;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren);
  if (!childRoot) {
    return [vnode, void 0];
  }
  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children) {
  let singleRoot;
  for (let i3 = 0; i3 < children.length; i3++) {
    const child = children[i3];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & 6 || vnode.shapeFlag & 1 || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i3 = 0; i3 < dynamicProps.length; i3++) {
        const key = dynamicProps[i3];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i3 = 0; i3 < nextKeys.length; i3++) {
    const key = nextKeys[i3];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function normalizeSuspenseChildren(vnode) {
  const { shapeFlag, children } = vnode;
  let content;
  let fallback;
  if (shapeFlag & 32) {
    content = normalizeSuspenseSlot(children.default);
    fallback = normalizeSuspenseSlot(children.fallback);
  } else {
    content = normalizeSuspenseSlot(children);
    fallback = normalizeVNode(null);
  }
  return {
    content,
    fallback
  };
}
function normalizeSuspenseSlot(s3) {
  if (isFunction(s3)) {
    s3 = s3();
  }
  if (isArray(s3)) {
    const singleChild = filterSingleRoot(s3);
    s3 = singleChild;
  }
  return normalizeVNode(s3);
}
function queueEffectWithSuspense(fn2, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn2)) {
      suspense.effects.push(...fn2);
    } else {
      suspense.effects.push(fn2);
    }
  } else {
    queuePostFlushCb(fn2);
  }
}
let isRenderingCompiledSlot = 0;
const setCompiledSlotRendering = (n2) => isRenderingCompiledSlot += n2;
function renderSlot(slots, name, props = {}, fallback) {
  let slot = slots[name];
  isRenderingCompiledSlot++;
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(Fragment, { key: props.key || `_${name}` }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
  isRenderingCompiledSlot--;
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
function withCtx(fn2, ctx = currentRenderingInstance) {
  if (!ctx)
    return fn2;
  const renderFnWithContext = (...args) => {
    if (!isRenderingCompiledSlot) {
      openBlock(true);
    }
    const owner = currentRenderingInstance;
    setCurrentRenderingInstance(ctx);
    const res = fn2(...args);
    setCurrentRenderingInstance(owner);
    if (!isRenderingCompiledSlot) {
      closeBlock();
    }
    return res;
  };
  renderFnWithContext._c = true;
  return renderFnWithContext;
}
let currentScopeId = null;
const scopeIdStack = [];
function pushScopeId(id) {
  scopeIdStack.push(currentScopeId = id);
}
function popScopeId() {
  scopeIdStack.pop();
  currentScopeId = scopeIdStack[scopeIdStack.length - 1] || null;
}
function withScopeId(id) {
  return (fn2) => withCtx(function() {
    pushScopeId(id);
    const res = fn2.apply(this, arguments);
    popScopeId();
    return res;
  });
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  setFullProps(instance, rawProps, props, attrs);
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i3 = 0; i3 < propsToUpdate.length; i3++) {
        const key = propsToUpdate[i3];
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            attrs[key] = value;
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance);
          }
        } else {
          attrs[key] = value;
        }
      }
    }
  } else {
    setFullProps(instance, rawProps, props, attrs);
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawProps || EMPTY_OBJ, key, void 0, instance);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key)) {
          delete attrs[key];
        }
      }
    }
  }
  trigger$1(instance, "set", "$attrs");
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  if (rawProps) {
    for (const key in rawProps) {
      const value = rawProps[key];
      if (isReservedProp(key)) {
        continue;
      }
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        props[camelKey] = value;
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        attrs[key] = value;
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    for (let i3 = 0; i3 < needCastKeys.length; i3++) {
      const key = needCastKeys[i3];
      props[key] = resolvePropValue(options, rawCurrentProps, key, rawCurrentProps[key], instance);
    }
  }
}
function resolvePropValue(options, props, key, value, instance) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        setCurrentInstance(instance);
        value = defaultValue(props);
        setCurrentInstance(null);
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (!hasOwn(props, key) && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  if (!appContext.deopt && comp.__props) {
    return comp.__props;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    return comp.__props = EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i3 = 0; i3 < raw.length; i3++) {
      const normalizedKey = camelize(raw[i3]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  return comp.__props = [normalized, needCastKeys];
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType$1(ctor) {
  const match2 = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match2 ? match2[1] : "";
}
function isSameType(a4, b3) {
  return getType$1(a4) === getType$1(b3);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    for (let i3 = 0, len = expectedTypes.length; i3 < len; i3++) {
      if (isSameType(expectedTypes[i3], type)) {
        return i3;
      }
    }
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      setCurrentInstance(null);
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
const onErrorCaptured = (hook, target = currentInstance) => {
  injectHook("ec", hook, target);
};
function watchEffect(effect2, options) {
  return doWatch(effect2, null, options);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ, instance = currentInstance) {
  let getter;
  let forceTrigger = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = !!source._shallow;
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    getter = () => source.map((s3) => {
      if (isRef(s3)) {
        return s3.value;
      } else if (isReactive(s3)) {
        return traverse(s3);
      } else if (isFunction(s3)) {
        return callWithErrorHandling(s3, instance, 2, [
          instance && instance.proxy
        ]);
      } else
        ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2, [
        instance && instance.proxy
      ]);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup2) {
          cleanup2();
        }
        return callWithErrorHandling(source, instance, 3, [onInvalidate]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup2;
  const onInvalidate = (fn2) => {
    cleanup2 = runner.options.onStop = () => {
      callWithErrorHandling(fn2, instance, 4);
    };
  };
  let oldValue = isArray(source) ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!runner.active) {
      return;
    }
    if (cb) {
      const newValue = runner();
      if (deep || forceTrigger || hasChanged(newValue, oldValue)) {
        if (cleanup2) {
          cleanup2();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onInvalidate
        ]);
        oldValue = newValue;
      }
    } else {
      runner();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const runner = effect(getter, {
    lazy: true,
    onTrack,
    onTrigger,
    scheduler
  });
  recordInstanceBoundEffect(runner, instance);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = runner();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(runner, instance && instance.suspense);
  } else {
    runner();
  }
  return () => {
    stop(runner);
    if (instance) {
      remove(instance.effects, runner);
    }
  };
}
function instanceWatch(source, cb, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? () => publicThis[source] : source.bind(publicThis);
  return doWatch(getter, cb.bind(publicThis), options, this);
}
function traverse(value, seen = /* @__PURE__ */ new Set()) {
  if (!isObject$1(value) || seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i3 = 0; i3 < value.length; i3++) {
      traverse(value[i3], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, seen);
    });
  } else {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => withCtx((props) => {
  return normalizeSlotValue(rawSlot(props));
}, ctx);
const normalizeObjectSlots = (rawSlots, slots) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = children;
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i3 = 0; i3 < directives.length; i3++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i3];
    if (isFunction(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }
    bindings.push({
      dir,
      instance,
      value,
      oldValue: void 0,
      arg,
      modifiers
    });
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i3 = 0; i3 < bindings.length; i3++) {
    const binding = bindings[i3];
    if (oldBindings) {
      binding.oldValue = oldBindings[i3].value;
    }
    const hook = binding.dir[name];
    if (hook) {
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
    }
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      isCustomElement: NO,
      errorHandler: void 0,
      warnHandler: void 0
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null)
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else
          ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
            if (mixin.props || mixin.emits) {
              context.deopt = true;
            }
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
function defineComponent(options) {
  return isFunction(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper = (i3) => !!i3.type.__asyncLoader;
const prodEffectOptions = {
  scheduler: queueJob,
  allowRecurse: true
};
const queuePostRenderEffect = queueEffectWithSuspense;
const setRef = (rawRef, oldRawRef, parentSuspense, vnode) => {
  if (isArray(rawRef)) {
    rawRef.forEach((r2, i3) => setRef(r2, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i3] : oldRawRef), parentSuspense, vnode));
    return;
  }
  let value;
  if (!vnode || isAsyncWrapper(vnode)) {
    value = null;
  } else {
    if (vnode.shapeFlag & 4) {
      value = vnode.component.exposed || vnode.component.proxy;
    } else {
      value = vnode.el;
    }
  }
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isString(ref2)) {
    const doSet = () => {
      refs[ref2] = value;
      if (hasOwn(setupState, ref2)) {
        setupState[ref2] = value;
      }
    };
    if (value) {
      doSet.id = -1;
      queuePostRenderEffect(doSet, parentSuspense);
    } else {
      doSet();
    }
  } else if (isRef(ref2)) {
    const doSet = () => {
      ref2.value = value;
    };
    if (value) {
      doSet.id = -1;
      queuePostRenderEffect(doSet, parentSuspense);
    } else {
      doSet();
    }
  } else if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else
    ;
};
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, forcePatchProp: hostForcePatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, optimized = false) => {
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals);
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, scopeId, patchFlag, dirs } = vnode;
    if (vnode.el && hostCloneNode !== void 0 && patchFlag === -1) {
      el = vnode.el = hostCloneNode(vnode.el);
    } else {
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", optimized || !!vnode.dynamicChildren);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        for (const key in props) {
          if (!isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      setScopeId(el, scopeId, vnode, parentComponent);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, scopeId, vnode, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (parentComponent) {
      const treeOwnerId = parentComponent.type.__scopeId;
      if (treeOwnerId && treeOwnerId !== scopeId) {
        hostSetScopeId(el, treeOwnerId + "-s");
      }
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        setScopeId(el, parentComponent.vnode.scopeId, parentComponent.vnode, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, optimized, start2 = 0) => {
    for (let i3 = start2; i3 < children.length; i3++) {
      const child = children[i3] = optimized ? cloneIfMounted(children[i3]) : normalizeVNode(children[i3]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i3 = 0; i3 < propsToUpdate.length; i3++) {
            const key = propsToUpdate[i3];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || hostForcePatchProp && hostForcePatchProp(el, key)) {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG);
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG) => {
    for (let i3 = 0; i3 < newChildren.length; i3++) {
      const oldVNode = oldChildren[i3];
      const newVNode = newChildren[i3];
      const container = oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & 6 || oldVNode.shapeFlag & 64 ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev || hostForcePatchProp && hostForcePatchProp(el, key)) {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren } = n2;
    if (patchFlag > 0) {
      optimized = true;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG);
        if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    setupComponent(instance);
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.component = n1.component;
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    instance.update = effect(function componentEffect() {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m: m4, parent } = instance;
        if (bm) {
          invokeArrayFns(bm);
        }
        if (vnodeHook = props && props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        const subTree = instance.subTree = renderComponentRoot(instance);
        if (el && hydrateNode) {
          hydrateNode(initialVNode.el, subTree, instance, parentSuspense);
        } else {
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          initialVNode.el = subTree.el;
        }
        if (m4) {
          queuePostRenderEffect(m4, parentSuspense);
        }
        if (vnodeHook = props && props.onVnodeMounted) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => {
            invokeVNodeHook(vnodeHook, parent, scopedInitialVNode);
          }, parentSuspense);
        }
        const { a: a4 } = instance;
        if (a4 && initialVNode.shapeFlag & 256) {
          queuePostRenderEffect(a4, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u: u3, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          hostParentNode(prevTree.el),
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u3) {
          queuePostRenderEffect(u3, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }, parentSuspense);
        }
      }
    }, prodEffectOptions);
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children);
    flushPreFlushCbs(void 0, instance.update);
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i3;
    for (i3 = 0; i3 < commonLength; i3++) {
      const nextChild = c2[i3] = optimized ? cloneIfMounted(c2[i3]) : normalizeVNode(c2[i3]);
      patch(c1[i3], nextChild, container, null, parentComponent, parentSuspense, isSVG, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized) => {
    let i3 = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e22 = l2 - 1;
    while (i3 <= e1 && i3 <= e22) {
      const n1 = c1[i3];
      const n2 = c2[i3] = optimized ? cloneIfMounted(c2[i3]) : normalizeVNode(c2[i3]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, optimized);
      } else {
        break;
      }
      i3++;
    }
    while (i3 <= e1 && i3 <= e22) {
      const n1 = c1[e1];
      const n2 = c2[e22] = optimized ? cloneIfMounted(c2[e22]) : normalizeVNode(c2[e22]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, optimized);
      } else {
        break;
      }
      e1--;
      e22--;
    }
    if (i3 > e1) {
      if (i3 <= e22) {
        const nextPos = e22 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i3 <= e22) {
          patch(null, c2[i3] = optimized ? cloneIfMounted(c2[i3]) : normalizeVNode(c2[i3]), container, anchor, parentComponent, parentSuspense, isSVG);
          i3++;
        }
      }
    } else if (i3 > e22) {
      while (i3 <= e1) {
        unmount(c1[i3], parentComponent, parentSuspense, true);
        i3++;
      }
    } else {
      const s1 = i3;
      const s22 = i3;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i3 = s22; i3 <= e22; i3++) {
        const nextChild = c2[i3] = optimized ? cloneIfMounted(c2[i3]) : normalizeVNode(c2[i3]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i3);
        }
      }
      let j2;
      let patched = 0;
      const toBePatched = e22 - s22 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i3 = 0; i3 < toBePatched; i3++)
        newIndexToOldIndexMap[i3] = 0;
      for (i3 = s1; i3 <= e1; i3++) {
        const prevChild = c1[i3];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j2 = s22; j2 <= e22; j2++) {
            if (newIndexToOldIndexMap[j2 - s22] === 0 && isSameVNodeType(prevChild, c2[j2])) {
              newIndex = j2;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s22] = i3 + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j2 = increasingNewIndexSequence.length - 1;
      for (i3 = toBePatched - 1; i3 >= 0; i3--) {
        const nextIndex = s22 + i3;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i3] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG);
        } else if (moved) {
          if (j2 < 0 || i3 !== increasingNewIndexSequence[j2]) {
            move(nextChild, container, anchor, 2);
          } else {
            j2--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i3 = 0; i3 < children.length; i3++) {
        move(children[i3], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, null);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    let vnodeHook;
    if (vnodeHook = props && props.onVnodeBeforeUnmount) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && (patchFlag & 128 || patchFlag & 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (shapeFlag & 64 && (doRemove || !isTeleportDisabled(vnode.props))) {
        vnode.type.remove(vnode, internals);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if ((vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      removeFragment(el, anchor);
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, effects, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    if (effects) {
      for (let i3 = 0; i3 < effects.length; i3++) {
        stop(effects[i3]);
      }
    }
    if (update) {
      stop(update);
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start2 = 0) => {
    for (let i3 = start2; i3 < children.length; i3++) {
      unmount(children[i3], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container);
    }
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i3 = 0; i3 < ch1.length; i3++) {
      const c1 = ch1[i3];
      let c2 = ch2[i3];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i3] = cloneIfMounted(ch2[i3]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result2 = [0];
  let i3, j2, u3, v2, c2;
  const len = arr.length;
  for (i3 = 0; i3 < len; i3++) {
    const arrI = arr[i3];
    if (arrI !== 0) {
      j2 = result2[result2.length - 1];
      if (arr[j2] < arrI) {
        p2[i3] = j2;
        result2.push(i3);
        continue;
      }
      u3 = 0;
      v2 = result2.length - 1;
      while (u3 < v2) {
        c2 = (u3 + v2) / 2 | 0;
        if (arr[result2[c2]] < arrI) {
          u3 = c2 + 1;
        } else {
          v2 = c2;
        }
      }
      if (arrI < arr[result2[u3]]) {
        if (u3 > 0) {
          p2[i3] = result2[u3 - 1];
        }
        result2[u3] = i3;
      }
    }
  }
  u3 = result2.length;
  v2 = result2[u3 - 1];
  while (u3-- > 0) {
    result2[u3] = v2;
    v2 = p2[v2];
  }
  return result2;
}
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
const COMPONENTS = "components";
function resolveComponent(name) {
  return resolveAsset(COMPONENTS, name) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveAsset(type, name, warnMissing = true) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      if (name === `_self`) {
        return Component;
      }
      const selfName = getComponentName(Component);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const Fragment = Symbol(void 0);
const Text = Symbol(void 0);
const Comment = Symbol(void 0);
const Static = Symbol(void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  const vnode = createVNode(type, props, children, patchFlag, dynamicProps, true);
  vnode.dynamicChildren = currentBlock || EMPTY_ARR;
  closeBlock();
  if (currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2 }) => {
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2 } : ref2 : null;
};
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    if (isProxy(props) || InternalObjectKey in props) {
      props = extend({}, props);
    }
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
  const vnode = {
    __v_isVNode: true,
    ["__v_skip"]: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    children: null,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  normalizeChildren(vnode, children);
  if (shapeFlag & 128) {
    const { content, fallback } = normalizeSuspenseChildren(vnode);
    vnode.ssContent = content;
    vnode.ssFallback = fallback;
  }
  if (!isBlockNode && currentBlock && (patchFlag > 0 || shapeFlag & 6) && patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  return {
    __v_isVNode: true,
    ["__v_skip"]: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(Fragment, null, child);
  } else if (typeof child === "object") {
    return child.el === null ? child : cloneVNode(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & 1 || shapeFlag & 64) {
      const slot = children.default;
      if (slot) {
        slot._c && setCompiledSlotRendering(1);
        normalizeChildren(vnode, slot());
        slot._c && setCompiledSlotRendering(-1);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.vnode.patchFlag & 1024) {
          children._ = 2;
          vnode.patchFlag |= 1024;
        } else {
          children._ = 1;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = extend({}, args[0]);
  for (let i3 = 1; i3 < args.length; i3++) {
    const toMerge = args[i3];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (existing !== incoming) {
          ret[key] = existing ? [].concat(existing, toMerge[key]) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue() : defaultValue;
    } else
      ;
  }
}
let isInBeforeCreate = false;
function applyOptions(instance, options, deferredData = [], deferredWatch = [], deferredProvide = [], asMixin = false) {
  const {
    mixins,
    extends: extendsOptions,
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions2,
    provide: provideOptions,
    inject: injectOptions,
    components,
    directives,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    expose
  } = options;
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  const globalMixins = instance.appContext.mixins;
  if (asMixin && render && instance.render === NOOP) {
    instance.render = render;
  }
  if (!asMixin) {
    isInBeforeCreate = true;
    callSyncHook("beforeCreate", "bc", options, instance, globalMixins);
    isInBeforeCreate = false;
    applyMixins(instance, globalMixins, deferredData, deferredWatch, deferredProvide);
  }
  if (extendsOptions) {
    applyOptions(instance, extendsOptions, deferredData, deferredWatch, deferredProvide, true);
  }
  if (mixins) {
    applyMixins(instance, mixins, deferredData, deferredWatch, deferredProvide);
  }
  if (injectOptions) {
    if (isArray(injectOptions)) {
      for (let i3 = 0; i3 < injectOptions.length; i3++) {
        const key = injectOptions[i3];
        ctx[key] = inject(key);
      }
    } else {
      for (const key in injectOptions) {
        const opt = injectOptions[key];
        if (isObject$1(opt)) {
          ctx[key] = inject(opt.from || key, opt.default, true);
        } else {
          ctx[key] = inject(opt);
        }
      }
    }
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (!asMixin) {
    if (deferredData.length) {
      deferredData.forEach((dataFn) => resolveData(instance, dataFn, publicThis));
    }
    if (dataOptions) {
      resolveData(instance, dataOptions, publicThis);
    }
  } else if (dataOptions) {
    deferredData.push(dataOptions);
  }
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
    }
  }
  if (watchOptions2) {
    deferredWatch.push(watchOptions2);
  }
  if (!asMixin && deferredWatch.length) {
    deferredWatch.forEach((watchOptions3) => {
      for (const key in watchOptions3) {
        createWatcher(watchOptions3[key], ctx, publicThis, key);
      }
    });
  }
  if (provideOptions) {
    deferredProvide.push(provideOptions);
  }
  if (!asMixin && deferredProvide.length) {
    deferredProvide.forEach((provideOptions2) => {
      const provides = isFunction(provideOptions2) ? provideOptions2.call(publicThis) : provideOptions2;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    });
  }
  if (asMixin) {
    if (components) {
      extend(instance.components || (instance.components = extend({}, instance.type.components)), components);
    }
    if (directives) {
      extend(instance.directives || (instance.directives = extend({}, instance.type.directives)), directives);
    }
  }
  if (!asMixin) {
    callSyncHook("created", "c", options, instance, globalMixins);
  }
  if (beforeMount) {
    onBeforeMount(beforeMount.bind(publicThis));
  }
  if (mounted) {
    onMounted(mounted.bind(publicThis));
  }
  if (beforeUpdate) {
    onBeforeUpdate(beforeUpdate.bind(publicThis));
  }
  if (updated) {
    onUpdated(updated.bind(publicThis));
  }
  if (activated) {
    onActivated(activated.bind(publicThis));
  }
  if (deactivated) {
    onDeactivated(deactivated.bind(publicThis));
  }
  if (errorCaptured) {
    onErrorCaptured(errorCaptured.bind(publicThis));
  }
  if (renderTracked) {
    onRenderTracked(renderTracked.bind(publicThis));
  }
  if (renderTriggered) {
    onRenderTriggered(renderTriggered.bind(publicThis));
  }
  if (beforeUnmount) {
    onBeforeUnmount(beforeUnmount.bind(publicThis));
  }
  if (unmounted) {
    onUnmounted(unmounted.bind(publicThis));
  }
  if (isArray(expose)) {
    if (!asMixin) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = proxyRefs({}));
        expose.forEach((key) => {
          exposed[key] = toRef(publicThis, key);
        });
      } else if (!instance.exposed) {
        instance.exposed = EMPTY_OBJ;
      }
    }
  }
}
function callSyncHook(name, type, options, instance, globalMixins) {
  callHookFromMixins(name, type, globalMixins, instance);
  const { extends: base, mixins } = options;
  if (base) {
    callHookFromExtends(name, type, base, instance);
  }
  if (mixins) {
    callHookFromMixins(name, type, mixins, instance);
  }
  const selfHook = options[name];
  if (selfHook) {
    callWithAsyncErrorHandling(selfHook.bind(instance.proxy), instance, type);
  }
}
function callHookFromExtends(name, type, base, instance) {
  if (base.extends) {
    callHookFromExtends(name, type, base.extends, instance);
  }
  const baseHook = base[name];
  if (baseHook) {
    callWithAsyncErrorHandling(baseHook.bind(instance.proxy), instance, type);
  }
}
function callHookFromMixins(name, type, mixins, instance) {
  for (let i3 = 0; i3 < mixins.length; i3++) {
    const chainedMixins = mixins[i3].mixins;
    if (chainedMixins) {
      callHookFromMixins(name, type, chainedMixins, instance);
    }
    const fn2 = mixins[i3][name];
    if (fn2) {
      callWithAsyncErrorHandling(fn2.bind(instance.proxy), instance, type);
    }
  }
}
function applyMixins(instance, mixins, deferredData, deferredWatch, deferredProvide) {
  for (let i3 = 0; i3 < mixins.length; i3++) {
    applyOptions(instance, mixins[i3], deferredData, deferredWatch, deferredProvide, true);
  }
}
function resolveData(instance, dataFn, publicThis) {
  const data = dataFn.call(publicThis, publicThis);
  if (!isObject$1(data))
    ;
  else if (instance.data === EMPTY_OBJ) {
    instance.data = reactive(data);
  } else {
    extend(instance.data, data);
  }
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i3 = 0; i3 < segments.length && cur; i3++) {
      cur = cur[segments[i3]];
    }
    return cur;
  };
}
function resolveMergedOptions(instance) {
  const raw = instance.type;
  const { __merged, mixins, extends: extendsOptions } = raw;
  if (__merged)
    return __merged;
  const globalMixins = instance.appContext.mixins;
  if (!globalMixins.length && !mixins && !extendsOptions)
    return raw;
  const options = {};
  globalMixins.forEach((m4) => mergeOptions(options, m4, instance));
  mergeOptions(options, raw, instance);
  return raw.__merged = options;
}
function mergeOptions(to2, from, instance) {
  const strats = instance.appContext.config.optionMergeStrategies;
  const { mixins, extends: extendsOptions } = from;
  extendsOptions && mergeOptions(to2, extendsOptions, instance);
  mixins && mixins.forEach((m4) => mergeOptions(to2, m4, instance));
  for (const key in from) {
    if (strats && hasOwn(strats, key)) {
      to2[key] = strats[key](to2[key], from[key], instance.proxy, key);
    } else {
      to2[key] = from[key];
    }
  }
}
const getPublicInstance = (i3) => {
  if (!i3)
    return null;
  if (isStatefulComponent(i3))
    return i3.exposed ? i3.exposed : i3.proxy;
  return getPublicInstance(i3.parent);
};
const publicPropertiesMap = extend(/* @__PURE__ */ Object.create(null), {
  $: (i3) => i3,
  $el: (i3) => i3.vnode.el,
  $data: (i3) => i3.data,
  $props: (i3) => i3.props,
  $attrs: (i3) => i3.attrs,
  $slots: (i3) => i3.slots,
  $refs: (i3) => i3.refs,
  $parent: (i3) => getPublicInstance(i3.parent),
  $root: (i3) => getPublicInstance(i3.root),
  $emit: (i3) => i3.emit,
  $options: (i3) => resolveMergedOptions(i3),
  $forceUpdate: (i3) => () => queueJob(i3.update),
  $nextTick: (i3) => nextTick.bind(i3.proxy),
  $watch: (i3) => instanceWatch.bind(i3)
});
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__v_skip") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 0:
            return setupState[key];
          case 1:
            return data[key];
          case 3:
            return ctx[key];
          case 2:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 0;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 1;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 2;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 3;
        return ctx[key];
      } else if (!isInBeforeCreate) {
        accessCache[key] = 4;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 3;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      return globalProperties[key];
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return accessCache[key] !== void 0 || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  }
};
const RuntimeCompiledPublicInstanceProxyHandlers = extend({}, PublicInstanceProxyHandlers, {
  get(target, key) {
    if (key === Symbol.unscopables) {
      return;
    }
    return PublicInstanceProxyHandlers.get(target, key, target);
  },
  has(_2, key) {
    const has2 = key[0] !== "_" && !isGloballyWhitelisted(key);
    return has2;
  }
});
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    update: null,
    render: null,
    proxy: null,
    exposed: null,
    withProxy: null,
    effects: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  return instance;
}
let currentInstance = null;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    currentInstance = instance;
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    resetTracking();
    currentInstance = null;
    if (isPromise(setupResult)) {
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult);
    }
  } else {
    finishComponentSetup(instance);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance);
}
function finishComponentSetup(instance, isSSR) {
  const Component = instance.type;
  if (!instance.render) {
    instance.render = Component.render || NOOP;
    if (instance.render._rc) {
      instance.withProxy = new Proxy(instance.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
    }
  }
  {
    currentInstance = instance;
    pauseTracking();
    applyOptions(instance, Component);
    resetTracking();
    currentInstance = null;
  }
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = proxyRefs(exposed);
  };
  {
    return {
      attrs: instance.attrs,
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function recordInstanceBoundEffect(effect2, instance = currentInstance) {
  if (instance) {
    (instance.effects || (instance.effects = [])).push(effect2);
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match2 = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match2) {
      name = match2[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
function computed(getterOrOptions) {
  const c2 = computed$1(getterOrOptions);
  recordInstanceBoundEffect(c2.effect);
  return c2;
}
function h$1(type, propsOrChildren, children) {
  const l2 = arguments.length;
  if (l2 === 2) {
    if (isObject$1(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l2 > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l2 === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
function renderList(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i3 = 0, l2 = source.length; i3 < l2; i3++) {
      ret[i3] = renderItem(source[i3], i3);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i3 = 0; i3 < source; i3++) {
      ret[i3] = renderItem(i3 + 1, i3);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, renderItem);
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i3 = 0, l2 = keys.length; i3 < l2; i3++) {
        const key = keys[i3];
        ret[i3] = renderItem(source[key], key, i3);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
const version = "3.0.7";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
let tempContainer;
let tempSVGContainer;
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is) => isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0),
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  cloneNode(el) {
    return el.cloneNode(true);
  },
  insertStaticContent(content, parent, anchor, isSVG) {
    const temp = isSVG ? tempSVGContainer || (tempSVGContainer = doc.createElementNS(svgNS, "svg")) : tempContainer || (tempContainer = doc.createElement("div"));
    temp.innerHTML = content;
    const first = temp.firstChild;
    let node = first;
    let last = node;
    while (node) {
      last = node;
      nodeOps.insert(node, parent, anchor);
      node = temp.firstChild;
    }
    return [first, last];
  }
};
function patchClass(el, value, isSVG) {
  if (value == null) {
    value = "";
  }
  if (isSVG) {
    el.setAttribute("class", value);
  } else {
    const transitionClasses = el._vtc;
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  if (!next) {
    el.removeAttribute("style");
  } else if (isString(next)) {
    if (prev !== next) {
      const current = style.display;
      style.cssText = next;
      if ("_vod" in el) {
        style.display = current;
      }
    }
  } else {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v2) => setStyle(style, name, v2));
  } else {
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i3 = 0; i3 < prefixes.length; i3++) {
    const prefixed = prefixes[i3] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS") {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
    return;
  }
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (value === "" && type === "boolean") {
      el[key] = true;
      return;
    } else if (value == null && type === "string") {
      el[key] = "";
      el.removeAttribute(key);
      return;
    } else if (type === "number") {
      el[key] = 0;
      el.removeAttribute(key);
      return;
    }
  }
  try {
    el[key] = value;
  } catch (e3) {
  }
}
let _getNow = Date.now;
if (typeof document !== "undefined" && _getNow() > document.createEvent("Event").timeStamp) {
  _getNow = () => performance.now();
}
let cachedNow = 0;
const p$3 = Promise.resolve();
const reset = () => {
  cachedNow = 0;
};
const getNow = () => cachedNow || (p$3.then(reset), cachedNow = _getNow());
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m4;
    while (m4 = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m4[0].length);
      options[m4[0].toLowerCase()] = true;
    }
  }
  return [hyphenate(name.slice(2)), options];
}
function createInvoker(initialValue, instance) {
  const invoker = (e3) => {
    const timeStamp = e3.timeStamp || _getNow();
    if (timeStamp >= invoker.attached - 1) {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e3, invoker.value), instance, 5, [e3]);
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e3, value) {
  if (isArray(value)) {
    const originalStop = e3.stopImmediatePropagation;
    e3.stopImmediatePropagation = () => {
      originalStop.call(e3);
      e3._stopped = true;
    };
    return value.map((fn2) => (e4) => !e4._stopped && fn2(e4));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const forcePatchProp = (_2, key) => key === "value";
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  switch (key) {
    case "class":
      patchClass(el, nextValue, isSVG);
      break;
    case "style":
      patchStyle(el, prevValue, nextValue);
      break;
    default:
      if (isOn(key)) {
        if (!isModelListener(key)) {
          patchEvent(el, key, prevValue, nextValue, parentComponent);
        }
      } else if (shouldSetAsProp(el, key, nextValue, isSVG)) {
        patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
      } else {
        if (key === "true-value") {
          el._trueValue = nextValue;
        } else if (key === "false-value") {
          el._falseValue = nextValue;
        }
        patchAttr(el, key, nextValue, isSVG);
      }
      break;
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const getModelAssigner = (vnode) => {
  const fn2 = vnode.props["onUpdate:modelValue"];
  return isArray(fn2) ? (value) => invokeArrayFns(fn2, value) : fn2;
};
function onCompositionStart(e3) {
  e3.target.composing = true;
}
function onCompositionEnd(e3) {
  const target = e3.target;
  if (target.composing) {
    target.composing = false;
    trigger(target, "input");
  }
}
function trigger(el, type) {
  const e3 = document.createEvent("HTMLEvents");
  e3.initEvent(type, true, true);
  el.dispatchEvent(e3);
}
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    const castToNumber = number || el.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e3) => {
      if (e3.target.composing)
        return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      } else if (castToNumber) {
        domValue = toNumber(domValue);
      }
      el._assign(domValue);
    });
    if (trim) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, modifiers: { trim, number } }, vnode) {
    el._assign = getModelAssigner(vnode);
    if (el.composing)
      return;
    if (document.activeElement === el) {
      if (trim && el.value.trim() === value) {
        return;
      }
      if ((number || el.type === "number") && toNumber(el.value) === value) {
        return;
      }
    }
    const newValue = value == null ? "" : value;
    if (el.value !== newValue) {
      el.value = newValue;
    }
  }
};
const vModelCheckbox = {
  created(el, _2, vnode) {
    el._assign = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      const modelValue = el._modelValue;
      const elementValue = getValue(el);
      const checked = el.checked;
      const assign2 = el._assign;
      if (isArray(modelValue)) {
        const index = looseIndexOf(modelValue, elementValue);
        const found = index !== -1;
        if (checked && !found) {
          assign2(modelValue.concat(elementValue));
        } else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index, 1);
          assign2(filtered);
        }
      } else if (isSet(modelValue)) {
        const cloned = new Set(modelValue);
        if (checked) {
          cloned.add(elementValue);
        } else {
          cloned.delete(elementValue);
        }
        assign2(cloned);
      } else {
        assign2(getCheckboxValue(el, checked));
      }
    });
  },
  mounted: setChecked,
  beforeUpdate(el, binding, vnode) {
    el._assign = getModelAssigner(vnode);
    setChecked(el, binding, vnode);
  }
};
function setChecked(el, { value, oldValue }, vnode) {
  el._modelValue = value;
  if (isArray(value)) {
    el.checked = looseIndexOf(value, vnode.props.value) > -1;
  } else if (isSet(value)) {
    el.checked = value.has(vnode.props.value);
  } else if (value !== oldValue) {
    el.checked = looseEqual(value, getCheckboxValue(el, true));
  }
}
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
  const key = checked ? "_trueValue" : "_falseValue";
  return key in el ? el[key] : checked;
}
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e3) => e3.stopPropagation(),
  prevent: (e3) => e3.preventDefault(),
  self: (e3) => e3.target !== e3.currentTarget,
  ctrl: (e3) => !e3.ctrlKey,
  shift: (e3) => !e3.shiftKey,
  alt: (e3) => !e3.altKey,
  meta: (e3) => !e3.metaKey,
  left: (e3) => "button" in e3 && e3.button !== 0,
  middle: (e3) => "button" in e3 && e3.button !== 1,
  right: (e3) => "button" in e3 && e3.button !== 2,
  exact: (e3, modifiers) => systemModifiers.some((m4) => e3[`${m4}Key`] && !modifiers.includes(m4))
};
const withModifiers = (fn2, modifiers) => {
  return (event, ...args) => {
    for (let i3 = 0; i3 < modifiers.length; i3++) {
      const guard = modifierGuards[modifiers[i3]];
      if (guard && guard(event, modifiers))
        return;
    }
    return fn2(event, ...args);
  };
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn2, modifiers) => {
  return (event) => {
    if (!("key" in event))
      return;
    const eventKey = hyphenate(event.key);
    if (!modifiers.some((k3) => k3 === eventKey || keyNames[k3] === eventKey)) {
      return;
    }
    return fn2(event);
  };
};
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
const rendererOptions = extend({ patchProp, forcePatchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
const store = {
  state: reactive({
    code: null,
    registered: null,
    token: null,
    phoneNumber: null,
    db: null,
    allowSkipEmail: null,
    countryCode: "MY",
    personalInfoStyle: null,
    customerInfo: null
  }),
  addCustomerInfo(newValue) {
    this.state.customerInfo = newValue;
  },
  addPersonalInfoStyle(newValue) {
    this.state.personalInfoStyle = newValue;
  },
  addValidationCode(newValue) {
    this.state.code = newValue;
  },
  addRegistrationStatus(newValue) {
    this.state.registered = newValue;
  },
  addToken(newValue) {
    this.state.token = newValue;
  },
  addPhoneNumber(newValue) {
    this.state.phoneNumber = newValue;
  },
  addDb(newValue) {
    this.state.db = newValue;
  },
  addAllowSkipEmail(newValue) {
    this.state.allowSkipEmail = newValue;
  },
  addCountryCode(newValue) {
    this.state.countryCode = newValue;
  }
};
function l$1(a4, b3) {
  b3.tag = a4;
  return b3;
}
function m$2() {
}
function p$2(a4) {
  return function(b3) {
    var c2 = a4.length;
    let d4 = false, e3 = false, f = false, g2 = 0;
    b3(
      l$1(0, [
        function(h4) {
          if (h4) {
            d4 = true;
          } else if (e3) {
            f = true;
          } else {
            for (e3 = f = true; f && !d4; ) {
              g2 < c2 ? (h4 = a4[g2], g2 = g2 + 1 | 0, f = false, b3(l$1(1, [h4]))) : (d4 = true, b3(0));
            }
            e3 = false;
          }
        }
      ])
    );
  };
}
function r$3() {
}
function t$3(a4) {
  a4(0);
}
function u$2(a4) {
  let b3 = false;
  a4(
    l$1(0, [
      function(c2) {
        c2 ? b3 = true : b3 || a4(0);
      }
    ])
  );
}
function x$4(a4) {
  if (null === a4 || a4[0] !== v$3) {
    return a4;
  }
  if (0 !== (a4 = a4[1])) {
    return [v$3, a4 - 1 | 0];
  }
}
function z$4(a4) {
  return function(b3) {
    return function(c2) {
      function d4(b4) {
        "number" == typeof b4 ? k3 && (k3 = false, void 0 !== (b4 = e3.shift()) ? (b4 = a4(x$4(b4)), k3 = true, b4(d4)) : q3 ? c2(0) : g2 || (g2 = true, f(0))) : b4.tag ? k3 && (c2(b4), n2 ? n2 = false : h4(0)) : (h4 = b4 = b4[0], n2 = false, b4(0));
      }
      let e3 = [], f = m$2, g2 = false, h4 = m$2, k3 = false, n2 = false, q3 = false;
      b3(function(b4) {
        "number" == typeof b4 ? q3 || (q3 = true, k3 || 0 !== e3.length || c2(0)) : b4.tag ? q3 || (b4 = b4[0], g2 = false, k3 ? e3.push(b4) : (b4 = a4(b4), k3 = true, b4(d4))) : f = b4[0];
      });
      c2(
        l$1(0, [
          function(c3) {
            if (c3) {
              if (q3 || (q3 = true, f(1)), k3) {
                return k3 = false, h4(1);
              }
            } else {
              q3 || g2 || (g2 = true, f(0)), k3 && !n2 && (n2 = true, h4(0));
            }
          }
        ])
      );
    };
  };
}
function B$2(a4) {
  return a4;
}
function C$2(a4) {
  return a4(0);
}
function D$3(a4) {
  return function(b3) {
    return function(c2) {
      let e3 = m$2, f = false, g2 = [], h4 = false;
      b3(function(b4) {
        "number" == typeof b4 ? h4 || (h4 = true, 0 === g2.length && c2(0)) : b4.tag ? h4 || (f = false, function(a5) {
          function b5(a6) {
            "number" == typeof a6 ? 0 !== g2.length && (g2 = g2.filter(d4), a6 = 0 === g2.length, h4 && a6 ? c2(0) : !f && a6 && (f = true, e3(0))) : a6.tag ? 0 !== g2.length && (c2(l$1(1, [a6[0]])), k3(0)) : (k3 = a6 = a6[0], g2 = g2.concat(a6), a6(0));
          }
          function d4(a6) {
            return a6 !== k3;
          }
          let k3 = m$2;
          1 === a5.length ? a5(b5) : a5.bind(null, b5);
        }(a4(b4[0])), f || (f = true, e3(0))) : e3 = b4[0];
      });
      c2(
        l$1(0, [
          function(a5) {
            a5 ? (h4 || (h4 = true, e3(a5)), g2.forEach(function(c3) {
              return c3(a5);
            }), g2 = []) : (f || h4 ? f = false : (f = true, e3(0)), g2.forEach(C$2));
          }
        ])
      );
    };
  };
}
function E$3(a4) {
  return a4;
}
function H$3(a4) {
  return function(b3) {
    return function(c2) {
      let d4 = false;
      return b3(function(e3) {
        if ("number" == typeof e3) {
          d4 || (d4 = true, c2(e3));
        } else if (e3.tag) {
          d4 || (a4(e3[0]), c2(e3));
        } else {
          var g2 = e3[0];
          c2(
            l$1(0, [
              function(a5) {
                if (!d4) {
                  return a5 && (d4 = true), g2(a5);
                }
              }
            ])
          );
        }
      });
    };
  };
}
function J$2(a4) {
  a4(0);
}
function K$1(a4) {
  return function(b3) {
    return function(c2) {
      function d4(a5) {
        h4 && ("number" == typeof a5 ? (h4 = false, n2 ? c2(a5) : f || (f = true, e3(0))) : a5.tag ? (c2(a5), k3 ? k3 = false : g2(0)) : (g2 = a5 = a5[0], k3 = false, a5(0)));
      }
      let e3 = m$2, f = false, g2 = m$2, h4 = false, k3 = false, n2 = false;
      b3(function(b4) {
        "number" == typeof b4 ? n2 || (n2 = true, h4 || c2(0)) : b4.tag ? n2 || (h4 && (g2(1), g2 = m$2), f ? f = false : (f = true, e3(0)), b4 = a4(b4[0]), h4 = true, b4(d4)) : e3 = b4[0];
      });
      c2(
        l$1(0, [
          function(a5) {
            if (a5) {
              if (n2 || (n2 = true, e3(1)), h4) {
                return h4 = false, g2(1);
              }
            } else {
              n2 || f || (f = true, e3(0)), h4 && !k3 && (k3 = true, g2(0));
            }
          }
        ])
      );
    };
  };
}
function L$2(a4) {
  return a4;
}
function M$2(a4) {
  return function(b3) {
    return function(c2) {
      let d4 = [], e3 = m$2;
      return b3(function(b4) {
        "number" == typeof b4 ? p$2(d4)(c2) : b4.tag ? (d4.length >= a4 && 0 < a4 && d4.shift(), d4.push(b4[0]), e3(0)) : (b4 = b4[0], 0 >= a4 ? (b4(1), u$2(c2)) : (e3 = b4, b4(0)));
      });
    };
  };
}
function N$3(a4) {
  return function(b3) {
    let c2 = m$2, d4 = false;
    b3(function(e3) {
      "number" == typeof e3 ? d4 = true : e3.tag ? d4 || (a4(e3[0]), c2(0)) : (c2 = e3 = e3[0], e3(0));
    });
    return {
      unsubscribe: function() {
        if (!d4) {
          return d4 = true, c2(1);
        }
      }
    };
  };
}
function O$3() {
}
function concat$1(a4) {
  return z$4(B$2)(p$2(a4));
}
function filter$1(a4) {
  return function(b3) {
    return function(c2) {
      let d4 = m$2;
      return b3(function(b4) {
        "number" == typeof b4 ? c2(b4) : b4.tag ? a4(b4[0]) ? c2(b4) : d4(0) : (d4 = b4[0], c2(b4));
      });
    };
  };
}
function fromValue$1(a4) {
  return function(b3) {
    let c2 = false;
    b3(
      l$1(0, [
        function(d4) {
          d4 ? c2 = true : c2 || (c2 = true, b3(l$1(1, [a4])), b3(0));
        }
      ])
    );
  };
}
function make$1(a4) {
  return function(b3) {
    let c2 = r$3, d4 = false;
    c2 = a4({
      next: function(a5) {
        d4 || b3(l$1(1, [a5]));
      },
      complete: function() {
        d4 || (d4 = true, b3(0));
      }
    });
    b3(
      l$1(0, [
        function(a5) {
          if (a5 && !d4) {
            return d4 = true, c2();
          }
        }
      ])
    );
  };
}
function makeSubject$1() {
  let a4 = [], b3 = false;
  return {
    source: function(c2) {
      function b4(a5) {
        return a5 !== c2;
      }
      a4 = a4.concat(c2);
      c2(
        l$1(0, [
          function(c3) {
            c3 && (a4 = a4.filter(b4));
          }
        ])
      );
    },
    next: function(c2) {
      b3 || a4.forEach(function(a5) {
        a5(l$1(1, [c2]));
      });
    },
    complete: function() {
      b3 || (b3 = true, a4.forEach(t$3));
    }
  };
}
function map$1(a4) {
  return function(b3) {
    return function(c2) {
      return b3(function(b4) {
        b4 = "number" == typeof b4 ? 0 : b4.tag ? l$1(1, [a4(b4[0])]) : l$1(0, [b4[0]]);
        c2(b4);
      });
    };
  };
}
function merge$1(a4) {
  return D$3(E$3)(p$2(a4));
}
function onEnd$1(a4) {
  return function(b3) {
    return function(c2) {
      let d4 = false;
      return b3(function(b4) {
        if ("number" == typeof b4) {
          if (d4) {
            return;
          }
          d4 = true;
          c2(b4);
          return a4();
        }
        if (b4.tag) {
          d4 || c2(b4);
        } else {
          var e3 = b4[0];
          c2(
            l$1(0, [
              function(c3) {
                if (!d4) {
                  return c3 ? (d4 = true, e3(c3), a4()) : e3(c3);
                }
              }
            ])
          );
        }
      });
    };
  };
}
function onStart$1(a4) {
  return function(b3) {
    return function(c2) {
      return b3(function(b4) {
        "number" == typeof b4 ? c2(b4) : b4.tag ? c2(b4) : (c2(b4), a4());
      });
    };
  };
}
function publish$1(a4) {
  return N$3(O$3)(a4);
}
function share$1(a4) {
  function b3(a5) {
    "number" == typeof a5 ? (c2.forEach(J$2), c2 = []) : a5.tag ? (e3 = false, c2.forEach(function(b4) {
      b4(a5);
    })) : d4 = a5[0];
  }
  let c2 = [], d4 = m$2, e3 = false;
  return function(f) {
    function g2(a5) {
      return a5 !== f;
    }
    c2 = c2.concat(f);
    1 === c2.length && a4(b3);
    f(
      l$1(0, [
        function(a5) {
          if (a5) {
            if (c2 = c2.filter(g2), 0 === c2.length) {
              return d4(1);
            }
          } else {
            e3 || (e3 = true, d4(a5));
          }
        }
      ])
    );
  };
}
function switchAll$1(a4) {
  return K$1(L$2)(a4);
}
function take$1(a4) {
  return function(b3) {
    return function(c2) {
      let d4 = false, e3 = 0, f = m$2;
      b3(function(b4) {
        "number" == typeof b4 ? d4 || (d4 = true, c2(0)) : b4.tag ? e3 < a4 && !d4 && (e3 = e3 + 1 | 0, c2(b4), !d4 && e3 >= a4 && (d4 = true, c2(0), f(1))) : (b4 = b4[0], 0 >= a4 ? (d4 = true, c2(0), b4(1)) : f = b4);
      });
      c2(
        l$1(0, [
          function(b4) {
            if (!d4) {
              if (b4) {
                return d4 = true, f(1);
              }
              if (e3 < a4) {
                return f(0);
              }
            }
          }
        ])
      );
    };
  };
}
function takeUntil$1(a4) {
  return function(b3) {
    return function(c2) {
      function d4(a5) {
        "number" != typeof a5 && (a5.tag ? (e3 = true, f(1), c2(0)) : (g2 = a5 = a5[0], a5(0)));
      }
      let e3 = false, f = m$2, g2 = m$2;
      b3(function(b4) {
        "number" == typeof b4 ? e3 || (e3 = true, g2(1), c2(0)) : b4.tag ? e3 || c2(b4) : (f = b4[0], a4(d4));
      });
      c2(
        l$1(0, [
          function(a5) {
            if (!e3) {
              return a5 ? (e3 = true, f(1), g2(1)) : f(0);
            }
          }
        ])
      );
    };
  };
}
function toPromise$1(a4) {
  return new Promise(function(b3) {
    M$2(1)(a4)(function(a5) {
      if ("number" != typeof a5) {
        if (a5.tag) {
          b3(a5[0]);
        } else {
          a5[0](0);
        }
      }
    });
  });
}
var v$3 = [];
"function" == typeof Symbol ? Symbol.observable || (Symbol.observable = Symbol("observable")) : "@@observable";
function _typeof$8(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$8 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$8 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$8(obj);
}
function isObjectLike(value) {
  return _typeof$8(value) == "object" && value !== null;
}
var SYMBOL_TO_STRING_TAG = typeof Symbol === "function" && Symbol.toStringTag != null ? Symbol.toStringTag : "@@toStringTag";
function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match2;
  while ((match2 = lineRegexp.exec(source.body)) && match2.index < position) {
    line += 1;
    column = position + 1 - (match2.index + match2[0].length);
  }
  return {
    line,
    column
  };
}
function printLocation(location) {
  return printSourceLocation(location.source, getLocation(location.source, location.start));
}
function printSourceLocation(source, sourceLocation) {
  var firstLineColumnOffset = source.locationOffset.column - 1;
  var body = whitespace(firstLineColumnOffset) + source.body;
  var lineIndex = sourceLocation.line - 1;
  var lineOffset = source.locationOffset.line - 1;
  var lineNum = sourceLocation.line + lineOffset;
  var columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  var columnNum = sourceLocation.column + columnOffset;
  var locationStr = "".concat(source.name, ":").concat(lineNum, ":").concat(columnNum, "\n");
  var lines = body.split(/\r\n|[\n\r]/g);
  var locationLine = lines[lineIndex];
  if (locationLine.length > 120) {
    var subLineIndex = Math.floor(columnNum / 80);
    var subLineColumnNum = columnNum % 80;
    var subLines = [];
    for (var i3 = 0; i3 < locationLine.length; i3 += 80) {
      subLines.push(locationLine.slice(i3, i3 + 80));
    }
    return locationStr + printPrefixedLines([["".concat(lineNum), subLines[0]]].concat(subLines.slice(1, subLineIndex + 1).map(function(subLine) {
      return ["", subLine];
    }), [[" ", whitespace(subLineColumnNum - 1) + "^"], ["", subLines[subLineIndex + 1]]]));
  }
  return locationStr + printPrefixedLines([
    ["".concat(lineNum - 1), lines[lineIndex - 1]],
    ["".concat(lineNum), locationLine],
    ["", whitespace(columnNum - 1) + "^"],
    ["".concat(lineNum + 1), lines[lineIndex + 1]]
  ]);
}
function printPrefixedLines(lines) {
  var existingLines = lines.filter(function(_ref2) {
    _ref2[0];
    var line = _ref2[1];
    return line !== void 0;
  });
  var padLen = Math.max.apply(Math, existingLines.map(function(_ref2) {
    var prefix = _ref2[0];
    return prefix.length;
  }));
  return existingLines.map(function(_ref3) {
    var prefix = _ref3[0], line = _ref3[1];
    return leftPad(padLen, prefix) + (line ? " | " + line : " |");
  }).join("\n");
}
function whitespace(len) {
  return Array(len + 1).join(" ");
}
function leftPad(len, str) {
  return whitespace(len - str.length) + str;
}
function _typeof$7(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$7 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$7 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$7(obj);
}
function _classCallCheck$3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$4(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$4(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$4(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$4(Constructor, staticProps);
  return Constructor;
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf$1(subClass, superClass);
}
function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$1(Derived), result2;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$1(this).constructor;
      result2 = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result2 = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$1(this, result2);
  };
}
function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof$7(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _wrapNativeSuper$1(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper$1 = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction$1(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper2);
    }
    function Wrapper2() {
      return _construct$1(Class2, arguments, _getPrototypeOf$1(this).constructor);
    }
    Wrapper2.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper2, enumerable: false, writable: true, configurable: true } });
    return _setPrototypeOf$1(Wrapper2, Class2);
  };
  return _wrapNativeSuper$1(Class);
}
function _construct$1(Parent, args, Class) {
  if (_isNativeReflectConstruct$1()) {
    _construct$1 = Reflect.construct;
  } else {
    _construct$1 = function _construct2(Parent2, args2, Class2) {
      var a4 = [null];
      a4.push.apply(a4, args2);
      var Constructor = Function.bind.apply(Parent2, a4);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf$1(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct$1.apply(null, arguments);
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e3) {
    return false;
  }
}
function _isNativeFunction$1(fn2) {
  return Function.toString.call(fn2).indexOf("[native code]") !== -1;
}
function _setPrototypeOf$1(o2, p2) {
  _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf$1(o2, p2);
}
function _getPrototypeOf$1(o2) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf$1(o2);
}
var GraphQLError = /* @__PURE__ */ function(_Error) {
  _inherits$1(GraphQLError2, _Error);
  var _super = _createSuper$1(GraphQLError2);
  function GraphQLError2(message, nodes, source, positions, path, originalError, extensions) {
    var _locations2, _source2, _positions2, _extensions2;
    var _this;
    _classCallCheck$3(this, GraphQLError2);
    _this = _super.call(this, message);
    var _nodes = Array.isArray(nodes) ? nodes.length !== 0 ? nodes : void 0 : nodes ? [nodes] : void 0;
    var _source = source;
    if (!_source && _nodes) {
      var _nodes$0$loc;
      _source = (_nodes$0$loc = _nodes[0].loc) === null || _nodes$0$loc === void 0 ? void 0 : _nodes$0$loc.source;
    }
    var _positions = positions;
    if (!_positions && _nodes) {
      _positions = _nodes.reduce(function(list, node) {
        if (node.loc) {
          list.push(node.loc.start);
        }
        return list;
      }, []);
    }
    if (_positions && _positions.length === 0) {
      _positions = void 0;
    }
    var _locations;
    if (positions && source) {
      _locations = positions.map(function(pos) {
        return getLocation(source, pos);
      });
    } else if (_nodes) {
      _locations = _nodes.reduce(function(list, node) {
        if (node.loc) {
          list.push(getLocation(node.loc.source, node.loc.start));
        }
        return list;
      }, []);
    }
    var _extensions = extensions;
    if (_extensions == null && originalError != null) {
      var originalExtensions = originalError.extensions;
      if (isObjectLike(originalExtensions)) {
        _extensions = originalExtensions;
      }
    }
    Object.defineProperties(_assertThisInitialized$1(_this), {
      name: {
        value: "GraphQLError"
      },
      message: {
        value: message,
        enumerable: true,
        writable: true
      },
      locations: {
        value: (_locations2 = _locations) !== null && _locations2 !== void 0 ? _locations2 : void 0,
        enumerable: _locations != null
      },
      path: {
        value: path !== null && path !== void 0 ? path : void 0,
        enumerable: path != null
      },
      nodes: {
        value: _nodes !== null && _nodes !== void 0 ? _nodes : void 0
      },
      source: {
        value: (_source2 = _source) !== null && _source2 !== void 0 ? _source2 : void 0
      },
      positions: {
        value: (_positions2 = _positions) !== null && _positions2 !== void 0 ? _positions2 : void 0
      },
      originalError: {
        value: originalError
      },
      extensions: {
        value: (_extensions2 = _extensions) !== null && _extensions2 !== void 0 ? _extensions2 : void 0,
        enumerable: _extensions != null
      }
    });
    if (originalError !== null && originalError !== void 0 && originalError.stack) {
      Object.defineProperty(_assertThisInitialized$1(_this), "stack", {
        value: originalError.stack,
        writable: true,
        configurable: true
      });
      return _possibleConstructorReturn$1(_this);
    }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized$1(_this), GraphQLError2);
    } else {
      Object.defineProperty(_assertThisInitialized$1(_this), "stack", {
        value: Error().stack,
        writable: true,
        configurable: true
      });
    }
    return _this;
  }
  _createClass$4(GraphQLError2, [{
    key: "toString",
    value: function toString() {
      return printError(this);
    }
  }, {
    key: SYMBOL_TO_STRING_TAG,
    get: function get2() {
      return "Object";
    }
  }]);
  return GraphQLError2;
}(/* @__PURE__ */ _wrapNativeSuper$1(Error));
function printError(error) {
  var output = error.message;
  if (error.nodes) {
    for (var _i2 = 0, _error$nodes2 = error.nodes; _i2 < _error$nodes2.length; _i2++) {
      var node = _error$nodes2[_i2];
      if (node.loc) {
        output += "\n\n" + printLocation(node.loc);
      }
    }
  } else if (error.source && error.locations) {
    for (var _i4 = 0, _error$locations2 = error.locations; _i4 < _error$locations2.length; _i4++) {
      var location = _error$locations2[_i4];
      output += "\n\n" + printSourceLocation(error.source, location);
    }
  }
  return output;
}
var Kind = Object.freeze({
  NAME: "Name",
  DOCUMENT: "Document",
  OPERATION_DEFINITION: "OperationDefinition",
  VARIABLE_DEFINITION: "VariableDefinition",
  SELECTION_SET: "SelectionSet",
  FIELD: "Field",
  ARGUMENT: "Argument",
  FRAGMENT_SPREAD: "FragmentSpread",
  INLINE_FRAGMENT: "InlineFragment",
  FRAGMENT_DEFINITION: "FragmentDefinition",
  VARIABLE: "Variable",
  INT: "IntValue",
  FLOAT: "FloatValue",
  STRING: "StringValue",
  BOOLEAN: "BooleanValue",
  NULL: "NullValue",
  ENUM: "EnumValue",
  LIST: "ListValue",
  OBJECT: "ObjectValue",
  OBJECT_FIELD: "ObjectField",
  DIRECTIVE: "Directive",
  NAMED_TYPE: "NamedType",
  LIST_TYPE: "ListType",
  NON_NULL_TYPE: "NonNullType",
  SCHEMA_DEFINITION: "SchemaDefinition",
  OPERATION_TYPE_DEFINITION: "OperationTypeDefinition",
  SCALAR_TYPE_DEFINITION: "ScalarTypeDefinition",
  OBJECT_TYPE_DEFINITION: "ObjectTypeDefinition",
  FIELD_DEFINITION: "FieldDefinition",
  INPUT_VALUE_DEFINITION: "InputValueDefinition",
  INTERFACE_TYPE_DEFINITION: "InterfaceTypeDefinition",
  UNION_TYPE_DEFINITION: "UnionTypeDefinition",
  ENUM_TYPE_DEFINITION: "EnumTypeDefinition",
  ENUM_VALUE_DEFINITION: "EnumValueDefinition",
  INPUT_OBJECT_TYPE_DEFINITION: "InputObjectTypeDefinition",
  DIRECTIVE_DEFINITION: "DirectiveDefinition",
  SCHEMA_EXTENSION: "SchemaExtension",
  SCALAR_TYPE_EXTENSION: "ScalarTypeExtension",
  OBJECT_TYPE_EXTENSION: "ObjectTypeExtension",
  INTERFACE_TYPE_EXTENSION: "InterfaceTypeExtension",
  UNION_TYPE_EXTENSION: "UnionTypeExtension",
  ENUM_TYPE_EXTENSION: "EnumTypeExtension",
  INPUT_OBJECT_TYPE_EXTENSION: "InputObjectTypeExtension"
});
function syntaxError(source, position, description) {
  return new GraphQLError("Syntax Error: ".concat(description), void 0, source, [position]);
}
function invariant(condition, message) {
  var booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message != null ? message : "Unexpected invariant triggered.");
  }
}
var nodejsCustomInspectSymbol = typeof Symbol === "function" && typeof Symbol.for === "function" ? Symbol.for("nodejs.util.inspect.custom") : void 0;
var nodejsCustomInspectSymbol$1 = nodejsCustomInspectSymbol;
function defineInspect(classObject) {
  var fn2 = classObject.prototype.toJSON;
  typeof fn2 === "function" || invariant(0);
  classObject.prototype.inspect = fn2;
  if (nodejsCustomInspectSymbol$1) {
    classObject.prototype[nodejsCustomInspectSymbol$1] = fn2;
  }
}
var Location = /* @__PURE__ */ function() {
  function Location2(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }
  var _proto = Location2.prototype;
  _proto.toJSON = function toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  };
  return Location2;
}();
defineInspect(Location);
var Token = /* @__PURE__ */ function() {
  function Token2(kind, start2, end, line, column, prev, value) {
    this.kind = kind;
    this.start = start2;
    this.end = end;
    this.line = line;
    this.column = column;
    this.value = value;
    this.prev = prev;
    this.next = null;
  }
  var _proto2 = Token2.prototype;
  _proto2.toJSON = function toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  };
  return Token2;
}();
defineInspect(Token);
function isNode(maybeNode) {
  return maybeNode != null && typeof maybeNode.kind === "string";
}
var TokenKind = Object.freeze({
  SOF: "<SOF>",
  EOF: "<EOF>",
  BANG: "!",
  DOLLAR: "$",
  AMP: "&",
  PAREN_L: "(",
  PAREN_R: ")",
  SPREAD: "...",
  COLON: ":",
  EQUALS: "=",
  AT: "@",
  BRACKET_L: "[",
  BRACKET_R: "]",
  BRACE_L: "{",
  PIPE: "|",
  BRACE_R: "}",
  NAME: "Name",
  INT: "Int",
  FLOAT: "Float",
  STRING: "String",
  BLOCK_STRING: "BlockString",
  COMMENT: "Comment"
});
function _typeof$6(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$6 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$6 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$6(obj);
}
var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (_typeof$6(value)) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? "[function ".concat(value.name, "]") : "[function]";
    case "object":
      if (value === null) {
        return "null";
      }
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatObjectValue(value, previouslySeenValues) {
  if (previouslySeenValues.indexOf(value) !== -1) {
    return "[Circular]";
  }
  var seenValues = [].concat(previouslySeenValues, [value]);
  var customInspectFn = getCustomFn(value);
  if (customInspectFn !== void 0) {
    var customValue = customInspectFn.call(value);
    if (customValue !== value) {
      return typeof customValue === "string" ? customValue : formatValue(customValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function formatObject(object, seenValues) {
  var keys = Object.keys(object);
  if (keys.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object) + "]";
  }
  var properties = keys.map(function(key) {
    var value = formatValue(object[key], seenValues);
    return key + ": " + value;
  });
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  var len = Math.min(MAX_ARRAY_LENGTH, array.length);
  var remaining = array.length - len;
  var items = [];
  for (var i3 = 0; i3 < len; ++i3) {
    items.push(formatValue(array[i3], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push("... ".concat(remaining, " more items"));
  }
  return "[" + items.join(", ") + "]";
}
function getCustomFn(object) {
  var customInspectFn = object[String(nodejsCustomInspectSymbol$1)];
  if (typeof customInspectFn === "function") {
    return customInspectFn;
  }
  if (typeof object.inspect === "function") {
    return object.inspect;
  }
}
function getObjectTag(object) {
  var tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    var name = object.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}
function devAssert(condition, message) {
  var booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message);
  }
}
var instanceOf = function instanceOf2(value, constructor) {
  return value instanceof constructor;
};
function _defineProperties$3(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$3(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$3(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$3(Constructor, staticProps);
  return Constructor;
}
var Source = /* @__PURE__ */ function() {
  function Source2(body) {
    var name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "GraphQL request";
    var locationOffset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
      line: 1,
      column: 1
    };
    typeof body === "string" || devAssert(0, "Body must be a string. Received: ".concat(inspect(body), "."));
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 || devAssert(0, "line in locationOffset is 1-indexed and must be positive.");
    this.locationOffset.column > 0 || devAssert(0, "column in locationOffset is 1-indexed and must be positive.");
  }
  _createClass$3(Source2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get2() {
      return "Source";
    }
  }]);
  return Source2;
}();
function isSource(source) {
  return instanceOf(source, Source);
}
var DirectiveLocation = Object.freeze({
  QUERY: "QUERY",
  MUTATION: "MUTATION",
  SUBSCRIPTION: "SUBSCRIPTION",
  FIELD: "FIELD",
  FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION",
  FRAGMENT_SPREAD: "FRAGMENT_SPREAD",
  INLINE_FRAGMENT: "INLINE_FRAGMENT",
  VARIABLE_DEFINITION: "VARIABLE_DEFINITION",
  SCHEMA: "SCHEMA",
  SCALAR: "SCALAR",
  OBJECT: "OBJECT",
  FIELD_DEFINITION: "FIELD_DEFINITION",
  ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION",
  INTERFACE: "INTERFACE",
  UNION: "UNION",
  ENUM: "ENUM",
  ENUM_VALUE: "ENUM_VALUE",
  INPUT_OBJECT: "INPUT_OBJECT",
  INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION"
});
function dedentBlockStringValue(rawString) {
  var lines = rawString.split(/\r\n|[\n\r]/g);
  var commonIndent = getBlockStringIndentation(rawString);
  if (commonIndent !== 0) {
    for (var i3 = 1; i3 < lines.length; i3++) {
      lines[i3] = lines[i3].slice(commonIndent);
    }
  }
  var startLine = 0;
  while (startLine < lines.length && isBlank(lines[startLine])) {
    ++startLine;
  }
  var endLine = lines.length;
  while (endLine > startLine && isBlank(lines[endLine - 1])) {
    --endLine;
  }
  return lines.slice(startLine, endLine).join("\n");
}
function isBlank(str) {
  for (var i3 = 0; i3 < str.length; ++i3) {
    if (str[i3] !== " " && str[i3] !== "	") {
      return false;
    }
  }
  return true;
}
function getBlockStringIndentation(value) {
  var _commonIndent;
  var isFirstLine = true;
  var isEmptyLine = true;
  var indent2 = 0;
  var commonIndent = null;
  for (var i3 = 0; i3 < value.length; ++i3) {
    switch (value.charCodeAt(i3)) {
      case 13:
        if (value.charCodeAt(i3 + 1) === 10) {
          ++i3;
        }
      case 10:
        isFirstLine = false;
        isEmptyLine = true;
        indent2 = 0;
        break;
      case 9:
      case 32:
        ++indent2;
        break;
      default:
        if (isEmptyLine && !isFirstLine && (commonIndent === null || indent2 < commonIndent)) {
          commonIndent = indent2;
        }
        isEmptyLine = false;
    }
  }
  return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
}
function printBlockString(value) {
  var indentation = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var preferMultipleLines = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var isSingleLine = value.indexOf("\n") === -1;
  var hasLeadingSpace = value[0] === " " || value[0] === "	";
  var hasTrailingQuote = value[value.length - 1] === '"';
  var hasTrailingSlash = value[value.length - 1] === "\\";
  var printAsMultipleLines = !isSingleLine || hasTrailingQuote || hasTrailingSlash || preferMultipleLines;
  var result2 = "";
  if (printAsMultipleLines && !(isSingleLine && hasLeadingSpace)) {
    result2 += "\n" + indentation;
  }
  result2 += indentation ? value.replace(/\n/g, "\n" + indentation) : value;
  if (printAsMultipleLines) {
    result2 += "\n";
  }
  return '"""' + result2.replace(/"""/g, '\\"""') + '"""';
}
var Lexer = /* @__PURE__ */ function() {
  function Lexer2(source) {
    var startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0, null);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }
  var _proto = Lexer2.prototype;
  _proto.advance = function advance() {
    this.lastToken = this.token;
    var token = this.token = this.lookahead();
    return token;
  };
  _proto.lookahead = function lookahead() {
    var token = this.token;
    if (token.kind !== TokenKind.EOF) {
      do {
        var _token$next;
        token = (_token$next = token.next) !== null && _token$next !== void 0 ? _token$next : token.next = readToken(this, token);
      } while (token.kind === TokenKind.COMMENT);
    }
    return token;
  };
  return Lexer2;
}();
function isPunctuatorTokenKind(kind) {
  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
}
function printCharCode(code) {
  return isNaN(code) ? TokenKind.EOF : code < 127 ? JSON.stringify(String.fromCharCode(code)) : '"\\u'.concat(("00" + code.toString(16).toUpperCase()).slice(-4), '"');
}
function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;
  var pos = prev.end;
  while (pos < bodyLength) {
    var code = body.charCodeAt(pos);
    var _line = lexer.line;
    var _col = 1 + pos - lexer.lineStart;
    switch (code) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++pos;
        continue;
      case 10:
        ++pos;
        ++lexer.line;
        lexer.lineStart = pos;
        continue;
      case 13:
        if (body.charCodeAt(pos + 1) === 10) {
          pos += 2;
        } else {
          ++pos;
        }
        ++lexer.line;
        lexer.lineStart = pos;
        continue;
      case 33:
        return new Token(TokenKind.BANG, pos, pos + 1, _line, _col, prev);
      case 35:
        return readComment(source, pos, _line, _col, prev);
      case 36:
        return new Token(TokenKind.DOLLAR, pos, pos + 1, _line, _col, prev);
      case 38:
        return new Token(TokenKind.AMP, pos, pos + 1, _line, _col, prev);
      case 40:
        return new Token(TokenKind.PAREN_L, pos, pos + 1, _line, _col, prev);
      case 41:
        return new Token(TokenKind.PAREN_R, pos, pos + 1, _line, _col, prev);
      case 46:
        if (body.charCodeAt(pos + 1) === 46 && body.charCodeAt(pos + 2) === 46) {
          return new Token(TokenKind.SPREAD, pos, pos + 3, _line, _col, prev);
        }
        break;
      case 58:
        return new Token(TokenKind.COLON, pos, pos + 1, _line, _col, prev);
      case 61:
        return new Token(TokenKind.EQUALS, pos, pos + 1, _line, _col, prev);
      case 64:
        return new Token(TokenKind.AT, pos, pos + 1, _line, _col, prev);
      case 91:
        return new Token(TokenKind.BRACKET_L, pos, pos + 1, _line, _col, prev);
      case 93:
        return new Token(TokenKind.BRACKET_R, pos, pos + 1, _line, _col, prev);
      case 123:
        return new Token(TokenKind.BRACE_L, pos, pos + 1, _line, _col, prev);
      case 124:
        return new Token(TokenKind.PIPE, pos, pos + 1, _line, _col, prev);
      case 125:
        return new Token(TokenKind.BRACE_R, pos, pos + 1, _line, _col, prev);
      case 34:
        if (body.charCodeAt(pos + 1) === 34 && body.charCodeAt(pos + 2) === 34) {
          return readBlockString(source, pos, _line, _col, prev, lexer);
        }
        return readString(source, pos, _line, _col, prev);
      case 45:
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return readNumber(source, pos, code, _line, _col, prev);
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
      case 75:
      case 76:
      case 77:
      case 78:
      case 79:
      case 80:
      case 81:
      case 82:
      case 83:
      case 84:
      case 85:
      case 86:
      case 87:
      case 88:
      case 89:
      case 90:
      case 95:
      case 97:
      case 98:
      case 99:
      case 100:
      case 101:
      case 102:
      case 103:
      case 104:
      case 105:
      case 106:
      case 107:
      case 108:
      case 109:
      case 110:
      case 111:
      case 112:
      case 113:
      case 114:
      case 115:
      case 116:
      case 117:
      case 118:
      case 119:
      case 120:
      case 121:
      case 122:
        return readName(source, pos, _line, _col, prev);
    }
    throw syntaxError(source, pos, unexpectedCharacterMessage(code));
  }
  var line = lexer.line;
  var col = 1 + pos - lexer.lineStart;
  return new Token(TokenKind.EOF, bodyLength, bodyLength, line, col, prev);
}
function unexpectedCharacterMessage(code) {
  if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
    return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
  }
  if (code === 39) {
    return `Unexpected single quote character ('), did you mean to use a double quote (")?`;
  }
  return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
}
function readComment(source, start2, line, col, prev) {
  var body = source.body;
  var code;
  var position = start2;
  do {
    code = body.charCodeAt(++position);
  } while (!isNaN(code) && (code > 31 || code === 9));
  return new Token(TokenKind.COMMENT, start2, position, line, col, prev, body.slice(start2 + 1, position));
}
function readNumber(source, start2, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start2;
  var isFloat = false;
  if (code === 45) {
    code = body.charCodeAt(++position);
  }
  if (code === 48) {
    code = body.charCodeAt(++position);
    if (code >= 48 && code <= 57) {
      throw syntaxError(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
    }
  } else {
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 69 || code === 101) {
    isFloat = true;
    code = body.charCodeAt(++position);
    if (code === 43 || code === 45) {
      code = body.charCodeAt(++position);
    }
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46 || isNameStart(code)) {
    throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
  }
  return new Token(isFloat ? TokenKind.FLOAT : TokenKind.INT, start2, position, line, col, prev, body.slice(start2, position));
}
function readDigits(source, start2, firstCode) {
  var body = source.body;
  var position = start2;
  var code = firstCode;
  if (code >= 48 && code <= 57) {
    do {
      code = body.charCodeAt(++position);
    } while (code >= 48 && code <= 57);
    return position;
  }
  throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
}
function readString(source, start2, line, col, prev) {
  var body = source.body;
  var position = start2 + 1;
  var chunkStart = position;
  var code = 0;
  var value = "";
  while (position < body.length && !isNaN(code = body.charCodeAt(position)) && code !== 10 && code !== 13) {
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return new Token(TokenKind.STRING, start2, position + 1, line, col, prev, value);
    }
    if (code < 32 && code !== 9) {
      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }
    ++position;
    if (code === 92) {
      value += body.slice(chunkStart, position - 1);
      code = body.charCodeAt(position);
      switch (code) {
        case 34:
          value += '"';
          break;
        case 47:
          value += "/";
          break;
        case 92:
          value += "\\";
          break;
        case 98:
          value += "\b";
          break;
        case 102:
          value += "\f";
          break;
        case 110:
          value += "\n";
          break;
        case 114:
          value += "\r";
          break;
        case 116:
          value += "	";
          break;
        case 117: {
          var charCode = uniCharCode(body.charCodeAt(position + 1), body.charCodeAt(position + 2), body.charCodeAt(position + 3), body.charCodeAt(position + 4));
          if (charCode < 0) {
            var invalidSequence = body.slice(position + 1, position + 5);
            throw syntaxError(source, position, "Invalid character escape sequence: \\u".concat(invalidSequence, "."));
          }
          value += String.fromCharCode(charCode);
          position += 4;
          break;
        }
        default:
          throw syntaxError(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
      }
      ++position;
      chunkStart = position;
    }
  }
  throw syntaxError(source, position, "Unterminated string.");
}
function readBlockString(source, start2, line, col, prev, lexer) {
  var body = source.body;
  var position = start2 + 3;
  var chunkStart = position;
  var code = 0;
  var rawValue = "";
  while (position < body.length && !isNaN(code = body.charCodeAt(position))) {
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      rawValue += body.slice(chunkStart, position);
      return new Token(TokenKind.BLOCK_STRING, start2, position + 3, line, col, prev, dedentBlockStringValue(rawValue));
    }
    if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }
    if (code === 10) {
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      if (body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
      rawValue += body.slice(chunkStart, position) + '"""';
      position += 4;
      chunkStart = position;
    } else {
      ++position;
    }
  }
  throw syntaxError(source, position, "Unterminated string.");
}
function uniCharCode(a4, b3, c2, d4) {
  return char2hex(a4) << 12 | char2hex(b3) << 8 | char2hex(c2) << 4 | char2hex(d4);
}
function char2hex(a4) {
  return a4 >= 48 && a4 <= 57 ? a4 - 48 : a4 >= 65 && a4 <= 70 ? a4 - 55 : a4 >= 97 && a4 <= 102 ? a4 - 87 : -1;
}
function readName(source, start2, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var position = start2 + 1;
  var code = 0;
  while (position !== bodyLength && !isNaN(code = body.charCodeAt(position)) && (code === 95 || code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122)) {
    ++position;
  }
  return new Token(TokenKind.NAME, start2, position, line, col, prev, body.slice(start2, position));
}
function isNameStart(code) {
  return code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
}
function parse$1(source, options) {
  var parser = new Parser(source, options);
  return parser.parseDocument();
}
var Parser = /* @__PURE__ */ function() {
  function Parser2(source, options) {
    var sourceObj = isSource(source) ? source : new Source(source);
    this._lexer = new Lexer(sourceObj);
    this._options = options;
  }
  var _proto = Parser2.prototype;
  _proto.parseName = function parseName2() {
    var token = this.expectToken(TokenKind.NAME);
    return {
      kind: Kind.NAME,
      value: token.value,
      loc: this.loc(token)
    };
  };
  _proto.parseDocument = function parseDocument() {
    var start2 = this._lexer.token;
    return {
      kind: Kind.DOCUMENT,
      definitions: this.many(TokenKind.SOF, this.parseDefinition, TokenKind.EOF),
      loc: this.loc(start2)
    };
  };
  _proto.parseDefinition = function parseDefinition() {
    if (this.peek(TokenKind.NAME)) {
      switch (this._lexer.token.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "schema":
        case "scalar":
        case "type":
        case "interface":
        case "union":
        case "enum":
        case "input":
        case "directive":
          return this.parseTypeSystemDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    } else if (this.peek(TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    } else if (this.peekDescription()) {
      return this.parseTypeSystemDefinition();
    }
    throw this.unexpected();
  };
  _proto.parseOperationDefinition = function parseOperationDefinition() {
    var start2 = this._lexer.token;
    if (this.peek(TokenKind.BRACE_L)) {
      return {
        kind: Kind.OPERATION_DEFINITION,
        operation: "query",
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start2)
      };
    }
    var operation = this.parseOperationType();
    var name;
    if (this.peek(TokenKind.NAME)) {
      name = this.parseName();
    }
    return {
      kind: Kind.OPERATION_DEFINITION,
      operation,
      name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start2)
    };
  };
  _proto.parseOperationType = function parseOperationType() {
    var operationToken = this.expectToken(TokenKind.NAME);
    switch (operationToken.value) {
      case "query":
        return "query";
      case "mutation":
        return "mutation";
      case "subscription":
        return "subscription";
    }
    throw this.unexpected(operationToken);
  };
  _proto.parseVariableDefinitions = function parseVariableDefinitions() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseVariableDefinition, TokenKind.PAREN_R);
  };
  _proto.parseVariableDefinition = function parseVariableDefinition() {
    var start2 = this._lexer.token;
    return {
      kind: Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseValueLiteral(true) : void 0,
      directives: this.parseDirectives(true),
      loc: this.loc(start2)
    };
  };
  _proto.parseVariable = function parseVariable() {
    var start2 = this._lexer.token;
    this.expectToken(TokenKind.DOLLAR);
    return {
      kind: Kind.VARIABLE,
      name: this.parseName(),
      loc: this.loc(start2)
    };
  };
  _proto.parseSelectionSet = function parseSelectionSet() {
    var start2 = this._lexer.token;
    return {
      kind: Kind.SELECTION_SET,
      selections: this.many(TokenKind.BRACE_L, this.parseSelection, TokenKind.BRACE_R),
      loc: this.loc(start2)
    };
  };
  _proto.parseSelection = function parseSelection() {
    return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
  };
  _proto.parseField = function parseField() {
    var start2 = this._lexer.token;
    var nameOrAlias = this.parseName();
    var alias;
    var name;
    if (this.expectOptionalToken(TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }
    return {
      kind: Kind.FIELD,
      alias,
      name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0,
      loc: this.loc(start2)
    };
  };
  _proto.parseArguments = function parseArguments(isConst) {
    var item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
  };
  _proto.parseArgument = function parseArgument() {
    var start2 = this._lexer.token;
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return {
      kind: Kind.ARGUMENT,
      name,
      value: this.parseValueLiteral(false),
      loc: this.loc(start2)
    };
  };
  _proto.parseConstArgument = function parseConstArgument() {
    var start2 = this._lexer.token;
    return {
      kind: Kind.ARGUMENT,
      name: this.parseName(),
      value: (this.expectToken(TokenKind.COLON), this.parseValueLiteral(true)),
      loc: this.loc(start2)
    };
  };
  _proto.parseFragment = function parseFragment() {
    var start2 = this._lexer.token;
    this.expectToken(TokenKind.SPREAD);
    var hasTypeCondition = this.expectOptionalKeyword("on");
    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
      return {
        kind: Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false),
        loc: this.loc(start2)
      };
    }
    return {
      kind: Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start2)
    };
  };
  _proto.parseFragmentDefinition = function parseFragmentDefinition() {
    var _this$_options;
    var start2 = this._lexer.token;
    this.expectKeyword("fragment");
    if (((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.experimentalFragmentVariables) === true) {
      return {
        kind: Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start2)
      };
    }
    return {
      kind: Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start2)
    };
  };
  _proto.parseFragmentName = function parseFragmentName() {
    if (this._lexer.token.value === "on") {
      throw this.unexpected();
    }
    return this.parseName();
  };
  _proto.parseValueLiteral = function parseValueLiteral(isConst) {
    var token = this._lexer.token;
    switch (token.kind) {
      case TokenKind.BRACKET_L:
        return this.parseList(isConst);
      case TokenKind.BRACE_L:
        return this.parseObject(isConst);
      case TokenKind.INT:
        this._lexer.advance();
        return {
          kind: Kind.INT,
          value: token.value,
          loc: this.loc(token)
        };
      case TokenKind.FLOAT:
        this._lexer.advance();
        return {
          kind: Kind.FLOAT,
          value: token.value,
          loc: this.loc(token)
        };
      case TokenKind.STRING:
      case TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();
      case TokenKind.NAME:
        this._lexer.advance();
        switch (token.value) {
          case "true":
            return {
              kind: Kind.BOOLEAN,
              value: true,
              loc: this.loc(token)
            };
          case "false":
            return {
              kind: Kind.BOOLEAN,
              value: false,
              loc: this.loc(token)
            };
          case "null":
            return {
              kind: Kind.NULL,
              loc: this.loc(token)
            };
          default:
            return {
              kind: Kind.ENUM,
              value: token.value,
              loc: this.loc(token)
            };
        }
      case TokenKind.DOLLAR:
        if (!isConst) {
          return this.parseVariable();
        }
        break;
    }
    throw this.unexpected();
  };
  _proto.parseStringLiteral = function parseStringLiteral() {
    var token = this._lexer.token;
    this._lexer.advance();
    return {
      kind: Kind.STRING,
      value: token.value,
      block: token.kind === TokenKind.BLOCK_STRING,
      loc: this.loc(token)
    };
  };
  _proto.parseList = function parseList(isConst) {
    var _this = this;
    var start2 = this._lexer.token;
    var item = function item2() {
      return _this.parseValueLiteral(isConst);
    };
    return {
      kind: Kind.LIST,
      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
      loc: this.loc(start2)
    };
  };
  _proto.parseObject = function parseObject(isConst) {
    var _this2 = this;
    var start2 = this._lexer.token;
    var item = function item2() {
      return _this2.parseObjectField(isConst);
    };
    return {
      kind: Kind.OBJECT,
      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R),
      loc: this.loc(start2)
    };
  };
  _proto.parseObjectField = function parseObjectField(isConst) {
    var start2 = this._lexer.token;
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return {
      kind: Kind.OBJECT_FIELD,
      name,
      value: this.parseValueLiteral(isConst),
      loc: this.loc(start2)
    };
  };
  _proto.parseDirectives = function parseDirectives(isConst) {
    var directives = [];
    while (this.peek(TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }
    return directives;
  };
  _proto.parseDirective = function parseDirective(isConst) {
    var start2 = this._lexer.token;
    this.expectToken(TokenKind.AT);
    return {
      kind: Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst),
      loc: this.loc(start2)
    };
  };
  _proto.parseTypeReference = function parseTypeReference() {
    var start2 = this._lexer.token;
    var type;
    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
      type = this.parseTypeReference();
      this.expectToken(TokenKind.BRACKET_R);
      type = {
        kind: Kind.LIST_TYPE,
        type,
        loc: this.loc(start2)
      };
    } else {
      type = this.parseNamedType();
    }
    if (this.expectOptionalToken(TokenKind.BANG)) {
      return {
        kind: Kind.NON_NULL_TYPE,
        type,
        loc: this.loc(start2)
      };
    }
    return type;
  };
  _proto.parseNamedType = function parseNamedType() {
    var start2 = this._lexer.token;
    return {
      kind: Kind.NAMED_TYPE,
      name: this.parseName(),
      loc: this.loc(start2)
    };
  };
  _proto.parseTypeSystemDefinition = function parseTypeSystemDefinition() {
    var keywordToken = this.peekDescription() ? this._lexer.lookahead() : this._lexer.token;
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
    }
    throw this.unexpected(keywordToken);
  };
  _proto.peekDescription = function peekDescription() {
    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
  };
  _proto.parseDescription = function parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  };
  _proto.parseSchemaDefinition = function parseSchemaDefinition() {
    var start2 = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("schema");
    var directives = this.parseDirectives(true);
    var operationTypes = this.many(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    return {
      kind: Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes,
      loc: this.loc(start2)
    };
  };
  _proto.parseOperationTypeDefinition = function parseOperationTypeDefinition() {
    var start2 = this._lexer.token;
    var operation = this.parseOperationType();
    this.expectToken(TokenKind.COLON);
    var type = this.parseNamedType();
    return {
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type,
      loc: this.loc(start2)
    };
  };
  _proto.parseScalarTypeDefinition = function parseScalarTypeDefinition() {
    var start2 = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("scalar");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.SCALAR_TYPE_DEFINITION,
      description,
      name,
      directives,
      loc: this.loc(start2)
    };
  };
  _proto.parseObjectTypeDefinition = function parseObjectTypeDefinition() {
    var start2 = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("type");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    return {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
      loc: this.loc(start2)
    };
  };
  _proto.parseImplementsInterfaces = function parseImplementsInterfaces() {
    var _this$_options2;
    if (!this.expectOptionalKeyword("implements")) {
      return [];
    }
    if (((_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.allowLegacySDLImplementsInterfaces) === true) {
      var types = [];
      this.expectOptionalToken(TokenKind.AMP);
      do {
        types.push(this.parseNamedType());
      } while (this.expectOptionalToken(TokenKind.AMP) || this.peek(TokenKind.NAME));
      return types;
    }
    return this.delimitedMany(TokenKind.AMP, this.parseNamedType);
  };
  _proto.parseFieldsDefinition = function parseFieldsDefinition() {
    var _this$_options3;
    if (((_this$_options3 = this._options) === null || _this$_options3 === void 0 ? void 0 : _this$_options3.allowLegacySDLEmptyFields) === true && this.peek(TokenKind.BRACE_L) && this._lexer.lookahead().kind === TokenKind.BRACE_R) {
      this._lexer.advance();
      this._lexer.advance();
      return [];
    }
    return this.optionalMany(TokenKind.BRACE_L, this.parseFieldDefinition, TokenKind.BRACE_R);
  };
  _proto.parseFieldDefinition = function parseFieldDefinition() {
    var start2 = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    this.expectToken(TokenKind.COLON);
    var type = this.parseTypeReference();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.FIELD_DEFINITION,
      description,
      name,
      arguments: args,
      type,
      directives,
      loc: this.loc(start2)
    };
  };
  _proto.parseArgumentDefs = function parseArgumentDefs() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseInputValueDef, TokenKind.PAREN_R);
  };
  _proto.parseInputValueDef = function parseInputValueDef() {
    var start2 = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    var type = this.parseTypeReference();
    var defaultValue;
    if (this.expectOptionalToken(TokenKind.EQUALS)) {
      defaultValue = this.parseValueLiteral(true);
    }
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.INPUT_VALUE_DEFINITION,
      description,
      name,
      type,
      defaultValue,
      directives,
      loc: this.loc(start2)
    };
  };
  _proto.parseInterfaceTypeDefinition = function parseInterfaceTypeDefinition() {
    var start2 = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("interface");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    return {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
      loc: this.loc(start2)
    };
  };
  _proto.parseUnionTypeDefinition = function parseUnionTypeDefinition() {
    var start2 = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("union");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();
    return {
      kind: Kind.UNION_TYPE_DEFINITION,
      description,
      name,
      directives,
      types,
      loc: this.loc(start2)
    };
  };
  _proto.parseUnionMemberTypes = function parseUnionMemberTypes() {
    return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
  };
  _proto.parseEnumTypeDefinition = function parseEnumTypeDefinition() {
    var start2 = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("enum");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();
    return {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description,
      name,
      directives,
      values,
      loc: this.loc(start2)
    };
  };
  _proto.parseEnumValuesDefinition = function parseEnumValuesDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseEnumValueDefinition, TokenKind.BRACE_R);
  };
  _proto.parseEnumValueDefinition = function parseEnumValueDefinition() {
    var start2 = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.ENUM_VALUE_DEFINITION,
      description,
      name,
      directives,
      loc: this.loc(start2)
    };
  };
  _proto.parseInputObjectTypeDefinition = function parseInputObjectTypeDefinition() {
    var start2 = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("input");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields = this.parseInputFieldsDefinition();
    return {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name,
      directives,
      fields,
      loc: this.loc(start2)
    };
  };
  _proto.parseInputFieldsDefinition = function parseInputFieldsDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseInputValueDef, TokenKind.BRACE_R);
  };
  _proto.parseTypeSystemExtension = function parseTypeSystemExtension() {
    var keywordToken = this._lexer.lookahead();
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    }
    throw this.unexpected(keywordToken);
  };
  _proto.parseSchemaExtension = function parseSchemaExtension() {
    var start2 = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("schema");
    var directives = this.parseDirectives(true);
    var operationTypes = this.optionalMany(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes,
      loc: this.loc(start2)
    };
  };
  _proto.parseScalarTypeExtension = function parseScalarTypeExtension() {
    var start2 = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("scalar");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    if (directives.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.SCALAR_TYPE_EXTENSION,
      name,
      directives,
      loc: this.loc(start2)
    };
  };
  _proto.parseObjectTypeExtension = function parseObjectTypeExtension() {
    var start2 = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("type");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
      loc: this.loc(start2)
    };
  };
  _proto.parseInterfaceTypeExtension = function parseInterfaceTypeExtension() {
    var start2 = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("interface");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.INTERFACE_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
      loc: this.loc(start2)
    };
  };
  _proto.parseUnionTypeExtension = function parseUnionTypeExtension() {
    var start2 = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("union");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();
    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.UNION_TYPE_EXTENSION,
      name,
      directives,
      types,
      loc: this.loc(start2)
    };
  };
  _proto.parseEnumTypeExtension = function parseEnumTypeExtension() {
    var start2 = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("enum");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();
    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.ENUM_TYPE_EXTENSION,
      name,
      directives,
      values,
      loc: this.loc(start2)
    };
  };
  _proto.parseInputObjectTypeExtension = function parseInputObjectTypeExtension() {
    var start2 = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("input");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields = this.parseInputFieldsDefinition();
    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name,
      directives,
      fields,
      loc: this.loc(start2)
    };
  };
  _proto.parseDirectiveDefinition = function parseDirectiveDefinition() {
    var start2 = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("directive");
    this.expectToken(TokenKind.AT);
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    var repeatable = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    var locations = this.parseDirectiveLocations();
    return {
      kind: Kind.DIRECTIVE_DEFINITION,
      description,
      name,
      arguments: args,
      repeatable,
      locations,
      loc: this.loc(start2)
    };
  };
  _proto.parseDirectiveLocations = function parseDirectiveLocations() {
    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
  };
  _proto.parseDirectiveLocation = function parseDirectiveLocation() {
    var start2 = this._lexer.token;
    var name = this.parseName();
    if (DirectiveLocation[name.value] !== void 0) {
      return name;
    }
    throw this.unexpected(start2);
  };
  _proto.loc = function loc(startToken) {
    var _this$_options4;
    if (((_this$_options4 = this._options) === null || _this$_options4 === void 0 ? void 0 : _this$_options4.noLocation) !== true) {
      return new Location(startToken, this._lexer.lastToken, this._lexer.source);
    }
  };
  _proto.peek = function peek(kind) {
    return this._lexer.token.kind === kind;
  };
  _proto.expectToken = function expectToken(kind) {
    var token = this._lexer.token;
    if (token.kind === kind) {
      this._lexer.advance();
      return token;
    }
    throw syntaxError(this._lexer.source, token.start, "Expected ".concat(getTokenKindDesc(kind), ", found ").concat(getTokenDesc(token), "."));
  };
  _proto.expectOptionalToken = function expectOptionalToken(kind) {
    var token = this._lexer.token;
    if (token.kind === kind) {
      this._lexer.advance();
      return token;
    }
    return void 0;
  };
  _proto.expectKeyword = function expectKeyword(value) {
    var token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this._lexer.advance();
    } else {
      throw syntaxError(this._lexer.source, token.start, 'Expected "'.concat(value, '", found ').concat(getTokenDesc(token), "."));
    }
  };
  _proto.expectOptionalKeyword = function expectOptionalKeyword(value) {
    var token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this._lexer.advance();
      return true;
    }
    return false;
  };
  _proto.unexpected = function unexpected(atToken) {
    var token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return syntaxError(this._lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token), "."));
  };
  _proto.any = function any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];
    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }
    return nodes;
  };
  _proto.optionalMany = function optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      var nodes = [];
      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));
      return nodes;
    }
    return [];
  };
  _proto.many = function many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));
    return nodes;
  };
  _proto.delimitedMany = function delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    var nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));
    return nodes;
  };
  return Parser2;
}();
function getTokenDesc(token) {
  var value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ' "'.concat(value, '"') : "");
}
function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? '"'.concat(kind, '"') : kind;
}
var QueryDocumentKeys = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: ["name", "variableDefinitions", "directives", "selectionSet"],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: ["description", "name", "type", "defaultValue", "directives"],
  InterfaceTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
};
var BREAK = Object.freeze({});
function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : QueryDocumentKeys;
  var stack2 = void 0;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = void 0;
  var key = void 0;
  var parent = void 0;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? void 0 : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};
          for (var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++) {
            var k3 = _Object$keys2[_i2];
            clone[k3] = node[k3];
          }
          node = clone;
        }
        var editOffset = 0;
        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack2.index;
      keys = stack2.keys;
      edits = stack2.edits;
      inArray = stack2.inArray;
      stack2 = stack2.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : void 0;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === void 0) {
        continue;
      }
      if (parent) {
        path.push(key);
      }
    }
    var result2 = void 0;
    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error("Invalid AST Node: ".concat(inspect(node), "."));
      }
      var visitFn = getVisitFn(visitor, node.kind, isLeaving);
      if (visitFn) {
        result2 = visitFn.call(visitor, node, key, parent, path, ancestors);
        if (result2 === BREAK) {
          break;
        }
        if (result2 === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result2 !== void 0) {
          edits.push([key, result2]);
          if (!isLeaving) {
            if (isNode(result2)) {
              node = result2;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }
    if (result2 === void 0 && isEdited) {
      edits.push([key, node]);
    }
    if (isLeaving) {
      path.pop();
    } else {
      var _visitorKeys$node$kin;
      stack2 = {
        inArray,
        index,
        keys,
        edits,
        prev: stack2
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack2 !== void 0);
  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }
  return newRoot;
}
function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];
  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === "function") {
      return kindVisitor;
    }
    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;
    if (typeof kindSpecificVisitor === "function") {
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;
    if (specificVisitor) {
      if (typeof specificVisitor === "function") {
        return specificVisitor;
      }
      var specificKindVisitor = specificVisitor[kind];
      if (typeof specificKindVisitor === "function") {
        return specificKindVisitor;
      }
    }
  }
}
function print(ast) {
  return visit(ast, {
    leave: printDocASTReducer
  });
}
var MAX_LINE_LENGTH = 80;
var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return "$" + node.name;
  },
  Document: function Document(node) {
    return join(node.definitions, "\n\n") + "\n";
  },
  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap("(", join(node.variableDefinitions, ", "), ")");
    var directives = join(node.directives, " ");
    var selectionSet = node.selectionSet;
    return !name && !directives && !varDefs && op === "query" ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], " ");
  },
  VariableDefinition: function VariableDefinition(_ref2) {
    var variable = _ref2.variable, type = _ref2.type, defaultValue = _ref2.defaultValue, directives = _ref2.directives;
    return variable + ": " + type + wrap(" = ", defaultValue) + wrap(" ", join(directives, " "));
  },
  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },
  Field: function Field(_ref3) {
    var alias = _ref3.alias, name = _ref3.name, args = _ref3.arguments, directives = _ref3.directives, selectionSet = _ref3.selectionSet;
    var prefix = wrap("", alias, ": ") + name;
    var argsLine = prefix + wrap("(", join(args, ", "), ")");
    if (argsLine.length > MAX_LINE_LENGTH) {
      argsLine = prefix + wrap("(\n", indent(join(args, "\n")), "\n)");
    }
    return join([argsLine, join(directives, " "), selectionSet], " ");
  },
  Argument: function Argument(_ref4) {
    var name = _ref4.name, value = _ref4.value;
    return name + ": " + value;
  },
  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name, directives = _ref5.directives;
    return "..." + name + wrap(" ", join(directives, " "));
  },
  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition, directives = _ref6.directives, selectionSet = _ref6.selectionSet;
    return join(["...", wrap("on ", typeCondition), join(directives, " "), selectionSet], " ");
  },
  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name, typeCondition = _ref7.typeCondition, variableDefinitions = _ref7.variableDefinitions, directives = _ref7.directives, selectionSet = _ref7.selectionSet;
    return "fragment ".concat(name).concat(wrap("(", join(variableDefinitions, ", "), ")"), " ") + "on ".concat(typeCondition, " ").concat(wrap("", join(directives, " "), " ")) + selectionSet;
  },
  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10, key) {
    var value = _ref10.value, isBlockString = _ref10.block;
    return isBlockString ? printBlockString(value, key === "description" ? "" : "  ") : JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return value ? "true" : "false";
  },
  NullValue: function NullValue() {
    return "null";
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return "[" + join(values, ", ") + "]";
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return "{" + join(fields, ", ") + "}";
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name, value = _ref15.value;
    return name + ": " + value;
  },
  Directive: function Directive(_ref16) {
    var name = _ref16.name, args = _ref16.arguments;
    return "@" + name + wrap("(", join(args, ", "), ")");
  },
  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return "[" + type + "]";
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + "!";
  },
  SchemaDefinition: addDescription(function(_ref20) {
    var directives = _ref20.directives, operationTypes = _ref20.operationTypes;
    return join(["schema", join(directives, " "), block(operationTypes)], " ");
  }),
  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation, type = _ref21.type;
    return operation + ": " + type;
  },
  ScalarTypeDefinition: addDescription(function(_ref22) {
    var name = _ref22.name, directives = _ref22.directives;
    return join(["scalar", name, join(directives, " ")], " ");
  }),
  ObjectTypeDefinition: addDescription(function(_ref23) {
    var name = _ref23.name, interfaces = _ref23.interfaces, directives = _ref23.directives, fields = _ref23.fields;
    return join(["type", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
  }),
  FieldDefinition: addDescription(function(_ref24) {
    var name = _ref24.name, args = _ref24.arguments, type = _ref24.type, directives = _ref24.directives;
    return name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + ": " + type + wrap(" ", join(directives, " "));
  }),
  InputValueDefinition: addDescription(function(_ref25) {
    var name = _ref25.name, type = _ref25.type, defaultValue = _ref25.defaultValue, directives = _ref25.directives;
    return join([name + ": " + type, wrap("= ", defaultValue), join(directives, " ")], " ");
  }),
  InterfaceTypeDefinition: addDescription(function(_ref26) {
    var name = _ref26.name, interfaces = _ref26.interfaces, directives = _ref26.directives, fields = _ref26.fields;
    return join(["interface", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
  }),
  UnionTypeDefinition: addDescription(function(_ref27) {
    var name = _ref27.name, directives = _ref27.directives, types = _ref27.types;
    return join(["union", name, join(directives, " "), types && types.length !== 0 ? "= " + join(types, " | ") : ""], " ");
  }),
  EnumTypeDefinition: addDescription(function(_ref28) {
    var name = _ref28.name, directives = _ref28.directives, values = _ref28.values;
    return join(["enum", name, join(directives, " "), block(values)], " ");
  }),
  EnumValueDefinition: addDescription(function(_ref29) {
    var name = _ref29.name, directives = _ref29.directives;
    return join([name, join(directives, " ")], " ");
  }),
  InputObjectTypeDefinition: addDescription(function(_ref30) {
    var name = _ref30.name, directives = _ref30.directives, fields = _ref30.fields;
    return join(["input", name, join(directives, " "), block(fields)], " ");
  }),
  DirectiveDefinition: addDescription(function(_ref31) {
    var name = _ref31.name, args = _ref31.arguments, repeatable = _ref31.repeatable, locations = _ref31.locations;
    return "directive @" + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ");
  }),
  SchemaExtension: function SchemaExtension(_ref32) {
    var directives = _ref32.directives, operationTypes = _ref32.operationTypes;
    return join(["extend schema", join(directives, " "), block(operationTypes)], " ");
  },
  ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
    var name = _ref33.name, directives = _ref33.directives;
    return join(["extend scalar", name, join(directives, " ")], " ");
  },
  ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
    var name = _ref34.name, interfaces = _ref34.interfaces, directives = _ref34.directives, fields = _ref34.fields;
    return join(["extend type", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
  },
  InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
    var name = _ref35.name, interfaces = _ref35.interfaces, directives = _ref35.directives, fields = _ref35.fields;
    return join(["extend interface", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
  },
  UnionTypeExtension: function UnionTypeExtension(_ref36) {
    var name = _ref36.name, directives = _ref36.directives, types = _ref36.types;
    return join(["extend union", name, join(directives, " "), types && types.length !== 0 ? "= " + join(types, " | ") : ""], " ");
  },
  EnumTypeExtension: function EnumTypeExtension(_ref37) {
    var name = _ref37.name, directives = _ref37.directives, values = _ref37.values;
    return join(["extend enum", name, join(directives, " "), block(values)], " ");
  },
  InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
    var name = _ref38.name, directives = _ref38.directives, fields = _ref38.fields;
    return join(["extend input", name, join(directives, " "), block(fields)], " ");
  }
};
function addDescription(cb) {
  return function(node) {
    return join([node.description, cb(node)], "\n");
  };
}
function join(maybeArray) {
  var _maybeArray$filter$jo;
  var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function(x3) {
    return x3;
  }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
}
function block(array) {
  return wrap("{\n", indent(join(array, "\n")), "\n}");
}
function wrap(start2, maybeString) {
  var end = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  return maybeString != null && maybeString !== "" ? start2 + maybeString + end : "";
}
function indent(str) {
  return wrap("  ", str.replace(/\n/g, "\n  "));
}
function isMultiline(str) {
  return str.indexOf("\n") !== -1;
}
function hasMultilineItems(maybeArray) {
  return maybeArray != null && maybeArray.some(isMultiline);
}
function k$1(a4) {
  return "string" == typeof a4 ? new GraphQLError(a4) : "object" == typeof a4 && a4.message ? new GraphQLError(a4.message, a4.nodes, a4.source, a4.positions, a4.path, a4, a4.extensions || {}) : a4;
}
function l() {
  return this.message;
}
function n$2(a4, b3) {
  a4 |= 0;
  for (var c2 = 0, d4 = 0 | b3.length; c2 < d4; c2++) {
    a4 = (a4 << 5) + a4 + b3.charCodeAt(c2);
  }
  return a4;
}
function t$2(a4) {
  var b3, c2, d4, e3, f, g2;
  if (null === a4 || q$2.has(a4)) {
    return "null";
  }
  if ("object" != typeof a4) {
    return JSON.stringify(a4) || "";
  }
  if (a4.toJSON) {
    return t$2(a4.toJSON());
  }
  if (Array.isArray(a4)) {
    for (b3 = "[", c2 = 0, d4 = a4.length; c2 < d4; c2++) {
      0 < c2 && (b3 += ",");
      b3 += 0 < (e3 = t$2(a4[c2])).length ? e3 : "null";
    }
    return b3 + "]";
  }
  if (!(b3 = Object.keys(a4).sort()).length && a4.constructor && a4.constructor !== Object) {
    return b3 = r$2.get(a4) || Math.random().toString(36).slice(2), r$2.set(a4, b3), '{"__key":"' + b3 + '"}';
  }
  q$2.add(a4);
  c2 = "{";
  d4 = 0;
  for (e3 = b3.length; d4 < e3; d4++) {
    (g2 = t$2(a4[f = b3[d4]])) && (1 < c2.length && (c2 += ","), c2 += t$2(f) + ":" + g2);
  }
  q$2.delete(a4);
  return c2 + "}";
}
function u$1(a4) {
  q$2.clear();
  return t$2(a4);
}
function v$2(a4) {
  var b3 = ("string" != typeof a4 ? a4.loc && a4.loc.source.body || print(a4) : a4).replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
  "string" != typeof a4 && (a4.loc ? (a4 = "definitions" in a4 && w$2(a4)) && (b3 = "# " + a4 + "\n" + b3) : a4.loc = {
    start: 0,
    end: b3.length,
    source: {
      body: b3,
      name: "gql",
      locationOffset: {
        line: 1,
        column: 1
      }
    }
  });
  return b3;
}
function y$2(a4) {
  if ("string" == typeof a4) {
    var b3 = n$2(5381, v$2(a4)) >>> 0;
    a4 = x$3.get(b3) || parse$1(a4, {
      noLocation: true
    });
  } else {
    b3 = a4.__key || n$2(5381, v$2(a4)) >>> 0, a4 = x$3.get(b3) || a4;
  }
  a4.loc || v$2(a4);
  a4.__key = b3;
  x$3.set(b3, a4);
  return a4;
}
function w$2(a4) {
  var b3, c2, d4;
  for (b3 = 0, c2 = a4.definitions.length; b3 < c2; b3++) {
    if ((d4 = a4.definitions[b3]).kind === Kind.OPERATION_DEFINITION && d4.name) {
      return d4.name.value;
    }
  }
}
function z$3(a4, b3, c2) {
  return {
    operation: a4,
    data: b3.data,
    error: Array.isArray(b3.errors) ? new m$1({
      graphQLErrors: b3.errors,
      response: c2
    }) : void 0,
    extensions: "object" == typeof b3.extensions && b3.extensions || void 0
  };
}
function A$2(a4, b3, c2) {
  return {
    operation: a4,
    data: void 0,
    error: new m$1({
      networkError: b3,
      response: c2
    }),
    extensions: void 0
  };
}
function B$1() {
  return (B$1 = Object.assign || function(a4) {
    var b3, c2, d4;
    for (b3 = 1; b3 < arguments.length; b3++) {
      c2 = arguments[b3];
      for (d4 in c2) {
        Object.prototype.hasOwnProperty.call(c2, d4) && (a4[d4] = c2[d4]);
      }
    }
    return a4;
  }).apply(this, arguments);
}
function makeFetchBody(a4) {
  return {
    query: print(a4.query),
    operationName: w$2(a4.query),
    variables: a4.variables || void 0,
    extensions: void 0
  };
}
function makeFetchURL(a4, b3) {
  var c2 = a4.context.url;
  if ("query" !== a4.kind || !a4.context.preferGetMethod || !b3) {
    return c2;
  }
  a4 = [];
  b3.operationName && a4.push("operationName=" + encodeURIComponent(b3.operationName));
  b3.query && a4.push("query=" + encodeURIComponent(b3.query.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim()));
  b3.variables && a4.push("variables=" + encodeURIComponent(u$1(b3.variables)));
  b3.extensions && a4.push("extensions=" + encodeURIComponent(u$1(b3.extensions)));
  return c2 + "?" + a4.join("&");
}
function makeFetchOptions(a4, b3) {
  var c2 = "query" === a4.kind && !!a4.context.preferGetMethod;
  return B$1({}, a4 = "function" == typeof a4.context.fetchOptions ? a4.context.fetchOptions() : a4.context.fetchOptions || {}, {
    body: !c2 && b3 ? JSON.stringify(b3) : void 0,
    method: c2 ? "GET" : "POST",
    headers: c2 ? a4.headers : B$1({}, {
      "content-type": "application/json"
    }, a4.headers)
  });
}
function makeFetchSource(a4, b3, c2) {
  return make$1(function(d4) {
    var e3 = d4.next, f = d4.complete, g2 = "undefined" != typeof AbortController ? new AbortController() : null, p2 = false;
    Promise.resolve().then(function() {
      if (!p2) {
        return g2 && (c2.signal = g2.signal), function C2(a5, b4, c3) {
          var e4, d5 = false;
          return (a5.context.fetch || fetch)(b4, c3).then(function(a6) {
            e4 = a6;
            d5 = 200 > a6.status || a6.status >= ("manual" === c3.redirect ? 400 : 300);
            return a6.json();
          }).then(function(b5) {
            if (!("data" in b5) && !("errors" in b5)) {
              throw Error("No Content");
            }
            return z$3(a5, b5, e4);
          }).catch(function(b5) {
            if ("AbortError" !== b5.name) {
              return A$2(a5, d5 ? Error(e4.statusText) : b5, e4);
            }
          });
        }(a4, b3, c2);
      }
    }).then(function(a5) {
      p2 || (p2 = true, a5 && e3(a5), f());
    });
    return function() {
      p2 = true;
      g2 && g2.abort();
    };
  });
}
function createRequest(a4, b3) {
  a4 = y$2(a4);
  return {
    key: b3 ? n$2(a4.__key, u$1(b3)) >>> 0 : a4.__key,
    query: a4,
    variables: b3 || {}
  };
}
var m$1, q$2, r$2, x$3;
m$1 = function(a4) {
  function b3(b4) {
    var f, c2 = b4.networkError, e3 = b4.response;
    f = function h4(a5, b5) {
      var d4 = "";
      if (void 0 !== a5) {
        return d4 = "[Network] " + a5.message;
      }
      void 0 !== b5 && b5.forEach(function c3(a6) {
        d4 += "[GraphQL] " + a6.message + "\n";
      });
      return d4.trim();
    }(c2, b4 = (b4.graphQLErrors || []).map(k$1));
    a4.call(this, f);
    this.name = "CombinedError";
    this.message = f;
    this.graphQLErrors = b4;
    this.networkError = c2;
    this.response = e3;
  }
  a4 && (b3.__proto__ = a4);
  (b3.prototype = Object.create(a4 && a4.prototype)).constructor = b3;
  b3.prototype.toString = l;
  return b3;
}(Error);
q$2 = /* @__PURE__ */ new Set(), r$2 = /* @__PURE__ */ new WeakMap();
x$3 = /* @__PURE__ */ new Map();
function n$1(a4, b3) {
  if (Array.isArray(a4)) {
    for (var c2 = 0; c2 < a4.length; c2++) {
      n$1(a4[c2], b3);
    }
  } else if ("object" == typeof a4 && null !== a4) {
    for (c2 in a4) {
      "__typename" === c2 && "string" == typeof a4[c2] ? b3[a4[c2]] = 0 : n$1(a4[c2], b3);
    }
  }
  return b3;
}
function p$1(a4) {
  return a4.kind === Kind.FIELD && "__typename" === a4.name.value && !a4.alias;
}
function r$1(a4) {
  if (a4.selectionSet && !a4.selectionSet.selections.some(p$1)) {
    return B$1({}, a4, {
      selectionSet: B$1({}, a4.selectionSet, {
        selections: a4.selectionSet.selections.concat([{
          kind: Kind.FIELD,
          name: {
            kind: Kind.NAME,
            value: "__typename"
          }
        }])
      })
    });
  }
}
function u(a4) {
  a4 = y$2(a4);
  var b3 = t$1.get(a4.__key);
  b3 || ((b3 = visit(a4, {
    Field: r$1,
    InlineFragment: r$1
  })).__key = a4.__key, t$1.set(a4.__key, b3));
  return b3;
}
function v$1(a4) {
  return a4 && "object" == typeof a4 ? Object.keys(a4).reduce(function(b3, c2) {
    var d4 = a4[c2];
    "__typename" === c2 ? Object.defineProperty(b3, "__typename", {
      enumerable: false,
      value: d4
    }) : Array.isArray(d4) ? b3[c2] = d4.map(v$1) : b3[c2] = d4 && "object" == typeof d4 && "__typename" in d4 ? v$1(d4) : d4;
    return b3;
  }, {}) : a4;
}
function w$1(a4) {
  a4.toPromise = function() {
    return toPromise$1(take$1(1)(a4));
  };
  return a4;
}
function x$2(a4, b3, c2) {
  c2 || (c2 = b3.context);
  return {
    key: b3.key,
    query: b3.query,
    variables: b3.variables,
    kind: a4,
    context: c2
  };
}
function y$1(a4, b3) {
  return x$2(a4.kind, a4, B$1({}, a4.context, {
    meta: B$1({}, a4.context.meta, b3)
  }));
}
function z$2() {
}
function D$2(a4) {
  return "mutation" !== (a4 = a4.kind) && "query" !== a4;
}
function E$2(a4) {
  var b3 = x$2(a4.kind, a4);
  b3.query = u(a4.query);
  return b3;
}
function F$2(a4) {
  return "query" !== a4.kind || "cache-only" !== a4.context.requestPolicy;
}
function G$1(a4) {
  return y$1(a4, {
    cacheOutcome: "miss"
  });
}
function H$2(a4) {
  return D$2(a4);
}
function I$1(a4) {
  function b3(a5) {
    var b4 = a5.context.requestPolicy;
    return "query" === a5.kind && "network-only" !== b4 && ("cache-only" === b4 || k3.has(a5.key));
  }
  function c2(a5) {
    var c3 = k3.get(a5.key);
    c3 = B$1({}, c3, {
      operation: y$1(a5, {
        cacheOutcome: c3 ? "hit" : "miss"
      })
    });
    "cache-and-network" === a5.context.requestPolicy && (c3.stale = true, J$1(m4, a5));
    return c3;
  }
  function d4(a5) {
    return !D$2(a5) && b3(a5);
  }
  function e3(a5) {
    function c3(a6) {
      g3.add(a6);
    }
    var e4, g3, l2, d5 = a5.operation;
    if (d5) {
      e4 = Object.keys(n$1(a5.data, {})).concat(d5.context.additionalTypenames || []);
      if ("mutation" === a5.operation.kind) {
        g3 = /* @__PURE__ */ new Set();
        for (a5 = 0; a5 < e4.length; a5++) {
          (l2 = h4[l2 = e4[a5]] || (h4[l2] = /* @__PURE__ */ new Set())).forEach(c3);
          l2.clear();
        }
        g3.forEach(function b4(a6) {
          k3.has(a6) && (d5 = k3.get(a6).operation, k3.delete(a6), J$1(m4, d5));
        });
      } else if ("query" === d5.kind && a5.data) {
        for (k3.set(d5.key, a5), a5 = 0; a5 < e4.length; a5++) {
          (h4[l2 = e4[a5]] || (h4[l2] = /* @__PURE__ */ new Set())).add(d5.key);
        }
      }
    }
  }
  function f(a5) {
    return !D$2(a5) && !b3(a5);
  }
  var g2 = a4.forward, m4 = a4.client;
  a4.dispatchDebug;
  var k3 = /* @__PURE__ */ new Map(), h4 = /* @__PURE__ */ Object.create(null);
  return function(a5) {
    var b4 = share$1(a5);
    a5 = map$1(c2)(filter$1(d4)(b4));
    b4 = H$3(e3)(g2(filter$1(F$2)(map$1(G$1)(merge$1([map$1(E$2)(filter$1(f)(b4)), filter$1(H$2)(b4)])))));
    return merge$1([a5, b4]);
  };
}
function J$1(a4, b3) {
  return a4.reexecuteOperation(x$2(b3.kind, b3, B$1({}, b3.context, {
    requestPolicy: "network-only"
  })));
}
function M$1(a4) {
  function b3(a5) {
    f.delete(a5.operation.key);
  }
  function c2(a5) {
    var c3 = a5.key, b4 = a5.kind;
    if ("teardown" === b4) {
      return f.delete(c3), true;
    }
    if ("query" !== b4 && "subscription" !== b4) {
      return true;
    }
    b4 = f.has(c3);
    f.add(c3);
    b4 && false;
    return !b4;
  }
  var d4 = a4.forward, e3 = a4.dispatchDebug, f = /* @__PURE__ */ new Set();
  return function(a5) {
    a5 = filter$1(c2)(a5);
    return H$3(b3)(d4(a5));
  };
}
function N$2(a4) {
  return "query" === a4.kind || "mutation" === a4.kind;
}
function O$2(a4) {
  return "query" !== a4.kind && "mutation" !== a4.kind;
}
function P$2(a4) {
  var b3 = a4.forward;
  a4.dispatchDebug;
  return function(a5) {
    var f, d4 = share$1(a5);
    a5 = D$3(function(a6) {
      var b4 = a6.key, e3 = filter$1(function(a7) {
        return "teardown" === a7.kind && a7.key === b4;
      })(d4), g2 = makeFetchBody(a6), h4 = makeFetchURL(a6, g2), l2 = makeFetchOptions(a6, g2);
      return H$3(function(b5) {
        b5.data ? void 0 : b5.error;
      })(takeUntil$1(e3)(makeFetchSource(a6, h4, l2)));
    })(filter$1(N$2)(d4));
    f = b3(filter$1(O$2)(d4));
    return merge$1([a5, f]);
  };
}
function Q$1() {
  return false;
}
function R$2(a4) {
  function b3(a5) {
    if ("teardown" !== a5.kind && false) {
      var b4 = 'No exchange has handled operations of kind "' + a5.kind + `". Check whether you've added an exchange responsible for these operations.`;
      console.warn(b4);
    }
  }
  a4.dispatchDebug;
  return function(a5) {
    return filter$1(Q$1)(H$3(b3)(a5));
  };
}
function T$2(a4) {
  return function(b3) {
    var c2 = b3.client;
    b3.dispatchDebug;
    return a4.reduceRight(function(a5, b4) {
      return b4({
        client: c2,
        forward: a5,
        dispatchDebug: function(a6) {
        }
      });
    }, b3.forward);
  };
}
function V$1(a4) {
  var d4, e3, g2, m4, c2 = this;
  this.activeOperations = /* @__PURE__ */ Object.create(null);
  this.queue = [];
  this.createOperationContext = function(a5) {
    a5 || (a5 = {});
    return B$1({}, {
      url: c2.url,
      fetchOptions: c2.fetchOptions,
      fetch: c2.fetch,
      preferGetMethod: c2.preferGetMethod
    }, a5, {
      suspense: a5.suspense || false !== a5.suspense && c2.suspense,
      requestPolicy: a5.requestPolicy || c2.requestPolicy
    });
  };
  this.createRequestOperation = function(a5, b3, d5) {
    return x$2(a5, b3, c2.createOperationContext(d5));
  };
  this.executeQuery = function(a5, b3) {
    a5 = c2.createRequestOperation("query", a5, b3);
    return c2.executeRequestOperation(a5);
  };
  this.executeSubscription = function(a5, b3) {
    a5 = c2.createRequestOperation("subscription", a5, b3);
    return c2.executeRequestOperation(a5);
  };
  this.executeMutation = function(a5, b3) {
    a5 = c2.createRequestOperation("mutation", a5, b3);
    return c2.executeRequestOperation(a5);
  };
  d4 = z$2;
  this.url = a4.url;
  this.fetchOptions = a4.fetchOptions;
  this.fetch = a4.fetch;
  this.suspense = !!a4.suspense;
  this.requestPolicy = a4.requestPolicy || "cache-first";
  this.preferGetMethod = !!a4.preferGetMethod;
  this.maskTypename = !!a4.maskTypename;
  e3 = makeSubject$1();
  g2 = e3.next;
  this.operations$ = e3.source;
  m4 = false;
  this.dispatchOperation = function(a5) {
    m4 = true;
    for (a5 && g2(a5); a5 = c2.queue.shift(); ) {
      g2(a5);
    }
    m4 = false;
  };
  this.reexecuteOperation = function(a5) {
    if ("mutation" === a5.kind || 0 < (c2.activeOperations[a5.key] || 0)) {
      c2.queue.push(a5), m4 || Promise.resolve().then(c2.dispatchOperation);
    }
  };
  a4 = T$2(void 0 !== a4.exchanges ? a4.exchanges : U$2);
  this.results$ = share$1(a4({
    client: this,
    dispatchDebug: d4,
    forward: R$2({
      dispatchDebug: d4
    })
  })(this.operations$));
  publish$1(this.results$);
}
function W$2(a4) {
  a4.data = v$1(a4.data);
  return a4;
}
function createClient(a4) {
  return new V$1(a4);
}
var t$1, U$2;
t$1 = /* @__PURE__ */ new Map();
R$2({
  dispatchDebug: z$2
});
U$2 = [M$1, I$1, P$2];
V$1.prototype.onOperationStart = function(a4) {
  var b3 = a4.key;
  this.activeOperations[b3] = (this.activeOperations[b3] || 0) + 1;
  this.dispatchOperation(a4);
};
V$1.prototype.onOperationEnd = function(a4) {
  var b3 = a4.key, c2 = this.activeOperations[b3] || 0;
  if (0 >= (this.activeOperations[b3] = 0 >= c2 ? 0 : c2 - 1)) {
    for (b3 = this.queue.length - 1; 0 <= b3; b3--) {
      this.queue[b3].key === a4.key && this.queue.splice(b3, 1);
    }
    this.dispatchOperation(x$2("teardown", a4, a4.context));
  }
};
V$1.prototype.executeRequestOperation = function(a4) {
  var e3, f, c2 = this, d4 = filter$1(function(b3) {
    return b3.operation.key === a4.key;
  })(this.results$);
  this.maskTypename && (d4 = map$1(W$2)(d4));
  if ("mutation" === a4.kind) {
    return take$1(1)(onStart$1(function b3() {
      return c2.dispatchOperation(a4);
    })(d4));
  }
  e3 = filter$1(function(b3) {
    return "teardown" === b3.kind && b3.key === a4.key;
  })(this.operations$), f = filter$1(function(b3) {
    return b3.kind === a4.kind && b3.key === a4.key && "cache-only" !== b3.context.requestPolicy;
  })(this.operations$);
  return onEnd$1(function() {
    c2.onOperationEnd(a4);
  })(onStart$1(function() {
    c2.onOperationStart(a4);
  })(K$1(function(a5) {
    return a5.stale ? fromValue$1(a5) : merge$1([fromValue$1(a5), map$1(function() {
      return B$1({}, a5, {
        stale: true
      });
    })(take$1(1)(f))]);
  })(takeUntil$1(e3)(d4))));
};
V$1.prototype.query = function(a4, b3, c2) {
  c2 && "boolean" == typeof c2.suspense || (c2 = B$1({}, c2, {
    suspense: false
  }));
  return w$1(this.executeQuery(createRequest(a4, b3), c2));
};
V$1.prototype.readQuery = function(a4, b3, c2) {
  var d4 = null;
  N$3(function(a5) {
    d4 = a5;
  })(this.executeQuery(createRequest(a4, b3), c2)).unsubscribe();
  return d4;
};
V$1.prototype.subscription = function(a4, b3, c2) {
  return this.executeSubscription(createRequest(a4, b3), c2);
};
V$1.prototype.mutation = function(a4, b3, c2) {
  return w$1(this.executeMutation(createRequest(a4, b3), c2));
};
function provideClient(opts) {
  var client2 = opts instanceof V$1 ? opts : new V$1(opts);
  provide("$urql", client2);
  return client2;
}
function useClient() {
  var client2 = inject("$urql");
  return client2;
}
function _extends() {
  return (_extends = Object.assign || function(target) {
    var i3, source, key;
    for (i3 = 1; i3 < arguments.length; i3++) {
      source = arguments[i3];
      for (key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }).apply(this, arguments);
}
function _ref(x3) {
  return void 0 !== x3;
}
function useQuery(_args) {
  function _ref2() {
    fetching.value = false;
    stale.value = false;
  }
  function _ref3(res) {
    data.value = res.data;
    stale.value = !!res.stale;
    fetching.value = false;
    error.value = res.error;
    operation.value = res.operation;
    extensions.value = res.extensions;
  }
  function _ref4() {
    fetching.value = true;
    stale.value = false;
  }
  var state, getState, response, args = reactive(_args), client2 = useClient(), data = ref(), stale = ref(false), fetching = ref(false), error = ref(), operation = ref(), extensions = ref(), isPaused = isRef(_args.pause) ? _args.pause : ref(!!_args.pause), request = ref(createRequest(args.query, args.variables)), source = ref(null), next = ref(null);
  watchEffect(function() {
    var newRequest = createRequest(args.query, args.variables);
    if (request.value.key !== newRequest.key) {
      request.value = newRequest;
    }
  }, watchOptions);
  state = {
    data,
    stale,
    error,
    operation,
    extensions,
    fetching,
    isPaused,
    executeQuery: function executeQuery(opts) {
      next.value(client2.executeQuery(request.value, _extends({}, {
        requestPolicy: args.requestPolicy
      }, args.context, opts)));
      return response;
    },
    pause: function pause() {
      isPaused.value = true;
    },
    resume: function resume() {
      isPaused.value = false;
    }
  };
  getState = function() {
    return state;
  };
  watchEffect(function(onInvalidate) {
    var subject = makeSubject$1();
    source.value = function replayOne(source2) {
      var cached;
      return concat$1([filter$1(_ref)(map$1(function() {
        return cached;
      })(fromValue$1(cached))), share$1(H$3(function(value) {
        cached = value;
      })(source2))]);
    }(subject.source);
    next.value = function(value) {
      var query$ = onEnd$1(_ref2)(value ? share$1(H$3(_ref3)(onStart$1(_ref4)(value))) : fromValue$1(void 0));
      subject.next(query$);
    };
    onInvalidate(publish$1(map$1(getState)(switchAll$1(source.value))).unsubscribe);
  }, {
    flush: "sync"
  });
  watchEffect(function() {
    next.value(!isPaused.value ? client2.executeQuery(request.value, _extends({}, {
      requestPolicy: args.requestPolicy
    }, args.context)) : void 0);
  }, watchOptions);
  return response = _extends({}, state, {
    then: function then(onFulfilled, onRejected) {
      return toPromise$1(take$1(1)(map$1(getState)(switchAll$1(source.value)))).then(onFulfilled, onRejected);
    }
  });
}
function useMutation(query) {
  function _ref2(res) {
    data.value = res.data;
    stale.value = !!res.stale;
    fetching.value = false;
    error.value = res.error;
    operation.value = res.operation;
    extensions.value = res.extensions;
    return res;
  }
  var client2 = useClient(), data = ref(), stale = ref(false), fetching = ref(false), error = ref(), operation = ref(), extensions = ref();
  return {
    data,
    stale,
    fetching,
    error,
    operation,
    extensions,
    executeMutation: function executeMutation(variables, context) {
      fetching.value = true;
      return client2.mutation(query, variables, context).toPromise().then(_ref2);
    }
  };
}
var watchOptions;
watchOptions = {
  flush: "pre"
};
const cookie = function(key) {
  var cookies = document.cookie.split("; ");
  for (var i3 = 0; i3 < cookies.length; i3++) {
    var part = cookies[i3].split("=");
    if (part && part[0] === key)
      return unescape(part[1]);
  }
};
const client = createClient({
  url: "https://mulahpoints.com/embedded",
  fetch: (...args) => fetch(...args).then((response) => {
    const versionFromCookie = cookie("checkVersion");
    const versionFromServer = response.headers.get("version");
    if (versionFromCookie == null) {
      document.cookie = `checkVersion=${versionFromServer};`;
    } else if (versionFromCookie != versionFromServer) {
      document.cookie = `checkVersion=${versionFromServer};`;
      window.location.reload(true);
    }
    return response;
  }),
  fetchOptions: () => {
    return {
      headers: {
        token: store.state.token,
        app: "check"
      }
    };
  },
  requestPolicy: "network-only"
});
var Spinner_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$N = {};
const _hoisted_1$M = { class: "mulah-spinner-container" };
const _hoisted_2$J = /* @__PURE__ */ createVNode("div", { class: "mulah-spinner" }, [
  /* @__PURE__ */ createVNode("div"),
  /* @__PURE__ */ createVNode("div"),
  /* @__PURE__ */ createVNode("div"),
  /* @__PURE__ */ createVNode("div"),
  /* @__PURE__ */ createVNode("div"),
  /* @__PURE__ */ createVNode("div"),
  /* @__PURE__ */ createVNode("div"),
  /* @__PURE__ */ createVNode("div")
], -1);
function _sfc_render$N(_ctx, _cache) {
  return openBlock(), createBlock("div", _hoisted_1$M, [
    _hoisted_2$J
  ]);
}
var Spinner = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$N]]);
const CUSTOMER_PERSONAL_SMS_LOGS = `
  query customerSmsLogs($customerId: ID!, $brandId: ID!, $hidden: Boolean!) {
    customerSmsLogs(customerId: $customerId, brandId: $brandId, hidden: $hidden) {
      message
      datetime
    }
  }
`;
const CHECKPOINTS_VALIDATION = `
  mutation CheckpointsValidation(
    $phoneNumber: String!
    $specification: String!
    $slug: String
    $websiteToken: String
    $countryCode: String!
   ) {
     checkpointsValidation(
       slug: $slug
       phoneNumber: $phoneNumber
       websiteToken: $websiteToken
       specification: $specification
       countryCode: $countryCode
     ) {
       code
       registered
       allowSkipEmail
       errors {
         message
       }
     }
   }
`;
const UPDATE_CUSTOMER_NAME_AND_EMAIL = `
  mutation UpdateCustomerNameAndEmail(
    $customerId: ID!, 
    $name: String!, 
    $email: String!
  ) {
    updateCustomerNameAndEmail(
      customerId: $customerId,
      name: $name,
      email: $email
    ) {
        id
        name
        email
    }
  }
`;
const REGISTER_CUSTOMER_INFO = `
  mutation RegisterCustomerInfo(
    $phoneNumber: String!,
    $birthdate: Datetime!,
    $name: String!,
    $email: String
  ) {
    registerCustomerInfo(
      phoneNumber: $phoneNumber,
      birthdate: $birthdate,
      name: $name,
      email: $email
    ) {
      result
      errors {
        message
      }
    }
  }
`;
const CUSTOMER_OFFERS = `
  query CustomerOffers($phoneNumber: String!) {
    offers(phoneNumber: $phoneNumber) {
      id
      expiryDate
      used
      updatedAt
      usedOn
      promotion {
        title
      }
      voucher {
        id
        code
        campaign {
            title
        }
      }
    }
  }
`;
const CUSTOMER = `
  query Customer(
    $phoneNumber: String!
  ) {
    customer(phoneNumber: $phoneNumber) {
      id
      name
      email
      birthdate
      createdAt
      phoneNumber
      extension
      withInfo
      membership {
        id
        title
      }
    }
  }
`;
const REGISTRATION_STYLE = `
  query RegistrationStyle(
    $brandId: ID!
  ) {
    brand(id: $brandId) {
      id
      registrationStyle
    }
  }
`;
const HISTORY = `
  query Customer(
    $phoneNumber: String!,
    $brandId: ID!
    $sort: String,
    $direction: String,
    $filters: PromotionSearch
  ) {
    brand(id: $brandId) {
      id
      name
      logoUrl
      tbUrl
      logoBackground
      websiteUrl
      promotionUrl
      deliveryUrl
      headerColor
      homepageBorder
      fbPixelId
      googleTagId
      overviewStyle
      rewardStyle
      barcodeStyle
      personalInfoStyle
      smsStyle
      promotions(
         filters: $filters,
         direction: $direction,
         sort: $sort
      ) {
        id
        title
        cost
      }
      onlinePromotions {
        id
        displayName
        cost
        specification
      }
      brandConfiguration{
        qrBarcode
        onlineRedemptionsEnabled
      }
      totalAvailablePoints(phoneNumber: $phoneNumber)
    }
  }
`;
const CUSTOMER_HISTORY = `
  query Customer(
    $phoneNumber: String!,
    $brandId: ID!
  ) {
    customerHistory: customer(phoneNumber: $phoneNumber) {
      id
      brandCollectedPoints(brandId: $brandId)
      expiredPoints(brandId: $brandId)
      redemptionCosts(brandId: $brandId)
      collectionsAndDeductions(brandId: $brandId) {
        amount
        createdAt :createdIso
        expiryDate(brandId: $brandId)
        expiryDays(brandId: $brandId)
        specification
      }
    }

    brand(id: $brandId) {
      logoUrl
      logoBackground
    }
  }
`;
const CUSTOMER_HISTORY_MORE = `
  query Customer(
    $phoneNumber: String!,
    $brandId: ID!
  ) {
    customerHistory: customer(phoneNumber: $phoneNumber) {
      id
      collectionsAndDeductions(brandId: $brandId) {
        amount
        createdAt :createdIso
        expiryDate(brandId: $brandId)
        expiryDays(brandId: $brandId)
        specification
      }
    }
  }
`;
const TERMS_AND_CONDITIONS = `
  query Brand($id: ID!) {
    brand(id: $id) {
      id
      termsAndConditions
      tncStyle
    }
  }
`;
const CREATE_WEBSITE_VISIT = `
    mutation CreateWesbiteVisit(
      $id: ID!
      $phoneNumber: String!
    ) {
    createWebsiteVisit(
        id: $id
        phoneNumber: $phoneNumber
    ) {
            results
            errors {
            message
            }
        }
    }
`;
const CREATE_URL_CLICK = `
    mutation CreateUrlClick(
      $id: ID!
      $phoneNumber: String!
      $specification: String!
    ) {
      createUrlClick(
        id: $id
        phoneNumber: $phoneNumber
        specification: $specification
    ) {
        results
        errors {
        message
        }
      }
    }
`;
const CREATE_EMBEDDED_PROSPECT = `
    mutation CreateEmbeddedProspect(
      $id: ID!
      $phoneNumber: String!
    ) {
    createEmbeddedProspect(
        id: $id
        phoneNumber: $phoneNumber
    ) {
            result
            errors {
            message
            }
        }
    }
`;
const LOGIN_STYLE = `
  query LoginStyle(
    $id: ID!
  ) {
    brand(
      id: $id
    ) {
      id
      loginStyle
    }
  }
`;
const VERIFICATION_STYLE = `
  query VerficationStyle(
    $id: ID!
  ) {
    brand(
      id: $id
    ) {
      id
      verificationStyle
    }
  }
`;
const REDEEM_ONLINE = `
  mutation RedeemOnlinePromotion(
    $customerId: ID!
    $promotionId: ID!
    $specification: String!
  ) {
    redeemOnlinePromotion(
      customerId: $customerId
      promotionId: $promotionId
      specification: $specification
    ) {
      result
      errors {
        message
      }
    }
  }
`;
const ONLINE_REDEMPTIONS = `
  query OnlineRedemptions(
    $phoneNumber: String!
    $brandId: ID!
  ) {
    customer(phoneNumber: $phoneNumber) {
      id
      onlineRedemptions(brandId: $brandId) {
        id
        displayName
        expiryDate
        usedAt
        code
      }
    }
  }
`;
const _sfc_main$M = {
  name: "ErrorSvg",
  props: {
    color: String,
    size: Number
  }
};
const _hoisted_1$L = /* @__PURE__ */ createVNode("path", { d: "M203.65,383.21h-23.96c-.96-.21-1.91-.54-2.88-.62-20.42-1.52-40.22-5.89-58.93-14.21C54.78,340.33,16.26,292.46,2.93,224.59c-1.36-6.94-1.97-14.02-2.93-21.04,0-7.99,0-15.97,0-23.96,.22-1.21,.48-2.41,.67-3.63,1.42-9.22,2.2-18.6,4.34-27.66C29.26,45.56,129.2-17.58,232.58,4.34c84.63,17.94,147.89,93.24,150.62,179.65,1.6,50.81-14.06,95.77-47.61,134.03-29.55,33.7-66.69,54.43-110.89,62.28-6.97,1.24-14.02,1.95-21.04,2.91ZM191.83,29.87c-89.21-.14-161.58,71.99-161.88,161.33-.3,89.25,72.12,161.9,161.55,162.05,89.2,.15,161.57-71.98,161.89-161.34,.32-89.27-72.1-161.91-161.56-162.04Z" }, null, -1);
const _hoisted_2$I = /* @__PURE__ */ createVNode("path", { d: "M206.65,159.61c0,15.58,.02,31.17,0,46.75-.01,9.61-6.4,16.53-15.1,16.43-8.59-.1-14.83-6.91-14.84-16.31-.02-31.29-.02-62.58,0-93.88,0-9.49,6.17-16.12,14.9-16.15,8.76-.03,15.01,6.59,15.03,16.02,.03,15.71,0,31.42,0,47.12Z" }, null, -1);
const _hoisted_3$D = /* @__PURE__ */ createVNode("path", { d: "M191.51,281.45c-11.15-.06-20.11-9.13-20.04-20.32,.07-11.08,9.29-20.16,20.37-20.07,11.09,.1,20.12,9.28,20.04,20.39-.08,11.16-9.13,20.04-20.37,19.99Z" }, null, -1);
function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
    `,
    id: "Layer_1",
    "data-name": "Layer 1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 383.31 383.21"
  }, [
    _hoisted_1$L,
    _hoisted_2$I,
    _hoisted_3$D
  ], 4);
}
var Error$1 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$M]]);
var ErrorModal_vue_vue_type_style_index_0_lang = "";
const _sfc_main$L = {
  name: "ErrorModal",
  setup(props) {
    const groupF = ref({});
    const svgFill = ref(null);
    groupF.value = {
      background: `${props.modalSecondaryColor} !important`,
      "border-color": `${props.modalSecondaryColor} !important`,
      color: `${props.modalPrimaryColor} !important`
    };
    svgFill.value = props.modalSecondaryColor;
    return {
      groupF,
      svgFill
    };
  },
  props: {
    closeModal: Function,
    specification: String,
    modalSecondaryColor: String,
    modalPrimaryColor: String
  },
  components: {
    Error: Error$1
  }
};
const _hoisted_1$K = /* @__PURE__ */ createVNode("div", { class: "mulah-overlay" }, null, -1);
const _hoisted_2$H = { class: "mulah-modal" };
const _hoisted_3$C = { class: "mulah-modal__container" };
const _hoisted_4$x = { class: "mulah-modal__dialog" };
const _hoisted_5$x = { class: "mulah-modal__content" };
const _hoisted_6$s = {
  key: 0,
  class: "mulah-modal__content-text"
};
const _hoisted_7$p = /* @__PURE__ */ createVNode("p", null, "Invalid phone number", -1);
const _hoisted_8$n = /* @__PURE__ */ createVNode("p", null, "Please ensure it is at least 9 characters", -1);
const _hoisted_9$k = {
  key: 1,
  class: "mulah-modal__content-text"
};
const _hoisted_10$i = /* @__PURE__ */ createVNode("p", null, "Wrong OTP code.", -1);
const _hoisted_11$i = /* @__PURE__ */ createVNode("p", null, "Kindly check the OTP code again.", -1);
const _hoisted_12$g = {
  key: 2,
  class: "mulah-modal__content-text"
};
const _hoisted_13$b = /* @__PURE__ */ createVNode("p", null, "Kindly check the", -1);
const _hoisted_14$b = /* @__PURE__ */ createVNode("p", null, "registration details again.", -1);
const _hoisted_15$8 = {
  key: 3,
  class: "mulah-modal__content-text"
};
const _hoisted_16$8 = /* @__PURE__ */ createVNode("p", null, "Kindly check your", -1);
const _hoisted_17$7 = /* @__PURE__ */ createVNode("p", null, "personal information again.", -1);
function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Error = resolveComponent("Error");
  return openBlock(), createBlock("div", null, [
    _hoisted_1$K,
    createVNode("div", _hoisted_2$H, [
      createVNode("div", _hoisted_3$C, [
        createVNode("div", _hoisted_4$x, [
          createVNode("div", _hoisted_5$x, [
            createVNode(_component_Error, {
              size: 80,
              fill: $setup.svgFill
            }, null, 8, ["fill"]),
            $props.specification == "home" ? (openBlock(), createBlock("div", _hoisted_6$s, [
              _hoisted_7$p,
              _hoisted_8$n
            ])) : $props.specification == "verification" ? (openBlock(), createBlock("div", _hoisted_9$k, [
              _hoisted_10$i,
              _hoisted_11$i
            ])) : $props.specification == "registration" ? (openBlock(), createBlock("div", _hoisted_12$g, [
              _hoisted_13$b,
              _hoisted_14$b
            ])) : $props.specification == "personal-info" ? (openBlock(), createBlock("div", _hoisted_15$8, [
              _hoisted_16$8,
              _hoisted_17$7
            ])) : createCommentVNode("", true),
            createVNode("button", {
              style: $setup.groupF,
              class: "mulah-modal__content-button",
              onClick: _cache[1] || (_cache[1] = (...args) => $props.closeModal && $props.closeModal(...args))
            }, " Back ", 4)
          ])
        ])
      ])
    ])
  ]);
}
var ErrorModal = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$L]]);
const _sfc_main$K = {
  name: "ArrowDownSvg",
  props: {
    color: String,
    size: Number
  }
};
const _hoisted_1$J = /* @__PURE__ */ createVNode("g", {
  transform: "translate(0.000000,752.000000) scale(0.100000,-0.100000)",
  stroke: "none"
}, [
  /* @__PURE__ */ createVNode("path", { d: "M1712 5860 c-42 -26 -72 -76 -72 -123 0 -54 1995 -4045 2037 -4073\n      38 -26 128 -26 166 0 42 28 2037 4019 2037 4073 0 47 -30 97 -72 123 -33 20\n      -55 20 -2048 20 -1993 0 -2015 0 -2048 -20z" })
], -1);
function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    version: "1.0",
    xmlns: "http://www.w3.org/2000/svg",
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
      `,
    viewBox: "0 0 752.000000 752.000000",
    preserveAspectRatio: "xMidYMid meet"
  }, [
    _hoisted_1$J
  ], 4);
}
var ArrowDown = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$K]]);
var metadata = { "version": 4, "country_calling_codes": { "1": ["US", "AG", "AI", "AS", "BB", "BM", "BS", "CA", "DM", "DO", "GD", "GU", "JM", "KN", "KY", "LC", "MP", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"], "7": ["RU", "KZ"], "20": ["EG"], "27": ["ZA"], "30": ["GR"], "31": ["NL"], "32": ["BE"], "33": ["FR"], "34": ["ES"], "36": ["HU"], "39": ["IT", "VA"], "40": ["RO"], "41": ["CH"], "43": ["AT"], "44": ["GB", "GG", "IM", "JE"], "45": ["DK"], "46": ["SE"], "47": ["NO", "SJ"], "48": ["PL"], "49": ["DE"], "51": ["PE"], "52": ["MX"], "53": ["CU"], "54": ["AR"], "55": ["BR"], "56": ["CL"], "57": ["CO"], "58": ["VE"], "60": ["MY"], "61": ["AU", "CC", "CX"], "62": ["ID"], "63": ["PH"], "64": ["NZ"], "65": ["SG"], "66": ["TH"], "81": ["JP"], "82": ["KR"], "84": ["VN"], "86": ["CN"], "90": ["TR"], "91": ["IN"], "92": ["PK"], "93": ["AF"], "94": ["LK"], "95": ["MM"], "98": ["IR"], "211": ["SS"], "212": ["MA", "EH"], "213": ["DZ"], "216": ["TN"], "218": ["LY"], "220": ["GM"], "221": ["SN"], "222": ["MR"], "223": ["ML"], "224": ["GN"], "225": ["CI"], "226": ["BF"], "227": ["NE"], "228": ["TG"], "229": ["BJ"], "230": ["MU"], "231": ["LR"], "232": ["SL"], "233": ["GH"], "234": ["NG"], "235": ["TD"], "236": ["CF"], "237": ["CM"], "238": ["CV"], "239": ["ST"], "240": ["GQ"], "241": ["GA"], "242": ["CG"], "243": ["CD"], "244": ["AO"], "245": ["GW"], "246": ["IO"], "247": ["AC"], "248": ["SC"], "249": ["SD"], "250": ["RW"], "251": ["ET"], "252": ["SO"], "253": ["DJ"], "254": ["KE"], "255": ["TZ"], "256": ["UG"], "257": ["BI"], "258": ["MZ"], "260": ["ZM"], "261": ["MG"], "262": ["RE", "YT"], "263": ["ZW"], "264": ["NA"], "265": ["MW"], "266": ["LS"], "267": ["BW"], "268": ["SZ"], "269": ["KM"], "290": ["SH", "TA"], "291": ["ER"], "297": ["AW"], "298": ["FO"], "299": ["GL"], "350": ["GI"], "351": ["PT"], "352": ["LU"], "353": ["IE"], "354": ["IS"], "355": ["AL"], "356": ["MT"], "357": ["CY"], "358": ["FI", "AX"], "359": ["BG"], "370": ["LT"], "371": ["LV"], "372": ["EE"], "373": ["MD"], "374": ["AM"], "375": ["BY"], "376": ["AD"], "377": ["MC"], "378": ["SM"], "380": ["UA"], "381": ["RS"], "382": ["ME"], "383": ["XK"], "385": ["HR"], "386": ["SI"], "387": ["BA"], "389": ["MK"], "420": ["CZ"], "421": ["SK"], "423": ["LI"], "500": ["FK"], "501": ["BZ"], "502": ["GT"], "503": ["SV"], "504": ["HN"], "505": ["NI"], "506": ["CR"], "507": ["PA"], "508": ["PM"], "509": ["HT"], "590": ["GP", "BL", "MF"], "591": ["BO"], "592": ["GY"], "593": ["EC"], "594": ["GF"], "595": ["PY"], "596": ["MQ"], "597": ["SR"], "598": ["UY"], "599": ["CW", "BQ"], "670": ["TL"], "672": ["NF"], "673": ["BN"], "674": ["NR"], "675": ["PG"], "676": ["TO"], "677": ["SB"], "678": ["VU"], "679": ["FJ"], "680": ["PW"], "681": ["WF"], "682": ["CK"], "683": ["NU"], "685": ["WS"], "686": ["KI"], "687": ["NC"], "688": ["TV"], "689": ["PF"], "690": ["TK"], "691": ["FM"], "692": ["MH"], "850": ["KP"], "852": ["HK"], "853": ["MO"], "855": ["KH"], "856": ["LA"], "880": ["BD"], "886": ["TW"], "960": ["MV"], "961": ["LB"], "962": ["JO"], "963": ["SY"], "964": ["IQ"], "965": ["KW"], "966": ["SA"], "967": ["YE"], "968": ["OM"], "970": ["PS"], "971": ["AE"], "972": ["IL"], "973": ["BH"], "974": ["QA"], "975": ["BT"], "976": ["MN"], "977": ["NP"], "992": ["TJ"], "993": ["TM"], "994": ["AZ"], "995": ["GE"], "996": ["KG"], "998": ["UZ"] }, "countries": { "AC": ["247", "00", "(?:[01589]\\d|[46])\\d{4}", [5, 6], 0, 0, 0, 0, 0, 0, 0, [0, ["4\\d{4}", [5]]]], "AD": ["376", "00", "(?:1|6\\d)\\d{7}|[135-9]\\d{5}", [6, 8, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["[135-9]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["1"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]], 0, 0, 0, 0, 0, 0, [0, ["690\\d{6}|[356]\\d{5}", [6, 9]]]], "AE": ["971", "00", "(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{2,9})", "$1 $2", ["60|8"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[236]|[479][2-8]"], "0$1"], ["(\\d{3})(\\d)(\\d{5})", "$1 $2 $3", ["[479]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["5[024-68]\\d{7}", [9]]]], "AF": ["93", "00", "[2-7]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7\\d{8}"]]], "AG": ["1", "011", "(?:268|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([457]\\d{6})$", "268$1", 0, "268", [0, ["268(?:464|7(?:1[3-9]|[28]\\d|3[0246]|64|7[0-689]))\\d{4}"]]], "AI": ["1", "011", "(?:264|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2457]\\d{6})$", "264$1", 0, "264", [0, ["264(?:235|4(?:69|76)|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}"]]], "AL": ["355", "00", "(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}", [6, 7, 8, 9], [["(\\d{3})(\\d{3,4})", "$1 $2", ["80|9"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["[23578]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["6(?:[78][2-9]|9\\d)\\d{6}", [9]]]], "AM": ["374", "00", "(?:[1-489]\\d|55|60|77)\\d{6}", [8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]0"], "0 $1"], ["(\\d{3})(\\d{5})", "$1 $2", ["2|3[12]"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[3-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:33|4[1349]|55|77|88|9[13-9])\\d{6}"]]], "AO": ["244", "00", "[29]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[29]"]]], 0, 0, 0, 0, 0, 0, [0, ["9[1-59]\\d{7}"]]], "AR": ["54", "00", "(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}", [10, 11], [["(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])", "2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", 1], ["(\\d)(\\d{4})(\\d{2})(\\d{4})", "$2 15-$3-$4", ["9(?:2[2-469]|3[3-578])", "9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))", "9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 15-$3-$4", ["91"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d{3})(\\d{3})(\\d{5})", "$1-$2-$3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9"], "0$1", 0, "$1 $2 $3-$4"]], "0", 0, "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?", "9$1", 0, 0, [0, ["93(?:7(?:1[15]|81)[46]|8(?:(?:21|4[16]|69|9[12])[46]|88[013-9]))\\d{5}|9(?:29(?:54|66)|3(?:7(?:55|77)|865))[2-8]\\d{5}|9(?:2(?:2(?:2[59]|44|52)|3(?:26|44)|473|9(?:[07]2|2[26]|34|46))|3327)[45]\\d{5}|9(?:2(?:284|3(?:02|23)|657|920)|3(?:4(?:8[27]|92)|541|878))[2-7]\\d{5}|9(?:2(?:(?:26|62)2|320|477|9(?:42|83))|3(?:329|4(?:[47]6|62|89)|564))[2-6]\\d{5}|(?:675\\d|9(?:11[1-8]\\d|2(?:2(?:0[45]|1[2-6]|3[3-6])|3(?:[06]4|7[45])|494|6(?:04|1[2-8]|[36][45]|4[3-6])|80[45]|9(?:[17][4-6]|[48][45]|9[3-6]))|3(?:364|4(?:1[2-7]|[235][4-6]|84)|5(?:1[2-9]|[38][4-6])|6(?:2[45]|44)|7[069][45]|8(?:0[45]|[17][2-6]|3[4-6]|[58][3-6]))))\\d{6}|92(?:2(?:21|4[23]|6[145]|7[1-4]|8[356]|9[267])|3(?:16|3[13-8]|43|5[346-8]|9[3-5])|475|6(?:2[46]|4[78]|5[1568])|9(?:03|2[1457-9]|3[1356]|4[08]|[56][23]|82))4\\d{5}|9(?:2(?:2(?:57|81)|3(?:24|46|92)|9(?:01|23|64))|3(?:4(?:42|71)|5(?:25|37|4[347]|71)|7(?:18|5[17])))[3-6]\\d{5}|9(?:2(?:2(?:02|2[3467]|4[156]|5[45]|6[6-8]|91)|3(?:1[47]|25|[45][25]|96)|47[48]|625|932)|3(?:38[2578]|4(?:0[0-24-9]|3[78]|4[457]|58|6[03-9]|72|83|9[136-8])|5(?:2[124]|[368][23]|4[2689]|7[2-6])|7(?:16|2[15]|3[145]|4[13]|5[468]|7[2-5]|8[26])|8(?:2[5-7]|3[278]|4[3-5]|5[78]|6[1-378]|[78]7|94)))[4-6]\\d{5}"]]], "AS": ["1", "011", "(?:[58]\\d\\d|684|900)\\d{7}", [10], 0, "1", 0, "1|([267]\\d{6})$", "684$1", 0, "684", [0, ["684(?:2(?:48|5[2468]|72)|7(?:3[13]|70|82))\\d{4}"]]], "AT": ["43", "00", "1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{3,12})", "$1 $2", ["1(?:11|[2-9])"], "0$1"], ["(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"], ["(\\d{2})(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"], ["(\\d{3})(\\d{3,10})", "$1 $2", ["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"], "0$1"], ["(\\d{4})(\\d{3,9})", "$1 $2", ["[2-467]|5[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}", [7, 8, 9, 10, 11, 12, 13]]]], "AU": ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}", [5, 6, 7, 8, 9, 10, 12], [["(\\d{2})(\\d{3,4})", "$1 $2", ["16"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|4"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:30|[89])"]]], "0", 0, "0|(183[12])", 0, 0, 0, [0, ["4(?:83[0-38]|93[0-6])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}", [9]]], "0011"], "AW": ["297", "00", "(?:[25-79]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[25-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:290|5[69]\\d|6(?:[03]0|22|4[0-2]|[69]\\d)|7(?:[34]\\d|7[07])|9(?:6[45]|9[4-8]))\\d{4}"]]], "AX": ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}", [5, 6, 7, 8, 9, 10, 11, 12], 0, "0", 0, 0, 0, 0, "18", [0, ["4946\\d{2,6}|(?:4[0-8]|50)\\d{4,8}", [6, 7, 8, 9, 10]]], "00"], "AZ": ["994", "00", "365\\d{6}|(?:[124579]\\d|60|88)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[28]|2|365|46", "1[28]|2|365[45]|46", "1[28]|2|365(?:4|5[02])|46"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[13-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["36554\\d{4}|(?:[16]0|4[04]|5[015]|7[07]|99)\\d{7}"]]], "BA": ["387", "00", "6\\d{8}|(?:[35689]\\d|49|70)\\d{6}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-3]|[7-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]|6[56]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["6040\\d{5}|6(?:03|[1-356]|44|7\\d)\\d{6}"]]], "BB": ["1", "011", "(?:246|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "246$1", 0, "246", [0, ["246(?:(?:2(?:[3568]\\d|4[0-57-9])|3(?:5[2-9]|6[0-6])|4(?:46|5\\d)|69[5-7]|8(?:[2-5]\\d|83))\\d|52(?:1[147]|20))\\d{3}"]]], "BD": ["880", "00", "[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}", [6, 7, 8, 9, 10], [["(\\d{2})(\\d{4,6})", "$1-$2", ["31[5-8]|[459]1"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1-$2", ["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:28|4[14]|5)|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"], "0$1"], ["(\\d{4})(\\d{3,6})", "$1-$2", ["[13-9]|22"], "0$1"], ["(\\d)(\\d{7,8})", "$1-$2", ["2"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:1[13-9]\\d|644)\\d{7}|(?:3[78]|44|66)[02-9]\\d{7}", [10]]]], "BE": ["32", "00", "4\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[239]|4[23]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[15-8]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["4[5-9]\\d{7}", [9]]]], "BF": ["226", "00", "[025-7]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[025-7]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:0[125-7]|5[1-8]|[67]\\d)\\d{6}"]]], "BG": ["359", "00", "[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}", [6, 7, 8, 9], [["(\\d)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["43[1-6]|70[1-9]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:70|8)0"], "0$1"], ["(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[1-7]|7"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[48]|9[08]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:43[07-9]|99[69]\\d)\\d{5}|(?:8[7-9]|98)\\d{7}", [8, 9]]]], "BH": ["973", "00", "[136-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[13679]|8[047]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:3(?:[1-79]\\d|8[0-47-9])\\d|6(?:3(?:00|33|6[16])|6(?:3[03-9]|[69]\\d|7[0-6])))\\d{4}"]]], "BI": ["257", "00", "(?:[267]\\d|31)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2367]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:29|6[1257-9]|7[125-9])\\d{6}"]]], "BJ": ["229", "00", "(?:[25689]\\d|40)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-689]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:40|5[1-9]|6\\d|9[013-9])\\d{6}"]]], "BL": ["590", "00", "(?:590|(?:69|80)\\d|976)\\d{6}", [9], 0, "0", 0, 0, 0, 0, 0, [0, ["69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))\\d{4}"]]], "BM": ["1", "011", "(?:441|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-8]\\d{6})$", "441$1", 0, "441", [0, ["441(?:[2378]\\d|5[0-39])\\d{5}"]]], "BN": ["673", "00", "[2-578]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-578]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:22[89]|[78]\\d\\d)\\d{4}"]]], "BO": ["591", "00(?:1\\d)?", "(?:[2-467]\\d\\d|8001)\\d{5}", [8, 9], [["(\\d)(\\d{7})", "$1 $2", ["[23]|4[46]"]], ["(\\d{8})", "$1", ["[67]"]], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["8"]]], "0", 0, "0(1\\d)?", 0, 0, 0, [0, ["[67]\\d{7}", [8]]]], "BQ": ["599", "00", "(?:[34]1|7\\d)\\d{5}", [7], 0, 0, 0, 0, 0, 0, "[347]", [0, ["(?:31(?:8[14-8]|9[14578])|416[14-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}"]]], "BR": ["55", "00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)", "(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-46-9]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}", [8, 9, 10, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["300|4(?:0[02]|37)", "4(?:02|37)0|[34]00"]], ["(\\d{3})(\\d{2,3})(\\d{4})", "$1 $2 $3", ["(?:[358]|90)0"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"], "($1)"], ["(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[16][1-9]|[2-57-9]"], "($1)"]], "0", 0, "(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?", "$2", 0, 0, [0, ["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])(?:7|9\\d)\\d{7}", [10, 11]]]], "BS": ["1", "011", "(?:242|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([3-8]\\d{6})$", "242$1", 0, "242", [0, ["242(?:3(?:5[79]|7[56]|95)|4(?:[23][1-9]|4[1-35-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-46-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|[89]9))\\d{4}"]]], "BT": ["975", "00", "[17]\\d{7}|[2-8]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[67]|7"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:1[67]|77)\\d{6}", [8]]]], "BW": ["267", "00", "(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}", [7, 8, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["90"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[24-6]|3[15-79]"]], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37]"]], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:321|7(?:[1-7]\\d|8[01]))\\d{5}", [8]]]], "BY": ["375", "810", "(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}", [6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{3})", "$1 $2", ["800"], "8 $1"], ["(\\d{3})(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"], ["(\\d{4})(\\d{2})(\\d{3})", "$1 $2-$3", ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"], "8 0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:[56]|7[467])|2[1-3]"], "8 0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-4]"], "8 0$1"], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[89]"], "8 $1"]], "8", 0, "0|80?", 0, 0, 0, [0, ["(?:2(?:5[5-79]|9[1-9])|(?:33|44)\\d)\\d{6}", [9]]], "8~10"], "BZ": ["501", "00", "(?:0800\\d|[2-8])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]], ["(\\d)(\\d{3})(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]]], 0, 0, 0, 0, 0, 0, [0, ["6[0-35-7]\\d{5}", [7]]]], "CA": ["1", "011", "(?:[2-8]\\d|90)\\d{8}|3\\d{6}", [7, 10], 0, "1", 0, 0, 0, 0, 0, [0, ["(?:2(?:04|[23]6|[48]9|50|63)|3(?:06|43|6[578])|4(?:03|1[68]|3[178]|50|68|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|13|39|47|72)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}", [10]]]], "CC": ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "0|([59]\\d{7})$", "8$1", 0, 0, [0, ["4(?:83[0-38]|93[0-6])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}", [9]]], "0011"], "CD": ["243", "00", "[189]\\d{8}|[1-68]\\d{6}", [7, 9], [["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["88\\d{5}|(?:8[0-59]|9[017-9])\\d{7}"]]], "CF": ["236", "00", "(?:[27]\\d{3}|8776)\\d{4}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[278]"]]], 0, 0, 0, 0, 0, 0, [0, ["7[02457]\\d{6}"]]], "CG": ["242", "00", "222\\d{6}|(?:0\\d|80)\\d{7}", [9], [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]]], 0, 0, 0, 0, 0, 0, [0, ["026(?:1[0-5]|6[6-9])\\d{4}|0(?:[14-6]\\d\\d|2(?:40|5[5-8]|6[07-9]))\\d{5}"]]], "CH": ["41", "00", "8\\d{11}|[2-9]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]|81"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7[35-9]\\d{7}"]]], "CI": ["225", "00", "[02]\\d{9}", [10], [["(\\d{2})(\\d{2})(\\d)(\\d{5})", "$1 $2 $3 $4", ["2"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3 $4", ["0"]]], 0, 0, 0, 0, 0, 0, [0, ["0704[0-7]\\d{5}|0(?:[15]\\d\\d|7(?:0[0-37-9]|[4-9][7-9]))\\d{6}"]]], "CK": ["682", "00", "[2-578]\\d{4}", [5], [["(\\d{2})(\\d{3})", "$1 $2", ["[2-578]"]]], 0, 0, 0, 0, 0, 0, [0, ["[578]\\d{4}"]]], "CL": ["56", "(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0", "12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}", [9, 10, 11], [["(\\d{5})(\\d{4})", "$1 $2", ["219", "2196"], "($1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[1-36]"], "($1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9[2-9]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"], "($1)"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{3})(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"]]], 0, 0, 0, 0, 0, 0, [0, ["2(?:1982[0-6]|3314[05-9])\\d{3}|(?:2(?:1(?:160|962)|3(?:2\\d\\d|3(?:[034]\\d|1[0-35-9]|2[1-9]|5[0-2])|600)|646[59])|80[1-9]\\d\\d|9(?:3(?:[0-57-9]\\d\\d|6(?:0[02-9]|[1-9]\\d))|6(?:[0-8]\\d\\d|9(?:[02-79]\\d|1[05-9]))|7[1-9]\\d\\d|9(?:[03-9]\\d\\d|1(?:[0235-9]\\d|4[0-24-9])|2(?:[0-79]\\d|8[0-46-9]))))\\d{4}|(?:22|3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|8[1-9]|9[2458])\\d{7}", [9]]]], "CM": ["237", "00", "[26]\\d{8}|88\\d{6,7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["88"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]|88"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:24[23]|6[25-9]\\d)\\d{6}", [9]]]], "CN": ["86", "00|1(?:[12]\\d|79)\\d\\d00", "1[127]\\d{8,9}|2\\d{9}(?:\\d{2})?|[12]\\d{6,7}|86\\d{6}|(?:1[03-689]\\d|6)\\d{7,9}|(?:[3-579]\\d|8[0-57-9])\\d{6,9}", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2[0-57-9])[19]", "(?:10|2[0-57-9])(?:10|9[56])", "(?:10|2[0-57-9])(?:100|9[56])"], "0$1"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]", "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]", "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])", "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["(?:4|80)0"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|2(?:[02-57-9]|1[1-9])", "10|2(?:[02-57-9]|1[1-9])", "10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"], "0$1", 1], ["(\\d{3})(\\d{7,8})", "$1 $2", ["9"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[3-578]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-9]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["[12]"], "0$1", 1]], "0", 0, "0|(1(?:[12]\\d|79)\\d\\d)", 0, 0, 0, [0, ["1740[0-5]\\d{6}|1(?:[38]\\d|4[57]|5[0-35-9]|6[25-7]|7[0-35-8]|9[0135-9])\\d{8}", [11]]], "00"], "CO": ["57", "00(?:4(?:[14]4|56)|[579])", "(?:60\\d\\d|9101)\\d{6}|(?:1\\d|3)\\d{9}", [10, 11], [["(\\d{3})(\\d{7})", "$1 $2", ["6"], "($1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["[39]"]], ["(\\d)(\\d{3})(\\d{7})", "$1-$2-$3", ["1"], "0$1", 0, "$1 $2 $3"]], "0", 0, "0(4(?:[14]4|56)|[579])?", 0, 0, 0, [0, ["3333(?:0(?:0\\d|1[0-5])|[4-9]\\d\\d)\\d{3}|(?:3(?:24[1-9]|3(?:00|3[0-24-9]))|9101)\\d{6}|3(?:0[0-5]|1\\d|2[0-3]|5[01]|70)\\d{7}", [10]]]], "CR": ["506", "00", "(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}", [8, 10], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[3-9]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]"]]], 0, 0, "(19(?:0[0-2468]|1[09]|20|66|77|99))", 0, 0, 0, [0, ["(?:3005\\d|6500[01])\\d{3}|(?:5[07]|6[0-4]|7[0-3]|8[3-9])\\d{6}", [8]]]], "CU": ["53", "119", "[27]\\d{6,7}|[34]\\d{5,7}|(?:5|8\\d\\d)\\d{7}", [6, 7, 8, 10], [["(\\d{2})(\\d{4,6})", "$1 $2", ["2[1-4]|[34]"], "(0$1)"], ["(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["5"], "0$1"], ["(\\d{3})(\\d{7})", "$1 $2", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["5\\d{7}", [8]]]], "CV": ["238", "0", "(?:[2-59]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-589]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:36|5[1-389]|9\\d)\\d{5}"]]], "CW": ["599", "00", "(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[3467]"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["9[4-8]"]]], 0, 0, 0, 0, 0, "[69]", [0, ["953[01]\\d{4}|9(?:5[12467]|6[5-9])\\d{5}"]]], "CX": ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "0|([59]\\d{7})$", "8$1", 0, 0, [0, ["4(?:83[0-38]|93[0-6])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}", [9]]], "0011"], "CY": ["357", "00", "(?:[279]\\d|[58]0)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[257-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["9[4-79]\\d{6}"]]], "CZ": ["420", "00", "(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["96"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}"]]], "DE": ["49", "00", "[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:1\\d|2[02-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[05]\\d|[23]1|[46][1-8])\\d{1,9}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [["(\\d{2})(\\d{3,13})", "$1 $2", ["3[02]|40|[68]9"], "0$1"], ["(\\d{3})(\\d{3,12})", "$1 $2", ["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1", "2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"], "0$1"], ["(\\d{4})(\\d{2,11})", "$1 $2", ["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]", "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["138"], "0$1"], ["(\\d{5})(\\d{2,10})", "$1 $2", ["3"], "0$1"], ["(\\d{3})(\\d{5,11})", "$1 $2", ["181"], "0$1"], ["(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["1(?:3|80)|9"], "0$1"], ["(\\d{3})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"], ["(\\d{3})(\\d{7,12})", "$1 $2", ["8"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["18[68]"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["15[0568]"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["15[1279]"], "0$1"], ["(\\d{3})(\\d{8})", "$1 $2", ["18"], "0$1"], ["(\\d{3})(\\d{2})(\\d{7,8})", "$1 $2 $3", ["1(?:6[023]|7)"], "0$1"], ["(\\d{4})(\\d{2})(\\d{7})", "$1 $2 $3", ["15[279]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{8})", "$1 $2 $3", ["15"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["15[0-25-9]\\d{8}|1(?:6[023]|7\\d)\\d{7,8}", [10, 11]]]], "DJ": ["253", "00", "(?:2\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[27]"]]], 0, 0, 0, 0, 0, 0, [0, ["77\\d{6}"]]], "DK": ["45", "00", "[2-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[2-7]\\d|8[126-9]|9[1-46-9])\\d{6}"]]], "DM": ["1", "011", "(?:[58]\\d\\d|767|900)\\d{7}", [10], 0, "1", 0, "1|([2-7]\\d{6})$", "767$1", 0, "767", [0, ["767(?:2(?:[2-4689]5|7[5-7])|31[5-7]|61[1-8]|70[1-6])\\d{4}"]]], "DO": ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "8001|8[024]9", [0, ["8[024]9[2-9]\\d{6}"]]], "DZ": ["213", "00", "(?:[1-4]|[5-79]\\d|80)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:5(?:4[0-29]|5\\d|6[0-2])|6(?:[569]\\d|7[0-6])|7[7-9]\\d)\\d{6}", [9]]]], "EC": ["593", "00", "1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}", [8, 9, 10, 11], [["(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[2-7]"], "(0$1)", 0, "$1-$2-$3"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"]]], "0", 0, 0, 0, 0, 0, [0, ["964[0-2]\\d{5}|9(?:39|[57][89]|6[0-36-9]|[89]\\d)\\d{6}", [9]]]], "EE": ["372", "00", "8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]], ["(\\d{4})(\\d{3,4})", "$1 $2", ["[45]|8(?:00|[1-49])", "[45]|8(?:00[1-9]|[1-49])"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:5\\d{5}|8(?:1(?:0(?:000|[3-9]\\d\\d)|(?:1(?:0[236]|1\\d)|(?:23|[3-79]\\d)\\d)\\d)|2(?:0(?:000|(?:19|[2-7]\\d)\\d)|(?:(?:[124-6]\\d|3[5-9])\\d|7(?:[3679]\\d|8[13-9])|8(?:[2-6]\\d|7[01]))\\d)|[349]\\d{4}))\\d\\d|5(?:(?:[02]\\d|5[0-478])\\d|1(?:[0-8]\\d|95)|6(?:4[0-4]|5[1-589]))\\d{3}", [7, 8]]]], "EG": ["20", "00", "[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}", [8, 9, 10], [["(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"], ["(\\d{2})(\\d{6,7})", "$1 $2", ["1[35]|[4-6]|8[2468]|9[235-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[189]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["1[0-25]\\d{8}", [10]]]], "EH": ["212", "00", "[5-8]\\d{8}", [9], 0, "0", 0, 0, 0, 0, "528[89]", [0, ["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[017]\\d|2[0-2]|6[0-8]))\\d{6}"]]], "ER": ["291", "00", "[178]\\d{6}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[178]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:17[1-3]|7\\d\\d)\\d{4}"]]], "ES": ["34", "00", "[5-9]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:590[16]00\\d|9(?:6906(?:09|10)|7390\\d\\d))\\d\\d|(?:6\\d|7[1-48])\\d{7}"]]], "ET": ["251", "00", "(?:11|[2-59]\\d)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-59]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["9\\d{8}"]]], "FI": ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d)(\\d{4,9})", "$1 $2", ["[2568][1-8]|3(?:0[1-9]|[1-9])|9"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1 $2", ["[12]00|[368]|70[07-9]"], "0$1"], ["(\\d{2})(\\d{4,8})", "$1 $2", ["[1245]|7[135]"], "0$1"], ["(\\d{2})(\\d{6,10})", "$1 $2", ["7"], "0$1"]], "0", 0, 0, 0, 0, "1[03-79]|[2-9]", [0, ["4946\\d{2,6}|(?:4[0-8]|50)\\d{4,8}", [6, 7, 8, 9, 10]]], "00"], "FJ": ["679", "0(?:0|52)", "45\\d{5}|(?:0800\\d|[235-9])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[235-9]|45"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[279]\\d|45|5[01568]|8[034679])\\d{5}", [7]]], "00"], "FK": ["500", "00", "[2-7]\\d{4}", [5], 0, 0, 0, 0, 0, 0, 0, [0, ["[56]\\d{4}"]]], "FM": ["691", "00", "(?:[39]\\d\\d|820)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[389]"]]], 0, 0, 0, 0, 0, 0, [0, ["31(?:00[67]|208|309)\\d\\d|(?:3(?:[2357]0[1-9]|602|804|905)|(?:820|9[2-7]\\d)\\d)\\d{3}"]]], "FO": ["298", "00", "[2-9]\\d{5}", [6], [["(\\d{6})", "$1", ["[2-9]"]]], 0, 0, "(10(?:01|[12]0|88))", 0, 0, 0, [0, ["(?:[27][1-9]|5\\d|9[16])\\d{4}"]]], "FR": ["33", "00", "[1-9]\\d{8}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:6(?:[0-24-8]\\d|3[0-8]|9[589])|7(?:00|[3-9]\\d))\\d{6}"]]], "GA": ["241", "00", "(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}", [7, 8], [["(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["11|[67]"], "0$1"]], 0, 0, "0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[467]\\d{6})", "$1", 0, 0, [0, ["(?:(?:0[2-7]|7[467])\\d|6(?:0[0-4]|10|[256]\\d))\\d{5}|[2-7]\\d{6}"]]], "GB": ["44", "00", "[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}", [7, 9, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["800"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:(?:38|69)7|5(?:24|39)|768|946)", "1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["1(?:[2-69][02-9]|[78])"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[25]|7(?:0|6[02-9])", "[25]|7(?:0|6(?:[03-9]|2[356]))"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1389]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}", [10]]], 0, " x"], "GD": ["1", "011", "(?:473|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "473$1", 0, "473", [0, ["473(?:4(?:0[2-79]|1[04-9]|2[0-5]|58)|5(?:2[01]|3[3-8])|901)\\d{4}"]]], "GE": ["995", "00", "(?:[3-57]\\d\\d|800)\\d{6}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["32"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[57]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[348]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["5(?:(?:0555|1(?:[17]77|555))[5-9]|757(?:7[7-9]|8[01]))\\d{3}|5(?:0070|11(?:33|51)|[25]222|3333)[0-4]\\d{3}|5(?:00(?:0\\d|5[05])|11(?:00|1\\d|2[0-4]|3[01])|5200|75(?:00|[57]5)|8(?:0(?:[01]\\d|2[0-4])|58[89]|8(?:55|88)))\\d{4}|(?:5(?:[14]4|5[0157-9]|68|7[0147-9]|9[1-35-9])|790)\\d{6}"]]], "GF": ["594", "00", "(?:[56]94|80\\d|976)\\d{6}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["694(?:[0-249]\\d|3[0-48])\\d{4}"]]], "GG": ["44", "00", "(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?", [7, 9, 10], 0, "0", 0, "0|([25-9]\\d{5})$", "1481$1", 0, 0, [0, ["7(?:(?:781|839)\\d|911[17])\\d{5}", [10]]]], "GH": ["233", "00", "(?:[235]\\d{3}|800)\\d{5}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:2(?:[0346-8]\\d|5[67])|5(?:[0457]\\d|6[01]|9[1-9]))\\d{6}", [9]]]], "GI": ["350", "00", "(?:[25]\\d\\d|606)\\d{5}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["2"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:5[146-8]\\d|606)\\d{5}"]]], "GL": ["299", "00", "(?:19|[2-689]\\d|70)\\d{4}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["19|[2-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["[245]\\d{5}"]]], "GM": ["220", "00", "[2-9]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[23679]\\d|5[0-389])\\d{5}"]]], "GN": ["224", "00", "722\\d{6}|(?:3|6\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]]], 0, 0, 0, 0, 0, 0, [0, ["6[0-356]\\d{7}", [9]]]], "GP": ["590", "00", "(?:590|(?:69|80)\\d|976)\\d{6}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))\\d{4}"]]], "GQ": ["240", "00", "222\\d{6}|(?:3\\d|55|[89]0)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]], ["(\\d{3})(\\d{6})", "$1 $2", ["[89]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:222|55\\d)\\d{6}"]]], "GR": ["30", "00", "5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}", [10, 11, 12], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]], ["(\\d{4})(\\d{6})", "$1 $2", ["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2689]"]], ["(\\d{3})(\\d{3,4})(\\d{5})", "$1 $2 $3", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["68[57-9]\\d{7}|(?:69|94)\\d{8}", [10]]]], "GT": ["502", "00", "(?:1\\d{3}|[2-7])\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]], 0, 0, 0, 0, 0, 0, [0, ["[3-5]\\d{7}", [8]]]], "GU": ["1", "011", "(?:[58]\\d\\d|671|900)\\d{7}", [10], 0, "1", 0, "1|([3-9]\\d{6})$", "671$1", 0, "671", [0, ["671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}"]]], "GW": ["245", "00", "[49]\\d{8}|4\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["40"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"]]], 0, 0, 0, 0, 0, 0, [0, ["9(?:5\\d|6[569]|77)\\d{6}", [9]]]], "GY": ["592", "001", "9008\\d{3}|(?:[2-467]\\d\\d|862)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-46-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:6\\d\\d|70[015-7])\\d{4}"]]], "HK": ["852", "00(?:30|5[09]|[126-9]?)", "8[0-46-9]\\d{6,7}|9\\d{4,7}|(?:[2-7]|9\\d{3})\\d{7}", [5, 6, 7, 8, 9, 11], [["(\\d{3})(\\d{2,5})", "$1 $2", ["900", "9003"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{3})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:4(?:44[5-9]|6(?:0[0-7]|1[0-6]|4[0-57-9]|6[0-4]|7[0-8]))|573[0-6]|6(?:26[013-8]|66[0-3])|70(?:7[1-5]|8[0-4])|848[015-9]|9(?:29[013-9]|59[0-4]))\\d{4}|(?:4(?:40|6[2358])|5(?:[1-59][0-46-9]|6[0-4689]|7[0-24679])|6(?:0[1-9]|[13-59]\\d|[268][0-57-9]|7[0-79])|84[09]|9(?:0[1-9]|1[02-9]|[2358][0-8]|[467]\\d))\\d{5}", [8]]], "00"], "HN": ["504", "00", "8\\d{10}|[237-9]\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["[237-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["[37-9]\\d{7}", [8]]]], "HR": ["385", "00", "(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}", [6, 7, 8, 9], [["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["6[01]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[67]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-5]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["98\\d{6,7}|975(?:1\\d|9[67])\\d{4}|9(?:0[1-9]|[1259]\\d|7[0679])\\d{6}", [8, 9]]]], "HT": ["509", "00", "[2-489]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[2-489]"]]], 0, 0, 0, 0, 0, 0, [0, ["[34]\\d{7}"]]], "HU": ["36", "00", "[235-7]\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "06 $1"]], "06", 0, 0, 0, 0, 0, [0, ["(?:[257]0|3[01])\\d{7}", [9]]]], "ID": ["62", "00[89]", "(?:(?:00[1-9]|8\\d)\\d{4}|[1-36])\\d{6}|00\\d{10}|[1-9]\\d{8,10}|[2-9]\\d{7}", [7, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["15"]], ["(\\d{2})(\\d{5,9})", "$1 $2", ["2[124]|[36]1"], "(0$1)"], ["(\\d{3})(\\d{5,7})", "$1 $2", ["800"], "0$1"], ["(\\d{3})(\\d{5,8})", "$1 $2", ["[2-79]"], "(0$1)"], ["(\\d{3})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"], ["(\\d{3})(\\d{6,8})", "$1 $2", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"], ["(\\d{3})(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["8[1-35-9]\\d{7,10}", [9, 10, 11, 12]]]], "IE": ["353", "00", "(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}", [7, 8, 9, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"], ["(\\d{3})(\\d{5})", "$1 $2", ["[45]0"], "(0$1)"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2569]|4[1-69]|7[14]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["4"], "(0$1)"], ["(\\d{2})(\\d)(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["8(?:22|[35-9]\\d)\\d{6}", [9]]]], "IL": ["972", "0(?:0|1[2-9])", "1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}", [7, 8, 9, 10, 11, 12], [["(\\d{4})(\\d{3})", "$1-$2", ["125"]], ["(\\d{4})(\\d{2})(\\d{2})", "$1-$2-$3", ["121"]], ["(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1-$2-$3", ["12"]], ["(\\d{4})(\\d{6})", "$1-$2", ["159"]], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"]], ["(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})", "$1-$2 $3-$4", ["15"]]], "0", 0, 0, 0, 0, 0, [0, ["5(?:(?:[02368]\\d|[19][2-9]|4[1-9])\\d|5(?:01|1[79]|2[2-9]|3[0-3]|4[34]|5[015689]|6[6-8]|7[0-267]|8[7-9]|9[1-9]))\\d{5}", [9]]]], "IM": ["44", "00", "1624\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "0|([25-8]\\d{5})$", "1624$1", 0, "74576|(?:16|7[56])24", [0, ["76245[06]\\d{4}|7(?:4576|[59]24\\d|624[0-4689])\\d{5}"]]], "IN": ["91", "00", "(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}", [8, 9, 10, 11, 12, 13], [["(\\d{8})", "$1", ["5(?:0|2[23]|3[03]|[67]1|88)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"], 0, 1], ["(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], 0, 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79[1-7]|80[2-46]", "11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])", "11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"], "0$1", 1], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807", "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]", "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"], "0$1", 1], ["(\\d{5})(\\d{5})", "$1 $2", ["[6-9]"], "0$1", 1], ["(\\d{4})(\\d{2,4})(\\d{4})", "$1 $2 $3", ["1(?:6|8[06])", "1(?:6|8[06]0)"], 0, 1], ["(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18"], 0, 1]], "0", 0, 0, 0, 0, 0, [0, ["(?:61279|7(?:887[02-9]|9(?:313|79[07-9]))|8(?:079[04-9]|(?:84|91)7[02-8]))\\d{5}|(?:6(?:12|[2-47]1|5[17]|6[13]|80)[0189]|7(?:1(?:2[0189]|9[0-5])|2(?:[14][017-9]|8[0-59])|3(?:2[5-8]|[34][017-9]|9[016-9])|4(?:1[015-9]|[29][89]|39|8[389])|5(?:[15][017-9]|2[04-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589])|70[0289]|88[089]|97[02-8])|8(?:0(?:6[67]|7[02-8])|70[017-9]|84[01489]|91[0-289]))\\d{6}|(?:7(?:31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[0189]\\d|7[02-8])\\d{5}|(?:6(?:[09]\\d|1[04679]|2[03689]|3[05-9]|4[0489]|50|6[069]|7[07]|8[7-9])|7(?:0\\d|2[0235-79]|3[05-8]|40|5[0346-8]|6[6-9]|7[1-9]|8[0-79]|9[089])|8(?:0[01589]|1[0-57-9]|2[235-9]|3[03-57-9]|[45]\\d|6[02457-9]|7[1-69]|8[0-25-9]|9[02-9])|9\\d\\d)\\d{7}|(?:6(?:(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|8[124-6])\\d|7(?:[235689]\\d|4[0189]))|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-5])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]|881))[0189]\\d{5}", [10]]]], "IO": ["246", "00", "3\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["3"]]], 0, 0, 0, 0, 0, 0, [0, ["38\\d{5}"]]], "IQ": ["964", "00", "(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7[3-9]\\d{8}", [10]]]], "IR": ["98", "00", "[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}", [4, 5, 6, 7, 10], [["(\\d{4,5})", "$1", ["96"], "0$1"], ["(\\d{2})(\\d{4,5})", "$1 $2", ["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["9(?:(?:0(?:[0-35]\\d|4[4-6])|(?:[13]\\d|2[0-3])\\d)\\d|9(?:[0-46]\\d\\d|5[15]0|8(?:1\\d|88)|9(?:0[0-3]|[19]\\d|21|77|8[7-9])))\\d{5}", [10]]]], "IS": ["354", "00|1(?:0(?:01|[12]0)|100)", "(?:38\\d|[4-9])\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:38[589]\\d\\d|6(?:1[1-8]|2[0-6]|3[026-9]|4[014679]|5[0159]|6[0-69]|70|8[06-8]|9\\d)|7(?:5[057]|[6-9]\\d)|8(?:2[0-59]|[3-69]\\d|8[238]))\\d{4}"]], "00"], "IT": ["39", "00", "0\\d{5,10}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?", [6, 7, 8, 9, 10, 11], [["(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]], ["(\\d{3})(\\d{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]], ["(\\d{4})(\\d{2,6})", "$1 $2", ["0(?:[13-579][2-46-8]|8[236-8])"]], ["(\\d{4})(\\d{4})", "$1 $2", ["894"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1(?:44|[679])|[378]"]], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]|14"]], ["(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["3"]]], 0, 0, 0, 0, 0, 0, [0, ["3[1-9]\\d{8}|3[2-9]\\d{7}", [9, 10]]]], "JE": ["44", "00", "1534\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "0|([0-24-8]\\d{5})$", "1534$1", 0, 0, [0, ["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97[7-9]))\\d{5}"]]], "JM": ["1", "011", "(?:[58]\\d\\d|658|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "658|876", [0, ["(?:658295|876(?:2(?:0[1-9]|[13-9]\\d|2[013-9])|[348]\\d\\d|5(?:0[1-9]|[1-9]\\d)|6(?:4[89]|6[67])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579])))\\d{4}"]]], "JO": ["962", "00", "(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["70"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7(?:[78][0-25-9]|9\\d)\\d{6}", [9]]]], "JP": ["81", "010", "00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}", [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [["(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"], ["(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:80|9[16])", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9]|636)|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9]|636[457-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["[36]|4(?:2[09]|7[01])", "[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[27-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9])|5(?:2|3[045]|4[0-369]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|49|51|6(?:[0-24]|36|5[0-3589]|72|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:49|55|83)[29]|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|7[015-9]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17|3[015-9]))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9(?:[019]|4[1-3]|6(?:[0-47-9]|5[01346-9])))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|829(?:2|66)|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["[14]|[289][2-9]|5[3-9]|7[2-4679]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[257-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["[7-9]0[1-9]\\d{7}", [10]]]], "KE": ["254", "000", "(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}", [7, 8, 9, 10], [["(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["[17]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:1(?:0[0-6]|1[0-5]|2[014]|30)|7\\d\\d)\\d{6}", [9]]]], "KG": ["996", "00", "8\\d{9}|(?:[235-8]\\d|99)\\d{7}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[346]|[24-79])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-79]|88"], "0$1"], ["(\\d{3})(\\d{3})(\\d)(\\d{2,3})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["312(?:58\\d|973)\\d{3}|(?:2(?:0[0-35]|2\\d)|5[0-24-7]\\d|7(?:[07]\\d|55)|88[08]|99[05-9])\\d{6}", [9]]]], "KH": ["855", "00[14-9]", "1\\d{9}|[1-9]\\d{7,8}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0", 0, 0, 0, 0, 0, [0, ["(?:(?:1[28]|3[18]|9[67])\\d|6[016-9]|7(?:[07-9]|[16]\\d)|8(?:[013-79]|8\\d))\\d{6}|(?:1\\d|9[0-57-9])\\d{6}|(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])48\\d{5}", [8, 9]]]], "KI": ["686", "00", "(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}", [5, 8], 0, "0", 0, 0, 0, 0, 0, [0, ["(?:63\\d{3}|73(?:0[0-5]\\d|140))\\d{3}|[67]200[01]\\d{3}", [8]]]], "KM": ["269", "00", "[3478]\\d{6}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[3478]"]]], 0, 0, 0, 0, 0, 0, [0, ["[34]\\d{6}"]]], "KN": ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-7]\\d{6})$", "869$1", 0, "869", [0, ["869(?:48[89]|55[6-8]|66\\d|76[02-7])\\d{4}"]]], "KP": ["850", "00|99", "85\\d{6}|(?:19\\d|[2-7])\\d{7}", [8, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["19[1-3]\\d{7}", [10]]]], "KR": ["82", "00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))", "00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}", [5, 6, 8, 9, 10, 11, 12, 13, 14], [["(\\d{2})(\\d{3,4})", "$1-$2", ["(?:3[1-3]|[46][1-4]|5[1-5])1"], "0$1"], ["(\\d{4})(\\d{4})", "$1-$2", ["1"]], ["(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60|8"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["[1346]|5[1-5]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["5"], "0$1"]], "0", 0, "0(8(?:[1-46-8]|5\\d\\d))?", 0, 0, 0, [0, ["1(?:05(?:[0-8]\\d|9[0-6])|22[13]\\d)\\d{4,5}|1(?:0[1-46-9]|[16-9]\\d|2[013-9])\\d{6,7}", [9, 10]]]], "KW": ["965", "00", "18\\d{5}|(?:[2569]\\d|41)\\d{6}", [7, 8], [["(\\d{4})(\\d{3,4})", "$1 $2", ["[169]|2(?:[235]|4[1-35-9])|52"]], ["(\\d{3})(\\d{5})", "$1 $2", ["[245]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:41\\d\\d|5(?:(?:[05]\\d|1[0-7]|6[56])\\d|2(?:22|5[25])|7(?:55|77)|88[58])|6(?:(?:0[034679]|5[015-9]|6\\d)\\d|111|222|333|444|7(?:0[013-9]|[67]\\d)|888|9(?:[069]\\d|3[039]))|9(?:(?:0[09]|22|[4679]\\d|8[057-9])\\d|1(?:1[01]|99)|3(?:00|33)|5(?:00|5\\d)))\\d{4}", [8]]]], "KY": ["1", "011", "(?:345|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "345$1", 0, "345", [0, ["345(?:32[1-9]|42[0-4]|5(?:1[67]|2[5-79]|4[6-9]|50|76)|649|82[56]|9(?:1[679]|2[2-9]|3[06-9]|90))\\d{4}"]]], "KZ": ["7", "810", "(?:33622|8\\d{8})\\d{5}|[78]\\d{9}", [10, 14], 0, "8", 0, 0, 0, 0, "33|7", [0, ["7(?:0[0-25-8]|47|6[0-4]|7[15-8]|85)\\d{7}", [10]]], "8~10"], "LA": ["856", "00", "[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["30[013-9]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:20(?:[239]\\d|5[24-9]|7[6-8]|88)|302\\d)\\d{6}", [10]]]], "LB": ["961", "00", "[27-9]\\d{7}|[13-9]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27-9]"]]], "0", 0, 0, 0, 0, 0, [0, ["793(?:[01]\\d|2[0-4])\\d{3}|(?:(?:3|81)\\d|7(?:[01]\\d|6[013-9]|8[89]|9[12]))\\d{5}"]]], "LC": ["1", "011", "(?:[58]\\d\\d|758|900)\\d{7}", [10], 0, "1", 0, "1|([2-8]\\d{6})$", "758$1", 0, "758", [0, ["758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2\\d|3[0-3])|812)\\d{4}"]]], "LI": ["423", "00", "[68]\\d{8}|(?:[2378]\\d|90)\\d{5}", [7, 9], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2379]|8(?:0[09]|7)", "[2379]|8(?:0(?:02|9)|7)"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["69"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]], "0", 0, "0|(1001)", 0, 0, 0, [0, ["(?:6(?:(?:4[5-9]|5[0-4])\\d|6(?:[0245]\\d|[17]0|3[7-9]))\\d|7(?:[37-9]\\d|42|56))\\d{4}"]]], "LK": ["94", "00", "[1-9]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[1-689]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7(?:[0-25-8]\\d|4[0-4])\\d{6}"]]], "LR": ["231", "00", "(?:2|33|5\\d|77|88)\\d{7}|[4-6]\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[4-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3578]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:(?:330|555|(?:77|88)\\d)\\d|4[67])\\d{5}|[56]\\d{6}", [7, 9]]]], "LS": ["266", "00", "(?:[256]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2568]"]]], 0, 0, 0, 0, 0, 0, [0, ["[56]\\d{7}"]]], "LT": ["370", "00", "(?:[3469]\\d|52|[78]0)\\d{6}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["52[0-7]"], "(8-$1)", 1], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "8 $1", 1], ["(\\d{2})(\\d{6})", "$1 $2", ["37|4(?:[15]|6[1-8])"], "(8-$1)", 1], ["(\\d{3})(\\d{5})", "$1 $2", ["[3-6]"], "(8-$1)", 1]], "8", 0, "[08]", 0, 0, 0, [0, ["6\\d{7}"]]], "LU": ["352", "00", "35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}", [4, 5, 6, 7, 8, 9, 10, 11], [["(\\d{2})(\\d{3})", "$1 $2", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20[2-689]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"]], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["80[01]|90[015]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})", "$1 $2 $3 $4", ["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]]], 0, 0, "(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)", 0, 0, 0, [0, ["6(?:[269][18]|5[1568]|7[189]|81)\\d{6}", [9]]]], "LV": ["371", "00", "(?:[268]\\d|90)\\d{6}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[269]|8[01]"]]], 0, 0, 0, 0, 0, 0, [0, ["2\\d{7}"]]], "LY": ["218", "00", "[2-9]\\d{8}", [9], [["(\\d{2})(\\d{7})", "$1-$2", ["[2-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["9[1-6]\\d{7}"]]], "MA": ["212", "00", "[5-8]\\d{8}", [9], [["(\\d{5})(\\d{4})", "$1-$2", ["5(?:29|38)", "5(?:29[89]|389)", "5(?:29[89]|389)0"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5[45]"], "0$1"], ["(\\d{4})(\\d{5})", "$1-$2", ["5(?:2[2-489]|3[5-9]|9)|892", "5(?:2(?:[2-49]|8[235-9])|3[5-9]|9)|892"], "0$1"], ["(\\d{2})(\\d{7})", "$1-$2", ["8"], "0$1"], ["(\\d{3})(\\d{6})", "$1-$2", ["[5-7]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[017]\\d|2[0-2]|6[0-8]))\\d{6}"]]], "MC": ["377", "00", "(?:[3489]|6\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[389]"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["4(?:[46]\\d|5[1-9])\\d{5}|(?:3|6\\d)\\d{7}"]]], "MD": ["373", "00", "(?:[235-7]\\d|[89]0)\\d{6}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[25-7]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["562\\d{5}|(?:6\\d|7[16-9])\\d{6}"]]], "ME": ["382", "00", "(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["6(?:[07-9]\\d|3[024]|6[0-25])\\d{5}", [8]]]], "MF": ["590", "00", "(?:590|(?:69|80)\\d|976)\\d{6}", [9], 0, "0", 0, 0, 0, 0, 0, [0, ["69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))\\d{4}"]]], "MG": ["261", "00", "[23]\\d{8}", [9], [["(\\d{2})(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0", 0, "0|([24-9]\\d{6})$", "20$1", 0, 0, [0, ["3[2-489]\\d{7}"]]], "MH": ["692", "011", "329\\d{4}|(?:[256]\\d|45)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-6]"]]], "1", 0, 0, 0, 0, 0, [0, ["(?:(?:23|54)5|329|45[356])\\d{4}"]]], "MK": ["389", "00", "[2-578]\\d{7}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2|34[47]|4(?:[37]7|5[47]|64)"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7(?:3555|4(?:60\\d|747)|94(?:[01]\\d|2[0-4]))\\d{3}|7(?:[0-25-8]\\d|3[1-4]|42|9[23])\\d{5}"]]], "ML": ["223", "00", "[24-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["2(?:0(?:01|79)|17\\d)\\d{4}|(?:5[01]|[679]\\d|8[239])\\d{6}"]]], "MM": ["95", "00", "1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}", [6, 7, 8, 9, 10], [["(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[45]|6(?:0[23]|[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-6]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[4-7]|8[1-35]"], "0$1"], ["(\\d)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92"], "0$1"], ["(\\d)(\\d{5})(\\d{4})", "$1 $2 $3", ["9"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:17[01]|9(?:2(?:[0-4]|[56]\\d\\d)|(?:3(?:[0-36]|4\\d)|(?:6\\d|9[4-8])\\d|7(?:3|40|[5-9]\\d)|8(?:78|[89]\\d))\\d|4(?:(?:[0245]\\d|[1379])\\d|88)|5[0-6])\\d)\\d{4}|9[69]1\\d{6}|9(?:[68]\\d|9[089])\\d{5}", [7, 8, 9, 10]]]], "MN": ["976", "001", "[12]\\d{7,9}|[57-9]\\d{7}", [8, 9, 10], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[12]1"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[57-9]"]], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["[12](?:27|3[2-8]|4[2-68]|5[1-4689])", "[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["[12]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:83[01]|920)\\d{5}|(?:5[05]|8[015689]|9[013-9])\\d{6}", [8]]]], "MO": ["853", "00", "0800\\d{3}|(?:28|[68]\\d)\\d{6}", [7, 8], [["(\\d{4})(\\d{3})", "$1 $2", ["0"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[268]"]]], 0, 0, 0, 0, 0, 0, [0, ["6800[0-79]\\d{3}|6(?:[235]\\d\\d|6(?:0[0-5]|[1-9]\\d)|8(?:0[1-9]|[14-8]\\d|2[5-9]|[39][0-4]))\\d{4}", [8]]]], "MP": ["1", "011", "[58]\\d{9}|(?:67|90)0\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "670$1", 0, "670", [0, ["670(?:2(?:3[3-7]|56|8[4-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}"]]], "MQ": ["596", "00", "(?:69|80)\\d{7}|(?:59|97)6\\d{6}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["69(?:6(?:[0-46-9]\\d|5[0-6])|727)\\d{4}"]]], "MR": ["222", "00", "(?:[2-4]\\d\\d|800)\\d{5}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-48]"]]], 0, 0, 0, 0, 0, 0, [0, ["[2-4][0-46-9]\\d{6}"]]], "MS": ["1", "011", "(?:[58]\\d\\d|664|900)\\d{7}", [10], 0, "1", 0, "1|([34]\\d{6})$", "664$1", 0, "664", [0, ["664(?:3(?:49|9[1-6])|49[2-6])\\d{4}"]]], "MT": ["356", "00", "3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2357-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:7(?:210|[79]\\d\\d)|9(?:[29]\\d\\d|69[67]|8(?:1[1-3]|89|97)))\\d{4}"]]], "MU": ["230", "0(?:0|[24-7]0|3[03])", "(?:5|8\\d\\d)\\d{7}|[2-468]\\d{6}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-46]|8[013]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["5"]], ["(\\d{5})(\\d{5})", "$1 $2", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["5(?:4(?:2[1-389]|7[1-9])|87[15-8])\\d{4}|5(?:2[5-9]|4[3-689]|[57]\\d|8[0-689]|9[0-8])\\d{5}", [8]]], "020"], "MV": ["960", "0(?:0|19)", "(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}", [7, 10], [["(\\d{3})(\\d{4})", "$1-$2", ["[3467]|9[13-9]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"]]], 0, 0, 0, 0, 0, 0, [0, ["46[46]\\d{4}|(?:7\\d|9[13-9])\\d{5}", [7]]], "00"], "MW": ["265", "00", "(?:[129]\\d|31|77|88)\\d{7}|1\\d{6}", [7, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[137-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["111\\d{6}|(?:31|77|88|9[89])\\d{7}", [9]]]], "MX": ["52", "0[09]", "1(?:(?:44|99)[1-9]|65[0-689])\\d{7}|(?:1(?:[017]\\d|[235][1-9]|4[0-35-9]|6[0-46-9]|8[1-79]|9[1-8])|[2-9]\\d)\\d{8}", [10, 11], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["33|5[56]|81"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-9]"], 0, 1], ["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 $3 $4", ["1(?:33|5[56]|81)"], 0, 1], ["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 $3 $4", ["1"], 0, 1]], "01", 0, "0(?:[12]|4[45])|1", 0, 0, 0, [0, ["6571\\d{6}|(?:1(?:2(?:2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-7][1-9]|3[1-8]|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[1-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1-467][1-9]|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))|2(?:2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[25-7][1-9]|3[1-8]|4\\d|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[1-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1-467][1-9]|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|6[1-9]|7[12]|8[1-8]|9\\d))\\d{7}"]], "00"], "MY": ["60", "00", "1\\d{8,9}|(?:3\\d|[4-9])\\d{7}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1(?:[02469]|[378][1-9]|53)|8", "1(?:[02469]|[37][1-9]|53|8(?:[1-46-9]|5[7-9]))|8"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1(?:[367]|80)"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2 $3", ["1"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["1(?:1888[689]|4400|8(?:47|8[27])[0-4])\\d{4}|1(?:0(?:[23568]\\d|4[0-6]|7[016-9]|9[0-8])|1(?:[1-5]\\d\\d|6(?:0[5-9]|[1-9]\\d)|7(?:[0134]\\d|2[1-9]|5[0-6]))|(?:[269]\\d|[37][1-9]|4[235-9])\\d|5(?:31|9\\d\\d)|8(?:1[23]|[236]\\d|4[06]|5(?:46|[7-9])|7[016-9]|8[01]|9[0-8]))\\d{5}", [9, 10]]]], "MZ": ["258", "00", "(?:2|8\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-79]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["8[2-79]\\d{7}", [9]]]], "NA": ["264", "00", "[68]\\d{7,8}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["87"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:60|8[1245])\\d{7}", [9]]]], "NC": ["687", "00", "(?:050|[2-57-9]\\d\\d)\\d{3}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[02-57-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:5[0-4]|[79]\\d|8[0-79])\\d{4}"]]], "NE": ["227", "00", "[027-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[089]|2[013]|7[04]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:23|7[04]|[89]\\d)\\d{6}"]]], "NF": ["672", "00", "[13]\\d{5}", [6], [["(\\d{2})(\\d{4})", "$1 $2", ["1[0-3]"]], ["(\\d)(\\d{5})", "$1 $2", ["[13]"]]], 0, 0, "([0-258]\\d{4})$", "3$1", 0, 0, [0, ["(?:14|3[58])\\d{4}"]]], "NG": ["234", "009", "(?:[124-7]|9\\d{3})\\d{6}|[1-9]\\d{7}|[78]\\d{9,13}", [7, 8, 10, 11, 12, 13, 14], [["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["78"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]|9(?:0[3-9]|[1-9])"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[3-7]|8[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[7-9]"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{3})(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:702[0-24-9]|8(?:01|19)[01])\\d{6}|(?:70[13-689]|8(?:0[2-9]|1[0-8])|9(?:0[1-9]|1[2356]))\\d{7}", [10]]]], "NI": ["505", "00", "(?:1800|[25-8]\\d{3})\\d{4}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[125-8]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:5(?:5[0-7]|[78]\\d)|6(?:20|3[035]|4[045]|5[05]|77|8[1-9]|9[059])|(?:7[5-8]|8\\d)\\d)\\d{5}"]]], "NL": ["31", "00", "(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}", [5, 6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["66"], "0$1"], ["(\\d)(\\d{8})", "$1 $2", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-578]|91"], "0$1"], ["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3", ["9"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:6[1-58]|970\\d)\\d{7}", [9, 11]]]], "NO": ["47", "00", "(?:0|[2-9]\\d{3})\\d{4}", [5, 8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[489]|59"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-7]"]]], 0, 0, 0, 0, 0, "[02-689]|7[0-8]", [0, ["(?:4[015-8]|59|9\\d)\\d{6}", [8]]]], "NP": ["977", "00", "(?:1\\d|9)\\d{9}|[1-9]\\d{7}", [8, 10, 11], [["(\\d)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"], ["(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-579]|6[2-6])"], "0$1"], ["(\\d{3})(\\d{7})", "$1-$2", ["9"]]], "0", 0, 0, 0, 0, 0, [0, ["9(?:6[0-3]|7[24-6]|8[0-24-68])\\d{7}", [10]]]], "NR": ["674", "00", "(?:444|(?:55|8\\d)\\d|666)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[4-68]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:55[3-9]|666|8\\d\\d)\\d{4}"]]], "NU": ["683", "00", "(?:[47]|888\\d)\\d{3}", [4, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["888[4-9]\\d{3}", [7]]]], "NZ": ["64", "0(?:0|161)", "[29]\\d{7,9}|50\\d{5}(?:\\d{2,3})?|6[0-35-9]\\d{6}|7\\d{7,8}|8\\d{4,9}|(?:11\\d|[34])\\d{7}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,8})", "$1 $2", ["8[1-579]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["50[036-8]|[89]0", "50(?:[0367]|88)|[89]0"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["24|[346]|7[2-57-9]|9[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|[59]|80"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1|2[028]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:[169]|7[0-35-9])|7|86"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["2[0-27-9]\\d{7,8}|21\\d{6}", [8, 9, 10]]], "00"], "OM": ["968", "00", "(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}", [7, 8, 9], [["(\\d{3})(\\d{4,6})", "$1 $2", ["[58]"]], ["(\\d{2})(\\d{6})", "$1 $2", ["2"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[179]"]]], 0, 0, 0, 0, 0, 0, [0, ["1505\\d{4}|(?:7(?:[1289]\\d|7[0-4])|9(?:0[1-9]|[1-9]\\d))\\d{5}", [8]]]], "PA": ["507", "00", "(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}", [7, 8, 10, 11], [["(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]], ["(\\d{4})(\\d{4})", "$1-$2", ["[68]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:1[16]1|21[89]|6\\d{3}|8(?:1[01]|7[23]))\\d{4}", [7, 8]]]], "PE": ["51", "19(?:1[124]|77|90)00", "(?:[14-8]|9\\d)\\d{7}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["1"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[4-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"]]], "0", 0, 0, 0, 0, 0, [0, ["9\\d{8}", [9]]], 0, " Anexo "], "PF": ["689", "00", "4\\d{5}(?:\\d{2})?|8\\d{7,8}", [6, 8, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4|8[7-9]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["8[7-9]\\d{6}", [8]]]], "PG": ["675", "00|140[1-3]", "(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["18|[2-69]|85"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[78]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:7\\d|8[128])\\d{6}", [8]]], "00"], "PH": ["63", "00", "(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}", [6, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{5})", "$1 $2", ["2"], "(0$1)"], ["(\\d{4})(\\d{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"], "(0$1)"], ["(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|8[2-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]]], "0", 0, 0, 0, 0, 0, [0, ["(?:8(?:1[37]|9[5-8])|9(?:0[5-9]|1[0-24-9]|[235-7]\\d|4[2-9]|8[135-9]|9[1-9]))\\d{7}", [10]]]], "PK": ["92", "00", "122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{2,7})", "$1 $2 $3", ["[89]0"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["1"]], ["(\\d{3})(\\d{6,7})", "$1 $2", ["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])", "9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"], "(0$1)"], ["(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"], ["(\\d{5})(\\d{5})", "$1 $2", ["58"], "(0$1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["3"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[24-9]"], "(0$1)"]], "0", 0, 0, 0, 0, 0, [0, ["3(?:[0-24]\\d|3[0-7]|55|64)\\d{7}", [10]]]], "PL": ["48", "00", "6\\d{5}(?:\\d{2})?|8\\d{9}|[1-9]\\d{6}(?:\\d{2})?", [6, 7, 8, 9, 10], [["(\\d{5})", "$1", ["19"]], ["(\\d{3})(\\d{3})", "$1 $2", ["11|64"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1", "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["21|39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2-8]|[2-7]|8[1-79]|9[145]"]], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["21(?:1(?:[145]\\d|3[1-5])|2[0-4]\\d)\\d{4}|(?:45|5[0137]|6[069]|7[2389]|88)\\d{7}", [9]]]], "PM": ["508", "00", "(?:[45]|80\\d\\d)\\d{5}", [6, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[45]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:4[02-4]|5[056])\\d{4}", [6]]]], "PR": ["1", "011", "(?:[589]\\d\\d|787)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "787|939", [0, ["(?:787|939)[2-9]\\d{6}"]]], "PS": ["970", "00", "[2489]2\\d{6}|(?:1\\d|5)\\d{8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0", 0, 0, 0, 0, 0, [0, ["5[69]\\d{7}", [9]]]], "PT": ["351", "00", "1693\\d{5}|(?:[26-9]\\d|30)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["16|[236-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["6[0356]92(?:30|9\\d)\\d{3}|(?:(?:16|6[0356])93|9(?:[1-36]\\d\\d|480))\\d{5}"]]], "PW": ["680", "01[12]", "(?:[24-8]\\d\\d|345|900)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:(?:46|83)[0-5]|6[2-4689]0)\\d{4}|(?:45|77|88)\\d{5}"]]], "PY": ["595", "00", "59\\d{4,6}|9\\d{5,10}|(?:[2-46-8]\\d|5[0-8])\\d{4,7}", [6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"], "(0$1)"], ["(\\d{3})(\\d{4,5})", "$1 $2", ["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["87"]], ["(\\d{3})(\\d{6})", "$1 $2", ["9(?:[5-79]|8[1-6])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"]]], "0", 0, 0, 0, 0, 0, [0, ["9(?:51|6[129]|[78][1-6]|9[1-5])\\d{6}", [9]]]], "QA": ["974", "00", "[2-7]\\d{7}|800\\d{4}(?:\\d{2})?|2\\d{6}", [7, 8, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["2[126]|8"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:2[89]|[35-7]\\d)\\d{6}", [8]]]], "RE": ["262", "00", "976\\d{6}|(?:26|[68]\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2689]"], "0$1"]], "0", 0, 0, 0, 0, "26[23]|69|[89]", [0, ["(?:69(?:2\\d\\d|3(?:0[0-46]|1[013]|2[0-2]|3[0-39]|4\\d|5[0-5]|6[0-6]|7[0-27]|8[0-8]|9[0-479]))|976(?:2[27]|3[0-37]|9\\d))\\d{4}"]]], "RO": ["40", "00", "(?:[2378]\\d|90)\\d{7}|[23]\\d{5}", [6, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["2[3-6]", "2[3-6]\\d9"], "0$1"], ["(\\d{2})(\\d{4})", "$1 $2", ["219|31"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[237-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7020\\d{5}|7(?:0[013-9]|1[0-3]|[2-7]\\d|8[03-8]|9[019])\\d{6}", [9]]], 0, " int "], "RS": ["381", "00", "38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}", [6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{3,9})", "$1 $2", ["(?:2[389]|39)0|[7-9]"], "0$1"], ["(\\d{2})(\\d{5,10})", "$1 $2", ["[1-36]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["6(?:[0-689]|7\\d)\\d{6,7}", [8, 9, 10]]]], "RU": ["7", "810", "8\\d{13}|[347-9]\\d{9}", [10, 14], [["(\\d{4})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-8]|2[1-9])", "7(?:1(?:[0-6]2|7|8[27])|2(?:1[23]|[2-9]2))", "7(?:1(?:[0-6]2|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"], "8 ($1)", 1], ["(\\d{5})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-68]|2[1-9])", "7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))", "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[349]|8(?:[02-7]|1[1-8])"], "8 ($1)", 1], ["(\\d{4})(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["8"], "8 ($1)"]], "8", 0, 0, 0, 0, "3[04-689]|[489]", [0, ["9\\d{9}", [10]]], "8~10"], "RW": ["250", "00", "(?:06|[27]\\d\\d|[89]00)\\d{6}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"]]], "0", 0, 0, 0, 0, 0, [0, ["7[2389]\\d{7}", [9]]]], "SA": ["966", "00", "92\\d{7}|(?:[15]|8\\d)\\d{8}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["9"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["81"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]], "0", 0, 0, 0, 0, 0, [0, ["579[01]\\d{5}|5(?:[013-689]\\d|7[0-35-8])\\d{6}", [9]]]], "SB": ["677", "0[01]", "(?:[1-6]|[7-9]\\d\\d)\\d{4}", [5, 7], [["(\\d{2})(\\d{5})", "$1 $2", ["7|8[4-9]|9(?:[1-8]|9[0-8])"]]], 0, 0, 0, 0, 0, 0, [0, ["48\\d{3}|(?:(?:7[1-9]|8[4-9])\\d|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8]))\\d{4}"]]], "SC": ["248", "010|0[0-2]", "800\\d{4}|(?:[249]\\d|64)\\d{5}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]|9[57]"]]], 0, 0, 0, 0, 0, 0, [0, ["2[125-8]\\d{5}"]], "00"], "SD": ["249", "00", "[19]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[19]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:1[0-2]|9[0-3569])\\d{7}"]]], "SE": ["46", "00", "(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}", [6, 7, 8, 9, 10], [["(\\d{2})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{4})", "$1-$2", ["9(?:00|39|44|9)"], "0$1", 0, "$1 $2"], ["(\\d{2})(\\d{3})(\\d{2})", "$1-$2 $3", ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3"], ["(\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{2,3})(\\d{3})", "$1-$2 $3", ["9(?:00|39|44)"], "0$1", 0, "$1 $2 $3"], ["(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["10|7"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4 $5", ["[26]"], "0$1", 0, "$1 $2 $3 $4 $5"]], "0", 0, 0, 0, 0, 0, [0, ["7[02369]\\d{7}", [9]]]], "SG": ["65", "0[0-3]\\d", "(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}", [8, 10, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[369]|8(?:0[1-5]|[1-9])"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]], 0, 0, 0, 0, 0, 0, [0, ["8(?:051|95[0-2])\\d{4}|(?:8(?:0[1-4]|[1-8]\\d|9[0-4])|9[0-8]\\d)\\d{5}", [8]]]], "SH": ["290", "00", "(?:[256]\\d|8)\\d{3}", [4, 5], 0, 0, 0, 0, 0, 0, "[256]", [0, ["[56]\\d{4}", [5]]]], "SI": ["386", "00|10(?:22|66|88|99)", "[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}", [5, 6, 7, 8], [["(\\d{2})(\\d{3,6})", "$1 $2", ["8[09]|9"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["59|8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[0139]|51|6"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-57]"], "(0$1)"]], "0", 0, 0, 0, 0, 0, [0, ["65(?:1\\d|55|6[01]|70)\\d{4}|(?:[37][01]|4[0139]|51|6[489])\\d{6}", [8]]], "00"], "SJ": ["47", "00", "0\\d{4}|(?:[489]\\d|[57]9)\\d{6}", [5, 8], 0, 0, 0, 0, 0, 0, "79", [0, ["(?:4[015-8]|59|9\\d)\\d{6}", [8]]]], "SK": ["421", "00", "[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}", [6, 7, 9], [["(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["[3-5][1-8]1", "[3-5][1-8]1[67]"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["909[1-9]\\d{5}|9(?:0[1-8]|1[0-24-9]|4[03-57-9]|5\\d)\\d{6}", [9]]]], "SL": ["232", "00", "(?:[237-9]\\d|66)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[236-9]"], "(0$1)"]], "0", 0, 0, 0, 0, 0, [0, ["(?:25|3[0-5]|66|7[2-9]|8[08]|9[09])\\d{6}"]]], "SM": ["378", "00", "(?:0549|[5-7]\\d)\\d{6}", [8, 10], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]], ["(\\d{4})(\\d{6})", "$1 $2", ["0"]]], 0, 0, "([89]\\d{5})$", "0549$1", 0, 0, [0, ["6[16]\\d{6}", [8]]]], "SN": ["221", "00", "(?:[378]\\d|93)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]]], 0, 0, 0, 0, 0, 0, [0, ["75(?:01|[38]3)\\d{5}|7(?:[06-8]\\d|21|5[4-7]|90)\\d{6}"]]], "SO": ["252", "00", "[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}", [6, 7, 8, 9], [["(\\d{2})(\\d{4})", "$1 $2", ["8[125]"]], ["(\\d{6})", "$1", ["[134]"]], ["(\\d)(\\d{6})", "$1 $2", ["[15]|2[0-79]|3[0-46-8]|4[0-7]"]], ["(\\d)(\\d{7})", "$1 $2", ["24|[67]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[3478]|64|90"]], ["(\\d{2})(\\d{5,7})", "$1 $2", ["1|28|6(?:0[5-7]|[1-35-9])|9[2-9]"]]], "0", 0, 0, 0, 0, 0, [0, ["(?:(?:15|(?:3[59]|4[89]|79|8[08])\\d|6(?:0[5-7]|[1-9]\\d)|9(?:0\\d|[2-9]))\\d|2(?:4\\d|8))\\d{5}|(?:6\\d|7[1-9])\\d{6}", [7, 8, 9]]]], "SR": ["597", "00", "(?:[2-5]|68|[78]\\d)\\d{5}", [6, 7], [["(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]], ["(\\d{3})(\\d{3})", "$1-$2", ["[2-5]"]], ["(\\d{3})(\\d{4})", "$1-$2", ["[6-8]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:7[124-7]|8[124-9])\\d{5}", [7]]]], "SS": ["211", "00", "[19]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[19]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:12|9[1257-9])\\d{7}"]]], "ST": ["239", "00", "(?:22|9\\d)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[29]"]]], 0, 0, 0, 0, 0, 0, [0, ["900[5-9]\\d{3}|9(?:0[1-9]|[89]\\d)\\d{4}"]]], "SV": ["503", "00", "[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?", [7, 8, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[89]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[267]"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]]], 0, 0, 0, 0, 0, 0, [0, ["66(?:[02-9]\\d\\d|1(?:[02-9]\\d|16))\\d{3}|(?:6[0-57-9]|7\\d)\\d{6}", [8]]]], "SX": ["1", "011", "7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|(5\\d{6})$", "721$1", 0, "721", [0, ["7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}"]]], "SY": ["963", "00", "[1-39]\\d{8}|[1-5]\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-5]"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1", 1]], "0", 0, 0, 0, 0, 0, [0, ["9[1-689]\\d{7}", [9]]]], "SZ": ["268", "00", "0800\\d{4}|(?:[237]\\d|900)\\d{6}", [8, 9], [["(\\d{4})(\\d{4})", "$1 $2", ["[0237]"]], ["(\\d{5})(\\d{4})", "$1 $2", ["9"]]], 0, 0, 0, 0, 0, 0, [0, ["7[6-9]\\d{6}", [8]]]], "TA": ["290", "00", "8\\d{3}", [4], 0, 0, 0, 0, 0, 0, "8"], "TC": ["1", "011", "(?:[58]\\d\\d|649|900)\\d{7}", [10], 0, "1", 0, "1|([2-479]\\d{6})$", "649$1", 0, "649", [0, ["649(?:2(?:3[129]|4[1-79])|3\\d\\d|4[34][1-3])\\d{4}"]]], "TD": ["235", "00|16", "(?:22|[69]\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2679]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:6[023568]|77|9\\d)\\d{6}"]], "00"], "TG": ["228", "00", "[279]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[279]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:7[09]|9[0-36-9])\\d{6}"]]], "TH": ["66", "00[1-9]", "(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}", [8, 9, 10, 13], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[13-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0", 0, 0, 0, 0, 0, [0, ["671[0-8]\\d{5}|(?:14|6[1-6]|[89]\\d)\\d{7}", [9]]]], "TJ": ["992", "810", "(?:00|[1-57-9]\\d)\\d{7}", [9], [["(\\d{6})(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317"]], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[34]7|91[78]"]], ["(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3[1-5]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[0-57-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["41[18]\\d{6}|(?:[034]0|[17][017]|2[02]|5[05]|8[08]|9\\d)\\d{7}"]], "8~10"], "TK": ["690", "00", "[2-47]\\d{3,6}", [4, 5, 6, 7], 0, 0, 0, 0, 0, 0, 0, [0, ["7[2-4]\\d{2,5}"]]], "TL": ["670", "00", "7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-489]|70"]], ["(\\d{4})(\\d{4})", "$1 $2", ["7"]]], 0, 0, 0, 0, 0, 0, [0, ["7[2-8]\\d{6}", [8]]]], "TM": ["993", "810", "[1-6]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-5]"], "(8 $1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["6"], "8 $1"]], "8", 0, 0, 0, 0, 0, [0, ["6\\d{7}"]], "8~10"], "TN": ["216", "00", "[2-57-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["3(?:001|[12]40)\\d{4}|(?:(?:[259]\\d|4[0-7])\\d|3(?:1[1-35]|6[0-4]|91))\\d{5}"]]], "TO": ["676", "00", "(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}", [5, 7], [["(\\d{2})(\\d{3})", "$1-$2", ["[2-4]|50|6[09]|7[0-24-69]|8[05]"]], ["(\\d{4})(\\d{3})", "$1 $2", ["0"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[5-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:55[4-6]|6(?:[09]\\d|3[02]|8[15-9])|(?:7\\d|8[46-9])\\d|999)\\d{4}", [7]]]], "TR": ["90", "00", "4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}", [7, 10, 12, 13], [["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["512|8[01589]|90"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5(?:[0-59]|61)", "5(?:[0-59]|616)", "5(?:[0-59]|6161)"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24][1-8]|3[1-9]"], "(0$1)", 1], ["(\\d{3})(\\d{3})(\\d{6,7})", "$1 $2 $3", ["80"], "0$1", 1]], "0", 0, 0, 0, 0, 0, [0, ["56161\\d{5}|5(?:0[15-7]|1[06]|24|[34]\\d|5[1-59]|9[46])\\d{7}", [10]]]], "TT": ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-46-8]\\d{6})$", "868$1", 0, "868", [0, ["868(?:(?:2[5-9]|3\\d)\\d|4(?:3[0-6]|[6-9]\\d)|6(?:20|78|8\\d)|7(?:0[1-9]|1[02-9]|[2-9]\\d))\\d{4}"]]], "TV": ["688", "00", "(?:2|7\\d\\d|90)\\d{4}", [5, 6, 7], [["(\\d{2})(\\d{3})", "$1 $2", ["2"]], ["(\\d{2})(\\d{4})", "$1 $2", ["90"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:7[01]\\d|90)\\d{4}", [6, 7]]]], "TW": ["886", "0(?:0[25-79]|19)", "[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}", [7, 8, 9, 10, 11], [["(\\d{2})(\\d)(\\d{4})", "$1 $2 $3", ["202"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[258]0"], "0$1"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]", "[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["7"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:40001[0-2]|9[0-8]\\d{4})\\d{3}", [9]]], 0, "#"], "TZ": ["255", "00[056]", "(?:[26-8]\\d|41|90)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["77[2-9]\\d{6}|(?:6[1-9]|7[1-689])\\d{7}"]]], "UA": ["380", "00", "[89]\\d{9}|[3-9]\\d{8}", [9, 10], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]", "6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6[0135689]|7[4-6])|6(?:[12][3-7]|[459])", "3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][3-7]|[459])"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|89|9[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:39|50|6[36-8]|7[1-3]|9[1-9])\\d{7}", [9]]], "0~0"], "UG": ["256", "00[057]", "800\\d{6}|(?:[29]0|[347]\\d)\\d{7}", [9], [["(\\d{4})(\\d{5})", "$1 $2", ["202", "2024"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["[27-9]|4(?:6[45]|[7-9])"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[34]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["726[01]\\d{5}|7(?:[01578]\\d|20|36|[46][0-4]|9[89])\\d{6}"]]], "US": ["1", "011", "[2-9]\\d{9}|3\\d{6}", [10], [["(\\d{3})(\\d{4})", "$1-$2", ["310"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", ["[2-9]"], 0, 1, "$1-$2-$3"]], "1", 0, 0, 0, 0, 0, [0, ["5(?:05(?:[2-57-9]\\d\\d|6(?:[0-35-9]\\d|44))|82(?:2(?:0[0-3]|[268]2)|3(?:0[02]|22|33)|4(?:00|4[24]|65|82)|5(?:00|29|58|83)|6(?:00|66|82)|7(?:58|77)|8(?:00|42|88)|9(?:00|9[89])))\\d{4}|(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[01356]|3[0-24679]|4[167]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-47-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[0-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[01679]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[068]|3[0-289]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0157-9]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}"]]], "UY": ["598", "0(?:0|1[3-9]\\d)", "4\\d{9}|[1249]\\d{7}|(?:[49]\\d|80)\\d{5}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["405|8|90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[124]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["4"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["9[1-9]\\d{6}", [8]]], "00", " int. "], "UZ": ["998", "810", "(?:33|55|[679]\\d|88)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[35-9]"], "8 $1"]], "8", 0, 0, 0, 0, 0, [0, ["(?:(?:33|88|9[0-57-9])\\d{3}|55(?:50[013]|90\\d)|6(?:1(?:2(?:2[01]|98)|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:(?:11|7\\d)\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4]))|5(?:19[01]|2(?:27|9[26])|(?:30|59|7\\d)\\d)|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|(?:3[79]|9[0-3])\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79]))|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|3[01]|5\\d|7[0-4])|(?:5[67]|7\\d)\\d|6(?:2[0-26]|8\\d)))|7(?:[07]\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|(?:33|9[4-6])\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078]))|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0-27]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|6(?:2(?:2[1245]|4[2-4])|39\\d|41[179]|5(?:[349]\\d|5[0-2])|7(?:0[017]|[13]\\d|22|44|55|67|88))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[02569]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07]))))\\d{4}"]], "8~10"], "VA": ["39", "00", "0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}", [6, 7, 8, 9, 10, 11], 0, 0, 0, 0, 0, 0, "06698", [0, ["3[1-9]\\d{8}|3[2-9]\\d{7}", [9, 10]]]], "VC": ["1", "011", "(?:[58]\\d\\d|784|900)\\d{7}", [10], 0, "1", 0, "1|([2-7]\\d{6})$", "784$1", 0, "784", [0, ["784(?:4(?:3[0-5]|5[45]|89|9[0-8])|5(?:2[6-9]|3[0-4])|720)\\d{4}"]]], "VE": ["58", "00", "[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}", [10], [["(\\d{3})(\\d{7})", "$1-$2", ["[24-689]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["4(?:1[24-8]|2[46])\\d{7}"]]], "VG": ["1", "011", "(?:284|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-578]\\d{6})$", "284$1", 0, "284", [0, ["284496[6-9]\\d{3}|284(?:245|3(?:0[0-3]|4[0-7]|68|9[34])|4(?:4[0-6]|68|99)|5(?:4[0-7]|68|9[69]))\\d{4}"]]], "VI": ["1", "011", "[58]\\d{9}|(?:34|90)0\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "340$1", 0, "340", [0, ["340(?:2(?:0[0-38]|2[06-8]|4[49]|77)|3(?:32|44)|4(?:2[23]|44|7[34]|89)|5(?:1[34]|55)|6(?:2[56]|4[23]|77|9[023])|7(?:1[2-57-9]|2[57]|7\\d)|884|998)\\d{4}"]]], "VN": ["84", "00", "[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}", [7, 8, 9, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["80"], "0$1", 1], ["(\\d{4})(\\d{4,6})", "$1 $2", ["1"], 0, 1], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[69]"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[3578]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", 1]], "0", 0, 0, 0, 0, 0, [0, ["(?:5(?:2[238]|59)|89[6-9]|99[013-9])\\d{6}|(?:3\\d|5[689]|7[06-9]|8[1-8]|9[0-8])\\d{7}", [9]]]], "VU": ["678", "00", "[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}", [5, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["[57-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[58]\\d|7[013-7])\\d{5}", [7]]]], "WF": ["681", "00", "(?:40|72)\\d{4}|8\\d{5}(?:\\d{3})?", [6, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[478]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:72|8[23])\\d{4}", [6]]]], "WS": ["685", "0", "(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}", [5, 6, 7, 10], [["(\\d{5})", "$1", ["[2-5]|6[1-9]"]], ["(\\d{3})(\\d{3,7})", "$1 $2", ["[68]"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:7[1-35-7]|8(?:[3-7]|9\\d{3}))\\d{5}", [7, 10]]]], "XK": ["383", "00", "[23]\\d{7,8}|(?:4\\d\\d|[89]00)\\d{5}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[23]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["4[3-9]\\d{6}", [8]]]], "YE": ["967", "00", "(?:1|7\\d)\\d{7}|[1-7]\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7[24-68]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7[0137]\\d{7}", [9]]]], "YT": ["262", "00", "80\\d{7}|(?:26|63)9\\d{6}", [9], 0, "0", 0, 0, 0, 0, "269|63", [0, ["639(?:0[0-79]|1[019]|[267]\\d|3[09]|40|5[05-9]|9[04-79])\\d{4}"]]], "ZA": ["27", "00", "[1-79]\\d{8}|8\\d{4,9}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:1(?:3492[0-25]|4495[0235]|549(?:20|5[01]))|4[34]492[01])\\d{3}|8[1-4]\\d{3,7}|(?:2[27]|47|54)4950\\d{3}|(?:1(?:049[2-4]|9[12]\\d\\d)|(?:6\\d|7[0-46-9])\\d{3}|8(?:5\\d{3}|7(?:08[67]|158|28[5-9]|310)))\\d{4}|(?:1[6-8]|28|3[2-69]|4[025689]|5[36-8])4920\\d{3}|(?:12|[2-5]1)492\\d{4}", [5, 6, 7, 8, 9]]]], "ZM": ["260", "00", "800\\d{6}|(?:21|63|[79]\\d)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[28]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[79]"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["(?:7[679]|9[5-8])\\d{7}"]]], "ZW": ["263", "00", "2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}", [5, 6, 7, 8, 9, 10], [["(\\d{3})(\\d{3,5})", "$1 $2", ["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"], "0$1"], ["(\\d)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["[49]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["80"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2", "2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)", "2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["8"], "0$1"], ["(\\d{2})(\\d{3,5})", "$1 $2", ["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["29[013-9]|39|54"], "0$1"], ["(\\d{4})(\\d{3,5})", "$1 $2", ["(?:25|54)8", "258|5483"], "0$1"]], "0", 0, 0, 0, 0, 0, [0, ["7(?:[178]\\d|3[1-9])\\d{6}", [9]]]] }, "nonGeographic": { "800": ["800", 0, "(?:00|[1-9]\\d)\\d{6}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["\\d"]]], 0, 0, 0, 0, 0, 0, [0, 0, ["(?:00|[1-9]\\d)\\d{6}"]]], "808": ["808", 0, "[1-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[1-9]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, ["[1-9]\\d{7}"]]], "870": ["870", 0, "7\\d{11}|[35-7]\\d{8}", [9, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[35-7]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}"]]], "878": ["878", 0, "10\\d{10}", [12], [["(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3", ["1"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["10\\d{10}"]]], "881": ["881", 0, "[0-36-9]\\d{8}", [9], [["(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[0-36-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["[0-36-9]\\d{8}"]]], "882": ["882", 0, "[13]\\d{6}(?:\\d{2,5})?|285\\d{9}|(?:[19]\\d|49)\\d{6}", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5})", "$1 $2", ["16|342"]], ["(\\d{2})(\\d{6})", "$1 $2", ["4"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[19]"]], ["(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["34[57]"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["34"]], ["(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["[1-3]"]]], 0, 0, 0, 0, 0, 0, [0, ["342\\d{4}|(?:337|49)\\d{6}|3(?:2|47|7\\d{3})\\d{7}", [7, 8, 9, 10, 12]], 0, 0, 0, 0, 0, 0, ["1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:(?:285\\d\\d|3(?:45|[69]\\d{3}))\\d|9[89])\\d{6}"]]], "883": ["883", 0, "(?:210|370\\d\\d)\\d{7}|51\\d{7}(?:\\d{3})?", [9, 10, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["2"]], ["(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["51[13]"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[35]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["(?:210|(?:370[1-9]|51[013]0)\\d)\\d{7}|5100\\d{5}"]]], "888": ["888", 0, "\\d{11}", [11], [["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, ["\\d{11}"]]], "979": ["979", 0, "[1359]\\d{8}", [9], [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[1359]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, ["[1359]\\d{8}"]]] } };
function withMetadataArgument(func, _arguments) {
  var args = Array.prototype.slice.call(_arguments);
  args.push(metadata);
  return func.apply(this, args);
}
function _typeof$5(obj) {
  "@babel/helpers - typeof";
  return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$5(obj);
}
function _defineProperties$2(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result2;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result2 = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result2 = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result2);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof$5(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper2);
    }
    function Wrapper2() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper2.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper2, enumerable: false, writable: true, configurable: true } });
    return _setPrototypeOf(Wrapper2, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a4 = [null];
      a4.push.apply(a4, args2);
      var Constructor = Function.bind.apply(Parent2, a4);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e3) {
    return false;
  }
}
function _isNativeFunction(fn2) {
  return Function.toString.call(fn2).indexOf("[native code]") !== -1;
}
function _setPrototypeOf(o2, p2) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf(o2, p2);
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
var ParseError = /* @__PURE__ */ function(_Error) {
  _inherits(ParseError2, _Error);
  var _super = _createSuper(ParseError2);
  function ParseError2(code) {
    var _this;
    _classCallCheck$2(this, ParseError2);
    _this = _super.call(this, code);
    Object.setPrototypeOf(_assertThisInitialized(_this), ParseError2.prototype);
    _this.name = _this.constructor.name;
    return _this;
  }
  return _createClass$2(ParseError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
var MIN_LENGTH_FOR_NSN = 2;
var MAX_LENGTH_FOR_NSN = 17;
var MAX_LENGTH_COUNTRY_CODE = 3;
var VALID_DIGITS = "0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9";
var DASHES = "-\u2010-\u2015\u2212\u30FC\uFF0D";
var SLASHES = "\uFF0F/";
var DOTS = "\uFF0E.";
var WHITESPACE = " \xA0\xAD\u200B\u2060\u3000";
var BRACKETS = "()\uFF08\uFF09\uFF3B\uFF3D\\[\\]";
var TILDES = "~\u2053\u223C\uFF5E";
var VALID_PUNCTUATION = "".concat(DASHES).concat(SLASHES).concat(DOTS).concat(WHITESPACE).concat(BRACKETS).concat(TILDES);
var PLUS_CHARS = "+\uFF0B";
function compare(a4, b3) {
  a4 = a4.split("-");
  b3 = b3.split("-");
  var pa = a4[0].split(".");
  var pb = b3[0].split(".");
  for (var i3 = 0; i3 < 3; i3++) {
    var na = Number(pa[i3]);
    var nb = Number(pb[i3]);
    if (na > nb)
      return 1;
    if (nb > na)
      return -1;
    if (!isNaN(na) && isNaN(nb))
      return 1;
    if (isNaN(na) && !isNaN(nb))
      return -1;
  }
  if (a4[1] && b3[1]) {
    return a4[1] > b3[1] ? 1 : a4[1] < b3[1] ? -1 : 0;
  }
  return !a4[1] && b3[1] ? 1 : a4[1] && !b3[1] ? -1 : 0;
}
function _typeof$4(obj) {
  "@babel/helpers - typeof";
  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$4(obj);
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$1(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var V3 = "1.2.0";
var V4 = "1.7.35";
var DEFAULT_EXT_PREFIX = " ext. ";
var CALLING_CODE_REG_EXP = /^\d+$/;
var Metadata = /* @__PURE__ */ function() {
  function Metadata2(metadata2) {
    _classCallCheck$1(this, Metadata2);
    validateMetadata(metadata2);
    this.metadata = metadata2;
    setVersion.call(this, metadata2);
  }
  _createClass$1(Metadata2, [{
    key: "getCountries",
    value: function getCountries() {
      return Object.keys(this.metadata.countries).filter(function(_2) {
        return _2 !== "001";
      });
    }
  }, {
    key: "getCountryMetadata",
    value: function getCountryMetadata(countryCode) {
      return this.metadata.countries[countryCode];
    }
  }, {
    key: "nonGeographic",
    value: function nonGeographic() {
      if (this.v1 || this.v2 || this.v3)
        return;
      return this.metadata.nonGeographic || this.metadata.nonGeographical;
    }
  }, {
    key: "hasCountry",
    value: function hasCountry(country) {
      return this.getCountryMetadata(country) !== void 0;
    }
  }, {
    key: "hasCallingCode",
    value: function hasCallingCode(callingCode) {
      if (this.getCountryCodesForCallingCode(callingCode)) {
        return true;
      }
      if (this.nonGeographic()) {
        if (this.nonGeographic()[callingCode]) {
          return true;
        }
      } else {
        var countryCodes = this.countryCallingCodes()[callingCode];
        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === "001") {
          return true;
        }
      }
    }
  }, {
    key: "isNonGeographicCallingCode",
    value: function isNonGeographicCallingCode(callingCode) {
      if (this.nonGeographic()) {
        return this.nonGeographic()[callingCode] ? true : false;
      } else {
        return this.getCountryCodesForCallingCode(callingCode) ? false : true;
      }
    }
  }, {
    key: "country",
    value: function country(countryCode) {
      return this.selectNumberingPlan(countryCode);
    }
  }, {
    key: "selectNumberingPlan",
    value: function selectNumberingPlan(countryCode, callingCode) {
      if (countryCode && CALLING_CODE_REG_EXP.test(countryCode)) {
        callingCode = countryCode;
        countryCode = null;
      }
      if (countryCode && countryCode !== "001") {
        if (!this.hasCountry(countryCode)) {
          throw new Error("Unknown country: ".concat(countryCode));
        }
        this.numberingPlan = new NumberingPlan(this.getCountryMetadata(countryCode), this);
      } else if (callingCode) {
        if (!this.hasCallingCode(callingCode)) {
          throw new Error("Unknown calling code: ".concat(callingCode));
        }
        this.numberingPlan = new NumberingPlan(this.getNumberingPlanMetadata(callingCode), this);
      } else {
        this.numberingPlan = void 0;
      }
      return this;
    }
  }, {
    key: "getCountryCodesForCallingCode",
    value: function getCountryCodesForCallingCode(callingCode) {
      var countryCodes = this.countryCallingCodes()[callingCode];
      if (countryCodes) {
        if (countryCodes.length === 1 && countryCodes[0].length === 3) {
          return;
        }
        return countryCodes;
      }
    }
  }, {
    key: "getCountryCodeForCallingCode",
    value: function getCountryCodeForCallingCode(callingCode) {
      var countryCodes = this.getCountryCodesForCallingCode(callingCode);
      if (countryCodes) {
        return countryCodes[0];
      }
    }
  }, {
    key: "getNumberingPlanMetadata",
    value: function getNumberingPlanMetadata(callingCode) {
      var countryCode = this.getCountryCodeForCallingCode(callingCode);
      if (countryCode) {
        return this.getCountryMetadata(countryCode);
      }
      if (this.nonGeographic()) {
        var metadata2 = this.nonGeographic()[callingCode];
        if (metadata2) {
          return metadata2;
        }
      } else {
        var countryCodes = this.countryCallingCodes()[callingCode];
        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === "001") {
          return this.metadata.countries["001"];
        }
      }
    }
  }, {
    key: "countryCallingCode",
    value: function countryCallingCode() {
      return this.numberingPlan.callingCode();
    }
  }, {
    key: "IDDPrefix",
    value: function IDDPrefix() {
      return this.numberingPlan.IDDPrefix();
    }
  }, {
    key: "defaultIDDPrefix",
    value: function defaultIDDPrefix() {
      return this.numberingPlan.defaultIDDPrefix();
    }
  }, {
    key: "nationalNumberPattern",
    value: function nationalNumberPattern() {
      return this.numberingPlan.nationalNumberPattern();
    }
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      return this.numberingPlan.possibleLengths();
    }
  }, {
    key: "formats",
    value: function formats() {
      return this.numberingPlan.formats();
    }
  }, {
    key: "nationalPrefixForParsing",
    value: function nationalPrefixForParsing() {
      return this.numberingPlan.nationalPrefixForParsing();
    }
  }, {
    key: "nationalPrefixTransformRule",
    value: function nationalPrefixTransformRule() {
      return this.numberingPlan.nationalPrefixTransformRule();
    }
  }, {
    key: "leadingDigits",
    value: function leadingDigits() {
      return this.numberingPlan.leadingDigits();
    }
  }, {
    key: "hasTypes",
    value: function hasTypes() {
      return this.numberingPlan.hasTypes();
    }
  }, {
    key: "type",
    value: function type(_type) {
      return this.numberingPlan.type(_type);
    }
  }, {
    key: "ext",
    value: function ext() {
      return this.numberingPlan.ext();
    }
  }, {
    key: "countryCallingCodes",
    value: function countryCallingCodes() {
      if (this.v1)
        return this.metadata.country_phone_code_to_countries;
      return this.metadata.country_calling_codes;
    }
  }, {
    key: "chooseCountryByCountryCallingCode",
    value: function chooseCountryByCountryCallingCode(callingCode) {
      return this.selectNumberingPlan(callingCode);
    }
  }, {
    key: "hasSelectedNumberingPlan",
    value: function hasSelectedNumberingPlan() {
      return this.numberingPlan !== void 0;
    }
  }]);
  return Metadata2;
}();
var NumberingPlan = /* @__PURE__ */ function() {
  function NumberingPlan2(metadata2, globalMetadataObject) {
    _classCallCheck$1(this, NumberingPlan2);
    this.globalMetadataObject = globalMetadataObject;
    this.metadata = metadata2;
    setVersion.call(this, globalMetadataObject.metadata);
  }
  _createClass$1(NumberingPlan2, [{
    key: "callingCode",
    value: function callingCode() {
      return this.metadata[0];
    }
  }, {
    key: "getDefaultCountryMetadataForRegion",
    value: function getDefaultCountryMetadataForRegion() {
      return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode());
    }
  }, {
    key: "IDDPrefix",
    value: function IDDPrefix() {
      if (this.v1 || this.v2)
        return;
      return this.metadata[1];
    }
  }, {
    key: "defaultIDDPrefix",
    value: function defaultIDDPrefix() {
      if (this.v1 || this.v2)
        return;
      return this.metadata[12];
    }
  }, {
    key: "nationalNumberPattern",
    value: function nationalNumberPattern() {
      if (this.v1 || this.v2)
        return this.metadata[1];
      return this.metadata[2];
    }
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      if (this.v1)
        return;
      return this.metadata[this.v2 ? 2 : 3];
    }
  }, {
    key: "_getFormats",
    value: function _getFormats(metadata2) {
      return metadata2[this.v1 ? 2 : this.v2 ? 3 : 4];
    }
  }, {
    key: "formats",
    value: function formats() {
      var _this = this;
      var formats2 = this._getFormats(this.metadata) || this._getFormats(this.getDefaultCountryMetadataForRegion()) || [];
      return formats2.map(function(_2) {
        return new Format(_2, _this);
      });
    }
  }, {
    key: "nationalPrefix",
    value: function nationalPrefix() {
      return this.metadata[this.v1 ? 3 : this.v2 ? 4 : 5];
    }
  }, {
    key: "_getNationalPrefixFormattingRule",
    value: function _getNationalPrefixFormattingRule(metadata2) {
      return metadata2[this.v1 ? 4 : this.v2 ? 5 : 6];
    }
  }, {
    key: "nationalPrefixFormattingRule",
    value: function nationalPrefixFormattingRule() {
      return this._getNationalPrefixFormattingRule(this.metadata) || this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "_nationalPrefixForParsing",
    value: function _nationalPrefixForParsing() {
      return this.metadata[this.v1 ? 5 : this.v2 ? 6 : 7];
    }
  }, {
    key: "nationalPrefixForParsing",
    value: function nationalPrefixForParsing() {
      return this._nationalPrefixForParsing() || this.nationalPrefix();
    }
  }, {
    key: "nationalPrefixTransformRule",
    value: function nationalPrefixTransformRule() {
      return this.metadata[this.v1 ? 6 : this.v2 ? 7 : 8];
    }
  }, {
    key: "_getNationalPrefixIsOptionalWhenFormatting",
    value: function _getNationalPrefixIsOptionalWhenFormatting() {
      return !!this.metadata[this.v1 ? 7 : this.v2 ? 8 : 9];
    }
  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
      return this._getNationalPrefixIsOptionalWhenFormatting(this.metadata) || this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "leadingDigits",
    value: function leadingDigits() {
      return this.metadata[this.v1 ? 8 : this.v2 ? 9 : 10];
    }
  }, {
    key: "types",
    value: function types() {
      return this.metadata[this.v1 ? 9 : this.v2 ? 10 : 11];
    }
  }, {
    key: "hasTypes",
    value: function hasTypes() {
      if (this.types() && this.types().length === 0) {
        return false;
      }
      return !!this.types();
    }
  }, {
    key: "type",
    value: function type(_type2) {
      if (this.hasTypes() && getType(this.types(), _type2)) {
        return new Type(getType(this.types(), _type2), this);
      }
    }
  }, {
    key: "ext",
    value: function ext() {
      if (this.v1 || this.v2)
        return DEFAULT_EXT_PREFIX;
      return this.metadata[13] || DEFAULT_EXT_PREFIX;
    }
  }]);
  return NumberingPlan2;
}();
var Format = /* @__PURE__ */ function() {
  function Format2(format2, metadata2) {
    _classCallCheck$1(this, Format2);
    this._format = format2;
    this.metadata = metadata2;
  }
  _createClass$1(Format2, [{
    key: "pattern",
    value: function pattern() {
      return this._format[0];
    }
  }, {
    key: "format",
    value: function format2() {
      return this._format[1];
    }
  }, {
    key: "leadingDigitsPatterns",
    value: function leadingDigitsPatterns() {
      return this._format[2] || [];
    }
  }, {
    key: "nationalPrefixFormattingRule",
    value: function nationalPrefixFormattingRule() {
      return this._format[3] || this.metadata.nationalPrefixFormattingRule();
    }
  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
      return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    }
  }, {
    key: "nationalPrefixIsMandatoryWhenFormattingInNationalFormat",
    value: function nationalPrefixIsMandatoryWhenFormattingInNationalFormat() {
      return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    }
  }, {
    key: "usesNationalPrefix",
    value: function usesNationalPrefix() {
      return this.nationalPrefixFormattingRule() && !FIRST_GROUP_ONLY_PREFIX_PATTERN.test(this.nationalPrefixFormattingRule()) ? true : false;
    }
  }, {
    key: "internationalFormat",
    value: function internationalFormat() {
      return this._format[5] || this.format();
    }
  }]);
  return Format2;
}();
var FIRST_GROUP_ONLY_PREFIX_PATTERN = /^\(?\$1\)?$/;
var Type = /* @__PURE__ */ function() {
  function Type2(type, metadata2) {
    _classCallCheck$1(this, Type2);
    this.type = type;
    this.metadata = metadata2;
  }
  _createClass$1(Type2, [{
    key: "pattern",
    value: function pattern() {
      if (this.metadata.v1)
        return this.type;
      return this.type[0];
    }
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      if (this.metadata.v1)
        return;
      return this.type[1] || this.metadata.possibleLengths();
    }
  }]);
  return Type2;
}();
function getType(types, type) {
  switch (type) {
    case "FIXED_LINE":
      return types[0];
    case "MOBILE":
      return types[1];
    case "TOLL_FREE":
      return types[2];
    case "PREMIUM_RATE":
      return types[3];
    case "PERSONAL_NUMBER":
      return types[4];
    case "VOICEMAIL":
      return types[5];
    case "UAN":
      return types[6];
    case "PAGER":
      return types[7];
    case "VOIP":
      return types[8];
    case "SHARED_COST":
      return types[9];
  }
}
function validateMetadata(metadata2) {
  if (!metadata2) {
    throw new Error("[libphonenumber-js] `metadata` argument not passed. Check your arguments.");
  }
  if (!is_object(metadata2) || !is_object(metadata2.countries)) {
    throw new Error("[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` child object property. Got ".concat(is_object(metadata2) ? "an object of shape: { " + Object.keys(metadata2).join(", ") + " }" : "a " + type_of(metadata2) + ": " + metadata2, "."));
  }
}
var is_object = function is_object2(_2) {
  return _typeof$4(_2) === "object";
};
var type_of = function type_of2(_2) {
  return _typeof$4(_2);
};
function getCountryCallingCode(country, metadata2) {
  metadata2 = new Metadata(metadata2);
  if (metadata2.hasCountry(country)) {
    return metadata2.country(country).countryCallingCode();
  }
  throw new Error("Unknown country: ".concat(country));
}
function isSupportedCountry(country, metadata2) {
  return metadata2.countries[country] !== void 0;
}
function setVersion(metadata2) {
  var version2 = metadata2.version;
  if (typeof version2 === "number") {
    this.v1 = version2 === 1;
    this.v2 = version2 === 2;
    this.v3 = version2 === 3;
    this.v4 = version2 === 4;
  } else {
    if (!version2) {
      this.v1 = true;
    } else if (compare(version2, V3) === -1) {
      this.v2 = true;
    } else if (compare(version2, V4) === -1) {
      this.v3 = true;
    } else {
      this.v4 = true;
    }
  }
}
var RFC3966_EXTN_PREFIX = ";ext=";
var getExtensionDigitsPattern = function getExtensionDigitsPattern2(maxLength) {
  return "([".concat(VALID_DIGITS, "]{1,").concat(maxLength, "})");
};
function createExtensionPattern(purpose) {
  var extLimitAfterExplicitLabel = "20";
  var extLimitAfterLikelyLabel = "15";
  var extLimitAfterAmbiguousChar = "9";
  var extLimitWhenNotSure = "6";
  var possibleSeparatorsBetweenNumberAndExtLabel = "[ \xA0\\t,]*";
  var possibleCharsAfterExtLabel = "[:\\.\uFF0E]?[ \xA0\\t,-]*";
  var optionalExtnSuffix = "#?";
  var explicitExtLabels = "(?:e?xt(?:ensi(?:o\u0301?|\xF3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|\u0434\u043E\u0431|anexo)";
  var ambiguousExtLabels = "(?:[x\uFF58#\uFF03~\uFF5E]|int|\uFF49\uFF4E\uFF54)";
  var ambiguousSeparator = "[- ]+";
  var possibleSeparatorsNumberExtLabelNoComma = "[ \xA0\\t]*";
  var autoDiallingAndExtLabelsFound = "(?:,{2}|;)";
  var rfcExtn = RFC3966_EXTN_PREFIX + getExtensionDigitsPattern(extLimitAfterExplicitLabel);
  var explicitExtn = possibleSeparatorsBetweenNumberAndExtLabel + explicitExtLabels + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterExplicitLabel) + optionalExtnSuffix;
  var ambiguousExtn = possibleSeparatorsBetweenNumberAndExtLabel + ambiguousExtLabels + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterAmbiguousChar) + optionalExtnSuffix;
  var americanStyleExtnWithSuffix = ambiguousSeparator + getExtensionDigitsPattern(extLimitWhenNotSure) + "#";
  var autoDiallingExtn = possibleSeparatorsNumberExtLabelNoComma + autoDiallingAndExtLabelsFound + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterLikelyLabel) + optionalExtnSuffix;
  var onlyCommasExtn = possibleSeparatorsNumberExtLabelNoComma + "(?:,)+" + possibleCharsAfterExtLabel + getExtensionDigitsPattern(extLimitAfterAmbiguousChar) + optionalExtnSuffix;
  return rfcExtn + "|" + explicitExtn + "|" + ambiguousExtn + "|" + americanStyleExtnWithSuffix + "|" + autoDiallingExtn + "|" + onlyCommasExtn;
}
var MIN_LENGTH_PHONE_NUMBER_PATTERN = "[" + VALID_DIGITS + "]{" + MIN_LENGTH_FOR_NSN + "}";
var VALID_PHONE_NUMBER = "[" + PLUS_CHARS + "]{0,1}(?:[" + VALID_PUNCTUATION + "]*[" + VALID_DIGITS + "]){3,}[" + VALID_PUNCTUATION + VALID_DIGITS + "]*";
var VALID_PHONE_NUMBER_START_REG_EXP = new RegExp("^[" + PLUS_CHARS + "]{0,1}(?:[" + VALID_PUNCTUATION + "]*[" + VALID_DIGITS + "]){1,2}$", "i");
var VALID_PHONE_NUMBER_WITH_EXTENSION = VALID_PHONE_NUMBER + "(?:" + createExtensionPattern() + ")?";
var VALID_PHONE_NUMBER_PATTERN = new RegExp(
  "^" + MIN_LENGTH_PHONE_NUMBER_PATTERN + "$|^" + VALID_PHONE_NUMBER_WITH_EXTENSION + "$",
  "i"
);
function isViablePhoneNumber(number) {
  return number.length >= MIN_LENGTH_FOR_NSN && VALID_PHONE_NUMBER_PATTERN.test(number);
}
function isViablePhoneNumberStart(number) {
  return VALID_PHONE_NUMBER_START_REG_EXP.test(number);
}
var EXTN_PATTERN = new RegExp("(?:" + createExtensionPattern() + ")$", "i");
function extractExtension(number) {
  var start2 = number.search(EXTN_PATTERN);
  if (start2 < 0) {
    return {};
  }
  var numberWithoutExtension = number.slice(0, start2);
  var matches = number.match(EXTN_PATTERN);
  var i3 = 1;
  while (i3 < matches.length) {
    if (matches[i3]) {
      return {
        number: numberWithoutExtension,
        ext: matches[i3]
      };
    }
    i3++;
  }
}
var DIGITS = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "\uFF10": "0",
  "\uFF11": "1",
  "\uFF12": "2",
  "\uFF13": "3",
  "\uFF14": "4",
  "\uFF15": "5",
  "\uFF16": "6",
  "\uFF17": "7",
  "\uFF18": "8",
  "\uFF19": "9",
  "\u0660": "0",
  "\u0661": "1",
  "\u0662": "2",
  "\u0663": "3",
  "\u0664": "4",
  "\u0665": "5",
  "\u0666": "6",
  "\u0667": "7",
  "\u0668": "8",
  "\u0669": "9",
  "\u06F0": "0",
  "\u06F1": "1",
  "\u06F2": "2",
  "\u06F3": "3",
  "\u06F4": "4",
  "\u06F5": "5",
  "\u06F6": "6",
  "\u06F7": "7",
  "\u06F8": "8",
  "\u06F9": "9"
};
function parseDigit(character) {
  return DIGITS[character];
}
function _createForOfIteratorHelperLoose$5(o2, allowArrayLike) {
  var it2 = typeof Symbol !== "undefined" && o2[Symbol.iterator] || o2["@@iterator"];
  if (it2)
    return (it2 = it2.call(o2)).next.bind(it2);
  if (Array.isArray(o2) || (it2 = _unsupportedIterableToArray$6(o2)) || allowArrayLike && o2 && typeof o2.length === "number") {
    if (it2)
      o2 = it2;
    var i3 = 0;
    return function() {
      if (i3 >= o2.length)
        return { done: true };
      return { done: false, value: o2[i3++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$6(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray$6(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$6(o2, minLen);
}
function _arrayLikeToArray$6(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++) {
    arr2[i3] = arr[i3];
  }
  return arr2;
}
function parseIncompletePhoneNumber(string) {
  var result2 = "";
  for (var _iterator = _createForOfIteratorHelperLoose$5(string.split("")), _step; !(_step = _iterator()).done; ) {
    var character = _step.value;
    result2 += parsePhoneNumberCharacter(character, result2) || "";
  }
  return result2;
}
function parsePhoneNumberCharacter(character, prevParsedCharacters) {
  if (character === "+") {
    if (prevParsedCharacters) {
      return;
    }
    return "+";
  }
  return parseDigit(character);
}
function _createForOfIteratorHelperLoose$4(o2, allowArrayLike) {
  var it2 = typeof Symbol !== "undefined" && o2[Symbol.iterator] || o2["@@iterator"];
  if (it2)
    return (it2 = it2.call(o2)).next.bind(it2);
  if (Array.isArray(o2) || (it2 = _unsupportedIterableToArray$5(o2)) || allowArrayLike && o2 && typeof o2.length === "number") {
    if (it2)
      o2 = it2;
    var i3 = 0;
    return function() {
      if (i3 >= o2.length)
        return { done: true };
      return { done: false, value: o2[i3++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$5(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray$5(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$5(o2, minLen);
}
function _arrayLikeToArray$5(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++) {
    arr2[i3] = arr[i3];
  }
  return arr2;
}
function mergeArrays(a4, b3) {
  var merged = a4.slice();
  for (var _iterator = _createForOfIteratorHelperLoose$4(b3), _step; !(_step = _iterator()).done; ) {
    var element = _step.value;
    if (a4.indexOf(element) < 0) {
      merged.push(element);
    }
  }
  return merged.sort(function(a5, b4) {
    return a5 - b4;
  });
}
function checkNumberLength(nationalNumber, metadata2) {
  return checkNumberLengthForType(nationalNumber, void 0, metadata2);
}
function checkNumberLengthForType(nationalNumber, type, metadata2) {
  var type_info = metadata2.type(type);
  var possible_lengths = type_info && type_info.possibleLengths() || metadata2.possibleLengths();
  if (!possible_lengths) {
    return "IS_POSSIBLE";
  }
  if (type === "FIXED_LINE_OR_MOBILE") {
    if (!metadata2.type("FIXED_LINE")) {
      return checkNumberLengthForType(nationalNumber, "MOBILE", metadata2);
    }
    var mobile_type = metadata2.type("MOBILE");
    if (mobile_type) {
      possible_lengths = mergeArrays(possible_lengths, mobile_type.possibleLengths());
    }
  } else if (type && !type_info) {
    return "INVALID_LENGTH";
  }
  var actual_length = nationalNumber.length;
  var minimum_length = possible_lengths[0];
  if (minimum_length === actual_length) {
    return "IS_POSSIBLE";
  }
  if (minimum_length > actual_length) {
    return "TOO_SHORT";
  }
  if (possible_lengths[possible_lengths.length - 1] < actual_length) {
    return "TOO_LONG";
  }
  return possible_lengths.indexOf(actual_length, 1) >= 0 ? "IS_POSSIBLE" : "INVALID_LENGTH";
}
function isPossiblePhoneNumber(input, options, metadata2) {
  if (options === void 0) {
    options = {};
  }
  metadata2 = new Metadata(metadata2);
  if (options.v2) {
    if (!input.countryCallingCode) {
      throw new Error("Invalid phone number object passed");
    }
    metadata2.selectNumberingPlan(input.countryCallingCode);
  } else {
    if (!input.phone) {
      return false;
    }
    if (input.country) {
      if (!metadata2.hasCountry(input.country)) {
        throw new Error("Unknown country: ".concat(input.country));
      }
      metadata2.country(input.country);
    } else {
      if (!input.countryCallingCode) {
        throw new Error("Invalid phone number object passed");
      }
      metadata2.selectNumberingPlan(input.countryCallingCode);
    }
  }
  if (metadata2.possibleLengths()) {
    return isPossibleNumber(input.phone || input.nationalNumber, metadata2);
  } else {
    if (input.countryCallingCode && metadata2.isNonGeographicCallingCode(input.countryCallingCode)) {
      return true;
    } else {
      throw new Error('Missing "possibleLengths" in metadata. Perhaps the metadata has been generated before v1.0.18.');
    }
  }
}
function isPossibleNumber(nationalNumber, metadata2) {
  switch (checkNumberLength(nationalNumber, metadata2)) {
    case "IS_POSSIBLE":
      return true;
    default:
      return false;
  }
}
function _slicedToArray$1(arr, i3) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i3) || _unsupportedIterableToArray$4(arr, i3) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit$1(arr, i3) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n2 = true;
  var _d = false;
  var _s, _e2;
  try {
    for (_i = _i.call(arr); !(_n2 = (_s = _i.next()).done); _n2 = true) {
      _arr.push(_s.value);
      if (i3 && _arr.length === i3)
        break;
    }
  } catch (err) {
    _d = true;
    _e2 = err;
  } finally {
    try {
      if (!_n2 && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e2;
    }
  }
  return _arr;
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _createForOfIteratorHelperLoose$3(o2, allowArrayLike) {
  var it2 = typeof Symbol !== "undefined" && o2[Symbol.iterator] || o2["@@iterator"];
  if (it2)
    return (it2 = it2.call(o2)).next.bind(it2);
  if (Array.isArray(o2) || (it2 = _unsupportedIterableToArray$4(o2)) || allowArrayLike && o2 && typeof o2.length === "number") {
    if (it2)
      o2 = it2;
    var i3 = 0;
    return function() {
      if (i3 >= o2.length)
        return { done: true };
      return { done: false, value: o2[i3++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray$4(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$4(o2, minLen);
}
function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++) {
    arr2[i3] = arr[i3];
  }
  return arr2;
}
function parseRFC3966(text) {
  var number;
  var ext;
  text = text.replace(/^tel:/, "tel=");
  for (var _iterator = _createForOfIteratorHelperLoose$3(text.split(";")), _step; !(_step = _iterator()).done; ) {
    var part = _step.value;
    var _part$split = part.split("="), _part$split2 = _slicedToArray$1(_part$split, 2), name = _part$split2[0], value = _part$split2[1];
    switch (name) {
      case "tel":
        number = value;
        break;
      case "ext":
        ext = value;
        break;
      case "phone-context":
        if (value[0] === "+") {
          number = value + number;
        }
        break;
    }
  }
  if (!isViablePhoneNumber(number)) {
    return {};
  }
  var result2 = {
    number
  };
  if (ext) {
    result2.ext = ext;
  }
  return result2;
}
function formatRFC3966(_ref2) {
  var number = _ref2.number, ext = _ref2.ext;
  if (!number) {
    return "";
  }
  if (number[0] !== "+") {
    throw new Error('"formatRFC3966()" expects "number" to be in E.164 format.');
  }
  return "tel:".concat(number).concat(ext ? ";ext=" + ext : "");
}
function matchesEntirely(text, regular_expression) {
  text = text || "";
  return new RegExp("^(?:" + regular_expression + ")$").test(text);
}
function _createForOfIteratorHelperLoose$2(o2, allowArrayLike) {
  var it2 = typeof Symbol !== "undefined" && o2[Symbol.iterator] || o2["@@iterator"];
  if (it2)
    return (it2 = it2.call(o2)).next.bind(it2);
  if (Array.isArray(o2) || (it2 = _unsupportedIterableToArray$3(o2)) || allowArrayLike && o2 && typeof o2.length === "number") {
    if (it2)
      o2 = it2;
    var i3 = 0;
    return function() {
      if (i3 >= o2.length)
        return { done: true };
      return { done: false, value: o2[i3++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray$3(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$3(o2, minLen);
}
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++) {
    arr2[i3] = arr[i3];
  }
  return arr2;
}
var NON_FIXED_LINE_PHONE_TYPES = ["MOBILE", "PREMIUM_RATE", "TOLL_FREE", "SHARED_COST", "VOIP", "PERSONAL_NUMBER", "PAGER", "UAN", "VOICEMAIL"];
function getNumberType(input, options, metadata2) {
  options = options || {};
  if (!input.country) {
    return;
  }
  metadata2 = new Metadata(metadata2);
  metadata2.selectNumberingPlan(input.country, input.countryCallingCode);
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone;
  if (!matchesEntirely(nationalNumber, metadata2.nationalNumberPattern())) {
    return;
  }
  if (isNumberTypeEqualTo(nationalNumber, "FIXED_LINE", metadata2)) {
    if (metadata2.type("MOBILE") && metadata2.type("MOBILE").pattern() === "") {
      return "FIXED_LINE_OR_MOBILE";
    }
    if (!metadata2.type("MOBILE")) {
      return "FIXED_LINE_OR_MOBILE";
    }
    if (isNumberTypeEqualTo(nationalNumber, "MOBILE", metadata2)) {
      return "FIXED_LINE_OR_MOBILE";
    }
    return "FIXED_LINE";
  }
  for (var _iterator = _createForOfIteratorHelperLoose$2(NON_FIXED_LINE_PHONE_TYPES), _step; !(_step = _iterator()).done; ) {
    var type = _step.value;
    if (isNumberTypeEqualTo(nationalNumber, type, metadata2)) {
      return type;
    }
  }
}
function isNumberTypeEqualTo(nationalNumber, type, metadata2) {
  type = metadata2.type(type);
  if (!type || !type.pattern()) {
    return false;
  }
  if (type.possibleLengths() && type.possibleLengths().indexOf(nationalNumber.length) < 0) {
    return false;
  }
  return matchesEntirely(nationalNumber, type.pattern());
}
function isValidNumber(input, options, metadata2) {
  options = options || {};
  metadata2 = new Metadata(metadata2);
  if (!input.country) {
    return false;
  }
  metadata2.selectNumberingPlan(input.country, input.countryCallingCode);
  if (metadata2.hasTypes()) {
    return getNumberType(input, options, metadata2.metadata) !== void 0;
  }
  var national_number = options.v2 ? input.nationalNumber : input.phone;
  return matchesEntirely(national_number, metadata2.nationalNumberPattern());
}
function applyInternationalSeparatorStyle(formattedNumber) {
  return formattedNumber.replace(new RegExp("[".concat(VALID_PUNCTUATION, "]+"), "g"), " ").trim();
}
var FIRST_GROUP_PATTERN = /(\$\d)/;
function formatNationalNumberUsingFormat(number, format2, _ref2) {
  var useInternationalFormat = _ref2.useInternationalFormat, withNationalPrefix = _ref2.withNationalPrefix;
  _ref2.carrierCode;
  _ref2.metadata;
  var formattedNumber = number.replace(new RegExp(format2.pattern()), useInternationalFormat ? format2.internationalFormat() : withNationalPrefix && format2.nationalPrefixFormattingRule() ? format2.format().replace(FIRST_GROUP_PATTERN, format2.nationalPrefixFormattingRule()) : format2.format());
  if (useInternationalFormat) {
    return applyInternationalSeparatorStyle(formattedNumber);
  }
  return formattedNumber;
}
var SINGLE_IDD_PREFIX_REG_EXP = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/;
function getIddPrefix(country, callingCode, metadata2) {
  var countryMetadata = new Metadata(metadata2);
  countryMetadata.selectNumberingPlan(country, callingCode);
  if (countryMetadata.defaultIDDPrefix()) {
    return countryMetadata.defaultIDDPrefix();
  }
  if (SINGLE_IDD_PREFIX_REG_EXP.test(countryMetadata.IDDPrefix())) {
    return countryMetadata.IDDPrefix();
  }
}
function _createForOfIteratorHelperLoose$1(o2, allowArrayLike) {
  var it2 = typeof Symbol !== "undefined" && o2[Symbol.iterator] || o2["@@iterator"];
  if (it2)
    return (it2 = it2.call(o2)).next.bind(it2);
  if (Array.isArray(o2) || (it2 = _unsupportedIterableToArray$2(o2)) || allowArrayLike && o2 && typeof o2.length === "number") {
    if (it2)
      o2 = it2;
    var i3 = 0;
    return function() {
      if (i3 >= o2.length)
        return { done: true };
      return { done: false, value: o2[i3++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray$2(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$2(o2, minLen);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++) {
    arr2[i3] = arr[i3];
  }
  return arr2;
}
function ownKeys$5(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$5(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = null != arguments[i3] ? arguments[i3] : {};
    i3 % 2 ? ownKeys$5(Object(source), true).forEach(function(key) {
      _defineProperty$5(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$5(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var DEFAULT_OPTIONS = {
  formatExtension: function formatExtension(formattedNumber, extension2, metadata2) {
    return "".concat(formattedNumber).concat(metadata2.ext()).concat(extension2);
  }
};
function formatNumber(input, format2, options, metadata2) {
  if (options) {
    options = _objectSpread$5(_objectSpread$5({}, DEFAULT_OPTIONS), options);
  } else {
    options = DEFAULT_OPTIONS;
  }
  metadata2 = new Metadata(metadata2);
  if (input.country && input.country !== "001") {
    if (!metadata2.hasCountry(input.country)) {
      throw new Error("Unknown country: ".concat(input.country));
    }
    metadata2.country(input.country);
  } else if (input.countryCallingCode) {
    metadata2.selectNumberingPlan(input.countryCallingCode);
  } else
    return input.phone || "";
  var countryCallingCode = metadata2.countryCallingCode();
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone;
  var number;
  switch (format2) {
    case "NATIONAL":
      if (!nationalNumber) {
        return "";
      }
      number = formatNationalNumber(nationalNumber, input.carrierCode, "NATIONAL", metadata2, options);
      return addExtension(number, input.ext, metadata2, options.formatExtension);
    case "INTERNATIONAL":
      if (!nationalNumber) {
        return "+".concat(countryCallingCode);
      }
      number = formatNationalNumber(nationalNumber, null, "INTERNATIONAL", metadata2, options);
      number = "+".concat(countryCallingCode, " ").concat(number);
      return addExtension(number, input.ext, metadata2, options.formatExtension);
    case "E.164":
      return "+".concat(countryCallingCode).concat(nationalNumber);
    case "RFC3966":
      return formatRFC3966({
        number: "+".concat(countryCallingCode).concat(nationalNumber),
        ext: input.ext
      });
    case "IDD":
      if (!options.fromCountry) {
        return;
      }
      var formattedNumber = formatIDD(nationalNumber, input.carrierCode, countryCallingCode, options.fromCountry, metadata2);
      return addExtension(formattedNumber, input.ext, metadata2, options.formatExtension);
    default:
      throw new Error('Unknown "format" argument passed to "formatNumber()": "'.concat(format2, '"'));
  }
}
function formatNationalNumber(number, carrierCode, formatAs, metadata2, options) {
  var format2 = chooseFormatForNumber(metadata2.formats(), number);
  if (!format2) {
    return number;
  }
  return formatNationalNumberUsingFormat(number, format2, {
    useInternationalFormat: formatAs === "INTERNATIONAL",
    withNationalPrefix: format2.nationalPrefixIsOptionalWhenFormattingInNationalFormat() && options && options.nationalPrefix === false ? false : true,
    carrierCode,
    metadata: metadata2
  });
}
function chooseFormatForNumber(availableFormats, nationalNnumber) {
  for (var _iterator = _createForOfIteratorHelperLoose$1(availableFormats), _step; !(_step = _iterator()).done; ) {
    var format2 = _step.value;
    if (format2.leadingDigitsPatterns().length > 0) {
      var lastLeadingDigitsPattern = format2.leadingDigitsPatterns()[format2.leadingDigitsPatterns().length - 1];
      if (nationalNnumber.search(lastLeadingDigitsPattern) !== 0) {
        continue;
      }
    }
    if (matchesEntirely(nationalNnumber, format2.pattern())) {
      return format2;
    }
  }
}
function addExtension(formattedNumber, ext, metadata2, formatExtension2) {
  return ext ? formatExtension2(formattedNumber, ext, metadata2) : formattedNumber;
}
function formatIDD(nationalNumber, carrierCode, countryCallingCode, fromCountry, metadata2) {
  var fromCountryCallingCode = getCountryCallingCode(fromCountry, metadata2.metadata);
  if (fromCountryCallingCode === countryCallingCode) {
    var formattedNumber = formatNationalNumber(nationalNumber, carrierCode, "NATIONAL", metadata2);
    if (countryCallingCode === "1") {
      return countryCallingCode + " " + formattedNumber;
    }
    return formattedNumber;
  }
  var iddPrefix = getIddPrefix(fromCountry, void 0, metadata2.metadata);
  if (iddPrefix) {
    return "".concat(iddPrefix, " ").concat(countryCallingCode, " ").concat(formatNationalNumber(nationalNumber, null, "INTERNATIONAL", metadata2));
  }
}
function ownKeys$4(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$4(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = null != arguments[i3] ? arguments[i3] : {};
    i3 % 2 ? ownKeys$4(Object(source), true).forEach(function(key) {
      _defineProperty$4(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i3 = 0; i3 < props.length; i3++) {
    var descriptor = props[i3];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var PhoneNumber = /* @__PURE__ */ function() {
  function PhoneNumber2(countryCallingCode, nationalNumber, metadata2) {
    _classCallCheck(this, PhoneNumber2);
    if (!countryCallingCode) {
      throw new TypeError("`country` or `countryCallingCode` not passed");
    }
    if (!nationalNumber) {
      throw new TypeError("`nationalNumber` not passed");
    }
    if (!metadata2) {
      throw new TypeError("`metadata` not passed");
    }
    var _metadata = new Metadata(metadata2);
    if (isCountryCode(countryCallingCode)) {
      this.country = countryCallingCode;
      _metadata.country(countryCallingCode);
      countryCallingCode = _metadata.countryCallingCode();
    }
    this.countryCallingCode = countryCallingCode;
    this.nationalNumber = nationalNumber;
    this.number = "+" + this.countryCallingCode + this.nationalNumber;
    this.metadata = metadata2;
  }
  _createClass(PhoneNumber2, [{
    key: "setExt",
    value: function setExt(ext) {
      this.ext = ext;
    }
  }, {
    key: "isPossible",
    value: function isPossible() {
      return isPossiblePhoneNumber(this, {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "isValid",
    value: function isValid2() {
      return isValidNumber(this, {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "isNonGeographic",
    value: function isNonGeographic() {
      var metadata2 = new Metadata(this.metadata);
      return metadata2.isNonGeographicCallingCode(this.countryCallingCode);
    }
  }, {
    key: "isEqual",
    value: function isEqual(phoneNumber) {
      return this.number === phoneNumber.number && this.ext === phoneNumber.ext;
    }
  }, {
    key: "getType",
    value: function getType2() {
      return getNumberType(this, {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "format",
    value: function format2(_format, options) {
      return formatNumber(this, _format, options ? _objectSpread$4(_objectSpread$4({}, options), {}, {
        v2: true
      }) : {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "formatNational",
    value: function formatNational(options) {
      return this.format("NATIONAL", options);
    }
  }, {
    key: "formatInternational",
    value: function formatInternational(options) {
      return this.format("INTERNATIONAL", options);
    }
  }, {
    key: "getURI",
    value: function getURI(options) {
      return this.format("RFC3966", options);
    }
  }]);
  return PhoneNumber2;
}();
var isCountryCode = function isCountryCode2(value) {
  return /^[A-Z]{2}$/.test(value);
};
var CAPTURING_DIGIT_PATTERN = new RegExp("([" + VALID_DIGITS + "])");
function stripIddPrefix(number, country, callingCode, metadata2) {
  if (!country) {
    return;
  }
  var countryMetadata = new Metadata(metadata2);
  countryMetadata.selectNumberingPlan(country, callingCode);
  var IDDPrefixPattern = new RegExp(countryMetadata.IDDPrefix());
  if (number.search(IDDPrefixPattern) !== 0) {
    return;
  }
  number = number.slice(number.match(IDDPrefixPattern)[0].length);
  var matchedGroups = number.match(CAPTURING_DIGIT_PATTERN);
  if (matchedGroups && matchedGroups[1] != null && matchedGroups[1].length > 0) {
    if (matchedGroups[1] === "0") {
      return;
    }
  }
  return number;
}
function extractNationalNumberFromPossiblyIncompleteNumber(number, metadata2) {
  if (number && metadata2.numberingPlan.nationalPrefixForParsing()) {
    var prefixPattern = new RegExp("^(?:" + metadata2.numberingPlan.nationalPrefixForParsing() + ")");
    var prefixMatch = prefixPattern.exec(number);
    if (prefixMatch) {
      var nationalNumber;
      var carrierCode;
      var capturedGroupsCount = prefixMatch.length - 1;
      var hasCapturedGroups = capturedGroupsCount > 0 && prefixMatch[capturedGroupsCount];
      if (metadata2.nationalPrefixTransformRule() && hasCapturedGroups) {
        nationalNumber = number.replace(prefixPattern, metadata2.nationalPrefixTransformRule());
        if (capturedGroupsCount > 1) {
          carrierCode = prefixMatch[1];
        }
      } else {
        var prefixBeforeNationalNumber = prefixMatch[0];
        nationalNumber = number.slice(prefixBeforeNationalNumber.length);
        if (hasCapturedGroups) {
          carrierCode = prefixMatch[1];
        }
      }
      var nationalPrefix;
      if (hasCapturedGroups) {
        var possiblePositionOfTheFirstCapturedGroup = number.indexOf(prefixMatch[1]);
        var possibleNationalPrefix = number.slice(0, possiblePositionOfTheFirstCapturedGroup);
        if (possibleNationalPrefix === metadata2.numberingPlan.nationalPrefix()) {
          nationalPrefix = metadata2.numberingPlan.nationalPrefix();
        }
      } else {
        nationalPrefix = prefixMatch[0];
      }
      return {
        nationalNumber,
        nationalPrefix,
        carrierCode
      };
    }
  }
  return {
    nationalNumber: number
  };
}
function extractNationalNumber(number, metadata2) {
  var _extractNationalNumbe = extractNationalNumberFromPossiblyIncompleteNumber(number, metadata2), carrierCode = _extractNationalNumbe.carrierCode, nationalNumber = _extractNationalNumbe.nationalNumber;
  if (nationalNumber !== number) {
    if (!shouldHaveExtractedNationalPrefix(number, nationalNumber, metadata2)) {
      return {
        nationalNumber: number
      };
    }
    if (metadata2.possibleLengths()) {
      if (!isPossibleIncompleteNationalNumber(nationalNumber, metadata2)) {
        return {
          nationalNumber: number
        };
      }
    }
  }
  return {
    nationalNumber,
    carrierCode
  };
}
function shouldHaveExtractedNationalPrefix(nationalNumberBefore, nationalNumberAfter, metadata2) {
  if (matchesEntirely(nationalNumberBefore, metadata2.nationalNumberPattern()) && !matchesEntirely(nationalNumberAfter, metadata2.nationalNumberPattern())) {
    return false;
  }
  return true;
}
function isPossibleIncompleteNationalNumber(nationalNumber, metadata2) {
  switch (checkNumberLength(nationalNumber, metadata2)) {
    case "TOO_SHORT":
    case "INVALID_LENGTH":
      return false;
    default:
      return true;
  }
}
function extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, callingCode, metadata2) {
  var countryCallingCode = country ? getCountryCallingCode(country, metadata2) : callingCode;
  if (number.indexOf(countryCallingCode) === 0) {
    metadata2 = new Metadata(metadata2);
    metadata2.selectNumberingPlan(country, callingCode);
    var possibleShorterNumber = number.slice(countryCallingCode.length);
    var _extractNationalNumbe = extractNationalNumber(possibleShorterNumber, metadata2), possibleShorterNationalNumber = _extractNationalNumbe.nationalNumber;
    var _extractNationalNumbe2 = extractNationalNumber(number, metadata2), nationalNumber = _extractNationalNumbe2.nationalNumber;
    if (!matchesEntirely(nationalNumber, metadata2.nationalNumberPattern()) && matchesEntirely(possibleShorterNationalNumber, metadata2.nationalNumberPattern()) || checkNumberLength(nationalNumber, metadata2) === "TOO_LONG") {
      return {
        countryCallingCode,
        number: possibleShorterNumber
      };
    }
  }
  return {
    number
  };
}
function extractCountryCallingCode(number, country, callingCode, metadata2) {
  if (!number) {
    return {};
  }
  if (number[0] !== "+") {
    var numberWithoutIDD = stripIddPrefix(number, country, callingCode, metadata2);
    if (numberWithoutIDD && numberWithoutIDD !== number) {
      number = "+" + numberWithoutIDD;
    } else {
      if (country || callingCode) {
        var _extractCountryCallin = extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, callingCode, metadata2), countryCallingCode = _extractCountryCallin.countryCallingCode, shorterNumber = _extractCountryCallin.number;
        if (countryCallingCode) {
          return {
            countryCallingCode,
            number: shorterNumber
          };
        }
      }
      return {
        number
      };
    }
  }
  if (number[1] === "0") {
    return {};
  }
  metadata2 = new Metadata(metadata2);
  var i3 = 2;
  while (i3 - 1 <= MAX_LENGTH_COUNTRY_CODE && i3 <= number.length) {
    var _countryCallingCode = number.slice(1, i3);
    if (metadata2.hasCallingCode(_countryCallingCode)) {
      metadata2.selectNumberingPlan(_countryCallingCode);
      return {
        countryCallingCode: _countryCallingCode,
        number: number.slice(i3)
      };
    }
    i3++;
  }
  return {};
}
function _createForOfIteratorHelperLoose(o2, allowArrayLike) {
  var it2 = typeof Symbol !== "undefined" && o2[Symbol.iterator] || o2["@@iterator"];
  if (it2)
    return (it2 = it2.call(o2)).next.bind(it2);
  if (Array.isArray(o2) || (it2 = _unsupportedIterableToArray$1(o2)) || allowArrayLike && o2 && typeof o2.length === "number") {
    if (it2)
      o2 = it2;
    var i3 = 0;
    return function() {
      if (i3 >= o2.length)
        return { done: true };
      return { done: false, value: o2[i3++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray$1(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray$1(o2, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++) {
    arr2[i3] = arr[i3];
  }
  return arr2;
}
var USE_NON_GEOGRAPHIC_COUNTRY_CODE = false;
function getCountryByCallingCode(callingCode, nationalPhoneNumber, metadata2) {
  if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
    if (metadata2.isNonGeographicCallingCode(callingCode)) {
      return "001";
    }
  }
  var possibleCountries = metadata2.getCountryCodesForCallingCode(callingCode);
  if (!possibleCountries) {
    return;
  }
  if (possibleCountries.length === 1) {
    return possibleCountries[0];
  }
  return selectCountryFromList(possibleCountries, nationalPhoneNumber, metadata2.metadata);
}
function selectCountryFromList(possibleCountries, nationalPhoneNumber, metadata2) {
  metadata2 = new Metadata(metadata2);
  for (var _iterator = _createForOfIteratorHelperLoose(possibleCountries), _step; !(_step = _iterator()).done; ) {
    var country = _step.value;
    metadata2.country(country);
    if (metadata2.leadingDigits()) {
      if (nationalPhoneNumber && nationalPhoneNumber.search(metadata2.leadingDigits()) === 0) {
        return country;
      }
    } else if (getNumberType({
      phone: nationalPhoneNumber,
      country
    }, void 0, metadata2.metadata)) {
      return country;
    }
  }
}
var MAX_INPUT_STRING_LENGTH = 250;
var PHONE_NUMBER_START_PATTERN = new RegExp("[" + PLUS_CHARS + VALID_DIGITS + "]");
var AFTER_PHONE_NUMBER_END_PATTERN = new RegExp("[^" + VALID_DIGITS + "#]+$");
function parse(text, options, metadata2) {
  options = options || {};
  metadata2 = new Metadata(metadata2);
  if (options.defaultCountry && !metadata2.hasCountry(options.defaultCountry)) {
    if (options.v2) {
      throw new ParseError("INVALID_COUNTRY");
    }
    throw new Error("Unknown country: ".concat(options.defaultCountry));
  }
  var _parseInput = parseInput(text, options.v2, options.extract), formattedPhoneNumber = _parseInput.number, ext = _parseInput.ext, error = _parseInput.error;
  if (!formattedPhoneNumber) {
    if (options.v2) {
      if (error === "TOO_SHORT") {
        throw new ParseError("TOO_SHORT");
      }
      throw new ParseError("NOT_A_NUMBER");
    }
    return {};
  }
  var _parsePhoneNumber = parsePhoneNumber$1(formattedPhoneNumber, options.defaultCountry, options.defaultCallingCode, metadata2), country = _parsePhoneNumber.country, nationalNumber = _parsePhoneNumber.nationalNumber, countryCallingCode = _parsePhoneNumber.countryCallingCode, carrierCode = _parsePhoneNumber.carrierCode;
  if (!metadata2.hasSelectedNumberingPlan()) {
    if (options.v2) {
      throw new ParseError("INVALID_COUNTRY");
    }
    return {};
  }
  if (!nationalNumber || nationalNumber.length < MIN_LENGTH_FOR_NSN) {
    if (options.v2) {
      throw new ParseError("TOO_SHORT");
    }
    return {};
  }
  if (nationalNumber.length > MAX_LENGTH_FOR_NSN) {
    if (options.v2) {
      throw new ParseError("TOO_LONG");
    }
    return {};
  }
  if (options.v2) {
    var phoneNumber = new PhoneNumber(countryCallingCode, nationalNumber, metadata2.metadata);
    if (country) {
      phoneNumber.country = country;
    }
    if (carrierCode) {
      phoneNumber.carrierCode = carrierCode;
    }
    if (ext) {
      phoneNumber.ext = ext;
    }
    return phoneNumber;
  }
  var valid = (options.extended ? metadata2.hasSelectedNumberingPlan() : country) ? matchesEntirely(nationalNumber, metadata2.nationalNumberPattern()) : false;
  if (!options.extended) {
    return valid ? result(country, nationalNumber, ext) : {};
  }
  return {
    country,
    countryCallingCode,
    carrierCode,
    valid,
    possible: valid ? true : options.extended === true && metadata2.possibleLengths() && isPossibleNumber(nationalNumber, metadata2) ? true : false,
    phone: nationalNumber,
    ext
  };
}
function extractFormattedPhoneNumber(text, extract, throwOnError) {
  if (!text) {
    return;
  }
  if (text.length > MAX_INPUT_STRING_LENGTH) {
    if (throwOnError) {
      throw new ParseError("TOO_LONG");
    }
    return;
  }
  if (extract === false) {
    return text;
  }
  var startsAt = text.search(PHONE_NUMBER_START_PATTERN);
  if (startsAt < 0) {
    return;
  }
  return text.slice(startsAt).replace(AFTER_PHONE_NUMBER_END_PATTERN, "");
}
function parseInput(text, v2, extract) {
  if (text && text.indexOf("tel:") === 0) {
    return parseRFC3966(text);
  }
  var number = extractFormattedPhoneNumber(text, extract, v2);
  if (!number) {
    return {};
  }
  if (!isViablePhoneNumber(number)) {
    if (isViablePhoneNumberStart(number)) {
      return {
        error: "TOO_SHORT"
      };
    }
    return {};
  }
  var withExtensionStripped = extractExtension(number);
  if (withExtensionStripped.ext) {
    return withExtensionStripped;
  }
  return {
    number
  };
}
function result(country, nationalNumber, ext) {
  var result2 = {
    country,
    phone: nationalNumber
  };
  if (ext) {
    result2.ext = ext;
  }
  return result2;
}
function parsePhoneNumber$1(formattedPhoneNumber, defaultCountry, defaultCallingCode, metadata2) {
  var _extractCountryCallin = extractCountryCallingCode(parseIncompletePhoneNumber(formattedPhoneNumber), defaultCountry, defaultCallingCode, metadata2.metadata), countryCallingCode = _extractCountryCallin.countryCallingCode, number = _extractCountryCallin.number;
  var country;
  if (countryCallingCode) {
    metadata2.selectNumberingPlan(countryCallingCode);
  } else if (number && (defaultCountry || defaultCallingCode)) {
    metadata2.selectNumberingPlan(defaultCountry, defaultCallingCode);
    if (defaultCountry) {
      country = defaultCountry;
    }
    countryCallingCode = defaultCallingCode || getCountryCallingCode(defaultCountry, metadata2.metadata);
  } else
    return {};
  if (!number) {
    return {
      countryCallingCode
    };
  }
  var _extractNationalNumbe = extractNationalNumber(parseIncompletePhoneNumber(number), metadata2), nationalNumber = _extractNationalNumbe.nationalNumber, carrierCode = _extractNationalNumbe.carrierCode;
  var exactCountry = getCountryByCallingCode(countryCallingCode, nationalNumber, metadata2);
  if (exactCountry) {
    country = exactCountry;
    if (exactCountry === "001")
      ;
    else {
      metadata2.country(country);
    }
  }
  return {
    country,
    countryCallingCode,
    nationalNumber,
    carrierCode
  };
}
function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$3(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = null != arguments[i3] ? arguments[i3] : {};
    i3 % 2 ? ownKeys$3(Object(source), true).forEach(function(key) {
      _defineProperty$3(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function parsePhoneNumber(text, options, metadata2) {
  return parse(text, _objectSpread$3(_objectSpread$3({}, options), {}, {
    v2: true
  }), metadata2);
}
function _typeof$3(obj) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$3(obj);
}
function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$2(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = null != arguments[i3] ? arguments[i3] : {};
    i3 % 2 ? ownKeys$2(Object(source), true).forEach(function(key) {
      _defineProperty$2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i3) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i3) || _unsupportedIterableToArray(arr, i3) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o2, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++) {
    arr2[i3] = arr[i3];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i3) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n2 = true;
  var _d = false;
  var _s, _e2;
  try {
    for (_i = _i.call(arr); !(_n2 = (_s = _i.next()).done); _n2 = true) {
      _arr.push(_s.value);
      if (i3 && _arr.length === i3)
        break;
    }
  } catch (err) {
    _d = true;
    _e2 = err;
  } finally {
    try {
      if (!_n2 && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e2;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function normalizeArguments(args) {
  var _Array$prototype$slic = Array.prototype.slice.call(args), _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 4), arg_1 = _Array$prototype$slic2[0], arg_2 = _Array$prototype$slic2[1], arg_3 = _Array$prototype$slic2[2], arg_4 = _Array$prototype$slic2[3];
  var text;
  var options;
  var metadata2;
  if (typeof arg_1 === "string") {
    text = arg_1;
  } else
    throw new TypeError("A text for parsing must be a string.");
  if (!arg_2 || typeof arg_2 === "string") {
    if (arg_4) {
      options = arg_3;
      metadata2 = arg_4;
    } else {
      options = void 0;
      metadata2 = arg_3;
    }
    if (arg_2) {
      options = _objectSpread$2({
        defaultCountry: arg_2
      }, options);
    }
  } else if (isObject(arg_2)) {
    if (arg_3) {
      options = arg_2;
      metadata2 = arg_3;
    } else {
      metadata2 = arg_2;
    }
  } else
    throw new Error("Invalid second argument: ".concat(arg_2));
  return {
    text,
    options,
    metadata: metadata2
  };
}
var isObject = function isObject2(_2) {
  return _typeof$3(_2) === "object";
};
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = null != arguments[i3] ? arguments[i3] : {};
    i3 % 2 ? ownKeys$1(Object(source), true).forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function parsePhoneNumberFromString$2(text, options, metadata2) {
  if (options && options.defaultCountry && !isSupportedCountry(options.defaultCountry, metadata2)) {
    options = _objectSpread$1(_objectSpread$1({}, options), {}, {
      defaultCountry: void 0
    });
  }
  try {
    return parsePhoneNumber(text, options, metadata2);
  } catch (error) {
    if (error instanceof ParseError)
      ;
    else {
      throw error;
    }
  }
}
function parsePhoneNumberFromString$1() {
  var _normalizeArguments = normalizeArguments(arguments), text = _normalizeArguments.text, options = _normalizeArguments.options, metadata2 = _normalizeArguments.metadata;
  return parsePhoneNumberFromString$2(text, options, metadata2);
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i3 = 1; i3 < arguments.length; i3++) {
    var source = null != arguments[i3] ? arguments[i3] : {};
    i3 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function isValidPhoneNumber$1() {
  var _normalizeArguments = normalizeArguments(arguments), text = _normalizeArguments.text, options = _normalizeArguments.options, metadata2 = _normalizeArguments.metadata;
  options = _objectSpread(_objectSpread({}, options), {}, {
    extract: false
  });
  var phoneNumber = parsePhoneNumberFromString$2(text, options, metadata2);
  return phoneNumber && phoneNumber.isValid() || false;
}
function parsePhoneNumberFromString() {
  return withMetadataArgument(parsePhoneNumberFromString$1, arguments);
}
function isValidPhoneNumber() {
  return withMetadataArgument(isValidPhoneNumber$1, arguments);
}
const extension = {
  MY: "+60",
  ID: "+62"
};
function checkPhoneNumber(number, cc) {
  return isValidPhoneNumber(`${number}`, cc);
}
function getCountryCode(cc) {
  return extension[cc];
}
function getNumber(number, cc) {
  return parsePhoneNumberFromString(number, cc).nationalNumber;
}
function getDbNumber(number) {
  if (isValidPhoneNumber(number, "MY")) {
    return `0${getNumber(number, "MY")}`;
  } else {
    return number;
  }
}
var Home_vue_vue_type_style_index_0_lang = "";
const _sfc_main$J = {
  name: "Home",
  setup(props) {
    const loadingStyles = ref(true);
    const phoneNumber = ref("");
    const loading = ref(false);
    const error = ref(false);
    const store2 = inject("store");
    const loginQuery = useQuery({
      query: LOGIN_STYLE,
      variables: {
        id: store2.state.token
      }
    });
    const textColor = ref(null);
    const textColorHex = ref(null);
    const secondaryTextColor = ref(null);
    const buttonColor = ref(null);
    const modalPrimaryColor = ref(null);
    const subBackground = ref(null);
    const inputBorder = ref(null);
    const modalSecondaryColor = ref(null);
    const placeholderColor = ref(null);
    const linkColor = ref(null);
    const mainBackground = ref(null);
    const extension2 = ref(getCountryCode(store2.state.countryCode));
    watch(loginQuery.fetching, (fetchStatus) => {
      if (!fetchStatus) {
        const loginStyle = JSON.parse(loginQuery.data.value.brand.loginStyle);
        textColor.value = { color: `${loginStyle.text_color} !important` };
        textColorHex.value = loginStyle.text_color;
        secondaryTextColor.value = { color: `${loginStyle.secondary_text_color}!important` };
        buttonColor.value = { color: `${loginStyle.button_color} !important` };
        modalPrimaryColor.value = loginStyle.modal_color;
        subBackground.value = {
          background: `${loginStyle.sub_background} !important`,
          "border-color": `${loginStyle.sub_background} !important`
        };
        inputBorder.value = {
          "border-color": `${loginStyle.text_color} !important`
        };
        modalSecondaryColor.value = loginStyle.modal_background;
        placeholderColor.value = {
          "--placeholder-color": loginStyle.placeholder_color
        };
        linkColor.value = { color: `${loginStyle.link_color} !important` };
        mainBackground.value = {
          background: `${loginStyle.main_background} !important`
        };
        const div = document.getElementById("mulah-app");
        div.style.cssText += `background-color: ${loginStyle.main_background} !important;`;
        document.body.style.setProperty("background", loginStyle.main_background, "important");
        loadingStyles.value = false;
      }
    });
    const { executeMutation: checkpointsValidation } = useMutation(
      CHECKPOINTS_VALIDATION
    );
    const closeModal = () => {
      error.value = false;
    };
    const validPhoneNumber = computed(() => {
      return checkPhoneNumber(phoneNumber.value, store2.state.countryCode);
    });
    function keyPress(event) {
      const charCodeString = String.fromCharCode(event.charCode);
      const isIntString = /\d/.test(charCodeString);
      if (!isIntString) {
        event.preventDefault();
      } else {
        return true;
      }
    }
    function checkpoints() {
      if (loading.value) {
        return;
      } else if (!validPhoneNumber.value) {
        error.value = true;
      } else {
        loading.value = true;
        const nationalNumber = getNumber(
          phoneNumber.value,
          store2.state.countryCode
        );
        checkpointsValidation({
          phoneNumber: nationalNumber,
          slug: null,
          specification: "embedded",
          websiteToken: store2.state.token,
          countryCode: store2.state.countryCode
        }).then((result2) => {
          loading.value = false;
          if (result2.error) {
            error.value = true;
          } else {
            if (result2.data.checkpointsValidation.code == null) {
              alert(result2.data.checkpointsValidation.errors[0].message);
              loading.value = false;
            } else {
              store2.addValidationCode(result2.data.checkpointsValidation.code);
              store2.addRegistrationStatus(
                result2.data.checkpointsValidation.registered
              );
              store2.addAllowSkipEmail(
                result2.data.checkpointsValidation.allowSkipEmail
              );
              store2.addPhoneNumber(nationalNumber);
              props.changePath("phone-verification");
            }
          }
        });
      }
    }
    const inputPlaceholder = ref("Enter mobile number");
    function testing() {
      const select = document.getElementById("mulah-home__input__countryCode");
      const cc = select.options[select.selectedIndex].value;
      extension2.value = getCountryCode(cc);
      store2.addCountryCode(cc);
    }
    return {
      phoneNumber,
      checkpointsValidation,
      closeModal,
      error,
      loading,
      validPhoneNumber,
      keyPress,
      checkpoints,
      textColor,
      textColorHex,
      secondaryTextColor,
      buttonColor,
      subBackground,
      inputBorder,
      placeholderColor,
      linkColor,
      mainBackground,
      inputPlaceholder,
      modalPrimaryColor,
      modalSecondaryColor,
      testing,
      extension: extension2,
      loadingStyles
    };
  },
  inject: ["store"],
  props: {
    changePath: Function
  },
  components: {
    ErrorModal,
    Spinner,
    ArrowDown
  }
};
const _hoisted_1$I = {
  key: 0,
  class: "spinner-container"
};
const _hoisted_2$G = { class: "spinner-inner" };
const _hoisted_3$B = {
  key: 1,
  class: "mulah-home"
};
const _hoisted_4$w = { class: "mulah-home__content" };
const _hoisted_5$w = { class: "mulah-home__welcome" };
const _hoisted_6$r = { class: "mulah-home__input-container" };
const _hoisted_7$o = { class: "mulah-home__input" };
const _hoisted_8$m = { class: "mulah-home__input__select" };
const _hoisted_9$j = /* @__PURE__ */ createVNode("option", { value: "MY" }, "+60", -1);
const _hoisted_10$h = /* @__PURE__ */ createVNode("option", { value: "ID" }, "+62", -1);
const _hoisted_11$h = { class: "mulah-home__input mulah-home__input--button" };
const _hoisted_12$f = /* @__PURE__ */ createVNode("hr", null, null, -1);
const _hoisted_13$a = { class: "mulah-home__footer" };
const _hoisted_14$a = /* @__PURE__ */ createTextVNode(" Powered by ");
function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Spinner = resolveComponent("Spinner");
  const _component_ArrowDown = resolveComponent("ArrowDown");
  const _component_ErrorModal = resolveComponent("ErrorModal");
  return $setup.loadingStyles ? (openBlock(), createBlock("div", _hoisted_1$I, [
    createVNode("div", _hoisted_2$G, [
      createVNode(_component_Spinner)
    ])
  ])) : (openBlock(), createBlock("div", _hoisted_3$B, [
    createVNode("div", _hoisted_4$w, [
      createVNode("div", _hoisted_5$w, [
        createVNode("p", {
          class: "mulah-home__welcome-header",
          style: $setup.textColor
        }, "Hello,", 4),
        createVNode("p", {
          class: "mulah-home__welcome-header",
          style: $setup.textColor
        }, "Welcome !", 4),
        createVNode("p", { style: $setup.secondaryTextColor }, "Check Your Loyalty Points & Rewards", 4)
      ]),
      createVNode("div", _hoisted_6$r, [
        createVNode("div", _hoisted_7$o, [
          createVNode("div", _hoisted_8$m, [
            createVNode("select", {
              style: [{ "height": "46px !important" }, { ...$setup.inputBorder, ...$setup.mainBackground, ...$setup.textColor, ...$setup.placeholderColor }],
              onChange: _cache[1] || (_cache[1] = (...args) => $setup.testing && $setup.testing(...args)),
              name: "countryCode",
              id: "mulah-home__input__countryCode",
              class: "mulah-home__select"
            }, [
              _hoisted_9$j,
              _hoisted_10$h
            ], 36),
            createVNode(_component_ArrowDown, {
              size: 18,
              color: $setup.textColorHex
            }, null, 8, ["color"])
          ]),
          withDirectives(createVNode("input", {
            type: "tel",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.phoneNumber = $event),
            onKeypress: _cache[3] || (_cache[3] = (...args) => $setup.keyPress && $setup.keyPress(...args)),
            placeholder: $setup.inputPlaceholder,
            style: { ...$setup.inputBorder, ...$setup.mainBackground, ...$setup.textColor, ...$setup.placeholderColor }
          }, null, 44, ["placeholder"]), [
            [vModelText, $setup.phoneNumber]
          ]),
          $setup.validPhoneNumber ? (openBlock(), createBlock("i", {
            key: 0,
            style: { ...$setup.inputBorder, ...$setup.mainBackground },
            class: "fas fa-check-circle fa-correct"
          }, null, 4)) : (openBlock(), createBlock("i", {
            key: 1,
            style: { ...$setup.inputBorder, ...$setup.mainBackground },
            class: "fas fa-check-circle"
          }, null, 4))
        ]),
        createVNode("div", _hoisted_11$h, [
          $setup.loading ? (openBlock(), createBlock(_component_Spinner, { key: 0 })) : (openBlock(), createBlock("button", {
            key: 1,
            onClick: _cache[4] || (_cache[4] = (...args) => $setup.checkpoints && $setup.checkpoints(...args)),
            style: $setup.subBackground
          }, [
            createVNode("div", { style: $setup.buttonColor }, "Check Loyalty Points", 4)
          ], 4))
        ])
      ])
    ]),
    _hoisted_12$f,
    createVNode("div", _hoisted_13$a, [
      createVNode("h6", { style: $setup.secondaryTextColor }, [
        _hoisted_14$a,
        createVNode("a", {
          class: "mulah-link-blue",
          style: $setup.linkColor
        }, "MulahRewards.com", 4)
      ], 4)
    ]),
    $setup.error ? (openBlock(), createBlock(_component_ErrorModal, {
      key: 0,
      "close-modal": $setup.closeModal,
      specification: "home",
      modalPrimaryColor: $setup.modalPrimaryColor,
      modalSecondaryColor: $setup.modalSecondaryColor
    }, null, 8, ["close-modal", "modalPrimaryColor", "modalSecondaryColor"])) : createCommentVNode("", true)
  ]));
}
var Home$1 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$J]]);
const _sfc_main$I = {
  name: "SuccessSvg",
  props: {
    color: String,
    size: Number
  }
};
const _hoisted_1$H = /* @__PURE__ */ createVNode("path", {
  class: "cls-1",
  d: "M241,0c10,0,20,0,30,0,1.29,.28,2.56,.73,3.86,.82,35.89,2.43,69.9,11.88,101.34,29.24,72.13,39.82,116.25,100.33,131.76,181.39,1.87,9.75,2.71,19.7,4.03,29.55v30c-.29,1.44-.75,2.86-.85,4.31-2.5,35.71-11.92,69.56-29.19,100.85-39.81,72.14-100.31,116.27-181.36,131.8-9.77,1.87-19.73,2.72-29.6,4.04h-30c-1.29-.28-2.56-.73-3.86-.82-35.89-2.43-69.9-11.88-101.34-29.24C63.66,442.12,19.54,381.61,4.03,300.55c-1.87-9.75-2.71-19.7-4.03-29.55,0-10,0-20,0-30,.29-1.44,.75-2.86,.85-4.31,2.5-35.71,11.92-69.56,29.19-100.85C69.84,63.7,130.35,19.57,211.4,4.04,221.16,2.16,231.13,1.32,241,0Zm231,255.98c-.02-119.14-96.57-215.78-215.77-215.97-119.22-.2-216.24,96.73-216.22,216.02,.02,119.14,96.57,215.78,215.77,215.97,119.22,.2,216.24-96.73,216.22-216.02Z"
}, null, -1);
const _hoisted_2$F = /* @__PURE__ */ createVNode("path", {
  class: "cls-1",
  d: "M221.98,295.88c1.2-2.02,1.93-4.06,3.31-5.44,37.76-37.87,75.59-75.65,113.37-113.49,4.5-4.51,9.43-7.97,16.08-7.94,8.03,.04,14.13,3.63,17.88,10.69,3.78,7.09,3.16,14.15-1.42,20.73-1.42,2.03-3.22,3.82-4.98,5.58-42.74,42.77-85.5,85.53-128.27,128.29-11.78,11.78-22.34,11.82-34.04,.13-19.91-19.9-39.79-39.84-59.73-59.7-5.43-5.41-8.36-11.68-6.76-19.37,3.12-15.02,20.7-21.23,32.37-11.21,6.8,5.85,12.9,12.52,19.27,18.87,10.49,10.44,20.94,20.91,32.92,32.88Z"
}, null, -1);
function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px!important;
    `,
    id: "Layer_1",
    "data-name": "Layer 1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, [
    _hoisted_1$H,
    _hoisted_2$F
  ], 4);
}
var Success = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$I]]);
var SuccessModal_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$H = {
  name: "SuccessModal",
  setup(props) {
    const groupF = ref({});
    const svgFill = ref(null);
    groupF.value = {
      background: `${props.modalSecondaryColor} !important`,
      "border-color": `${props.modalSecondaryColor} !important`,
      color: `${props.modalPrimaryColor} !important`
    };
    svgFill.value = props.modalSecondaryColor;
    return {
      groupF,
      svgFill
    };
  },
  props: {
    closeModal: Function,
    specification: String,
    modalSecondaryColor: String,
    modalPrimaryColor: String
  },
  components: {
    Success
  }
};
const _withId$4 = /* @__PURE__ */ withScopeId("data-v-6f0f1508");
pushScopeId("data-v-6f0f1508");
const _hoisted_1$G = /* @__PURE__ */ createVNode("div", { class: "mulah-overlay" }, null, -1);
const _hoisted_2$E = { class: "mulah-modal" };
const _hoisted_3$A = { class: "mulah-modal__container" };
const _hoisted_4$v = { class: "mulah-modal__dialog" };
const _hoisted_5$v = { class: "mulah-modal__content" };
const _hoisted_6$q = {
  key: 0,
  class: "mulah-modal__content-text"
};
const _hoisted_7$n = /* @__PURE__ */ createVNode("p", null, "Registration completed!", -1);
const _hoisted_8$l = {
  key: 1,
  class: "mulah-modal__content-text"
};
const _hoisted_9$i = /* @__PURE__ */ createVNode("p", null, "Account Updated!", -1);
const _hoisted_10$g = {
  key: 2,
  class: "mulah-modal__content-text"
};
const _hoisted_11$g = /* @__PURE__ */ createVNode("p", null, "Phone Number Verified!", -1);
popScopeId();
const _sfc_render$H = /* @__PURE__ */ _withId$4((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_Success = resolveComponent("Success");
  return openBlock(), createBlock("div", null, [
    _hoisted_1$G,
    createVNode("div", _hoisted_2$E, [
      createVNode("div", _hoisted_3$A, [
        createVNode("div", _hoisted_4$v, [
          createVNode("div", _hoisted_5$v, [
            createVNode(_component_Success, {
              size: 80,
              fill: $setup.svgFill
            }, null, 8, ["fill"]),
            $props.specification == "registration" ? (openBlock(), createBlock("div", _hoisted_6$q, [
              _hoisted_7$n
            ])) : $props.specification == "personal-info" ? (openBlock(), createBlock("div", _hoisted_8$l, [
              _hoisted_9$i
            ])) : $props.specification == "verification" ? (openBlock(), createBlock("div", _hoisted_10$g, [
              _hoisted_11$g
            ])) : createCommentVNode("", true),
            createVNode("button", {
              style: $setup.groupF,
              class: "mulah-modal__content-button-success",
              onClick: _cache[1] || (_cache[1] = (...args) => $props.closeModal && $props.closeModal(...args))
            }, " Back ", 4)
          ])
        ])
      ])
    ])
  ]);
});
var SuccessModal = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$H], ["__scopeId", "data-v-6f0f1508"]]);
var PhoneVerification_vue_vue_type_style_index_0_lang = "";
const _sfc_main$G = {
  name: "PhoneVerification",
  setup(props) {
    const loadingStyles = ref(true);
    let timer = ref(30);
    let tries = ref(0);
    const code = ref(null);
    const error = ref(false);
    const success = ref(false);
    const loading = ref(false);
    const store2 = inject("store");
    const timerValues = [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09"
    ];
    const extension2 = ref(getCountryCode(store2.state.countryCode));
    const loginQuery = useQuery({
      query: VERIFICATION_STYLE,
      variables: {
        id: store2.state.token
      }
    });
    const textColor = ref(null);
    const buttonColor = ref(null);
    const modalPrimaryColor = ref(null);
    const subBackground = ref(null);
    const subTextColor = ref(null);
    const modalSecondaryColor = ref(null);
    const placeholderColor = ref(null);
    const linkColor = ref(null);
    const mainBackground = ref(null);
    watch(loginQuery.fetching, (fetchStatus) => {
      if (!fetchStatus) {
        const loginStyle = JSON.parse(
          loginQuery.data.value.brand.verificationStyle
        );
        textColor.value = { color: `${loginStyle.text_color} !important` };
        buttonColor.value = { color: `${loginStyle.button_color} !important` };
        modalPrimaryColor.value = loginStyle.modal_color;
        subBackground.value = {
          background: `${loginStyle.sub_background} !important`,
          "border-color": `${loginStyle.sub_background} !important`
        };
        subTextColor.value = {
          "--subText-color": loginStyle.sub_background
        };
        modalSecondaryColor.value = loginStyle.modal_background;
        placeholderColor.value = {
          "--placeholder-color": loginStyle.placeholder_color
        };
        linkColor.value = { color: `${loginStyle.link_color} !important` };
        mainBackground.value = {
          background: `${loginStyle.main_background} !important`
        };
        const div = document.getElementById("mulah-app");
        div.style.cssText += `background-color: ${loginStyle.main_background} !important;`;
        document.body.style.setProperty("background", loginStyle.main_background, "important");
        loadingStyles.value = false;
      }
    });
    function startInterval() {
      return setInterval(() => {
        timer.value = timer.value - 1;
      }, 1e3);
    }
    let interval = startInterval();
    watch(timer, (timerValue) => {
      if (timerValue == 0)
        clearInterval(interval);
    });
    const { executeMutation: checkpointsValidation } = useMutation(
      CHECKPOINTS_VALIDATION
    );
    const { executeMutation: createProspectMutation } = useMutation(
      CREATE_EMBEDDED_PROSPECT
    );
    function getCode() {
      if (loading.value)
        return;
      tries.value += 1;
      checkpointsValidation({
        phoneNumber: store2.state.phoneNumber,
        slug: null,
        specification: "embedded",
        websiteToken: store2.state.token,
        countryCode: store2.state.countryCode
      }).then((result2) => {
        store2.addValidationCode(result2.data.checkpointsValidation.code);
        store2.addRegistrationStatus(
          result2.data.checkpointsValidation.registered
        );
        loading.value = false;
      });
    }
    function resendCode() {
      if (loading.value)
        return;
      tries.value += 1;
      checkpointsValidation({
        phoneNumber: store2.state.phoneNumber,
        slug: null,
        specification: "ws_check",
        websiteToken: store2.state.token,
        countryCode: store2.state.countryCode
      }).then((result2) => {
        if (result2.data.checkpointsValidation.code == null) {
          alert(result2.data.checkpointsValidation.errors[0].message);
          timer.value = 0;
        } else {
          store2.addValidationCode(result2.data.checkpointsValidation.code);
          store2.addRegistrationStatus(
            result2.data.checkpointsValidation.registered
          );
        }
        loading.value = false;
      });
    }
    function resend() {
      timer.value = 30;
      interval = startInterval();
      resendCode();
    }
    function validateCode() {
      if (store2.state.code == code.value) {
        createProspectMutation({
          phoneNumber: getDbNumber(store2.state.phoneNumber),
          id: store2.state.token
        });
        success.value = true;
        document.cookie = `phoneNumberMulah=${store2.state.phoneNumber}; expires=${new Date(
          new Date().getTime() + 1e3 * 60 * 60 * 24 * 365
        ).toGMTString()};`;
        store2.state.db.savePhoneNumber(store2.state.phoneNumber);
      } else {
        error.value = true;
      }
    }
    function closeModal() {
      error.value = false;
    }
    function continueModal() {
      if (store2.state.registered) {
        props.changePath("history");
      } else {
        props.changePath("registration");
      }
    }
    return {
      timer,
      tries,
      loading,
      code,
      error,
      success,
      interval,
      timerValues,
      checkpointsValidation,
      resend,
      getCode,
      validateCode,
      closeModal,
      continueModal,
      textColor,
      buttonColor,
      subBackground,
      subTextColor,
      placeholderColor,
      linkColor,
      mainBackground,
      modalPrimaryColor,
      modalSecondaryColor,
      extension: extension2,
      loadingStyles
    };
  },
  inject: ["store"],
  props: {
    changePath: Function
  },
  components: {
    ErrorModal,
    SuccessModal,
    Spinner
  }
};
const _hoisted_1$F = {
  key: 0,
  class: "spinner-container"
};
const _hoisted_2$D = { class: "spinner-inner" };
const _hoisted_3$z = {
  key: 1,
  class: "mulah-phone"
};
const _hoisted_4$u = { class: "mulah-phone__content" };
const _hoisted_5$u = /* @__PURE__ */ createVNode("p", null, "Verify Your Mobile", -1);
const _hoisted_6$p = { class: "mulah-phone__welcome" };
const _hoisted_7$m = /* @__PURE__ */ createTextVNode(" Enter the OTP Code sent to ");
const _hoisted_8$k = { class: "mulah-phone__input" };
const _hoisted_9$h = { class: "mulah-phone__alert" };
const _hoisted_10$f = /* @__PURE__ */ createTextVNode(" OTP code should be received in ");
const _hoisted_11$f = { class: "mulah-phone__alert-span-first" };
const _hoisted_12$e = /* @__PURE__ */ createTextVNode(" Didn't receive the OTP Code? ");
const _hoisted_13$9 = { class: "mulah-phone__button" };
const _hoisted_14$9 = { class: "mulah-phone__footer" };
const _hoisted_15$7 = /* @__PURE__ */ createTextVNode(" - Powered by ");
const _hoisted_16$7 = /* @__PURE__ */ createTextVNode(" - ");
function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Spinner = resolveComponent("Spinner");
  const _component_ErrorModal = resolveComponent("ErrorModal");
  const _component_SuccessModal = resolveComponent("SuccessModal");
  return $setup.loadingStyles ? (openBlock(), createBlock("div", _hoisted_1$F, [
    createVNode("div", _hoisted_2$D, [
      createVNode(_component_Spinner)
    ])
  ])) : (openBlock(), createBlock("div", _hoisted_3$z, [
    createVNode("div", _hoisted_4$u, [
      createVNode("div", {
        class: "mulah-phone__header",
        style: $setup.textColor
      }, [
        _hoisted_5$u,
        createVNode("div", _hoisted_6$p, [
          createVNode("p", { style: $setup.textColor }, [
            _hoisted_7$m,
            createVNode("span", { style: $setup.subTextColor }, toDisplayString($setup.extension) + " " + toDisplayString($options.store.state.phoneNumber), 5)
          ], 4)
        ])
      ], 4),
      createVNode("div", _hoisted_8$k, [
        withDirectives(createVNode("input", {
          style: {
            ...$setup.textColor,
            ...$setup.mainBackground,
            ...$setup.placeholderColor
          },
          type: "tel",
          placeholder: "Enter OTP code here",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.code = $event)
        }, null, 4), [
          [vModelText, $setup.code]
        ])
      ]),
      createVNode("div", _hoisted_9$h, [
        $setup.timer != 0 ? (openBlock(), createBlock("p", {
          key: 0,
          style: $setup.textColor
        }, [
          _hoisted_10$f,
          createVNode("span", _hoisted_11$f, [
            createVNode("em", { style: $setup.subTextColor }, "00:" + toDisplayString($setup.timer >= 10 ? $setup.timer : $setup.timerValues[$setup.timer]), 5)
          ])
        ], 4)) : $setup.timer == 0 && $setup.tries < 2 ? (openBlock(), createBlock("p", {
          key: 1,
          style: $setup.textColor
        }, [
          _hoisted_12$e,
          createVNode("span", {
            style: $setup.subTextColor,
            onClick: _cache[2] || (_cache[2] = (...args) => $setup.resend && $setup.resend(...args))
          }, "Send WhatsApp SMS", 4)
        ], 4)) : $setup.tries == 2 ? (openBlock(), createBlock("p", {
          key: 2,
          style: $setup.textColor
        }, " Didn't receive the OTP Code? Please contact us at www.mulahrewards.com ", 4)) : createCommentVNode("", true)
      ]),
      createVNode("div", _hoisted_13$9, [
        createVNode("button", {
          style: { ...$setup.buttonColor, ...$setup.subBackground },
          onClick: _cache[3] || (_cache[3] = (...args) => $setup.validateCode && $setup.validateCode(...args))
        }, " Verify Now ", 4)
      ])
    ]),
    createVNode("div", _hoisted_14$9, [
      createVNode("h6", null, [
        _hoisted_15$7,
        createVNode("a", {
          class: "mulah-link-blue",
          style: $setup.linkColor
        }, "MulahRewards.com", 4),
        _hoisted_16$7
      ])
    ]),
    $setup.error ? (openBlock(), createBlock(_component_ErrorModal, {
      key: 0,
      "close-modal": $setup.closeModal,
      specification: "verification",
      modalPrimaryColor: $setup.modalPrimaryColor,
      modalSecondaryColor: $setup.modalSecondaryColor
    }, null, 8, ["close-modal", "modalPrimaryColor", "modalSecondaryColor"])) : createCommentVNode("", true),
    $setup.success ? (openBlock(), createBlock(_component_SuccessModal, {
      key: 1,
      "close-modal": $setup.continueModal,
      specification: "verification",
      modalPrimaryColor: $setup.modalPrimaryColor,
      modalSecondaryColor: $setup.modalSecondaryColor
    }, null, 8, ["close-modal", "modalPrimaryColor", "modalSecondaryColor"])) : createCommentVNode("", true)
  ]));
}
var PhoneVerification = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$G]]);
var x$1 = { inheritAttrs: false, name: "vue-input", props: { modelValue: { required: true, type: String }, placeholder: { required: true, type: String }, disabled: { required: true, type: Boolean }, tabindex: { required: true, type: Number }, autofocus: { required: true, type: Boolean } }, emits: ["update:modelValue", "input", "change", "focus", "blur", "escape"], setup(t6, n2) {
  const u3 = ref(null);
  return onMounted(() => {
    t6.autofocus && u3.value.focus();
  }), onUpdated(() => {
    t6.autofocus && u3.value.focus();
  }), { handleInput: (e3) => {
    n2.emit("input", e3), n2.emit("update:modelValue", e3.target.value);
  }, handleChange: (e3) => {
    n2.emit("change", e3), n2.emit("update:modelValue", e3.target.value);
  }, handleFocus: (e3) => {
    n2.emit("focus", e3);
  }, handleBlur: (e3) => {
    n2.emit("blur", e3);
  }, input: u3, handleEscape: (e3) => {
    u3.value.blur(), n2.emit("escape", e3);
  } };
} };
const C$1 = { class: "vue-input" };
x$1.render = function(e3, l2, a4, s3, r2, c2) {
  return openBlock(), createBlock("div", C$1, [renderSlot(e3.$slots, "prepend"), createVNode("input", { ref: "input", modelValue: a4.modelValue, placeholder: a4.placeholder, disabled: a4.disabled, onInput: l2[1] || (l2[1] = (...e4) => s3.handleInput && s3.handleInput(...e4)), onChange: l2[2] || (l2[2] = (...e4) => s3.handleChange && s3.handleChange(...e4)), onFocus: l2[3] || (l2[3] = (...e4) => s3.handleFocus && s3.handleFocus(...e4)), onBlur: l2[4] || (l2[4] = (...e4) => s3.handleBlur && s3.handleBlur(...e4)), onKeyup: l2[5] || (l2[5] = withKeys(withModifiers((...e4) => s3.handleEscape && s3.handleEscape(...e4), ["exact"]), ["esc"])), tabindex: a4.tabindex, autofocus: a4.autofocus }, null, 40, ["modelValue", "placeholder", "disabled", "tabindex", "autofocus"]), renderSlot(e3.$slots, "append")]);
}, x$1.__file = "src/components/input.vue";
var O$1 = { inheritAttrs: false, name: "vue-tags", props: { modelValue: { required: true, type: Array, validator: (e3) => e3.every((e4) => void 0 !== typeof e4.key && void 0 !== e4.label && "boolean" == typeof e4.selected) }, collapseTags: { type: Boolean } }, emits: ["click"], setup: (e3, l2) => ({ dataAttrs: inject("dataAttrs"), handleClick: (e4) => {
  l2.emit("click", e4);
} }) };
O$1.render = function(e3, l2, a4, i3, s3, h4) {
  return openBlock(), createBlock("ul", mergeProps({ class: ["vue-tags", { collapsed: a4.collapseTags }], onMousedown: l2[1] || (l2[1] = withModifiers(() => {
  }, ["prevent"])), tabindex: "-1", onClick: l2[2] || (l2[2] = (...e4) => i3.handleClick && i3.handleClick(...e4)) }, i3.dataAttrs), [(openBlock(true), createBlock(Fragment, null, renderList(a4.modelValue, (l3) => (openBlock(), createBlock("li", { key: l3.key, class: ["vue-tag", { selected: l3.selected }] }, [renderSlot(e3.$slots, "default", { option: l3 }, () => [createVNode("span", null, toDisplayString(l3.label), 1)])], 2))), 128))], 16);
}, O$1.__file = "src/components/tags.vue";
var A$1 = { inheritAttrs: false, name: "vue-dropdown", props: { modelValue: { required: true, type: Array, validator: (e3) => e3.every((e4) => void 0 !== typeof e4.key && void 0 !== e4.label && "boolean" == typeof e4.selected) }, headerHeight: { required: true, type: String } }, emits: ["click"], setup: (e3, l2) => ({ dataAttrs: inject("dataAttrs"), handleClick: (e4, a4) => {
  l2.emit("click", e4, a4);
} }) };
A$1.render = function(e3, l2, a4, i3, s3, g2) {
  return openBlock(), createBlock("ul", mergeProps({ class: "vue-dropdown", onMousedown: l2[1] || (l2[1] = withModifiers(() => {
  }, ["prevent"])), style: { top: a4.headerHeight } }, i3.dataAttrs), [(openBlock(true), createBlock(Fragment, null, renderList(a4.modelValue, (l3) => (openBlock(), createBlock(Fragment, { key: l3.key }, [l3.visible && false === l3.hidden ? (openBlock(), createBlock("li", { key: 0, onClick: (e4) => i3.handleClick(e4, l3), class: ["vue-dropdown-item", { selected: l3.selected }] }, [renderSlot(e3.$slots, "default", { option: l3 }, () => [createVNode("span", null, toDisplayString(l3.label), 1)])], 10, ["onClick"])) : createCommentVNode("v-if", true)], 64))), 128))], 16);
}, A$1.__file = "src/components/dropdown.vue";
const D$1 = (e3, l2, { valueBy: a4 }) => a4(e3) === a4(l2), N$1 = (e3, l2, { valueBy: a4 }) => e3.some((e4) => D$1(e4, l2, { valueBy: a4 })), F$1 = (e3, l2, { valueBy: a4 }) => e3.find((e4) => a4(e4) === l2), S$1 = (e3, l2, { max: a4, valueBy: t6 }) => N$1(e3, l2, { valueBy: t6 }) || e3.length >= a4 ? e3 : e3.concat(l2), T$1 = (e3, l2, { min: a4, valueBy: t6 }) => false === N$1(e3, l2, { valueBy: t6 }) || e3.length <= a4 ? e3 : e3.filter((e4) => false === D$1(e4, l2, { valueBy: t6 })), E$1 = (e3) => computed(() => "function" == typeof e3.value ? e3.value : "string" == typeof e3.value ? (l2) => e3.value.split(".").reduce((e4, l3) => e4[l3], l2) : (e4) => e4);
const L$1 = { name: "vue-select", inheritAttrs: false, props: { modelValue: { required: true }, emptyModelValue: { default: null }, options: { required: true, type: Array }, visibleOptions: { type: [Array, null], default: null }, multiple: { default: false, type: Boolean }, min: { default: 0, type: Number }, max: { default: 1 / 0, type: Number }, closeOnSelect: { default: false, type: Boolean }, clearOnSelect: { default: false, type: Boolean }, trackBy: { type: [String, Function] }, hideSelected: { default: false, type: Boolean }, labelBy: { type: [String, Function] }, valueBy: { type: [String, Function] }, disabled: { default: false, type: Boolean }, loading: { default: false, type: Boolean }, placeholder: { default: "Select option", type: String }, searchPlaceholder: { default: "Type to search", type: String }, searchable: { default: false, type: Boolean }, clearOnClose: { default: false, type: Boolean }, taggable: { default: false, type: Boolean }, collapseTags: { default: false, type: Boolean }, tabindex: { default: 0, type: Number }, autofocus: { default: false, type: Boolean } }, emits: ["update:modelValue", "selected", "removed", "opened", "closed", "search:input", "search:change", "search:focus", "search:blur"], setup(a4, t6) {
  const { trackBy: n2, labelBy: u3, valueBy: o2, min: i3, max: d4, options: s3 } = ((l2) => ({ trackBy: E$1(toRef(l2, "trackBy")), labelBy: E$1(toRef(l2, "labelBy")), valueBy: E$1(toRef(l2, "valueBy")), min: computed(() => l2.multiple ? l2.min : Math.min(1, l2.min)), max: computed(() => l2.multiple ? l2.max : 1), options: isRef(l2.options) || isReactive(l2.options) ? toRef(l2, "options") : ref(l2.options) }))(a4), r2 = ref(), c2 = ref(), p2 = ref(false);
  watch(() => p2.value, () => {
    p2.value ? (t6.emit("opened"), a4.searchable ? (c2.value && c2.value._.refs.input !== document.activeElement && c2.value._.refs.input.focus(), t6.emit("search:focus")) : r2.value.focus()) : (a4.searchable ? (c2.value && c2.value._.refs.input === document.activeElement && c2.value._.refs.input.blur(), a4.clearOnClose && j2(), t6.emit("search:blur")) : r2.value.blur(), t6.emit("closed"));
  });
  const v2 = () => {
    a4.disabled || (p2.value = true);
  }, h4 = () => {
    p2.value = false;
  };
  watch(() => a4.disabled, () => h4());
  const B3 = ref(), V2 = (w3 = B3, k3 = () => a4.modelValue, x3 = ref("0"), watch(k3, C2 = function() {
    nextTick(function() {
      w3.value && (x3.value = window.getComputedStyle(w3.value).height);
    });
  }), onMounted(C2), x3);
  var w3, k3, x3, C2;
  const O3 = computed(() => a4.searchable && a4.multiple && a4.taggable ? "22px" : "0px"), A2 = computed(() => parseFloat(V2.value) + parseFloat(O3.value) + "px"), D3 = ref(""), L3 = ref([]), z3 = () => {
    if (a4.multiple) {
      if (false === Array.isArray(a4.modelValue))
        return false;
      if (L3.value.length !== a4.modelValue.length)
        return false;
      if (Object.keys(L3.value).some((e3) => L3.value[e3] !== F$1(s3.value, a4.modelValue[e3], { valueBy: o2.value })))
        return false;
    } else {
      if (0 === L3.value.length && a4.modelValue !== a4.emptyModelValue)
        return false;
      if (1 === L3.value.length && a4.modelValue === a4.emptyModelValue)
        return false;
      if (L3.value[0] !== F$1(s3.value, a4.modelValue, { valueBy: o2.value }))
        return false;
    }
    return true;
  }, _2 = () => {
    if (z3())
      return;
    L3.value = [];
    const e3 = a4.multiple ? a4.modelValue : a4.modelValue === a4.emptyModelValue ? [] : [a4.modelValue];
    for (const l2 of e3) {
      const e4 = F$1(s3.value, l2, { valueBy: o2.value });
      false !== N$1(s3.value, e4, { valueBy: o2.value }) && (L3.value = S$1(L3.value, e4, { max: 1 / 0, valueBy: o2.value }));
    }
  };
  _2(), watch(() => a4.modelValue, () => _2(), { deep: true });
  watch(() => L3, () => (() => {
    if (z3())
      return;
    const e3 = L3.value.map((e4) => o2.value(e4));
    a4.multiple ? t6.emit("update:modelValue", e3) : e3.length ? t6.emit("update:modelValue", e3[0]) : t6.emit("update:modelValue", a4.emptyModelValue);
  })(), { deep: true }), watch(() => s3.value, () => {
    const e3 = new Set(L3.value.map((e4) => o2.value(e4)));
    L3.value = s3.value.filter((l2) => e3.has(o2.value(l2)));
  }, { deep: true });
  const j2 = () => {
    c2.value._.refs.input.value = "", c2.value._.refs.input.dispatchEvent(new Event("input")), c2.value._.refs.input.dispatchEvent(new Event("change"));
  }, P2 = computed(() => {
    const e3 = new Set(L3.value.map((e4) => o2.value(e4))), l2 = null !== a4.visibleOptions ? new Set(a4.visibleOptions.map((e4) => o2.value(e4))) : new Set(s3.value.map((e4) => o2.value(e4)));
    return s3.value.map((t7) => ({ key: n2.value(t7), label: u3.value(t7), selected: e3.has(o2.value(t7)), visible: l2.has(o2.value(t7)), hidden: !!a4.hideSelected && e3.has(o2.value(t7)), originalOption: t7 }));
  }), Z2 = computed(() => ({ "data-is-focusing": p2.value, "data-visible-length": P2.value.filter((e3) => e3.visible && false === e3.hidden).length, "data-not-selected-length": s3.value.length - P2.value.filter((e3) => e3.selected).length, "data-selected-length": P2.value.filter((e3) => e3.selected).length, "data-addable": P2.value.filter((e3) => e3.selected).length < d4.value, "data-removable": P2.value.filter((e3) => e3.selected).length > i3.value, "data-total-length": s3.value.length, "data-multiple": a4.multiple }));
  provide("dataAttrs", Z2);
  const W2 = computed(() => {
    const e3 = P2.value.filter((e4) => e4.selected);
    return a4.multiple ? 0 === e3.length ? a4.placeholder : 1 === e3.length ? "1 option selected" : e3.length + " options selected" : 0 === e3.length ? a4.placeholder : e3[0].label + "";
  });
  return { isFocusing: p2, wrapper: r2, input: c2, focus: v2, blur: h4, toggle: () => {
    p2.value ? h4() : v2();
  }, header: B3, headerAndInputHeight: A2, searchingInputValue: D3, handleInputForInput: (e3) => {
    t6.emit("search:input", e3);
  }, handleChangeForInput: (e3) => {
    t6.emit("search:change", e3);
  }, handleFocusForInput: (e3) => {
    v2();
  }, handleBlurForInput: (e3) => {
    h4();
  }, optionsWithInfo: P2, addOrRemoveOption: (e3, l2) => {
    if (!a4.disabled) {
      if (l2 = l2.originalOption, N$1(L3.value, l2, { valueBy: o2.value }))
        L3.value = T$1(L3.value, l2, { min: i3.value, valueBy: o2.value }), t6.emit("removed", l2);
      else {
        if (!a4.multiple) {
          const e4 = L3.value[0];
          L3.value = T$1(L3.value, L3.value[0], { min: 0, valueBy: o2.value }), t6.emit("removed", e4);
        }
        L3.value = S$1(L3.value, l2, { max: d4.value, valueBy: o2.value }), t6.emit("selected", l2);
      }
      true === a4.closeOnSelect && (p2.value = false), true === a4.clearOnSelect && D3.value && j2();
    }
  }, dataAttrs: Z2, innerPlaceholder: W2 };
}, components: { VInput: x$1, VTags: O$1, VDropdown: A$1 }, __VERSION__: "1.2.1" };
const z$1 = { ref: "header", class: "vue-select-header" }, _$1 = { key: 0, class: "vue-input" }, j$1 = { class: "icon loading" }, P$1 = createVNode("div", null, null, -1), Z$1 = createVNode("div", null, null, -1), W$1 = createVNode("div", null, null, -1), q$1 = { class: "icon loading" }, U$1 = createVNode("div", null, null, -1), H$1 = createVNode("div", null, null, -1), R$1 = createVNode("div", null, null, -1);
L$1.render = function(e3, l2, a4, i3, s3, p2) {
  const g2 = resolveComponent("v-tags"), m4 = resolveComponent("v-input"), y4 = resolveComponent("v-dropdown");
  return openBlock(), createBlock("div", mergeProps({ ref: "wrapper", class: ["vue-select", { disabled: e3.disabled }], tabindex: e3.isFocusing ? -1 : e3.tabindex, onFocus: l2[9] || (l2[9] = (...l3) => e3.focus && e3.focus(...l3)), onBlur: l2[10] || (l2[10] = () => !e3.searchable && e3.blur()) }, e3.dataAttrs), [createVNode("div", z$1, [e3.multiple && e3.taggable && 0 === e3.modelValue.length || false === e3.searchable && false === e3.taggable ? (openBlock(), createBlock("div", _$1, [createVNode("input", { placeholder: e3.innerPlaceholder, readonly: "", onClick: l2[1] || (l2[1] = (...l3) => e3.focus && e3.focus(...l3)) }, null, 8, ["placeholder"])])) : createCommentVNode("v-if", true), e3.multiple && e3.taggable ? (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode(g2, { modelValue: e3.optionsWithInfo, "collapse-tags": e3.collapseTags, tabindex: "-1", onClick: e3.focus }, { default: withCtx(({ option: l3 }) => [renderSlot(e3.$slots, "tag", { option: l3.originalOption }, () => [createVNode("span", null, toDisplayString(l3.label), 1), createVNode("img", { src: "data:image/svg+xml;base64,PHN2ZyBpZD0iZGVsZXRlIiBkYXRhLW5hbWU9ImRlbGV0ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHRpdGxlPmRlbGV0ZTwvdGl0bGU+PHBhdGggZD0iTTI1NiwyNEMzODMuOSwyNCw0ODgsMTI4LjEsNDg4LDI1NlMzODMuOSw0ODgsMjU2LDQ4OCwyNC4wNiwzODMuOSwyNC4wNiwyNTYsMTI4LjEsMjQsMjU2LDI0Wk0wLDI1NkMwLDM5Ny4xNiwxMTQuODQsNTEyLDI1Niw1MTJTNTEyLDM5Ny4xNiw1MTIsMjU2LDM5Ny4xNiwwLDI1NiwwLDAsMTE0Ljg0LDAsMjU2WiIgZmlsbD0iIzViNWI1ZiIvPjxwb2x5Z29uIHBvaW50cz0iMzgyIDE3Mi43MiAzMzkuMjkgMTMwLjAxIDI1NiAyMTMuMjkgMTcyLjcyIDEzMC4wMSAxMzAuMDEgMTcyLjcyIDIxMy4yOSAyNTYgMTMwLjAxIDMzOS4yOCAxNzIuNzIgMzgyIDI1NiAyOTguNzEgMzM5LjI5IDM4MS45OSAzODIgMzM5LjI4IDI5OC43MSAyNTYgMzgyIDE3Mi43MiIgZmlsbD0iIzViNWI1ZiIvPjwvc3ZnPg==", alt: "delete tag", class: "icon delete", onClick: withModifiers(() => e3.addOrRemoveOption(e3.$event, l3), ["prevent", "stop"]) }, null, 8, ["onClick"])])]), _: 1 }, 8, ["modelValue", "collapse-tags", "onClick"]), createVNode("span", { class: ["icon arrow-downward", { active: e3.isFocusing }], onClick: l2[2] || (l2[2] = (...l3) => e3.toggle && e3.toggle(...l3)), onMousedown: l2[3] || (l2[3] = withModifiers(() => {
  }, ["prevent", "stop"])) }, null, 34)], 64)) : (openBlock(), createBlock(Fragment, { key: 2 }, [e3.searchable ? (openBlock(), createBlock(m4, { key: 0, ref: "input", modelValue: e3.searchingInputValue, "onUpdate:modelValue": l2[4] || (l2[4] = (l3) => e3.searchingInputValue = l3), disabled: e3.disabled, placeholder: e3.isFocusing ? e3.searchPlaceholder : e3.innerPlaceholder, onInput: e3.handleInputForInput, onChange: e3.handleChangeForInput, onFocus: e3.handleFocusForInput, onBlur: e3.handleBlurForInput, onEscape: e3.blur, autofocus: e3.autofocus || e3.taggable && e3.searchable, tabindex: e3.tabindex }, null, 8, ["modelValue", "disabled", "placeholder", "onInput", "onChange", "onFocus", "onBlur", "onEscape", "autofocus", "tabindex"])) : createCommentVNode("v-if", true), withDirectives(createVNode("span", j$1, [P$1, Z$1, W$1], 512), [[vShow, e3.loading]]), withDirectives(createVNode("span", { class: ["icon arrow-downward", { active: e3.isFocusing }], onClick: l2[5] || (l2[5] = (...l3) => e3.toggle && e3.toggle(...l3)), onMousedown: l2[6] || (l2[6] = withModifiers(() => {
  }, ["prevent", "stop"])) }, null, 34), [[vShow, false === e3.loading]])], 64))], 512), e3.multiple && e3.taggable && e3.searchable ? withDirectives((openBlock(), createBlock(m4, { key: 0, ref: "input", modelValue: e3.searchingInputValue, "onUpdate:modelValue": l2[7] || (l2[7] = (l3) => e3.searchingInputValue = l3), disabled: e3.disabled, placeholder: e3.searchPlaceholder, onInput: e3.handleInputForInput, onChange: e3.handleChangeForInput, onFocus: e3.handleFocusForInput, onBlur: e3.handleBlurForInput, onEscape: e3.blur, tabindex: e3.tabindex, autofocus: e3.autofocus || e3.taggable && e3.searchable }, { append: withCtx(() => [withDirectives(createVNode("span", q$1, [U$1, H$1, R$1], 512), [[vShow, e3.loading]])]), _: 1 }, 8, ["modelValue", "disabled", "placeholder", "onInput", "onChange", "onFocus", "onBlur", "onEscape", "tabindex", "autofocus"])), [[vShow, e3.isFocusing]]) : createCommentVNode("v-if", true), withDirectives(createVNode(y4, { modelValue: e3.optionsWithInfo, "onUpdate:modelValue": l2[8] || (l2[8] = (l3) => e3.optionsWithInfo = l3), onClick: e3.addOrRemoveOption, "header-height": e3.headerAndInputHeight }, { default: withCtx(({ option: l3 }) => [renderSlot(e3.$slots, "dropdown-item", { option: l3.originalOption }, () => [createVNode("span", null, toDisplayString(l3.label), 1)])]), _: 1 }, 8, ["modelValue", "onClick", "header-height"]), [[vShow, e3.isFocusing]])], 16, ["tabindex"]);
}, L$1.__file = "src/index.vue";
var index_min = "";
var Registration_vue_vue_type_style_index_0_lang = "";
const _sfc_main$F = {
  name: "Registration",
  setup(props) {
    const loadingStyles = ref(true);
    const name = ref(null);
    const email = ref("");
    const date = ref(null);
    const month = ref(null);
    const year = ref(null);
    const skipEmail = ref(false);
    const error = ref(false);
    const success = ref(false);
    const store2 = inject("store");
    const loading = ref(false);
    watch(skipEmail, (skipEmailValue) => {
      if (skipEmailValue) {
        email.value = "";
      }
    });
    const result2 = useQuery({
      query: REGISTRATION_STYLE,
      variables: {
        brandId: store2.state.token
      }
    });
    const headerColor = ref(null);
    const inputStyle = ref(null);
    const placeholderColor = ref(null);
    const primaryTheme = ref(null);
    const secondaryTheme = ref(null);
    const linkColor = ref(null);
    const inputColor = ref(null);
    const inputBackground = ref(null);
    const inputBackgroundColor = ref(null);
    const buttonText = ref(null);
    const buttonTheme = ref(null);
    const modalPrimaryColor = ref(null);
    const modalSecondaryColor = ref(null);
    watch(result2.fetching, (fetchStatus) => {
      if (!fetchStatus) {
        const style = JSON.parse(result2.data.value.brand.registrationStyle);
        headerColor.value = { color: `${style.header_color} !important` };
        inputStyle.value = { "--color": `${style.secondary_theme}` };
        placeholderColor.value = {
          "--placeholder-color": `${style.placeholder_color}`
        };
        primaryTheme.value = { "--themeColor": `${style.primary_theme}` };
        secondaryTheme.value = { "--subTheme": `${style.secondary_theme}` };
        linkColor.value = { color: `${style.link_color} !important` };
        inputColor.value = {
          color: `${style.input_color} !important`,
          "--inputColor": style.input_color
        };
        inputBackground.value = {
          background: `${style.input_background} !important`
        };
        inputBackgroundColor.value = { "--inputBackgroundColor": `${style.input_background}` };
        buttonText.value = { color: `${style.button_font} !important` };
        buttonTheme.value = { "--buttonFont": style.button_font };
        const div = document.getElementById("mulah-app");
        div.style.cssText += `background-color: ${style.main_background} !important;`;
        document.body.style.setProperty("background", style.main_background, "important");
        modalPrimaryColor.value = style.button_font;
        modalSecondaryColor.value = style.primary_theme;
        document.body.style.setProperty(
          "background",
          style.main_background,
          "important"
        );
        loadingStyles.value = false;
      }
    });
    const { executeMutation: registerCustomerInfo } = useMutation(
      REGISTER_CUSTOMER_INFO
    );
    const { executeMutation: createProspectMutation } = useMutation(
      CREATE_EMBEDDED_PROSPECT
    );
    const validEmail = computed(() => {
      return email.value ? email.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) != "" : false;
    });
    const validName = computed(() => {
      return name.value ? name.value != null : false;
    });
    const validBirthday = computed(() => {
      return date.value && month.value && year.value ? date.value && month.value && year.value != null : false;
    });
    function showWarningName() {
      return validName.value ? false : true;
    }
    function showWarningBirthday() {
      return validBirthday.value ? false : true;
    }
    function showWarning() {
      return skipEmail.value || validEmail.value ? false : true;
    }
    function closeModal() {
      error.value = false;
    }
    function continueModal() {
      props.changePath("history");
    }
    function dayRange() {
      const currentDay = 31;
      const days = [];
      let startDate = 1;
      while (startDate <= currentDay) {
        days.push({
          label: String(startDate).padStart(2, "0"),
          value: startDate
        });
        startDate++;
      }
      return days;
    }
    function monthRange() {
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
    }
    function yearRange() {
      let currentYear = new Date().getFullYear();
      const years = [];
      const startYear = currentYear - 100;
      while (startYear <= currentYear) {
        years.push(currentYear--);
      }
      return years;
    }
    function register() {
      if (loading.value)
        return;
      loading.value = true;
      const requiredFields = name.value && date.value && month.value && year.value;
      let valid;
      if (skipEmail.value) {
        valid = requiredFields;
      } else {
        valid = requiredFields && validEmail.value;
      }
      const phoneNumber = getDbNumber(store2.state.phoneNumber);
      if (valid) {
        const args = {
          name: name.value,
          email: email.value,
          birthdate: `${year.value}-${month.value}-${date.value}`,
          phoneNumber
        };
        registerCustomerInfo(args).then(() => {
          createProspectMutation({
            id: store2.state.token,
            phoneNumber
          });
          success.value = true;
        });
      } else {
        loading.value = false;
        error.value = true;
      }
    }
    return {
      allowSkipEmail: store2.state.allowSkipEmail,
      date,
      month,
      year,
      skipEmail,
      name,
      email,
      error,
      registerCustomerInfo,
      success,
      validEmail,
      closeModal,
      continueModal,
      showWarning,
      dayRange,
      monthRange,
      yearRange,
      register,
      headerColor,
      inputStyle,
      inputBackground,
      inputBackgroundColor,
      placeholderColor,
      primaryTheme,
      secondaryTheme,
      modalSecondaryColor,
      modalPrimaryColor,
      linkColor,
      inputColor,
      buttonText,
      buttonTheme,
      showWarningName,
      showWarningBirthday,
      fetching: result2.fetching,
      loadingStyles
    };
  },
  props: {
    changePath: Function
  },
  components: {
    VueNextSelect: L$1,
    ErrorModal,
    SuccessModal,
    Spinner
  }
};
const _hoisted_1$E = {
  key: 0,
  class: "spinner-container"
};
const _hoisted_2$C = { class: "spinner-inner" };
const _hoisted_3$y = { key: 1 };
const _hoisted_4$t = {
  key: 0,
  class: "mulah-registration"
};
const _hoisted_5$t = { class: "mulah-registration__content" };
const _hoisted_6$o = { class: "mulah-registration__welcome" };
const _hoisted_7$l = { class: "mulah-registration__input" };
const _hoisted_8$j = { class: "mulah-registration__input__container" };
const _hoisted_9$g = {
  key: 0,
  class: "mulah-registration__validation"
};
const _hoisted_10$e = /* @__PURE__ */ createVNode("p", null, "*Please insert a name.", -1);
const _hoisted_11$e = { class: "mulah-registration__input__container" };
const _hoisted_12$d = { class: "mulah-registration__input__bday" };
const _hoisted_13$8 = {
  key: 0,
  class: "mulah-registration__validation"
};
const _hoisted_14$8 = /* @__PURE__ */ createVNode("p", null, "*Please insert your birthday.", -1);
const _hoisted_15$6 = { class: "mulah-registration__input__container" };
const _hoisted_16$6 = { key: 2 };
const _hoisted_17$6 = {
  key: 3,
  class: "mulah-registration__validation"
};
const _hoisted_18$6 = /* @__PURE__ */ createVNode("p", null, "*Please insert a valid email address.", -1);
const _hoisted_19$5 = /* @__PURE__ */ createVNode("span", null, "No email address", -1);
const _hoisted_20$5 = { class: "mulah-registration__button" };
const _hoisted_21$5 = { class: "mulah-registration__footer" };
const _hoisted_22$4 = /* @__PURE__ */ createVNode("hr", null, null, -1);
const _hoisted_23$4 = /* @__PURE__ */ createTextVNode(" Powered by ");
function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Spinner = resolveComponent("Spinner");
  const _component_VueNextSelect = resolveComponent("VueNextSelect");
  const _component_ErrorModal = resolveComponent("ErrorModal");
  const _component_SuccessModal = resolveComponent("SuccessModal");
  return $setup.loadingStyles ? (openBlock(), createBlock("div", _hoisted_1$E, [
    createVNode("div", _hoisted_2$C, [
      createVNode(_component_Spinner)
    ])
  ])) : (openBlock(), createBlock("div", _hoisted_3$y, [
    !$setup.fetching ? (openBlock(), createBlock("div", _hoisted_4$t, [
      createVNode("div", _hoisted_5$t, [
        createVNode("div", _hoisted_6$o, [
          createVNode("p", { style: $setup.headerColor }, "Registration", 4),
          createVNode("p", { style: $setup.headerColor }, "Please fill up your details.", 4)
        ]),
        createVNode("div", _hoisted_7$l, [
          createVNode("div", _hoisted_8$j, [
            createVNode("p", { style: $setup.headerColor }, "Name", 4),
            withDirectives(createVNode("input", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.name = $event),
              type: "text",
              placeholder: "Enter Name",
              style: {
                ...$setup.inputBackground,
                ...$setup.inputStyle,
                ...$setup.placeholderColor,
                ...$setup.inputColor
              }
            }, null, 4), [
              [vModelText, $setup.name]
            ]),
            $setup.showWarningName() ? (openBlock(), createBlock("div", _hoisted_9$g, [
              _hoisted_10$e
            ])) : createCommentVNode("", true)
          ]),
          createVNode("div", _hoisted_11$e, [
            createVNode("p", { style: $setup.headerColor }, "Birthday", 4),
            createVNode("div", _hoisted_12$d, [
              createVNode("div", {
                class: "mulah-day-container",
                style: {
                  ...$setup.inputBackground,
                  ...$setup.inputBackgroundColor,
                  ...$setup.inputStyle,
                  ...$setup.placeholderColor,
                  ...$setup.primaryTheme,
                  ...$setup.secondaryTheme,
                  ...$setup.inputColor,
                  ...$setup.buttonTheme
                }
              }, [
                createVNode(_component_VueNextSelect, {
                  modelValue: $setup.date,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.date = $event),
                  "close-on-select": true,
                  options: $setup.dayRange(),
                  "label-by": "label",
                  "value-by": "value",
                  placeholder: "DD"
                }, null, 8, ["modelValue", "options"])
              ], 4),
              createVNode("div", {
                class: "mulah-month-container",
                style: {
                  ...$setup.inputBackground,
                  ...$setup.inputBackgroundColor,
                  ...$setup.inputStyle,
                  ...$setup.placeholderColor,
                  ...$setup.primaryTheme,
                  ...$setup.secondaryTheme,
                  ...$setup.inputColor,
                  ...$setup.buttonTheme
                }
              }, [
                createVNode(_component_VueNextSelect, {
                  modelValue: $setup.month,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.month = $event),
                  "close-on-select": true,
                  options: $setup.monthRange(),
                  placeholder: "MM"
                }, null, 8, ["modelValue", "options"])
              ], 4),
              createVNode("div", {
                class: "mulah-year-container",
                style: {
                  ...$setup.inputBackground,
                  ...$setup.inputBackgroundColor,
                  ...$setup.inputStyle,
                  ...$setup.placeholderColor,
                  ...$setup.primaryTheme,
                  ...$setup.secondaryTheme,
                  ...$setup.inputColor,
                  ...$setup.buttonTheme
                }
              }, [
                createVNode(_component_VueNextSelect, {
                  modelValue: $setup.year,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.year = $event),
                  "close-on-select": true,
                  options: $setup.yearRange(),
                  placeholder: "YYYY"
                }, null, 8, ["modelValue", "options"])
              ], 4)
            ]),
            $setup.showWarningBirthday() ? (openBlock(), createBlock("div", _hoisted_13$8, [
              _hoisted_14$8
            ])) : createCommentVNode("", true)
          ]),
          createVNode("div", _hoisted_15$6, [
            createVNode("p", { style: $setup.headerColor }, "Email", 4),
            !$setup.skipEmail ? withDirectives((openBlock(), createBlock("input", {
              key: 0,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.email = $event),
              type: "email",
              placeholder: "Email Address",
              class: "mulah-registration__input-email",
              style: {
                ...$setup.inputBackground,
                ...$setup.inputStyle,
                ...$setup.placeholderColor,
                ...$setup.inputColor
              }
            }, null, 4)), [
              [vModelText, $setup.email]
            ]) : withDirectives((openBlock(), createBlock("input", {
              key: 1,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.email = $event),
              type: "email",
              placeholder: "Email Address",
              disabled: $setup.skipEmail,
              class: "mulah-registration__input-email",
              style: { ...$setup.inputStyle, ...$setup.placeholderColor }
            }, null, 12, ["disabled"])), [
              [vModelText, $setup.email]
            ]),
            $setup.allowSkipEmail ? (openBlock(), createBlock("label", _hoisted_16$6)) : createCommentVNode("", true),
            $setup.showWarning() ? (openBlock(), createBlock("div", _hoisted_17$6, [
              _hoisted_18$6
            ])) : createCommentVNode("", true),
            createVNode("label", {
              class: "mulah-pure-material-checkbox",
              style: $setup.placeholderColor
            }, [
              withDirectives(createVNode("input", {
                type: "checkbox",
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.skipEmail = $event)
              }, null, 512), [
                [vModelCheckbox, $setup.skipEmail]
              ]),
              _hoisted_19$5
            ], 4)
          ])
        ]),
        createVNode("div", _hoisted_20$5, [
          createVNode("button", {
            onClick: _cache[8] || (_cache[8] = (...args) => $setup.register && $setup.register(...args)),
            style: { ...$setup.primaryTheme, ...$setup.buttonText }
          }, " Continue ", 4)
        ])
      ]),
      createVNode("div", _hoisted_21$5, [
        _hoisted_22$4,
        createVNode("h6", null, [
          _hoisted_23$4,
          createVNode("a", {
            class: "mulah-link-blue",
            style: { ...$setup.linkColor }
          }, "MulahRewards.com", 4)
        ])
      ]),
      $setup.error ? (openBlock(), createBlock(_component_ErrorModal, {
        key: 0,
        "close-modal": $setup.closeModal,
        specification: "registration",
        modalPrimaryColor: $setup.modalPrimaryColor,
        modalSecondaryColor: $setup.modalSecondaryColor
      }, null, 8, ["close-modal", "modalPrimaryColor", "modalSecondaryColor"])) : createCommentVNode("", true),
      $setup.success ? (openBlock(), createBlock(_component_SuccessModal, {
        key: 1,
        "close-modal": $setup.continueModal,
        specification: "registration",
        modalPrimaryColor: $setup.modalPrimaryColor,
        modalSecondaryColor: $setup.modalSecondaryColor
      }, null, 8, ["close-modal", "modalPrimaryColor", "modalSecondaryColor"])) : createCommentVNode("", true)
    ])) : createCommentVNode("", true)
  ]));
}
var Registration = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$F]]);
const _sfc_main$E = {
  name: "DeliverySvg",
  props: {
    color: String,
    size: Number
  }
};
const _hoisted_1$D = /* @__PURE__ */ createVNode("title", null, "Delivery", -1);
const _hoisted_2$B = /* @__PURE__ */ createVNode("path", {
  d: "M87.29,20.53a6.32,6.32,0,0,0,5.79,4.65,3.52,3.52,0,0,0,3.5-4.65,6.35,6.35,0,0,0-5.8-4.65A3.51,3.51,0,0,0,87.29,20.53Zm2.16,0a1.87,1.87,0,0,1,1.87-2.48,3.39,3.39,0,0,1,3.1,2.48A1.89,1.89,0,0,1,92.55,23,3.4,3.4,0,0,1,89.45,20.53Z",
  transform: "translate(-87.14 -4.05)"
}, null, -1);
const _hoisted_3$x = /* @__PURE__ */ createVNode("path", {
  d: "M108.77,21.64A3.35,3.35,0,0,0,111.33,23a1.83,1.83,0,0,0,1.88-1.38h2.29a3.43,3.43,0,0,1-3.63,3.54,6.35,6.35,0,0,1-5.39-3.54Z",
  transform: "translate(-87.14 -4.05)"
}, null, -1);
const _hoisted_4$s = /* @__PURE__ */ createVNode("path", {
  d: "M112.67,9.41l.31,1.27h4.34a.56.56,0,0,1,0,1.11h-4.06l.32,1.32h3a.55.55,0,0,1,.55.55.55.55,0,0,1-.55.55h-2.71l.42,1.67h1.4a.56.56,0,1,1,0,1.11h-1.13l.5,2h-12.2l-2.38-9.6Z",
  transform: "translate(-87.14 -4.05)"
}, null, -1);
const _hoisted_5$s = /* @__PURE__ */ createVNode("polygon", { points: "12.58 4.56 25.86 4.56 25.25 2.1 11.97 2.1 12.58 4.56" }, null, -1);
const _hoisted_6$n = /* @__PURE__ */ createVNode("path", {
  d: "M92.84,15.82a6.45,6.45,0,0,0-1.37-.37L92,4.52a.48.48,0,0,1,.52-.47h4a.89.89,0,0,1,.83.66.5.5,0,0,1-.5.66H93.32L93,12l7.72,7.92H117a.89.89,0,0,1,.82.66.5.5,0,0,1-.49.67H100.73a.89.89,0,0,1-.61-.28l-7.18-7.36Z",
  transform: "translate(-87.14 -4.05)"
}, null, -1);
function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
    `,
    id: "Layer_4",
    "data-name": "Layer 4",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 30.73 21.13"
  }, [
    _hoisted_1$D,
    _hoisted_2$B,
    _hoisted_3$x,
    _hoisted_4$s,
    _hoisted_5$s,
    _hoisted_6$n
  ], 4);
}
var Delivery = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$E]]);
const _sfc_main$D = {
  props: {
    size: Number,
    color: String
  },
  name: "GiftSvg"
};
const _hoisted_1$C = /* @__PURE__ */ createVNode("title", null, "Gift-02", -1);
const _hoisted_2$A = /* @__PURE__ */ createVNode("path", {
  d: "M99.38,260.54H73V219.18H99.38Zm6-41.36v41.36h26.36V219.18Zm-6.25-15H69.68v12H99.14Zm6.48,0v12h29.47v-12ZM104.37,200a2.44,2.44,0,0,0,1.45.91l.26,0h2c1.38,0,2.76-.06,4.15-.16a48,48,0,0,0,8.31-1.3,29.81,29.81,0,0,0,4.12-1.39,18,18,0,0,0,4-2.32,10.68,10.68,0,0,0,1.86-1.83,8,8,0,0,0,1.41-2.66,6.59,6.59,0,0,0,.13-3.36,7.93,7.93,0,0,0-1.26-2.82,11.23,11.23,0,0,0-1.8-2,11.46,11.46,0,0,0-2.12-1.51,10.51,10.51,0,0,0-5.2-1.3,12.68,12.68,0,0,0-4.87,1.09,17.33,17.33,0,0,0-3.95,2.37,26.18,26.18,0,0,0-5.8,6.48,24.18,24.18,0,0,0-2,3.8,15,15,0,0,0-1.17,4.2v0A2.28,2.28,0,0,0,104.37,200Zm1.52-1.38a15.79,15.79,0,0,1,3.71-6.45,22.7,22.7,0,0,1,5.79-4.66,11.69,11.69,0,0,1,6.21-1.73,5.73,5.73,0,0,1,2.52.78,6.58,6.58,0,0,1,1.14.85,7.29,7.29,0,0,1,.9,1,2.65,2.65,0,0,1,.42.82,1.37,1.37,0,0,1,0,.64,4.3,4.3,0,0,1-1.33,2,21.71,21.71,0,0,1-6.08,3.75,40.39,40.39,0,0,1-7.39,2.39,38.85,38.85,0,0,1-3.88.68l-1,.11-.79.08a.32.32,0,0,1-.25-.08.14.14,0,0,1,0-.16Zm-3.72-.33v0A15,15,0,0,0,101,194a25,25,0,0,0-2-3.8,26.22,26.22,0,0,0-5.81-6.48,16.91,16.91,0,0,0-4-2.37,12.63,12.63,0,0,0-4.86-1.09,10.51,10.51,0,0,0-5.2,1.3,11.46,11.46,0,0,0-2.12,1.51,10.86,10.86,0,0,0-1.8,2A7.59,7.59,0,0,0,74,187.92a6.59,6.59,0,0,0,.13,3.36,7.83,7.83,0,0,0,1.41,2.66,10,10,0,0,0,1.86,1.83,18,18,0,0,0,4,2.32,29.37,29.37,0,0,0,4.12,1.39,48,48,0,0,0,8.31,1.3c1.39.1,2.77.15,4.15.16h2l.26,0a2.5,2.5,0,0,0,1.45-.91A2.28,2.28,0,0,0,102.17,198.25Zm-2,.33c0,.06,0,.1,0,.16a.32.32,0,0,1-.25.08l-.79-.08-1-.11a39,39,0,0,1-3.89-.68,40.54,40.54,0,0,1-7.38-2.39,21.57,21.57,0,0,1-6.08-3.75,4.42,4.42,0,0,1-1.34-2,1.7,1.7,0,0,1,0-.64,3.18,3.18,0,0,1,.42-.82,7.4,7.4,0,0,1,.91-1,6.22,6.22,0,0,1,1.14-.85,5.69,5.69,0,0,1,2.52-.78,11.69,11.69,0,0,1,6.21,1.73,22.88,22.88,0,0,1,5.79,4.66,15.79,15.79,0,0,1,3.71,6.45Z",
  transform: "translate(-69.68 -180.29)"
}, null, -1);
function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
      `,
    id: "Layer_2",
    "data-name": "Layer 2",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 65.41 80.25"
  }, [
    _hoisted_1$C,
    _hoisted_2$A
  ], 4);
}
var Gift = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$D]]);
const _sfc_main$C = {
  props: {
    size: Number,
    color: String
  },
  name: "PromotionSvg"
};
const _hoisted_1$B = /* @__PURE__ */ createVNode("title", null, "Promotion", -1);
const _hoisted_2$z = /* @__PURE__ */ createVNode("path", {
  d: "M42.18,38.88A1.35,1.35,0,1,0,44,39.4,1.35,1.35,0,0,0,42.18,38.88Z",
  transform: "translate(-29.67 -33.24)"
}, null, -1);
const _hoisted_3$w = /* @__PURE__ */ createVNode("path", {
  d: "M40.38,33.24A10.71,10.71,0,1,0,51.08,44,10.72,10.72,0,0,0,40.38,33.24Zm.07,18.32L35.12,50a1.34,1.34,0,0,1-.92-1.66l2-7.16a3.78,3.78,0,0,1,1.55-1.95l-2.66,9.32a.45.45,0,0,0,.3.55L42,51A1.35,1.35,0,0,1,40.45,51.56Zm6.06-9.38-2,7.16a1.36,1.36,0,0,1-1.67.92l-5.33-1.53a1.34,1.34,0,0,1-.92-1.66l2-7.16A3.76,3.76,0,0,1,40.14,38l2.74-1.53a1.36,1.36,0,0,1,1.83.53l1.52,2.74A3.69,3.69,0,0,1,46.51,42.18Z",
  transform: "translate(-29.67 -33.24)"
}, null, -1);
function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
    `,
    id: "Layer_5",
    "data-name": "Layer 5",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 21.4 21.4"
  }, [
    _hoisted_1$B,
    _hoisted_2$z,
    _hoisted_3$w
  ], 4);
}
var Promotion = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$C]]);
const _sfc_main$B = {
  props: {
    size: Number,
    color: String
  },
  name: "WebsiteSvg"
};
const _hoisted_1$A = /* @__PURE__ */ createVNode("title", null, "Website", -1);
const _hoisted_2$y = /* @__PURE__ */ createVNode("path", {
  d: "M587.79,428.54c-1.42,0-4.1,4.57-4.42,13h8.84C591.89,433.11,589.21,428.54,587.79,428.54Z",
  transform: "translate(-571.52 -427.33)"
}, null, -1);
const _hoisted_3$v = /* @__PURE__ */ createVNode("path", {
  d: "M583.37,444.89c.32,8.43,3,13,4.42,13s4.1-4.57,4.42-13Z",
  transform: "translate(-571.52 -427.33)"
}, null, -1);
const _hoisted_4$r = /* @__PURE__ */ createVNode("path", {
  d: "M595.57,441.53h8.49a16.36,16.36,0,0,0-12.36-14.2C594.05,430.26,595.36,435.8,595.57,441.53Z",
  transform: "translate(-571.52 -427.33)"
}, null, -1);
const _hoisted_5$r = /* @__PURE__ */ createVNode("path", {
  d: "M580,441.53c.21-5.73,1.52-11.27,3.87-14.2a16.36,16.36,0,0,0-12.36,14.2Z",
  transform: "translate(-571.52 -427.33)"
}, null, -1);
const _hoisted_6$m = /* @__PURE__ */ createVNode("path", {
  d: "M595.57,444.89c-.21,5.73-1.52,11.28-3.87,14.21a16.38,16.38,0,0,0,12.36-14.21Z",
  transform: "translate(-571.52 -427.33)"
}, null, -1);
const _hoisted_7$k = /* @__PURE__ */ createVNode("path", {
  d: "M580,444.89h-8.49a16.38,16.38,0,0,0,12.36,14.21C581.53,456.17,580.22,450.62,580,444.89Z",
  transform: "translate(-571.52 -427.33)"
}, null, -1);
function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
    `,
    id: "Layer_3",
    "data-name": "Layer 3",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32.54 31.77"
  }, [
    _hoisted_1$A,
    _hoisted_2$y,
    _hoisted_3$v,
    _hoisted_4$r,
    _hoisted_5$r,
    _hoisted_6$m,
    _hoisted_7$k
  ], 4);
}
var Website = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$B]]);
const _sfc_main$A = {
  props: {
    size: Number,
    color: String
  },
  name: "TncSvg"
};
const _hoisted_1$z = /* @__PURE__ */ createVNode("title", null, "TnC", -1);
const _hoisted_2$x = /* @__PURE__ */ createVNode("path", {
  d: "M2807.18,321.46l-.17-78.58h90.52v234H2728.61V321.42Zm-90.49-4V488.82h192.75V231H2803.92Z",
  transform: "translate(-2716.69 -230.97)"
}, null, -1);
const _hoisted_3$u = /* @__PURE__ */ createVNode("rect", {
  x: "2745.63",
  y: "348.53",
  width: "130.63",
  height: "10.42",
  transform: "translate(2905.19 476.51) rotate(180)"
}, null, -1);
const _hoisted_4$q = /* @__PURE__ */ createVNode("rect", {
  x: "2745.63",
  y: "389.9",
  width: "130.63",
  height: "10.42",
  transform: "translate(2905.19 559.25) rotate(180)"
}, null, -1);
const _hoisted_5$q = /* @__PURE__ */ createVNode("rect", {
  x: "2745.63",
  y: "431.46",
  width: "130.63",
  height: "10.42",
  transform: "translate(2905.19 642.38) rotate(180)"
}, null, -1);
function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px!important;
    `,
    id: "Layer_6",
    "data-name": "Layer 6",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 192.75 257.85"
  }, [
    _hoisted_1$z,
    _hoisted_2$x,
    _hoisted_3$u,
    _hoisted_4$q,
    _hoisted_5$q
  ], 4);
}
var Tnc$1 = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$A]]);
var ArrowRight_vue_vue_type_style_index_0_lang = "";
const _sfc_main$z = {
  name: "ArrowRightSvg",
  props: {
    color: String,
    size: Number
  }
};
const _hoisted_1$y = /* @__PURE__ */ createVNode("path", {
  class: "cls-1",
  d: "M0.98,64.99L33.464,32.5,0.98,0.01H28.534L61.02,32.5,28.534,64.99H0.98Z"
}, null, -1);
function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
    `,
    id: "Layer_7",
    "data-name": "Layer 7",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 62 65"
  }, [
    _hoisted_1$y
  ], 4);
}
var ArrowRight = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$z]]);
const _sfc_main$y = {
  name: "PersonalInfoSvg",
  props: {
    size: Number,
    color: String
  }
};
const _hoisted_1$x = /* @__PURE__ */ createVNode("title", null, "Icon_PersonalInfo", -1);
const _hoisted_2$w = /* @__PURE__ */ createVNode("path", {
  d: "M2983.24,3369.25c0,1,0,1.94-.08,2.89s-.12,1.92-.21,2.86c-.15,1.42-.34,2.83-.59,4.21s-.61,3-1,4.47a57.06,57.06,0,0,1-2.86,8.19c-.17.37-.34.75-.52,1.12-.61,1.31-1.26,2.6-2,3.85l-.65,1.12a56.77,56.77,0,0,1-9.56,12l-1.08,1c-.62.56-1.25,1.11-1.89,1.64-.42.35-.85.7-1.28,1-1,.75-1.94,1.47-2.94,2.15l-.44.29c-1.33.89-2.69,1.72-4.1,2.5-1.26.7-2.56,1.35-3.89,2l-.24.11a55.43,55.43,0,0,1-8.17,2.92c-.59.16-1.19.32-1.79.46a56.85,56.85,0,0,1-8.71,1.36c-1,.07-1.92.12-2.88.14-.49,0-1,0-1.46,0s-1,0-1.45,0c-1,0-1.92-.07-2.88-.14a56.66,56.66,0,0,1-8.71-1.36c-.6-.14-1.2-.3-1.8-.46a55.84,55.84,0,0,1-8.17-2.92l-.24-.11c-1.18-.54-2.34-1.11-3.48-1.73-1.55-.84-3.05-1.74-4.51-2.72l-.43-.29c-1-.68-2-1.4-2.94-2.15-.43-.33-.86-.68-1.28-1-.65-.53-1.28-1.08-1.9-1.64s-1.36-1.26-2-1.91a56.28,56.28,0,0,1-8.62-11.1c-.23-.37-.44-.74-.65-1.12-.71-1.25-1.37-2.54-2-3.85l-.51-1.12a55.86,55.86,0,0,1-2.86-8.19q-.58-2.2-1-4.47c-.25-1.38-.45-2.79-.59-4.21-.1-.94-.17-1.89-.22-2.86s-.07-1.92-.07-2.89-.41-1.94-.35-2.9c0-.59-.31-1.17-.31-1.76h0c0-.36.49-.73.52-1.09s.3-.71.34-1.06c.12-1.06.39-2.11.57-3.15.27-1.51.66-3,1-4.46a54.43,54.43,0,0,1,2.89-8.19c.08-.19.18-.38.26-.57s.18-.37.27-.56c.6-1.31,1.27-2.59,2-3.85l.65-1.12a56.75,56.75,0,0,1,9.57-12c.35-.34.71-.67,1.07-1,.62-.56,1.25-1.1,1.9-1.64.42-.35.85-.69,1.28-1,1-.74,1.93-1.46,2.94-2.14l.43-.3a56.6,56.6,0,0,1,8-4.45l.24-.1a55.88,55.88,0,0,1,8.17-2.93l1.8-.46a55.46,55.46,0,0,1,8.71-1.35c1-.07,1.91-.13,2.88-.15l1.45,0,1.46,0c1,0,1.92.08,2.88.15a55.64,55.64,0,0,1,8.71,1.35l1.79.46a55.46,55.46,0,0,1,8.17,2.93l.24.1a55.5,55.5,0,0,1,8,4.45l.44.3c1,.68,2,1.4,2.94,2.14.43.34.86.68,1.28,1,.64.54,1.27,1.08,1.89,1.64l1.06,1a56.54,56.54,0,0,1,9.58,12l.65,1.12c.71,1.26,1.36,2.54,2,3.85.18.38.35.75.52,1.13a56.63,56.63,0,0,1,2.86,8.19c.38,1.46.72,2.95,1,4.46s.44,2.79.59,4.21l.12,1.33c0,.51.07,1,.09,1.53C2983.21,3367.31,2983.24,3368.28,2983.24,3369.25Z",
  transform: "translate(-2832.98 -3312.95)"
}, null, -1);
const _hoisted_3$t = /* @__PURE__ */ createVNode("path", {
  d: "M2870.83,3364.56l0,0h0Zm-1-.51.15.08a5.41,5.41,0,0,0,.87.43l-.19-.11C2870.39,3364.31,2870.07,3364.18,2869.81,3364.05Z",
  transform: "translate(-2832.98 -3312.95)"
}, null, -1);
const _hoisted_4$p = /* @__PURE__ */ createVNode("path", {
  d: "M2869.81,3364.05c.26.13.58.26.83.4-.2-.11-.45-.22-.68-.32Z",
  transform: "translate(-2832.98 -3312.95)"
}, null, -1);
const _hoisted_5$p = /* @__PURE__ */ createVNode("path", {
  d: "M2870.87,3364.58h0l0,0Z",
  transform: "translate(-2832.98 -3312.95)"
}, null, -1);
const _hoisted_6$l = /* @__PURE__ */ createVNode("path", {
  d: "M3020.33,3479.42v58.29c0,1.2-.28,2.24-1.43,2.24H2835c-1.14,0-1.81-1-1.81-2.24v-58.29c0-.94-.23-1.87-.18-2.8a56.86,56.86,0,0,1,14.82-35.92c.26-.27.46-.55.72-.82a54.33,54.33,0,0,1,15-11.07l1-.49c1.54-.72,3.11-1.37,4.73-1.94l1.07-.37c1.45-.48,2.92-.89,4.42-1.24a74.56,74.56,0,0,0,5.71,5,77.66,77.66,0,0,0,16.43,9.85q1.65.74,3.33,1.38a73.21,73.21,0,0,0,26.69,5,73.41,73.41,0,0,0,15.32-1.91c.62-.13,1.25-.73,1.87-.73h2.79c2.43,0,4.83-1.55,7.2-2.49.94-.37,1.88-.61,2.81-1a62.83,62.83,0,0,0,13-7.22h0c.45,0,.9-.81,1.34-1.14a80.33,80.33,0,0,0,7.66-6.57c23.08,5.38,40.36,26.42,41.56,51.82C3020.45,3477.59,3020.33,3478.48,3020.33,3479.42Z",
  transform: "translate(-2832.98 -3312.95)"
}, null, -1);
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
    `,
    id: "Layer_1",
    "data-name": "Layer 1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 187.43 227"
  }, [
    _hoisted_1$x,
    _hoisted_2$w,
    _hoisted_3$t,
    _hoisted_4$p,
    _hoisted_5$p,
    _hoisted_6$l
  ], 4);
}
var PersonalInfo$1 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$y]]);
const _sfc_main$x = {
  name: "SmsRewardSvg",
  props: {
    size: Number,
    color: String
  }
};
const _hoisted_1$w = /* @__PURE__ */ createVNode("title", null, "SMSRewards", -1);
const _hoisted_2$v = /* @__PURE__ */ createVNode("path", {
  d: "M283,452.08l-8.46-7.4-24.19,20.74a5,5,0,0,0,3.37,1.32h58.56a5,5,0,0,0,3.36-1.32l-24.18-20.74Z",
  transform: "translate(-248.8 -417.89)"
}, null, -1);
const _hoisted_3$s = /* @__PURE__ */ createVNode("path", {
  d: "M315.65,419.21a4.91,4.91,0,0,0-3.37-1.32H253.72a4.87,4.87,0,0,0-3.36,1.33l32.64,28Z",
  transform: "translate(-248.8 -417.89)"
}, null, -1);
const _hoisted_4$o = /* @__PURE__ */ createVNode("polygon", { points: "0 4.29 0 44.88 23.61 24.81 0 4.29" }, null, -1);
const _hoisted_5$o = /* @__PURE__ */ createVNode("polygon", { points: "44.78 24.81 68.39 44.88 68.39 4.28 44.78 24.81" }, null, -1);
function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
    `,
    id: "OBJECTS",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 68.39 48.85"
  }, [
    _hoisted_1$w,
    _hoisted_2$v,
    _hoisted_3$s,
    _hoisted_4$o,
    _hoisted_5$o
  ], 4);
}
var SmsRewards$1 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$x]]);
var OverviewMain_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$w = {
  name: "OverviewMain",
  setup(props) {
    const store2 = inject("store");
    const { executeMutation: createUrlClick } = useMutation(CREATE_URL_CLICK);
    function clickLink(specification) {
      createUrlClick({
        id: store2.state.token,
        phoneNumber: getDbNumber(store2.state.phoneNumber),
        specification
      });
      if (specification == "website") {
        window.open(props.brand.websiteUrl);
      } else if (specification == "promotion") {
        window.open(props.brand.promotionUrl);
      } else if (specification == "delivery") {
        window.open(props.brand.deliveryUrl);
      }
    }
    return {
      iconBackground: props.iconBackground,
      changeTab: props.changeTab,
      toTnc: props.toTnc,
      brand: props.brand,
      clickLink
    };
  },
  props: {
    iconBackground: String,
    changeTab: Function,
    toTnc: Function,
    brand: Object,
    styling: Object
  },
  components: {
    Delivery,
    Gift,
    Promotion,
    SmsRewards: SmsRewards$1,
    PersonalInfo: PersonalInfo$1,
    Tnc: Tnc$1,
    Website,
    ArrowRight
  }
};
const _withId$3 = /* @__PURE__ */ withScopeId("data-v-477e0fa0");
pushScopeId("data-v-477e0fa0");
const _hoisted_1$v = /* @__PURE__ */ createVNode("a", { href: "#" }, "Website", -1);
const _hoisted_2$u = { class: "arrow_positions" };
const _hoisted_3$r = /* @__PURE__ */ createVNode("hr", null, null, -1);
const _hoisted_4$n = /* @__PURE__ */ createVNode("a", { href: "#" }, "Delivery", -1);
const _hoisted_5$n = { class: "arrow_positions" };
const _hoisted_6$k = /* @__PURE__ */ createVNode("hr", null, null, -1);
const _hoisted_7$j = /* @__PURE__ */ createVNode("p", null, "Membership Rewards", -1);
const _hoisted_8$i = { class: "arrow_positions" };
const _hoisted_9$f = /* @__PURE__ */ createVNode("hr", null, null, -1);
const _hoisted_10$d = /* @__PURE__ */ createVNode("p", null, "SMS Received", -1);
const _hoisted_11$d = { class: "arrow_positions" };
const _hoisted_12$c = /* @__PURE__ */ createVNode("hr", null, null, -1);
const _hoisted_13$7 = /* @__PURE__ */ createVNode("p", null, "Personal Info", -1);
const _hoisted_14$7 = { class: "arrow_positions" };
const _hoisted_15$5 = /* @__PURE__ */ createVNode("hr", null, null, -1);
const _hoisted_16$5 = /* @__PURE__ */ createVNode("a", { href: "#" }, "Promotion", -1);
const _hoisted_17$5 = { class: "arrow_positions" };
const _hoisted_18$5 = /* @__PURE__ */ createVNode("hr", null, null, -1);
const _hoisted_19$4 = /* @__PURE__ */ createVNode("p", null, "Terms and Conditions", -1);
const _hoisted_20$4 = { class: "arrow_positions" };
const _hoisted_21$4 = /* @__PURE__ */ createVNode("hr", null, null, -1);
popScopeId();
const _sfc_render$w = /* @__PURE__ */ _withId$3((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_Website = resolveComponent("Website");
  const _component_ArrowRight = resolveComponent("ArrowRight");
  const _component_Delivery = resolveComponent("Delivery");
  const _component_Gift = resolveComponent("Gift");
  const _component_SmsRewards = resolveComponent("SmsRewards");
  const _component_PersonalInfo = resolveComponent("PersonalInfo");
  const _component_Promotion = resolveComponent("Promotion");
  const _component_Tnc = resolveComponent("Tnc");
  return openBlock(), createBlock("div", null, [
    $props.brand.websiteUrl ? (openBlock(), createBlock(Fragment, { key: 0 }, [
      createVNode("div", {
        class: "mulah-overview__content__navigation",
        onClick: _cache[1] || (_cache[1] = () => $setup.clickLink("website"))
      }, [
        createVNode(_component_Website, {
          size: 30,
          color: $props.styling.icon_color
        }, null, 8, ["color"]),
        _hoisted_1$v,
        createVNode("div", _hoisted_2$u, [
          createVNode(_component_ArrowRight, {
            size: 15,
            color: $props.styling.icon_color
          }, null, 8, ["color"])
        ])
      ]),
      _hoisted_3$r
    ], 64)) : createCommentVNode("", true),
    $props.brand.deliveryUrl ? (openBlock(), createBlock(Fragment, { key: 1 }, [
      createVNode("div", {
        class: "mulah-overview__content__navigation",
        onClick: _cache[2] || (_cache[2] = () => $setup.clickLink("delivery"))
      }, [
        createVNode(_component_Delivery, {
          size: 30,
          color: $props.styling.icon_color
        }, null, 8, ["color"]),
        _hoisted_4$n,
        createVNode("div", _hoisted_5$n, [
          createVNode(_component_ArrowRight, {
            size: 15,
            color: $props.styling.icon_color
          }, null, 8, ["color"])
        ])
      ]),
      _hoisted_6$k
    ], 64)) : createCommentVNode("", true),
    createVNode("div", {
      class: "mulah-overview__content__navigation",
      onClick: _cache[3] || (_cache[3] = ($event) => $props.changeTab("rewards"))
    }, [
      createVNode(_component_Gift, {
        size: 30,
        color: $props.styling.icon_color
      }, null, 8, ["color"]),
      _hoisted_7$j,
      createVNode("div", _hoisted_8$i, [
        createVNode(_component_ArrowRight, {
          size: 15,
          color: $props.styling.icon_color
        }, null, 8, ["color"])
      ])
    ]),
    _hoisted_9$f,
    createVNode("div", {
      class: "mulah-overview__content__navigation",
      onClick: _cache[4] || (_cache[4] = ($event) => $props.changeTab("received"))
    }, [
      createVNode(_component_SmsRewards, {
        size: 30,
        color: $props.styling.icon_color
      }, null, 8, ["color"]),
      _hoisted_10$d,
      createVNode("div", _hoisted_11$d, [
        createVNode(_component_ArrowRight, {
          size: 15,
          color: $props.styling.icon_color
        }, null, 8, ["color"])
      ])
    ]),
    _hoisted_12$c,
    createVNode("div", {
      class: "mulah-overview__content__navigation",
      onClick: _cache[5] || (_cache[5] = ($event) => $props.changeTab("personal_info"))
    }, [
      createVNode(_component_PersonalInfo, {
        size: 30,
        color: $props.styling.icon_color
      }, null, 8, ["color"]),
      _hoisted_13$7,
      createVNode("div", _hoisted_14$7, [
        createVNode(_component_ArrowRight, {
          size: 15,
          color: $props.styling.icon_color
        }, null, 8, ["color"])
      ])
    ]),
    _hoisted_15$5,
    $props.brand.promotionUrl ? (openBlock(), createBlock(Fragment, { key: 2 }, [
      createVNode("div", {
        class: "mulah-overview__content__navigation",
        onClick: _cache[6] || (_cache[6] = () => $setup.clickLink("promotion"))
      }, [
        createVNode(_component_Promotion, {
          size: 30,
          color: $props.styling.icon_color
        }, null, 8, ["color"]),
        _hoisted_16$5,
        createVNode("div", _hoisted_17$5, [
          createVNode(_component_ArrowRight, {
            size: 15,
            color: $props.styling.icon_color
          }, null, 8, ["color"])
        ])
      ]),
      _hoisted_18$5
    ], 64)) : createCommentVNode("", true),
    createVNode("div", {
      class: "mulah-overview__content__navigation",
      onClick: _cache[7] || (_cache[7] = (...args) => $props.toTnc && $props.toTnc(...args))
    }, [
      createVNode(_component_Tnc, {
        size: 30,
        color: $props.styling.icon_color
      }, null, 8, ["color"]),
      _hoisted_19$4,
      createVNode("div", _hoisted_20$4, [
        createVNode(_component_ArrowRight, {
          size: 15,
          color: $props.styling.icon_color
        }, null, 8, ["color"])
      ])
    ]),
    _hoisted_21$4
  ]);
});
var OverviewMain = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$w], ["__scopeId", "data-v-477e0fa0"]]);
const _sfc_main$v = {
  props: {
    size: Number,
    color: String
  },
  name: "OutletRedemptionSvg"
};
const _hoisted_1$u = /* @__PURE__ */ createVNode("title", null, "Icon_Outlet", -1);
const _hoisted_2$t = /* @__PURE__ */ createVNode("path", {
  d: "M192.51,250.07h4.16a.67.67,0,0,0,.64-.44l4-10.25h-4.13l-5.23,9.68A.68.68,0,0,0,192.51,250.07Z",
  transform: "translate(-191.36 -239.38)"
}, null, -1);
const _hoisted_3$q = /* @__PURE__ */ createVNode("path", {
  d: "M204.08,250.07h3.77a.91.91,0,0,0,.91-.85l.76-9.84H205.4L203.18,249A.92.92,0,0,0,204.08,250.07Z",
  transform: "translate(-191.36 -239.38)"
}, null, -1);
const _hoisted_4$m = /* @__PURE__ */ createVNode("path", {
  d: "M215.45,250.07h3.48a1,1,0,0,0,1-1.29l-2.17-9.4h-4.13l.75,9.72A1,1,0,0,0,215.45,250.07Z",
  transform: "translate(-191.36 -239.38)"
}, null, -1);
const _hoisted_5$m = /* @__PURE__ */ createVNode("path", {
  d: "M226.93,250.07h3.4a.88.88,0,0,0,.78-1.3L226,239.38H221.9l3.81,9.85A1.3,1.3,0,0,0,226.93,250.07Z",
  transform: "translate(-191.36 -239.38)"
}, null, -1);
const _hoisted_6$j = /* @__PURE__ */ createVNode("path", {
  d: "M194.26,255.28a2.89,2.89,0,0,0,2.89-2.9v-.48a.62.62,0,0,0-.62-.62H192a.62.62,0,0,0-.62.62v.48A2.9,2.9,0,0,0,194.26,255.28Z",
  transform: "translate(-191.36 -239.38)"
}, null, -1);
const _hoisted_7$i = /* @__PURE__ */ createVNode("path", {
  d: "M205.81,255.28a2.9,2.9,0,0,0,2.9-2.9v-.31a.79.79,0,0,0-.79-.79h-4.21a.79.79,0,0,0-.79.79v.31A2.9,2.9,0,0,0,205.81,255.28Z",
  transform: "translate(-191.36 -239.38)"
}, null, -1);
const _hoisted_8$h = /* @__PURE__ */ createVNode("path", {
  d: "M215.25,251.28a.78.78,0,0,0-.78.79v.31a2.89,2.89,0,1,0,5.78,0v-.31a.78.78,0,0,0-.78-.79Z",
  transform: "translate(-191.36 -239.38)"
}, null, -1);
const _hoisted_9$e = /* @__PURE__ */ createVNode("path", {
  d: "M231,251.28H226.8a.79.79,0,0,0-.79.79v.31a2.9,2.9,0,0,0,2.9,2.9h0a2.9,2.9,0,0,0,2.89-2.9v-.31A.79.79,0,0,0,231,251.28Z",
  transform: "translate(-191.36 -239.38)"
}, null, -1);
const _hoisted_10$c = /* @__PURE__ */ createVNode("path", {
  d: "M211.59,271.1H191.85s-.27,2.89,3.07,2.89h33.33c3.34,0,3.07-2.89,3.07-2.89Z",
  transform: "translate(-191.36 -239.38)"
}, null, -1);
const _hoisted_11$c = /* @__PURE__ */ createVNode("path", {
  d: "M226.16,256.55v10.74H210.92v-6.24a.92.92,0,0,0-.92-.92h-4.6a.92.92,0,0,0-.92.92v6.24H197V256.55H194v13.28h35.27V256.55Z",
  transform: "translate(-191.36 -239.38)"
}, null, -1);
const _hoisted_12$b = /* @__PURE__ */ createVNode("rect", {
  x: "23.44",
  y: "18.44",
  width: "5.15",
  height: "5.15",
  rx: "0.91",
  ry: "0.91"
}, null, -1);
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
    `,
    id: "OBJECTS",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 40.43 34.61"
  }, [
    _hoisted_1$u,
    _hoisted_2$t,
    _hoisted_3$q,
    _hoisted_4$m,
    _hoisted_5$m,
    _hoisted_6$j,
    _hoisted_7$i,
    _hoisted_8$h,
    _hoisted_9$e,
    _hoisted_10$c,
    _hoisted_11$c,
    _hoisted_12$b
  ], 4);
}
var OutletRedemption = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$v]]);
const _sfc_main$u = {
  props: {
    size: Number,
    color: String
  },
  name: "OnlineRedemptionSvg"
};
const _hoisted_1$t = /* @__PURE__ */ createVNode("title", null, "Icon_Online", -1);
const _hoisted_2$s = /* @__PURE__ */ createVNode("path", {
  d: "M254.73,233.27a.75.75,0,0,0-.61-.32H238.76c-.08-.6-.2-1.45-.3-1.85,0-.07,0-.15-.05-.23a2.19,2.19,0,0,0-2.1-2.08c-1.43-.15-2.59-.2-2.64-.2a.74.74,0,1,0-.06,1.47s1.16.05,2.54.19c.67.07.72.33.82.88q0,.18.06.33c.11.44.29,1.79.35,2.3l.59,9.35,0,1.63a1.71,1.71,0,0,0,1.71,1.66h9.37a.74.74,0,1,0,0-1.47h-9.37a.23.23,0,0,1-.24-.23l0-.88h11.07a.73.73,0,0,0,.68-.48l3.6-9.39A.78.78,0,0,0,254.73,233.27ZM252.44,236h-3.38l.21-1.61h3.79Zm-1.16,3h-2.59l.19-1.56h3Zm-7.46,3.29v-1.82H247l-.22,1.82Zm-4.73-4.85h3.23v1.56h-3.15Zm.19,3h3.06v1.82h-3Zm4.52-1.47V237.5h3.61l-.19,1.56Zm0-3v-1.61h4l-.2,1.61Zm-1.47-1.61V236H239l-.11-1.61Zm7.71,7.93h-1.75l.23-1.82h2.22Z",
  transform: "translate(-217.82 -221.69)"
}, null, -1);
const _hoisted_3$p = /* @__PURE__ */ createVNode("path", {
  d: "M240,246.93a2,2,0,1,0,2,2A2,2,0,0,0,240,246.93Zm0,2.59a.57.57,0,0,1-.57-.56.58.58,0,0,1,.57-.57.57.57,0,0,1,.56.57A.56.56,0,0,1,240,249.52Z",
  transform: "translate(-217.82 -221.69)"
}, null, -1);
const _hoisted_4$l = /* @__PURE__ */ createVNode("path", {
  d: "M248.65,246.93a2,2,0,1,0,2,2A2,2,0,0,0,248.65,246.93Zm0,2.59a.56.56,0,0,1-.56-.56.56.56,0,1,1,1.12,0A.56.56,0,0,1,248.65,249.52Z",
  transform: "translate(-217.82 -221.69)"
}, null, -1);
const _hoisted_5$l = /* @__PURE__ */ createVNode("path", {
  d: "M245.56,249.12h-1.82l1.14,5.35L227,259l-6.34-29.78,17.85-4.56,1.1,5.16h1.82L240,223.08a1.67,1.67,0,0,0-2-1.34l-18.92,4.62a1.79,1.79,0,0,0-1.25,2.13l6.94,32.56a1.66,1.66,0,0,0,2,1.34l18.91-4.63a1.78,1.78,0,0,0,1.25-2.13Z",
  transform: "translate(-217.82 -221.69)"
}, null, -1);
const _hoisted_6$i = /* @__PURE__ */ createVNode("path", {
  d: "M235.53,236h-3.05a.82.82,0,0,1-.82-.82h0a.82.82,0,0,1,.82-.81h3.05a.81.81,0,0,1,.81.81h0A.82.82,0,0,1,235.53,236Z",
  transform: "translate(-217.82 -221.69)"
}, null, -1);
const _hoisted_7$h = /* @__PURE__ */ createVNode("path", {
  d: "M235.53,241.89h-3.05a.82.82,0,0,1-.82-.82h0a.82.82,0,0,1,.82-.81h3.05a.81.81,0,0,1,.81.81h0A.82.82,0,0,1,235.53,241.89Z",
  transform: "translate(-217.82 -221.69)"
}, null, -1);
const _hoisted_8$g = /* @__PURE__ */ createVNode("path", {
  d: "M235.4,238.92h-6.29a.82.82,0,0,1-.82-.82h0a.82.82,0,0,1,.82-.81h6.29a.82.82,0,0,1,.82.81h0A.82.82,0,0,1,235.4,238.92Z",
  transform: "translate(-217.82 -221.69)"
}, null, -1);
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
    `,
    id: "OBJECTS",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 37.04 40.74"
  }, [
    _hoisted_1$t,
    _hoisted_2$s,
    _hoisted_3$p,
    _hoisted_4$l,
    _hoisted_5$l,
    _hoisted_6$i,
    _hoisted_7$h,
    _hoisted_8$g
  ], 4);
}
var OnlineRedemption = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u]]);
const _sfc_main$t = {
  props: {
    size: Number,
    color: String
  },
  name: "HistoryRedemptionSvg"
};
const _hoisted_1$s = /* @__PURE__ */ createVNode("defs", null, null, -1);
const _hoisted_2$r = /* @__PURE__ */ createVNode("title", null, "Icon_history", -1);
const _hoisted_3$o = /* @__PURE__ */ createVNode("rect", {
  x: "5.83",
  y: "28.39",
  width: "3.82",
  height: "3.82",
  rx: "0.51",
  ry: "0.51"
}, null, -1);
const _hoisted_4$k = /* @__PURE__ */ createVNode("rect", {
  x: "5.83",
  y: "21.69",
  width: "3.82",
  height: "3.82",
  rx: "0.51",
  ry: "0.51"
}, null, -1);
const _hoisted_5$k = /* @__PURE__ */ createVNode("rect", {
  x: "5.83",
  y: "14.98",
  width: "3.82",
  height: "3.82",
  rx: "0.51",
  ry: "0.51"
}, null, -1);
const _hoisted_6$h = /* @__PURE__ */ createVNode("path", {
  class: "cls-1",
  d: "M307.1,253.82v-8.7a5,5,0,0,0-5-5H297.7v-.86a1.5,1.5,0,0,0-3,0v.85H283.6v-.86a1.5,1.5,0,0,0-3,0v.85h-4.38a5,5,0,0,0-5,5V271a5,5,0,0,0,5,5h12.92a14.26,14.26,0,1,0,18-22.16Zm-32.9-8.7a2,2,0,0,1,2-2h4.38v.85a1.5,1.5,0,1,0,3,0v-.85h11.11v.85a1.5,1.5,0,1,0,3,0v-.85h4.38a2,2,0,0,1,2,2v2H274.2Zm10.05,11.44h2.45a14.26,14.26,0,0,0-.28,16.44H276.23a2,2,0,0,1-2-2V250.14h29.91V252a14.29,14.29,0,0,0-16,2.9c-.19.2-.38.39-.56.6v-2.24a.51.51,0,0,0-.51-.51h-2.81a.5.5,0,0,0-.5.51v2.8A.5.5,0,0,0,284.25,256.56Zm14,19.49A11.08,11.08,0,1,1,309.29,265,11,11,0,0,1,298.21,276.05Z",
  transform: "translate(-271.22 -237.75)"
}, null, -1);
const _hoisted_7$g = /* @__PURE__ */ createVNode("path", {
  class: "cls-1",
  d: "M299.8,264.4v-4.92a1.59,1.59,0,0,0-3.18,0V265a1.6,1.6,0,0,0,.38,1l4.93,5.83a1.59,1.59,0,0,0,2.43-2.05Z",
  transform: "translate(-271.22 -237.75)"
}, null, -1);
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
    `,
    id: "OBJECTS",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 41.26 41.48"
  }, [
    _hoisted_1$s,
    _hoisted_2$r,
    _hoisted_3$o,
    _hoisted_4$k,
    _hoisted_5$k,
    _hoisted_6$h,
    _hoisted_7$g
  ], 4);
}
var HistoryRedemption = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t]]);
const _sfc_main$s = {
  name: "OverviewRewardsSelect",
  setup(props) {
    inject("store");
    return {
      changeTab: props.changeTab,
      changePath: props.changePath,
      withOnline: props.withOnline
    };
  },
  props: {
    styling: Object,
    changeTab: Function,
    changePath: Function,
    withOnline: Boolean
  },
  components: {
    ArrowRight,
    OutletRedemption,
    OnlineRedemption,
    HistoryRedemption
  }
};
const _hoisted_1$r = /* @__PURE__ */ createVNode("a", null, "Outlet Redemption", -1);
const _hoisted_2$q = { class: "arrow_positions" };
const _hoisted_3$n = /* @__PURE__ */ createVNode("hr", null, null, -1);
const _hoisted_4$j = /* @__PURE__ */ createVNode("a", null, "Online Redemption", -1);
const _hoisted_5$j = { class: "arrow_positions" };
const _hoisted_6$g = /* @__PURE__ */ createVNode("hr", null, null, -1);
const _hoisted_7$f = /* @__PURE__ */ createVNode("a", null, "Redemption History", -1);
const _hoisted_8$f = { class: "arrow_positions" };
const _hoisted_9$d = /* @__PURE__ */ createVNode("hr", null, null, -1);
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_OutletRedemption = resolveComponent("OutletRedemption");
  const _component_ArrowRight = resolveComponent("ArrowRight");
  const _component_OnlineRedemption = resolveComponent("OnlineRedemption");
  const _component_HistoryRedemption = resolveComponent("HistoryRedemption");
  return openBlock(), createBlock("div", null, [
    createVNode("div", {
      class: "mulah-overview__content__navigation",
      onClick: _cache[1] || (_cache[1] = ($event) => $props.changeTab("redeem"))
    }, [
      createVNode(_component_OutletRedemption, {
        color: $props.styling.icon_color,
        weight: 40,
        height: 28
      }, null, 8, ["color"]),
      _hoisted_1$r,
      createVNode("div", _hoisted_2$q, [
        createVNode(_component_ArrowRight, {
          size: 15,
          color: $props.styling.icon_color
        }, null, 8, ["color"])
      ])
    ]),
    _hoisted_3$n,
    $props.withOnline ? (openBlock(), createBlock("div", {
      key: 0,
      class: "mulah-overview__content__navigation",
      onClick: _cache[2] || (_cache[2] = ($event) => $props.changeTab("online"))
    }, [
      createVNode(_component_OnlineRedemption, {
        color: $props.styling.icon_color,
        weight: 40,
        height: 35
      }, null, 8, ["color"]),
      _hoisted_4$j,
      createVNode("div", _hoisted_5$j, [
        createVNode(_component_ArrowRight, {
          size: 15,
          color: $props.styling.icon_color
        }, null, 8, ["color"])
      ])
    ])) : createCommentVNode("", true),
    _hoisted_6$g,
    createVNode("div", {
      class: "mulah-overview__content__navigation",
      onClick: _cache[3] || (_cache[3] = ($event) => $props.changePath("brand-history"))
    }, [
      createVNode(_component_HistoryRedemption, {
        color: $props.styling.icon_color,
        weight: 40,
        height: 32
      }, null, 8, ["color"]),
      _hoisted_7$f,
      createVNode("div", _hoisted_8$f, [
        createVNode(_component_ArrowRight, {
          size: 15,
          color: $props.styling.icon_color
        }, null, 8, ["color"])
      ])
    ]),
    _hoisted_9$d
  ]);
}
var OverviewRewardsSelect = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s]]);
const _sfc_main$r = {
  name: "StarSvg",
  props: {
    color: String,
    size: Number
  }
};
const _hoisted_1$q = /* @__PURE__ */ createVNode("polygon", { points: "14.32 71.29 37.48 57.13 60.65 71.29 54.33 44.88 74.96 27.23 47.9 25.07 37.48 0 27.07 25.07 0 27.23 20.63 44.88 14.32 71.29" }, null, -1);
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
    `,
    id: "Layer_8",
    "data-name": "Layer 8",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 74.96 71.29"
  }, [
    _hoisted_1$q
  ], 4);
}
var Star = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r]]);
const _sfc_main$q = {
  name: "OverviewPoints",
  setup(props) {
    return {
      brand: props.brand,
      changeTab: () => props.changeTab,
      changePath: () => props.changePath
    };
  },
  props: {
    brand: Object,
    changePath: Function,
    changeTab: Function,
    styling: Object
  },
  components: {
    Star,
    Gift
  }
};
const _hoisted_1$p = { style: { "margin-top": "15px !important" } };
const _hoisted_2$p = { class: "mulah-overview__card__container" };
const _hoisted_3$m = { class: "mulah-overview__card__body--small" };
const _hoisted_4$i = { class: "mulah-overview__card__promotion--title" };
const _hoisted_5$i = { style: { "width": "250px !important" } };
const _hoisted_6$f = { class: "mulah-overview__card__promotion--points" };
const _hoisted_7$e = { style: { "margin-top": "15px !important", "margin-bottom": "10px !important" } };
const _hoisted_8$e = /* @__PURE__ */ createVNode("em", null, "Tap Here for Terms and Conditions", -1);
const _hoisted_9$c = { class: "mulah-overview__button-container" };
const _hoisted_10$b = { style: { "width": "100% !important", "display": "flex !important", "align-items": "center !important", "justify-content": "center !important" } };
const _hoisted_11$b = /* @__PURE__ */ createVNode("div", { class: "footerLine" }, null, -1);
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Gift = resolveComponent("Gift");
  const _component_Star = resolveComponent("Star");
  return openBlock(), createBlock("div", _hoisted_1$p, [
    (openBlock(true), createBlock(Fragment, null, renderList($props.brand.promotions, (promotion, index) => {
      return openBlock(), createBlock("div", _hoisted_2$p, [
        createVNode("div", {
          class: "mulah-overview__card",
          style: `background: ${$props.styling.card_background} !important`
        }, [
          createVNode("div", _hoisted_3$m, [
            createVNode("div", _hoisted_4$i, [
              createVNode("div", null, [
                createVNode(_component_Gift, {
                  size: 20,
                  color: `${$props.styling.icon_color} !important`
                }, null, 8, ["color"])
              ]),
              createVNode("div", _hoisted_5$i, [
                createVNode("p", {
                  style: `color: ${$props.styling.promotion_color} !important`
                }, toDisplayString(promotion.title), 5)
              ])
            ]),
            createVNode("div", _hoisted_6$f, [
              createVNode(_component_Star, {
                size: 15,
                color: `${$props.styling.star_color} !important`
              }, null, 8, ["color"]),
              createVNode("p", null, [
                createVNode("em", {
                  style: `color: ${$props.styling.point_color} !important`
                }, toDisplayString(promotion.cost), 5)
              ]),
              createVNode("p", {
                style: [{ "padding-left": "5px", "font-style": "italic !important", "width": "100% !important" }, `color: ${$props.styling.points_color} !important`]
              }, " points ", 4)
            ])
          ])
        ], 4)
      ]);
    }), 256)),
    createVNode("div", _hoisted_7$e, [
      createVNode("p", {
        onClick: _cache[1] || (_cache[1] = ($event) => $props.changePath("tnc")),
        style: { "color": "grey !important", "font-size": "0.9em !important" }
      }, [
        _hoisted_8$e
      ])
    ]),
    createVNode("div", _hoisted_9$c, [
      createVNode("div", _hoisted_10$b, [
        createVNode("button", {
          onClick: _cache[2] || (_cache[2] = ($event) => $props.changeTab("home")),
          style: `color: ${$props.styling.back_font_color} !important; background-color: ${$props.styling.back_color} !important; border-color: ${$props.styling.back_color} !important;margin-left: 0!important;width:100% !important;`
        }, " Back ", 4)
      ])
    ]),
    _hoisted_11$b
  ]);
}
var OverviewPoints = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q]]);
const _sfc_main$p = {
  props: {
    size: Number,
    color: String
  },
  name: "CouponSvg"
};
const _hoisted_1$o = /* @__PURE__ */ createVNode("g", {
  class: "cls-2",
  style: { "opacity": "0.15" }
}, [
  /* @__PURE__ */ createVNode("image", {
    width: "1857",
    height: "841",
    "xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB0IAAANKCAYAAAAX1I2bAAAACXBIWXMAAAsSAAALEgHS3X78AAAgAElEQVR4nOzd63LjRrKoURC8SOpun/d/0nFfJPGEZqPC6XQWSHlsEgDXiqggRd1otf99kVkDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBzO3/yf4y/JQAAAAAAANnZX+Q+xLu/b+5v5+8KAAAAAADweD4TPQXSf5lg93n5b7brPK8+DwAAAAAAwLbMBc3qc72vF0b/YSLd57S/16XHYeZv628OAAAAAACwXp8Jn+crnl/6Pv4mUe46OXDu0vPqteGKaVEAAAAAAADWqxcwP/tYfU9+nU8S5y6rpj/jGTvPqxhafQwAAAAAAMB6zK27rR7P6fXq4+r5IIr+b0S5y3LUHIvHfHIsFUMBAAAAAADW71IErYLntee9+N788/PvZMbBH2dWXm1bRc99OHNRNP4cAAAAAAAA1itHySqAvl943nvM35udQ28SRGeIcn15FW4vfh6msw+POYr21uQCAAAAAACwTtUkaBUz38PJH186vWnSoTMpSmAidF51H2gMoMdw2scxjIqhAAAAAAAA29O7C/Sa2PlWPFavVQG1iqGmQzuE0Fp1p2ecBv34u52m8Pnx+JQ+PoSTV+QKoQAAAAAAAOvWuws0h9C39Lw6r+G11+Lz7Xt3nSB6FkRrQui83kRomwR9niJoe3wKUfSQVuXmnwUAAAAAAMC6VHeD5hDam/7MsfO1c36lr8lhdJeC65De004M/T9CaF9cZZunQeMk6Es6z9PnTmFVbrUidwg/HwAAAAAAgOXKYTGvp61W4uYIWgXQX+GxOjmW5knRXZoQHUyH/kEInVdNg7YQ2iZBP+Ln12EYvoQTY2hvKhQAAAAAAIB1qqZBq5W4eRI0R9B4fobzKz3/Nfw5jI5XTIg+/HSoEPpX1cRmDKHxjtA2EfoRP79N58vwx2To0xRNYwgdw88FAAAAAABgPeZW486txY3ToHEKNEfPH+HxR4qj7cSfMaYJ0aEzHfqQMVQI7YuTm3G17SHcEZpD6G/TdOjXEELjVOhYTIQKogAAAAAAAMtWrcYdLoTQuYnQX8Nfp0B/FOd7eu04fe1+ZkI0T4c+7KpcIfSyXeee0FNYj9vW4n4NMTSuyI0h1D2hAAAAAAAAyzcXDXshtLontIqhcyH0+4VzmE77vnH6ma1p5enQHEQfJoYKobU8sVndE3oI94A+hxD6dZoO/RpC6HH6+nHmnlAxFAAAAAAAYDk+G0LnVuRemgpta3BzBP09nLaJtH3uEK5n/JWC6MfvGqbfPz7qqlwhdF6Lk72p0BhDn1IQbXeFPqUQWq3HBQAAAAAAYPmqFbnXxtD34q7QPBWaI+hzOP8JXeoY+tNhCql5IC9Oh76n9/wQMVQIvSzG0CqEHkMIfQr/M7a7Q4VQAAAAAACAbYkRsRdD59bk5snQuB63mgb9T2hRp7SRNF/R+LPToh4uhgqhfXPrcduJMfSYpkOf0v+QQigAAAAAAMA25BA6fHI6dC6Gfp+CaBu8+8/0PLenOBW6D8N8vcnQ4dFiqBB6WV6P2078HypOiMYp0RhHhVAAAAAAAIDt6MXQ4YoY+j4TQ59CCP09bCTtRdBDui80DvflHrVLq3I3HUOF0Hm9CDqm6dB9WplbxVEhFAAAAAAAYFuqO0PzY4yh1brcdm/or7B59Md0TsVK3FNxV+g+rceNEbTXpTYfQ4XQz6tW5I7pf7B95wihAAAAAAAA21HFw+r+0CHF0HMIocfw2CZD85WMvQCap0Fzi8pNajf9jmbTMVQIvV7+H6Y6OY7m/9mqAg8AAAAAAMA69cJhb23umKZE92E69DBFykMInfGcitdyCK2mQqse9RAxVAj9s+p/hF0xOpzX5I5pXW7va3J5F0IBAAAAAADWK7eeFhF3xWvDzIToe7p6sRdEDxfuB+2txs3vaQgxNL+/zcRQIbSvGhXu3RV66VQ/Y0ivAwAAAAAAsHxzkbA3dHcunsfoOE4xdO4KxkN4zFOg167GjXKQHYr3tWpCaO1SAK1i6Nz/WL3/yQRQAAAAAACAdflM36kmRHcpNp7DxzGI9qLoXATNg3xz7ynLMXT1hNDrfHYdbrUGd5h5DgAAAAAAwPZcszq3CqJVkxpT9OzdB3ophFbvpz2+dz6/SkLovGsmQKtzzTQoAAAAAAAAjyXfHdoLonE6dG5Qrze8NyffUzqk4PneWeW7OkLoX1UXxs5NhPZq+9w0KAAAAAAAAI+ttaO5IDp0hvX+7rWN5yKEnlPsPBfvbZUxVAid1wugeeT4UgwVRAEAAAAAAKj0gugwdaf2+ttMg+p1qSp4ViE0f80Q1uSaCN2Y3krcuQiaY+g1o8cAAAAAAAAwdIJoNR2aH+euaZwLoe/hnNNK3KEIoKsLokLovEsX0e7TpbSXpkKFUQAAAAAAAObsZqZDm94K3GunQd9D+DynEFq9NoT3tRpC6B+q0eEh7VmuAmgVRMVPAAAAAAAA/q7eutwx9afcoXYzAfT9ilNF09XeFyqE/lku5vmy2TwRevjEVOiQfjYAAAAAAADMydOhuylmjjPfU4XQKoK+Tec9PFaTosNa7wsVQmvV3aB5IvTQiaF5KrQRPwEAAAAAAPisXZrGHK8MknMh9K04MYjmVblxEnQ1U6FC6F/leJnX4h5mYui1E6EAAAAAAABwrRxDdzNToXN3grbY+Zoe39KEaDUZuroVuUJo7dJE6CGdaj1uFUEFUQAAAAAAAP6Oa2LoOT2/NA36mk4VRFe7IlcI/T9xr/I1K3GrU63FzQcAAAAAAAD+rmsnQ6tp0Cp+/prOazElGuPpuMYVuULoH3orcWMMnYugOYaOJkABAAAAAAD4h1UxNAbRudW4bzMRtIqibxdW5C6aEPpn1RRnNQl6nE6OodfcDyqOAgAAAAAA8L/IMXQMk5v78HOr+0F7U6E5iua7Q8cURIelT4UKoX8Vq/n+wjToMYXQ3h2h4icAAAAAAAD/pGoydEiToccQQ3sR9Gdx8mRojKm7NBW62BgqhF53P2hcf3ucmQiNd4Tm1bhiKAAAAAAAAP+kHEGHEEL30+c+OtZpZjXuz87zXzMrcofp48FE6PL1Yug+nOPMqdbjmggFAAAAAADg39aLoecQQ3tToXEi9EeaDP2Vpkfzitzd0lfkCqF/6E2EVneDVlOh+7RO1/2gAAAAAAAA3MLcZOi1IbQKopcmQ+OK3MV59BA6txZ3PxNAT9M5prW4OYKaBgUAAAAAAOAWcgxtnSquyD2mGJonQuPpxdB8V+hip0IfPYQOxf8MY1qLm0PoqTMVui9W4+bfAQAAAAAAAP+WHCbjfaHvU9dqk6FPxURoDqE/wtfEqdC3NUyFCqH/p3c3aJwIPaWTV+MeOtOgIigAAAAAAAC3lAf2xjAZ+jY1r7we9yN6frkwGdq+Z7+GqdBHDqGX1uLmadAcQnMMzdOg7gcFAAAAAADg1q5ZkfseYuivYhr0ezjttdP0tYe13BX66BOhc2txe5OgOYRWd4T2YigAAAAAAAD826oVuefp8RDW5J6mFbnPwzC8hAj6JYXQ72Ey9DWsyd0VU6GL8aghNI8DV9Og+V7Q9j/CUzENegjfnyOoGAoAAAAAAMA9xE4VY2hrYa9FDG0BND5/7kyFvhUrchcTRccrvmar8j2el+4GjRE0r8aN06AiKAAAAAAAAPfWuyYyXxEZQ2iLoe201/KwYN6Wusg29sghdCimQcfOvaDxH/cprcU9pDtCdymGDoIoAAAAAAAAd9DbkjoXQ19mYmgeFOxdGbmINvaIIbR3L+iYwmaOoHkitJoGHZdcvQEAAAAAAHhIvU2pvQ2p1WRo7GSHzsbUHETv6lEnQqsYGst3L4LmGNqbBh1EUAAAAAAAABagNxU6pisj84rc6jyFYcHD0qdCHy2E9nYh5+pdle+5idA8DWotLgAAAAAAAEsS21geFDymFblVEM33hFabUxc1FfrIq3HHTgQ9dYp3jKHHdEeoiVAAAAAAAACWKver3MmujaGnEEPnOtkiPFIInbsM9lBcBvtU/CPP7T6u7gYVQwEAAAAAAFiS3l2huZVVA4PPaSJ07q7Q4d6t7FFCaHUn6GemQXvjvoeljvoCAAAAAABAUA30XXOF5Fwvy/eEVoODd/NoE6HV3uNLhfslvFb9w1aFWwwFAAAAAABgqfJUaDU8mLenPqXtqXkqtDc4eLdu9gghtLcSd+4fNEbQai1u9Y86LuUfFQAAAAAAAApVN9ulu0I/E0MPM9dJmgi9kWt3HT+F+PnSCaHVNOiixnwBAAAAAABgRjUROqZ+VsXQpyvW47oj9EYu3Q3a/hGrdbgvKYa2f9T2PSIoAAAAAAAAa3PNNtVDmPrMW1WfitW4czF0uFdDO9zjl95IjpNxhe0hRdCnFEC/dCZC867j/dJ2HQMAAAAAAMAVegOFebPq3ERo70rJ3M/O9/gH2epEaPUPt5tZiRsnQb90YuhT2HXc23MsgAIAAAAAALB010yFHkPoPIVWVkXQ3M/cEfovyRH0mgten6fwGU8VQeeK9hB+LwAAAAAAACxdNVy4v7Ai99RZj7tP11TePYZuLYT2Imhvp3GcAq3OXAidi6EAAAAAAACwBrmpxRh6DAOGOYb2pkJ763Fv3tK2FELzHzFH0P0VEfTrdK6JoKZBAQAAAAAAWKtr1uNWV07mCFoNEo5LaGhbCaE5go7F+G6+E/QlhNCvKYJeCqHuBgUAAAAAAGALqvW4vanQPB36mYnQm9tCCO1F0HwnaBVCcwTtTYTOrcTN7wMAAAAAAADWoNq4GmPooWht1UToMXS0Xku7ubWH0LlJ0DGF0EsB9FsxEdqbBl1ExQYAAAAAAIB/SG8iNA8e5nMoJkJ721Vv2tXWHEKrMl1NglbrcGP8/BYi6NcUQWMIXdxeYwAAAAAAAPgH9CZCx+Ku0DwZmlfjVoOFwz162mFl/2dU8XFuX/HcKtxvxWnToM/TOXUKtmlQAAAAAAAAtuCjd53T4+6TU6HVNZNj6nnnW/+t1hJC5wLo3KWtVQSNAfS36Xwr7gY9FTuNF1GvAQAAAAAA4F+Qr4ecmwrNEXRxg4VLDaHVH6QKoJci6FOxCve3dPLdoM8zK3HzP5YICgAAAAAAwBbEqc3P3hWa7wntBdHzLadDlxRCc1S8NAWa/wHaH7ftI27rbb8UE6D/bzo5hOYIaiUuAAAAAAAAj+KaFhcnQ/PzuQg63HpF7hJCaC+A9uJnby9xvJw1RtC4Dvf/dSLo17AS9+nCStze+wYAAAAAAIA1yoHyUgw9punQPBE6LuGe0HuH0Cp6DjPxsxrDjX/wp3QvaIucv6Vp0GvuBr1UrAEAAAAAAGBr5rpcbnO9tbh50PAufe1eITRPVlYBdCz+yJ+JoF8694JWIfSlWIl7mPlHEkMBAAAAAADYmnxP6NyQYi+IVhOhd7kn9B4hdG76c0x/0LgCNz7GP267EzRG0DgNmkNo+zhPguYQOre7GAAAAAAAALaot621N6x4aSJ0TH3tZity7z0RWsXPsYifc+O2MYK2e0G/FCH0Wzhfw9fFCJovcXUvKAAAAAAAAI/g0j2hvQh6DI3t0kToTd06hOao2Ft5u09/rGq8NkbQvBI3rsXNj1/SJOhzmgR1LygAAAAAAACPrDcV2htg7E2E3m0adLhxCM2rcOfGaKuSnANoO8/h5BAaz5c0BVqtw527vFUMBQAAAAAAYOuqe0JzDM1Nr4qh1f2gN3WPidDeGG2LkacQO3P0zOcpRdCXIoZ+Ca/F+0Cf0uWtIigAAAAAAAD8tentrrjaspoGrbawttD6r0+H3iqE5pCYq3Ge9HyaOfnzMYQ+p+gZT28KVAQFAAAAAACAOk7uQkPrbXqtYmhubze3lInQw1BPeD4XJ0fQ3vfk+PkUQmuOoL07QUVQAAAAAAAAHlW1GnduInSuvd38rtB73RGadwgfw32fL+k+z95U53MniObPzQXQuQgKAAAAAAAAj6q3HjfH0N5E6KUY+q+750RoFUKfpuD5NZ0vnTs+q3Mq4mfvLtC5CCqIAgAAAAAA8IjixGZse7vU2vJkaHU/6HiPadDhRiG0uh807xCuJkK/DcPw2xREv6UQWq27jeHzlOLnZwq0AAoAAAAAAAB/yDF0LoLOtbjNToTG/7hYgA/pjtAWQr+GGPpt+rityK1W3ubJz0sBdCzipwgKAAAAAAAAdcSs1uPmx89cT/mvTofeejXuUPyReutxcwz9GqZCqwh66FzEOrcG1ypcAAAAAAAA+EOOk3MhtJoMzV2uNxn6r6/HvVUIzcHx0j2hzymGxvW4cS3u3OrbqjSP6T1U7w8AAAAAAAD4sxw1qyA6F0Fv7tYToXEF7dxUaAyiz2El7kuaCM0RtLp4dW73sAAKAAAAAAAAtdz2hk4E7Z2HuSO06f2R9um+0FOY/HxO5xRCaIygc+O1gwgKAAAAAAAAnzK3+XWRAbS5ZQi95o8UY+gxTIge052gp7AWt31fjKCDAAoAAAAAAAB/W7zHs7eF9Zrp0Nzu4sf/6j2h95gIbeZiaAyih3QXaHUvaBVBBwEUAAAAAAAA/jFzEXRx11XeczVufm0ujMZAWt0HOjdaK4ACAAAAAADA/6aa7Kwa3zVXWN7EuIB/8PxHG4vnVfS8FEHvtm8YAAAAAAAANmgugvbi590GGW8dQnura+f+KJ/9gw63+uMBAAAAAADAhs2FzM/Gz+HWDe+eE6HX/ode+rpzehz+7YtVAQAAAAAA4MHMNbtFDi8uYTVuU8XLcwqd1RlmYqggCgAAAAAAAP+MucnPued3cbjT7z0XkTO/Hs9757X2h+sF3V0RQ63NBQAAAAAAgL6qsf2vbh5Gbx1Ce1OfQxE523kLj/HEqnwOMfTSzuFz8RoAAAAAAABwnerO0Or53Gv/untNhGa9ANrOazpxAnScznsRQ2NZPhel+Zw+BgAAAAAAADbgHiH0mgnQFj5/hfNzer9j+P6Pr9+HGLoLj9U5d6KoIAoAAAAAAACfd2ka9G7ueUfokCJonv5s8fPHdA5T9BzC17fXejF0Lo6ei38YQRQAAAAAAAA24JYhNN8P2psEzQH0+zAMxzAJGr82htAYQ3tnbmK0EUQBAAAAAABg5e61GrdF0PNMBP0IoL+ndbjt605THD0UMTRG0fyYTxVGG0EUAAAAAAAAarmtLc6tQug5hcVzEUFfUwQ9FZOgLZTGEHqcguchPe47kXScmR7NQXSX3j8AAAAAAACwAvecCM0h9GcIob+HWHmevubX9LlTCKFxKvTS2c9MkMY4ugvxtanuFAUAAAAAAAAW6tZ3hFYRNK7F/RFCZYuOMYI+pRB6uPIxf22eJD1M76kF0SGtzQUAAAAAAABW5BYhNE9SVtOgbeVtnMo8h3W4LYI+hbCZA2f8+FR83Sk9xvMWwmh7j/vp97fpUFOhAAAAAAAAsBK3Xo0bI+h7iKG/UgQdps+9pjtD80rcKoTm6JnPU+f1c/h77MPjObx/MRQAAAAAAABW4J53hMaJ0Hgv5zlE0HgvaL4TND/vhdCn8PhxntPjW4iyT+F97kLwtCIXAAAAAAAAVuTWd4QOae3tWwiOuxRJWwjN0TOefWcqtIXQGEGfw3mZVvG+hBCaJz+r9zWYCgUAAAAAAIDlu1UIjeGwhc5heu2t+NxbuDe0hc/9dKrneU1uXHkbJ0FfpvMxZfpliq3vReisjvgJAAAAAAAAK3GPO0Lj8/fi4xZC98UZw2vj8NcYekhToTGEfgTQ36cA+nOKoG8pgo7htN/zPr2WYykAAAAAAACwULdejbsLMbEKoecQHvcpTOaTw2helRvX436c72El7q8wDTqEO0rjz3oNv+Nd/AQAAAAAAID1uPVEaNSCaFxNew5R8i087z32gmicDG0h9EeIoG9punNf3DMaV/LGeLsrngMAAAAAAAALco/VuHkqdBdeax+/z9zV2YuieZVuC5s/phDa1uG+plW41Trddt6KO0QFUAAAAAAAAFi4e0yExhi6S/eGvqXgOXSeV2E03+/ZJjp/hVW4byGyxgj6EUqf09rcHEHPxXsHAAAAAAAAFuheq3GrCFpFxhgb82tzU6L7KWYewhToe/jZ+3CP6PN0f+iPMDX6FkJonggFAAAAAAAAFm4Jd4RWq3Lj56JeGM1B9C08VveBtjW4P9Ldob+KEJrX4gIAAAAAAAALd88Q2uTomadEe5/rTYi+hxW55yKCtknQn+HkANpbiztYiwsAAAAAAADLt4QQ2uRpy93M54bO9GgMpjmCjmFV7q80Afo6MwlqLS4AAAAAAACszJJCaDYXH3vTo3EqtH0ur8nNk5/55HtBRVAAAAAAAABYmSWH0DlVnMx3jY5T0NyFuPkWHuP0ZzUBmiOoKAoAAAAAAAArMW7oH+pcPLbz3nkeP/eeYmd1VykAAAAAAACwAlsKoUOKmHmqszfxOTcJagoUAAAAAAAAVmhrIXTohMtrgmfvewEAAAAAAICV2WII/SzxEwAAAAAAADbmkUNoXnsriAIAAAAAAMBGPGoIFT0BAAAAAABgw6zGBQAAAAAAADZHCAUAAAAAAAA2RwgFAAAAAAAANkcIBQAAAAAAADZHCAUAAAAAAAA2RwgFAAAAAAAANkcIBQAAAAAAADbnUUPobjoAAAAAAADABj36ROiu8xwAAAAAAABYsS2G0EtBM39eDAUAAAAAAICN2fJE6K5z8ueG4jkAAAAAAACwYlsLob2YGcPneOHj/HPcJwoAAAAAAAArc9jAP9hc9Izhcyyej5042oufgigAAAAAAACswJpC6FyEzPd85ti5D4/VGYs42psSBQAAAAAAABZuaSH02tjYmwId0oRnjJ6HzslhNMfQz7wvAAAAAAAAYAGWEEJ7kfGa16u7PHdpEvTjv/EYzmk68bUWSfN0aLUiVxQFAAAAAACAhbt3CK2i5tzzoYifQ5oCHdMa3BY7n4pzSmG0BdFLa3IBAAAAAACABbtXCO1NdQ4zK2mvDaDtHMI06GmKoC/TeQ6Pz8MfUbQ3HSqCAgAAAAAAwIrcI4T2wmdvzW3va8bisboTtE18tvj5ZRiGr9PjlxRCYwzdW48LAAAAAAAA63TvidBdipm9j6vPxcd9uhN0n+4EfQoh9COCfksxtE2HViHUelwAAAAAAABYmVuH0Lzqtlpr2/t4V3zNPk2CHoqVuDGEtvD5LZyvxWRoL4YCAAAAAAAAK3DLENqbAs1BM4bNfO/nvnieA2iMoMcpbj4Vq3FjDM1ToYf0HqppUGEUAAAAAAAAFuoeE6F5zW11r+c+xch9EUmrKdAqgrb7QZ/TVOiXtCb3pZgIzatxAQAAAAAAgBW4VQjNETFH0Bgxj+H5oRNHD51VuMe0EvcUJkLjVOhLuh/0SxFC80ToIIgCAAAAAADAOtxrIjSvxT2EAHlKpxdGD+n1HEHjRGgMoU9hDe5zeP4Uvv4QJkJ3xR2hYigAAAAAAAAs2L3vCN2niPmcJjifLkTRHEFzCI1ToXk6tPd7jmHidO6OUAAAAAAAAGCh7nlH6Bhi6DGEypc0sflchMpjsUY3htD82Js2zV8b1/D2AqgYCgAAAAAAAAt3ixBa3Q+aJ0IPKYR+SXd45hh6mgmh1548UbpPEXQs7gcFAAAAAAAAVuDWq3FjVKwmQtsE6EcA/TYMw9cUQ59nQujcY3XH6D6twN2H95OnQcVQAAAAAAAAWJFbr8YdQgTdFROhpxBCv04x9FtnMvRYxM3qVMFzLn6KoAAAAAAAALBytwqh+Y7NXVo/e+hMhX4tJkN7IfRS8MzRcyzi59iJnyIoAAAAAAAArMitJ0JzEB1DpMxToS9FDK1C6KUVt9XJ0XMM72lXvE8AAAAAAABgRW59R+hQrJ2tYujTdF5CEG2nfe6YAmgvfvYmPnurb0VQAAAAAAAAWLl73BE6FCF0TPeFHkMQfQ4Toi8phOYp0M+Gz170FEABAAAAAABgxe4VQocLU6GHsPo2Toi2MHpKd4OOM9FzbuozB08BFAAAAAAAADbgHiE0T17OBdHjhZNX4V4TPavYKYACAAAAAADAhtxzIjTKQTTf+xknRQ/pbtD9henP/HzuNQAAAAAAAGADbh1Cq+nMaiq0uj90TCfG0rkImn83AAAAAAAAsHH3viM0f5wDaVx5m0Po3F2gvd8BAAAAAAAAPIClrMZtemGzFz0vrcQFAAAAAAAAHtC44P/kHEGHK+KnCAoAAAAAAAAsOoRmvcgpfgIAAAAAAAB/ssQQuus8BwAAAAAAALjKmiZCLxFNAQAAAAAAgP9aQwjdiZwAAAAAAADAZ2xpIhQAAAAAAADgv4RQAAAAAAAAYHOEUAAAAAAAAGBzhFAAAAAAAABgc4RQAAAAAAAAYHOEUAAAAAAAAGBzhFAAAAAAAABgc4RQAAAAAAAAYHOEUAAAAAAAAGBzhFAAAAAAAABgc4RQAAAAAAAAYHOEUAAAAAAAAGBzhFAAAAAAAABgc4RQAAAAAAAAYHOEUAAAAAAAAGBzhFAAAAAAAABgc4RQAAAAAAAAYHOEUAAAAAAAAGBzhFAAAAAAAABgc4RQAAAAAAAAYHPWEkLPC3gPAAAAAAAAwEqsIYSKoAAAAAAAAMCnLDGEnjvPP/N9AAAAAAAAwANb0x2hQicAAAAAAABwlSWH0Goy9Dxz8vcAAAAAAAAAD2ppITQHzWvCZ46f1WsAAAAAAADAAznc8T+1FzDbee88xs/vOuFz13kNAAAAAAAAeAC3DqHXTHy+p+fxvGBRlUMAACAASURBVIUzpri568TOXfqd+XUAAAAAAABgY+45ERpVMTRGz9f08VsKnOcQQmMQ3YXPDeG1IYRRQRQAAAAAAAA25h4h9JyeXwqg7fyazj7FzH2YDh07MbQXRvMKXVEUAAAAAAAANuDed4TOBdAWPn8Ow/BjGIZjiKDtew4hhI4phOYoGo8pUQAAAAAAANiwe4XQHEHfQwxt8bMF0O9TBD2ECNpi6WE6Ywqiu+L5XBxtBFEAAAAAAADYgFuG0HN4rKZBqynQHEFjLD2FidB4chQdwyRpnhytVukOKYiKoQAAAAAAALAyt54IzfeDvhfrcFsA/T2tw80R9Bgi6b4TRffDX+NojqRVFG2qNboAAAAAAADAwt0qhJ7TlGVeifvamQTdT9/Tvubj809FCI1nXzzfd2JpDKPnFEUbMRQAAAAAAABW5h53hLYIGu/6fA0R9Bju/RxSBP0+hdBjWI2bY2gVR6vXqlB6Dr/XZCgAAAAAAACs1K3vCI33hL6ndbdtLe7+QgQ9dULo8cLz3nlLYbRNoY7p/YuhAAAAAAAAsBK3CKE5Hp7T/aBxInQMXxsj6Y80CXpN9Dyl573TPv8+PY+q6VAAAAAAAABg4W69Gvdc3BHaYueY7hFtkfRHCJg5elYTocc0NdrO08x5n74mTq02Y3jNVCgAAAAAAACswK1X4+6KidBdOEP43OsUSI8pgPbu/qxC6FOKoM/pvE7v4T28r10InbvwnofwGgAAAAAAALBg95gIHabwuEsxdChW5v4MsXPfecxRtFqF+zyF0Jfp+ZfpZ+cQOqQwm0/87xBEAQAAAAAAYKFuFUKre0LfO18X1+W2AHrp5BgaV+PGSdDfQwT9lSJojJ5jOO/FlCgAAAAAAACwYPeaCB2KGJrvDR2n+Bkfx+L1/VBPhx6LtbhzEXQsfmb8nWd3hAIAAAAAAMA63OuO0GGKkGOIofnu0BYgd53nVRStYmgMoT/DStwcQaugekj3h4qgAAAAAAAAsAL3mAjN94Hmj8e0ojbf05k/X02IHtJ9oU9hEvQ1xNdd+Ppjul/0bTqHEEF7/y0AAAAAAADAgtw6hDbVdOguPc9nmImieUI0xs0YQGMEbV9bxdL29W9hXe/eVCgAAAAAAACswz1CaI6gQ4qLu/S891hF0RxDf02hM0bN9rWHsDr3Y23ujxRNYwTNE6FiKAAAAAAAACzYPSdChyKIDkVkrJ73JkTzutwYNNvvaZ9rU6Dfr4yg+X0CAAAAAAAAC3WvENrkO0MvvX5tFB0705xtEvQ0xc8WQKuVuG/h3tJz8V4AAAAAAACAhbp3CB1mQmcVHatJ0iqInouI2SJoC545fsYA+j4TQa3FBQAAAAAAgIVbQgiNehOXOTxW06M5kraP36YI+hrOr/RxjqDvJkEBAAAAAABgvZYWQnvmQmR1z+gwhcy2KreFzbfixM9V94KKoQAAAAAAALAyawmhc/Jq3fjxewqh72ntbX4tx89MDAUAAAAAAIAVGDf2j9Sb3syRswqfefrTNCgAAAAAAACs1NZCaNQLnXNn6ERUAAAAAAAAYEW2GEIvhcu50Cl6AgAAAAAAwAZseSL0GsInAAAAAAAAbNAjh1ArcAEAAAAAAGCjHjWEip4AAAAAAACwYY++GhcAAAAAAADYICEUAAAAAAAA2BwhFAAAAAAAANgcIRQAAAAAAADYHCEUAAAAAAAA2BwhFAAAAAAAANicRw2huwW8BwAAAAAAAOBf8sgTobsURMVRAAAAAAAA2AircQEAAAAAAIDN2WIIrSY7d1ec3vcCAAAAAAAAK7PVidAcPnuvx8/PvQYAAAAAAACsyGFD/1g5WMawOU5nFx6rz+UI2vvZAAAAAAAAwIKtNYT2wmR7fUyhMwbPj7OfzphOb1p0MB0KAAAAAAAA67HkEHpNdKymNmMA3afweQjPq4/HNCF67fsAAAAAAAAAFmRJIXQuOFafy6EyT3KOIXYep8f2/JheOxQxNK/RBQAAAAAAAFZiCSG0utvzM5+rAmhcgdui51M4p3RiGM0xdO7uUAAAAAAAAGCB7hlCe1Gzeux97lIEbROgpymCPhenRdEcQ/fFRKgICgAAAAAAACtwrxDai5pDZwJzLn7mABojaAyhH9HzSzgv4bRp0UuToQAAAAAAAMAK3COEzk12Vuto5+LnLsXPKoIewzRoC6HfhmH4Ovw5iMYYeigmQk2GAgAAAAAAwErcOoRes9a2et57zAE0RtBDWHvbQujLFEA/QuhvIYi+DH9dk2s9LgAAAAAAAKzUve8Ire71rJ5XJwfQahL0GCY940Roi6F5MrTF0EMxFTqkCCqIAgAAAAAAwELdMoT2VuFWMXPfOWOa1IxfX0XQUwqhL8V63G8hhD6lidAxTacCAAAAAAAAK3CP1bg5hOZ1todwT+chTWdWsTR/X4ygOYTmGPqlMxF6zT2hAAAAAAAAwELdKoTmlbJ5He6hCJjHsKa2F0ZzOI0/4xgmPPNUaHuM53n6mmMKrfmOUAAAAAAAAGDhbr0aN67HzdOgeYLzKYTMU4qd1eRongaNq3Hzz30O4fO5+F2XpkFFUQAAAAAAAFiwW6/GHTprcVu0fE5Tm1WkPBZRtDcReiqmQ0/F82OKrYd0R6jwCQAAAAAAACtyrztC82rcOL2Z7/DMQfSYThVC8zld+DgHUNOgAAAAAAAAsGK3CKE5HF6aCP0IoV/D+TL8+Q7Pa1blXnqMX78vAug+vEcRFAAAAAAAAFbmHneE5hAaY2icCP2IoL8Nf42h1Yrc3tmn13P03KcAGlfhWokLAAAAAAAAK3XPO0LzVOgprcf9CKDfpvM1rMl9Ku7zzGtte7EzT3324mdehzuIogAAAAAAALAetwqhebVsFUIPIYQ+p8nQFkOfw1Roda9nDp296JnDZ7UCVwQFAAAAAACAlbrnROhYxNDjTAz9mtbjHjt3e+bgmePn3OSnAAoAAAAAAAAbcOs7QvPHMVJWMTQG0RZF82rcGEJ3M6tue1OfeVq1934BAAAAAACAlbjHROiQ4uOYVtkeOkE0htEWQvdpCrQ37VkFTwEUAAAAAAAANupeq3GHFCirydAWQ48hisbTviZH0Pyz8+8cOrFTAAUAAAAAAICNuNdEaNYLonlKtDq9CDqkuCl+AgAAAAAAwIO4dQidi5FzE6I5jOaVuKP4CQAAAAAAADT3vCM0T25WZyzCaHXyz8u/CwAAAAAAAHggS1mNG/Wi6DWnET8BAAAAAADggS0thFYxc27SM6/DFUABAAAAAACA/66VXYs8EdqInwAAAAAAAMCfLDGECpsAAAAAAADA/2TpE6GfiaICKgAAAAAAAPBfa1iNK3ACAAAAAAAAn7KWO0LFUAAAAAAAAOBqawmhAAAAAAAAAFcTQgEAAAAAAIDNEUIBAAAAAACAzRFCAQAAAAAAgM0RQgEAAAAAAIDNEUIBAAAAAACAzRFCAQAAAAAAgM0RQgEAAAAAAIDNEUIBAAAAAACAzRFCAQAAAAAAgM0RQgEAAAAAAIDNEUIBAAAAAACAzRFCAQAAAAAAgM0RQgEAAAAAAIDNEUIBAAAAAACAzRFCAQAAAAAAgM0RQgEAAAAAAIDNEUIBAAAAAACAzRFCAQAAAAAAgM1ZSwg9L+A9AAAAAAAAACuxhhAqggIAAAAAAACfsvQQ+pkIKpgCAAAAAAAA/7XEECpoAgAAAAAAAP+TtdwROkyBNJ78GgAAAAAAAMB/LS2EVoFz7lTfL4oCAAAAAADAgzvc8T8/B8tz8fh3guiu8xoAAAAAAADwIG4dQqvYmR8/znt63jstcO7COafXhxRGRVEAAAAAAADYuHtOhDZ5HW6LoG8Xzhi+b+zE0HMKn3laVBQFAAAAAACADbpHCD2n59XUZ46gr+H8KiJoC6E5iA7F4xBeF0UBAAAAAABgg5ZwR2iMoTl8fkTPn+EcQuRs0XR/IYbmMxRTovH9CKIAAAAAAACwcvcKoed04iRoFUF/TO91DNH0OL22TzG0iqJzcTTfKSqIAgAAAAAAwMrdMoSei9fyKtwYQD/i5/dhGE4hgg7h61oIzTG0iqK9idGxCJ5xQlQMBQAAAAAAgBW61x2hbarznCZBWwT9XkTQ8/R1v6bXYwiNMXTfCaNVID0XQfScpkUHQRQAAAAAAADW5VYh9BzC4rlzL2ieBP3PFC93KYI+dUJoDKIxjF4TSasgOpgOBQAAAAAAgHW65x2hvZW436fIWUXQ71MIPaZTBdF2jiGI9mJpDKJxhW6T7xIFAAAAAAAAFuzWd4RWE6H5XtBDJ4L+mCZBT2Ei9BhiZ36Mr1UfV5Ok++l37qf3Vt0hCgAAAAAAACzcLUJonqRsAbRai7sP8TFH0KcUQHuBM55Ten4a/vx6e3yffkaLoEOYCG2PpkIBAAAAAABgJW69Gre6H/R1io8/iwj6Gtbl5ghaTYAei9DZzlN4bM9fp8e36bG9t2bX+VgMBQAAAAAAgAW79WrcXQqhbTVuXEGbV+bGCHpIAfQwE0JzBG3nOZzX6bwXEXQI78mKXAAAAAAAAFiRe0yE7qbwuJsmMXdT8BxCjIzToL37PPNrvRBaBdCX6Wf/mn5XFUJ3aUL1HF43FQoAAAAAAAALdqsQek4Tn0OKofHr8srcQ3rMZy6GthW4MYBWEfQ9vIcxnZ34CQAAAAAAAOtyj4nQ+Pw9fRxDaAyeY3gcLwTRPBUaJ0I/IuiXIoQOYQJ0X8TQsZgKBQAAAAAAABbqXneEDjMh9G0mRu7Sx3PToe1e0RZCPyLojymAvk6/p72XMX1/e/4ejvgJAAAAAAAAK3HridDoPa3LbWF0nCLlmO7p3BWvjWlitIqhbSr0xzQJGiNo+xnVet3XEEVjvN0VzwEAAAAAAIAFucdq3F16fE+vvYfwOXcuTYgeworcn8UkaIygeZVue95W5547MRQAAAAAAABYoHtMhOYVufn1Fhnz8+HKKBpj6HEKoC2CxvtA92Fq9CN+fp/uEY3BNEbQcxFyAQAAAAAAgAW612rcvGI2f25IobEKokMniMbp0NfiPtBdiKSnKX7+CFOjOYTmiVAAAAAAAABg4e55R2gMk707OPPnh/Da0JkgHcM9ozFkDimCtntD28kRtLcWFwAAAAAAAFi4e4bQJk+A9iZEq6+pJkTfQww9dyLoz2IKdG4S1B2hAAAAAAAAsCJLCKFNNW2Zg2PvXtEYO3dFvGwRNEfP1zQBmiOotbgAAAAAAACwQksKoZVLAbJam5snNt/Cqtx2LkXQd+twAQAAAAAAYL2WHkIvyWtz48dxKjQGzhw851bhVj8PAAAAAAAAWLhxQ/9A+R7PfHqhs/rcUERQAAAAAAAAYCW2FEKzuanOaupz7jUAAAAAAABgRbYYQqtw2Qugc1OgAAAAAAAAwEpteSIUAAAAAAAAeFCPHEKrtbkAAAAAAADABjxqCBU9AQAAAAAAYMOsxgUAAAAAAAA2RwgFAAAAAAAANkcIBQAAAAAAADZHCAUAAAAAAAA2RwgFAAAAAAAANkcIBQAAAAAAADbnUUPobgHvAQAAAAAAAPiXPPJEaI6h4igAAAAAAABsxKOvxhU/AQAAAAAAYIO2GEJ7cXMXTu/rhVEAAAAAAADYgC1PhO468TO/nr/GylwAAAAAAABYua2F0CpmVsFzvCKGzsVRAAAAAAAAYMEOK//HqQJlFTzHK05vgvTS7wMAAAAAAAAWZg0h9Jr4mCc3qwC675z4+bEzLXrt+wAAAAAAAAAWYGkh9DPRs3qep0Fb/DyEx3aO6eN9iqGjCAoAAAAAAADrtIQQ2ltvO/daDpRVBB1D/PyInqfpHItTxdBdJ4aKogAAAAAAALBw9wyhOShWofGa+DmkaJlX4bbw+TSd5+m0j3MgjUG0F0MBAAAAAACABbtXCO0Fzt7z6uvyBGgVQeM06Ef8fEknRtFTCqHVfaEAAAAAAADACtwjhF4TNvOpvi7HzyqCHsI0aAuhX4dh+BLOyydiaP5vAAAAAAAAABbo1iG0F0HH9Dx/XMXPHEH3nQh6KkLot+m0KPqSQmgVQweToQAAAAAAALAO974jtDfVOYYI2ft8FUBzBI1rcVsI/RJCaIuhLymG5ntCqwAqiAIAAAAAAMBC3TKEVlOgVdCs4ubYeawCaIygbS3uUwqhX8Nk6NcQQ5/Telz3hAIAAAAAAMAK3WM1br7ncwwTmId09sNfH+cCaI6gpzAR+hQmP7+kIFqtxz2kqdS81hcAAAAAAABYqFuF0GqtbJwErSLmMd3XeZgJpnMR9FRMhcYg2h6f00ToPk2smggFAAAAAACAlbjXROiYpkEPRbiMH/ei6CG8luPpKazGzTG0d07FHaGj+0EBAAAAAABgXe55R+gurbc9plD5FB5zFM0BdC6EnjrTofGcUgSt1uKaCAUAAAAAAICVuOcdoXEi9Bii5Es6z0UQPRYBdG61bi+MHoufV02DuiMUAAAAAAAAVuQWIbRaK7sL94PuQ5Bsd3h+ne7t/Bqi6HOY6KzuEL3msYqn+f7RKoICAAAAAAAAK3Lr1bh5GnSfwmRbh/sRQb9NIbRF0Ze0yraKoHNnX0TPKn6OMytxRVEAAAAAAABYgVuvxm2qGHoKIbRNhf42BdEv08krclsE3V8InFXwrOLnGN7bIIICAAAAAADAOt0qhO7S87we91Csx22rceNk6HNYkRsnQmPwHDvRc0zxdUxBdm4CVAQFAAAAAACAFbn1RGgMi70VuXky9EuaCn0K94Tmuz1z6KwmPcf0+y+twBVBAQAAAAAAYGVufUdofrw2hr6k9binYho0h89xJnZWZyiipwgKAAAAAAAAK3TPO0Lzetx4z2eMoTGI5tW4hyKCXjPteWn1rQAKAAAAAAAAK3avEDoUkbKFzEMRRE8pjLYQuk/3fV4z7Tm39lYABQAAAAAAgA24RwjNITKH0DFNh1anWovbm/ocZiY/e68BAAAAAAAAK3bPidCmF0PHztrcQ3otT4MOF6Y+e68BAAAAAAAAG3HrENpbU5snOXtRNJ98H+ggfAIAAAAAAAD3viO0+ri647O6AzRG0bwKt/r5AAAAAAAAwINYwmrcqDchOhQh9NLPAAAAAAAAAB7UuOD/7HzP56WTvwcAAAAAAAB4UEsMoWImAAAAAAAA8D9Z8kTo8MkoKqACAAAAAAAA/7X0EDoInAAAAAAAAMBnrSGEDmIoAAAAAAAA8BlrCaEAAAAAAAAAVxNCAQAAAAAAgM0RQgEAAAAAAIDNEUIBAAAAAACAzRFCAQAAAAAAgM0RQuH/s3eny20kSaJGEwsXSdXv/54z3ZJIYrmm7ow7Xt4eCbAWIDNxjlkYQJAUKZL/PnMPAAAAAAAAVkcIBQAAAAAAAFZHCAUAAAAAAABWRwgFAAAAAAAAVkcIBQAAAAAAAFZHCAUAAAAAAABWRwgFAAAAAAAAVkcIBQAAAAAAAFZHCAUAAAAAAABWRwgFAAAAAAAAVkcIBQAAAAAAAFZHCAUAAAAAAABWRwgFAAAAAAAAVkcIBQAAAAAAAFZHCAUAAAAAAABWZwkh9DweAAAAAAAAgKusaSJULAUAAAAAAAD+bY4h9Nx5DgAAAAAAAHCVJU2E9qKoWAoAAAAAAAD8ztxCaDUNei6en4vX8+cDAAAAAAAAD2o/w/92L3ROnWYz/PfbAAAAAAAAwIO5ZwjN05/VOY0nPo+vnSemQHMUHYRRAAAAAAAAeAy3DqHVKttq6jNHz+N48mvt87Zj5Nx0Yucmfd38OgAAAAAAALAic1mN24ugv2LnIYTQw3i2xeduijOEydAYPXMYFUQBAAAAAABgRe4RQnv3fsbJzxg9f52PYRjex+93mz5/G86mMx2an5+LtwdBFAAAAAAAANbh3hOh1QTocQyfLX7+Om/DMDwNw7AL4bJ9/C7F0BhCcxSNp5oSFUQBAAAAAABgBW4ZQs/peTzHTgT9FUB/hgjaPrdNjO7H11sM3RXTofntXhhtBFEAAAAAAABYuHutxs3rcE9hBe5HCKAvYwRt63Dbxz2Pr7dAug8htIqivUDaW6U7dO4WBQAAAAAAABbg1iE03w96CnHzkKZAf3Qi6HsIoftwdmlCtDpVID1PBFHToQAAAAAAALBAtwqhcbIyR9BjmAZ9HyPo80QEbVOizymEVlE0B9IYSvfhjtEWRLfhazYCKAAAAAAAACzMPVfj5hDapkHbpOcmfFxbl/sSQuhT+Ng8Hfp0xfN4TheCqDW5AAAAAAAAsCC3DKHnYjVungZtE5stOLZJ0F8R9HWcAn2eCKHxsXfy58c4eh6/fiOGAgAAAAAAwALdIoTmeDg1EbpLK3QPYV1uXIl7TQB9Ts/beUlvt3NKsbbJMRQAAAAAAACYuVuvxu1F0O0YGTdpWvQ9hMtqgvNSCM0BNJ7X8fkxfD+VTRFyBVEAAAAAAACYsVuvxh1SDD2OEfQjTYK2e0Gf072hT2F9bnUnaC+EtgD6Op4v47//EUJonATdpDOEyVARFAAAAAAAAGbu1hOhQwqhm3EiNL6vBdJ4b+g+BdBdEUNjFH0Oj1UEfR/PoViJGyNonlSNsVYQBQAAAAAAgJm6VQiduic0v3Ycz27ibFMM3aUQ+tQJoV/GCdP3NA06hPAZ/+32dpxmHURQAAAAAAAAmLd73BHa5Ds5cwjdphi5LV7LsbSaDI0h9OeFCJrj6m78mK0pUAAAAAAAAFiOW98RuunE0HM42xBCt2lFbX4thtEcQ/NU6GuIoIfwtbcTd462IBq/P+txAQAAAAAAYObuMREaQ+IQ7grNd4dWZ1vc35mnRasY+hLuBD2Gr90+pwXTFk0PYTL1FKZCAQAAAAAAgAW4dQhtzsXbm/DYYmn1vBdI84Roi6HPYQr0mCZB98X63Lw695QmQk2CAgAAAAAAwMzdI4RWU6HV+2JszK9dG0T3YwA9hKC5Ce97HuNnC6DvxTTo+cL3CQAAAAAAAMzMvSdC852h+X1RL4z2guguTXUOIYK2Vbhv43lP94ceOhOhAAAAAAAAwALcK4Q2nwmi8f05iuYwui0i5iatw31PAbStwz2Ez63W4gIAAAAAAAAzd+8Q2uTAuJl431Cs180hNIfLNgn6UZw4AdoiqLW4AAAAAAAAsGBzCaHZ1ORlNSF6DgF0kyZMj+MkaIydhxRAj51VuOfiawEAAAAAAAAzN9cQOqWKktVq3WGMmpsQOI9p7e2piKC9dbhiKAAAAAAAACzEEkNopXfXaAuZp/Q8nxw+e/eBiqEAAAAAAACwANuV/ZLy9Gae6LzmVJ8vgAIAAAAAAMCCrC2ERtVkaC9wWoELAAAAAAAAK7LGEHopZOb352AKAAAAAAAALNyaJ0KvIYICAAAAAADACj1qCHXvJwAAAAAAAKzYo0+EAgAAAAAAACskhAIAAAAAAACrI4QCAAAAAAAAqyOEAgAAAAAAAKsjhAIAAAAAAACrI4QCAAAAAAAAqyOEAgAAAAAAAKvzqCF0Mx4AAAAAAABghR59InTTeQ4AAAAAAAAs2BpD6KWgmd8vhgIAAAAAAMDKrHkiNAfOuA6393b+PAAAAAAAAGCB1hZCc8zsxc+pU32+OAoAAAAAAAALsl/JL6s3/dnONj3PpxdGp74OAAAAAAAAMFNLDKG9GFlNcebgueu8ll+vgqgICgAAAAAAAAsx1xB6TXTMU6BDJ4K20LkPj/HsihgqggIAAAAAAMCCzSWEToXGSytqq3tAYwSN0fOpOPsUSePkaLUiVxQFAAAAAACAmbt3CK2mOq95u5oAzdOgbcqzxc+XdJ7DaR8TY+jUmlwAAAAAAABgxu4VQntRs3rsva8XQPM06NMYPF+L0+Joi6J5QjTHUAAAAAAAAGAB7hFCL621rV6r3j8VQLchaD6HEPplGIav4XwZz2v4uH26M9R6XAAAAAAAAFiYe0+EVkHzUvDMz3ME3RV3gr6MsfNX/Pw2DMNv4+O3Tgx96kyEmgwFAAAAAACABbh1CK2mQauguSmeV6/FCdBeBH1OIfTrGEL/EYJoC6EvYT3uroihAAAAAAAAwALcMoRWU6Dbzlrb/Fh9TIyfOYLuUwR9Catxv4Wp0BZCv6ap0Kd0T2g1DSqMAgAAAAAAwEzdYyK0d6/nLsTHfRE5d2lKs/qcOAnaC6Ffw4rcb2kq9CWF0LwaFwAAAAAAAFiAW4XQHBFjDM0RMz7mkyNp9TFPIWbmEBpj6JcwDfo1rMZ9Tl9jU0yzAgAAAAAAADN264nQoZgIbQEzxsvnFDRzIK3W4FbToM8TMfRL8TxOhOb7Qa3FBQAAAAAAgIW49R2heTVum7ps8TIGy5cQMZ9T5OxNkPZCaIyh+Wvkr/WUVvBajwsAAAAAAAALc687QrdpLW4Ll9XEZoyXT+kOz0shtDcdmiNpnjzdhxBarfUFAAAAAAAAZuwWIXTqftAYQ1ukbHd4fktB9LWIltcE0Xzy5+f7SPM06MY0KAAAAAAAACzLPVbjxud5IrSF0G/p5OnQXgjNK3Onnlfxs7cON37fAAAAAAAAwMzdejXucMVE6Os4EfpbOF9TDG3htIqa+/Bvxue7FD336Z7SXgAVQQEAAAAAAGBhbhVCN+n5NfeExhj6LcTQl3RPaBU8e2ebome8B7QKoOInAAAAAAAALNCtJ0LzatwWJPfFVGi8K/S3cGfoS7rnszfdWQXPbfq6vQCav1cAAAAAAABgQe65GneTIuU+xM2XNBn6bfj9XaFxIrQXPzfFutve1GdvBa4ICgAAAAAAAAt0yxBarcdtJ66yfQprcmMQ/TIRQredOz6nwucggAIAAAAAAMA63WMiNMpTm1UMfQ7rcF+KO0IvTX0OF1beCqAAAAAAAACwMvdajTsUE5rbNBm6DydG0Xb2KYReWnU7FTwFUAAAAAAAAFiRe0+ENjmIxgnRfSeO5rW4f+SuTwEUAAAAAAAAAQut4wAAIABJREFUVujWIbSa0qwmRPOdn7viLtD4Wo6gQydyCp8AAAAAAADwAO45EZqjZXXy3Z/5PtDeOtzqawAAAAAAAAAPYi6rcaPePZ/XnEH8BAAAAAAAALYz+wlUq20vBdH8sQAAAAAAAMCDm1sIndKLnOInAAAAAAAA8DtzDKHVVCgAAAAAAADA1ZY0EXqJaAoAAAAAAAD82xJC6EbkBAAAAAAAAD5jTROhAAAAAAAAAP8mhAIAAAAAAACrI4QCAAAAAAAAqyOEAgAAAAAAAKsjhAIAAAAAAACrI4QCAAAAAAAAqyOEAgAAAAAAAKsjhAIAAAAAAACrI4QCAAAAAAAAqyOEAgAAAAAAAKsjhAIAAAAAAACrI4QCAAAAAAAAqyOEAgAAAAAAAKsjhAIAAAAAAACrI4QCAAAAAAAAqyOEAgAAAAAAAKsjhAIAAAAAAACrI4QCAAAAAAAAqyOEAgAAAAAAAKsjhAIAAAAAAACrs5QQep7B9wAAAAAAAAAsxBJCqAgKAAAAAAAAfMocQ+i58/wznwcAAAAAAAA8MHeEAgAAAAAAAKsz5xCaJ0Mvnfw5AAAAAAAAwIOaWwjNQfNcPD9fWJ+b3w8AAAAAAAA8mP0d/7u9gFmdU+e1zRhz87+16bwGAAAAAAAAPIBbh9Bq4nPorME9pXMcfv94SnFz04mdm/Dv5tcAAAAAAACAFbrnRGjTC58tfsZzGL/nQwqc5xBCYxDdhPcN6bX4NgAAAAAAALAi9wih1fRnjKEtfB7Gx490diFensa3t+PJMTQG0d60qCgKAAAAAAAAK3PvO0KradAWQQ8hgL6PZ58i6D6F0G24N7SKojmODun5uXgfAAAAAAAAsDD3CqFVBM0B9Ff4fBvPc4ig7XOeQgjNMbSKolNxtBFEAQAAAAAAYAVuGULPxWMVQmME/TlG0F2IoG1dbguhMYa2INoLo5fiaBODqBgKAAAAAAAAC3PridAYQ3sRtAXQH2PsjBH0MEbS5/F9cSo0B9EqjF4KpFUQFUMBAAAAAABgYW4VQs9pyjKG0N4kaIygpxBBX8b3PYeJ0H2aDs3Pq0DaW6nbJkUbMRQAAAAAAAAW5p53hOZp0BZB25Tntoigr2MAzROh7Vx6uxdL2zmHCGoyFAAAAAAAABbq1neETq3EbWtxdyGCnsP7f47ToDGCPqUAGh/zqV6vAulu/H636fsXQwEAAAAAAGAhbhFCczzMa3GPYS3utoigbVI0T4LmENo78fOeO2+fwvcVVdOhAAAAAAAAwMzdejVuNRV6SAF0EyJpC6Q/072g10yAPhfnJZ1DiLFTMbS9ZioUAAAAAAAAFuDWq3E3KYYex9B4SJOgLU7me0N7d37G91fTny2AvobHL2NobTH0nILnEMJsjKMiKAAAAAAAAMzcPSZCh3H6skXGQ4iL53R36NMYQvMdnvvwuO9MheYI+jLGzxhBPzoRtHfi/0MQBQAAAAAAgJm6VQit7gk9pcnLfHfoR4qfvdM+Jq/JjROhr+P5MQzD13HStE2DnooIug0nRttBAAUAAAAAAID5u9dE6BCi5zAGybgu9xCi5zY8xpPDaDUdmtfifhknTN9TBN10/t349c7uCAUAAAAAAIBluNcdoUOIoOc0DboNd4fGsyme71K8rGJoDKFvxSToZuLf2IePO4ugAAAAAAAAsAy3ngiN8nrcGEI34TE/3wz/HUbzJGeMoW0q9C3cCdoi7CZ8fF6pexzPPt0hOoTvVxQFAAAAAACAGbrHatxNZzp0k94XY+XU6a3MbTH0eQygMYKeQwSNsfQ9fOwhfPxp/FhToQAAAAAAALAA95gIzRE0vtYCY3y89Fo1IRpj6CFEzfY1t2EKNK7Nfe9E0DwRKoYCAAAAAADAjN1rNe45rcTNr7fXYmzMz3MM3RQx9BhOL4L+vDKC5tW4AAAAAAAAwEzd+47QoQiivUiaJzB7k6JtOvQUzhDetwsRtAXQaiXuMdxbGr83AAAAAAAAYObuGUKbKnZWwbEXTnMQPY3B85zu9Ix3gn6kc0gB9DQRQa3FBQAAAAAAgJmbQwiNqgCao2P+mGqdbl5lexgjaAuecfqziqAnk6AAAAAAAACwXHMLoZVLEXLT+ZhTmAQ9pftCj0X47N0LKoYCAAAAAADAwiwhhF6SV+vGt9ua3FMx6Vm9luNnJoYCAAAAAADAAmxX9kuqpjdz4Dx3wmee/jQNCgAAAAAAAAu1thAa9SY8ewG0Fz1FUAAAAAAAAFiYNYbQqbW21drbHEkBAAAAAACAhVvzROg1hE8AAAAAAABYoUcOoVbgAgAAAAAAwEo9aggVPQEAAAAAAGDFHn01LgAAAAAAALBCQigAAAAAAACwOkIoAAAAAAAAsDpCKAAAAAAAALA6QigAAAAAAACwOkIoAAAAAAAAsDqPGkI3M/geAAAAAAAAgL/JI0+EblIQFUcBAAAAAABgJazGBQAAAAAAAFZnjSG0muzcXHF6nwsAAAAAAAAszJonQjed9bfVqd43FJ8PAAAAAAAALMB+Rb+kS8FzOxFC8/uqfw8AAAAAAABYiCWH0N4K3KGInPHsJt7uTYsOpkMBAAAAAABgOeYeQq8Jj3mCswqgu3T24cT3bVMUvfZ7AAAAAAAAAGZkTiH0UnDM7+9Na25SAI3R8ymcSzE0r8wFAAAAAAAAFmIOIXQqcE69Xa3BjdOguxBCn4vzMr6W4+jUqtzq+wEAAAAAAABm5p4hNE90fva1PAFaRdDdGDh/Bc/XdF7SyTF0V0yEiqAAAAAAAACwAPcKoVNrba99vkkRNN8JGtfhthD6dTxfwuNrMR3amwwFAAAAAAAAFuAeIfSa1bYxcFYfk+/w3IZwme8FbWtwX8fw+W0Yht/GxxZG27TocxFCrccFAAAAAACAhbl1CK0iaBU182tTH5dX4e7CJOhTCKFfUghtJ8bQOBlqPS4AAAAAAAAs1D3vCK2C5jZNd146vSnQuBI33g/aQmiMod/Smtzn8G/sisnUoXgOAAAAAAAAzMgtQ2i15jaHz30x3bkrVt9WH79Pk6BxGjROhLYJ0N9CEO1NhG7ThCoAAAAAAACwAPdYjZtDaA6Z+3BP5z68L6++rQJoXokbQ+hrEUPjPaFfUgi9dE8oAAAAAAAAMFO3CqF5pWyeBs0B8ykFyacUSnvhNEfQGENf04rcGEVfQwh9SqE13xEKAAAAAAAAzNw9JkKHFEF3nQnOl/BaXHebw2gVQadiaI6iL2kt7vMV06CiKAAAAAAAAMzYPe8I3YZ7Plu4fC3OS1pZW0XRp/TvTE2GVo/PaQJ1n+4IFT4BAAAAAABgQe55R+g2rbhtgfJLuLPzS1hZ+xJW1+a1ufl5ng7tTYvmqNpbiWsaFAAAAAAAABbkFiE0h8N8P+guTYS2EPptPC2G5vW1U1Oh1crc6n353tFd+L42xf2gIigAAAAAAAAswK1X4+aTV+O2+zp/hdDfxpNj6HO6y7OKmr2zK8LnLq3B3aYICgAAAAAAACzMrVfjNps0EZrvCY1Tof8IMTRPhVbBc9cJnVX4zPeA9tbhDqIoAAAAAAAALMetQmhcLVvdE7pLU6F5Pe5v4d7Q13RH6NSEZzXtmU9vBa4ICgAAAAAAAAt1j4nQTYqP22Iq9GXivtAqhOYJz96q223x9QVQAAAAAAAAWJlb3xGabSdW5MYY+mViIvTSHZ/VutsqgObvUQQFAAAAAACAhbrnHaF5RW6cDM1B9CWE0RhCexF0at3tVPys3gYAAAAAAAAW5l4hdCgCZZ4MbTG0BdF8cgj9sxOfAigAAAAAAACsxL3uCI3PN2miMwbRGEWr0z7mmvhZhU7xEwAAAAAAAFbonhOhTTUZuknTnruJE1fiDhemPnuvAQAAAAAAACty6xB6aVqzut8zT4tWp5oErb4uAAAAAAAA8ADmcEdofjtH0U0nivbuA63+bQAAAAAAAOCBzGE1bjQVQXvh9NJrAAAAAAAAwIPZLui/W0XRXiQFAAAAAAAAHtgcQ6ioCQAAAAAAAPwpc58I/UwUFVABAAAAAACAf1vCalyBEwAAAAAAAPiUpdwRKoYCAAAAAAAAV1tKCAUAAAAAAAC4mhAKAAAAAAAArI4QCgAAAAAAAKyOEAoAAAAAAACsjhAKAAAAAAAArI4QCgAAAAAAAKyOEAoAAAAAAACsjhAKAAAAAAAArI4QCgAAAAAAAKyOEAoAAAAAAACsjhAKAAAAAAAArI4QCgAAAAAAAKyOEAoAAAAAAACsjhAKAAAAAAAArI4QCgAAAAAAAKyOEAoAAAAAAACsjhAKAAAAAAAArI4QCgAAAAAAAKyOEAoAAAAAAACszlJC6HkG3wMAAAAAAACwEEsIoSIoAAAAAAAA8ClzD6GfiaCCKQAAAAAAAPBvcwyhgiYAAAAAAADwpyzljtBhDKTxxNcBAAAAAAAA/r+5hdAqcJ47sfOcPmbqYwEAAAAAAIAHsp/hfzVPfl5zmk34N/JrAAAAAAAAwIO4VwjNK257sfMUHqvTIuc2/DsxfG6KCVFhFAAAAAAAAFbu1iG0t+J2KAJoO8fwGM8mTYC2GLrpxE7TogAAAAAAAPAg5rIatxdA2zmkE+823Y7nVMTQTXj7nN4eRFEAAAAAAABYp3uE0GsmQFv4/Ajnffx+4xrcXx+/CzF0Ex6rc74iigqiAAAAAAAAsHD3vCN0SBE0T3+2+Pk2nv0YPYfw8e21XQqhVRTdFlOi+T7RQRAFAAAAAACA5btlCM33g/YmQXMA/TkMw1OYBI0fm0NonA6tThVFN2lKNAZRMRQAAAAAAAAW6F6rcVsEPU9E0F8B9Edah9s+7nmMo/sUQ3MUnQqkm+JxSEHUdCgAAAAAAAAs0K1C6DmFxXMRQQ8pgj4Xk6AtlOYQmoNoFUerUNqi6DmF0cZ0KAAAAAAAACzQPSdCcwh9DyH0RwiV5/FjPsb3PYcQWsXQHEart3tx9JymRJuNGAoAAAAAAADLces7QqsIGtfivoVQ2aJjjKAvKYTuUwzNr/Ue48fnOHoeH0/FhCgAAAAAAACwALcIoXmSspoGbStvdyE+nsM63BZBX8Ik6FMndFbnOb3W3j6Mj6fx81sEHcJEaHs0FQoAAAAAAAALcevVuDGCnkIM/UgRdBjfd0h3huaVuL0Q+hwe2/M4TZqfH8fn53CP6ZDuNR3EUAAAAAAAAFiGe94RGidC452c5xBB472gU6tw8zRoDKEv4bGd1/G0CPpSRNAhBE8rcgEAAAAAAGBBbn1H6JDW3h7Htzfh9RxCc/Dchzs9q7tBn4op0BhAv4xx9X18fhy/XhVBt+n7GkyFAgAAAAAAwPzdKoTGcNhC5zC+dizedwz3hsbwuQsBdJdiaDUVmiPo67hm9+v47x9SBN2EALoNIVT8BAAAAAAAgAW5xx2h8fmpeLuF0F1xtuG1bYqivRjamwY9jF/nHCJnjqDx5KlQAAAAAAAAYKZuvRp3E2JiFULba9sQO3snh9FeDI0htEXQj7ASdxi/rzxtug9h9iR+AgAAAAAAwHLceiI0akH0FCLoOUxlHtM9ndVjFUTjqty4HjdH0Pi1qoh6CFE0xttN8RwAAAAAAACYkXusxs1TofEOzvb2KbzeO9uhH0Rz1Hwp1uEO4ePjGt33EFCPKdQO7goFAAAAAACA+bvHRGiMoZt0b+gxRc+h8zyfvD43x9CPMYKe0iRoDKBtde5rCKZ5WjV/7wAAAAAAAMAM3Ws1bhVBq8gYY2N+7VIQbTH0UNwHuk33h34ZI+hHiKbHcD/oOX2vAAAAAAAAwIzN4Y7QalVufF/UC6NVDD2mmDmkQPorgP4cV+G+FxG0txYXAAAAAAAAmLl7htAmR888Jdp7X29C9BSC6Cn9G9vx//wcAmgVQfMkqDtCAQAAAAAAYEHmEEKbPG25mXjfMDE9ukmvDyGCHkL0bOHzUEyBtghqLS4AAAAAAAAs0JxCaDYVH3vToy2AbtOdoC1yxuBZvX1KITR/DQAAAAAAAGAB5hxCp1RxMk6BnsYYek7Tne1U4bNahZtDqygKAAAAAAAAC7Bd0S+pFy7PE+tu8/vyXaBD8RwAAAAAAACYuaVOhF4SY2Yvjlbhs/caAAAAAAAAsCBrmghtqnDZC6BTU6AAAAAAAADAQq0xhAIAAAAAAAAP7pFDaLU2FwAAAAAAAFiBRw2hoicAAAAAAACsmNW4AAAAAAAAwOoIoQAAAAAAAMDqCKEAAAAAAADA6gihAAAAAAAAwOoIoQAAAAAAAMDqCKEAAAAAAADA6jxqCN3M4HsAAAAAAAAA/iaPPBGaY6g4CgAAAAAAACvx6KtxxU8AAAAAAABYoTWG0Etxc2oSVBgFAAAAAACAFVjzROjmD5zBylwAAAAAAABYvrWF0KmYGc92IpLmj6/+PQAAAAAAAGDG9iv45UxFz23nVO+rguilrwUAAAAAAADM0FJC6Gfu/ZyKoLvixPdNRVERFAAAAAAAABZibiH02tiYw2d+rOLnPpyn9PY+fFyeEv3M9wUAAAAAAADMwBxC6GfW0F4KoHEaNAbQp+I8h9eqGLrpxFBRFAAAAAAAAGbu3iG0CpvXPK/iZ16J26Jmi54vnfNcRNH2ub0YCgAAAAAAAMzYvULoNZOdvfcNFwJoNQ36K3S+DsPwZRiGr+Pjl/G11+H/gmgModV9oQAAAAAAAMAC3COETkXN/Pal922viKBPY+iMIfTb+Pg1BNFrYmj+PwAAAAAAAAAzdO+J0Bw0p5733r8N0TJG0H1ai9umQH9F0N/G8y3E0JfOitz2NQaToQAAAAAAALAMtw6heaqymujMZ5MmM/P7YwTdpwj6FO4FfQ1ToL8i6D9CDP2SYmi+J7QKoIIoAAAAAAAAzNQtQ2hvCrSa6NwVr/fiZ54CjRH0uRNC81Tot7AiN67HdU8oAAAAAAAALNA9JkLzmtsYMmPQ3KXJzKkTA+g+xMznEEFfixj6bWI9blyNm+8pBQAAAAAAAGbsViG0Wivbu9PzKd3T+VSE0RxN9+njn9N5DfeEvobw+TU8f00ToXkK1UQoAAAAAAAALMS9JkLzWtx9ES+fQ5SMYbSKnzmiPof7QfN63Hi+pLefiztCt+4HBQAAAAAAgGW59x2huzTFGYPlS4qTz51J0aeJEBo/9+XCeU5hNa/FNREKAAAAAAAAC3HPO0K3IYbGEPolndcQMJ86QXQqhlarcnNcfS7W8FYhdBBDAQAAAAAAYP5uEUKrtbJ5IrStxm3rar+l+zu/hBjai5fXxNHq7NMUaBVBAQAAAAAAgAW59WrcOFWZJ0KfwkTorwD62xhEvxUxtAqh1b2hU6/tQ4iN8XM7sRJXFAUAAAAAAIAFuPVq3CFE0E0xEdruBf06BtB/pBj6mqZCq8C5mwid1dRnFUC34XsVQQEAAAAAAGBhbhVCN+n5JsXHfbontIqhX8NUaA6hVeTsBc8cPrcpzlbxUwQFAAAAAACABbn1RGgOots0rfkUQuiXcE/obyGEvo4h9LkTP6vYuSviaxU/q/ApggIAAAAAAMDC3PqO0KEIj9sUQvNkaLsf9FsKoXEtbo6fm07wrMLn1PpbERQAAAAAAAAW6B53hA5FCI2Tm09h4rPF0NcQRXMIre74vDZ6CqAAAAAAAACwQvcKoUNnKjSvyY3TofG0EBrX4U7d89m781MABQAAAAAAgBW6RwjN929eCqL7FEafirW4l+76nLrzU/wEAAAAAACAlbnnRGh0TRDddV7LIXS4ED4vvQ4AAAAAAAAs3K1DaDWpWUXQ6v7QHEfz+y7FT+ETAAAAAAAA/hrn8czWve8IzW9XQbR3/2dvHW7v3wcAAAAAAAAexFxW4zbXTIzmFbgCKAAAAAAAAPA72xn/OKpVt9eEUQAAAAAAAOA24nrcWa3KnXMIzUROAAAAAAAA4CpLCqEAAAAAAADA/eXJz0tToXeZFF1SCJ3VKC0AAAAAAACs1N/R5c7p8W93zxB6qQbHH0Z+3nsbAAAAAAAA+Htc0+2q53dx6xCa/8NT4fOa0/v3AQAAAAAAgL/OVIfLXS++fjf7Gfzye+X41zl1nvd+mJvibQAAAAAAAODzettZp5rd1EbXm4bRe4TQ3n/6NHGOw+8f22stdObJ1k34dwdBFAAAAAAAAP60z252nQqpf7t7ToRWP5AYOds5FI+7MW7G4LkNr53D+zaCKAAAAAAAAPwp11xz2dvwOtwqfka3DKG9+0B78fOjc3ZpArRF0BxDsxxIAQAAAAAAgOv1hhynAuhwr7tC77kaN/+QWgSNAfR9PG/DMDyN3+82RM3T+FqLo9sUQzcpmpoOBQAAAAAAgMtyyJyaAp06vTW5f3scvXUIvTQJGgPo23h+DsPwHCLoED7vaXzchbNN59y5Q1QQBQAAAAAAgGm9IHopfvamQ2/mViH0nO7zzD+gQ1iH+x4C6I8wCRo/v63PbYF0HyZDWzCNUbRam7spvjcAAAAAAADgP/I053DlFOgsgui9VuPmidBDWIPbAujzGEF3IWaeQjB9DmcfgmkvisYYWq3LFUMBAAAAAACgdk5xM0fPYxFBT48wETqk/2SOoC1uxlW4LYJu0hRo+7iX8TyHj49nP37Ofvz8GEOHYjpUDAUAAAAAAODR5Wh56U7QYzpTMfSmk6G3CKE5MMb/YLwbtK3EfUr3gZ7T1OivUPo6nhZCX9KEaIyj7Qe9D/eInsPa3Ma9oQAAAAAAAPAfVbzMIfRYPB7TdOhU/Pxbg+itV+P27gdtIXQX1tcO4eOqCPoapkKnzjEE0Tgd2uQYOhTxFgAAAAAAAB7VOU13VpOgOYo+1B2h5zB1eU6rcbfhbMLH5Qj6cwyeMYS+ptfa+Qhrd1+KH/gQHsVQAAAAAAAA+I8YLHMEzdFzajVu7HPVv/23usdE6DD+hzfjD2MbYmiMkHEd7tsYN3+kSdAYQb+Mpz1/H2NoC6LHojzvw9fbpvtDBzEUAAAAAACAB3XNWtxj6HCHK1bjrnIitLontMXQQ/GxcVr0I0yExjtBeyH06xhO34sI2ivPUY6hAAAAAAAA8IguRdBeDL0UQW8SRO81ETqEH9hQ3Al6Cmtt20To83jX53MRQ9u0aIugOYQeUn2uCnb8WcQYaioUAAAAAACAR1AFyt7doIfU4fJEaO5yN3evO0KHEEGH8QeTi3L7ge3HqPk0Po9BNMfQdo9oL4TmCJq1n0cMn2IoAAAAAAAAj6S3Frd3N2hvLe7UZOjfHkfvMREapz/PKYi21+IPbTcGzd34/T6F06ZDWwhtATTfDzo1hhu1720TpkIHMRQAAAAAAIAHkTe85tW4eRo0n6ktrTd16xAaf2ibcE/okH6I2/AYQ2iLofsUQ9/SStwYQj/zw86hUwwFAAAAAADg0VTToHkStAXQ6qrKPKDY3DSG3iOE5hW5Qwii8X0thB7Hx20Io3Fd7vsYQz/SmRrBnZoEza9tRVAAAAAAAABWLvezXgSdmgbNW1ovXVv5t7r3ROgQ/tPttU0xMboNj9uwMvdQBNCpCHrpB7xJZygiqCAKAAAAAADAWvXuB61i6EdnLW7c1nq3qdB7hdAh/CfzdGgMokMniB5DCN1P/HB794LGr7dJkTXH0DgZOpgOBQAAAAAAYKVys5taiXtIQ4vXTITGAcm/3T1DaDMVRIcUI+P9ofH5sfhFnDo/5CFFzm163HSCaI6nAAAAAAAAsDZT06A5fuYIeigmQu+yFneYSQhtekF0SHeHxrW52yJ4ntKo7an4WjmEVqc3FWpFLgAAAAAAAGtyzf2geR3uR3qeI2i+uvJh7gidkicv8x2i+S7RqkpP1eUcQXchgu4uRNE8VSqGAgAAAAAAsAaX7gX9KyZCbxpD5xhCo14UHYop0eoMxQ+0iqC7ztkWq3OtyAUAAAAAAGCtPrMW9z3F0N5E6F1i6NxDaDS1OndqCjRObeYI2s4+PO7T+6rJ0MGKXAAAAAAAAFYgDyKeU8isIuh7iqAfaSI0R9C7WFIIbaogeg73heaPG1K8rCJo7+zS5GgMqef0bwMAAAAAAMBSVatxexG0txo3rtHN/97NLTGENvnO0FMRJatJ0G2KoTmCPo1nnyZEtyG25vtBTYUCAAAAAACwVHH4sLoftFqJm6dCq9W4edr0ppYcQocUQ5tT8XHXTIS2APrcCaG7YjLUVCgAAAAAAABLVa3FPRcR9FAE0BxB26nuBr35/aDDCkLo0FmVG2PoZmIitAqg8TFH0RhCt6ZCAQAAAAAAWIEcQfP9oL1p0BhED3NaizusJIQ2eTo01uohhdDeJOiv85IiaFyVG6dCT6ZCAQAAAAAAWLiptbjV/aDXrsXNq3Fvbk0hdEhTmacQLIdiKnTXmQqNQfRlYlXuyVQoAAAAAAAAC3VpLe41EfQ9rcXN94PedSp0bSG0idOhLYQex3D5MT6+pQj6FOLnSwqh7XykFbmmQgEAAAAAAFiqHCtPxf2gMYK+jac3EZojaHTzGLrGEJpX5A6pXm/CRGiMoc8pgL6OJ0+GPoVpUlOhAAAAAAAALFk1DZrvBn1PATTH0KmJ0Lt5hInQIU2FbsIvbpdC6I8QQb8XMfQ9rMk9mgoFAAAAAABggeK9oEOaBj1NrMStJkJbBM13g951Le6w4hA6FDE0VuxtCKHtl/YzTIW2CPojxNC3sCL3yV2hAAAAAAAALFhsaPlu0GvW4sbVuMcwDTqLtbjDykPoUMTJXgyNU6E/xwD6I4TQL2Eq9MNdoQAAAAAAACxUvl6yuhs0T4PGCPpWTIPObi3uMEa8RxB/ibloH9Ju458phrbn8Recf6HVaO/df7kAAAAAAABQyPeCnlI/qyJobyL02Imgd4+hjxBCq7He6qLXHEJzDP1ZFO78Sx0EUAAAAAAAAGaqmgY9T0yD5gj61pkInd1a3OHBJkLj86pq5xj6I0XRXLl7Y7756wEAAAC/FKC3AAALkklEQVQAAMBc5InN1rkOnW2qb51W9hFi6Glua3GHBwqhTfWLjXU7j/j+7MTQ3sWvpyK6AgAAAAAAwL1dezdo1cuqGBo3qFbXSboj9IZ6U6GnC3eF5hD6vpRfLgAAAAAAAAS9ocHeJGhvIrRai1tNg7oj9MbyL/jY+QXnIFrtPc7jviIoAAAAAAAAc3NpGnSqkVXXSPa2p86qkT3iatz4/FTU7s+W7mPnntDqawIAAAAAAMA9XJoGrSLoj/Hk7akfxTTo7IYGH3EidAg//F7tvuYC2OqXnP+ARFAAAAAAAADuqTcN2luJW10fOXWF5CzX4g4PvBp3KIr31C88T4jm1bi9e0IBAAAAAADgXnpd7BhObyXujzQR2jrZ1FrcWTWyR50IHYpf/Cn9wvMvPYfQ9xBND8XYb/W1AAAAAAAA4Jaq4cBT0cR+XhFB4zRotTW1sRr3jqoIeroQQ/N06DUToQIoAAAAAAAA95DD5Ck8VhtS30L8/N6JoVNrcYe5tbFHnghtLq3HzSty38NrVQjN1VsMBQAAAAAA4Jaqlbjn0LSqe0FzBP0eIujPYi1u7mKza2OPHkLzLz9PhR6KqdD3dEdojqEiKAAAAAAAAHNQ3Q3aBgLfw0rcHymEfr9iGvQ49y2p7gj9/dsxhuap0BxEPzo7kKs9yNXXAwAAAAAAgL9aNQ3aGwSMd4J+L87PIoT2NqXOroU9+kRo05sIPXZi6KXVuO4KBQAAAAAA4NY+E0Grlbj/KiZC8zRoHBDMHWxWTWw/g+/h3vIfxKmYCj1MRNBDEUMFUAAAAAAAAO6hdzVkFUF706CX1uIuYijw0SdCp9bjVlOheTq0txpXDAUAAAAAAOCW8mTmqbgXNIfQ72ES9F9pIrRF0LcigsYeFr/mrDx6CI2m6nh1X2h87VhMhJ46XwMAAAAAAAD+StVK3PPEvaA/UgStJkKradDeROgsCaH/MVXIj6mU5yharcZ1RygAAAAAAAC38EfvBe1Ng/4Ia3OradCqgVmNO1O9Qn4qgmgVQC+txh3Cvw8AAAAAAAB/lV4EjStxr42g/0oTob27QWe/ErcRQn+viqFTE6F5GrRXwkVQAAAAAAAA/kqXImjrW+9pJe6PCxF08StxGyH0v136Y6kmQav1uL0/AlEUAAAAAACAPyOvpK2G/D6KCJoD6D87a3FzCF3kRlQh9P9U94TmP5heEM33g1ZjwQAAAAAAAPBn5Qiam1a86rE3CfrPFEH/FaZBfxYrcfNa3EU0MCH0Pz57T2hvMrT6I7AeFwAAAAAAgL/CpQgaQ+hbCJvf0xToP1MM7U2DTm1DtRp3oaYulJ2aCD2mP7hFjQcDAAAAAAAwW9dMgsYI+hamQPMkaJ4IjRH0I02DLrZ5CaH/bepi2VMKn4f0mNfimgYFAAAAAADgz7p2EvQ9RdAfKYD+bxFBq2nQRa/EbYTQ36v+iKr1uFUEraZCTYMCAAAAAADwZ+QhviqCtvtA39MkaBVBYwztRdA8DToUj7O392fX1VuPm8t6DqC9qdDo19ub+f2XAQAAAAAAmJFqk+k5dKlDmAR9H4NmL4L+bzER+r24F7RaibuYe0EjIfT/tDiZ/5BORQydOtbiAgAAAAAA8GfkraPV8N7xigj6v8X5Z2cl7kcIq9Xg3+IIoZflO0J7MXRqGjQek6AAAAAAAAD0VKtocwRtwfIj3Qn6vZgC/Z/xxInQfxUrcT86d4Iuchp0EEK7qoBZrcetHnMMBQAAAAAAgEt6U6CfiaB5EvR/irW4eRq0uhc0dy4ToSv02Rg6NQ3amAoFAAAAAACgqYJjblM5gsZ1uD8nImicBp26F/QjbUFdxTWQQuh/i3eFNr0g+pkIajoUAAAAAACAZiqA9iLoRzEJ+uOKCNpC6PdOCO31rkUTQqf1VuRW94b27ggd0uNm+O/nAAAAAAAArF+Oi1UAzVtKpyLo9+Je0P8p1uL2pkHzStxVDfoJodeZiqDnKyZBe9W8vSaIAgAAAAAALNu10bAapOtNgcYI+t6ZBL32XtAfxSTo6u4FjYTQ2qW1uPmPsYqjvftB49txOhQAAAAAAIB1mZoAHToBNN8Hek0E/WeKny2AxgjaQuhUBF38vaCRENpXRczhQgCdmhg9FXePAgAAAAAAsD7XBtBLU6CXImieBv1nsQq3rcONEfQjfK1qJe4qCKG/V93bWa28/aP3hZ7Gf3MjigIAAAAAAKxWb9ju0l2gvQj6M0TQ751p0DgBmiPopXW4q7kXNBJCP2fqDzT/oeY/2k34nI17QQEAAAAAAFZr6hrGqSnQGEHfiknQ78U06D9TBG0B9Ef4/DwJuvoIOgihV7u20Oda3852/ELb8QihAAAAAAAA63TtGtzeKtwYQX+GadDvxTTovzoBNN4H2psEPa05gg5C6EX5l3/tmHIbVd6HCHoSQgEAAAAAAFbts3eBVqtw3yciaJ4I/Vd634+0Cvc9DO5N3Qm6yuschdC+3u7mS4W+/XE+DcOwGz/vNP6sdyGCCqEAAAAAAADrcuk+0BYiD5+IoFUI/d4JoHEKNEfQh1iHGwmhl7Vf/qUx5fZH+RIi6Hn8uKcwHWoiFAAAAAAAYF2mBux6g3a9CPqWIuiPEDtz/IwB9K2zCvchI+gghF6Uq338I80ToO2P8imsw20fl0PoUIRQYRQAAAAAAGD+evEwx8VeBJ3aOJqnQX+mEPrjigB66T7Qh4iggxDadQ5hshpZbpW+/VH9HP8A852gv/7QnsNa3DgRGomgAAAAAAAAy3BNCK360tQ06FtoTtVq3J9F/PzZCaBTq3AfJoIOQuhVqmnQQ9rR/BRi5xAi6M8ihOa1uCIoAAAAAADAMuWgWEXQ3JiqadA4ERpDaA6j8WOmAuivx7iad3i0CDoIoZNiFY9/pPle0B8hcg5hHe5rui90N0bP3mpcAAAAAAAAlqmKjS1CHq8MoTmGVmdqAvThV+FmQuh/O6dIWY0tt4nQfYqgp/C+H2kadBemQUVQAAAAAACAdalW415zP2gVQ9875yN8/jUB9GEj6CCEXtS7H/SjuO/zFKZBWwR9CveGuh8UAAAAAABgXf7IatxjCpoxhn6kic8qfvYC6KkTPx8ygg5C6KQ2Gdr+SDfhD3Sb1tyewx/tW5gE7U2Dip8AAAAAAADrEWPjVAg9phW5h04UzeHzkD7/ODEB+vABtBFCp+UR5jj1GSdB40rctxBB92kSVAQFAAAAAABYr6otTcXQHEUP6fVe/Lx0D+jDR9BBCO2q7gmNU6Hx9fa+j3EV7lu6OzSvxBVCAQAAAAAA1ql3T2gcuMtBNIfRY/q4Kn721uDm5w9NCJ2W/2hO6aPjH+1ujKE7ERQAAAAAAOBh9WJodXLwrMLnVPwUQCcIoX3xjtBhIoLmELotImgMoGIoAAAAAADAOlUraqvJ0Kk4Wn2sAPoHiHKXbdJE57Z47MXP3r2gfu4AAAAAAADrUcXIKl7muNl7Xp1BAP0cQe6yvNY2B85t53lvHa6fOQAAAAAAwPr0YugwETWvDZ8C6B8gyl0nr7btRdHq/UPxHAAAAAAAgHXKobIXNXvrbnvRUwD9JHHuc6rp0OpxmPjZ+pkDAAAAAACsz1SorILmtcFTAP2DRLnPm1p1W/08/YwBAAAAAAAez9Sq3D/yGp8k0v1xUz87P1cAAAAAAACGKyc6hc+/gWD31/GzBAAAAAAA4BLREwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4P+1Bwc0AAAACIPeP7WbOQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgqgFCo1UkC8gdYgAAAABJRU5ErkJggg=="
  })
], -1);
const _hoisted_2$o = /* @__PURE__ */ createVNode("path", {
  class: "cls-1",
  d: "M1700.4,795.21h45.72c35.89,0,65-43.61,65-97.41V114.88c0-53.8-29.1-97.41-65-97.41H80.73v1.58c0,41-19.23,74.3-42.95,74.3h-.92v25.33c0,.08,.06,.12,.09,0,1.27-2.34,3.23-3.55,5.34-2.48s23.25,5,23.25,9v33.55c0,4-21,7.89-23.25,9s-4.07-.13-5.34-2.48c0-.06-.09,0-.09,.06v58c0,.09,.06,.12,.09,.06,1.27-2.34,3.23-3.55,5.34-2.48s23.25,5,23.25,9v33.53c0,4-21,7.88-23.25,9s-4.07-.14-5.34-2.48c0-.06-.09,0-.09,.06v58c0,.09,.06,.12,.09,.06,1.27-2.34,3.23-3.55,5.34-2.48s23.25,5,23.25,9v33.53c0,4-21,7.88-23.25,9s-4.07-.14-5.34-2.48c0-.07-.09,0-.09,.06v58c0,.08,.06,.12,.09,.06,1.27-2.35,3.23-3.56,5.34-2.49s23.25,5,23.25,9v33.54c0,4-21,7.88-23.25,9s-4.07-.14-5.34-2.49c0-.06-.09,0-.09,.06v58c0,.09,.06,.13,.09,.06,1.27-2.34,3.23-3.55,5.34-2.48s23.25,5,23.25,9v33.54c0,4-21,7.88-23.25,9s-4.07-.14-5.34-2.49c0-.06-.09,0-.09,.06v58c0,.09,.06,.12,.09,.06,1.27-2.34,3.23-3.55,5.34-2.48s23.25,5,23.25,9v33.53c0,4-21,7.88-23.25,9s-4.07-.14-5.34-2.48c0-.06-.09,0-.09,.06v30.42h.92c23.72,0,42.95,33.27,42.95,74.3v1.58l1619.67,.14Z"
}, null, -1);
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    id: "_\u0421\u043B\u043E\u0439_1",
    "data-name": "\u0421\u043B\u043E\u0439 1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    viewBox: "0 0 1857 841",
    style: [`
      fill: ${$props.color} !important;
      width: 100% !important;
      height: 100% !important;
    `, { "fill": "white", "position": "absolute", "z-index": "0", "left": "0", "top": "0" }]
  }, [
    _hoisted_1$o,
    _hoisted_2$o
  ], 4);
}
var Coupon = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p]]);
function toInteger$1(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
function requiredArgs$1(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}
function _typeof$2(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$2 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$2 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$2(obj);
}
function toDate$2(argument) {
  requiredArgs$1(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof$2(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}
function addDays(dirtyDate, dirtyAmount) {
  requiredArgs$1(2, arguments);
  var date = toDate$2(dirtyDate);
  var amount = toInteger$1(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  date.setDate(date.getDate() + amount);
  return date;
}
function addMonths(dirtyDate, dirtyAmount) {
  requiredArgs$1(2, arguments);
  var date = toDate$2(dirtyDate);
  var amount = toInteger$1(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  var dayOfMonth = date.getDate();
  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$1 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$1(obj);
}
function add(dirtyDate, duration) {
  requiredArgs$1(2, arguments);
  if (!duration || _typeof$1(duration) !== "object")
    return new Date(NaN);
  var years = duration.years ? toInteger$1(duration.years) : 0;
  var months = duration.months ? toInteger$1(duration.months) : 0;
  var weeks = duration.weeks ? toInteger$1(duration.weeks) : 0;
  var days = duration.days ? toInteger$1(duration.days) : 0;
  var hours = duration.hours ? toInteger$1(duration.hours) : 0;
  var minutes = duration.minutes ? toInteger$1(duration.minutes) : 0;
  var seconds = duration.seconds ? toInteger$1(duration.seconds) : 0;
  var date = toDate$2(dirtyDate);
  var dateWithMonths = months || years ? addMonths(date, months + years * 12) : date;
  var dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;
  var minutesToAdd = minutes + hours * 60;
  var secondsToAdd = seconds + minutesToAdd * 60;
  var msToAdd = secondsToAdd * 1e3;
  var finalDate = new Date(dateWithDays.getTime() + msToAdd);
  return finalDate;
}
function addMilliseconds$1(dirtyDate, dirtyAmount) {
  requiredArgs$1(2, arguments);
  var timestamp = toDate$2(dirtyDate).getTime();
  var amount = toInteger$1(dirtyAmount);
  return new Date(timestamp + amount);
}
var defaultOptions$2 = {};
function getDefaultOptions$1() {
  return defaultOptions$2;
}
function getTimezoneOffsetInMilliseconds$1(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function isDate$1(value) {
  requiredArgs$1(1, arguments);
  return value instanceof Date || _typeof(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
function isValid$1(dirtyDate) {
  requiredArgs$1(1, arguments);
  if (!isDate$1(dirtyDate) && typeof dirtyDate !== "number") {
    return false;
  }
  var date = toDate$2(dirtyDate);
  return !isNaN(Number(date));
}
function subMilliseconds$1(dirtyDate, dirtyAmount) {
  requiredArgs$1(2, arguments);
  var amount = toInteger$1(dirtyAmount);
  return addMilliseconds$1(dirtyDate, -amount);
}
var MILLISECONDS_IN_DAY = 864e5;
function getUTCDayOfYear$1(dirtyDate) {
  requiredArgs$1(1, arguments);
  var date = toDate$2(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}
function startOfUTCISOWeek$1(dirtyDate) {
  requiredArgs$1(1, arguments);
  var weekStartsOn = 1;
  var date = toDate$2(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCISOWeekYear$1(dirtyDate) {
  requiredArgs$1(1, arguments);
  var date = toDate$2(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek$1(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek$1(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCISOWeekYear$1(dirtyDate) {
  requiredArgs$1(1, arguments);
  var year = getUTCISOWeekYear$1(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek$1(fourthOfJanuary);
  return date;
}
var MILLISECONDS_IN_WEEK$1 = 6048e5;
function getUTCISOWeek$1(dirtyDate) {
  requiredArgs$1(1, arguments);
  var date = toDate$2(dirtyDate);
  var diff = startOfUTCISOWeek$1(date).getTime() - startOfUTCISOWeekYear$1(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
}
function startOfUTCWeek$1(dirtyDate, options) {
  var _ref2, _ref22, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs$1(1, arguments);
  var defaultOptions2 = getDefaultOptions$1();
  var weekStartsOn = toInteger$1((_ref2 = (_ref22 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref22 !== void 0 ? _ref22 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate$2(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCWeekYear$1(dirtyDate, options) {
  var _ref2, _ref22, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs$1(1, arguments);
  var date = toDate$2(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions2 = getDefaultOptions$1();
  var firstWeekContainsDate = toInteger$1((_ref2 = (_ref22 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref22 !== void 0 ? _ref22 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek$1(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek$1(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCWeekYear$1(dirtyDate, options) {
  var _ref2, _ref22, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs$1(1, arguments);
  var defaultOptions2 = getDefaultOptions$1();
  var firstWeekContainsDate = toInteger$1((_ref2 = (_ref22 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref22 !== void 0 ? _ref22 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  var year = getUTCWeekYear$1(dirtyDate, options);
  var firstWeek = new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek$1(firstWeek, options);
  return date;
}
var MILLISECONDS_IN_WEEK = 6048e5;
function getUTCWeek$1(dirtyDate, options) {
  requiredArgs$1(1, arguments);
  var date = toDate$2(dirtyDate);
  var diff = startOfUTCWeek$1(date, options).getTime() - startOfUTCWeekYear$1(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
function addLeadingZeros$1(number, targetLength) {
  var sign = number < 0 ? "-" : "";
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return sign + output;
}
var formatters$4 = {
  y: function y(date, token) {
    var signedYear = date.getUTCFullYear();
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros$1(token === "yy" ? year % 100 : year, token.length);
  },
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros$1(month + 1, 2);
  },
  d: function d(date, token) {
    return addLeadingZeros$1(date.getUTCDate(), token.length);
  },
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  h: function h(date, token) {
    return addLeadingZeros$1(date.getUTCHours() % 12 || 12, token.length);
  },
  H: function H(date, token) {
    return addLeadingZeros$1(date.getUTCHours(), token.length);
  },
  m: function m(date, token) {
    return addLeadingZeros$1(date.getUTCMinutes(), token.length);
  },
  s: function s(date, token) {
    return addLeadingZeros$1(date.getUTCSeconds(), token.length);
  },
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros$1(fractionalSeconds, token.length);
  }
};
var formatters$5 = formatters$4;
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters$2 = {
  G: function G(date, token, localize2) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, {
          width: "abbreviated"
        });
      case "GGGGG":
        return localize2.era(era, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return localize2.era(era, {
          width: "wide"
        });
    }
  },
  y: function y2(date, token, localize2) {
    if (token === "yo") {
      var signedYear = date.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, {
        unit: "year"
      });
    }
    return formatters$5.y(date, token);
  },
  Y: function Y(date, token, localize2, options) {
    var signedWeekYear = getUTCWeekYear$1(date, options);
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros$1(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, {
        unit: "year"
      });
    }
    return addLeadingZeros$1(weekYear, token.length);
  },
  R: function R(date, token) {
    var isoWeekYear = getUTCISOWeekYear$1(date);
    return addLeadingZeros$1(isoWeekYear, token.length);
  },
  u: function u2(date, token) {
    var year = date.getUTCFullYear();
    return addLeadingZeros$1(year, token.length);
  },
  Q: function Q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros$1(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  q: function q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros$1(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  M: function M2(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "M":
      case "MM":
        return formatters$5.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  L: function L(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros$1(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  w: function w(date, token, localize2, options) {
    var week = getUTCWeek$1(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, {
        unit: "week"
      });
    }
    return addLeadingZeros$1(week, token.length);
  },
  I: function I(date, token, localize2) {
    var isoWeek = getUTCISOWeek$1(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, {
        unit: "week"
      });
    }
    return addLeadingZeros$1(isoWeek, token.length);
  },
  d: function d2(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getUTCDate(), {
        unit: "date"
      });
    }
    return formatters$5.d(date, token);
  },
  D: function D(date, token, localize2) {
    var dayOfYear = getUTCDayOfYear$1(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, {
        unit: "dayOfYear"
      });
    }
    return addLeadingZeros$1(dayOfYear, token.length);
  },
  E: function E(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  e: function e(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros$1(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  c: function c(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros$1(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  i: function i(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros$1(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, {
          unit: "day"
        });
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  a: function a2(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  b: function b(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  B: function B(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  h: function h2(date, token, localize2) {
    if (token === "ho") {
      var hours = date.getUTCHours() % 12;
      if (hours === 0)
        hours = 12;
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return formatters$5.h(date, token);
  },
  H: function H2(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getUTCHours(), {
        unit: "hour"
      });
    }
    return formatters$5.H(date, token);
  },
  K: function K(date, token, localize2) {
    var hours = date.getUTCHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros$1(hours, token.length);
  },
  k: function k(date, token, localize2) {
    var hours = date.getUTCHours();
    if (hours === 0)
      hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros$1(hours, token.length);
  },
  m: function m2(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getUTCMinutes(), {
        unit: "minute"
      });
    }
    return formatters$5.m(date, token);
  },
  s: function s2(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getUTCSeconds(), {
        unit: "second"
      });
    }
    return formatters$5.s(date, token);
  },
  S: function S2(date, token) {
    return formatters$5.S(date, token);
  },
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1e3);
    return addLeadingZeros$1(timestamp, token.length);
  },
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return addLeadingZeros$1(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter || "";
  return sign + String(hours) + delimiter + addLeadingZeros$1(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros$1(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || "";
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros$1(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros$1(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
var formatters$3 = formatters$2;
var dateLongFormatter = function dateLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "P":
      return formatLong2.date({
        width: "short"
      });
    case "PP":
      return formatLong2.date({
        width: "medium"
      });
    case "PPP":
      return formatLong2.date({
        width: "long"
      });
    case "PPPP":
    default:
      return formatLong2.date({
        width: "full"
      });
  }
};
var timeLongFormatter = function timeLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "p":
      return formatLong2.time({
        width: "short"
      });
    case "pp":
      return formatLong2.time({
        width: "medium"
      });
    case "ppp":
      return formatLong2.time({
        width: "long"
      });
    case "pppp":
    default:
      return formatLong2.time({
        width: "full"
      });
  }
};
var dateTimeLongFormatter = function dateTimeLongFormatter2(pattern, formatLong2) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({
        width: "short"
      });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({
        width: "full"
      });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters$1 = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
var longFormatters$2 = longFormatters$1;
var protectedDayOfYearTokens$1 = ["D", "DD"];
var protectedWeekYearTokens$1 = ["YY", "YYYY"];
function isProtectedDayOfYearToken$1(token) {
  return protectedDayOfYearTokens$1.indexOf(token) !== -1;
}
function isProtectedWeekYearToken$1(token) {
  return protectedWeekYearTokens$1.indexOf(token) !== -1;
}
function throwProtectedError$1(token, format2, input) {
  if (token === "YYYY") {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "YY") {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "D") {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "DD") {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance$1 = function formatDistance(token, count, options) {
  var result2;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result2 = tokenValue;
  } else if (count === 1) {
    result2 = tokenValue.one;
  } else {
    result2 = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result2;
    } else {
      return result2 + " ago";
    }
  }
  return result2;
};
var formatDistance$2 = formatDistance$1;
function buildFormatLongFn$1(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong$1 = {
  date: buildFormatLongFn$1({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn$1({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn$1({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
var formatLong$2 = formatLong$1;
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative$1 = function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
var formatRelative$2 = formatRelative$1;
function buildLocalizeFn$1(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize$1 = {
  ordinalNumber,
  era: buildLocalizeFn$1({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn$1({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn$1({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn$1({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn$1({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
var localize$2 = localize$1;
function buildMatchFn$1(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn$1(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match$1 = {
  ordinalNumber: buildMatchPatternFn$1({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn$1({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn$1({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn$1({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn$1({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn$1({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
var match$2 = match$1;
var locale = {
  code: "en-US",
  formatDistance: formatDistance$2,
  formatLong: formatLong$2,
  formatRelative: formatRelative$2,
  localize: localize$2,
  match: match$2,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var defaultLocale$1 = locale;
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format$2(dirtyDate, dirtyFormatStr, options) {
  var _ref2, _options$locale, _ref22, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs$1(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions2 = getDefaultOptions$1();
  var locale2 = (_ref2 = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref2 !== void 0 ? _ref2 : defaultLocale$1;
  var firstWeekContainsDate = toInteger$1((_ref22 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref22 !== void 0 ? _ref22 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger$1((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (!locale2.localize) {
    throw new RangeError("locale must contain localize property");
  }
  if (!locale2.formatLong) {
    throw new RangeError("locale must contain formatLong property");
  }
  var originalDate = toDate$2(dirtyDate);
  if (!isValid$1(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var timezoneOffset = getTimezoneOffsetInMilliseconds$1(originalDate);
  var utcDate = subMilliseconds$1(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2,
    _originalDate: originalDate
  };
  var result2 = formatStr.match(longFormattingTokensRegExp).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      var longFormatter = longFormatters$2[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map(function(substring) {
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = formatters$3[firstCharacter];
    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken$1(substring)) {
        throwProtectedError$1(substring, dirtyFormatStr, String(dirtyDate));
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken$1(substring)) {
        throwProtectedError$1(substring, dirtyFormatStr, String(dirtyDate));
      }
      return formatter(utcDate, substring, locale2.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
    }
    return substring;
  }).join("");
  return result2;
}
function cleanEscapedString(input) {
  var matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}
const _sfc_main$o = {
  name: "OnlineRedeem",
  props: {
    color: String,
    size: Number
  }
};
const _hoisted_1$n = /* @__PURE__ */ createVNode("defs", null, null, -1);
const _hoisted_2$n = /* @__PURE__ */ createVNode("title", null, "Icon_Gift_Alert", -1);
const _hoisted_3$l = /* @__PURE__ */ createVNode("path", {
  class: "cls-1",
  d: "M216.37,205.64l.26,0,.32,0a10.54,10.54,0,0,0,1.25-.22,13,13,0,0,0,2.4-.78,7.13,7.13,0,0,0,2-1.23,1.36,1.36,0,0,0,.44-.66.74.74,0,0,0,0-.21,1,1,0,0,0-.14-.26,2.14,2.14,0,0,0-.29-.33,2.77,2.77,0,0,0-.37-.28,1.92,1.92,0,0,0-.82-.25,3.77,3.77,0,0,0-2,.57,7.31,7.31,0,0,0-1.87,1.53,5.13,5.13,0,0,0-1.2,2.11h0a0,0,0,0,0,0,.05A.13.13,0,0,0,216.37,205.64Z",
  transform: "translate(-188.17 -192.45)"
}, null, -1);
const _hoisted_4$h = /* @__PURE__ */ createVNode("path", {
  class: "cls-1",
  d: "M213.23,203.45a7.14,7.14,0,0,0-1.87-1.53,3.77,3.77,0,0,0-2-.57,1.92,1.92,0,0,0-.82.25,2.77,2.77,0,0,0-.37.28,2.86,2.86,0,0,0-.29.33,1,1,0,0,0-.14.26.74.74,0,0,0,0,.21,1.44,1.44,0,0,0,.44.66,7,7,0,0,0,2,1.23,12.61,12.61,0,0,0,2.39.78,10.54,10.54,0,0,0,1.25.22l.32,0,.26,0a.13.13,0,0,0,.08,0,0,0,0,0,0,0-.05h0A5.13,5.13,0,0,0,213.23,203.45Z",
  transform: "translate(-188.17 -192.45)"
}, null, -1);
const _hoisted_5$h = /* @__PURE__ */ createVNode("rect", {
  class: "cls-1",
  x: "44.63",
  y: "12.2",
  width: "1.13",
  height: "1.12"
}, null, -1);
const _hoisted_6$e = /* @__PURE__ */ createVNode("path", {
  class: "cls-1",
  d: "M251,196.75c0-2.52-1.14-3.82-7.33-4.3l-47.49.21c-1.85,0-3.89.07-5.27,1a5.3,5.3,0,0,0-2.51,4.06c0,3.2,0,6.33-.08,9.42a5.78,5.78,0,0,1,2.76,1.35,4.37,4.37,0,0,1,1.55,2.76,3.79,3.79,0,0,1-1.16,2.84,7.13,7.13,0,0,1-3.1,1.85l-.14,0c0,3.26,0,6.5.07,9.78a4.34,4.34,0,0,0,.75,2.83c1.41,1.69,4.56,1.45,7.17,1.45l46.15,0c2.4,0,5.16.31,6.83-1,1.27-1,1.46-2.55,1.58-4C251.36,217.76,251,199.65,251,196.75Zm-2.77,27.09c-.13,1.45-.35,2.83-1.61,3.8a7.18,7.18,0,0,1-4.4,1H241l-1.08,0c-6.88,0-9.37-.06-16.68-.06h-25.5c-2.3,0-4.89.05-6.16-1.43a4.14,4.14,0,0,1-.79-2.75c-.06-2.63-.09-5-.07-8.45a.31.31,0,0,1,.23-.3h.07l.06,0a6.39,6.39,0,0,0,2.77-1.59,4,4,0,0,0,1-2.76,5.64,5.64,0,0,0-1.44-3.09A5.37,5.37,0,0,0,191,207a.32.32,0,0,1-.26-.3c0-2.7.17-4.79.17-7.76a5.11,5.11,0,0,1,2.49-3.93c1.34-.89,3.2-1,5.15-1l42.61-.13h0c5.44.4,7.19,1.43,7.19,4.21,0,.49,0,1.44,0,2.75C248.5,206.56,248.66,218.41,248.18,223.84Z",
  transform: "translate(-188.17 -192.45)"
}, null, -1);
const _hoisted_7$d = /* @__PURE__ */ createVNode("path", {
  class: "cls-1",
  d: "M247.75,198.11c0-1.82-.48-3.14-6.59-3.6l-42.6.14c-1.84,0-3.59.08-4.78.87a4.48,4.48,0,0,0-2.22,3.42c0,2.88-.13,4.89-.17,7.51a6,6,0,0,1,2.48,1.24,6.2,6.2,0,0,1,1.66,3.5,4.53,4.53,0,0,1-1.18,3.24,7,7,0,0,1-3,1.73c0,3.32,0,5.64.07,8.2a3.62,3.62,0,0,0,.64,2.38c1.08,1.25,3.51,1.23,5.66,1.21h25.51c7.31,0,9.8.07,16.68.07h1.1c1.91,0,3.89.07,5.12-.87,1.06-.82,1.25-2.06,1.37-3.37.48-5.41.32-17.23.24-22.92C247.76,199.55,247.75,198.6,247.75,198.11Zm-43.19,9.3h9.54v3.93h-9.54Zm9.62,16.6h-8.54v-11.7h8.54Zm.75-18a.8.8,0,0,1-.47.3h-.74c-.44,0-.89,0-1.34-.05a14.91,14.91,0,0,1-2.69-.43,8.33,8.33,0,0,1-1.33-.45,5.58,5.58,0,0,1-1.3-.76,3.41,3.41,0,0,1-.6-.6,2.58,2.58,0,0,1-.46-.87,2.16,2.16,0,0,1,0-1.1,2.47,2.47,0,0,1,.41-.93,3.32,3.32,0,0,1,.58-.65,3.71,3.71,0,0,1,.69-.5,3.44,3.44,0,0,1,1.68-.43,4.2,4.2,0,0,1,1.57.36,5.47,5.47,0,0,1,1.28.78,8.58,8.58,0,0,1,1.88,2.12,8.23,8.23,0,0,1,.65,1.25,4.89,4.89,0,0,1,.38,1.37h0A.74.74,0,0,1,214.93,206Zm.71-.56h0a4.89,4.89,0,0,1,.38-1.37,8.23,8.23,0,0,1,.65-1.25,8.58,8.58,0,0,1,1.88-2.12,5.47,5.47,0,0,1,1.28-.78,4.2,4.2,0,0,1,1.57-.36,3.51,3.51,0,0,1,1.69.43,4,4,0,0,1,.68.5,3.32,3.32,0,0,1,.58.65,2.47,2.47,0,0,1,.41.93,2.16,2.16,0,0,1,0,1.1,2.58,2.58,0,0,1-.46.87,3.41,3.41,0,0,1-.6.6,5.58,5.58,0,0,1-1.3.76,8.33,8.33,0,0,1-1.33.45,14.91,14.91,0,0,1-2.69.43c-.45,0-.9.05-1.34.05h-.74a.8.8,0,0,1-.47-.3A.74.74,0,0,1,215.64,205.45Zm9,18.56h-8.54v-11.7h8.54Zm1.08-12.67H216.2v-3.93h9.54Zm2-6.36,4.22-7.3a1.62,1.62,0,0,1,2.81,0L239,205a1.62,1.62,0,0,1-1.41,2.43h-8.43a1.62,1.62,0,0,1-1.41-2.43Zm-.21,16.42a.37.37,0,0,1,.37-.37H233a.37.37,0,0,1,0,.74h-5.1A.37.37,0,0,1,227.53,221.4ZM239,224h-7.16a.36.36,0,0,1-.37-.37.37.37,0,0,1,.37-.37H239a.37.37,0,0,1,.37.37A.36.36,0,0,1,239,224Z",
  transform: "translate(-188.17 -192.45)"
}, null, -1);
const _hoisted_8$d = /* @__PURE__ */ createVNode("polygon", {
  class: "cls-1",
  points: "45.52 11.69 45.81 7.14 44.58 7.14 44.89 11.69 45.52 11.69"
}, null, -1);
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
    `,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 62.92 37.66"
  }, [
    _hoisted_1$n,
    _hoisted_2$n,
    _hoisted_3$l,
    _hoisted_4$h,
    _hoisted_5$h,
    _hoisted_6$e,
    _hoisted_7$d,
    _hoisted_8$d
  ], 4);
}
var OnlineRedeem = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o]]);
var OverviewOnlineRedeem_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$n = {
  name: "OverviewOnlineRedeem",
  setup(props) {
    const show = computed(() => props.show);
    const loading = ref(false);
    const { executeMutation: redeemOnlineMutation } = useMutation(REDEEM_ONLINE);
    function redeemOnlineVoucher() {
      if (loading.value)
        return;
      loading.value = true;
      const args = {
        customerId: props.customer.id,
        promotionId: props.selectedPromotion.id,
        specification: props.selectedPromotion.specification
      };
      props.deductPoints(props.selectedPromotion.cost);
      redeemOnlineMutation(args).then(() => {
        loading.value = false;
        props.changeTab("onlineVouchers");
      }).catch((e3) => {
        console.log(e3);
        loading.value = false;
      });
    }
    const expiryDate = format$2(add(new Date(), { days: 90 }), "dd/MM/yyyy");
    return {
      loading,
      toggleModal: props.toggleModal,
      changeTab: props.changeTab,
      redeemOnlineVoucher,
      show,
      expiryDate,
      styling: props.styling
    };
  },
  props: {
    show: Boolean,
    toggleModal: Function,
    selectedPromotion: Object,
    customer: Object,
    styling: Object,
    changeTab: Function,
    deductPoints: Function
  },
  components: {
    OnlineRedeem,
    Spinner
  }
};
const _withId$2 = /* @__PURE__ */ withScopeId("data-v-1e99edd6");
pushScopeId("data-v-1e99edd6");
const _hoisted_1$m = { key: 0 };
const _hoisted_2$m = /* @__PURE__ */ createVNode("div", { class: "overlay" }, null, -1);
const _hoisted_3$k = { class: "qr-modal" };
const _hoisted_4$g = { class: "modal__container" };
const _hoisted_5$g = { class: "modal__dialog" };
const _hoisted_6$d = { class: "modal__content" };
const _hoisted_7$c = { class: "img-container" };
const _hoisted_8$c = { class: "msg-container" };
const _hoisted_9$b = { style: { "margin-bottom": "15px !important" } };
const _hoisted_10$a = { style: { "font-size": "15px !important", "text-align": "center !important" } };
const _hoisted_11$a = /* @__PURE__ */ createTextVNode(" The voucher expiry will be on ");
const _hoisted_12$a = /* @__PURE__ */ createVNode("p", { style: { "margin-bottom": "5px !important", "font-size": "15px !important" } }, " Proceed with redemption? ", -1);
const _hoisted_13$6 = {
  key: 0,
  style: { "display": "flex", "margin-top": "15px !important", "margin-bottom": "15px !important" }
};
const _hoisted_14$6 = {
  key: 1,
  style: { "margin-bottom": "15px !important" }
};
popScopeId();
const _sfc_render$n = /* @__PURE__ */ _withId$2((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_OnlineRedeem = resolveComponent("OnlineRedeem");
  const _component_Spinner = resolveComponent("Spinner");
  return $props.show == true ? (openBlock(), createBlock("div", _hoisted_1$m, [
    _hoisted_2$m,
    createVNode("div", _hoisted_3$k, [
      createVNode("div", _hoisted_4$g, [
        createVNode("div", _hoisted_5$g, [
          createVNode("div", _hoisted_6$d, [
            createVNode("div", _hoisted_7$c, [
              createVNode(_component_OnlineRedeem, {
                size: 140,
                color: $props.styling.back_color
              }, null, 8, ["color"])
            ]),
            createVNode("div", _hoisted_8$c, [
              createVNode("div", _hoisted_9$b, [
                createVNode("p", _hoisted_10$a, [
                  _hoisted_11$a,
                  createVNode("em", {
                    style: `color: ${$props.styling.back_color}`
                  }, toDisplayString($setup.expiryDate), 5)
                ])
              ]),
              _hoisted_12$a
            ]),
            !$setup.loading ? (openBlock(), createBlock("div", _hoisted_13$6, [
              createVNode("button", {
                style: [{ "margin-right": "2.5px !important" }, `background-color: ${$props.styling.back_color} !important;border-color: ${$props.styling.back_color} !important;`],
                onClick: _cache[1] || (_cache[1] = ($event) => $props.toggleModal(false, _ctx.nil))
              }, " Cancel ", 4),
              createVNode("button", {
                style: { "margin-left": "2.5px !important", "background-color": "#0bcf00 !important", "border-color": "#0bcf00 !important" },
                onClick: _cache[2] || (_cache[2] = (...args) => $setup.redeemOnlineVoucher && $setup.redeemOnlineVoucher(...args))
              }, " Confirm ")
            ])) : (openBlock(), createBlock("div", _hoisted_14$6, [
              createVNode(_component_Spinner)
            ]))
          ])
        ])
      ])
    ])
  ])) : createCommentVNode("", true);
});
var OverviewOnlineRedeem = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n], ["__scopeId", "data-v-1e99edd6"]]);
const _sfc_main$m = {
  name: "OverviewOnline",
  setup(props) {
    function redeemable(points, cost) {
      return points >= cost;
    }
    const show = ref(false);
    const selectedPromotion = ref(null);
    function toggleModal(status, promotion) {
      show.value = status;
      selectedPromotion.value = promotion;
    }
    return {
      onlinePromotions: props.onlinePromotions,
      totalAvailablePoints: props.data,
      show,
      toggleModal,
      redeemable,
      changeTab: props.changeTab,
      selectedPromotion,
      customer: props.customer,
      deductPoints: props.deductPoints
    };
  },
  props: {
    onlinePromotions: Array,
    styling: Object,
    changePath: Function,
    changeTab: Function,
    data: Number,
    customer: Object,
    deductPoints: Function
  },
  components: {
    Gift,
    Star,
    Coupon,
    OverviewOnlineRedeem
  }
};
const _hoisted_1$l = { style: { "margin-top": "15px !important" } };
const _hoisted_2$l = { class: "mulah-overview__card__container" };
const _hoisted_3$j = {
  class: "mulah-overview__card",
  style: { "box-shadow": "none !important", "background-color": "transparent !important" }
};
const _hoisted_4$f = {
  class: "mulah-overview__card__body--small",
  style: { "z-index": "1", "position": "relative" }
};
const _hoisted_5$f = {
  class: "mulah-overview__card__promotion--title",
  style: { "margin-left": "5px !important" }
};
const _hoisted_6$c = { class: "mulah-overview__card__promotion--points" };
const _hoisted_7$b = { style: { "width": "revert !important", "margin-left": "5px !important" } };
const _hoisted_8$b = { style: { "text-align": "right !important", "margin-top": "5px !important" } };
const _hoisted_9$a = {
  key: 1,
  style: { "background-color": "#aaaaaa !important", "border-color": "#aaaaaa !important", "width": "45% !important" },
  disabled: ""
};
const _hoisted_10$9 = { style: { "margin-top": "15px !important", "margin-bottom": "10px !important" } };
const _hoisted_11$9 = /* @__PURE__ */ createVNode("em", null, "Tap Here for Terms and Conditions", -1);
const _hoisted_12$9 = { class: "mulah-overview__button-container" };
const _hoisted_13$5 = { style: { "width": "100% !important", "display": "flex !important", "align-items": "center !important", "justify-content": "center !important" } };
const _hoisted_14$5 = /* @__PURE__ */ createVNode("div", { class: "footerLine" }, null, -1);
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Coupon = resolveComponent("Coupon");
  const _component_Gift = resolveComponent("Gift");
  const _component_Star = resolveComponent("Star");
  const _component_OverviewOnlineRedeem = resolveComponent("OverviewOnlineRedeem");
  return openBlock(), createBlock("div", _hoisted_1$l, [
    (openBlock(true), createBlock(Fragment, null, renderList($props.onlinePromotions, (promotion, index) => {
      return openBlock(), createBlock("div", _hoisted_2$l, [
        createVNode("div", _hoisted_3$j, [
          createVNode(_component_Coupon, { preserveAspectRatio: "none" }),
          createVNode("div", _hoisted_4$f, [
            createVNode("div", _hoisted_5$f, [
              createVNode("div", null, [
                createVNode(_component_Gift, {
                  size: 20,
                  color: `${$props.styling.icon_color} !important`
                }, null, 8, ["color"])
              ]),
              createVNode("div", null, [
                createVNode("p", {
                  style: `color: ${$props.styling.promotion_color} !important`
                }, toDisplayString(promotion.displayName), 5)
              ])
            ]),
            createVNode("div", _hoisted_6$c, [
              createVNode(_component_Star, {
                size: 15,
                color: `${$props.styling.star_color} !important`
              }, null, 8, ["color"]),
              createVNode("p", _hoisted_7$b, [
                createVNode("em", {
                  style: `color: ${$props.styling.point_color} !important;`
                }, toDisplayString(promotion.cost), 5)
              ]),
              createVNode("p", {
                style: [{ "padding-left": "5px", "font-style": "italic !important", "width": "100% !important", "margin-left": "5px !important" }, `color: ${$props.styling.points_color} !important`]
              }, " points ", 4)
            ]),
            createVNode("div", _hoisted_8$b, [
              $setup.redeemable($setup.totalAvailablePoints, promotion.cost) ? (openBlock(), createBlock("button", {
                key: 0,
                style: { "background-color": "#0bcf00 !important", "border-color": "#0bcf00 !important", "width": "45% !important" },
                onClick: ($event) => $setup.toggleModal(true, promotion)
              }, " Redeem ", 8, ["onClick"])) : (openBlock(), createBlock("button", _hoisted_9$a, " Redeem "))
            ])
          ])
        ])
      ]);
    }), 256)),
    createVNode("div", _hoisted_10$9, [
      createVNode("p", {
        onClick: _cache[1] || (_cache[1] = ($event) => $props.changePath("tnc")),
        style: { "color": "grey !important", "font-size": "0.9em !important" }
      }, [
        _hoisted_11$9
      ])
    ]),
    createVNode("div", _hoisted_12$9, [
      createVNode("div", _hoisted_13$5, [
        createVNode("button", {
          onClick: _cache[2] || (_cache[2] = ($event) => $props.changeTab("home")),
          style: `
          color: ${$props.styling.back_font_color} !important; 
          background-color: ${$props.styling.back_color} !important; 
          border-color: ${$props.styling.back_color} !important;
          margin-left: 0!important;
          `
        }, " Back ", 4),
        createVNode("button", {
          style: `
          color: ${$props.styling.check_font_color} !important; 
          background-color: ${$props.styling.check_color} !important; 
          border-color: ${$props.styling.check_color} !important;
          `,
          onClick: _cache[3] || (_cache[3] = ($event) => $props.changeTab("onlineVouchers"))
        }, " Check Vouchers ", 4)
      ])
    ]),
    createVNode(_component_OverviewOnlineRedeem, {
      show: $setup.show,
      "toggle-modal": $setup.toggleModal,
      "selected-promotion": $setup.selectedPromotion,
      customer: $props.customer,
      "change-tab": $props.changeTab,
      styling: $props.styling,
      deductPoints: $props.deductPoints
    }, null, 8, ["show", "toggle-modal", "selected-promotion", "customer", "change-tab", "styling", "deductPoints"]),
    _hoisted_14$5
  ]);
}
var OverviewOnline = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m]]);
const _sfc_main$l = {
  name: "FbPixel",
  props: {
    pixelId: String
  },
  setup(props) {
    function pixelScript() {
      window.fbq("init", props.pixelId);
      window.fbq("track", "PageView");
    }
    return {
      pixelScript
    };
  }
};
const _hoisted_1$k = { id: "mulah-fb-pixel" };
const _hoisted_2$k = { key: 0 };
const _hoisted_3$i = /* @__PURE__ */ createVNode("noscript", null, '\n        <img\n          height="1"\n          width="1"\n          style="display: none"\n          :src="`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`"\n        />\n      ', -1);
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1$k, [
    $props.pixelId ? (openBlock(), createBlock("div", _hoisted_2$k, [
      createTextVNode(toDisplayString($setup.pixelScript()) + " ", 1),
      _hoisted_3$i
    ])) : createCommentVNode("", true)
  ]);
}
var FbPixel = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l]]);
const _sfc_main$k = {
  name: "GoogleTag",
  props: {
    googleTagId: String
  },
  setup(props) {
    function googleTagScript() {
      window.ga("create", props.googleTagId, {
        cookieFlags: "max-age=31536000;secure;samesite=none"
      });
      window.ga("send", "pageView");
    }
    return {
      googleTagScript
    };
  }
};
const _hoisted_1$j = { id: "mulah-google-tag" };
const _hoisted_2$j = { key: 0 };
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1$j, [
    $props.googleTagId ? (openBlock(), createBlock("div", _hoisted_2$j, toDisplayString($setup.googleTagScript()), 1)) : createCommentVNode("", true)
  ]);
}
var GoogleTag = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k]]);
const _sfc_main$j = {
  props: {
    size: Number,
    color: String
  },
  name: "HomeSvg"
};
const _hoisted_1$i = /* @__PURE__ */ createVNode("title", null, "home-test", -1);
const _hoisted_2$i = /* @__PURE__ */ createVNode("path", {
  d: "M4.28,15a1.3,1.3,0,0,1-1-.46,1.28,1.28,0,0,1,.16-1.8L13.82,4a1.28,1.28,0,0,1,1.64,0L25.7,12.46a1.28,1.28,0,0,1-1.63,2L14.65,6.67l-9.54,8A1.28,1.28,0,0,1,4.28,15Z",
  transform: "translate(-3 -3.73)"
}, null, -1);
const _hoisted_3$h = /* @__PURE__ */ createVNode("path", {
  d: "M14.65,8l-8.45,7v7.67a1.06,1.06,0,0,0,1.07,1.06h7.89V17.74a.6.6,0,0,1,.6-.6h2.67a.6.6,0,0,1,.61.6v6.05H22a1.06,1.06,0,0,0,1.06-1.06V15Z",
  transform: "translate(-3 -3.73)"
}, null, -1);
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    style: `
      fill: ${$props.color} !important;
      width: ${$props.size}px !important;
      height: ${$props.size}px !important;
    `,
    id: "Layer_1",
    "data-name": "Layer 1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 23.16 20.07"
  }, [
    _hoisted_1$i,
    _hoisted_2$i,
    _hoisted_3$h
  ], 4);
}
var Home = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j]]);
/*!
 * qrcode.vue v3.3.3
 * A Vue.js component to generate QRCode.
 * © 2017-2021 @scopewu(https://github.com/scopewu)
 * MIT License.
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function() {
  __assign = Object.assign || function __assign2(t6) {
    for (var s3, i3 = 1, n2 = arguments.length; i3 < n2; i3++) {
      s3 = arguments[i3];
      for (var p2 in s3)
        if (Object.prototype.hasOwnProperty.call(s3, p2))
          t6[p2] = s3[p2];
    }
    return t6;
  };
  return __assign.apply(this, arguments);
};
var mode$1 = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3
};
var mode = mode$1;
function QR8bitByte(data) {
  this.mode = mode.MODE_8BIT_BYTE;
  this.data = data;
}
QR8bitByte.prototype = {
  getLength: function(buffer) {
    return this.data.length;
  },
  write: function(buffer) {
    for (var i3 = 0; i3 < this.data.length; i3++) {
      buffer.put(this.data.charCodeAt(i3), 8);
    }
  }
};
var _8BitByte = QR8bitByte;
var ErrorCorrectLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
};
var ECL = ErrorCorrectLevel;
function QRRSBlock(totalCount, dataCount) {
  this.totalCount = totalCount;
  this.dataCount = dataCount;
}
QRRSBlock.RS_BLOCK_TABLE = [
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]
];
QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
  var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
  if (rsBlock == void 0) {
    throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
  }
  var length = rsBlock.length / 3;
  var list = new Array();
  for (var i3 = 0; i3 < length; i3++) {
    var count = rsBlock[i3 * 3 + 0];
    var totalCount = rsBlock[i3 * 3 + 1];
    var dataCount = rsBlock[i3 * 3 + 2];
    for (var j2 = 0; j2 < count; j2++) {
      list.push(new QRRSBlock(totalCount, dataCount));
    }
  }
  return list;
};
QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
  switch (errorCorrectLevel) {
    case ECL.L:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
    case ECL.M:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
    case ECL.Q:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
    case ECL.H:
      return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
    default:
      return void 0;
  }
};
var RSBlock$1 = QRRSBlock;
function QRBitBuffer() {
  this.buffer = new Array();
  this.length = 0;
}
QRBitBuffer.prototype = {
  get: function(index) {
    var bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
  },
  put: function(num, length) {
    for (var i3 = 0; i3 < length; i3++) {
      this.putBit((num >>> length - i3 - 1 & 1) == 1);
    }
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(bit) {
    var bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= 128 >>> this.length % 8;
    }
    this.length++;
  }
};
var BitBuffer$1 = QRBitBuffer;
var QRMath = {
  glog: function(n2) {
    if (n2 < 1) {
      throw new Error("glog(" + n2 + ")");
    }
    return QRMath.LOG_TABLE[n2];
  },
  gexp: function(n2) {
    while (n2 < 0) {
      n2 += 255;
    }
    while (n2 >= 256) {
      n2 -= 255;
    }
    return QRMath.EXP_TABLE[n2];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
};
for (var i$1 = 0; i$1 < 8; i$1++) {
  QRMath.EXP_TABLE[i$1] = 1 << i$1;
}
for (var i$1 = 8; i$1 < 256; i$1++) {
  QRMath.EXP_TABLE[i$1] = QRMath.EXP_TABLE[i$1 - 4] ^ QRMath.EXP_TABLE[i$1 - 5] ^ QRMath.EXP_TABLE[i$1 - 6] ^ QRMath.EXP_TABLE[i$1 - 8];
}
for (var i$1 = 0; i$1 < 255; i$1++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i$1]] = i$1;
}
var math$2 = QRMath;
var math$1 = math$2;
function QRPolynomial(num, shift) {
  if (num.length == void 0) {
    throw new Error(num.length + "/" + shift);
  }
  var offset = 0;
  while (offset < num.length && num[offset] == 0) {
    offset++;
  }
  this.num = new Array(num.length - offset + shift);
  for (var i3 = 0; i3 < num.length - offset; i3++) {
    this.num[i3] = num[i3 + offset];
  }
}
QRPolynomial.prototype = {
  get: function(index) {
    return this.num[index];
  },
  getLength: function() {
    return this.num.length;
  },
  multiply: function(e3) {
    var num = new Array(this.getLength() + e3.getLength() - 1);
    for (var i3 = 0; i3 < this.getLength(); i3++) {
      for (var j2 = 0; j2 < e3.getLength(); j2++) {
        num[i3 + j2] ^= math$1.gexp(math$1.glog(this.get(i3)) + math$1.glog(e3.get(j2)));
      }
    }
    return new QRPolynomial(num, 0);
  },
  mod: function(e3) {
    if (this.getLength() - e3.getLength() < 0) {
      return this;
    }
    var ratio = math$1.glog(this.get(0)) - math$1.glog(e3.get(0));
    var num = new Array(this.getLength());
    for (var i3 = 0; i3 < this.getLength(); i3++) {
      num[i3] = this.get(i3);
    }
    for (var i3 = 0; i3 < e3.getLength(); i3++) {
      num[i3] ^= math$1.gexp(math$1.glog(e3.get(i3)) + ratio);
    }
    return new QRPolynomial(num, 0).mod(e3);
  }
};
var Polynomial$2 = QRPolynomial;
var Mode = mode$1;
var Polynomial$1 = Polynomial$2;
var math = math$2;
var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};
var QRUtil = {
  PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]
  ],
  G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
  G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
  G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
  getBCHTypeInfo: function(data) {
    var d4 = data << 10;
    while (QRUtil.getBCHDigit(d4) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d4 ^= QRUtil.G15 << QRUtil.getBCHDigit(d4) - QRUtil.getBCHDigit(QRUtil.G15);
    }
    return (data << 10 | d4) ^ QRUtil.G15_MASK;
  },
  getBCHTypeNumber: function(data) {
    var d4 = data << 12;
    while (QRUtil.getBCHDigit(d4) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d4 ^= QRUtil.G18 << QRUtil.getBCHDigit(d4) - QRUtil.getBCHDigit(QRUtil.G18);
    }
    return data << 12 | d4;
  },
  getBCHDigit: function(data) {
    var digit = 0;
    while (data != 0) {
      digit++;
      data >>>= 1;
    }
    return digit;
  },
  getPatternPosition: function(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  getMask: function(maskPattern, i3, j2) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i3 + j2) % 2 == 0;
      case QRMaskPattern.PATTERN001:
        return i3 % 2 == 0;
      case QRMaskPattern.PATTERN010:
        return j2 % 3 == 0;
      case QRMaskPattern.PATTERN011:
        return (i3 + j2) % 3 == 0;
      case QRMaskPattern.PATTERN100:
        return (Math.floor(i3 / 2) + Math.floor(j2 / 3)) % 2 == 0;
      case QRMaskPattern.PATTERN101:
        return i3 * j2 % 2 + i3 * j2 % 3 == 0;
      case QRMaskPattern.PATTERN110:
        return (i3 * j2 % 2 + i3 * j2 % 3) % 2 == 0;
      case QRMaskPattern.PATTERN111:
        return (i3 * j2 % 3 + (i3 + j2) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + maskPattern);
    }
  },
  getErrorCorrectPolynomial: function(errorCorrectLength) {
    var a4 = new Polynomial$1([1], 0);
    for (var i3 = 0; i3 < errorCorrectLength; i3++) {
      a4 = a4.multiply(new Polynomial$1([1, math.gexp(i3)], 0));
    }
    return a4;
  },
  getLengthInBits: function(mode2, type) {
    if (1 <= type && type < 10) {
      switch (mode2) {
        case Mode.MODE_NUMBER:
          return 10;
        case Mode.MODE_ALPHA_NUM:
          return 9;
        case Mode.MODE_8BIT_BYTE:
          return 8;
        case Mode.MODE_KANJI:
          return 8;
        default:
          throw new Error("mode:" + mode2);
      }
    } else if (type < 27) {
      switch (mode2) {
        case Mode.MODE_NUMBER:
          return 12;
        case Mode.MODE_ALPHA_NUM:
          return 11;
        case Mode.MODE_8BIT_BYTE:
          return 16;
        case Mode.MODE_KANJI:
          return 10;
        default:
          throw new Error("mode:" + mode2);
      }
    } else if (type < 41) {
      switch (mode2) {
        case Mode.MODE_NUMBER:
          return 14;
        case Mode.MODE_ALPHA_NUM:
          return 13;
        case Mode.MODE_8BIT_BYTE:
          return 16;
        case Mode.MODE_KANJI:
          return 12;
        default:
          throw new Error("mode:" + mode2);
      }
    } else {
      throw new Error("type:" + type);
    }
  },
  getLostPoint: function(qrCode) {
    var moduleCount = qrCode.getModuleCount();
    var lostPoint = 0;
    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount; col++) {
        var sameCount = 0;
        var dark = qrCode.isDark(row, col);
        for (var r2 = -1; r2 <= 1; r2++) {
          if (row + r2 < 0 || moduleCount <= row + r2) {
            continue;
          }
          for (var c2 = -1; c2 <= 1; c2++) {
            if (col + c2 < 0 || moduleCount <= col + c2) {
              continue;
            }
            if (r2 == 0 && c2 == 0) {
              continue;
            }
            if (dark == qrCode.isDark(row + r2, col + c2)) {
              sameCount++;
            }
          }
        }
        if (sameCount > 5) {
          lostPoint += 3 + sameCount - 5;
        }
      }
    }
    for (var row = 0; row < moduleCount - 1; row++) {
      for (var col = 0; col < moduleCount - 1; col++) {
        var count = 0;
        if (qrCode.isDark(row, col))
          count++;
        if (qrCode.isDark(row + 1, col))
          count++;
        if (qrCode.isDark(row, col + 1))
          count++;
        if (qrCode.isDark(row + 1, col + 1))
          count++;
        if (count == 0 || count == 4) {
          lostPoint += 3;
        }
      }
    }
    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount - 6; col++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
          lostPoint += 40;
        }
      }
    }
    for (var col = 0; col < moduleCount; col++) {
      for (var row = 0; row < moduleCount - 6; row++) {
        if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
          lostPoint += 40;
        }
      }
    }
    var darkCount = 0;
    for (var col = 0; col < moduleCount; col++) {
      for (var row = 0; row < moduleCount; row++) {
        if (qrCode.isDark(row, col)) {
          darkCount++;
        }
      }
    }
    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  }
};
var util$1 = QRUtil;
var BitByte = _8BitByte;
var RSBlock = RSBlock$1;
var BitBuffer = BitBuffer$1;
var util = util$1;
var Polynomial = Polynomial$2;
function QRCode$1(typeNumber, errorCorrectLevel) {
  this.typeNumber = typeNumber;
  this.errorCorrectLevel = errorCorrectLevel;
  this.modules = null;
  this.moduleCount = 0;
  this.dataCache = null;
  this.dataList = [];
}
var proto = QRCode$1.prototype;
proto.addData = function(data) {
  var newData = new BitByte(data);
  this.dataList.push(newData);
  this.dataCache = null;
};
proto.isDark = function(row, col) {
  if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
    throw new Error(row + "," + col);
  }
  return this.modules[row][col];
};
proto.getModuleCount = function() {
  return this.moduleCount;
};
proto.make = function() {
  if (this.typeNumber < 1) {
    var typeNumber = 1;
    for (typeNumber = 1; typeNumber < 40; typeNumber++) {
      var rsBlocks = RSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);
      var buffer = new BitBuffer();
      var totalDataCount = 0;
      for (var i3 = 0; i3 < rsBlocks.length; i3++) {
        totalDataCount += rsBlocks[i3].dataCount;
      }
      for (var i3 = 0; i3 < this.dataList.length; i3++) {
        var data = this.dataList[i3];
        buffer.put(data.mode, 4);
        buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber));
        data.write(buffer);
      }
      if (buffer.getLengthInBits() <= totalDataCount * 8)
        break;
    }
    this.typeNumber = typeNumber;
  }
  this.makeImpl(false, this.getBestMaskPattern());
};
proto.makeImpl = function(test, maskPattern) {
  this.moduleCount = this.typeNumber * 4 + 17;
  this.modules = new Array(this.moduleCount);
  for (var row = 0; row < this.moduleCount; row++) {
    this.modules[row] = new Array(this.moduleCount);
    for (var col = 0; col < this.moduleCount; col++) {
      this.modules[row][col] = null;
    }
  }
  this.setupPositionProbePattern(0, 0);
  this.setupPositionProbePattern(this.moduleCount - 7, 0);
  this.setupPositionProbePattern(0, this.moduleCount - 7);
  this.setupPositionAdjustPattern();
  this.setupTimingPattern();
  this.setupTypeInfo(test, maskPattern);
  if (this.typeNumber >= 7) {
    this.setupTypeNumber(test);
  }
  if (this.dataCache == null) {
    this.dataCache = QRCode$1.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
  }
  this.mapData(this.dataCache, maskPattern);
};
proto.setupPositionProbePattern = function(row, col) {
  for (var r2 = -1; r2 <= 7; r2++) {
    if (row + r2 <= -1 || this.moduleCount <= row + r2)
      continue;
    for (var c2 = -1; c2 <= 7; c2++) {
      if (col + c2 <= -1 || this.moduleCount <= col + c2)
        continue;
      if (0 <= r2 && r2 <= 6 && (c2 == 0 || c2 == 6) || 0 <= c2 && c2 <= 6 && (r2 == 0 || r2 == 6) || 2 <= r2 && r2 <= 4 && 2 <= c2 && c2 <= 4) {
        this.modules[row + r2][col + c2] = true;
      } else {
        this.modules[row + r2][col + c2] = false;
      }
    }
  }
};
proto.getBestMaskPattern = function() {
  var minLostPoint = 0;
  var pattern = 0;
  for (var i3 = 0; i3 < 8; i3++) {
    this.makeImpl(true, i3);
    var lostPoint = util.getLostPoint(this);
    if (i3 == 0 || minLostPoint > lostPoint) {
      minLostPoint = lostPoint;
      pattern = i3;
    }
  }
  return pattern;
};
proto.createMovieClip = function(target_mc, instance_name, depth) {
  var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
  var cs = 1;
  this.make();
  for (var row = 0; row < this.modules.length; row++) {
    var y4 = row * cs;
    for (var col = 0; col < this.modules[row].length; col++) {
      var x3 = col * cs;
      var dark = this.modules[row][col];
      if (dark) {
        qr_mc.beginFill(0, 100);
        qr_mc.moveTo(x3, y4);
        qr_mc.lineTo(x3 + cs, y4);
        qr_mc.lineTo(x3 + cs, y4 + cs);
        qr_mc.lineTo(x3, y4 + cs);
        qr_mc.endFill();
      }
    }
  }
  return qr_mc;
};
proto.setupTimingPattern = function() {
  for (var r2 = 8; r2 < this.moduleCount - 8; r2++) {
    if (this.modules[r2][6] != null) {
      continue;
    }
    this.modules[r2][6] = r2 % 2 == 0;
  }
  for (var c2 = 8; c2 < this.moduleCount - 8; c2++) {
    if (this.modules[6][c2] != null) {
      continue;
    }
    this.modules[6][c2] = c2 % 2 == 0;
  }
};
proto.setupPositionAdjustPattern = function() {
  var pos = util.getPatternPosition(this.typeNumber);
  for (var i3 = 0; i3 < pos.length; i3++) {
    for (var j2 = 0; j2 < pos.length; j2++) {
      var row = pos[i3];
      var col = pos[j2];
      if (this.modules[row][col] != null) {
        continue;
      }
      for (var r2 = -2; r2 <= 2; r2++) {
        for (var c2 = -2; c2 <= 2; c2++) {
          if (r2 == -2 || r2 == 2 || c2 == -2 || c2 == 2 || r2 == 0 && c2 == 0) {
            this.modules[row + r2][col + c2] = true;
          } else {
            this.modules[row + r2][col + c2] = false;
          }
        }
      }
    }
  }
};
proto.setupTypeNumber = function(test) {
  var bits = util.getBCHTypeNumber(this.typeNumber);
  for (var i3 = 0; i3 < 18; i3++) {
    var mod = !test && (bits >> i3 & 1) == 1;
    this.modules[Math.floor(i3 / 3)][i3 % 3 + this.moduleCount - 8 - 3] = mod;
  }
  for (var i3 = 0; i3 < 18; i3++) {
    var mod = !test && (bits >> i3 & 1) == 1;
    this.modules[i3 % 3 + this.moduleCount - 8 - 3][Math.floor(i3 / 3)] = mod;
  }
};
proto.setupTypeInfo = function(test, maskPattern) {
  var data = this.errorCorrectLevel << 3 | maskPattern;
  var bits = util.getBCHTypeInfo(data);
  for (var i3 = 0; i3 < 15; i3++) {
    var mod = !test && (bits >> i3 & 1) == 1;
    if (i3 < 6) {
      this.modules[i3][8] = mod;
    } else if (i3 < 8) {
      this.modules[i3 + 1][8] = mod;
    } else {
      this.modules[this.moduleCount - 15 + i3][8] = mod;
    }
  }
  for (var i3 = 0; i3 < 15; i3++) {
    var mod = !test && (bits >> i3 & 1) == 1;
    if (i3 < 8) {
      this.modules[8][this.moduleCount - i3 - 1] = mod;
    } else if (i3 < 9) {
      this.modules[8][15 - i3 - 1 + 1] = mod;
    } else {
      this.modules[8][15 - i3 - 1] = mod;
    }
  }
  this.modules[this.moduleCount - 8][8] = !test;
};
proto.mapData = function(data, maskPattern) {
  var inc = -1;
  var row = this.moduleCount - 1;
  var bitIndex = 7;
  var byteIndex = 0;
  for (var col = this.moduleCount - 1; col > 0; col -= 2) {
    if (col == 6)
      col--;
    while (true) {
      for (var c2 = 0; c2 < 2; c2++) {
        if (this.modules[row][col - c2] == null) {
          var dark = false;
          if (byteIndex < data.length) {
            dark = (data[byteIndex] >>> bitIndex & 1) == 1;
          }
          var mask = util.getMask(maskPattern, row, col - c2);
          if (mask) {
            dark = !dark;
          }
          this.modules[row][col - c2] = dark;
          bitIndex--;
          if (bitIndex == -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }
      row += inc;
      if (row < 0 || this.moduleCount <= row) {
        row -= inc;
        inc = -inc;
        break;
      }
    }
  }
};
QRCode$1.PAD0 = 236;
QRCode$1.PAD1 = 17;
QRCode$1.createData = function(typeNumber, errorCorrectLevel, dataList) {
  var rsBlocks = RSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
  var buffer = new BitBuffer();
  for (var i3 = 0; i3 < dataList.length; i3++) {
    var data = dataList[i3];
    buffer.put(data.mode, 4);
    buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber));
    data.write(buffer);
  }
  var totalDataCount = 0;
  for (var i3 = 0; i3 < rsBlocks.length; i3++) {
    totalDataCount += rsBlocks[i3].dataCount;
  }
  if (buffer.getLengthInBits() > totalDataCount * 8) {
    throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
  }
  if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
    buffer.put(0, 4);
  }
  while (buffer.getLengthInBits() % 8 != 0) {
    buffer.putBit(false);
  }
  while (true) {
    if (buffer.getLengthInBits() >= totalDataCount * 8) {
      break;
    }
    buffer.put(QRCode$1.PAD0, 8);
    if (buffer.getLengthInBits() >= totalDataCount * 8) {
      break;
    }
    buffer.put(QRCode$1.PAD1, 8);
  }
  return QRCode$1.createBytes(buffer, rsBlocks);
};
QRCode$1.createBytes = function(buffer, rsBlocks) {
  var offset = 0;
  var maxDcCount = 0;
  var maxEcCount = 0;
  var dcdata = new Array(rsBlocks.length);
  var ecdata = new Array(rsBlocks.length);
  for (var r2 = 0; r2 < rsBlocks.length; r2++) {
    var dcCount = rsBlocks[r2].dataCount;
    var ecCount = rsBlocks[r2].totalCount - dcCount;
    maxDcCount = Math.max(maxDcCount, dcCount);
    maxEcCount = Math.max(maxEcCount, ecCount);
    dcdata[r2] = new Array(dcCount);
    for (var i3 = 0; i3 < dcdata[r2].length; i3++) {
      dcdata[r2][i3] = 255 & buffer.buffer[i3 + offset];
    }
    offset += dcCount;
    var rsPoly = util.getErrorCorrectPolynomial(ecCount);
    var rawPoly = new Polynomial(dcdata[r2], rsPoly.getLength() - 1);
    var modPoly = rawPoly.mod(rsPoly);
    ecdata[r2] = new Array(rsPoly.getLength() - 1);
    for (var i3 = 0; i3 < ecdata[r2].length; i3++) {
      var modIndex = i3 + modPoly.getLength() - ecdata[r2].length;
      ecdata[r2][i3] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
    }
  }
  var totalCodeCount = 0;
  for (var i3 = 0; i3 < rsBlocks.length; i3++) {
    totalCodeCount += rsBlocks[i3].totalCount;
  }
  var data = new Array(totalCodeCount);
  var index = 0;
  for (var i3 = 0; i3 < maxDcCount; i3++) {
    for (var r2 = 0; r2 < rsBlocks.length; r2++) {
      if (i3 < dcdata[r2].length) {
        data[index++] = dcdata[r2][i3];
      }
    }
  }
  for (var i3 = 0; i3 < maxEcCount; i3++) {
    for (var r2 = 0; r2 < rsBlocks.length; r2++) {
      if (i3 < ecdata[r2].length) {
        data[index++] = ecdata[r2][i3];
      }
    }
  }
  return data;
};
var QRCode_1 = QRCode$1;
var defaultErrorCorrectLevel = "H";
var SUPPORTS_PATH2D = function() {
  try {
    new Path2D().addPath(new Path2D());
  } catch (e3) {
    return false;
  }
  return true;
}();
function QRCode(data, level) {
  var errorCorrectLevel = ErrorCorrectLevel[level];
  var qrcode = new QRCode_1(-1, errorCorrectLevel);
  qrcode.addData(toUTF8String(data));
  qrcode.make();
  return qrcode;
}
function validErrorCorrectLevel(level) {
  return level in ErrorCorrectLevel;
}
function toUTF8String(str) {
  var utf8Str = "";
  for (var i3 = 0; i3 < str.length; i3++) {
    var charCode = str.charCodeAt(i3);
    if (charCode < 128) {
      utf8Str += String.fromCharCode(charCode);
    } else if (charCode < 2048) {
      utf8Str += String.fromCharCode(192 | charCode >> 6);
      utf8Str += String.fromCharCode(128 | charCode & 63);
    } else if (charCode < 55296 || charCode >= 57344) {
      utf8Str += String.fromCharCode(224 | charCode >> 12);
      utf8Str += String.fromCharCode(128 | charCode >> 6 & 63);
      utf8Str += String.fromCharCode(128 | charCode & 63);
    } else {
      i3++;
      charCode = 65536 + ((charCode & 1023) << 10 | str.charCodeAt(i3) & 1023);
      utf8Str += String.fromCharCode(240 | charCode >> 18);
      utf8Str += String.fromCharCode(128 | charCode >> 12 & 63);
      utf8Str += String.fromCharCode(128 | charCode >> 6 & 63);
      utf8Str += String.fromCharCode(128 | charCode & 63);
    }
  }
  return utf8Str;
}
function generatePath(modules, margin) {
  if (margin === void 0) {
    margin = 0;
  }
  var ops = [];
  modules.forEach(function(row, y4) {
    var start2 = null;
    row.forEach(function(cell, x3) {
      if (!cell && start2 !== null) {
        ops.push("M" + (start2 + margin) + " " + (y4 + margin) + "h" + (x3 - start2) + "v1H" + (start2 + margin) + "z");
        start2 = null;
        return;
      }
      if (x3 === row.length - 1) {
        if (!cell) {
          return;
        }
        if (start2 === null) {
          ops.push("M" + (x3 + margin) + "," + (y4 + margin) + " h1v1H" + (x3 + margin) + "z");
        } else {
          ops.push("M" + (start2 + margin) + "," + (y4 + margin) + " h" + (x3 + 1 - start2) + "v1H" + (start2 + margin) + "z");
        }
        return;
      }
      if (cell && start2 === null) {
        start2 = x3;
      }
    });
  });
  return ops.join("");
}
var QRCodeProps = {
  value: {
    type: String,
    required: true,
    "default": ""
  },
  size: {
    type: Number,
    "default": 100
  },
  level: {
    type: String,
    "default": defaultErrorCorrectLevel,
    validator: function(l2) {
      return validErrorCorrectLevel(l2);
    }
  },
  background: {
    type: String,
    "default": "#fff"
  },
  foreground: {
    type: String,
    "default": "#000"
  },
  margin: {
    type: Number,
    required: false,
    "default": 0
  }
};
var QRCodeVueProps = __assign(__assign({}, QRCodeProps), { renderAs: {
  type: String,
  required: false,
  "default": "canvas",
  validator: function(as) {
    return ["canvas", "svg"].indexOf(as) > -1;
  }
} });
var QRCodeSvg = defineComponent({
  name: "QRCodeSvg",
  props: QRCodeProps,
  setup: function(props) {
    var numCells = ref(0);
    var fgPath = ref("");
    var generate = function() {
      var value = props.value, level = props.level, margin = props.margin;
      var cells = QRCode(value, level).modules;
      numCells.value = cells.length + margin * 2;
      fgPath.value = generatePath(cells, margin);
    };
    generate();
    onUpdated(generate);
    return function() {
      return h$1("svg", {
        width: props.size,
        height: props.size,
        "shape-rendering": "crispEdges",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 " + numCells.value + " " + numCells.value
      }, [
        h$1("path", {
          fill: props.background,
          d: "M0,0 h" + numCells.value + "v" + numCells.value + "H0z"
        }),
        h$1("path", { fill: props.foreground, d: fgPath.value })
      ]);
    };
  }
});
var QRCodeCanvas = defineComponent({
  name: "QRCodeCanvas",
  props: QRCodeProps,
  setup: function(props) {
    var canvasEl = ref(null);
    var generate = function() {
      var value = props.value, level = props.level, size2 = props.size, margin = props.margin, background = props.background, foreground = props.foreground;
      var cells = QRCode(value, level).modules;
      var numCells = cells.length + margin * 2;
      var canvas = canvasEl.value;
      if (!canvas) {
        return;
      }
      var ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      var devicePixelRatio = window.devicePixelRatio || 1;
      var scale = size2 / numCells * devicePixelRatio;
      canvas.height = canvas.width = size2 * devicePixelRatio;
      ctx.scale(scale, scale);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, numCells, numCells);
      ctx.fillStyle = foreground;
      if (SUPPORTS_PATH2D) {
        ctx.fill(new Path2D(generatePath(cells, margin)));
      } else {
        cells.forEach(function(row, rdx) {
          row.forEach(function(cell, cdx) {
            if (cell) {
              ctx.fillRect(cdx + margin, rdx + margin, 1, 1);
            }
          });
        });
      }
    };
    onMounted(generate);
    onUpdated(generate);
    return function() {
      return h$1("canvas", {
        ref: canvasEl,
        style: { width: props.size + "px", height: props.size + "px" }
      });
    };
  }
});
var QrcodeVue = defineComponent({
  name: "Qrcode",
  render: function() {
    var _a = this.$props, renderAs = _a.renderAs, value = _a.value, _size = _a.size, _margin = _a.margin, _level = _a.level, background = _a.background, foreground = _a.foreground;
    var size2 = _size >>> 0;
    var margin = _margin >>> 0;
    var level = validErrorCorrectLevel(_level) ? _level : defaultErrorCorrectLevel;
    return h$1(renderAs === "svg" ? QRCodeSvg : QRCodeCanvas, { value, size: size2, margin, level, background, foreground });
  },
  props: QRCodeVueProps
});
var t2 = Object.defineProperty, e2 = Object.defineProperties, n = Object.getOwnPropertyDescriptors, r = Object.getOwnPropertySymbols, o = Object.prototype.hasOwnProperty, i2 = Object.prototype.propertyIsEnumerable, a3 = (e3, n2, r2) => n2 in e3 ? t2(e3, n2, { enumerable: true, configurable: true, writable: true, value: r2 }) : e3[n2] = r2;
var p = {}, d3 = {}, h3 = {};
Object.defineProperty(h3, "__esModule", { value: true });
h3.default = function t3(e3, n2) {
  !function(t6, e4) {
    if (!(t6 instanceof e4))
      throw new TypeError("Cannot call a class as a function");
  }(this, t3), this.data = e3, this.text = n2.text || e3, this.options = n2;
}, Object.defineProperty(d3, "__esModule", { value: true }), d3.CODE39 = void 0;
var y3, v = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), b2 = (y3 = h3) && y3.__esModule ? y3 : { default: y3 };
var _ = function(t6) {
  function e3(t7, n2) {
    var r2;
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), t7 = t7.toUpperCase(), n2.mod43 && (t7 += (r2 = function(t8) {
      for (var e4 = 0, n3 = 0; n3 < t8.length; n3++)
        e4 += w2(t8[n3]);
      return e4 %= 43;
    }(t7), g[r2])), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, b2.default), v(e3, [{ key: "encode", value: function() {
    for (var t7 = E2("*"), e4 = 0; e4 < this.data.length; e4++)
      t7 += E2(this.data[e4]) + "0";
    return { data: t7 += E2("*"), text: this.text };
  } }, { key: "valid", value: function() {
    return -1 !== this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/);
  } }]), e3;
}(), g = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"], O2 = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];
function E2(t6) {
  return e3 = w2(t6), O2[e3].toString(2);
  var e3;
}
function w2(t6) {
  return g.indexOf(t6);
}
d3.CODE39 = _;
var m3, j = {}, x2 = {}, P = {}, S3 = {};
function C(t6, e3, n2) {
  return e3 in t6 ? Object.defineProperty(t6, e3, { value: n2, enumerable: true, configurable: true, writable: true }) : t6[e3] = n2, t6;
}
Object.defineProperty(S3, "__esModule", { value: true });
var A = S3.SET_A = 0, T2 = S3.SET_B = 1, M3 = S3.SET_C = 2;
S3.SHIFT = 98;
var R2 = S3.START_A = 103, L2 = S3.START_B = 104, k2 = S3.START_C = 105;
S3.MODULO = 103, S3.STOP = 106, S3.FNC1 = 207, S3.SET_BY_CODE = (C(m3 = {}, R2, A), C(m3, L2, T2), C(m3, k2, M3), m3), S3.SWAP = { 101: A, 100: T2, 99: M3 }, S3.A_START_CHAR = String.fromCharCode(208), S3.B_START_CHAR = String.fromCharCode(209), S3.C_START_CHAR = String.fromCharCode(210), S3.A_CHARS = "[\0-_\xC8-\xCF]", S3.B_CHARS = "[ -\x7F\xC8-\xCF]", S3.C_CHARS = "(\xCF*[0-9]{2}\xCF*)", S3.BARS = [11011001100, 11001101100, 11001100110, 10010011e3, 10010001100, 10001001100, 10011001e3, 10011000100, 10001100100, 11001001e3, 11001000100, 11000100100, 10110011100, 10011011100, 10011001110, 10111001100, 10011101100, 10011100110, 11001110010, 11001011100, 11001001110, 11011100100, 11001110100, 11101101110, 11101001100, 11100101100, 11100100110, 11101100100, 11100110100, 11100110010, 11011011e3, 11011000110, 11000110110, 10100011e3, 10001011e3, 10001000110, 10110001e3, 10001101e3, 10001100010, 11010001e3, 11000101e3, 11000100010, 10110111e3, 10110001110, 10001101110, 10111011e3, 10111000110, 10001110110, 11101110110, 11010001110, 11000101110, 11011101e3, 11011100010, 11011101110, 11101011e3, 11101000110, 11100010110, 11101101e3, 11101100010, 11100011010, 11101111010, 11001000010, 11110001010, 1010011e4, 10100001100, 1001011e4, 10010000110, 10000101100, 10000100110, 1011001e4, 10110000100, 1001101e4, 10011000010, 10000110100, 10000110010, 11000010010, 1100101e4, 11110111010, 11000010100, 10001111010, 10100111100, 10010111100, 10010011110, 10111100100, 10011110100, 10011110010, 11110100100, 11110010100, 11110010010, 11011011110, 11011110110, 11110110110, 10101111e3, 10100011110, 10001011110, 10111101e3, 10111100010, 11110101e3, 11110100010, 10111011110, 10111101110, 11101011110, 11110101110, 11010000100, 1101001e4, 11010011100, 1100011101011], Object.defineProperty(P, "__esModule", { value: true });
var I2 = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), G2 = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(h3), B2 = S3;
var N = function(t6) {
  function e3(t7, n2) {
    !function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3);
    var r2 = function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7.substring(1), n2));
    return r2.bytes = t7.split("").map(function(t8) {
      return t8.charCodeAt(0);
    }), r2;
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, G2.default), I2(e3, [{ key: "valid", value: function() {
    return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data);
  } }, { key: "encode", value: function() {
    var t7 = this.bytes, n2 = t7.shift() - 105, r2 = B2.SET_BY_CODE[n2];
    if (void 0 === r2)
      throw new RangeError("The encoding does not start with a start character.");
    true === this.shouldEncodeAsEan128() && t7.unshift(B2.FNC1);
    var o2 = e3.next(t7, 1, r2);
    return { text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text, data: e3.getBar(n2) + o2.result + e3.getBar((o2.checksum + n2) % B2.MODULO) + e3.getBar(B2.STOP) };
  } }, { key: "shouldEncodeAsEan128", value: function() {
    var t7 = this.options.ean128 || false;
    return "string" == typeof t7 && (t7 = "true" === t7.toLowerCase()), t7;
  } }], [{ key: "getBar", value: function(t7) {
    return B2.BARS[t7] ? B2.BARS[t7].toString() : "";
  } }, { key: "correctIndex", value: function(t7, e4) {
    if (e4 === B2.SET_A) {
      var n2 = t7.shift();
      return n2 < 32 ? n2 + 64 : n2 - 32;
    }
    return e4 === B2.SET_B ? t7.shift() - 32 : 10 * (t7.shift() - 48) + t7.shift() - 48;
  } }, { key: "next", value: function(t7, n2, r2) {
    if (!t7.length)
      return { result: "", checksum: 0 };
    var o2 = void 0, i3 = void 0;
    if (t7[0] >= 200) {
      i3 = t7.shift() - 105;
      var a4 = B2.SWAP[i3];
      void 0 !== a4 ? o2 = e3.next(t7, n2 + 1, a4) : (r2 !== B2.SET_A && r2 !== B2.SET_B || i3 !== B2.SHIFT || (t7[0] = r2 === B2.SET_A ? t7[0] > 95 ? t7[0] - 96 : t7[0] : t7[0] < 32 ? t7[0] + 96 : t7[0]), o2 = e3.next(t7, n2 + 1, r2));
    } else
      i3 = e3.correctIndex(t7, r2), o2 = e3.next(t7, n2 + 1, r2);
    var u3 = i3 * n2;
    return { result: e3.getBar(i3) + o2.result, checksum: u3 + o2.checksum };
  } }]), e3;
}();
P.default = N;
var D2 = {};
Object.defineProperty(D2, "__esModule", { value: true });
var X2 = S3, z2 = function(t6) {
  return t6.match(new RegExp("^" + X2.A_CHARS + "*"))[0].length;
}, H3 = function(t6) {
  return t6.match(new RegExp("^" + X2.B_CHARS + "*"))[0].length;
}, V = function(t6) {
  return t6.match(new RegExp("^" + X2.C_CHARS + "*"))[0];
};
function U(t6, e3) {
  var n2 = e3 ? X2.A_CHARS : X2.B_CHARS, r2 = t6.match(new RegExp("^(" + n2 + "+?)(([0-9]{2}){2,})([^0-9]|$)"));
  if (r2)
    return r2[1] + String.fromCharCode(204) + $(t6.substring(r2[1].length));
  var o2 = t6.match(new RegExp("^" + n2 + "+"))[0];
  return o2.length === t6.length ? t6 : o2 + String.fromCharCode(e3 ? 205 : 206) + U(t6.substring(o2.length), !e3);
}
function $(t6) {
  var e3 = V(t6), n2 = e3.length;
  if (n2 === t6.length)
    return t6;
  t6 = t6.substring(n2);
  var r2 = z2(t6) >= H3(t6);
  return e3 + String.fromCharCode(r2 ? 206 : 205) + U(t6, r2);
}
D2.default = function(t6) {
  var e3 = void 0;
  if (V(t6).length >= 2)
    e3 = X2.C_START_CHAR + $(t6);
  else {
    var n2 = z2(t6) > H3(t6);
    e3 = (n2 ? X2.A_START_CHAR : X2.B_START_CHAR) + U(t6, n2);
  }
  return e3.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, function(t7, e4) {
    return String.fromCharCode(203) + e4;
  });
}, Object.defineProperty(x2, "__esModule", { value: true });
var F = Q2(P), W = Q2(D2);
function Q2(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
function J(t6, e3) {
  if (!t6)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e3 || "object" != typeof e3 && "function" != typeof e3 ? t6 : e3;
}
var Y2 = function(t6) {
  function e3(t7, n2) {
    if (function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), /^[\x00-\x7F\xC8-\xD3]+$/.test(t7))
      var r2 = J(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, (0, W.default)(t7), n2));
    else
      r2 = J(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
    return J(r2);
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, F.default), e3;
}();
x2.default = Y2;
var q2 = {};
Object.defineProperty(q2, "__esModule", { value: true });
var Z = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), K2 = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(P), tt = S3;
var et = function(t6) {
  function e3(t7, n2) {
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, tt.A_START_CHAR + t7, n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, K2.default), Z(e3, [{ key: "valid", value: function() {
    return new RegExp("^" + tt.A_CHARS + "+$").test(this.data);
  } }]), e3;
}();
q2.default = et;
var nt = {};
Object.defineProperty(nt, "__esModule", { value: true });
var rt = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), ot = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(P), it = S3;
var at = function(t6) {
  function e3(t7, n2) {
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, it.B_START_CHAR + t7, n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, ot.default), rt(e3, [{ key: "valid", value: function() {
    return new RegExp("^" + it.B_CHARS + "+$").test(this.data);
  } }]), e3;
}();
nt.default = at;
var ut = {};
Object.defineProperty(ut, "__esModule", { value: true });
var ft = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), lt = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(P), ct = S3;
var st = function(t6) {
  function e3(t7, n2) {
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, ct.C_START_CHAR + t7, n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, lt.default), ft(e3, [{ key: "valid", value: function() {
    return new RegExp("^" + ct.C_CHARS + "+$").test(this.data);
  } }]), e3;
}();
ut.default = st, Object.defineProperty(j, "__esModule", { value: true }), j.CODE128C = j.CODE128B = j.CODE128A = j.CODE128 = void 0;
var pt = vt(x2), dt = vt(q2), ht = vt(nt), yt = vt(ut);
function vt(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
j.CODE128 = pt.default, j.CODE128A = dt.default, j.CODE128B = ht.default, j.CODE128C = yt.default;
var bt = {}, _t = {}, gt = {};
Object.defineProperty(gt, "__esModule", { value: true }), gt.SIDE_BIN = "101", gt.MIDDLE_BIN = "01010", gt.BINARIES = { L: ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"], G: ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"], R: ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"], O: ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"], E: ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"] }, gt.EAN2_STRUCTURE = ["LL", "LG", "GL", "GG"], gt.EAN5_STRUCTURE = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"], gt.EAN13_STRUCTURE = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];
var Ot = {}, Et = {};
Object.defineProperty(Et, "__esModule", { value: true });
var wt = gt;
Et.default = function(t6, e3, n2) {
  var r2 = t6.split("").map(function(t7, n3) {
    return wt.BINARIES[e3[n3]];
  }).map(function(e4, n3) {
    return e4 ? e4[t6[n3]] : "";
  });
  if (n2) {
    var o2 = t6.length - 1;
    r2 = r2.map(function(t7, e4) {
      return e4 < o2 ? t7 + n2 : t7;
    });
  }
  return r2.join("");
}, Object.defineProperty(Ot, "__esModule", { value: true });
var mt = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), jt = gt, xt = St(Et), Pt = St(h3);
function St(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
var Ct = function(t6) {
  function e3(t7, n2) {
    !function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3);
    var r2 = function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
    return r2.fontSize = !n2.flat && n2.fontSize > 10 * n2.width ? 10 * n2.width : n2.fontSize, r2.guardHeight = n2.height + r2.fontSize / 2 + n2.textMargin, r2;
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, Pt.default), mt(e3, [{ key: "encode", value: function() {
    return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
  } }, { key: "leftText", value: function(t7, e4) {
    return this.text.substr(t7, e4);
  } }, { key: "leftEncode", value: function(t7, e4) {
    return (0, xt.default)(t7, e4);
  } }, { key: "rightText", value: function(t7, e4) {
    return this.text.substr(t7, e4);
  } }, { key: "rightEncode", value: function(t7, e4) {
    return (0, xt.default)(t7, e4);
  } }, { key: "encodeGuarded", value: function() {
    var t7 = { fontSize: this.fontSize }, e4 = { height: this.guardHeight };
    return [{ data: jt.SIDE_BIN, options: e4 }, { data: this.leftEncode(), text: this.leftText(), options: t7 }, { data: jt.MIDDLE_BIN, options: e4 }, { data: this.rightEncode(), text: this.rightText(), options: t7 }, { data: jt.SIDE_BIN, options: e4 }];
  } }, { key: "encodeFlat", value: function() {
    return { data: [jt.SIDE_BIN, this.leftEncode(), jt.MIDDLE_BIN, this.rightEncode(), jt.SIDE_BIN].join(""), text: this.text };
  } }]), e3;
}();
Ot.default = Ct, Object.defineProperty(_t, "__esModule", { value: true });
var At = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), Tt = function t4(e3, n2, r2) {
  null === e3 && (e3 = Function.prototype);
  var o2 = Object.getOwnPropertyDescriptor(e3, n2);
  if (void 0 === o2) {
    var i3 = Object.getPrototypeOf(e3);
    return null === i3 ? void 0 : t4(i3, n2, r2);
  }
  if ("value" in o2)
    return o2.value;
  var a4 = o2.get;
  return void 0 !== a4 ? a4.call(r2) : void 0;
}, Mt = gt, Rt = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(Ot);
var Lt = function(t6) {
  return (10 - t6.substr(0, 12).split("").map(function(t7) {
    return +t7;
  }).reduce(function(t7, e3, n2) {
    return n2 % 2 ? t7 + 3 * e3 : t7 + e3;
  }, 0) % 10) % 10;
}, kt = function(t6) {
  function e3(t7, n2) {
    !function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), -1 !== t7.search(/^[0-9]{12}$/) && (t7 += Lt(t7));
    var r2 = function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
    return r2.lastChar = n2.lastChar, r2;
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, Rt.default), At(e3, [{ key: "valid", value: function() {
    return -1 !== this.data.search(/^[0-9]{13}$/) && +this.data[12] === Lt(this.data);
  } }, { key: "leftText", value: function() {
    return Tt(e3.prototype.__proto__ || Object.getPrototypeOf(e3.prototype), "leftText", this).call(this, 1, 6);
  } }, { key: "leftEncode", value: function() {
    var t7 = this.data.substr(1, 6), n2 = Mt.EAN13_STRUCTURE[this.data[0]];
    return Tt(e3.prototype.__proto__ || Object.getPrototypeOf(e3.prototype), "leftEncode", this).call(this, t7, n2);
  } }, { key: "rightText", value: function() {
    return Tt(e3.prototype.__proto__ || Object.getPrototypeOf(e3.prototype), "rightText", this).call(this, 7, 6);
  } }, { key: "rightEncode", value: function() {
    var t7 = this.data.substr(7, 6);
    return Tt(e3.prototype.__proto__ || Object.getPrototypeOf(e3.prototype), "rightEncode", this).call(this, t7, "RRRRRR");
  } }, { key: "encodeGuarded", value: function() {
    var t7 = Tt(e3.prototype.__proto__ || Object.getPrototypeOf(e3.prototype), "encodeGuarded", this).call(this);
    return this.options.displayValue && (t7.unshift({ data: "000000000000", text: this.text.substr(0, 1), options: { textAlign: "left", fontSize: this.fontSize } }), this.options.lastChar && (t7.push({ data: "00" }), t7.push({ data: "00000", text: this.options.lastChar, options: { fontSize: this.fontSize } }))), t7;
  } }]), e3;
}();
_t.default = kt;
var It = {};
Object.defineProperty(It, "__esModule", { value: true });
var Gt = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), Bt = function t5(e3, n2, r2) {
  null === e3 && (e3 = Function.prototype);
  var o2 = Object.getOwnPropertyDescriptor(e3, n2);
  if (void 0 === o2) {
    var i3 = Object.getPrototypeOf(e3);
    return null === i3 ? void 0 : t5(i3, n2, r2);
  }
  if ("value" in o2)
    return o2.value;
  var a4 = o2.get;
  return void 0 !== a4 ? a4.call(r2) : void 0;
}, Nt = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(Ot);
var Dt = function(t6) {
  return (10 - t6.substr(0, 7).split("").map(function(t7) {
    return +t7;
  }).reduce(function(t7, e3, n2) {
    return n2 % 2 ? t7 + e3 : t7 + 3 * e3;
  }, 0) % 10) % 10;
}, Xt = function(t6) {
  function e3(t7, n2) {
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), -1 !== t7.search(/^[0-9]{7}$/) && (t7 += Dt(t7)), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, Nt.default), Gt(e3, [{ key: "valid", value: function() {
    return -1 !== this.data.search(/^[0-9]{8}$/) && +this.data[7] === Dt(this.data);
  } }, { key: "leftText", value: function() {
    return Bt(e3.prototype.__proto__ || Object.getPrototypeOf(e3.prototype), "leftText", this).call(this, 0, 4);
  } }, { key: "leftEncode", value: function() {
    var t7 = this.data.substr(0, 4);
    return Bt(e3.prototype.__proto__ || Object.getPrototypeOf(e3.prototype), "leftEncode", this).call(this, t7, "LLLL");
  } }, { key: "rightText", value: function() {
    return Bt(e3.prototype.__proto__ || Object.getPrototypeOf(e3.prototype), "rightText", this).call(this, 4, 4);
  } }, { key: "rightEncode", value: function() {
    var t7 = this.data.substr(4, 4);
    return Bt(e3.prototype.__proto__ || Object.getPrototypeOf(e3.prototype), "rightEncode", this).call(this, t7, "RRRR");
  } }]), e3;
}();
It.default = Xt;
var zt = {};
Object.defineProperty(zt, "__esModule", { value: true });
var Ht = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), Vt = gt, Ut = Ft(Et), $t = Ft(h3);
function Ft(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
var Wt = function(t6) {
  function e3(t7, n2) {
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, $t.default), Ht(e3, [{ key: "valid", value: function() {
    return -1 !== this.data.search(/^[0-9]{5}$/);
  } }, { key: "encode", value: function() {
    var t7, e4 = Vt.EAN5_STRUCTURE[t7 = this.data, t7.split("").map(function(t8) {
      return +t8;
    }).reduce(function(t8, e5, n2) {
      return n2 % 2 ? t8 + 9 * e5 : t8 + 3 * e5;
    }, 0) % 10];
    return { data: "1011" + (0, Ut.default)(this.data, e4, "01"), text: this.text };
  } }]), e3;
}();
zt.default = Wt;
var Qt = {};
Object.defineProperty(Qt, "__esModule", { value: true });
var Jt = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), Yt = gt, qt = Kt(Et), Zt = Kt(h3);
function Kt(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
var te = function(t6) {
  function e3(t7, n2) {
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, Zt.default), Jt(e3, [{ key: "valid", value: function() {
    return -1 !== this.data.search(/^[0-9]{2}$/);
  } }, { key: "encode", value: function() {
    var t7 = Yt.EAN2_STRUCTURE[parseInt(this.data) % 4];
    return { data: "1011" + (0, qt.default)(this.data, t7, "01"), text: this.text };
  } }]), e3;
}();
Qt.default = te;
var ee = {};
Object.defineProperty(ee, "__esModule", { value: true });
var ne = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}();
ee.checksum = ue;
var re = ie(Et), oe = ie(h3);
function ie(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
var ae = function(t6) {
  function e3(t7, n2) {
    !function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), -1 !== t7.search(/^[0-9]{11}$/) && (t7 += ue(t7));
    var r2 = function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
    return r2.displayValue = n2.displayValue, n2.fontSize > 10 * n2.width ? r2.fontSize = 10 * n2.width : r2.fontSize = n2.fontSize, r2.guardHeight = n2.height + r2.fontSize / 2 + n2.textMargin, r2;
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, oe.default), ne(e3, [{ key: "valid", value: function() {
    return -1 !== this.data.search(/^[0-9]{12}$/) && this.data[11] == ue(this.data);
  } }, { key: "encode", value: function() {
    return this.options.flat ? this.flatEncoding() : this.guardedEncoding();
  } }, { key: "flatEncoding", value: function() {
    var t7 = "";
    return t7 += "101", t7 += (0, re.default)(this.data.substr(0, 6), "LLLLLL"), t7 += "01010", t7 += (0, re.default)(this.data.substr(6, 6), "RRRRRR"), { data: t7 += "101", text: this.text };
  } }, { key: "guardedEncoding", value: function() {
    var t7 = [];
    return this.displayValue && t7.push({ data: "00000000", text: this.text.substr(0, 1), options: { textAlign: "left", fontSize: this.fontSize } }), t7.push({ data: "101" + (0, re.default)(this.data[0], "L"), options: { height: this.guardHeight } }), t7.push({ data: (0, re.default)(this.data.substr(1, 5), "LLLLL"), text: this.text.substr(1, 5), options: { fontSize: this.fontSize } }), t7.push({ data: "01010", options: { height: this.guardHeight } }), t7.push({ data: (0, re.default)(this.data.substr(6, 5), "RRRRR"), text: this.text.substr(6, 5), options: { fontSize: this.fontSize } }), t7.push({ data: (0, re.default)(this.data[11], "R") + "101", options: { height: this.guardHeight } }), this.displayValue && t7.push({ data: "00000000", text: this.text.substr(11, 1), options: { textAlign: "right", fontSize: this.fontSize } }), t7;
  } }]), e3;
}();
function ue(t6) {
  var e3, n2 = 0;
  for (e3 = 1; e3 < 11; e3 += 2)
    n2 += parseInt(t6[e3]);
  for (e3 = 0; e3 < 11; e3 += 2)
    n2 += 3 * parseInt(t6[e3]);
  return (10 - n2 % 10) % 10;
}
ee.default = ae;
var fe = {};
Object.defineProperty(fe, "__esModule", { value: true });
var le = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), ce = de(Et), se = de(h3), pe = ee;
function de(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
function he(t6, e3) {
  if (!t6)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e3 || "object" != typeof e3 && "function" != typeof e3 ? t6 : e3;
}
var ye = ["XX00000XXX", "XX10000XXX", "XX20000XXX", "XXX00000XX", "XXXX00000X", "XXXXX00005", "XXXXX00006", "XXXXX00007", "XXXXX00008", "XXXXX00009"], ve = [["EEEOOO", "OOOEEE"], ["EEOEOO", "OOEOEE"], ["EEOOEO", "OOEEOE"], ["EEOOOE", "OOEEEO"], ["EOEEOO", "OEOOEE"], ["EOOEEO", "OEEOOE"], ["EOOOEE", "OEEEOO"], ["EOEOEO", "OEOEOE"], ["EOEOOE", "OEOEEO"], ["EOOEOE", "OEEOEO"]], be = function(t6) {
  function e3(t7, n2) {
    !function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3);
    var r2 = he(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
    if (r2.isValid = false, -1 !== t7.search(/^[0-9]{6}$/))
      r2.middleDigits = t7, r2.upcA = _e(t7, "0"), r2.text = n2.text || "" + r2.upcA[0] + t7 + r2.upcA[r2.upcA.length - 1], r2.isValid = true;
    else {
      if (-1 === t7.search(/^[01][0-9]{7}$/))
        return he(r2);
      if (r2.middleDigits = t7.substring(1, t7.length - 1), r2.upcA = _e(r2.middleDigits, t7[0]), r2.upcA[r2.upcA.length - 1] !== t7[t7.length - 1])
        return he(r2);
      r2.isValid = true;
    }
    return r2.displayValue = n2.displayValue, n2.fontSize > 10 * n2.width ? r2.fontSize = 10 * n2.width : r2.fontSize = n2.fontSize, r2.guardHeight = n2.height + r2.fontSize / 2 + n2.textMargin, r2;
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, se.default), le(e3, [{ key: "valid", value: function() {
    return this.isValid;
  } }, { key: "encode", value: function() {
    return this.options.flat ? this.flatEncoding() : this.guardedEncoding();
  } }, { key: "flatEncoding", value: function() {
    var t7 = "";
    return t7 += "101", t7 += this.encodeMiddleDigits(), { data: t7 += "010101", text: this.text };
  } }, { key: "guardedEncoding", value: function() {
    var t7 = [];
    return this.displayValue && t7.push({ data: "00000000", text: this.text[0], options: { textAlign: "left", fontSize: this.fontSize } }), t7.push({ data: "101", options: { height: this.guardHeight } }), t7.push({ data: this.encodeMiddleDigits(), text: this.text.substring(1, 7), options: { fontSize: this.fontSize } }), t7.push({ data: "010101", options: { height: this.guardHeight } }), this.displayValue && t7.push({ data: "00000000", text: this.text[7], options: { textAlign: "right", fontSize: this.fontSize } }), t7;
  } }, { key: "encodeMiddleDigits", value: function() {
    var t7 = this.upcA[0], e4 = this.upcA[this.upcA.length - 1], n2 = ve[parseInt(e4)][parseInt(t7)];
    return (0, ce.default)(this.middleDigits, n2);
  } }]), e3;
}();
function _e(t6, e3) {
  for (var n2 = parseInt(t6[t6.length - 1]), r2 = ye[n2], o2 = "", i3 = 0, a4 = 0; a4 < r2.length; a4++) {
    var u3 = r2[a4];
    o2 += "X" === u3 ? t6[i3++] : u3;
  }
  return (o2 = "" + e3 + o2) + (0, pe.checksum)(o2);
}
fe.default = be, Object.defineProperty(bt, "__esModule", { value: true }), bt.UPCE = bt.UPC = bt.EAN2 = bt.EAN5 = bt.EAN8 = bt.EAN13 = void 0;
var ge = xe(_t), Oe = xe(It), Ee = xe(zt), we = xe(Qt), me = xe(ee), je = xe(fe);
function xe(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
bt.EAN13 = ge.default, bt.EAN8 = Oe.default, bt.EAN5 = Ee.default, bt.EAN2 = we.default, bt.UPC = me.default, bt.UPCE = je.default;
var Pe = {}, Se = {}, Ce = {};
Object.defineProperty(Ce, "__esModule", { value: true }), Ce.START_BIN = "1010", Ce.END_BIN = "11101", Ce.BINARIES = ["00110", "10001", "01001", "11000", "00101", "10100", "01100", "00011", "10010", "01010"], Object.defineProperty(Se, "__esModule", { value: true });
var Ae = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), Te = Ce, Me = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(h3);
function Re(t6, e3) {
  if (!(t6 instanceof e3))
    throw new TypeError("Cannot call a class as a function");
}
function Le(t6, e3) {
  if (!t6)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e3 || "object" != typeof e3 && "function" != typeof e3 ? t6 : e3;
}
var ke = function(t6) {
  function e3() {
    return Re(this, e3), Le(this, (e3.__proto__ || Object.getPrototypeOf(e3)).apply(this, arguments));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, Me.default), Ae(e3, [{ key: "valid", value: function() {
    return -1 !== this.data.search(/^([0-9]{2})+$/);
  } }, { key: "encode", value: function() {
    var t7 = this, e4 = this.data.match(/.{2}/g).map(function(e5) {
      return t7.encodePair(e5);
    }).join("");
    return { data: Te.START_BIN + e4 + Te.END_BIN, text: this.text };
  } }, { key: "encodePair", value: function(t7) {
    var e4 = Te.BINARIES[t7[1]];
    return Te.BINARIES[t7[0]].split("").map(function(t8, n2) {
      return ("1" === t8 ? "111" : "1") + ("1" === e4[n2] ? "000" : "0");
    }).join("");
  } }]), e3;
}();
Se.default = ke;
var Ie = {};
Object.defineProperty(Ie, "__esModule", { value: true });
var Ge = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), Be = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(Se);
var Ne = function(t6) {
  var e3 = t6.substr(0, 13).split("").map(function(t7) {
    return parseInt(t7, 10);
  }).reduce(function(t7, e4, n2) {
    return t7 + e4 * (3 - n2 % 2 * 2);
  }, 0);
  return 10 * Math.ceil(e3 / 10) - e3;
}, De = function(t6) {
  function e3(t7, n2) {
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), -1 !== t7.search(/^[0-9]{13}$/) && (t7 += Ne(t7)), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, Be.default), Ge(e3, [{ key: "valid", value: function() {
    return -1 !== this.data.search(/^[0-9]{14}$/) && +this.data[13] === Ne(this.data);
  } }]), e3;
}();
Ie.default = De, Object.defineProperty(Pe, "__esModule", { value: true }), Pe.ITF14 = Pe.ITF = void 0;
var Xe = He(Se), ze = He(Ie);
function He(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
Pe.ITF = Xe.default, Pe.ITF14 = ze.default;
var Ve = {}, Ue = {};
Object.defineProperty(Ue, "__esModule", { value: true });
var $e = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), Fe = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(h3);
var We = function(t6) {
  function e3(t7, n2) {
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, Fe.default), $e(e3, [{ key: "encode", value: function() {
    for (var t7 = "110", e4 = 0; e4 < this.data.length; e4++) {
      var n2 = parseInt(this.data[e4]).toString(2);
      n2 = Qe(n2, 4 - n2.length);
      for (var r2 = 0; r2 < n2.length; r2++)
        t7 += "0" == n2[r2] ? "100" : "110";
    }
    return { data: t7 += "1001", text: this.text };
  } }, { key: "valid", value: function() {
    return -1 !== this.data.search(/^[0-9]+$/);
  } }]), e3;
}();
function Qe(t6, e3) {
  for (var n2 = 0; n2 < e3; n2++)
    t6 = "0" + t6;
  return t6;
}
Ue.default = We;
var Je = {}, Ye = {};
Object.defineProperty(Ye, "__esModule", { value: true }), Ye.mod10 = function(t6) {
  for (var e3 = 0, n2 = 0; n2 < t6.length; n2++) {
    var r2 = parseInt(t6[n2]);
    (n2 + t6.length) % 2 == 0 ? e3 += r2 : e3 += 2 * r2 % 10 + Math.floor(2 * r2 / 10);
  }
  return (10 - e3 % 10) % 10;
}, Ye.mod11 = function(t6) {
  for (var e3 = 0, n2 = [2, 3, 4, 5, 6, 7], r2 = 0; r2 < t6.length; r2++) {
    var o2 = parseInt(t6[t6.length - 1 - r2]);
    e3 += n2[r2 % n2.length] * o2;
  }
  return (11 - e3 % 11) % 11;
}, Object.defineProperty(Je, "__esModule", { value: true });
var qe = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(Ue), Ze = Ye;
var Ke = function(t6) {
  function e3(t7, n2) {
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7 + (0, Ze.mod10)(t7), n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, qe.default), e3;
}();
Je.default = Ke;
var tn = {};
Object.defineProperty(tn, "__esModule", { value: true });
var en = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(Ue), nn = Ye;
var rn = function(t6) {
  function e3(t7, n2) {
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7 + (0, nn.mod11)(t7), n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, en.default), e3;
}();
tn.default = rn;
var on = {};
Object.defineProperty(on, "__esModule", { value: true });
var an = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(Ue), un = Ye;
var fn = function(t6) {
  function e3(t7, n2) {
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), t7 += (0, un.mod10)(t7), t7 += (0, un.mod10)(t7), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, an.default), e3;
}();
on.default = fn;
var ln = {};
Object.defineProperty(ln, "__esModule", { value: true });
var cn = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(Ue), sn = Ye;
var pn = function(t6) {
  function e3(t7, n2) {
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), t7 += (0, sn.mod11)(t7), t7 += (0, sn.mod10)(t7), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, cn.default), e3;
}();
ln.default = pn, Object.defineProperty(Ve, "__esModule", { value: true }), Ve.MSI1110 = Ve.MSI1010 = Ve.MSI11 = Ve.MSI10 = Ve.MSI = void 0;
var dn = _n(Ue), hn = _n(Je), yn = _n(tn), vn = _n(on), bn = _n(ln);
function _n(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
Ve.MSI = dn.default, Ve.MSI10 = hn.default, Ve.MSI11 = yn.default, Ve.MSI1010 = vn.default, Ve.MSI1110 = bn.default;
var gn = {};
Object.defineProperty(gn, "__esModule", { value: true }), gn.pharmacode = void 0;
var On = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), En = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(h3);
var wn = function(t6) {
  function e3(t7, n2) {
    !function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3);
    var r2 = function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
    return r2.number = parseInt(t7, 10), r2;
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, En.default), On(e3, [{ key: "encode", value: function() {
    for (var t7 = this.number, e4 = ""; !isNaN(t7) && 0 != t7; )
      t7 % 2 == 0 ? (e4 = "11100" + e4, t7 = (t7 - 2) / 2) : (e4 = "100" + e4, t7 = (t7 - 1) / 2);
    return { data: e4 = e4.slice(0, -2), text: this.text };
  } }, { key: "valid", value: function() {
    return this.number >= 3 && this.number <= 131070;
  } }]), e3;
}();
gn.pharmacode = wn;
var mn = {};
Object.defineProperty(mn, "__esModule", { value: true }), mn.codabar = void 0;
var jn = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), xn = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(h3);
var Pn = function(t6) {
  function e3(t7, n2) {
    !function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), 0 === t7.search(/^[0-9\-\$\:\.\+\/]+$/) && (t7 = "A" + t7 + "A");
    var r2 = function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7.toUpperCase(), n2));
    return r2.text = r2.options.text || r2.text.replace(/[A-D]/g, ""), r2;
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, xn.default), jn(e3, [{ key: "valid", value: function() {
    return -1 !== this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/);
  } }, { key: "encode", value: function() {
    for (var t7 = [], e4 = this.getEncodings(), n2 = 0; n2 < this.data.length; n2++)
      t7.push(e4[this.data.charAt(n2)]), n2 !== this.data.length - 1 && t7.push("0");
    return { text: this.text, data: t7.join("") };
  } }, { key: "getEncodings", value: function() {
    return { 0: "101010011", 1: "101011001", 2: "101001011", 3: "110010101", 4: "101101001", 5: "110101001", 6: "100101011", 7: "100101101", 8: "100110101", 9: "110100101", "-": "101001101", $: "101100101", ":": "1101011011", "/": "1101101011", ".": "1101101101", "+": "1011011011", A: "1011001001", B: "1001001011", C: "1010010011", D: "1010011001" };
  } }]), e3;
}();
mn.codabar = Pn;
var Sn = {};
Object.defineProperty(Sn, "__esModule", { value: true }), Sn.GenericBarcode = void 0;
var Cn = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), An = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(h3);
var Tn = function(t6) {
  function e3(t7, n2) {
    return function(t8, e4) {
      if (!(t8 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, e3), function(t8, e4) {
      if (!t8)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t8 : e4;
    }(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this, t7, n2));
  }
  return function(t7, e4) {
    if ("function" != typeof e4 && null !== e4)
      throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
    t7.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t7, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t7, e4) : t7.__proto__ = e4);
  }(e3, An.default), Cn(e3, [{ key: "encode", value: function() {
    return { data: "10101010101010101010101010101010101010101", text: this.text };
  } }, { key: "valid", value: function() {
    return true;
  } }]), e3;
}();
Sn.GenericBarcode = Tn, Object.defineProperty(p, "__esModule", { value: true });
var Mn = d3, Rn = j, Ln = bt, kn = Pe, In = Ve, Gn = gn, Bn = mn, Nn = Sn;
p.default = { CODE39: Mn.CODE39, CODE128: Rn.CODE128, CODE128A: Rn.CODE128A, CODE128B: Rn.CODE128B, CODE128C: Rn.CODE128C, EAN13: Ln.EAN13, EAN8: Ln.EAN8, EAN5: Ln.EAN5, EAN2: Ln.EAN2, UPC: Ln.UPC, UPCE: Ln.UPCE, ITF14: kn.ITF14, ITF: kn.ITF, MSI: In.MSI, MSI10: In.MSI10, MSI11: In.MSI11, MSI1010: In.MSI1010, MSI1110: In.MSI1110, pharmacode: Gn.pharmacode, codabar: Bn.codabar, GenericBarcode: Nn.GenericBarcode };
var Dn = {};
Object.defineProperty(Dn, "__esModule", { value: true });
var Xn = Object.assign || function(t6) {
  for (var e3 = 1; e3 < arguments.length; e3++) {
    var n2 = arguments[e3];
    for (var r2 in n2)
      Object.prototype.hasOwnProperty.call(n2, r2) && (t6[r2] = n2[r2]);
  }
  return t6;
};
Dn.default = function(t6, e3) {
  return Xn({}, t6, e3);
};
var zn = {};
Object.defineProperty(zn, "__esModule", { value: true }), zn.default = function(t6) {
  var e3 = [];
  return function t7(n2) {
    if (Array.isArray(n2))
      for (var r2 = 0; r2 < n2.length; r2++)
        t7(n2[r2]);
    else
      n2.text = n2.text || "", n2.data = n2.data || "", e3.push(n2);
  }(t6), e3;
};
var Hn = {};
Object.defineProperty(Hn, "__esModule", { value: true }), Hn.default = function(t6) {
  return t6.marginTop = t6.marginTop || t6.margin, t6.marginBottom = t6.marginBottom || t6.margin, t6.marginRight = t6.marginRight || t6.margin, t6.marginLeft = t6.marginLeft || t6.margin, t6;
};
var Vn = {}, Un = {}, $n = {};
Object.defineProperty($n, "__esModule", { value: true }), $n.default = function(t6) {
  var e3 = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];
  for (var n2 in e3)
    e3.hasOwnProperty(n2) && (n2 = e3[n2], "string" == typeof t6[n2] && (t6[n2] = parseInt(t6[n2], 10)));
  "string" == typeof t6.displayValue && (t6.displayValue = "false" != t6.displayValue);
  return t6;
};
var Fn = {};
Object.defineProperty(Fn, "__esModule", { value: true });
Fn.default = { width: 2, height: 100, format: "auto", displayValue: true, fontOptions: "", font: "monospace", text: void 0, textAlign: "center", textPosition: "bottom", textMargin: 2, fontSize: 20, background: "#ffffff", lineColor: "#000000", margin: 10, marginTop: void 0, marginBottom: void 0, marginLeft: void 0, marginRight: void 0, valid: function() {
} }, Object.defineProperty(Un, "__esModule", { value: true });
var Wn = Jn($n), Qn = Jn(Fn);
function Jn(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
Un.default = function(t6) {
  var e3 = {};
  for (var n2 in Qn.default)
    Qn.default.hasOwnProperty(n2) && (t6.hasAttribute("jsbarcode-" + n2.toLowerCase()) && (e3[n2] = t6.getAttribute("jsbarcode-" + n2.toLowerCase())), t6.hasAttribute("data-" + n2.toLowerCase()) && (e3[n2] = t6.getAttribute("data-" + n2.toLowerCase())));
  return e3.value = t6.getAttribute("jsbarcode-value") || t6.getAttribute("data-value"), e3 = (0, Wn.default)(e3);
};
var Yn = {}, qn = {}, Zn = {};
Object.defineProperty(Zn, "__esModule", { value: true }), Zn.getTotalWidthOfEncodings = Zn.calculateEncodingAttributes = Zn.getBarcodePadding = Zn.getEncodingHeight = Zn.getMaximumHeightOfEncodings = void 0;
var Kn = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(Dn);
function tr(t6, e3) {
  return e3.height + (e3.displayValue && t6.text.length > 0 ? e3.fontSize + e3.textMargin : 0) + e3.marginTop + e3.marginBottom;
}
function er(t6, e3, n2) {
  if (n2.displayValue && e3 < t6) {
    if ("center" == n2.textAlign)
      return Math.floor((t6 - e3) / 2);
    if ("left" == n2.textAlign)
      return 0;
    if ("right" == n2.textAlign)
      return Math.floor(t6 - e3);
  }
  return 0;
}
function nr(t6, e3, n2) {
  var r2;
  if (n2)
    r2 = n2;
  else {
    if ("undefined" == typeof document)
      return 0;
    r2 = document.createElement("canvas").getContext("2d");
  }
  r2.font = e3.fontOptions + " " + e3.fontSize + "px " + e3.font;
  var o2 = r2.measureText(t6);
  return o2 ? o2.width : 0;
}
Zn.getMaximumHeightOfEncodings = function(t6) {
  for (var e3 = 0, n2 = 0; n2 < t6.length; n2++)
    t6[n2].height > e3 && (e3 = t6[n2].height);
  return e3;
}, Zn.getEncodingHeight = tr, Zn.getBarcodePadding = er, Zn.calculateEncodingAttributes = function(t6, e3, n2) {
  for (var r2 = 0; r2 < t6.length; r2++) {
    var o2, i3 = t6[r2], a4 = (0, Kn.default)(e3, i3.options);
    o2 = a4.displayValue ? nr(i3.text, a4, n2) : 0;
    var u3 = i3.data.length * a4.width;
    i3.width = Math.ceil(Math.max(o2, u3)), i3.height = tr(i3, a4), i3.barcodePadding = er(o2, u3, a4);
  }
}, Zn.getTotalWidthOfEncodings = function(t6) {
  for (var e3 = 0, n2 = 0; n2 < t6.length; n2++)
    e3 += t6[n2].width;
  return e3;
}, Object.defineProperty(qn, "__esModule", { value: true });
var rr = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), or = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(Dn), ir = Zn;
var ar = function() {
  function t6(e3, n2, r2) {
    !function(t7, e4) {
      if (!(t7 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, t6), this.canvas = e3, this.encodings = n2, this.options = r2;
  }
  return rr(t6, [{ key: "render", value: function() {
    if (!this.canvas.getContext)
      throw new Error("The browser does not support canvas.");
    this.prepareCanvas();
    for (var t7 = 0; t7 < this.encodings.length; t7++) {
      var e3 = (0, or.default)(this.options, this.encodings[t7].options);
      this.drawCanvasBarcode(e3, this.encodings[t7]), this.drawCanvasText(e3, this.encodings[t7]), this.moveCanvasDrawing(this.encodings[t7]);
    }
    this.restoreCanvas();
  } }, { key: "prepareCanvas", value: function() {
    var t7 = this.canvas.getContext("2d");
    t7.save(), (0, ir.calculateEncodingAttributes)(this.encodings, this.options, t7);
    var e3 = (0, ir.getTotalWidthOfEncodings)(this.encodings), n2 = (0, ir.getMaximumHeightOfEncodings)(this.encodings);
    this.canvas.width = e3 + this.options.marginLeft + this.options.marginRight, this.canvas.height = n2, t7.clearRect(0, 0, this.canvas.width, this.canvas.height), this.options.background && (t7.fillStyle = this.options.background, t7.fillRect(0, 0, this.canvas.width, this.canvas.height)), t7.translate(this.options.marginLeft, 0);
  } }, { key: "drawCanvasBarcode", value: function(t7, e3) {
    var n2, r2 = this.canvas.getContext("2d"), o2 = e3.data;
    n2 = "top" == t7.textPosition ? t7.marginTop + t7.fontSize + t7.textMargin : t7.marginTop, r2.fillStyle = t7.lineColor;
    for (var i3 = 0; i3 < o2.length; i3++) {
      var a4 = i3 * t7.width + e3.barcodePadding;
      "1" === o2[i3] ? r2.fillRect(a4, n2, t7.width, t7.height) : o2[i3] && r2.fillRect(a4, n2, t7.width, t7.height * o2[i3]);
    }
  } }, { key: "drawCanvasText", value: function(t7, e3) {
    var n2, r2, o2 = this.canvas.getContext("2d"), i3 = t7.fontOptions + " " + t7.fontSize + "px " + t7.font;
    t7.displayValue && (r2 = "top" == t7.textPosition ? t7.marginTop + t7.fontSize - t7.textMargin : t7.height + t7.textMargin + t7.marginTop + t7.fontSize, o2.font = i3, "left" == t7.textAlign || e3.barcodePadding > 0 ? (n2 = 0, o2.textAlign = "left") : "right" == t7.textAlign ? (n2 = e3.width - 1, o2.textAlign = "right") : (n2 = e3.width / 2, o2.textAlign = "center"), o2.fillText(e3.text, n2, r2));
  } }, { key: "moveCanvasDrawing", value: function(t7) {
    this.canvas.getContext("2d").translate(t7.width, 0);
  } }, { key: "restoreCanvas", value: function() {
    this.canvas.getContext("2d").restore();
  } }]), t6;
}();
qn.default = ar;
var ur = {};
Object.defineProperty(ur, "__esModule", { value: true });
var fr = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}(), lr = function(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}(Dn), cr = Zn;
var sr = "http://www.w3.org/2000/svg", pr = function() {
  function t6(e3, n2, r2) {
    !function(t7, e4) {
      if (!(t7 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, t6), this.svg = e3, this.encodings = n2, this.options = r2, this.document = r2.xmlDocument || document;
  }
  return fr(t6, [{ key: "render", value: function() {
    var t7 = this.options.marginLeft;
    this.prepareSVG();
    for (var e3 = 0; e3 < this.encodings.length; e3++) {
      var n2 = this.encodings[e3], r2 = (0, lr.default)(this.options, n2.options), o2 = this.createGroup(t7, r2.marginTop, this.svg);
      this.setGroupOptions(o2, r2), this.drawSvgBarcode(o2, r2, n2), this.drawSVGText(o2, r2, n2), t7 += n2.width;
    }
  } }, { key: "prepareSVG", value: function() {
    for (; this.svg.firstChild; )
      this.svg.removeChild(this.svg.firstChild);
    (0, cr.calculateEncodingAttributes)(this.encodings, this.options);
    var t7 = (0, cr.getTotalWidthOfEncodings)(this.encodings), e3 = (0, cr.getMaximumHeightOfEncodings)(this.encodings), n2 = t7 + this.options.marginLeft + this.options.marginRight;
    this.setSvgAttributes(n2, e3), this.options.background && this.drawRect(0, 0, n2, e3, this.svg).setAttribute("style", "fill:" + this.options.background + ";");
  } }, { key: "drawSvgBarcode", value: function(t7, e3, n2) {
    var r2, o2 = n2.data;
    r2 = "top" == e3.textPosition ? e3.fontSize + e3.textMargin : 0;
    for (var i3 = 0, a4 = 0, u3 = 0; u3 < o2.length; u3++)
      a4 = u3 * e3.width + n2.barcodePadding, "1" === o2[u3] ? i3++ : i3 > 0 && (this.drawRect(a4 - e3.width * i3, r2, e3.width * i3, e3.height, t7), i3 = 0);
    i3 > 0 && this.drawRect(a4 - e3.width * (i3 - 1), r2, e3.width * i3, e3.height, t7);
  } }, { key: "drawSVGText", value: function(t7, e3, n2) {
    var r2, o2, i3 = this.document.createElementNS(sr, "text");
    e3.displayValue && (i3.setAttribute("style", "font:" + e3.fontOptions + " " + e3.fontSize + "px " + e3.font), o2 = "top" == e3.textPosition ? e3.fontSize - e3.textMargin : e3.height + e3.textMargin + e3.fontSize, "left" == e3.textAlign || n2.barcodePadding > 0 ? (r2 = 0, i3.setAttribute("text-anchor", "start")) : "right" == e3.textAlign ? (r2 = n2.width - 1, i3.setAttribute("text-anchor", "end")) : (r2 = n2.width / 2, i3.setAttribute("text-anchor", "middle")), i3.setAttribute("x", r2), i3.setAttribute("y", o2), i3.appendChild(this.document.createTextNode(n2.text)), t7.appendChild(i3));
  } }, { key: "setSvgAttributes", value: function(t7, e3) {
    var n2 = this.svg;
    n2.setAttribute("width", t7 + "px"), n2.setAttribute("height", e3 + "px"), n2.setAttribute("x", "0px"), n2.setAttribute("y", "0px"), n2.setAttribute("viewBox", "0 0 " + t7 + " " + e3), n2.setAttribute("xmlns", sr), n2.setAttribute("version", "1.1"), n2.setAttribute("style", "transform: translate(0,0)");
  } }, { key: "createGroup", value: function(t7, e3, n2) {
    var r2 = this.document.createElementNS(sr, "g");
    return r2.setAttribute("transform", "translate(" + t7 + ", " + e3 + ")"), n2.appendChild(r2), r2;
  } }, { key: "setGroupOptions", value: function(t7, e3) {
    t7.setAttribute("style", "fill:" + e3.lineColor + ";");
  } }, { key: "drawRect", value: function(t7, e3, n2, r2, o2) {
    var i3 = this.document.createElementNS(sr, "rect");
    return i3.setAttribute("x", t7), i3.setAttribute("y", e3), i3.setAttribute("width", n2), i3.setAttribute("height", r2), o2.appendChild(i3), i3;
  } }]), t6;
}();
ur.default = pr;
var dr = {};
Object.defineProperty(dr, "__esModule", { value: true });
var hr = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}();
var yr = function() {
  function t6(e3, n2, r2) {
    !function(t7, e4) {
      if (!(t7 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, t6), this.object = e3, this.encodings = n2, this.options = r2;
  }
  return hr(t6, [{ key: "render", value: function() {
    this.object.encodings = this.encodings;
  } }]), t6;
}();
dr.default = yr, Object.defineProperty(Yn, "__esModule", { value: true });
var vr = gr(qn), br = gr(ur), _r = gr(dr);
function gr(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
Yn.default = { CanvasRenderer: vr.default, SVGRenderer: br.default, ObjectRenderer: _r.default };
var Or = {};
function Er(t6, e3) {
  if (!(t6 instanceof e3))
    throw new TypeError("Cannot call a class as a function");
}
function wr(t6, e3) {
  if (!t6)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e3 || "object" != typeof e3 && "function" != typeof e3 ? t6 : e3;
}
function mr(t6, e3) {
  if ("function" != typeof e3 && null !== e3)
    throw new TypeError("Super expression must either be null or a function, not " + typeof e3);
  t6.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t6, enumerable: false, writable: true, configurable: true } }), e3 && (Object.setPrototypeOf ? Object.setPrototypeOf(t6, e3) : t6.__proto__ = e3);
}
Object.defineProperty(Or, "__esModule", { value: true });
var jr = function(t6) {
  function e3(t7, n2) {
    Er(this, e3);
    var r2 = wr(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this));
    return r2.name = "InvalidInputException", r2.symbology = t7, r2.input = n2, r2.message = '"' + r2.input + '" is not a valid input for ' + r2.symbology, r2;
  }
  return mr(e3, Error), e3;
}(), xr = function(t6) {
  function e3() {
    Er(this, e3);
    var t7 = wr(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this));
    return t7.name = "InvalidElementException", t7.message = "Not supported type to render on", t7;
  }
  return mr(e3, Error), e3;
}(), Pr = function(t6) {
  function e3() {
    Er(this, e3);
    var t7 = wr(this, (e3.__proto__ || Object.getPrototypeOf(e3)).call(this));
    return t7.name = "NoElementException", t7.message = "No element to render on.", t7;
  }
  return mr(e3, Error), e3;
}();
Or.InvalidInputException = jr, Or.InvalidElementException = xr, Or.NoElementException = Pr, Object.defineProperty(Vn, "__esModule", { value: true });
var Sr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t6) {
  return typeof t6;
} : function(t6) {
  return t6 && "function" == typeof Symbol && t6.constructor === Symbol && t6 !== Symbol.prototype ? "symbol" : typeof t6;
}, Cr = Mr(Un), Ar = Mr(Yn), Tr = Or;
function Mr(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
function Rr(t6) {
  if ("string" == typeof t6)
    return function(t7) {
      var e4 = document.querySelectorAll(t7);
      if (0 === e4.length)
        return;
      for (var n3 = [], r3 = 0; r3 < e4.length; r3++)
        n3.push(Rr(e4[r3]));
      return n3;
    }(t6);
  if (Array.isArray(t6)) {
    for (var e3 = [], n2 = 0; n2 < t6.length; n2++)
      e3.push(Rr(t6[n2]));
    return e3;
  }
  if ("undefined" != typeof HTMLCanvasElement && t6 instanceof HTMLImageElement)
    return r2 = t6, { element: o2 = document.createElement("canvas"), options: (0, Cr.default)(r2), renderer: Ar.default.CanvasRenderer, afterRender: function() {
      r2.setAttribute("src", o2.toDataURL());
    } };
  if (t6 && t6.nodeName && "svg" === t6.nodeName.toLowerCase() || "undefined" != typeof SVGElement && t6 instanceof SVGElement)
    return { element: t6, options: (0, Cr.default)(t6), renderer: Ar.default.SVGRenderer };
  if ("undefined" != typeof HTMLCanvasElement && t6 instanceof HTMLCanvasElement)
    return { element: t6, options: (0, Cr.default)(t6), renderer: Ar.default.CanvasRenderer };
  if (t6 && t6.getContext)
    return { element: t6, renderer: Ar.default.CanvasRenderer };
  if (t6 && "object" === (void 0 === t6 ? "undefined" : Sr(t6)) && !t6.nodeName)
    return { element: t6, renderer: Ar.default.ObjectRenderer };
  throw new Tr.InvalidElementException();
  var r2, o2;
}
Vn.default = Rr;
var Lr = {};
Object.defineProperty(Lr, "__esModule", { value: true });
var kr = function() {
  function t6(t7, e3) {
    for (var n2 = 0; n2 < e3.length; n2++) {
      var r2 = e3[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t7, r2.key, r2);
    }
  }
  return function(e3, n2, r2) {
    return n2 && t6(e3.prototype, n2), r2 && t6(e3, r2), e3;
  };
}();
var Ir = function() {
  function t6(e3) {
    !function(t7, e4) {
      if (!(t7 instanceof e4))
        throw new TypeError("Cannot call a class as a function");
    }(this, t6), this.api = e3;
  }
  return kr(t6, [{ key: "handleCatch", value: function(t7) {
    if ("InvalidInputException" !== t7.name)
      throw t7;
    if (this.api._options.valid === this.api._defaults.valid)
      throw t7.message;
    this.api._options.valid(false), this.api.render = function() {
    };
  } }, { key: "wrapBarcodeCall", value: function(t7) {
    try {
      var e3 = t7.apply(void 0, arguments);
      return this.api._options.valid(true), e3;
    } catch (n2) {
      return this.handleCatch(n2), this.api;
    }
  } }]), t6;
}();
Lr.default = Ir;
var Gr = $r(p), Br = $r(Dn), Nr = $r(zn), Dr = $r(Hn), Xr = $r(Vn), zr = $r($n), Hr = $r(Lr), Vr = Or, Ur = $r(Fn);
function $r(t6) {
  return t6 && t6.__esModule ? t6 : { default: t6 };
}
var Fr = function() {
}, Wr = function(t6, e3, n2) {
  var r2 = new Fr();
  if (void 0 === t6)
    throw Error("No element to render on was provided.");
  return r2._renderProperties = (0, Xr.default)(t6), r2._encodings = [], r2._options = Ur.default, r2._errorHandler = new Hr.default(r2), void 0 !== e3 && ((n2 = n2 || {}).format || (n2.format = qr()), r2.options(n2)[n2.format](e3, n2).render()), r2;
};
for (var Qr in Wr.getModule = function(t6) {
  return Gr.default[t6];
}, Gr.default)
  Gr.default.hasOwnProperty(Qr) && Jr(Gr.default, Qr);
function Jr(t6, e3) {
  Fr.prototype[e3] = Fr.prototype[e3.toUpperCase()] = Fr.prototype[e3.toLowerCase()] = function(n2, r2) {
    var o2 = this;
    return o2._errorHandler.wrapBarcodeCall(function() {
      r2.text = void 0 === r2.text ? void 0 : "" + r2.text;
      var i3 = (0, Br.default)(o2._options, r2);
      i3 = (0, zr.default)(i3);
      var a4 = t6[e3], u3 = Yr(n2, a4, i3);
      return o2._encodings.push(u3), o2;
    });
  };
}
function Yr(t6, e3, n2) {
  var r2 = new e3(t6 = "" + t6, n2);
  if (!r2.valid())
    throw new Vr.InvalidInputException(r2.constructor.name, t6);
  var o2 = r2.encode();
  o2 = (0, Nr.default)(o2);
  for (var i3 = 0; i3 < o2.length; i3++)
    o2[i3].options = (0, Br.default)(n2, o2[i3].options);
  return o2;
}
function qr() {
  return Gr.default.CODE128 ? "CODE128" : Object.keys(Gr.default)[0];
}
function Zr(t6, e3, n2) {
  e3 = (0, Nr.default)(e3);
  for (var r2 = 0; r2 < e3.length; r2++)
    e3[r2].options = (0, Br.default)(n2, e3[r2].options), (0, Dr.default)(e3[r2].options);
  (0, Dr.default)(n2), new t6.renderer(t6.element, e3, n2).render(), t6.afterRender && t6.afterRender();
}
Fr.prototype.options = function(t6) {
  return this._options = (0, Br.default)(this._options, t6), this;
}, Fr.prototype.blank = function(t6) {
  var e3 = new Array(t6 + 1).join("0");
  return this._encodings.push({ data: e3 }), this;
}, Fr.prototype.init = function() {
  var t6;
  if (this._renderProperties)
    for (var e3 in Array.isArray(this._renderProperties) || (this._renderProperties = [this._renderProperties]), this._renderProperties) {
      t6 = this._renderProperties[e3];
      var n2 = (0, Br.default)(this._options, t6.options);
      "auto" == n2.format && (n2.format = qr()), this._errorHandler.wrapBarcodeCall(function() {
        var e4 = Yr(n2.value, Gr.default[n2.format.toUpperCase()], n2);
        Zr(t6, e4, n2);
      });
    }
}, Fr.prototype.render = function() {
  if (!this._renderProperties)
    throw new Vr.NoElementException();
  if (Array.isArray(this._renderProperties))
    for (var t6 = 0; t6 < this._renderProperties.length; t6++)
      Zr(this._renderProperties[t6], this._encodings, this._options);
  else
    Zr(this._renderProperties, this._encodings, this._options);
  return this;
}, Fr.prototype._defaults = Ur.default, "undefined" != typeof window && (window.JsBarcode = Wr), "undefined" != typeof jQuery && (jQuery.fn.JsBarcode = function(t6, e3) {
  var n2 = [];
  return jQuery(this).each(function() {
    n2.push(this);
  }), Wr(n2, t6, e3);
});
var Kr = Wr;
const to = defineComponent({ name: "vue3Barcode", props: { value: { type: [String, Number], default: "" }, format: [String], width: [String, Number], height: [String, Number], displayValue: { type: [String, Boolean], default: true }, text: [String, Number], fontOptions: [String], font: [String], textAlign: [String], textPosition: [String], textMargin: [String, Number], fontSize: [String, Number], background: [String], lineColor: [String], margin: [String, Number], marginTop: [String, Number], marginBottom: [String, Number], marginLeft: [String, Number], marginRight: [String, Number], flat: [Boolean], ean128: [String, Boolean], elementTag: { type: String, default: "svg", validator: function(t6) {
  return -1 !== ["canvas", "svg", "img"].indexOf(t6);
} } }, setup(t6, { slots: u3 }) {
  const p2 = ref(true);
  return onMounted(() => {
    watch(t6, (u4) => {
      const f = (l2 = ((t7, e3) => {
        for (var n2 in e3 || (e3 = {}))
          o.call(e3, n2) && a3(t7, n2, e3[n2]);
        if (r)
          for (var n2 of r(e3))
            i2.call(e3, n2) && a3(t7, n2, e3[n2]);
        return t7;
      })({}, u4), e2(l2, n({ valid: (t7) => {
        p2.value = t7;
      } })));
      var l2;
      !function(t7) {
        for (var e3 in t7)
          t7.hasOwnProperty(e3) && void 0 === t7[e3] && delete t7[e3];
      }(f), Kr(document.querySelector(".vue3-barcode-element"), String(t6.value), f);
    }, { deep: true, immediate: true });
  }), () => h$1("div", [h$1(t6.elementTag, { style: { display: p2.value ? void 0 : "none" }, class: ["vue3-barcode-element"] }), h$1("div", { style: { display: p2.value ? "none" : void 0 } }, u3)]);
} });
to.install = (t6) => {
  t6.component(to.name, to);
};
const _sfc_main$i = {};
const _hoisted_1$h = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  version: "1.1",
  style: `
      width: 50px !important;
      height: 50px!important;
    `,
  viewBox: "0 0 256 256",
  "xml:space": "preserve"
};
const _hoisted_2$h = /* @__PURE__ */ createVNode("path", {
  d: "M 8 90 c -2.047 0 -4.095 -0.781 -5.657 -2.343 c -3.125 -3.125 -3.125 -8.189 0 -11.314 l 74 -74 c 3.125 -3.124 8.189 -3.124 11.314 0 c 3.124 3.124 3.124 8.189 0 11.313 l -74 74 C 12.095 89.219 10.047 90 8 90 z",
  style: { "stroke": "white", "stroke-width": "5", "stroke-dasharray": "none", "stroke-linecap": "butt", "stroke-linejoin": "miter", "stroke-miterlimit": "10", "fill": "rgb(250, 250, 250)", "fill-rule": "nonzero", "opacity": "1" },
  transform: " matrix(1 0 0 1 0 0) ",
  "stroke-linecap": "round"
}, null, -1);
const _hoisted_3$g = /* @__PURE__ */ createVNode("path", {
  d: "M 82 90 c -2.048 0 -4.095 -0.781 -5.657 -2.343 l -74 -74 c -3.125 -3.124 -3.125 -8.189 0 -11.313 c 3.124 -3.124 8.189 -3.124 11.313 0 l 74 74 c 3.124 3.125 3.124 8.189 0 11.314 C 86.095 89.219 84.048 90 82 90 z",
  style: { "stroke": "white", "stroke-width": "5", "stroke-dasharray": "none", "stroke-linecap": "butt", "stroke-linejoin": "miter", "stroke-miterlimit": "10", "fill": "rgb(250, 250, 250)", "fill-rule": "nonzero", "opacity": "1" },
  transform: " matrix(1 0 0 1 0 0) ",
  "stroke-linecap": "round"
}, null, -1);
function _sfc_render$i(_ctx, _cache) {
  return openBlock(), createBlock("svg", _hoisted_1$h, [
    _hoisted_2$h,
    _hoisted_3$g
  ]);
}
var Times = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i]]);
var QrModal_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$h = {
  name: "QrModal",
  props: {
    brandName: String,
    customer: Object,
    styling: Object,
    close: Function
  },
  setup(props) {
    let customerNumber;
    if (props.customer.extension == "MY") {
      customerNumber = `6${props.customer.phoneNumber}`;
    } else if (props.customer.extension == "ID") {
      customerNumber = `62${props.customer.phoneNumber}`;
    } else {
      customerNumber = props.customer.phoneNumber;
    }
    return {
      customer: computed(() => props.customer),
      brandName: computed(() => props.brandName),
      styling: computed(() => props.styling),
      close: computed(() => props.close),
      customerNumber
    };
  },
  components: {
    Times,
    QrcodeVue,
    Vue3Barcode: to
  }
};
const _withId$1 = /* @__PURE__ */ withScopeId("data-v-706b9696");
pushScopeId("data-v-706b9696");
const _hoisted_1$g = /* @__PURE__ */ createVNode("div", { class: "overlay" }, null, -1);
const _hoisted_2$g = { class: "exit-modal" };
const _hoisted_3$f = { class: "exit-modal-container" };
const _hoisted_4$e = { class: "qr-modal" };
const _hoisted_5$e = { class: "modal__container" };
const _hoisted_6$b = { class: "modal__dialog" };
const _hoisted_7$a = { class: "modal__content" };
const _hoisted_8$a = { class: "brand-name" };
const _hoisted_9$9 = { class: "barcode-container" };
const _hoisted_10$8 = { class: "qr-container" };
const _hoisted_11$8 = { class: "customer-details-name__container" };
const _hoisted_12$8 = { class: "customer-details-phone__container" };
popScopeId();
const _sfc_render$h = /* @__PURE__ */ _withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_Times = resolveComponent("Times");
  const _component_Vue3Barcode = resolveComponent("Vue3Barcode");
  const _component_QrcodeVue = resolveComponent("QrcodeVue");
  return openBlock(), createBlock("div", null, [
    _hoisted_1$g,
    createVNode("div", _hoisted_2$g, [
      createVNode("div", _hoisted_3$f, [
        createVNode("span", {
          onClick: _cache[1] || (_cache[1] = (...args) => $setup.close && $setup.close(...args))
        }, [
          createVNode(_component_Times, {
            size: 30,
            color: "#ffffff"
          })
        ])
      ])
    ]),
    createVNode("div", _hoisted_4$e, [
      createVNode("div", _hoisted_5$e, [
        createVNode("div", _hoisted_6$b, [
          createVNode("div", _hoisted_7$a, [
            createVNode("div", null, [
              createVNode("p", _hoisted_8$a, toDisplayString($setup.brandName), 1)
            ]),
            createVNode("div", _hoisted_9$9, [
              createVNode(_component_Vue3Barcode, {
                value: $setup.customerNumber,
                height: "100",
                width: "2",
                displayValue: "false"
              }, null, 8, ["value"])
            ]),
            createVNode("div", _hoisted_10$8, [
              createVNode(_component_QrcodeVue, {
                value: $setup.customerNumber,
                size: 150
              }, null, 8, ["value"])
            ]),
            createVNode("div", {
              class: "customer-details",
              style: `background-color: ${$setup.styling.background} !important`
            }, [
              createVNode("div", _hoisted_11$8, [
                createVNode("p", {
                  class: "customer-details-name",
                  style: `color: ${$setup.styling.text_color} !important`
                }, toDisplayString($setup.customer.name), 5)
              ]),
              createVNode("div", _hoisted_12$8, [
                createVNode("p", {
                  class: "customer-details-phone",
                  style: `color: ${$setup.styling.text_color} !important`
                }, toDisplayString($setup.customerNumber), 5)
              ])
            ], 4)
          ])
        ])
      ])
    ])
  ]);
});
var QrModal = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__scopeId", "data-v-706b9696"]]);
const _sfc_main$g = {
  name: "Scanner",
  props: {
    color: String
  }
};
const _hoisted_1$f = /* @__PURE__ */ createVNode("polygon", {
  class: "cls-1",
  points: "0.5 15.07 3.43 15.07 3.43 3.43 15.07 3.43 15.07 0.5 0.5 0.5 0.5 15.07"
}, null, -1);
const _hoisted_2$f = /* @__PURE__ */ createVNode("polygon", {
  class: "cls-1",
  points: "67.57 0.5 67.57 3.43 79.21 3.43 79.21 15.07 82.14 15.07 82.14 0.5 67.57 0.5"
}, null, -1);
const _hoisted_3$e = /* @__PURE__ */ createVNode("polygon", {
  class: "cls-1",
  points: "3.43 67.87 0.5 67.87 0.5 82.43 15.07 82.43 15.07 79.5 3.43 79.5 3.43 67.87"
}, null, -1);
const _hoisted_4$d = /* @__PURE__ */ createVNode("polygon", {
  class: "cls-1",
  points: "79.21 79.5 67.57 79.5 67.57 82.43 82.14 82.43 82.14 67.87 79.21 67.87 79.21 79.5"
}, null, -1);
const _hoisted_5$d = /* @__PURE__ */ createVNode("path", {
  d: "M262.65,239.79h-77.8a1.93,1.93,0,0,1-1.94-1.93h0a1.94,1.94,0,0,1,1.94-1.94h77.8a1.94,1.94,0,0,1,1.94,1.94h0A1.93,1.93,0,0,1,262.65,239.79Z",
  transform: "translate(-182.43 -196.39)"
}, null, -1);
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    id: "OBJECTS",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 82.64 82.93",
    style: `
      fill: ${$props.color} !important;
      width: 40px !important;
      height: 40px !important;
    `
  }, [
    _hoisted_1$f,
    _hoisted_2$f,
    _hoisted_3$e,
    _hoisted_4$d,
    createVNode("rect", {
      class: "cls-2",
      x: "7.61",
      y: "8.62",
      width: "67.42",
      height: "65.69",
      style: { opacity: 0.3, fill: $props.color }
    }, null, 4),
    _hoisted_5$d
  ], 4);
}
var Scanner = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g]]);
const _sfc_main$f = {
  name: "Diamond",
  props: {
    color: String
  }
};
const _hoisted_1$e = /* @__PURE__ */ createVNode("title", null, "Icon_Daimond-02", -1);
const _hoisted_2$e = /* @__PURE__ */ createVNode("path", {
  d: "M425.67,379.93,413.6,365.5a1.65,1.65,0,0,0-1.26-.59H363a1.65,1.65,0,0,0-1.26.59L349.66,380a1.69,1.69,0,0,0-.32,1.07v.15a1.58,1.58,0,0,0,.31.75l36.7,50.24a1.58,1.58,0,0,0,.31.32.47.47,0,0,0,.09.06,1.74,1.74,0,0,0,.33.18l.12,0a1.56,1.56,0,0,0,.48.08,1.5,1.5,0,0,0,.47-.08l.12,0a1.74,1.74,0,0,0,.33-.18.47.47,0,0,0,.09-.06,1.39,1.39,0,0,0,.32-.32l36.65-50.16A1.67,1.67,0,0,0,425.67,379.93Zm-4.78-.56H403.14l-6.94-11.15h15.37Zm-45.5,3.38,24.6,0-12.3,42.53Zm.74-3.4,6.94-11.14h9.24l6.94,11.15Zm-12.31-11.14h15.36l-6.93,11.14H354.51Zm8.1,14.44,11.59,40.07-29.27-40.08Zm19.95,40.07,11.58-40.06h17.68Z",
  transform: "translate(-335.19 -339.71)"
}, null, -1);
const _hoisted_3$d = /* @__PURE__ */ createVNode("path", {
  d: "M387.69,444.71a52.5,52.5,0,1,1,52.5-52.5A52.57,52.57,0,0,1,387.69,444.71Zm0-102a49.5,49.5,0,1,0,49.5,49.5A49.56,49.56,0,0,0,387.69,342.71Z",
  transform: "translate(-335.19 -339.71)"
}, null, -1);
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    id: "_123",
    "data-name": "123",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 105 105",
    style: `
      fill: ${$props.color} !important;
      width: 40px !important;
      height: 40px !important;
      `
  }, [
    _hoisted_1$e,
    _hoisted_2$e,
    _hoisted_3$d
  ], 4);
}
var Diamond = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f]]);
const _sfc_main$e = {
  name: "SMS Reminder Svg",
  props: {
    color: String
  }
};
const _hoisted_1$d = /* @__PURE__ */ createVNode("title", null, "Icon_SMSRemind", -1);
const _hoisted_2$d = /* @__PURE__ */ createVNode("path", {
  d: "M2826.47,2546.86v59.58H2683.11v-214h143.36v15.41h11.25v-39.55a21.45,21.45,0,0,0-21.45-21.45H2693.84a21.46,21.46,0,0,0-21.46,21.45v263.38a21.46,21.46,0,0,0,21.46,21.45h122.43a21.45,21.45,0,0,0,21.45-21.45v-84.83Zm-89.86-178.06a6.08,6.08,0,0,1,6.08-6.08H2768a6.08,6.08,0,0,1,6.08,6.08V2370a6.08,6.08,0,0,1-6.08,6.08h-25.28a6.08,6.08,0,0,1-6.08-6.08Zm37.44,261.28a6.09,6.09,0,0,1-6.08,6.09h-25.28a6.09,6.09,0,0,1-6.08-6.09v-1.17a6.09,6.09,0,0,1,6.08-6.09H2768a6.09,6.09,0,0,1,6.08,6.09Z",
  transform: "translate(-2672.38 -2346.86)"
}, null, -1);
const _hoisted_3$c = /* @__PURE__ */ createVNode("path", {
  d: "M2835.25,2451.59l.86-.08,1.07-.13c1.43-.18,2.84-.42,4.24-.74a44.17,44.17,0,0,0,8-2.6,23.32,23.32,0,0,0,6.63-4.09,4.7,4.7,0,0,0,1.46-2.19,1.59,1.59,0,0,0,0-.69,2.9,2.9,0,0,0-.46-.89,7.93,7.93,0,0,0-1-1.07,7.28,7.28,0,0,0-1.24-.93,6.19,6.19,0,0,0-2.75-.84,12.72,12.72,0,0,0-6.77,1.88,25.14,25.14,0,0,0-6.31,5.08,17.23,17.23,0,0,0-4,7h0c0,.06,0,.11,0,.17A.37.37,0,0,0,2835.25,2451.59Z",
  transform: "translate(-2672.38 -2346.86)"
}, null, -1);
const _hoisted_4$c = /* @__PURE__ */ createVNode("path", {
  d: "M2828.72,2451.32a17.23,17.23,0,0,0-4-7,25.14,25.14,0,0,0-6.31-5.08,12.72,12.72,0,0,0-6.77-1.88,6.15,6.15,0,0,0-2.75.84,6.91,6.91,0,0,0-1.24.93,7.32,7.32,0,0,0-1,1.07,2.9,2.9,0,0,0-.46.89,1.59,1.59,0,0,0,0,.69,4.7,4.7,0,0,0,1.46,2.19,23.32,23.32,0,0,0,6.63,4.09,44.17,44.17,0,0,0,8,2.6c1.4.32,2.81.56,4.24.74l1.07.13.86.08a.37.37,0,0,0,.27-.09c.06-.06,0-.11,0-.17Z",
  transform: "translate(-2672.38 -2346.86)"
}, null, -1);
const _hoisted_5$c = /* @__PURE__ */ createVNode("path", {
  d: "M2906.08,2515c0-3.12,0-6.19,0-9.2,0-12.05-.05-23.21-.07-33.35s-.06-19.27-.08-27.26c0-4,0-7.69-.08-11.11a18.7,18.7,0,0,0-2.55-8.87,15.55,15.55,0,0,0-9.22-7.31,12.12,12.12,0,0,0-3-.47c-.66,0-1,0-1,0h0s-.45,0-1.31-.06l-3.87-.07-14.87-.12-54.68-.2-37.76-.08h-5.13a15.63,15.63,0,0,0-5.29.92,16.46,16.46,0,0,0-8.5,7.46,19.08,19.08,0,0,0-2.11,5.8,34.13,34.13,0,0,0-.35,6.28q0,6.22,0,12.6c0,17,0,34.9,0,53.43q0,7,0,14a24.28,24.28,0,0,0,.71,7.21,18.44,18.44,0,0,0,3.22,6.43,15.48,15.48,0,0,0,11.8,6.2l13.13,0v22l.94-.79,25.07-21.21c29.1-.07,56.28.09,80.9-.21,6.37-.75,11.72-6.05,13.42-12.44a20.66,20.66,0,0,0,.69-4.87C2906.11,2518.09,2906.08,2516.53,2906.08,2515Zm-110.59-57.48h32.11v13.06h-32.11Zm32.37,61.37h-28.73v-45.08h28.73Zm2.52-66a2.65,2.65,0,0,1-1.58,1l-.29,0-.15,0h-2c-1.5,0-3-.06-4.51-.17a50.66,50.66,0,0,1-9.06-1.43,30.9,30.9,0,0,1-4.5-1.51,19.26,19.26,0,0,1-4.37-2.52,11.48,11.48,0,0,1-2-2,8.85,8.85,0,0,1-1.54-2.91,7.2,7.2,0,0,1-.14-3.66,8.39,8.39,0,0,1,1.37-3.07,12.55,12.55,0,0,1,2-2.18,12,12,0,0,1,2.32-1.65,11.41,11.41,0,0,1,5.66-1.42,14,14,0,0,1,5.31,1.19,19.4,19.4,0,0,1,4.3,2.58,28.6,28.6,0,0,1,6.32,7.07,26.44,26.44,0,0,1,2.2,4.14,16.15,16.15,0,0,1,1.27,4.57v0A2.49,2.49,0,0,1,2830.38,2452.83Zm2.92,0a2.49,2.49,0,0,1-.52-1.87v0a16.15,16.15,0,0,1,1.27-4.57,26.44,26.44,0,0,1,2.2-4.14,28.6,28.6,0,0,1,6.32-7.07,19.4,19.4,0,0,1,4.3-2.58,14,14,0,0,1,5.31-1.19,11.48,11.48,0,0,1,5.67,1.42,12.26,12.26,0,0,1,2.31,1.65,12.55,12.55,0,0,1,2,2.18,8.55,8.55,0,0,1,1.37,3.07,7.2,7.2,0,0,1-.14,3.66,8.85,8.85,0,0,1-1.54,2.91,11.48,11.48,0,0,1-2,2,19.26,19.26,0,0,1-4.37,2.52,30.9,30.9,0,0,1-4.5,1.51,50.66,50.66,0,0,1-9.06,1.43c-1.51.11-3,.16-4.51.17h-2l-.15,0-.29,0A2.65,2.65,0,0,1,2833.3,2452.83Zm29.85,66h-28.74v-45.08h28.74Zm3.63-48.31h-32.11v-13.06h32.11Z",
  transform: "translate(-2672.38 -2346.86)"
}, null, -1);
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    id: "Layer_1",
    "data-name": "Layer 1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 233.7 306.28",
    style: `
      fill: ${$props.color} !important;
      width: 120px !important;
      height: 120px !important;
    `
  }, [
    _hoisted_1$d,
    _hoisted_2$d,
    _hoisted_3$c,
    _hoisted_4$c,
    _hoisted_5$c
  ], 4);
}
var SmsRemind = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e]]);
var SmsReminder_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$d = {
  name: "QrModal",
  props: {
    close: Function,
    count: Number,
    styling: Object,
    toReward: Function
  },
  setup(props) {
    const primaryTheme = {
      color: `${props.styling.icon_button_color} !important`
    };
    const buttonText = {
      color: `${props.styling.button_text_color} !important`
    };
    return {
      close: computed(() => props.close),
      count: computed(() => props.count),
      styling: computed(() => props.styling),
      toReward: computed(() => props.toReward),
      primaryTheme,
      buttonText
    };
  },
  components: {
    SmsRemind,
    Times
  }
};
const _withId = /* @__PURE__ */ withScopeId("data-v-88f79618");
pushScopeId("data-v-88f79618");
const _hoisted_1$c = /* @__PURE__ */ createVNode("div", { class: "overlay" }, null, -1);
const _hoisted_2$c = { class: "exit-modal" };
const _hoisted_3$b = { class: "exit-modal-container" };
const _hoisted_4$b = { class: "qr-modal" };
const _hoisted_5$b = { class: "modal__container" };
const _hoisted_6$a = { class: "modal__dialog" };
const _hoisted_7$9 = { class: "modal__content" };
const _hoisted_8$9 = { class: "img-container" };
const _hoisted_9$8 = { class: "msg-container" };
const _hoisted_10$7 = /* @__PURE__ */ createTextVNode(" You have ");
const _hoisted_11$7 = /* @__PURE__ */ createTextVNode(" active SMS rewards ");
const _hoisted_12$7 = { style: { "margin-bottom": "1rem !important" } };
popScopeId();
const _sfc_render$d = /* @__PURE__ */ _withId((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_Times = resolveComponent("Times");
  const _component_SmsRemind = resolveComponent("SmsRemind");
  return openBlock(), createBlock("div", null, [
    _hoisted_1$c,
    createVNode("div", _hoisted_2$c, [
      createVNode("div", _hoisted_3$b, [
        createVNode("span", {
          onClick: _cache[1] || (_cache[1] = (...args) => $setup.close && $setup.close(...args))
        }, [
          createVNode(_component_Times, {
            size: 30,
            color: "#ffffff"
          })
        ])
      ])
    ]),
    createVNode("div", _hoisted_4$b, [
      createVNode("div", _hoisted_5$b, [
        createVNode("div", _hoisted_6$a, [
          createVNode("div", _hoisted_7$9, [
            createVNode("div", _hoisted_8$9, [
              createVNode(_component_SmsRemind, {
                color: $setup.styling.icon_color
              }, null, 8, ["color"])
            ]),
            createVNode("div", _hoisted_9$8, [
              createVNode("p", null, [
                _hoisted_10$7,
                createVNode("span", {
                  style: `color: ${$setup.styling.icon_color} !important`
                }, toDisplayString($setup.count), 5),
                _hoisted_11$7
              ])
            ]),
            createVNode("div", _hoisted_12$7, [
              createVNode("button", {
                onClick: _cache[2] || (_cache[2] = ($event) => $setup.toReward("reward")),
                style: {
                  background: $setup.primaryTheme.color,
                  borderColor: $setup.primaryTheme.color,
                  color: $setup.buttonText.color
                },
                class: "btn-view"
              }, " View ", 4)
            ])
          ])
        ])
      ])
    ])
  ]);
});
var SmsReminder = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-88f79618"]]);
const _sfc_main$c = {
  name: "Calendar",
  props: {
    color: String
  }
};
const _hoisted_1$b = /* @__PURE__ */ createVNode("title", null, "Icon_Calendar", -1);
const _hoisted_2$b = /* @__PURE__ */ createVNode("path", {
  d: "M1984.42,519.1a6.64,6.64,0,0,1-6.64,6.65h0a6.65,6.65,0,0,1-6.65-6.65v-9.85a6.65,6.65,0,0,1,6.65-6.65h0a6.64,6.64,0,0,1,6.64,6.65Z",
  transform: "translate(-1959.8 -502.6)"
}, null, -1);
const _hoisted_3$a = /* @__PURE__ */ createVNode("path", {
  d: "M2035.29,514.17v4.93a8.81,8.81,0,1,1-17.61,0v-4.93h-31.09v4.93a8.81,8.81,0,1,1-17.62,0v-4.93h-9.17v74.19h85.56V514.17Zm3.6,67.72h-72.62V538.36h72.62Z",
  transform: "translate(-1959.8 -502.6)"
}, null, -1);
const _hoisted_4$a = /* @__PURE__ */ createVNode("path", {
  d: "M2033.14,519.1a6.65,6.65,0,0,1-6.65,6.65h0a6.66,6.66,0,0,1-6.66-6.65v-9.85a6.66,6.66,0,0,1,6.66-6.65h0a6.65,6.65,0,0,1,6.65,6.65Z",
  transform: "translate(-1959.8 -502.6)"
}, null, -1);
const _hoisted_5$a = /* @__PURE__ */ createVNode("rect", {
  class: "cls-1",
  x: "12.14",
  y: "44.32",
  width: "11.84",
  height: "11.84"
}, null, -1);
const _hoisted_6$9 = /* @__PURE__ */ createVNode("rect", {
  class: "cls-1",
  x: "12.14",
  y: "61.01",
  width: "11.84",
  height: "11.84"
}, null, -1);
const _hoisted_7$8 = /* @__PURE__ */ createVNode("rect", {
  class: "cls-1",
  x: "28.62",
  y: "44.32",
  width: "11.84",
  height: "11.84"
}, null, -1);
const _hoisted_8$8 = /* @__PURE__ */ createVNode("rect", {
  class: "cls-1",
  x: "28.62",
  y: "61.01",
  width: "11.84",
  height: "11.84"
}, null, -1);
const _hoisted_9$7 = /* @__PURE__ */ createVNode("rect", {
  class: "cls-1",
  x: "45.1",
  y: "44.32",
  width: "11.84",
  height: "11.84"
}, null, -1);
const _hoisted_10$6 = /* @__PURE__ */ createVNode("rect", {
  class: "cls-1",
  x: "45.1",
  y: "61.01",
  width: "11.84",
  height: "11.84"
}, null, -1);
const _hoisted_11$6 = /* @__PURE__ */ createVNode("rect", {
  class: "cls-1",
  x: "61.58",
  y: "44.32",
  width: "11.84",
  height: "11.84"
}, null, -1);
const _hoisted_12$6 = /* @__PURE__ */ createVNode("rect", {
  class: "cls-1",
  x: "61.58",
  y: "61.01",
  width: "11.84",
  height: "11.84"
}, null, -1);
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    id: "Layer_1",
    "data-name": "Layer 1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 85.56 85.76",
    style: `
      fill: ${$props.color} !important;
      width: 18px !important;
      height: 18px !important;
    `
  }, [
    _hoisted_1$b,
    _hoisted_2$b,
    _hoisted_3$a,
    _hoisted_4$a,
    _hoisted_5$a,
    _hoisted_6$9,
    _hoisted_7$8,
    _hoisted_8$8,
    _hoisted_9$7,
    _hoisted_10$6,
    _hoisted_11$6,
    _hoisted_12$6
  ], 4);
}
var Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
var SmsRewards_vue_vue_type_style_index_0_lang = "";
const _sfc_main$b = {
  name: "SmsReward",
  props: {
    offer: Object,
    changeTab: Function,
    styling: Object
  },
  setup(props) {
    const offers = ref([]);
    offers.value = props.offer.filter((x3) => x3.status == "Redeem");
    const used = ref([]);
    used.value = props.offer.filter((x3) => x3.status != "Redeem").sort((a4, b3) => {
      return new Date(b3.expiryDate) - new Date(a4.expiryDate);
    });
    const active = ref(true);
    function switchTab() {
      active.value = !active.value;
    }
    const activeSelected = computed(() => {
      return {
        "mulah-sr__selected": active.value,
        "mulah-sr__not-selected": !active.value
      };
    });
    const usedSelected = computed(() => {
      return {
        "mulah-sr__selected": !active.value,
        "mulah-sr__not-selected": active.value
      };
    });
    const primaryTheme = {
      color: `${props.styling.icon_button_color} !important`
    };
    const cssVars = {
      "--color": `${props.styling.selected_color}`,
      "--unselect": `${props.styling.unselect_color}`
    };
    const buttonText = {
      color: `${props.styling.button_text_color} !important`
    };
    const cardBackground = {
      background: `${props.styling.card_background} !important`
    };
    const formatDate = (string) => {
      const target = string.match(/(\d*)\/*-*(\d*)\/*-*(\d*).*/);
      return `${target[3]}/${target[2]}/${target[1]}`;
    };
    return {
      offers,
      formatDate,
      cssVars,
      used,
      active,
      switchTab,
      activeSelected,
      usedSelected,
      primaryTheme,
      changeTab: computed(() => props.changeTab),
      buttonText,
      cardBackground
    };
  },
  components: {
    Gift,
    Calendar
  }
};
const _hoisted_1$a = /* @__PURE__ */ createVNode("h1", { class: "mulah-sr__title" }, "SMS Rewards", -1);
const _hoisted_2$a = { class: "mulah-sr__options" };
const _hoisted_3$9 = {
  key: 0,
  class: "mulah-sr__container"
};
const _hoisted_4$9 = {
  key: 0,
  class: "mulah-sr__empty"
};
const _hoisted_5$9 = /* @__PURE__ */ createVNode("p", null, "- No Active Sms -", -1);
const _hoisted_6$8 = { class: "promotion-container" };
const _hoisted_7$7 = { class: "gift-container" };
const _hoisted_8$7 = { class: "title-container" };
const _hoisted_9$6 = { class: "offer-title" };
const _hoisted_10$5 = { class: "calendar-container" };
const _hoisted_11$5 = { class: "code-container" };
const _hoisted_12$5 = { class: "code-title" };
const _hoisted_13$4 = /* @__PURE__ */ createTextVNode(" SMS Code: ");
const _hoisted_14$4 = {
  key: 1,
  class: "mulah-sr__container"
};
const _hoisted_15$4 = {
  key: 0,
  class: "mulah-sr__empty"
};
const _hoisted_16$4 = /* @__PURE__ */ createVNode("p", null, "- No Past Sms -", -1);
const _hoisted_17$4 = { class: "promotion-container used-container" };
const _hoisted_18$4 = { class: "gift-container" };
const _hoisted_19$3 = { class: "title-container" };
const _hoisted_20$3 = {
  class: "offer-title",
  style: { "{\n                  color": "'#646464' !important" }
};
const _hoisted_21$3 = { class: "calendar-container" };
const _hoisted_22$3 = {
  class: "expiry",
  style: { "{\n                  color": "'#aaaaaa' !important" }
};
const _hoisted_23$3 = { class: "code-container" };
const _hoisted_24$1 = {
  key: 0,
  class: "code",
  style: { "font-weight": "bolder !important", "color": "#000000 !important", "text-align": "right !important" }
};
const _hoisted_25 = {
  key: 1,
  class: "code",
  style: { "color": "#000000 !important" }
};
const _hoisted_26 = { class: "mulah-sr__button__container" };
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Gift = resolveComponent("Gift");
  const _component_Calendar = resolveComponent("Calendar");
  return openBlock(), createBlock("div", {
    class: "mulah-sr",
    style: $setup.cssVars
  }, [
    _hoisted_1$a,
    createVNode("div", _hoisted_2$a, [
      createVNode("span", {
        onClick: _cache[1] || (_cache[1] = (...args) => $setup.switchTab && $setup.switchTab(...args)),
        class: $setup.activeSelected
      }, "Active SMS", 2),
      createVNode("span", {
        onClick: _cache[2] || (_cache[2] = (...args) => $setup.switchTab && $setup.switchTab(...args)),
        class: $setup.usedSelected
      }, "Past SMS", 2)
    ]),
    $setup.active ? (openBlock(), createBlock("div", _hoisted_3$9, [
      $setup.offers.length == 0 ? (openBlock(), createBlock("div", _hoisted_4$9, [
        _hoisted_5$9
      ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList($setup.offers, (offer, index) => {
        return openBlock(), createBlock("div", {
          class: "mulah-sr__card",
          style: $setup.cardBackground,
          key: `promotion-${index}`
        }, [
          createVNode("div", _hoisted_6$8, [
            createVNode("div", _hoisted_7$7, [
              createVNode(_component_Gift, {
                size: 21,
                color: $setup.primaryTheme.color
              }, null, 8, ["color"])
            ]),
            createVNode("div", _hoisted_8$7, [
              createVNode("p", _hoisted_9$6, toDisplayString(offer.title), 1)
            ]),
            createVNode("div", _hoisted_10$5, [
              createVNode(_component_Calendar, {
                color: $setup.primaryTheme.color
              }, null, 8, ["color"]),
              createVNode("p", {
                class: "expiry",
                style: $setup.primaryTheme
              }, " Expiry " + toDisplayString($setup.formatDate(offer.expiryDate)), 5)
            ]),
            createVNode("div", _hoisted_11$5, [
              createVNode("p", _hoisted_12$5, [
                _hoisted_13$4,
                createVNode("span", {
                  class: "code",
                  style: $setup.primaryTheme
                }, toDisplayString(offer.code), 5)
              ])
            ])
          ])
        ], 4);
      }), 128))
    ])) : (openBlock(), createBlock("div", _hoisted_14$4, [
      $setup.used.length == 0 ? (openBlock(), createBlock("div", _hoisted_15$4, [
        _hoisted_16$4
      ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList($setup.used, (offer, index) => {
        return openBlock(), createBlock("div", {
          class: "mulah-sr__card",
          key: `promotion-${index}`,
          style: $setup.cardBackground
        }, [
          createVNode("div", _hoisted_17$4, [
            createVNode("div", _hoisted_18$4, [
              createVNode(_component_Gift, {
                size: 21,
                color: "#aaaaaa"
              })
            ]),
            createVNode("div", _hoisted_19$3, [
              createVNode("p", _hoisted_20$3, toDisplayString(offer.title), 1)
            ]),
            createVNode("div", _hoisted_21$3, [
              createVNode(_component_Calendar, { color: "#aaaaaa" }),
              createVNode("p", _hoisted_22$3, " Expiry " + toDisplayString($setup.formatDate(offer.expiryDate)), 1)
            ]),
            createVNode("div", _hoisted_23$3, [
              offer.status == "Expired" ? (openBlock(), createBlock("p", _hoisted_24$1, toDisplayString(offer.status), 1)) : (openBlock(), createBlock("p", _hoisted_25, " Used on " + toDisplayString($setup.formatDate(offer.usedAt)), 1))
            ])
          ])
        ], 4);
      }), 128))
    ])),
    createVNode("div", _hoisted_26, [
      createVNode("button", {
        id: "mulah-sr__button",
        style: {
          background: $setup.primaryTheme.color,
          borderColor: $setup.primaryTheme.color,
          color: $setup.buttonText.color
        },
        onClick: _cache[3] || (_cache[3] = ($event) => $setup.changeTab("home"))
      }, " Back ", 4)
    ])
  ], 4);
}
var SmsRewards = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
var format$1 = { exports: {} };
var format = { exports: {} };
var isValid = { exports: {} };
var isDate = { exports: {} };
var requiredArgs = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = requiredArgs2;
  function requiredArgs2(required, args) {
    if (args.length < required) {
      throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
    }
  }
  module.exports = exports.default;
})(requiredArgs, requiredArgs.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isDate2;
  var _index = _interopRequireDefault(requiredArgs.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof2 = function _typeof3(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof2 = function _typeof3(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof2(obj);
  }
  function isDate2(value) {
    (0, _index.default)(1, arguments);
    return value instanceof Date || _typeof2(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
  }
  module.exports = exports.default;
})(isDate, isDate.exports);
var toDate$1 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toDate2;
  var _index = _interopRequireDefault(requiredArgs.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof2 = function _typeof3(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof2 = function _typeof3(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof2(obj);
  }
  function toDate2(argument) {
    (0, _index.default)(1, arguments);
    var argStr = Object.prototype.toString.call(argument);
    if (argument instanceof Date || _typeof2(argument) === "object" && argStr === "[object Date]") {
      return new Date(argument.getTime());
    } else if (typeof argument === "number" || argStr === "[object Number]") {
      return new Date(argument);
    } else {
      if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
        console.warn(new Error().stack);
      }
      return new Date(NaN);
    }
  }
  module.exports = exports.default;
})(toDate$1, toDate$1.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isValid2;
  var _index = _interopRequireDefault(isDate.exports);
  var _index2 = _interopRequireDefault(toDate$1.exports);
  var _index3 = _interopRequireDefault(requiredArgs.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function isValid2(dirtyDate) {
    (0, _index3.default)(1, arguments);
    if (!(0, _index.default)(dirtyDate) && typeof dirtyDate !== "number") {
      return false;
    }
    var date = (0, _index2.default)(dirtyDate);
    return !isNaN(Number(date));
  }
  module.exports = exports.default;
})(isValid, isValid.exports);
var subMilliseconds = { exports: {} };
var addMilliseconds = { exports: {} };
var toInteger = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toInteger2;
  function toInteger2(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }
    var number = Number(dirtyNumber);
    if (isNaN(number)) {
      return number;
    }
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }
  module.exports = exports.default;
})(toInteger, toInteger.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addMilliseconds2;
  var _index = _interopRequireDefault(toInteger.exports);
  var _index2 = _interopRequireDefault(toDate$1.exports);
  var _index3 = _interopRequireDefault(requiredArgs.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function addMilliseconds2(dirtyDate, dirtyAmount) {
    (0, _index3.default)(2, arguments);
    var timestamp = (0, _index2.default)(dirtyDate).getTime();
    var amount = (0, _index.default)(dirtyAmount);
    return new Date(timestamp + amount);
  }
  module.exports = exports.default;
})(addMilliseconds, addMilliseconds.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = subMilliseconds2;
  var _index = _interopRequireDefault(addMilliseconds.exports);
  var _index2 = _interopRequireDefault(requiredArgs.exports);
  var _index3 = _interopRequireDefault(toInteger.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function subMilliseconds2(dirtyDate, dirtyAmount) {
    (0, _index2.default)(2, arguments);
    var amount = (0, _index3.default)(dirtyAmount);
    return (0, _index.default)(dirtyDate, -amount);
  }
  module.exports = exports.default;
})(subMilliseconds, subMilliseconds.exports);
var formatters$1 = { exports: {} };
var getUTCDayOfYear = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getUTCDayOfYear2;
  var _index = _interopRequireDefault(toDate$1.exports);
  var _index2 = _interopRequireDefault(requiredArgs.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var MILLISECONDS_IN_DAY2 = 864e5;
  function getUTCDayOfYear2(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var timestamp = date.getTime();
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
    var startOfYearTimestamp = date.getTime();
    var difference = timestamp - startOfYearTimestamp;
    return Math.floor(difference / MILLISECONDS_IN_DAY2) + 1;
  }
  module.exports = exports.default;
})(getUTCDayOfYear, getUTCDayOfYear.exports);
var getUTCISOWeek = { exports: {} };
var startOfUTCISOWeek = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfUTCISOWeek2;
  var _index = _interopRequireDefault(toDate$1.exports);
  var _index2 = _interopRequireDefault(requiredArgs.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function startOfUTCISOWeek2(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var weekStartsOn = 1;
    var date = (0, _index.default)(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }
  module.exports = exports.default;
})(startOfUTCISOWeek, startOfUTCISOWeek.exports);
var startOfUTCISOWeekYear = { exports: {} };
var getUTCISOWeekYear = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getUTCISOWeekYear2;
  var _index = _interopRequireDefault(toDate$1.exports);
  var _index2 = _interopRequireDefault(requiredArgs.exports);
  var _index3 = _interopRequireDefault(startOfUTCISOWeek.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function getUTCISOWeekYear2(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var year = date.getUTCFullYear();
    var fourthOfJanuaryOfNextYear = new Date(0);
    fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = (0, _index3.default)(fourthOfJanuaryOfNextYear);
    var fourthOfJanuaryOfThisYear = new Date(0);
    fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = (0, _index3.default)(fourthOfJanuaryOfThisYear);
    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }
  module.exports = exports.default;
})(getUTCISOWeekYear, getUTCISOWeekYear.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfUTCISOWeekYear2;
  var _index = _interopRequireDefault(getUTCISOWeekYear.exports);
  var _index2 = _interopRequireDefault(startOfUTCISOWeek.exports);
  var _index3 = _interopRequireDefault(requiredArgs.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function startOfUTCISOWeekYear2(dirtyDate) {
    (0, _index3.default)(1, arguments);
    var year = (0, _index.default)(dirtyDate);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(year, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    var date = (0, _index2.default)(fourthOfJanuary);
    return date;
  }
  module.exports = exports.default;
})(startOfUTCISOWeekYear, startOfUTCISOWeekYear.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getUTCISOWeek2;
  var _index = _interopRequireDefault(toDate$1.exports);
  var _index2 = _interopRequireDefault(startOfUTCISOWeek.exports);
  var _index3 = _interopRequireDefault(startOfUTCISOWeekYear.exports);
  var _index4 = _interopRequireDefault(requiredArgs.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var MILLISECONDS_IN_WEEK2 = 6048e5;
  function getUTCISOWeek2(dirtyDate) {
    (0, _index4.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var diff = (0, _index2.default)(date).getTime() - (0, _index3.default)(date).getTime();
    return Math.round(diff / MILLISECONDS_IN_WEEK2) + 1;
  }
  module.exports = exports.default;
})(getUTCISOWeek, getUTCISOWeek.exports);
var getUTCWeek = { exports: {} };
var startOfUTCWeek = { exports: {} };
var defaultOptions$1 = {};
Object.defineProperty(defaultOptions$1, "__esModule", {
  value: true
});
defaultOptions$1.getDefaultOptions = getDefaultOptions;
defaultOptions$1.setDefaultOptions = setDefaultOptions;
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfUTCWeek2;
  var _index = _interopRequireDefault(toDate$1.exports);
  var _index2 = _interopRequireDefault(requiredArgs.exports);
  var _index3 = _interopRequireDefault(toInteger.exports);
  var _index4 = defaultOptions$1;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function startOfUTCWeek2(dirtyDate, options) {
    var _ref2, _ref22, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
    (0, _index2.default)(1, arguments);
    var defaultOptions2 = (0, _index4.getDefaultOptions)();
    var weekStartsOn = (0, _index3.default)((_ref2 = (_ref22 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref22 !== void 0 ? _ref22 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : 0);
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    }
    var date = (0, _index.default)(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }
  module.exports = exports.default;
})(startOfUTCWeek, startOfUTCWeek.exports);
var startOfUTCWeekYear = { exports: {} };
var getUTCWeekYear = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getUTCWeekYear2;
  var _index = _interopRequireDefault(toDate$1.exports);
  var _index2 = _interopRequireDefault(requiredArgs.exports);
  var _index3 = _interopRequireDefault(startOfUTCWeek.exports);
  var _index4 = _interopRequireDefault(toInteger.exports);
  var _index5 = defaultOptions$1;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function getUTCWeekYear2(dirtyDate, options) {
    var _ref2, _ref22, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var year = date.getUTCFullYear();
    var defaultOptions2 = (0, _index5.getDefaultOptions)();
    var firstWeekContainsDate = (0, _index4.default)((_ref2 = (_ref22 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref22 !== void 0 ? _ref22 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
    }
    var firstWeekOfNextYear = new Date(0);
    firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = (0, _index3.default)(firstWeekOfNextYear, options);
    var firstWeekOfThisYear = new Date(0);
    firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = (0, _index3.default)(firstWeekOfThisYear, options);
    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }
  module.exports = exports.default;
})(getUTCWeekYear, getUTCWeekYear.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfUTCWeekYear2;
  var _index = _interopRequireDefault(getUTCWeekYear.exports);
  var _index2 = _interopRequireDefault(requiredArgs.exports);
  var _index3 = _interopRequireDefault(startOfUTCWeek.exports);
  var _index4 = _interopRequireDefault(toInteger.exports);
  var _index5 = defaultOptions$1;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function startOfUTCWeekYear2(dirtyDate, options) {
    var _ref2, _ref22, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
    (0, _index2.default)(1, arguments);
    var defaultOptions2 = (0, _index5.getDefaultOptions)();
    var firstWeekContainsDate = (0, _index4.default)((_ref2 = (_ref22 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref22 !== void 0 ? _ref22 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
    var year = (0, _index.default)(dirtyDate, options);
    var firstWeek = new Date(0);
    firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setUTCHours(0, 0, 0, 0);
    var date = (0, _index3.default)(firstWeek, options);
    return date;
  }
  module.exports = exports.default;
})(startOfUTCWeekYear, startOfUTCWeekYear.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getUTCWeek2;
  var _index = _interopRequireDefault(toDate$1.exports);
  var _index2 = _interopRequireDefault(startOfUTCWeek.exports);
  var _index3 = _interopRequireDefault(startOfUTCWeekYear.exports);
  var _index4 = _interopRequireDefault(requiredArgs.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var MILLISECONDS_IN_WEEK2 = 6048e5;
  function getUTCWeek2(dirtyDate, options) {
    (0, _index4.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var diff = (0, _index2.default)(date, options).getTime() - (0, _index3.default)(date, options).getTime();
    return Math.round(diff / MILLISECONDS_IN_WEEK2) + 1;
  }
  module.exports = exports.default;
})(getUTCWeek, getUTCWeek.exports);
var addLeadingZeros = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addLeadingZeros2;
  function addLeadingZeros2(number, targetLength) {
    var sign = number < 0 ? "-" : "";
    var output = Math.abs(number).toString();
    while (output.length < targetLength) {
      output = "0" + output;
    }
    return sign + output;
  }
  module.exports = exports.default;
})(addLeadingZeros, addLeadingZeros.exports);
var lightFormatters = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _index = _interopRequireDefault(addLeadingZeros.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var formatters2 = {
    y: function y4(date, token) {
      var signedYear = date.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return (0, _index.default)(token === "yy" ? year % 100 : year, token.length);
    },
    M: function M4(date, token) {
      var month = date.getUTCMonth();
      return token === "M" ? String(month + 1) : (0, _index.default)(month + 1, 2);
    },
    d: function d4(date, token) {
      return (0, _index.default)(date.getUTCDate(), token.length);
    },
    a: function a4(date, token) {
      var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
      switch (token) {
        case "a":
        case "aa":
          return dayPeriodEnumValue.toUpperCase();
        case "aaa":
          return dayPeriodEnumValue;
        case "aaaaa":
          return dayPeriodEnumValue[0];
        case "aaaa":
        default:
          return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
      }
    },
    h: function h4(date, token) {
      return (0, _index.default)(date.getUTCHours() % 12 || 12, token.length);
    },
    H: function H4(date, token) {
      return (0, _index.default)(date.getUTCHours(), token.length);
    },
    m: function m4(date, token) {
      return (0, _index.default)(date.getUTCMinutes(), token.length);
    },
    s: function s3(date, token) {
      return (0, _index.default)(date.getUTCSeconds(), token.length);
    },
    S: function S4(date, token) {
      var numberOfDigits = token.length;
      var milliseconds = date.getUTCMilliseconds();
      var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
      return (0, _index.default)(fractionalSeconds, token.length);
    }
  };
  var _default = formatters2;
  exports.default = _default;
  module.exports = exports.default;
})(lightFormatters, lightFormatters.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _index = _interopRequireDefault(getUTCDayOfYear.exports);
  var _index2 = _interopRequireDefault(getUTCISOWeek.exports);
  var _index3 = _interopRequireDefault(getUTCISOWeekYear.exports);
  var _index4 = _interopRequireDefault(getUTCWeek.exports);
  var _index5 = _interopRequireDefault(getUTCWeekYear.exports);
  var _index6 = _interopRequireDefault(addLeadingZeros.exports);
  var _index7 = _interopRequireDefault(lightFormatters.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var dayPeriodEnum2 = {
    am: "am",
    pm: "pm",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  };
  var formatters2 = {
    G: function G3(date, token, localize2) {
      var era = date.getUTCFullYear() > 0 ? 1 : 0;
      switch (token) {
        case "G":
        case "GG":
        case "GGG":
          return localize2.era(era, {
            width: "abbreviated"
          });
        case "GGGGG":
          return localize2.era(era, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return localize2.era(era, {
            width: "wide"
          });
      }
    },
    y: function y4(date, token, localize2) {
      if (token === "yo") {
        var signedYear = date.getUTCFullYear();
        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return localize2.ordinalNumber(year, {
          unit: "year"
        });
      }
      return _index7.default.y(date, token);
    },
    Y: function Y3(date, token, localize2, options) {
      var signedWeekYear = (0, _index5.default)(date, options);
      var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
      if (token === "YY") {
        var twoDigitYear = weekYear % 100;
        return (0, _index6.default)(twoDigitYear, 2);
      }
      if (token === "Yo") {
        return localize2.ordinalNumber(weekYear, {
          unit: "year"
        });
      }
      return (0, _index6.default)(weekYear, token.length);
    },
    R: function R3(date, token) {
      var isoWeekYear = (0, _index3.default)(date);
      return (0, _index6.default)(isoWeekYear, token.length);
    },
    u: function u3(date, token) {
      var year = date.getUTCFullYear();
      return (0, _index6.default)(year, token.length);
    },
    Q: function Q3(date, token, localize2) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
      switch (token) {
        case "Q":
          return String(quarter);
        case "QQ":
          return (0, _index6.default)(quarter, 2);
        case "Qo":
          return localize2.ordinalNumber(quarter, {
            unit: "quarter"
          });
        case "QQQ":
          return localize2.quarter(quarter, {
            width: "abbreviated",
            context: "formatting"
          });
        case "QQQQQ":
          return localize2.quarter(quarter, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return localize2.quarter(quarter, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    q: function q3(date, token, localize2) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
      switch (token) {
        case "q":
          return String(quarter);
        case "qq":
          return (0, _index6.default)(quarter, 2);
        case "qo":
          return localize2.ordinalNumber(quarter, {
            unit: "quarter"
          });
        case "qqq":
          return localize2.quarter(quarter, {
            width: "abbreviated",
            context: "standalone"
          });
        case "qqqqq":
          return localize2.quarter(quarter, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return localize2.quarter(quarter, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    M: function M4(date, token, localize2) {
      var month = date.getUTCMonth();
      switch (token) {
        case "M":
        case "MM":
          return _index7.default.M(date, token);
        case "Mo":
          return localize2.ordinalNumber(month + 1, {
            unit: "month"
          });
        case "MMM":
          return localize2.month(month, {
            width: "abbreviated",
            context: "formatting"
          });
        case "MMMMM":
          return localize2.month(month, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return localize2.month(month, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    L: function L3(date, token, localize2) {
      var month = date.getUTCMonth();
      switch (token) {
        case "L":
          return String(month + 1);
        case "LL":
          return (0, _index6.default)(month + 1, 2);
        case "Lo":
          return localize2.ordinalNumber(month + 1, {
            unit: "month"
          });
        case "LLL":
          return localize2.month(month, {
            width: "abbreviated",
            context: "standalone"
          });
        case "LLLLL":
          return localize2.month(month, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return localize2.month(month, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    w: function w3(date, token, localize2, options) {
      var week = (0, _index4.default)(date, options);
      if (token === "wo") {
        return localize2.ordinalNumber(week, {
          unit: "week"
        });
      }
      return (0, _index6.default)(week, token.length);
    },
    I: function I3(date, token, localize2) {
      var isoWeek = (0, _index2.default)(date);
      if (token === "Io") {
        return localize2.ordinalNumber(isoWeek, {
          unit: "week"
        });
      }
      return (0, _index6.default)(isoWeek, token.length);
    },
    d: function d4(date, token, localize2) {
      if (token === "do") {
        return localize2.ordinalNumber(date.getUTCDate(), {
          unit: "date"
        });
      }
      return _index7.default.d(date, token);
    },
    D: function D3(date, token, localize2) {
      var dayOfYear = (0, _index.default)(date);
      if (token === "Do") {
        return localize2.ordinalNumber(dayOfYear, {
          unit: "dayOfYear"
        });
      }
      return (0, _index6.default)(dayOfYear, token.length);
    },
    E: function E3(date, token, localize2) {
      var dayOfWeek = date.getUTCDay();
      switch (token) {
        case "E":
        case "EE":
        case "EEE":
          return localize2.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        case "EEEEE":
          return localize2.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return localize2.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        case "EEEE":
        default:
          return localize2.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    e: function e3(date, token, localize2, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        case "e":
          return String(localDayOfWeek);
        case "ee":
          return (0, _index6.default)(localDayOfWeek, 2);
        case "eo":
          return localize2.ordinalNumber(localDayOfWeek, {
            unit: "day"
          });
        case "eee":
          return localize2.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        case "eeeee":
          return localize2.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return localize2.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        case "eeee":
        default:
          return localize2.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    c: function c2(date, token, localize2, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        case "c":
          return String(localDayOfWeek);
        case "cc":
          return (0, _index6.default)(localDayOfWeek, token.length);
        case "co":
          return localize2.ordinalNumber(localDayOfWeek, {
            unit: "day"
          });
        case "ccc":
          return localize2.day(dayOfWeek, {
            width: "abbreviated",
            context: "standalone"
          });
        case "ccccc":
          return localize2.day(dayOfWeek, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return localize2.day(dayOfWeek, {
            width: "short",
            context: "standalone"
          });
        case "cccc":
        default:
          return localize2.day(dayOfWeek, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    i: function i3(date, token, localize2) {
      var dayOfWeek = date.getUTCDay();
      var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
      switch (token) {
        case "i":
          return String(isoDayOfWeek);
        case "ii":
          return (0, _index6.default)(isoDayOfWeek, token.length);
        case "io":
          return localize2.ordinalNumber(isoDayOfWeek, {
            unit: "day"
          });
        case "iii":
          return localize2.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        case "iiiii":
          return localize2.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        case "iiiiii":
          return localize2.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        case "iiii":
        default:
          return localize2.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    a: function a4(date, token, localize2) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
      switch (token) {
        case "a":
        case "aa":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "aaa":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "aaaaa":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    b: function b3(date, token, localize2) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;
      if (hours === 12) {
        dayPeriodEnumValue = dayPeriodEnum2.noon;
      } else if (hours === 0) {
        dayPeriodEnumValue = dayPeriodEnum2.midnight;
      } else {
        dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
      }
      switch (token) {
        case "b":
        case "bb":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "bbb":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "bbbbb":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    B: function B3(date, token, localize2) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;
      if (hours >= 17) {
        dayPeriodEnumValue = dayPeriodEnum2.evening;
      } else if (hours >= 12) {
        dayPeriodEnumValue = dayPeriodEnum2.afternoon;
      } else if (hours >= 4) {
        dayPeriodEnumValue = dayPeriodEnum2.morning;
      } else {
        dayPeriodEnumValue = dayPeriodEnum2.night;
      }
      switch (token) {
        case "B":
        case "BB":
        case "BBB":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "BBBBB":
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return localize2.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    h: function h4(date, token, localize2) {
      if (token === "ho") {
        var hours = date.getUTCHours() % 12;
        if (hours === 0)
          hours = 12;
        return localize2.ordinalNumber(hours, {
          unit: "hour"
        });
      }
      return _index7.default.h(date, token);
    },
    H: function H4(date, token, localize2) {
      if (token === "Ho") {
        return localize2.ordinalNumber(date.getUTCHours(), {
          unit: "hour"
        });
      }
      return _index7.default.H(date, token);
    },
    K: function K3(date, token, localize2) {
      var hours = date.getUTCHours() % 12;
      if (token === "Ko") {
        return localize2.ordinalNumber(hours, {
          unit: "hour"
        });
      }
      return (0, _index6.default)(hours, token.length);
    },
    k: function k3(date, token, localize2) {
      var hours = date.getUTCHours();
      if (hours === 0)
        hours = 24;
      if (token === "ko") {
        return localize2.ordinalNumber(hours, {
          unit: "hour"
        });
      }
      return (0, _index6.default)(hours, token.length);
    },
    m: function m4(date, token, localize2) {
      if (token === "mo") {
        return localize2.ordinalNumber(date.getUTCMinutes(), {
          unit: "minute"
        });
      }
      return _index7.default.m(date, token);
    },
    s: function s3(date, token, localize2) {
      if (token === "so") {
        return localize2.ordinalNumber(date.getUTCSeconds(), {
          unit: "second"
        });
      }
      return _index7.default.s(date, token);
    },
    S: function S4(date, token) {
      return _index7.default.S(date, token);
    },
    X: function X3(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      if (timezoneOffset === 0) {
        return "Z";
      }
      switch (token) {
        case "X":
          return formatTimezoneWithOptionalMinutes2(timezoneOffset);
        case "XXXX":
        case "XX":
          return formatTimezone2(timezoneOffset);
        case "XXXXX":
        case "XXX":
        default:
          return formatTimezone2(timezoneOffset, ":");
      }
    },
    x: function x3(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        case "x":
          return formatTimezoneWithOptionalMinutes2(timezoneOffset);
        case "xxxx":
        case "xx":
          return formatTimezone2(timezoneOffset);
        case "xxxxx":
        case "xxx":
        default:
          return formatTimezone2(timezoneOffset, ":");
      }
    },
    O: function O3(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + formatTimezoneShort2(timezoneOffset, ":");
        case "OOOO":
        default:
          return "GMT" + formatTimezone2(timezoneOffset, ":");
      }
    },
    z: function z3(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();
      switch (token) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + formatTimezoneShort2(timezoneOffset, ":");
        case "zzzz":
        default:
          return "GMT" + formatTimezone2(timezoneOffset, ":");
      }
    },
    t: function t6(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = Math.floor(originalDate.getTime() / 1e3);
      return (0, _index6.default)(timestamp, token.length);
    },
    T: function T3(date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = originalDate.getTime();
      return (0, _index6.default)(timestamp, token.length);
    }
  };
  function formatTimezoneShort2(offset, dirtyDelimiter) {
    var sign = offset > 0 ? "-" : "+";
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;
    if (minutes === 0) {
      return sign + String(hours);
    }
    var delimiter = dirtyDelimiter || "";
    return sign + String(hours) + delimiter + (0, _index6.default)(minutes, 2);
  }
  function formatTimezoneWithOptionalMinutes2(offset, dirtyDelimiter) {
    if (offset % 60 === 0) {
      var sign = offset > 0 ? "-" : "+";
      return sign + (0, _index6.default)(Math.abs(offset) / 60, 2);
    }
    return formatTimezone2(offset, dirtyDelimiter);
  }
  function formatTimezone2(offset, dirtyDelimiter) {
    var delimiter = dirtyDelimiter || "";
    var sign = offset > 0 ? "-" : "+";
    var absOffset = Math.abs(offset);
    var hours = (0, _index6.default)(Math.floor(absOffset / 60), 2);
    var minutes = (0, _index6.default)(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
  }
  var _default = formatters2;
  exports.default = _default;
  module.exports = exports.default;
})(formatters$1, formatters$1.exports);
var longFormatters = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var dateLongFormatter3 = function dateLongFormatter4(pattern, formatLong2) {
    switch (pattern) {
      case "P":
        return formatLong2.date({
          width: "short"
        });
      case "PP":
        return formatLong2.date({
          width: "medium"
        });
      case "PPP":
        return formatLong2.date({
          width: "long"
        });
      case "PPPP":
      default:
        return formatLong2.date({
          width: "full"
        });
    }
  };
  var timeLongFormatter3 = function timeLongFormatter4(pattern, formatLong2) {
    switch (pattern) {
      case "p":
        return formatLong2.time({
          width: "short"
        });
      case "pp":
        return formatLong2.time({
          width: "medium"
        });
      case "ppp":
        return formatLong2.time({
          width: "long"
        });
      case "pppp":
      default:
        return formatLong2.time({
          width: "full"
        });
    }
  };
  var dateTimeLongFormatter3 = function dateTimeLongFormatter4(pattern, formatLong2) {
    var matchResult = pattern.match(/(P+)(p+)?/) || [];
    var datePattern = matchResult[1];
    var timePattern = matchResult[2];
    if (!timePattern) {
      return dateLongFormatter3(pattern, formatLong2);
    }
    var dateTimeFormat;
    switch (datePattern) {
      case "P":
        dateTimeFormat = formatLong2.dateTime({
          width: "short"
        });
        break;
      case "PP":
        dateTimeFormat = formatLong2.dateTime({
          width: "medium"
        });
        break;
      case "PPP":
        dateTimeFormat = formatLong2.dateTime({
          width: "long"
        });
        break;
      case "PPPP":
      default:
        dateTimeFormat = formatLong2.dateTime({
          width: "full"
        });
        break;
    }
    return dateTimeFormat.replace("{{date}}", dateLongFormatter3(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter3(timePattern, formatLong2));
  };
  var longFormatters2 = {
    p: timeLongFormatter3,
    P: dateTimeLongFormatter3
  };
  var _default = longFormatters2;
  exports.default = _default;
  module.exports = exports.default;
})(longFormatters, longFormatters.exports);
var getTimezoneOffsetInMilliseconds = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getTimezoneOffsetInMilliseconds2;
  function getTimezoneOffsetInMilliseconds2(date) {
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    utcDate.setUTCFullYear(date.getFullYear());
    return date.getTime() - utcDate.getTime();
  }
  module.exports = exports.default;
})(getTimezoneOffsetInMilliseconds, getTimezoneOffsetInMilliseconds.exports);
var protectedTokens = {};
Object.defineProperty(protectedTokens, "__esModule", {
  value: true
});
protectedTokens.isProtectedDayOfYearToken = isProtectedDayOfYearToken;
protectedTokens.isProtectedWeekYearToken = isProtectedWeekYearToken;
protectedTokens.throwProtectedError = throwProtectedError;
var protectedDayOfYearTokens = ["D", "DD"];
var protectedWeekYearTokens = ["YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format2, input) {
  if (token === "YYYY") {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "YY") {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "D") {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "DD") {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}
var defaultLocale = { exports: {} };
var enUS = { exports: {} };
var formatDistance2 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var formatDistanceLocale2 = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  };
  var formatDistance3 = function formatDistance4(token, count, options) {
    var result2;
    var tokenValue = formatDistanceLocale2[token];
    if (typeof tokenValue === "string") {
      result2 = tokenValue;
    } else if (count === 1) {
      result2 = tokenValue.one;
    } else {
      result2 = tokenValue.other.replace("{{count}}", count.toString());
    }
    if (options !== null && options !== void 0 && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "in " + result2;
      } else {
        return result2 + " ago";
      }
    }
    return result2;
  };
  var _default = formatDistance3;
  exports.default = _default;
  module.exports = exports.default;
})(formatDistance2, formatDistance2.exports);
var formatLong = { exports: {} };
var buildFormatLongFn = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildFormatLongFn2;
  function buildFormatLongFn2(args) {
    return function() {
      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var width = options.width ? String(options.width) : args.defaultWidth;
      var format2 = args.formats[width] || args.formats[args.defaultWidth];
      return format2;
    };
  }
  module.exports = exports.default;
})(buildFormatLongFn, buildFormatLongFn.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _index = _interopRequireDefault(buildFormatLongFn.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var dateFormats2 = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  };
  var timeFormats2 = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  };
  var dateTimeFormats2 = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  };
  var formatLong2 = {
    date: (0, _index.default)({
      formats: dateFormats2,
      defaultWidth: "full"
    }),
    time: (0, _index.default)({
      formats: timeFormats2,
      defaultWidth: "full"
    }),
    dateTime: (0, _index.default)({
      formats: dateTimeFormats2,
      defaultWidth: "full"
    })
  };
  var _default = formatLong2;
  exports.default = _default;
  module.exports = exports.default;
})(formatLong, formatLong.exports);
var formatRelative2 = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var formatRelativeLocale2 = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  };
  var formatRelative3 = function formatRelative4(token, _date, _baseDate, _options) {
    return formatRelativeLocale2[token];
  };
  var _default = formatRelative3;
  exports.default = _default;
  module.exports = exports.default;
})(formatRelative2, formatRelative2.exports);
var localize = { exports: {} };
var buildLocalizeFn = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildLocalizeFn2;
  function buildLocalizeFn2(args) {
    return function(dirtyIndex, options) {
      var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
      var valuesArray;
      if (context === "formatting" && args.formattingValues) {
        var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        var _defaultWidth = args.defaultWidth;
        var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[_width] || args.values[_defaultWidth];
      }
      var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
      return valuesArray[index];
    };
  }
  module.exports = exports.default;
})(buildLocalizeFn, buildLocalizeFn.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _index = _interopRequireDefault(buildLocalizeFn.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var eraValues2 = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  };
  var quarterValues2 = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  };
  var monthValues2 = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
  var dayValues2 = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  };
  var dayPeriodValues2 = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  };
  var formattingDayPeriodValues2 = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  };
  var ordinalNumber3 = function ordinalNumber4(dirtyNumber, _options) {
    var number = Number(dirtyNumber);
    var rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + "st";
        case 2:
          return number + "nd";
        case 3:
          return number + "rd";
      }
    }
    return number + "th";
  };
  var localize2 = {
    ordinalNumber: ordinalNumber3,
    era: (0, _index.default)({
      values: eraValues2,
      defaultWidth: "wide"
    }),
    quarter: (0, _index.default)({
      values: quarterValues2,
      defaultWidth: "wide",
      argumentCallback: function argumentCallback2(quarter) {
        return quarter - 1;
      }
    }),
    month: (0, _index.default)({
      values: monthValues2,
      defaultWidth: "wide"
    }),
    day: (0, _index.default)({
      values: dayValues2,
      defaultWidth: "wide"
    }),
    dayPeriod: (0, _index.default)({
      values: dayPeriodValues2,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues2,
      defaultFormattingWidth: "wide"
    })
  };
  var _default = localize2;
  exports.default = _default;
  module.exports = exports.default;
})(localize, localize.exports);
var match = { exports: {} };
var buildMatchFn = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildMatchFn2;
  function buildMatchFn2(args) {
    return function(string) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var width = options.width;
      var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      var matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      var matchedString = matchResult[0];
      var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      var key = Array.isArray(parsePatterns) ? findIndex2(parsePatterns, function(pattern) {
        return pattern.test(matchedString);
      }) : findKey2(parsePatterns, function(pattern) {
        return pattern.test(matchedString);
      });
      var value;
      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback ? options.valueCallback(value) : value;
      var rest = string.slice(matchedString.length);
      return {
        value,
        rest
      };
    };
  }
  function findKey2(object, predicate) {
    for (var key in object) {
      if (object.hasOwnProperty(key) && predicate(object[key])) {
        return key;
      }
    }
    return void 0;
  }
  function findIndex2(array, predicate) {
    for (var key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return void 0;
  }
  module.exports = exports.default;
})(buildMatchFn, buildMatchFn.exports);
var buildMatchPatternFn = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildMatchPatternFn2;
  function buildMatchPatternFn2(args) {
    return function(string) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var matchResult = string.match(args.matchPattern);
      if (!matchResult)
        return null;
      var matchedString = matchResult[0];
      var parseResult = string.match(args.parsePattern);
      if (!parseResult)
        return null;
      var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      var rest = string.slice(matchedString.length);
      return {
        value,
        rest
      };
    };
  }
  module.exports = exports.default;
})(buildMatchPatternFn, buildMatchPatternFn.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _index = _interopRequireDefault(buildMatchFn.exports);
  var _index2 = _interopRequireDefault(buildMatchPatternFn.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var matchOrdinalNumberPattern2 = /^(\d+)(th|st|nd|rd)?/i;
  var parseOrdinalNumberPattern2 = /\d+/i;
  var matchEraPatterns2 = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  var parseEraPatterns2 = {
    any: [/^b/i, /^(a|c)/i]
  };
  var matchQuarterPatterns2 = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  var parseQuarterPatterns2 = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  var matchMonthPatterns2 = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  var parseMonthPatterns2 = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  };
  var matchDayPatterns2 = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  var parseDayPatterns2 = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  var matchDayPeriodPatterns2 = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  var parseDayPeriodPatterns2 = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  var match2 = {
    ordinalNumber: (0, _index2.default)({
      matchPattern: matchOrdinalNumberPattern2,
      parsePattern: parseOrdinalNumberPattern2,
      valueCallback: function valueCallback3(value) {
        return parseInt(value, 10);
      }
    }),
    era: (0, _index.default)({
      matchPatterns: matchEraPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns2,
      defaultParseWidth: "any"
    }),
    quarter: (0, _index.default)({
      matchPatterns: matchQuarterPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns2,
      defaultParseWidth: "any",
      valueCallback: function valueCallback3(index) {
        return index + 1;
      }
    }),
    month: (0, _index.default)({
      matchPatterns: matchMonthPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns2,
      defaultParseWidth: "any"
    }),
    day: (0, _index.default)({
      matchPatterns: matchDayPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns2,
      defaultParseWidth: "any"
    }),
    dayPeriod: (0, _index.default)({
      matchPatterns: matchDayPeriodPatterns2,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns2,
      defaultParseWidth: "any"
    })
  };
  var _default = match2;
  exports.default = _default;
  module.exports = exports.default;
})(match, match.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _index = _interopRequireDefault(formatDistance2.exports);
  var _index2 = _interopRequireDefault(formatLong.exports);
  var _index3 = _interopRequireDefault(formatRelative2.exports);
  var _index4 = _interopRequireDefault(localize.exports);
  var _index5 = _interopRequireDefault(match.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var locale2 = {
    code: "en-US",
    formatDistance: _index.default,
    formatLong: _index2.default,
    formatRelative: _index3.default,
    localize: _index4.default,
    match: _index5.default,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  var _default = locale2;
  exports.default = _default;
  module.exports = exports.default;
})(enUS, enUS.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _index = _interopRequireDefault(enUS.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _default = _index.default;
  exports.default = _default;
  module.exports = exports.default;
})(defaultLocale, defaultLocale.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = format2;
  var _index = _interopRequireDefault(isValid.exports);
  var _index2 = _interopRequireDefault(subMilliseconds.exports);
  var _index3 = _interopRequireDefault(toDate$1.exports);
  var _index4 = _interopRequireDefault(formatters$1.exports);
  var _index5 = _interopRequireDefault(longFormatters.exports);
  var _index6 = _interopRequireDefault(getTimezoneOffsetInMilliseconds.exports);
  var _index7 = protectedTokens;
  var _index8 = _interopRequireDefault(toInteger.exports);
  var _index9 = _interopRequireDefault(requiredArgs.exports);
  var _index10 = defaultOptions$1;
  var _index11 = _interopRequireDefault(defaultLocale.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var formattingTokensRegExp2 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
  var longFormattingTokensRegExp2 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
  var escapedStringRegExp2 = /^'([^]*?)'?$/;
  var doubleQuoteRegExp2 = /''/g;
  var unescapedLatinCharacterRegExp2 = /[a-zA-Z]/;
  function format2(dirtyDate, dirtyFormatStr, options) {
    var _ref2, _options$locale, _ref22, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
    (0, _index9.default)(2, arguments);
    var formatStr = String(dirtyFormatStr);
    var defaultOptions2 = (0, _index10.getDefaultOptions)();
    var locale2 = (_ref2 = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref2 !== void 0 ? _ref2 : _index11.default;
    var firstWeekContainsDate = (0, _index8.default)((_ref22 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref22 !== void 0 ? _ref22 : 1);
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
    }
    var weekStartsOn = (0, _index8.default)((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    }
    if (!locale2.localize) {
      throw new RangeError("locale must contain localize property");
    }
    if (!locale2.formatLong) {
      throw new RangeError("locale must contain formatLong property");
    }
    var originalDate = (0, _index3.default)(dirtyDate);
    if (!(0, _index.default)(originalDate)) {
      throw new RangeError("Invalid time value");
    }
    var timezoneOffset = (0, _index6.default)(originalDate);
    var utcDate = (0, _index2.default)(originalDate, timezoneOffset);
    var formatterOptions = {
      firstWeekContainsDate,
      weekStartsOn,
      locale: locale2,
      _originalDate: originalDate
    };
    var result2 = formatStr.match(longFormattingTokensRegExp2).map(function(substring) {
      var firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        var longFormatter = _index5.default[firstCharacter];
        return longFormatter(substring, locale2.formatLong);
      }
      return substring;
    }).join("").match(formattingTokensRegExp2).map(function(substring) {
      if (substring === "''") {
        return "'";
      }
      var firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return cleanEscapedString2(substring);
      }
      var formatter = _index4.default[firstCharacter];
      if (formatter) {
        if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && (0, _index7.isProtectedWeekYearToken)(substring)) {
          (0, _index7.throwProtectedError)(substring, dirtyFormatStr, String(dirtyDate));
        }
        if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && (0, _index7.isProtectedDayOfYearToken)(substring)) {
          (0, _index7.throwProtectedError)(substring, dirtyFormatStr, String(dirtyDate));
        }
        return formatter(utcDate, substring, locale2.localize, formatterOptions);
      }
      if (firstCharacter.match(unescapedLatinCharacterRegExp2)) {
        throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
      }
      return substring;
    }).join("");
    return result2;
  }
  function cleanEscapedString2(input) {
    var matched = input.match(escapedStringRegExp2);
    if (!matched) {
      return input;
    }
    return matched[1].replace(doubleQuoteRegExp2, "'");
  }
  module.exports = exports.default;
})(format, format.exports);
var formatters = { exports: {} };
var tzIntlTimeZoneName = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = tzIntlTimeZoneName2;
  function tzIntlTimeZoneName2(length, date, options) {
    var dtf = getDTF(length, options.timeZone, options.locale);
    return dtf.formatToParts ? partsTimeZone(dtf, date) : hackyTimeZone(dtf, date);
  }
  function partsTimeZone(dtf, date) {
    var formatted = dtf.formatToParts(date);
    for (var i3 = formatted.length - 1; i3 >= 0; --i3) {
      if (formatted[i3].type === "timeZoneName") {
        return formatted[i3].value;
      }
    }
  }
  function hackyTimeZone(dtf, date) {
    var formatted = dtf.format(date).replace(/\u200E/g, "");
    var tzNameMatch = / [\w-+ ]+$/.exec(formatted);
    return tzNameMatch ? tzNameMatch[0].substr(1) : "";
  }
  function getDTF(length, timeZone, locale2) {
    if (locale2 && !locale2.code) {
      throw new Error("date-fns-tz error: Please set a language code on the locale object imported from date-fns, e.g. `locale.code = 'en-US'`");
    }
    return new Intl.DateTimeFormat(locale2 ? [locale2.code, "en-US"] : void 0, {
      timeZone,
      timeZoneName: length
    });
  }
  module.exports = exports.default;
})(tzIntlTimeZoneName, tzIntlTimeZoneName.exports);
var tzParseTimezone = { exports: {} };
var tzTokenizeDate = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = tzTokenizeDate2;
  function tzTokenizeDate2(date, timeZone) {
    var dtf = getDateTimeFormat(timeZone);
    return dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date);
  }
  var typeToPos = {
    year: 0,
    month: 1,
    day: 2,
    hour: 3,
    minute: 4,
    second: 5
  };
  function partsOffset(dtf, date) {
    try {
      var formatted = dtf.formatToParts(date);
      var filled = [];
      for (var i3 = 0; i3 < formatted.length; i3++) {
        var pos = typeToPos[formatted[i3].type];
        if (pos >= 0) {
          filled[pos] = parseInt(formatted[i3].value, 10);
        }
      }
      return filled;
    } catch (error) {
      if (error instanceof RangeError) {
        return [NaN];
      }
      throw error;
    }
  }
  function hackyOffset(dtf, date) {
    var formatted = dtf.format(date).replace(/\u200E/g, "");
    var parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted);
    return [parsed[3], parsed[1], parsed[2], parsed[4], parsed[5], parsed[6]];
  }
  var dtfCache = {};
  function getDateTimeFormat(timeZone) {
    if (!dtfCache[timeZone]) {
      var testDateFormatted = new Intl.DateTimeFormat("en-US", {
        hour12: false,
        timeZone: "America/New_York",
        year: "numeric",
        month: "numeric",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(new Date("2014-06-25T04:00:00.123Z"));
      var hourCycleSupported = testDateFormatted === "06/25/2014, 00:00:00" || testDateFormatted === "\u200E06\u200E/\u200E25\u200E/\u200E2014\u200E \u200E00\u200E:\u200E00\u200E:\u200E00";
      dtfCache[timeZone] = hourCycleSupported ? new Intl.DateTimeFormat("en-US", {
        hour12: false,
        timeZone,
        year: "numeric",
        month: "numeric",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }) : new Intl.DateTimeFormat("en-US", {
        hourCycle: "h23",
        timeZone,
        year: "numeric",
        month: "numeric",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    }
    return dtfCache[timeZone];
  }
  module.exports = exports.default;
})(tzTokenizeDate, tzTokenizeDate.exports);
var newDateUTC = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = newDateUTC2;
  function newDateUTC2(fullYear, month, day, hour, minute, second, millisecond) {
    var utcDate = new Date(0);
    utcDate.setUTCFullYear(fullYear, month, day);
    utcDate.setUTCHours(hour, minute, second, millisecond);
    return utcDate;
  }
  module.exports = exports.default;
})(newDateUTC, newDateUTC.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = tzParseTimezone2;
  var _index = _interopRequireDefault(tzTokenizeDate.exports);
  var _index2 = _interopRequireDefault(newDateUTC.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var MILLISECONDS_IN_HOUR = 36e5;
  var MILLISECONDS_IN_MINUTE = 6e4;
  var patterns = {
    timezone: /([Z+-].*)$/,
    timezoneZ: /^(Z)$/,
    timezoneHH: /^([+-]\d{2})$/,
    timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
  };
  function tzParseTimezone2(timezoneString, date, isUtcDate) {
    var token;
    var absoluteOffset;
    if (timezoneString === "") {
      return 0;
    }
    token = patterns.timezoneZ.exec(timezoneString);
    if (token) {
      return 0;
    }
    var hours;
    token = patterns.timezoneHH.exec(timezoneString);
    if (token) {
      hours = parseInt(token[1], 10);
      if (!validateTimezone(hours)) {
        return NaN;
      }
      return -(hours * MILLISECONDS_IN_HOUR);
    }
    token = patterns.timezoneHHMM.exec(timezoneString);
    if (token) {
      hours = parseInt(token[1], 10);
      var minutes = parseInt(token[2], 10);
      if (!validateTimezone(hours, minutes)) {
        return NaN;
      }
      absoluteOffset = Math.abs(hours) * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
      return hours > 0 ? -absoluteOffset : absoluteOffset;
    }
    if (isValidTimezoneIANAString(timezoneString)) {
      date = new Date(date || Date.now());
      var utcDate = isUtcDate ? date : toUtcDate(date);
      var offset = calcOffset(utcDate, timezoneString);
      var fixedOffset = isUtcDate ? offset : fixOffset(date, offset, timezoneString);
      return -fixedOffset;
    }
    return NaN;
  }
  function toUtcDate(date) {
    return (0, _index2.default)(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  }
  function calcOffset(date, timezoneString) {
    var tokens = (0, _index.default)(date, timezoneString);
    var asUTC = (0, _index2.default)(tokens[0], tokens[1] - 1, tokens[2], tokens[3] % 24, tokens[4], tokens[5], 0).getTime();
    var asTS = date.getTime();
    var over = asTS % 1e3;
    asTS -= over >= 0 ? over : 1e3 + over;
    return asUTC - asTS;
  }
  function fixOffset(date, offset, timezoneString) {
    var localTS = date.getTime();
    var utcGuess = localTS - offset;
    var o2 = calcOffset(new Date(utcGuess), timezoneString);
    if (offset === o2) {
      return offset;
    }
    utcGuess -= o2 - offset;
    var o3 = calcOffset(new Date(utcGuess), timezoneString);
    if (o2 === o3) {
      return o2;
    }
    return Math.max(o2, o3);
  }
  function validateTimezone(hours, minutes) {
    return -23 <= hours && hours <= 23 && (minutes == null || 0 <= minutes && minutes <= 59);
  }
  var validIANATimezoneCache = {};
  function isValidTimezoneIANAString(timeZoneString) {
    if (validIANATimezoneCache[timeZoneString])
      return true;
    try {
      new Intl.DateTimeFormat(void 0, {
        timeZone: timeZoneString
      });
      validIANATimezoneCache[timeZoneString] = true;
      return true;
    } catch (error) {
      return false;
    }
  }
  module.exports = exports.default;
})(tzParseTimezone, tzParseTimezone.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _index = _interopRequireDefault(tzIntlTimeZoneName.exports);
  var _index2 = _interopRequireDefault(tzParseTimezone.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var MILLISECONDS_IN_MINUTE = 60 * 1e3;
  var formatters2 = {
    X: function(date, token, localize2, options) {
      var timezoneOffset = getTimeZoneOffset(options.timeZone, options._originalDate || date);
      if (timezoneOffset === 0) {
        return "Z";
      }
      switch (token) {
        case "X":
          return formatTimezoneWithOptionalMinutes2(timezoneOffset);
        case "XXXX":
        case "XX":
          return formatTimezone2(timezoneOffset);
        case "XXXXX":
        case "XXX":
        default:
          return formatTimezone2(timezoneOffset, ":");
      }
    },
    x: function(date, token, localize2, options) {
      var timezoneOffset = getTimeZoneOffset(options.timeZone, options._originalDate || date);
      switch (token) {
        case "x":
          return formatTimezoneWithOptionalMinutes2(timezoneOffset);
        case "xxxx":
        case "xx":
          return formatTimezone2(timezoneOffset);
        case "xxxxx":
        case "xxx":
        default:
          return formatTimezone2(timezoneOffset, ":");
      }
    },
    O: function(date, token, localize2, options) {
      var timezoneOffset = getTimeZoneOffset(options.timeZone, options._originalDate || date);
      switch (token) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + formatTimezoneShort2(timezoneOffset, ":");
        case "OOOO":
        default:
          return "GMT" + formatTimezone2(timezoneOffset, ":");
      }
    },
    z: function(date, token, localize2, options) {
      var originalDate = options._originalDate || date;
      switch (token) {
        case "z":
        case "zz":
        case "zzz":
          return (0, _index.default)("short", originalDate, options);
        case "zzzz":
        default:
          return (0, _index.default)("long", originalDate, options);
      }
    }
  };
  function getTimeZoneOffset(timeZone, originalDate) {
    var timeZoneOffset = timeZone ? (0, _index2.default)(timeZone, originalDate, true) / MILLISECONDS_IN_MINUTE : originalDate.getTimezoneOffset();
    if (Number.isNaN(timeZoneOffset)) {
      throw new RangeError("Invalid time zone specified: " + timeZone);
    }
    return timeZoneOffset;
  }
  function addLeadingZeros2(number, targetLength) {
    var sign = number < 0 ? "-" : "";
    var output = Math.abs(number).toString();
    while (output.length < targetLength) {
      output = "0" + output;
    }
    return sign + output;
  }
  function formatTimezone2(offset, dirtyDelimeter) {
    var delimeter = dirtyDelimeter || "";
    var sign = offset > 0 ? "-" : "+";
    var absOffset = Math.abs(offset);
    var hours = addLeadingZeros2(Math.floor(absOffset / 60), 2);
    var minutes = addLeadingZeros2(Math.floor(absOffset % 60), 2);
    return sign + hours + delimeter + minutes;
  }
  function formatTimezoneWithOptionalMinutes2(offset, dirtyDelimeter) {
    if (offset % 60 === 0) {
      var sign = offset > 0 ? "-" : "+";
      return sign + addLeadingZeros2(Math.abs(offset) / 60, 2);
    }
    return formatTimezone2(offset, dirtyDelimeter);
  }
  function formatTimezoneShort2(offset, dirtyDelimeter) {
    var sign = offset > 0 ? "-" : "+";
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;
    if (minutes === 0) {
      return sign + String(hours);
    }
    var delimeter = dirtyDelimeter || "";
    return sign + String(hours) + delimeter + addLeadingZeros2(minutes, 2);
  }
  var _default = formatters2;
  exports.default = _default;
  module.exports = exports.default;
})(formatters, formatters.exports);
var toDate = { exports: {} };
var tzPattern = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var tzPattern2 = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
  var _default = tzPattern2;
  exports.default = _default;
  module.exports = exports.default;
})(tzPattern, tzPattern.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toDate2;
  var _index = _interopRequireDefault(toInteger.exports);
  var _index2 = _interopRequireDefault(getTimezoneOffsetInMilliseconds.exports);
  var _index3 = _interopRequireDefault(tzParseTimezone.exports);
  var _index4 = _interopRequireDefault(tzPattern.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var MILLISECONDS_IN_HOUR = 36e5;
  var MILLISECONDS_IN_MINUTE = 6e4;
  var DEFAULT_ADDITIONAL_DIGITS = 2;
  var patterns = {
    dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
    datePattern: /^([0-9W+-]+)(.*)/,
    plainTime: /:/,
    YY: /^(\d{2})$/,
    YYY: [
      /^([+-]\d{2})$/,
      /^([+-]\d{3})$/,
      /^([+-]\d{4})$/
    ],
    YYYY: /^(\d{4})/,
    YYYYY: [
      /^([+-]\d{4})/,
      /^([+-]\d{5})/,
      /^([+-]\d{6})/
    ],
    MM: /^-(\d{2})$/,
    DDD: /^-?(\d{3})$/,
    MMDD: /^-?(\d{2})-?(\d{2})$/,
    Www: /^-?W(\d{2})$/,
    WwwD: /^-?W(\d{2})-?(\d{1})$/,
    HH: /^(\d{2}([.,]\d*)?)$/,
    HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
    HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
    timeZone: _index4.default
  };
  function toDate2(argument, dirtyOptions) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    if (argument === null) {
      return new Date(NaN);
    }
    var options = dirtyOptions || {};
    var additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : (0, _index.default)(options.additionalDigits);
    if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
      throw new RangeError("additionalDigits must be 0, 1 or 2");
    }
    if (argument instanceof Date || typeof argument === "object" && Object.prototype.toString.call(argument) === "[object Date]") {
      return new Date(argument.getTime());
    } else if (typeof argument === "number" || Object.prototype.toString.call(argument) === "[object Number]") {
      return new Date(argument);
    } else if (!(typeof argument === "string" || Object.prototype.toString.call(argument) === "[object String]")) {
      return new Date(NaN);
    }
    var dateStrings = splitDateString(argument);
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    var year = parseYearResult.year;
    var restDateString = parseYearResult.restDateString;
    var date = parseDate(restDateString, year);
    if (isNaN(date)) {
      return new Date(NaN);
    }
    if (date) {
      var timestamp = date.getTime();
      var time = 0;
      var offset;
      if (dateStrings.time) {
        time = parseTime(dateStrings.time);
        if (isNaN(time)) {
          return new Date(NaN);
        }
      }
      if (dateStrings.timeZone || options.timeZone) {
        offset = (0, _index3.default)(dateStrings.timeZone || options.timeZone, new Date(timestamp + time));
        if (isNaN(offset)) {
          return new Date(NaN);
        }
      } else {
        offset = (0, _index2.default)(new Date(timestamp + time));
        offset = (0, _index2.default)(new Date(timestamp + time + offset));
      }
      return new Date(timestamp + time + offset);
    } else {
      return new Date(NaN);
    }
  }
  function splitDateString(dateString) {
    var dateStrings = {};
    var parts = patterns.dateTimePattern.exec(dateString);
    var timeString;
    if (!parts) {
      parts = patterns.datePattern.exec(dateString);
      if (parts) {
        dateStrings.date = parts[1];
        timeString = parts[2];
      } else {
        dateStrings.date = null;
        timeString = dateString;
      }
    } else {
      dateStrings.date = parts[1];
      timeString = parts[3];
    }
    if (timeString) {
      var token = patterns.timeZone.exec(timeString);
      if (token) {
        dateStrings.time = timeString.replace(token[1], "");
        dateStrings.timeZone = token[1].trim();
      } else {
        dateStrings.time = timeString;
      }
    }
    return dateStrings;
  }
  function parseYear(dateString, additionalDigits) {
    var patternYYY = patterns.YYY[additionalDigits];
    var patternYYYYY = patterns.YYYYY[additionalDigits];
    var token;
    token = patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString);
    if (token) {
      var yearString = token[1];
      return {
        year: parseInt(yearString, 10),
        restDateString: dateString.slice(yearString.length)
      };
    }
    token = patterns.YY.exec(dateString) || patternYYY.exec(dateString);
    if (token) {
      var centuryString = token[1];
      return {
        year: parseInt(centuryString, 10) * 100,
        restDateString: dateString.slice(centuryString.length)
      };
    }
    return {
      year: null
    };
  }
  function parseDate(dateString, year) {
    if (year === null) {
      return null;
    }
    var token;
    var date;
    var month;
    var week;
    if (dateString.length === 0) {
      date = new Date(0);
      date.setUTCFullYear(year);
      return date;
    }
    token = patterns.MM.exec(dateString);
    if (token) {
      date = new Date(0);
      month = parseInt(token[1], 10) - 1;
      if (!validateDate(year, month)) {
        return new Date(NaN);
      }
      date.setUTCFullYear(year, month);
      return date;
    }
    token = patterns.DDD.exec(dateString);
    if (token) {
      date = new Date(0);
      var dayOfYear = parseInt(token[1], 10);
      if (!validateDayOfYearDate(year, dayOfYear)) {
        return new Date(NaN);
      }
      date.setUTCFullYear(year, 0, dayOfYear);
      return date;
    }
    token = patterns.MMDD.exec(dateString);
    if (token) {
      date = new Date(0);
      month = parseInt(token[1], 10) - 1;
      var day = parseInt(token[2], 10);
      if (!validateDate(year, month, day)) {
        return new Date(NaN);
      }
      date.setUTCFullYear(year, month, day);
      return date;
    }
    token = patterns.Www.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;
      if (!validateWeekDate(year, week)) {
        return new Date(NaN);
      }
      return dayOfISOWeekYear(year, week);
    }
    token = patterns.WwwD.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;
      var dayOfWeek = parseInt(token[2], 10) - 1;
      if (!validateWeekDate(year, week, dayOfWeek)) {
        return new Date(NaN);
      }
      return dayOfISOWeekYear(year, week, dayOfWeek);
    }
    return null;
  }
  function parseTime(timeString) {
    var token;
    var hours;
    var minutes;
    token = patterns.HH.exec(timeString);
    if (token) {
      hours = parseFloat(token[1].replace(",", "."));
      if (!validateTime(hours)) {
        return NaN;
      }
      return hours % 24 * MILLISECONDS_IN_HOUR;
    }
    token = patterns.HHMM.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseFloat(token[2].replace(",", "."));
      if (!validateTime(hours, minutes)) {
        return NaN;
      }
      return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
    }
    token = patterns.HHMMSS.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseInt(token[2], 10);
      var seconds = parseFloat(token[3].replace(",", "."));
      if (!validateTime(hours, minutes, seconds)) {
        return NaN;
      }
      return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1e3;
    }
    return null;
  }
  function dayOfISOWeekYear(isoWeekYear, week, day) {
    week = week || 0;
    day = day || 0;
    var date = new Date(0);
    date.setUTCFullYear(isoWeekYear, 0, 4);
    var fourthOfJanuaryDay = date.getUTCDay() || 7;
    var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
  }
  var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function isLeapYearIndex(year) {
    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
  }
  function validateDate(year, month, date) {
    if (month < 0 || month > 11) {
      return false;
    }
    if (date != null) {
      if (date < 1) {
        return false;
      }
      var isLeapYear = isLeapYearIndex(year);
      if (isLeapYear && date > DAYS_IN_MONTH_LEAP_YEAR[month]) {
        return false;
      }
      if (!isLeapYear && date > DAYS_IN_MONTH[month]) {
        return false;
      }
    }
    return true;
  }
  function validateDayOfYearDate(year, dayOfYear) {
    if (dayOfYear < 1) {
      return false;
    }
    var isLeapYear = isLeapYearIndex(year);
    if (isLeapYear && dayOfYear > 366) {
      return false;
    }
    if (!isLeapYear && dayOfYear > 365) {
      return false;
    }
    return true;
  }
  function validateWeekDate(year, week, day) {
    if (week < 0 || week > 52) {
      return false;
    }
    if (day != null && (day < 0 || day > 6)) {
      return false;
    }
    return true;
  }
  function validateTime(hours, minutes, seconds) {
    if (hours != null && (hours < 0 || hours >= 25)) {
      return false;
    }
    if (minutes != null && (minutes < 0 || minutes >= 60)) {
      return false;
    }
    if (seconds != null && (seconds < 0 || seconds >= 60)) {
      return false;
    }
    return true;
  }
  module.exports = exports.default;
})(toDate, toDate.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = format$12;
  var _index = _interopRequireDefault(format.exports);
  var _index2 = _interopRequireDefault(formatters.exports);
  var _index3 = _interopRequireDefault(toDate.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var tzFormattingTokensRegExp = /([xXOz]+)|''|'(''|[^'])+('|$)/g;
  function format$12(dirtyDate, dirtyFormatStr, dirtyOptions) {
    var formatStr = String(dirtyFormatStr);
    var options = dirtyOptions || {};
    var matches = formatStr.match(tzFormattingTokensRegExp);
    if (matches) {
      var date = (0, _index3.default)(dirtyDate, options);
      formatStr = matches.reduce(function(result2, token) {
        if (token[0] === "'") {
          return result2;
        }
        var pos = result2.indexOf(token);
        var precededByQuotedSection = result2[pos - 1] === "'";
        var replaced = result2.replace(token, "'" + _index2.default[token[0]](date, token, null, options) + "'");
        return precededByQuotedSection ? replaced.substring(0, pos - 1) + replaced.substring(pos + 1) : replaced;
      }, formatStr);
    }
    return (0, _index.default)(dirtyDate, formatStr, options);
  }
  module.exports = exports.default;
})(format$1, format$1.exports);
var formatInTimeZone = { exports: {} };
var cloneObject = { exports: {} };
var assign = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = assign2;
  function assign2(target, object) {
    if (target == null) {
      throw new TypeError("assign requires that input parameter not be null or undefined");
    }
    for (var property in object) {
      if (Object.prototype.hasOwnProperty.call(object, property)) {
        target[property] = object[property];
      }
    }
    return target;
  }
  module.exports = exports.default;
})(assign, assign.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = cloneObject2;
  var _index = _interopRequireDefault(assign.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function cloneObject2(object) {
    return (0, _index.default)({}, object);
  }
  module.exports = exports.default;
})(cloneObject, cloneObject.exports);
var utcToZonedTime = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = utcToZonedTime2;
  var _index = _interopRequireDefault(tzParseTimezone.exports);
  var _index2 = _interopRequireDefault(toDate.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function utcToZonedTime2(dirtyDate, timeZone, options) {
    var date = (0, _index2.default)(dirtyDate, options);
    var offsetMilliseconds = (0, _index.default)(timeZone, date, true);
    var d4 = new Date(date.getTime() - offsetMilliseconds);
    var resultDate = new Date(0);
    resultDate.setFullYear(d4.getUTCFullYear(), d4.getUTCMonth(), d4.getUTCDate());
    resultDate.setHours(d4.getUTCHours(), d4.getUTCMinutes(), d4.getUTCSeconds(), d4.getUTCMilliseconds());
    return resultDate;
  }
  module.exports = exports.default;
})(utcToZonedTime, utcToZonedTime.exports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = formatInTimeZone2;
  var _index = _interopRequireDefault(cloneObject.exports);
  var _index2 = _interopRequireDefault(format$1.exports);
  var _index3 = _interopRequireDefault(utcToZonedTime.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function formatInTimeZone2(date, timeZone, formatStr, options) {
    var extendedOptions = (0, _index.default)(options);
    extendedOptions.timeZone = timeZone;
    return (0, _index2.default)((0, _index3.default)(date, timeZone), formatStr, extendedOptions);
  }
  module.exports = exports.default;
})(formatInTimeZone, formatInTimeZone.exports);
var getTimezoneOffset = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getTimezoneOffset2;
  var _index = _interopRequireDefault(tzParseTimezone.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function getTimezoneOffset2(timeZone, date) {
    return -(0, _index.default)(timeZone, date);
  }
  module.exports = exports.default;
})(getTimezoneOffset, getTimezoneOffset.exports);
var zonedTimeToUtc = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = zonedTimeToUtc2;
  var _index = _interopRequireDefault(cloneObject.exports);
  var _index2 = _interopRequireDefault(toDate.exports);
  var _index3 = _interopRequireDefault(tzPattern.exports);
  var _index4 = _interopRequireDefault(tzParseTimezone.exports);
  var _index5 = _interopRequireDefault(newDateUTC.exports);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function zonedTimeToUtc2(date, timeZone, options) {
    if (typeof date === "string" && !date.match(_index3.default)) {
      var extendedOptions = (0, _index.default)(options);
      extendedOptions.timeZone = timeZone;
      return (0, _index2.default)(date, extendedOptions);
    }
    var d4 = (0, _index2.default)(date, options);
    var utc = (0, _index5.default)(d4.getFullYear(), d4.getMonth(), d4.getDate(), d4.getHours(), d4.getMinutes(), d4.getSeconds(), d4.getMilliseconds()).getTime();
    var offsetMilliseconds = (0, _index4.default)(timeZone, new Date(utc));
    return new Date(utc + offsetMilliseconds);
  }
  module.exports = exports.default;
})(zonedTimeToUtc, zonedTimeToUtc.exports);
var dateFnsTz = {
  format: format$1.exports,
  formatInTimeZone: formatInTimeZone.exports,
  getTimezoneOffset: getTimezoneOffset.exports,
  toDate: toDate.exports,
  utcToZonedTime: utcToZonedTime.exports,
  zonedTimeToUtc: zonedTimeToUtc.exports
};
function convertToLocal(utcdatetime) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return dateFnsTz.utcToZonedTime(utcdatetime, timezone);
}
function formatDateStr(datetime, pattern) {
  return format$2(datetime, pattern);
}
var SmsReceived_vue_vue_type_style_index_0_lang = "";
const _sfc_main$a = {
  name: "SmsReceived",
  props: {
    changeTab: Function,
    styling: Object,
    brandId: String,
    customerId: String
  },
  setup(props) {
    const messages = ref(null);
    const messagesQuery = useQuery({
      query: CUSTOMER_PERSONAL_SMS_LOGS,
      variables: {
        customerId: props.customerId,
        brandId: props.brandId,
        hidden: false
      }
    });
    watch(messagesQuery.fetching, (fetchStatus) => {
      if (!fetchStatus) {
        messages.value = messagesQuery.data.value.customerSmsLogs.map(
          (item) => {
            return {
              ...item,
              datetime: formatDateStr(
                convertToLocal(item.datetime),
                "dd/MM/yyyy HH:mm"
              )
            };
          }
        );
      }
    });
    const primaryTheme = {
      color: `${props.styling.icon_button_color} !important`
    };
    const cssVars = {
      "--color": `${props.styling.selected_color}`,
      "--unselect": `${props.styling.unselect_color}`
    };
    const buttonText = {
      color: `${props.styling.button_text_color} !important`
    };
    return {
      primaryTheme,
      cssVars,
      buttonText,
      changeTab: computed(() => props.changeTab),
      messages
    };
  },
  components: {
    Spinner
  }
};
const _hoisted_1$9 = /* @__PURE__ */ createVNode("h1", { class: "mulah-sr__title" }, "SMS Received", -1);
const _hoisted_2$9 = { class: "mulah-sr__container" };
const _hoisted_3$8 = { class: "log-container" };
const _hoisted_4$8 = { class: "log-box" };
const _hoisted_5$8 = { class: "log-box-text" };
const _hoisted_6$7 = { class: "log-date" };
const _hoisted_7$6 = { class: "mulah-sr__button__container" };
const _hoisted_8$6 = {
  key: 1,
  class: "spinner-container"
};
const _hoisted_9$5 = { class: "spinner-inner" };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Spinner = resolveComponent("Spinner");
  return $setup.messages ? (openBlock(), createBlock("div", {
    key: 0,
    class: "mulah-sr",
    style: $setup.cssVars
  }, [
    _hoisted_1$9,
    createVNode("div", _hoisted_2$9, [
      createVNode("div", _hoisted_3$8, [
        (openBlock(true), createBlock(Fragment, null, renderList($setup.messages, (data, index) => {
          return openBlock(), createBlock("div", { key: index }, [
            createVNode("div", _hoisted_4$8, [
              createVNode("p", _hoisted_5$8, toDisplayString(data.message), 1)
            ]),
            createVNode("p", _hoisted_6$7, toDisplayString(data.datetime), 1)
          ]);
        }), 128))
      ])
    ]),
    createVNode("div", _hoisted_7$6, [
      createVNode("button", {
        style: {
          background: $setup.primaryTheme.color,
          borderColor: $setup.primaryTheme.color,
          color: $setup.buttonText.color
        },
        onClick: _cache[1] || (_cache[1] = ($event) => $setup.changeTab("home"))
      }, " Back ", 4)
    ])
  ], 4)) : (openBlock(), createBlock("div", _hoisted_8$6, [
    createVNode("div", _hoisted_9$5, [
      createVNode(_component_Spinner)
    ])
  ]));
}
var SmsReceived = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
const _sfc_main$9 = {
  name: "PointsRewardSvg",
  props: {
    color: String
  }
};
const _hoisted_1$8 = /* @__PURE__ */ createVNode("title", null, "PointsRewards", -1);
const _hoisted_2$8 = /* @__PURE__ */ createVNode("path", {
  d: "M302.07,346.41v30.9a2.88,2.88,0,0,0,2.88,2.88H326.7V343.54H305A2.88,2.88,0,0,0,302.07,346.41Z",
  transform: "translate(-298.04 -300.55)"
}, null, -1);
const _hoisted_3$7 = /* @__PURE__ */ createVNode("path", {
  d: "M337.5,343.54v9.21a16.05,16.05,0,0,1,11.05-7.1,16.74,16.74,0,0,1,2.34-.17,16,16,0,0,1,10.11,3.6c.36-.29.74-.57,1.13-.84v-1.83a2.88,2.88,0,0,0-2.88-2.87Z",
  transform: "translate(-298.04 -300.55)"
}, null, -1);
const _hoisted_4$7 = /* @__PURE__ */ createVNode("path", {
  d: "M340.84,374.28l-.36-.42c-.45-.5-.93-1.06-1.31-1.5a16.22,16.22,0,0,1-1.67-2.14v10h9C344.36,378,342.27,375.91,340.84,374.28Z",
  transform: "translate(-298.04 -300.55)"
}, null, -1);
const _hoisted_5$7 = /* @__PURE__ */ createVNode("path", {
  d: "M381.18,359.64a10.24,10.24,0,0,0-19.46-2.26.78.78,0,0,1-1.45,0,10.24,10.24,0,1,0-16.79,11.16c.46.56,1.17,1.34,1.69,1.94,2.8,3.19,8.84,9,12.71,12.49a4.56,4.56,0,0,0,2.85,1.18h.54a4.56,4.56,0,0,0,2.84-1.18c3.87-3.48,9.92-9.3,12.71-12.49.52-.6,1.23-1.38,1.69-1.94A10.23,10.23,0,0,0,381.18,359.64Z",
  transform: "translate(-298.04 -300.55)"
}, null, -1);
const _hoisted_6$6 = /* @__PURE__ */ createVNode("path", {
  d: "M298,328.07v9a2.89,2.89,0,0,0,2.89,2.89h25.73v-14.8H300.93A2.89,2.89,0,0,0,298,328.07Z",
  transform: "translate(-298.04 -300.55)"
}, null, -1);
const _hoisted_7$5 = /* @__PURE__ */ createVNode("path", {
  d: "M363.21,325.19h-25.8l.06,14.8h25.74a2.88,2.88,0,0,0,2.88-2.89v-9A2.88,2.88,0,0,0,363.21,325.19Z",
  transform: "translate(-298.04 -300.55)"
}, null, -1);
const _hoisted_8$5 = /* @__PURE__ */ createVNode("path", {
  d: "M310,321.93a4.18,4.18,0,0,0,2.39.49h39a4.94,4.94,0,0,0,2.71-.53c2.58-1.52,4.2-4.72,4.2-8.79a14.17,14.17,0,0,0-2.62-8.29,10.45,10.45,0,0,0-8.55-4.26l-.87,0c-9.09.63-12.78,9.26-14.22,14.82-1.45-5.56-5.14-14.19-14.23-14.82l-.87,0a10.45,10.45,0,0,0-8.55,4.26,14.17,14.17,0,0,0-2.62,8.29C305.73,317.21,307.38,320.43,310,321.93Zm36.57-16.17.51,0a5.21,5.21,0,0,1,4.39,2.18,8.8,8.8,0,0,1,1.59,5.18c0,1.59-.55,4.58-2.64,4.58H336.79C337.73,313.52,340.27,306.2,346.58,305.76Zm-34.06,2.16a5.18,5.18,0,0,1,4.38-2.18l.52,0c6.3.44,8.84,7.76,9.78,11.92H313.56c-2.09,0-2.64-3-2.64-4.58A8.73,8.73,0,0,1,312.52,307.92Z",
  transform: "translate(-298.04 -300.55)"
}, null, -1);
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", {
    id: "DESIGNED_BY_FREEPIK",
    "data-name": "DESIGNED BY FREEPIK",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 83.29 83.6",
    style: `
      fill: ${$props.color} !important;
      width: 30px !important;
      height: 30px !important;
    `
  }, [
    _hoisted_1$8,
    _hoisted_2$8,
    _hoisted_3$7,
    _hoisted_4$7,
    _hoisted_5$7,
    _hoisted_6$6,
    _hoisted_7$5,
    _hoisted_8$5
  ], 4);
}
var PointRewards = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
var OverviewRewards_vue_vue_type_style_index_0_lang = "";
const _sfc_main$8 = {
  name: "OverviewRewards",
  setup(props) {
    inject("store");
    return {
      changeTab: props.changeTab
    };
  },
  props: {
    styling: Object,
    changeTab: Function
  },
  components: {
    PointRewards,
    SmsRewards: SmsRewards$1,
    ArrowRight
  }
};
const _hoisted_1$7 = /* @__PURE__ */ createVNode("a", null, "Points Reward", -1);
const _hoisted_2$7 = { class: "arrow_positions" };
const _hoisted_3$6 = /* @__PURE__ */ createVNode("hr", null, null, -1);
const _hoisted_4$6 = /* @__PURE__ */ createVNode("a", null, "SMS Rewards", -1);
const _hoisted_5$6 = { class: "arrow_positions" };
const _hoisted_6$5 = /* @__PURE__ */ createVNode("hr", null, null, -1);
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_PointRewards = resolveComponent("PointRewards");
  const _component_ArrowRight = resolveComponent("ArrowRight");
  const _component_SmsRewards = resolveComponent("SmsRewards");
  return openBlock(), createBlock("div", null, [
    createVNode("div", {
      class: "mulah-overview__content__navigation",
      onClick: _cache[1] || (_cache[1] = ($event) => $props.changeTab("points"))
    }, [
      createVNode(_component_PointRewards, {
        color: $props.styling.icon_color
      }, null, 8, ["color"]),
      _hoisted_1$7,
      createVNode("div", _hoisted_2$7, [
        createVNode(_component_ArrowRight, {
          size: 15,
          color: $props.styling.icon_color
        }, null, 8, ["color"])
      ])
    ]),
    _hoisted_3$6,
    createVNode("div", {
      class: "mulah-overview__content__navigation",
      onClick: _cache[2] || (_cache[2] = ($event) => $props.changeTab("reward"))
    }, [
      createVNode(_component_SmsRewards, {
        size: 30,
        color: $props.styling.icon_color
      }, null, 8, ["color"]),
      _hoisted_4$6,
      createVNode("div", _hoisted_5$6, [
        createVNode(_component_ArrowRight, {
          size: 15,
          color: $props.styling.icon_color
        }, null, 8, ["color"])
      ])
    ]),
    _hoisted_6$5
  ]);
}
var OverviewRewards = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
var VoucherRewards_vue_vue_type_style_index_0_lang = "";
const _sfc_main$7 = {
  name: "VoucherRewards",
  props: {
    styling: Object,
    changeTab: Function,
    changePath: Function,
    customer: Object,
    brandId: String
  },
  components: {
    Gift,
    Calendar,
    Coupon
  },
  setup(props) {
    const result2 = useQuery({
      query: ONLINE_REDEMPTIONS,
      variables: {
        phoneNumber: props.customer.phoneNumber,
        brandId: props.brandId
      }
    });
    const offers = ref(null);
    const activeVouchers = ref([]);
    const usedVouchers = ref([]);
    watch(result2.fetching, (fetchStatus) => {
      if (!fetchStatus) {
        let determineStatus = function(item) {
          const currentDate = new Date();
          const expiryDate = new Date(item.expiryDate);
          currentDate.setHours(0, 0, 0, 0);
          expiryDate.setHours(0, 0, 0, 0);
          if (item.used) {
            return "Redeemed";
          } else if (currentDate > expiryDate) {
            return "Expired";
          } else {
            return "Redeem";
          }
        };
        offers.value = result2.data.value.customer.onlineRedemptions.map((x3) => {
          return {
            ...x3,
            title: x3.displayName,
            status: determineStatus(x3),
            copied: false
          };
        });
        activeVouchers.value = offers.value.filter((x3) => x3.status == "Redeem");
        usedVouchers.value = offers.value.filter((x3) => x3.status != "Redeem").sort((a4, b3) => new Date(b3.expiryDate) - new Date(a4.expiryDate));
      }
    });
    const active = ref(true);
    function switchTab() {
      active.value = !active.value;
    }
    const activeSelected = computed(() => {
      return {
        "mulah-vr__selected": active.value,
        "mulah-vr__not-selected": !active.value
      };
    });
    const usedSelected = computed(() => {
      return {
        "mulah-vr__selected": !active.value,
        "mulah-vr__not-selected": active.value
      };
    });
    const cssVars = {
      "--color": `${props.styling.selected_color}`,
      "--unselect": `${props.styling.unselect_color}`
    };
    const primaryTheme = {
      color: `${props.styling.icon_button_color} !important`
    };
    const buttonText = {
      color: `${props.styling.button_text_color} !important`
    };
    const formatDate = (string) => {
      const target = string.match(/(\d*)\/*-*(\d*)\/*-*(\d*).*/);
      return `${target[3]}/${target[2]}/${target[1]}`;
    };
    const copyCode = (index) => {
      activeVouchers.value.forEach((x3) => x3.copied = false);
      navigator.clipboard.writeText(activeVouchers.value[index].code);
      activeVouchers.value[index].copied = true;
      setTimeout(function() {
        activeVouchers.value.forEach((x3) => x3.copied = false);
      }, 2e3);
    };
    return {
      active,
      activeVouchers,
      primaryTheme,
      cssVars,
      changeTab: props.changeTab,
      changePath: props.changePath,
      switchTab,
      usedSelected,
      activeSelected,
      formatDate,
      usedVouchers,
      buttonText,
      copyCode
    };
  }
};
const _hoisted_1$6 = /* @__PURE__ */ createVNode("h1", { class: "mulah-vr__title" }, "My Vouchers", -1);
const _hoisted_2$6 = { class: "mulah-vr__options" };
const _hoisted_3$5 = {
  key: 0,
  class: "mulah-sr__container"
};
const _hoisted_4$5 = {
  class: "promotion-container",
  style: { "z-index": "1", "position": "relative", "margin-left": "10px !important" }
};
const _hoisted_5$5 = { class: "gift-container" };
const _hoisted_6$4 = { class: "title-container" };
const _hoisted_7$4 = { class: "offer-title" };
const _hoisted_8$4 = { class: "calendar-container" };
const _hoisted_9$4 = {
  class: "code-container",
  style: { "text-align": "right", "margin-right": "1rem !important" }
};
const _hoisted_10$4 = {
  key: 0,
  style: { "background-color": "#f47521 !important", "border-color": "#f47521 !important", "width": "45% !important" }
};
const _hoisted_11$4 = {
  key: 1,
  class: "mulah-sr__container"
};
const _hoisted_12$4 = {
  class: "promotion-container used-container",
  style: { "z-index": "1", "position": "relative", "margin-left": "10px !important" }
};
const _hoisted_13$3 = { class: "gift-container" };
const _hoisted_14$3 = { class: "title-container" };
const _hoisted_15$3 = {
  class: "offer-title",
  style: { "{\n                  color": "'#646464' !important" }
};
const _hoisted_16$3 = { class: "calendar-container" };
const _hoisted_17$3 = {
  class: "expiry",
  style: { "{\n                  color": "'#aaaaaa' !important" }
};
const _hoisted_18$3 = { class: "code-container" };
const _hoisted_19$2 = {
  key: 0,
  class: "code",
  style: { "font-weight": "bolder !important", "color": "#000000 !important", "text-align": "right !important" }
};
const _hoisted_20$2 = {
  key: 1,
  class: "code",
  style: { "color": "#000000 !important" }
};
const _hoisted_21$2 = { style: { "margin-top": "15px !important", "margin-bottom": "10px !important" } };
const _hoisted_22$2 = /* @__PURE__ */ createVNode("em", null, "Tap Here for Terms and Conditions", -1);
const _hoisted_23$2 = { class: "mulah-vr__button__container" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Coupon = resolveComponent("Coupon");
  const _component_Gift = resolveComponent("Gift");
  const _component_Calendar = resolveComponent("Calendar");
  return openBlock(), createBlock("div", {
    class: "mulah-vr",
    style: $setup.cssVars
  }, [
    _hoisted_1$6,
    createVNode("div", _hoisted_2$6, [
      createVNode("span", {
        onClick: _cache[1] || (_cache[1] = (...args) => $setup.switchTab && $setup.switchTab(...args)),
        class: $setup.activeSelected
      }, " Active Vouchers ", 2),
      createVNode("span", {
        onClick: _cache[2] || (_cache[2] = (...args) => $setup.switchTab && $setup.switchTab(...args)),
        class: $setup.usedSelected
      }, " Past Vouchers ", 2)
    ]),
    $setup.active ? (openBlock(), createBlock("div", _hoisted_3$5, [
      (openBlock(true), createBlock(Fragment, null, renderList($setup.activeVouchers, (offer, index) => {
        return openBlock(), createBlock("div", {
          class: "mulah-sr__card",
          key: `voucher-${index}`,
          style: { "position": "relative", "box-shadow": "none", "background": "none" }
        }, [
          createVNode(_component_Coupon),
          createVNode("div", _hoisted_4$5, [
            createVNode("div", _hoisted_5$5, [
              createVNode(_component_Gift, {
                size: 21,
                color: $setup.primaryTheme.color
              }, null, 8, ["color"])
            ]),
            createVNode("div", _hoisted_6$4, [
              createVNode("p", _hoisted_7$4, toDisplayString(offer.title), 1)
            ]),
            createVNode("div", _hoisted_8$4, [
              createVNode(_component_Calendar, {
                color: $setup.primaryTheme.color
              }, null, 8, ["color"]),
              createVNode("p", {
                class: "expiry",
                style: $setup.primaryTheme
              }, " Expiry " + toDisplayString($setup.formatDate(offer.expiryDate)), 5)
            ]),
            createVNode("div", _hoisted_9$4, [
              offer.copied ? (openBlock(), createBlock("button", _hoisted_10$4, " Copied ")) : (openBlock(), createBlock("button", {
                key: 1,
                style: { "background-color": "#0bcf00 !important", "border-color": "#0bcf00 !important", "width": "45% !important" },
                onClick: () => $setup.copyCode(index)
              }, " Copy Code ", 8, ["onClick"]))
            ])
          ])
        ]);
      }), 128))
    ])) : (openBlock(), createBlock("div", _hoisted_11$4, [
      (openBlock(true), createBlock(Fragment, null, renderList($setup.usedVouchers, (offer, index) => {
        return openBlock(), createBlock("div", {
          class: "mulah-sr__card",
          key: `promotion-${index}`,
          style: { "position": "relative", "box-shadow": "none", "background": "none" }
        }, [
          createVNode(_component_Coupon),
          createVNode("div", _hoisted_12$4, [
            createVNode("div", _hoisted_13$3, [
              createVNode(_component_Gift, {
                size: 21,
                color: "#aaaaaa"
              })
            ]),
            createVNode("div", _hoisted_14$3, [
              createVNode("p", _hoisted_15$3, toDisplayString(offer.title), 1)
            ]),
            createVNode("div", _hoisted_16$3, [
              createVNode(_component_Calendar, { color: "#aaaaaa" }),
              createVNode("p", _hoisted_17$3, " Expiry " + toDisplayString($setup.formatDate(offer.expiryDate)), 1)
            ]),
            createVNode("div", _hoisted_18$3, [
              offer.status == "Expired" ? (openBlock(), createBlock("p", _hoisted_19$2, toDisplayString(offer.status), 1)) : (openBlock(), createBlock("p", _hoisted_20$2, " Used on " + toDisplayString($setup.formatDate(offer.usedAt)), 1))
            ])
          ])
        ]);
      }), 128))
    ])),
    createVNode("div", _hoisted_21$2, [
      createVNode("p", {
        onClick: _cache[3] || (_cache[3] = ($event) => $setup.changePath("tnc")),
        style: { "color": "grey !important", "font-size": "0.9em !important" }
      }, [
        _hoisted_22$2
      ])
    ]),
    createVNode("div", _hoisted_23$2, [
      createVNode("button", {
        style: {
          background: $setup.primaryTheme.color,
          borderColor: $setup.primaryTheme.color,
          color: $setup.buttonText.color
        },
        onClick: _cache[4] || (_cache[4] = ($event) => $setup.changeTab("online"))
      }, " Back ", 4)
    ])
  ], 4);
}
var VoucherRewards = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
var BrandOverview_vue_vue_type_style_index_0_lang = "";
const _sfc_main$6 = {
  name: "BrandOverview",
  setup(props) {
    const activeTab = ref("home");
    const store2 = inject("store");
    const showQrStatus = ref(false);
    const validOffer = ref([]);
    const offerLoading = ref(true);
    const reminder = ref(false);
    if (props.toOverviewPoints) {
      activeTab.value = "home";
    }
    const phoneNumber = getDbNumber(store2.state.phoneNumber);
    const { executeMutation: createWebsiteVisit } = useMutation(CREATE_WEBSITE_VISIT);
    const { executeMutation: createProspectMutation } = useMutation(
      CREATE_EMBEDDED_PROSPECT
    );
    createWebsiteVisit({
      id: store2.state.token,
      phoneNumber
    });
    createProspectMutation({
      id: store2.state.token,
      phoneNumber
    });
    let fbPixelHeader = document.createElement("script");
    fbPixelHeader.text = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
                                        'https://connect.facebook.net/en_US/fbevents.js');`;
    document.head.appendChild(fbPixelHeader);
    let googleTagHeader = document.createElement("script");
    googleTagHeader.text = `
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                             m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); `;
    document.head.appendChild(googleTagHeader);
    const result2 = useQuery({
      query: HISTORY,
      variables: {
        phoneNumber,
        brandId: store2.state.token,
        sort: "cost",
        direction: "ASC",
        filters: {
          status: "active",
          title: "",
          specification: "Point Reward"
        }
      }
    });
    watch(result2.fetching, (fetchStatus) => {
      if (!fetchStatus) {
        const overviewStyle2 = JSON.parse(result2.data.value.brand.overviewStyle);
        const div = document.getElementById("mulah-app");
        div.style.cssText += `background-color: ${overviewStyle2.main_background} !important;`;
        document.body.style.setProperty("background", overviewStyle2.main_background, "important");
        store2.addPersonalInfoStyle(
          JSON.parse(result2.data.value.brand.personalInfoStyle)
        );
      }
    });
    const customerResult = useQuery({
      query: CUSTOMER,
      variables: {
        phoneNumber
      }
    });
    const customer = ref(null);
    watch(customerResult.fetching, (fetchStatus) => {
      if (!fetchStatus) {
        if (!customerResult.data.value.customer.withInfo) {
          props.changePath("registration");
        } else {
          customer.value = customerResult.data.value.customer;
          store2.addCustomerInfo(customerResult.data.value.customer);
        }
      }
    });
    const customerOffers = useQuery({
      query: CUSTOMER_OFFERS,
      variables: {
        phoneNumber
      }
    });
    function determineStatus(item) {
      const currentDate = new Date();
      const expiryDate = new Date(item.expiryDate);
      currentDate.setHours(0, 0, 0, 0);
      expiryDate.setHours(0, 0, 0, 0);
      if (item.used) {
        return "Redeemed";
      } else if (currentDate > expiryDate) {
        return "Expired";
      } else {
        return "Redeem";
      }
    }
    function determineBundleStatus(items) {
      const statuses = [...new Set(items.map((item) => determineStatus(item)))];
      if (statuses.length == 1) {
        return statuses[0];
      } else if (statuses.includes("Expired")) {
        return "Expired";
      } else {
        return "Redeem";
      }
    }
    const offerItems = ref([]);
    watch(customerOffers.fetching, (status) => {
      if (!status && customerOffers.data.value) {
        var groupBy = function(xs, key) {
          return xs.reduce(function(rv, x3) {
            (rv[x3[key]] = rv[x3[key]] || []).push(x3);
            return rv;
          }, {});
        };
        const formattedOffers = customerOffers.data.value.offers.map((item) => {
          return {
            ...item,
            voucherId: item.voucher.id,
            amount: 0,
            status: determineStatus(item)
          };
        });
        offerItems.value = Object.values(
          groupBy(formattedOffers, "voucherId")
        ).map((item) => {
          return {
            voucherId: item[0].voucherId,
            title: item.length == 1 ? item[0].promotion.title : item[0].voucher.campaign.title,
            code: item[0].voucher.code,
            expiryDate: item[0].expiryDate,
            status: item.length == 1 ? determineStatus(item[0]) : determineBundleStatus(item),
            usedAt: item[0].usedOn,
            offers: item.map((record) => {
              return {
                id: record.id,
                promotion: record.promotion,
                status: determineStatus(record)
              };
            })
          };
        });
        validOffer.value = offerItems.value.filter((x3) => x3.status == "Redeem");
      }
      offerLoading.value = false;
    });
    const textColor = computed(() => {
      return result2.data.value.brand.headerColor;
    });
    const overviewStyle = computed(() => {
      return JSON.parse(result2.data.value.brand.overviewStyle);
    });
    const barcodeStyle = computed(() => {
      return JSON.parse(result2.data.value.brand.barcodeStyle);
    });
    const rewardStyle = computed(() => {
      return JSON.parse(result2.data.value.brand.rewardStyle);
    });
    const smsStyle = computed(() => {
      return JSON.parse(result2.data.value.brand.smsStyle);
    });
    const iconBackground = computed(() => {
      return result2.data.value.brand.logoBackground == "#ffffff" ? "#000000" : result2.data.value.brand.logoBackground;
    });
    const borderStyle = computed(() => {
      return result2.data.value.brand.homepageBorder == null ? {} : {
        "border-width": "1px",
        "border-color": result2.data.value.brand.homepageBorder,
        "border-style": "solid"
      };
    });
    function changeTab(newTab) {
      if (newTab == "reward") {
        reminder.value = true;
      } else if (newTab == "personal_info") {
        props.changePath(newTab);
      }
      activeTab.value = newTab;
    }
    function currentActive(tab) {
      return { "mulah-active": tab == activeTab.value };
    }
    function toTnc() {
      props.changePath("tnc");
    }
    function showQr() {
      showQrStatus.value = true;
    }
    function closeQr() {
      showQrStatus.value = false;
    }
    function closeReminder() {
      reminder.value = true;
    }
    const usedPoints = ref(0);
    const availPoints = computed(() => {
      return result2.data.value.brand.totalAvailablePoints - usedPoints.value;
    });
    function deductPoints(points) {
      usedPoints.value = points;
    }
    return {
      availPoints,
      data: result2.data,
      fetching: result2.fetching,
      error: result2.error,
      textColor,
      activeTab,
      changeTab,
      currentActive,
      iconBackground,
      toTnc,
      borderStyle,
      overviewStyle,
      rewardStyle,
      customer,
      barcodeStyle,
      smsStyle,
      showQr,
      showQrStatus,
      closeQr,
      offerLoading,
      validOffer,
      reminder,
      closeReminder,
      customerOffers,
      offerItems,
      deductPoints
    };
  },
  props: {
    changePath: Function,
    toOverviewPoints: Boolean
  },
  components: {
    Spinner,
    OverviewMain,
    OverviewPoints,
    OverviewOnline,
    Home,
    Gift,
    GoogleTag,
    FbPixel,
    QrModal,
    Scanner,
    Diamond,
    SmsReminder,
    SmsRewards,
    OverviewRewards,
    OverviewRewardsSelect,
    VoucherRewards,
    SmsReceived,
    OverviewRewards
  }
};
const _hoisted_1$5 = {
  key: 0,
  class: "spinner-container"
};
const _hoisted_2$5 = { class: "spinner-inner" };
const _hoisted_3$4 = {
  key: 1,
  class: "spinner-container"
};
const _hoisted_4$4 = { class: "spinner-inner" };
const _hoisted_5$4 = {
  key: 2,
  class: "mulah-overview"
};
const _hoisted_6$3 = { style: { "padding-left": "15px !important", "padding-right": "15px !important" } };
const _hoisted_7$3 = { class: "mulah-overview__content__container" };
const _hoisted_8$3 = {
  key: 3,
  class: "mulah-overview__content__container-inner"
};
const _hoisted_9$3 = { class: "mulah-overview__card__container--main" };
const _hoisted_10$3 = { class: "mulah-overview__card__body mulah-overview__card--main" };
const _hoisted_11$3 = { class: "customer_info" };
const _hoisted_12$3 = {
  key: 0,
  class: "customer_memberships"
};
const _hoisted_13$2 = {
  key: 1,
  class: "diamond_container"
};
const _hoisted_14$2 = { class: "customer_points" };
const _hoisted_15$2 = { class: "mulah-overview__body__container" };
const _hoisted_16$2 = { class: "mulah-overview__footer" };
const _hoisted_17$2 = { key: 0 };
const _hoisted_18$2 = /* @__PURE__ */ createVNode("h6", null, [
  /* @__PURE__ */ createTextVNode("Powered by "),
  /* @__PURE__ */ createVNode("a", { class: "mulah-link-blue" }, "MulahRewards.com")
], -1);
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Spinner = resolveComponent("Spinner");
  const _component_SmsReminder = resolveComponent("SmsReminder");
  const _component_VoucherRewards = resolveComponent("VoucherRewards");
  const _component_SmsRewards = resolveComponent("SmsRewards");
  const _component_SmsReceived = resolveComponent("SmsReceived");
  const _component_Scanner = resolveComponent("Scanner");
  const _component_Diamond = resolveComponent("Diamond");
  const _component_OverviewMain = resolveComponent("OverviewMain");
  const _component_OverviewRewardsSelect = resolveComponent("OverviewRewardsSelect");
  const _component_OverviewRewards = resolveComponent("OverviewRewards");
  const _component_OverviewPoints = resolveComponent("OverviewPoints");
  const _component_OverviewOnline = resolveComponent("OverviewOnline");
  const _component_QrModal = resolveComponent("QrModal");
  const _component_FbPixel = resolveComponent("FbPixel");
  const _component_GoogleTag = resolveComponent("GoogleTag");
  return $setup.fetching ? (openBlock(), createBlock("div", _hoisted_1$5, [
    createVNode("div", _hoisted_2$5, [
      createVNode(_component_Spinner)
    ])
  ])) : $setup.offerLoading ? (openBlock(), createBlock("div", _hoisted_3$4, [
    createVNode("div", _hoisted_4$4, [
      createVNode(_component_Spinner)
    ])
  ])) : (openBlock(), createBlock("div", _hoisted_5$4, [
    createVNode("div", _hoisted_6$3, [
      $setup.validOffer.length != 0 && !$setup.reminder ? (openBlock(), createBlock(_component_SmsReminder, {
        key: 0,
        close: $setup.closeReminder,
        count: $setup.validOffer.length,
        styling: {
          ...$setup.overviewStyle,
          icon_button_color: $setup.smsStyle.icon_button_color,
          button_text_color: $setup.smsStyle.button_text_color
        },
        toReward: $setup.changeTab
      }, null, 8, ["close", "count", "styling", "toReward"])) : createCommentVNode("", true),
      createVNode("div", _hoisted_7$3, [
        $setup.activeTab == "onlineVouchers" ? (openBlock(), createBlock(_component_VoucherRewards, {
          key: 0,
          styling: $setup.smsStyle,
          changeTab: $setup.changeTab,
          changePath: $props.changePath,
          customer: $setup.customer,
          brandId: $setup.data.brand.id
        }, null, 8, ["styling", "changeTab", "changePath", "customer", "brandId"])) : $setup.activeTab == "reward" ? (openBlock(), createBlock(_component_SmsRewards, {
          key: 1,
          offer: $setup.offerItems,
          changeTab: $setup.changeTab,
          styling: $setup.smsStyle
        }, null, 8, ["offer", "changeTab", "styling"])) : $setup.activeTab == "received" ? (openBlock(), createBlock(_component_SmsReceived, {
          key: 2,
          changeTab: $setup.changeTab,
          styling: $setup.smsStyle,
          customerId: $setup.customer.id,
          brandId: $setup.data.brand.id
        }, null, 8, ["changeTab", "styling", "customerId", "brandId"])) : (openBlock(), createBlock("div", _hoisted_8$3, [
          createVNode("div", _hoisted_9$3, [
            createVNode("div", {
              class: "mulah-overview__card mulah-overview__card--main",
              style: `background: ${$setup.overviewStyle.card_background} !important;`
            }, [
              createVNode("div", _hoisted_10$3, [
                createVNode("div", _hoisted_11$3, [
                  createVNode("p", {
                    style: `color: ${$setup.overviewStyle.header_color} !important`,
                    class: "mulah-overview__customer-name"
                  }, toDisplayString($setup.customer ? $setup.customer.name : ""), 5),
                  createVNode("p", {
                    style: `color: ${$setup.overviewStyle.text_color} !important`,
                    class: "mulah-overview__customer-phone"
                  }, toDisplayString($setup.customer ? $setup.customer.phoneNumber : ""), 5),
                  createVNode("p", {
                    style: `color: ${$setup.overviewStyle.text_color} !important`,
                    class: "mulah-overview__customer-member"
                  }, toDisplayString($setup.customer ? $setup.customer.membership.title : ""), 5)
                ]),
                $setup.data.brand.brandConfiguration.qrBarcode ? (openBlock(), createBlock("div", _hoisted_12$3, [
                  createVNode("span", {
                    onClick: _cache[1] || (_cache[1] = (...args) => $setup.showQr && $setup.showQr(...args))
                  }, [
                    createVNode(_component_Scanner, {
                      color: `${$setup.overviewStyle.header_color}`
                    }, null, 8, ["color"])
                  ]),
                  createVNode("p", {
                    class: "scan-title",
                    style: `color: ${$setup.overviewStyle.text_color} !important`
                  }, " Click to Scan ", 4)
                ])) : (openBlock(), createBlock("div", _hoisted_13$2, [
                  createVNode(_component_Diamond, {
                    color: `${$setup.overviewStyle.header_color}`
                  }, null, 8, ["color"])
                ])),
                createVNode("div", _hoisted_14$2, [
                  createVNode("p", {
                    class: "points",
                    style: `color: ${$setup.overviewStyle.header_color} !important`
                  }, toDisplayString($setup.availPoints), 5),
                  createVNode("p", {
                    style: `color: ${$setup.overviewStyle.text_color} !important`
                  }, " Points Balance ", 4)
                ])
              ])
            ], 4)
          ]),
          createVNode("div", _hoisted_15$2, [
            $setup.activeTab == "home" ? (openBlock(), createBlock(_component_OverviewMain, {
              key: 0,
              iconBackground: $setup.iconBackground,
              changeTab: $setup.changeTab,
              toTnc: $setup.toTnc,
              brand: $setup.data.brand,
              styling: $setup.overviewStyle
            }, null, 8, ["iconBackground", "changeTab", "toTnc", "brand", "styling"])) : $setup.activeTab == "rewards" ? (openBlock(), createBlock(_component_OverviewRewardsSelect, {
              key: 1,
              styling: $setup.overviewStyle,
              changeTab: $setup.changeTab,
              changePath: $props.changePath,
              "with-online": $setup.data.brand.brandConfiguration.onlineRedemptionsEnabled
            }, null, 8, ["styling", "changeTab", "changePath", "with-online"])) : $setup.activeTab == "redeem" ? (openBlock(), createBlock(_component_OverviewRewards, {
              key: 2,
              styling: $setup.overviewStyle,
              changeTab: $setup.changeTab
            }, null, 8, ["styling", "changeTab"])) : $setup.activeTab == "points" ? (openBlock(), createBlock(_component_OverviewPoints, {
              key: 3,
              brand: $setup.data.brand,
              "change-path": $props.changePath,
              changeTab: $setup.changeTab,
              styling: $setup.rewardStyle
            }, null, 8, ["brand", "change-path", "changeTab", "styling"])) : $setup.activeTab == "online" ? (openBlock(), createBlock(_component_OverviewOnline, {
              key: 4,
              onlinePromotions: $setup.data.brand.onlinePromotions,
              styling: $setup.rewardStyle,
              "change-path": $props.changePath,
              changeTab: $setup.changeTab,
              data: $setup.availPoints,
              customer: $setup.customer,
              deductPoints: $setup.deductPoints
            }, null, 8, ["onlinePromotions", "styling", "change-path", "changeTab", "data", "customer", "deductPoints"])) : createCommentVNode("", true)
          ])
        ])),
        $setup.showQrStatus ? (openBlock(), createBlock(_component_QrModal, {
          key: 4,
          customer: $setup.customer,
          styling: $setup.barcodeStyle,
          brandName: $setup.data.brand.name,
          close: $setup.closeQr
        }, null, 8, ["customer", "styling", "brandName", "close"])) : createCommentVNode("", true)
      ]),
      createVNode("div", _hoisted_16$2, [
        $setup.activeTab != "home" && $setup.activeTab != "redeem" ? (openBlock(), createBlock("hr", _hoisted_17$2)) : createCommentVNode("", true),
        _hoisted_18$2
      ]),
      createVNode(_component_FbPixel, {
        pixelId: $setup.data.brand.fbPixelId
      }, null, 8, ["pixelId"]),
      createVNode(_component_GoogleTag, {
        googleTagId: $setup.data.brand.googleTagId
      }, null, 8, ["googleTagId"])
    ])
  ]));
}
var BrandOverview = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
var BrandHistory_vue_vue_type_style_index_0_lang = "";
const _sfc_main$5 = {
  name: "BrandHistory",
  setup(props) {
    const store2 = inject("store");
    const phoneNumber = getDbNumber(store2.state.phoneNumber);
    const result2 = useQuery({
      query: CUSTOMER_HISTORY,
      variables: {
        phoneNumber,
        brandId: store2.state.token
      }
    });
    function formatDate(dateString) {
      return formatDateStr(convertToLocal(dateString), "dd/MM/yyyy");
    }
    function formatTime(dateString) {
      return formatDateStr(convertToLocal(dateString), "hh:mm aa");
    }
    return {
      data: result2.data,
      fetching: result2.fetching,
      formatDate,
      formatTime
    };
  },
  props: {
    changePath: Function
  },
  components: {
    Spinner
  }
};
const _hoisted_1$4 = {
  key: 0,
  class: "spinner-container"
};
const _hoisted_2$4 = { class: "spinner-inner" };
const _hoisted_3$3 = {
  key: 1,
  class: "mulah-history"
};
const _hoisted_4$3 = { class: "mulah-history__content-container" };
const _hoisted_5$3 = { class: "mulah-history__content" };
const _hoisted_6$2 = /* @__PURE__ */ createVNode("p", { class: "mulah-history__content-title" }, "Points Overview", -1);
const _hoisted_7$2 = { class: "mulah-history__content--grid" };
const _hoisted_8$2 = /* @__PURE__ */ createVNode("p", { class: "mulah-history__content-table-collect" }, "Collected", -1);
const _hoisted_9$2 = /* @__PURE__ */ createVNode("p", { class: "mulah-history__content-table-expire" }, "Expired", -1);
const _hoisted_10$2 = /* @__PURE__ */ createVNode("p", { class: "mulah-history__content-table-redeem" }, "Redeemed", -1);
const _hoisted_11$2 = { class: "\n              mulah-history__content-table-collect-main\n              mulah-history__content-table-collect\n            " };
const _hoisted_12$2 = { class: "\n              mulah-history__content-table-expire\n              mulah-history__content-table-expire-main\n            " };
const _hoisted_13$1 = { class: "\n              mulah-history__content-table-redeem\n              mulah-history__content-table-redeem-main\n            " };
const _hoisted_14$1 = { class: "mulah-history__content-container" };
const _hoisted_15$1 = { class: "mulah-history__content" };
const _hoisted_16$1 = /* @__PURE__ */ createVNode("p", { class: "mulah-history__collection" }, "Recent Activity", -1);
const _hoisted_17$1 = { class: "mulah-history__collection-table" };
const _hoisted_18$1 = /* @__PURE__ */ createVNode("tr", { class: "mulah-history__collection-table-title" }, [
  /* @__PURE__ */ createVNode("td", null, [
    /* @__PURE__ */ createVNode("p", null, "Date")
  ]),
  /* @__PURE__ */ createVNode("td", null, [
    /* @__PURE__ */ createVNode("p", null, "Points")
  ]),
  /* @__PURE__ */ createVNode("td", null, [
    /* @__PURE__ */ createVNode("p", null, "Action")
  ])
], -1);
const _hoisted_19$1 = { class: "mulah-history__collection-table-date" };
const _hoisted_20$1 = { class: "mulah-history__collection-table-date--italic" };
const _hoisted_21$1 = {
  key: 0,
  class: "mulah-history__expiry-status"
};
const _hoisted_22$1 = {
  key: 1,
  class: "mulah-history__expiry-status"
};
const _hoisted_23$1 = {
  key: 2,
  class: "mulah-history__expiry-status"
};
const _hoisted_24 = /* @__PURE__ */ createVNode("div", null, [
  /* @__PURE__ */ createVNode("h6", { class: "mulah-history__footer" }, [
    /* @__PURE__ */ createTextVNode(" Powered by "),
    /* @__PURE__ */ createVNode("a", { class: "mulah-link-blue" }, "MulahRewards.com")
  ])
], -1);
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Spinner = resolveComponent("Spinner");
  return $setup.fetching ? (openBlock(), createBlock("div", _hoisted_1$4, [
    createVNode("div", _hoisted_2$4, [
      createVNode(_component_Spinner)
    ])
  ])) : (openBlock(), createBlock("div", _hoisted_3$3, [
    createVNode("div", {
      class: "mulah-history__logo-container",
      style: `background: ${$setup.data.brand.logoBackground}`
    }, [
      createVNode("img", {
        class: "mulah-history__logo",
        src: $setup.data.brand.logoUrl
      }, null, 8, ["src"])
    ], 4),
    createVNode("div", _hoisted_4$3, [
      createVNode("div", _hoisted_5$3, [
        _hoisted_6$2,
        createVNode("div", _hoisted_7$2, [
          _hoisted_8$2,
          _hoisted_9$2,
          _hoisted_10$2,
          createVNode("p", _hoisted_11$2, toDisplayString($setup.data.customerHistory.brandCollectedPoints), 1),
          createVNode("p", _hoisted_12$2, toDisplayString($setup.data.customerHistory.expiredPoints), 1),
          createVNode("p", _hoisted_13$1, toDisplayString($setup.data.customerHistory.redemptionCosts), 1)
        ])
      ])
    ]),
    createVNode("div", _hoisted_14$1, [
      createVNode("div", _hoisted_15$1, [
        _hoisted_16$1,
        createVNode("table", _hoisted_17$1, [
          _hoisted_18$1,
          (openBlock(true), createBlock(Fragment, null, renderList($setup.data.customerHistory.collectionsAndDeductions.slice(
            0,
            3
          ), (x3) => {
            return openBlock(), createBlock("tr", {
              key: x3.specification + x3.createdAt,
              class: "mulah-history__collection-table-content"
            }, [
              createVNode("td", null, [
                createVNode("p", _hoisted_19$1, toDisplayString($setup.formatDate(x3.createdAt)), 1),
                createVNode("p", _hoisted_20$1, toDisplayString($setup.formatTime(x3.createdAt)), 1)
              ]),
              createVNode("td", null, [
                createVNode("p", null, toDisplayString(x3.amount), 1)
              ]),
              createVNode("td", null, [
                createVNode("div", null, [
                  createVNode("p", null, toDisplayString(x3.specification.charAt(0).toUpperCase() + x3.specification.slice(1)), 1),
                  x3.expiryDays == 1 ? (openBlock(), createBlock("p", _hoisted_21$1, " Expires in " + toDisplayString(x3.expiryDays) + " Day ", 1)) : x3.expiryDays > 0 ? (openBlock(), createBlock("p", _hoisted_22$1, " Expires in " + toDisplayString(x3.expiryDays) + " Days ", 1)) : x3.expiryDays != null && x3.expiryDays <= 0 ? (openBlock(), createBlock("p", _hoisted_23$1, " Expired ")) : createCommentVNode("", true)
                ])
              ])
            ]);
          }), 128))
        ]),
        createVNode("p", {
          class: "mulah-history-more-redirect",
          onClick: _cache[1] || (_cache[1] = ($event) => $props.changePath("history-more"))
        }, " See More ")
      ])
    ]),
    createVNode("button", {
      class: "mulah-history-back-button",
      onClick: _cache[2] || (_cache[2] = ($event) => $props.changePath("history", true))
    }, " Back "),
    _hoisted_24
  ]));
}
var BrandHistory = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
var BrandHistoryMore_vue_vue_type_style_index_0_lang = "";
const _sfc_main$4 = {
  name: "BrandHistory",
  setup() {
    const store2 = inject("store");
    const phoneNumber = getDbNumber(store2.state.phoneNumber);
    const result2 = useQuery({
      query: CUSTOMER_HISTORY_MORE,
      variables: {
        phoneNumber,
        brandId: store2.state.token
      }
    });
    function formatDate(dateString) {
      return formatDateStr(convertToLocal(dateString), "dd/MM/yyyy");
    }
    function formatTime(dateString) {
      return formatDateStr(convertToLocal(dateString), "hh:mm aa");
    }
    return {
      data: result2.data,
      fetching: result2.fetching,
      formatDate,
      formatTime
    };
  },
  props: {
    changePath: Function
  },
  components: {
    Spinner
  }
};
const _hoisted_1$3 = {
  key: 0,
  class: "spinner-container"
};
const _hoisted_2$3 = { class: "spinner-inner" };
const _hoisted_3$2 = {
  key: 1,
  class: "mulah-history-more"
};
const _hoisted_4$2 = /* @__PURE__ */ createVNode("p", { class: "mulah-history__more-title" }, "Points History", -1);
const _hoisted_5$2 = /* @__PURE__ */ createVNode("div", { class: "mulah-history__more-headers" }, [
  /* @__PURE__ */ createVNode("p", null, "Date"),
  /* @__PURE__ */ createVNode("p", null, "Points"),
  /* @__PURE__ */ createVNode("p", null, "Action")
], -1);
const _hoisted_6$1 = { style: { "font-size": "14px !important", "margin-bottom": "0 !important" } };
const _hoisted_7$1 = { style: { "margin-top": "0.5rem !important" } };
const _hoisted_8$1 = { style: { "margin": "auto !important" } };
const _hoisted_9$1 = {
  key: 0,
  class: "mulah-history__more-expiry-status"
};
const _hoisted_10$1 = {
  key: 1,
  class: "mulah-history__more-expiry-status"
};
const _hoisted_11$1 = {
  key: 2,
  class: "mulah-history__more-expiry-status"
};
const _hoisted_12$1 = /* @__PURE__ */ createVNode("div", null, [
  /* @__PURE__ */ createVNode("h6", { class: "mulah-history-more__footer" }, [
    /* @__PURE__ */ createTextVNode(" Powered by "),
    /* @__PURE__ */ createVNode("a", { class: "mulah-link-blue" }, "MulahRewards.com")
  ])
], -1);
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Spinner = resolveComponent("Spinner");
  return $setup.fetching ? (openBlock(), createBlock("div", _hoisted_1$3, [
    createVNode("div", _hoisted_2$3, [
      createVNode(_component_Spinner)
    ])
  ])) : (openBlock(), createBlock("div", _hoisted_3$2, [
    _hoisted_4$2,
    _hoisted_5$2,
    (openBlock(true), createBlock(Fragment, null, renderList($setup.data.customerHistory.collectionsAndDeductions, (x3) => {
      return openBlock(), createBlock("div", {
        class: "mulah-history__more-content",
        key: x3.specification + x3.createdAt
      }, [
        createVNode("div", null, [
          createVNode("p", _hoisted_6$1, toDisplayString($setup.formatDate(x3.createdAt)), 1),
          createVNode("p", _hoisted_7$1, [
            createVNode("em", null, toDisplayString($setup.formatTime(x3.createdAt)), 1)
          ])
        ]),
        createVNode("div", _hoisted_8$1, [
          createVNode("p", null, toDisplayString(x3.amount), 1)
        ]),
        createVNode("div", null, [
          createVNode("p", null, toDisplayString(x3.specification.charAt(0).toUpperCase() + x3.specification.slice(1)), 1),
          x3.expiryDays == 1 ? (openBlock(), createBlock("p", _hoisted_9$1, " Expires in " + toDisplayString(x3.expiryDays) + " Day ", 1)) : x3.expiryDays > 0 ? (openBlock(), createBlock("p", _hoisted_10$1, " Expires in " + toDisplayString(x3.expiryDays) + " Days ", 1)) : x3.expiryDays != null && x3.expiryDays <= 0 ? (openBlock(), createBlock("p", _hoisted_11$1, " Expired ")) : createCommentVNode("", true)
        ])
      ]);
    }), 128)),
    createVNode("button", {
      class: "mulah-history__more-back-button",
      onClick: _cache[1] || (_cache[1] = ($event) => $props.changePath("brand-history"))
    }, " Back "),
    _hoisted_12$1
  ]));
}
var BrandHistoryMore = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
var PersonalInfo_vue_vue_type_style_index_0_lang = "";
const _sfc_main$3 = {
  name: "personal-info",
  setup(props) {
    const store2 = inject("store");
    const customer = store2.state.customerInfo;
    const styling = store2.state.personalInfoStyle;
    const registeredOn = formatDateStr(
      convertToLocal(customer.createdAt),
      "dd/MM/yyyy"
    );
    const name = ref(customer.name);
    const email = ref(customer.email);
    const phoneNumber = customer.phoneNumber;
    const [date, month, year] = formatDateStr(
      convertToLocal(customer.birthdate),
      "dd/MM/yyyy"
    ).split("/");
    const error = ref(false);
    const success = ref(false);
    const loading = ref(false);
    const headerColor = { color: `${styling.header_color} !important` };
    const inputStyle = { "--color": `${styling.secondary_theme}` };
    const placeholderColor = {
      "--placeholder-color": `${styling.placeholder_color}`
    };
    const primaryTheme = { "--themeColor": `${styling.primary_theme}` };
    const secondaryTheme = { "--subTheme": `${styling.secondary_theme}` };
    const linkColor = { color: `${styling.link_color} !important` };
    const inputColor = { color: `${styling.input_color} !important` };
    const inputBackground = {
      background: `${styling.input_background} !important`
    };
    const buttonText = { color: `${styling.button_font} !important` };
    const buttonTheme = { "--buttonFont": styling.button_font };
    const modalPrimaryColor = styling.button_font;
    const modalSecondaryColor = styling.primary_theme;
    const div = document.getElementById("mulah-app");
    div.style.cssText += `background-color: ${styling.main_background} !important;`;
    document.body.style.setProperty("background", styling.main_background, "important");
    const validEmail = computed(() => {
      return email.value ? email.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) != null : true;
    });
    const validName = computed(() => {
      return name.value ? name.value != null : false;
    });
    function showWarningName() {
      return validName.value ? false : true;
    }
    function showWarning() {
      return validEmail.value ? false : true;
    }
    function closeModal() {
      error.value = false;
    }
    function continueModal() {
      window.location.reload();
    }
    const { executeMutation: updateCustomerNameAndEmail } = useMutation(
      UPDATE_CUSTOMER_NAME_AND_EMAIL
    );
    function update() {
      if (loading.value)
        return;
      loading.value = true;
      let valid = name.value && validEmail.value;
      if (valid) {
        const args = {
          customerId: customer.id,
          name: name.value,
          email: email.value ? email.value : ""
        };
        updateCustomerNameAndEmail(args).then((result2) => {
          console.log(result2);
          success.value = true;
        }).catch((error2) => {
          console.log(error2);
        });
      } else {
        loading.value = false;
        error.value = true;
      }
    }
    return {
      date,
      month,
      year,
      registeredOn,
      name,
      phoneNumber,
      email,
      error,
      success,
      validEmail,
      closeModal,
      continueModal,
      showWarning,
      update,
      headerColor,
      inputStyle,
      inputColor,
      inputBackground,
      placeholderColor,
      primaryTheme,
      secondaryTheme,
      modalSecondaryColor,
      modalPrimaryColor,
      linkColor,
      buttonText,
      buttonTheme,
      modalPrimaryColor,
      modalSecondaryColor,
      showWarningName
    };
  },
  components: {
    ErrorModal,
    SuccessModal
  }
};
const _hoisted_1$2 = { class: "mulah-personal-info" };
const _hoisted_2$2 = { class: "mulah-personal-info-content" };
const _hoisted_3$1 = { class: "mulah-personal-info__header" };
const _hoisted_4$1 = { class: "mulah-personal-info__input" };
const _hoisted_5$1 = { class: "mulah-personal-info__input__container" };
const _hoisted_6 = {
  key: 0,
  class: "mulah-personal-info__validation"
};
const _hoisted_7 = /* @__PURE__ */ createVNode("p", null, "*Please insert a name.", -1);
const _hoisted_8 = { class: "mulah-personal-info__input__container" };
const _hoisted_9 = { class: "mulah-personal-info__input__container" };
const _hoisted_10 = { class: "mulah-personal-info__input__bday" };
const _hoisted_11 = { class: "mulah-personal-info-day-container" };
const _hoisted_12 = { class: "mulah-personal-info-month-container" };
const _hoisted_13 = { class: "mulah-personal-info-year-container" };
const _hoisted_14 = { class: "mulah-personal-info__input__container" };
const _hoisted_15 = {
  key: 0,
  class: "mulah-personal-info__validation"
};
const _hoisted_16 = /* @__PURE__ */ createVNode("p", null, "*Please insert a valid email address.", -1);
const _hoisted_17 = { class: "mulah-personal-info__input__container" };
const _hoisted_18 = { class: "mulah-personal-info__registered" };
const _hoisted_19 = /* @__PURE__ */ createTextVNode(" * Registered on ");
const _hoisted_20 = { class: "mulah-personal-info__button" };
const _hoisted_21 = { class: "mulah-personal-info__footer" };
const _hoisted_22 = /* @__PURE__ */ createVNode("hr", null, null, -1);
const _hoisted_23 = /* @__PURE__ */ createTextVNode(" Powered by ");
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ErrorModal = resolveComponent("ErrorModal");
  const _component_SuccessModal = resolveComponent("SuccessModal");
  return openBlock(), createBlock("div", _hoisted_1$2, [
    createVNode("div", _hoisted_2$2, [
      createVNode("div", _hoisted_3$1, [
        createVNode("p", { style: $setup.headerColor }, "Customer Info", 4)
      ]),
      createVNode("div", _hoisted_4$1, [
        createVNode("div", _hoisted_5$1, [
          createVNode("p", { style: $setup.headerColor }, "Name", 4),
          withDirectives(createVNode("input", {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.name = $event),
            type: "text",
            placeholder: "Enter Name",
            style: {
              ...$setup.inputColor,
              ...$setup.inputBackground,
              ...$setup.inputStyle,
              ...$setup.placeholderColor
            }
          }, null, 4), [
            [vModelText, $setup.name]
          ]),
          $setup.showWarningName() ? (openBlock(), createBlock("div", _hoisted_6, [
            _hoisted_7
          ])) : createCommentVNode("", true)
        ]),
        createVNode("div", _hoisted_8, [
          createVNode("p", { style: $setup.headerColor }, "Phone Number", 4),
          withDirectives(createVNode("input", {
            style: {
              ...$setup.inputColor,
              ...$setup.inputStyle,
              ...$setup.placeholderColor
            },
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.phoneNumber = $event),
            type: "text",
            disabled: ""
          }, null, 4), [
            [vModelText, $setup.phoneNumber]
          ])
        ]),
        createVNode("div", _hoisted_9, [
          createVNode("p", { style: $setup.headerColor }, "Birthday", 4),
          createVNode("div", _hoisted_10, [
            createVNode("div", _hoisted_11, [
              withDirectives(createVNode("input", {
                style: {
                  ...$setup.inputColor,
                  ...$setup.inputStyle,
                  ...$setup.placeholderColor
                },
                disabled: "",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.date = $event)
              }, null, 4), [
                [vModelText, $setup.date]
              ])
            ]),
            createVNode("div", _hoisted_12, [
              withDirectives(createVNode("input", {
                style: {
                  ...$setup.inputColor,
                  ...$setup.inputStyle,
                  ...$setup.placeholderColor
                },
                disabled: "",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.month = $event)
              }, null, 4), [
                [vModelText, $setup.month]
              ])
            ]),
            createVNode("div", _hoisted_13, [
              withDirectives(createVNode("input", {
                style: {
                  ...$setup.inputColor,
                  ...$setup.inputStyle,
                  ...$setup.placeholderColor
                },
                disabled: "",
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.year = $event)
              }, null, 4), [
                [vModelText, $setup.year]
              ])
            ])
          ])
        ]),
        createVNode("div", _hoisted_14, [
          createVNode("p", { style: $setup.headerColor }, "Email", 4),
          withDirectives(createVNode("input", {
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.email = $event),
            type: "email",
            placeholder: "Enter Email Address",
            class: "mulah-personal-info__input-email",
            style: {
              ...$setup.inputColor,
              ...$setup.inputBackground,
              ...$setup.inputStyle,
              ...$setup.placeholderColor
            }
          }, null, 4), [
            [vModelText, $setup.email]
          ]),
          $setup.showWarning() ? (openBlock(), createBlock("div", _hoisted_15, [
            _hoisted_16
          ])) : createCommentVNode("", true)
        ]),
        createVNode("div", _hoisted_17, [
          createVNode("div", _hoisted_18, [
            createVNode("p", { style: $setup.headerColor }, [
              _hoisted_19,
              createVNode("span", {
                class: "mulah-personal-info__registered__date",
                style: { ...$setup.primaryTheme }
              }, toDisplayString($setup.registeredOn), 5)
            ], 4)
          ])
        ])
      ]),
      createVNode("div", _hoisted_20, [
        createVNode("button", {
          onClick: _cache[7] || (_cache[7] = (...args) => $setup.update && $setup.update(...args)),
          style: { ...$setup.primaryTheme, ...$setup.buttonText }
        }, " Update ", 4)
      ])
    ]),
    createVNode("div", _hoisted_21, [
      _hoisted_22,
      createVNode("h6", { style: $setup.headerColor }, [
        _hoisted_23,
        createVNode("a", {
          class: "mulah-link-blue",
          style: { ...$setup.linkColor }
        }, "MulahRewards.com", 4)
      ], 4)
    ]),
    $setup.error ? (openBlock(), createBlock(_component_ErrorModal, {
      key: 0,
      "close-modal": $setup.closeModal,
      specification: "registration",
      modalPrimaryColor: $setup.modalPrimaryColor,
      modalSecondaryColor: $setup.modalSecondaryColor
    }, null, 8, ["close-modal", "modalPrimaryColor", "modalSecondaryColor"])) : createCommentVNode("", true),
    $setup.success ? (openBlock(), createBlock(_component_SuccessModal, {
      key: 1,
      "close-modal": $setup.continueModal,
      specification: "personal-info",
      modalPrimaryColor: $setup.modalPrimaryColor,
      modalSecondaryColor: $setup.modalSecondaryColor
    }, null, 8, ["close-modal", "modalPrimaryColor", "modalSecondaryColor"])) : createCommentVNode("", true)
  ]);
}
var PersonalInfo = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
var Tnc_vue_vue_type_style_index_0_lang = "";
const _sfc_main$2 = {
  name: "Tnc",
  props: {
    changePath: Function
  },
  setup() {
    const headerColor = ref(null);
    const textColor = ref(null);
    const buttonStyle = ref(null);
    const result2 = useQuery({
      query: TERMS_AND_CONDITIONS,
      variables: {
        id: store.state.token
      }
    });
    watch(result2.fetching, (fetchStatus) => {
      if (!fetchStatus) {
        const styling = JSON.parse(result2.data.value.brand.tncStyle);
        const div = document.getElementById("mulah-app");
        div.style.cssText += `background-color: ${styling.main_background} !important;`;
        document.body.style.setProperty("background", styling.main_background, "important");
        headerColor.value = { "--header-color": `${styling.header_color}` };
        textColor.value = { "--text-color": `${styling.text_color}` };
        buttonStyle.value = {
          "color": `${styling.button_font_color} !important`,
          "background": `${styling.button_background_color} !important`
        };
      }
    });
    return {
      data: result2.data,
      fetching: result2.fetching,
      headerColor,
      textColor,
      buttonStyle
    };
  },
  methods: {
    toHistory() {
      this.changePath("history");
    }
  }
};
const _hoisted_1$1 = { key: 0 };
const _hoisted_2$1 = {
  key: 1,
  class: "mulah-tnc"
};
const _hoisted_3 = { class: "mulah-tnc__content" };
const _hoisted_4 = { class: "mulah-tnc__button__container" };
const _hoisted_5 = /* @__PURE__ */ createVNode("div", { class: "mulah-tnc__footer" }, [
  /* @__PURE__ */ createVNode("hr"),
  /* @__PURE__ */ createVNode("h6", null, [
    /* @__PURE__ */ createTextVNode("Powered by "),
    /* @__PURE__ */ createVNode("a", { class: "mulah-link-blue" }, "MulahRewards.com")
  ])
], -1);
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return $setup.fetching ? (openBlock(), createBlock("p", _hoisted_1$1, "Loading..")) : (openBlock(), createBlock("div", _hoisted_2$1, [
    createVNode("div", _hoisted_3, [
      createVNode("div", {
        class: "mulah-tnc__details",
        innerHTML: $setup.data.brand.termsAndConditions,
        style: {
          ...$setup.headerColor,
          ...$setup.textColor
        }
      }, null, 12, ["innerHTML"]),
      createVNode("div", _hoisted_4, [
        createVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => $options.toHistory && $options.toHistory(...args)),
          style: $setup.buttonStyle
        }, "Back", 4)
      ]),
      _hoisted_5
    ])
  ]));
}
var Tnc = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const DB_NAME = "phoneNumberDb";
const DB_VERSION = 1;
let DB;
const cookieDb = {
  async getDb() {
    return new Promoise((resolve2, reject) => {
      resolve2("Cookie DB");
    });
  },
  async deletePhoneNumber(phoneNumber) {
    return new Promise((resolve2) => {
      document.cookie = "phoneNumberMulah=";
    });
  },
  async getPhoneNumbers() {
    return new Promise((resolve2) => {
      if (document.cookie == "") {
        resolve2([]);
      } else if (!document.cookie.split("; ").find((row) => row.startsWith("phoneNumberMulah="))) {
        resolve2([]);
      } else {
        resolve2([
          document.cookie.split("; ").find((row) => row.startsWith("phoneNumberMulah=")).split("=")[1]
        ]);
      }
    });
  },
  async savePhoneNumber(phoneNumber) {
    return new Promise((resolve2) => {
      document.cookie = "phoneNumberMulah=" + phoneNumber;
      resolve2();
    });
  }
};
const indexDb = {
  async getDb() {
    return new Promise((resolve2, reject) => {
      console.log("OPENING DB", DB);
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = (e3) => {
        console.log("Error opening db", e3);
        reject("Error");
      };
      request.onsuccess = (e3) => {
        DB = e3.target.result;
        resolve2(DB);
      };
      request.onupgradeneeded = (e3) => {
        console.log("onupgradeneeded");
        let db = e3.target.result;
        db.createObjectStore("phoneNumbers", {
          autoIncrement: true,
          keyPath: "id"
        });
      };
    });
  },
  async deletePhoneNumber(phoneNumber) {
    let db = await this.getDb();
    return new Promise((resolve2) => {
      let trans = db.transaction(["phoneNumbers"], "readwrite");
      trans.oncomplete = () => {
        resolve2();
      };
      trans.objectStore("phoneNumbers").delete(phoneNumber.id);
    });
  },
  async getPhoneNumbers() {
    let db = await this.getDb();
    return new Promise((resolve2) => {
      let trans = db.transaction(["phoneNumbers"], "readonly");
      let phoneNumbers = [];
      trans.oncomplete = () => resolve2(phoneNumbers);
      trans.objectStore("phoneNumbers").openCursor().onsuccess = (e3) => {
        let cursor = e3.target.result;
        if (cursor) {
          phoneNumbers.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },
  async savePhoneNumber(phoneNumber) {
    let db = await this.getDb();
    return new Promise((resolve2) => {
      let trans = db.transaction(["phoneNumbers"], "readwrite");
      trans.oncomplete = () => resolve2();
      trans.objectStore("phoneNumbers").put({ phoneNumber });
    });
  }
};
const _sfc_main$1 = {
  setup() {
    const path = ref("home");
    const store2 = inject("store");
    path.value == "home" || path.value == "phone-verification";
    const loading = ref(true);
    const toOverviewPoints = ref(false);
    const cookie2 = function(key) {
      var cookies = document.cookie.split("; ");
      for (var i3 = 0; i3 < cookies.length; i3++) {
        var part = cookies[i3].split("=");
        if (part && part[0] === key)
          return unescape(part[1]);
      }
    };
    async function getPhoneNumber(givenPath) {
      if (store2.state.phoneNumber == null) {
        if (cookie2("phoneNumberMulah")) {
          store2.addPhoneNumber(cookie2("phoneNumberMulah"));
          path.value = "history";
        } else {
          let db;
          await indexDb.getPhoneNumbers().then(() => {
            db = indexDb;
          }).catch((e3) => {
            db = cookieDb;
          });
          store2.addDb(db);
          const phoneNumber = await db.getPhoneNumbers();
          if (phoneNumber.length > 0) {
            store2.addPhoneNumber(phoneNumber[0].phoneNumber);
            path.value = "history";
          } else {
            path.value = "home";
          }
        }
        loading.value = false;
      } else {
        path.value = givenPath;
        loading.value = false;
      }
    }
    onMounted(() => {
      getPhoneNumber("history");
    });
    watch(path, (newPath) => getPhoneNumber(newPath));
    const changePath = (newPath, value) => {
      if (value) {
        toOverviewPoints.value = true;
      }
      path.value = newPath;
    };
    return {
      path,
      changePath,
      loading,
      toOverviewPoints
    };
  },
  components: {
    Home: Home$1,
    PhoneVerification,
    Registration,
    PersonalInfo,
    BrandOverview,
    Tnc,
    BrandHistory,
    BrandHistoryMore,
    Spinner
  }
};
const _hoisted_1 = {
  key: 0,
  class: "spinner-container"
};
const _hoisted_2 = { class: "spinner-inner" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Spinner = resolveComponent("Spinner");
  const _component_Home = resolveComponent("Home");
  const _component_PhoneVerification = resolveComponent("PhoneVerification");
  const _component_Registration = resolveComponent("Registration");
  const _component_PersonalInfo = resolveComponent("PersonalInfo");
  const _component_BrandOverview = resolveComponent("BrandOverview");
  const _component_Tnc = resolveComponent("Tnc");
  const _component_BrandHistory = resolveComponent("BrandHistory");
  const _component_BrandHistoryMore = resolveComponent("BrandHistoryMore");
  return $setup.loading ? (openBlock(), createBlock("div", _hoisted_1, [
    createVNode("div", _hoisted_2, [
      createVNode(_component_Spinner)
    ])
  ])) : $setup.path == "home" ? (openBlock(), createBlock(_component_Home, {
    key: 1,
    changePath: $setup.changePath
  }, null, 8, ["changePath"])) : $setup.path == "phone-verification" ? (openBlock(), createBlock(_component_PhoneVerification, {
    key: 2,
    changePath: $setup.changePath
  }, null, 8, ["changePath"])) : $setup.path == "registration" ? (openBlock(), createBlock(_component_Registration, {
    key: 3,
    changePath: $setup.changePath
  }, null, 8, ["changePath"])) : $setup.path == "personal_info" ? (openBlock(), createBlock(_component_PersonalInfo, { key: 4 })) : $setup.path == "history" ? (openBlock(), createBlock(_component_BrandOverview, {
    key: 5,
    changePath: $setup.changePath,
    toOverviewPoints: $setup.toOverviewPoints
  }, null, 8, ["changePath", "toOverviewPoints"])) : $setup.path == "tnc" ? (openBlock(), createBlock(_component_Tnc, {
    key: 6,
    changePath: $setup.changePath
  }, null, 8, ["changePath"])) : $setup.path == "brand-history" ? (openBlock(), createBlock(_component_BrandHistory, {
    key: 7,
    changePath: $setup.changePath
  }, null, 8, ["changePath"])) : $setup.path == "history-more" ? (openBlock(), createBlock(_component_BrandHistoryMore, {
    key: 8,
    changePath: $setup.changePath
  }, null, 8, ["changePath"])) : createCommentVNode("", true);
}
var Wrapper = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
var App_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  setup() {
    provideClient(client);
  },
  provide() {
    return {
      store
    };
  },
  name: "App",
  components: {
    Wrapper
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Wrapper = resolveComponent("Wrapper");
  return openBlock(), createBlock(_component_Wrapper);
}
var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const start = (token) => {
  store.addToken(token);
  createApp(App).mount("#mulah-app");
};
export { start };
