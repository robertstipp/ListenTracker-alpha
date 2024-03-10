export const fmtTime = (seconds : number) : string => {
  let min : number | string = Math.floor(seconds / 60);
  let sec : number | string = Math.floor(seconds % 60);
  min = min.toString().padStart(2, "0");
  sec = sec.toString().padStart(2, "0");
  return `${min}:${sec}`;
};

export const fmtPct = (number : number | string) : string => {
  return (Number(number) * 100).toFixed(2).toString() + "%"
}

export const map = (number: number, min1: number, max1: number, min2: number, max2: number ) => {
  return min2 + ((number - min1) * (max2 - min2)) / (max1 - min1); 
}