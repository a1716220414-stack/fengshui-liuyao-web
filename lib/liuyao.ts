export type CoinSide = "heads" | "tails";
export type YinYang = "yang" | "yin";

export type LiuYaoLine = {
  position: number;
  coins: CoinSide[];
  sum: number;
  yinYang: YinYang;
  changing: boolean;
  lineName: string;
  lineNameZh: string;
  symbol: string;
};

export type Trigram = {
  key: string;
  name: string;
  nameZh: string;
  symbol: string;
  image: string;
};

export type HexagramInfo = {
  number: number;
  name: string;
  nameZh: string;
  upper: Trigram;
  lower: Trigram;
};

export type LiuYaoHexagramResult = {
  primary: HexagramInfo;
  changed: HexagramInfo;
  changingPositions: number[];
  hasChangingLines: boolean;
};

const trigramsByKey: Record<string, Trigram> = {
  "111": {
    key: "111",
    name: "Qian",
    nameZh: "乾",
    symbol: "☰",
    image: "Heaven / 天",
  },
  "110": {
    key: "110",
    name: "Dui",
    nameZh: "兑",
    symbol: "☱",
    image: "Lake / 泽",
  },
  "101": {
    key: "101",
    name: "Li",
    nameZh: "离",
    symbol: "☲",
    image: "Fire / 火",
  },
  "100": {
    key: "100",
    name: "Zhen",
    nameZh: "震",
    symbol: "☳",
    image: "Thunder / 雷",
  },
  "011": {
    key: "011",
    name: "Xun",
    nameZh: "巽",
    symbol: "☴",
    image: "Wind / 风",
  },
  "010": {
    key: "010",
    name: "Kan",
    nameZh: "坎",
    symbol: "☵",
    image: "Water / 水",
  },
  "001": {
    key: "001",
    name: "Gen",
    nameZh: "艮",
    symbol: "☶",
    image: "Mountain / 山",
  },
  "000": {
    key: "000",
    name: "Kun",
    nameZh: "坤",
    symbol: "☷",
    image: "Earth / 地",
  },
};

const hexagramTable: Record<
  string,
  Record<string, { number: number; name: string; nameZh: string }>
> = {
  Qian: {
    Qian: { number: 1, name: "The Creative", nameZh: "乾为天" },
    Dui: { number: 10, name: "Treading", nameZh: "天泽履" },
    Li: { number: 13, name: "Fellowship", nameZh: "天火同人" },
    Zhen: { number: 25, name: "Innocence", nameZh: "天雷无妄" },
    Xun: { number: 44, name: "Coming to Meet", nameZh: "天风姤" },
    Kan: { number: 6, name: "Conflict", nameZh: "天水讼" },
    Gen: { number: 33, name: "Retreat", nameZh: "天山遯" },
    Kun: { number: 12, name: "Standstill", nameZh: "天地否" },
  },
  Dui: {
    Qian: { number: 43, name: "Breakthrough", nameZh: "泽天夬" },
    Dui: { number: 58, name: "Joy", nameZh: "兑为泽" },
    Li: { number: 49, name: "Revolution", nameZh: "泽火革" },
    Zhen: { number: 17, name: "Following", nameZh: "泽雷随" },
    Xun: { number: 28, name: "Great Exceeding", nameZh: "泽风大过" },
    Kan: { number: 47, name: "Oppression", nameZh: "泽水困" },
    Gen: { number: 31, name: "Influence", nameZh: "泽山咸" },
    Kun: { number: 45, name: "Gathering Together", nameZh: "泽地萃" },
  },
  Li: {
    Qian: { number: 14, name: "Great Possession", nameZh: "火天大有" },
    Dui: { number: 38, name: "Opposition", nameZh: "火泽睽" },
    Li: { number: 30, name: "The Clinging", nameZh: "离为火" },
    Zhen: { number: 21, name: "Biting Through", nameZh: "火雷噬嗑" },
    Xun: { number: 50, name: "The Cauldron", nameZh: "火风鼎" },
    Kan: { number: 64, name: "Before Completion", nameZh: "火水未济" },
    Gen: { number: 56, name: "The Wanderer", nameZh: "火山旅" },
    Kun: { number: 35, name: "Progress", nameZh: "火地晋" },
  },
  Zhen: {
    Qian: { number: 34, name: "Great Power", nameZh: "雷天大壮" },
    Dui: { number: 54, name: "Marrying Maiden", nameZh: "雷泽归妹" },
    Li: { number: 55, name: "Abundance", nameZh: "雷火丰" },
    Zhen: { number: 51, name: "The Arousing", nameZh: "震为雷" },
    Xun: { number: 32, name: "Duration", nameZh: "雷风恒" },
    Kan: { number: 40, name: "Deliverance", nameZh: "雷水解" },
    Gen: { number: 62, name: "Small Exceeding", nameZh: "雷山小过" },
    Kun: { number: 16, name: "Enthusiasm", nameZh: "雷地豫" },
  },
  Xun: {
    Qian: { number: 9, name: "Small Taming", nameZh: "风天小畜" },
    Dui: { number: 61, name: "Inner Truth", nameZh: "风泽中孚" },
    Li: { number: 37, name: "The Family", nameZh: "风火家人" },
    Zhen: { number: 42, name: "Increase", nameZh: "风雷益" },
    Xun: { number: 57, name: "The Gentle", nameZh: "巽为风" },
    Kan: { number: 59, name: "Dispersion", nameZh: "风水涣" },
    Gen: { number: 53, name: "Development", nameZh: "风山渐" },
    Kun: { number: 20, name: "Contemplation", nameZh: "风地观" },
  },
  Kan: {
    Qian: { number: 5, name: "Waiting", nameZh: "水天需" },
    Dui: { number: 60, name: "Limitation", nameZh: "水泽节" },
    Li: { number: 63, name: "After Completion", nameZh: "水火既济" },
    Zhen: { number: 3, name: "Difficulty at the Beginning", nameZh: "水雷屯" },
    Xun: { number: 48, name: "The Well", nameZh: "水风井" },
    Kan: { number: 29, name: "The Abysmal", nameZh: "坎为水" },
    Gen: { number: 39, name: "Obstruction", nameZh: "水山蹇" },
    Kun: { number: 8, name: "Holding Together", nameZh: "水地比" },
  },
  Gen: {
    Qian: { number: 26, name: "Great Taming", nameZh: "山天大畜" },
    Dui: { number: 41, name: "Decrease", nameZh: "山泽损" },
    Li: { number: 22, name: "Grace", nameZh: "山火贲" },
    Zhen: { number: 27, name: "Nourishment", nameZh: "山雷颐" },
    Xun: { number: 18, name: "Work on the Decayed", nameZh: "山风蛊" },
    Kan: { number: 4, name: "Youthful Folly", nameZh: "山水蒙" },
    Gen: { number: 52, name: "Keeping Still", nameZh: "艮为山" },
    Kun: { number: 23, name: "Splitting Apart", nameZh: "山地剥" },
  },
  Kun: {
    Qian: { number: 11, name: "Peace", nameZh: "地天泰" },
    Dui: { number: 19, name: "Approach", nameZh: "地泽临" },
    Li: { number: 36, name: "Darkening of the Light", nameZh: "地火明夷" },
    Zhen: { number: 24, name: "Return", nameZh: "地雷复" },
    Xun: { number: 46, name: "Pushing Upward", nameZh: "地风升" },
    Kan: { number: 7, name: "The Army", nameZh: "地水师" },
    Gen: { number: 15, name: "Modesty", nameZh: "地山谦" },
    Kun: { number: 2, name: "The Receptive", nameZh: "坤为地" },
  },
};

