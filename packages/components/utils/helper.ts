export const queryInstanceType = (source: any) =>
  Object.prototype.toString.call(source).slice(8, -1);

export const deepCopy = (source: any) => {
  const map = new Map();
  function process(source) {
    const instanceType = queryInstanceType(source);
    if (typeof source !== "object") return source;
    if (["Function", "RegExp"]) return source;
    const aim = instanceType === "Object" ? {} : [];
    map.set(source, aim);
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const cacheV = map.get(source[key]);
        if (cacheV) {
          aim[key] = cacheV;
        } else {
          aim[key] = process(source[key]);
        }
      }
    }
    return aim;
  }
  return process(source);
};
