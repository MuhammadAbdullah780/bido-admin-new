/**
 * @desc This func is made to convert string to object like react hook form e.g "user.name" ----> user: { name }
 * @param value
 * @param obj
 * @returns
 */
export const stringToObjectNotation = (
  value: string,
  obj: { [x: string]: any }
): any => {
  let finalVal: { [x: string]: any | string | boolean } = {};
  value?.split(".")?.forEach((item) => {
    if (Object.keys(finalVal || {}).length < 1) {
      finalVal = obj?.[item];
    } else {
      finalVal = finalVal?.[item];
    }
  });

  return finalVal;
};