function randomCoin(): CoinSide {
  return Math.random() < 0.5 ? "heads" : "tails";
}

function coinValue(coin: CoinSide) {
  return coin === "heads" ? 3 : 2;
}

export function castLine(position: number): LiuYaoLine {
  const coins: CoinSide[] = [randomCoin(), randomCoin(), randomCoin()];
  const sum = coins.reduce((total, coin) => total + coinValue(coin), 0);

  if (sum === 6) {
    return {
      position,
      coins,
      sum,
      yinYang: "yin",
      changing: true,
      lineName: "Old Yin",
      lineNameZh: "老阴",
      symbol: "⚋",
    };
  }

  if (sum === 7) {
    return {
      position,
      coins,
      sum,
      yinYang: "yang",
      changing: false,
      lineName: "Young Yang",
      lineNameZh: "少阳",
      symbol: "⚊",
    };
  }

  if (sum === 8) {
    return {
      position,
      coins,
      sum,
      yinYang: "yin",
      changing: false,
      lineName: "Young Yin",
      lineNameZh: "少阴",
      symbol: "⚋",
    };
  }

  return {
    position,
    coins,
    sum,
    yinYang: "yang",
    changing: true,
    lineName: "Old Yang",
    lineNameZh: "老阳",
    symbol: "⚊",
  };
}

function lineToBit(line: LiuYaoLine, changed: boolean) {
  let yinYang = line.yinYang;

  if (changed && line.changing) {
    yinYang = yinYang === "yang" ? "yin" : "yang";
  }

  return yinYang === "yang" ? "1" : "0";
}

function buildOneHexagram(lines: LiuYaoLine[], changed: boolean): HexagramInfo {
  const lowerKey = lines
    .slice(0, 3)
    .map((line) => lineToBit(line, changed))
    .join("");

  const upperKey = lines
    .slice(3, 6)
    .map((line) => lineToBit(line, changed))
    .join("");

  const lower = trigramsByKey[lowerKey];
  const upper = trigramsByKey[upperKey];

  const hexagram = hexagramTable[upper.name][lower.name];

  return {
    ...hexagram,
    upper,
    lower,
  };
}

export function buildHexagramResult(
  lines: LiuYaoLine[],
): LiuYaoHexagramResult | null {
  if (lines.length !== 6) {
    return null;
  }

  const changingPositions = lines
    .filter((line) => line.changing)
    .map((line) => line.position);

  return {
    primary: buildOneHexagram(lines, false),
    changed: buildOneHexagram(lines, true),
    changingPositions,
    hasChangingLines: changingPositions.length > 0,
  };
}

export function getLinePositionName(position: number) {
  const names: Record<number, string> = {
    1: "初爻",
    2: "二爻",
    3: "三爻",
    4: "四爻",
    5: "五爻",
    6: "上爻",
  };

  return names[position] ?? `第${position}爻`;
}

export function getCoinLabel(coin: CoinSide) {
  return coin === "heads" ? "Head / 正" : "Tail / 背";
}