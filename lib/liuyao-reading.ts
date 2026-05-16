import { LiuYaoLine, getLinePositionName } from "@/lib/liuyao";

type LiuYaoReadingInput = {
  question: string;
  questionType: string;
  seekerGender?: string;
  castTimeLocal?: string;
  timezone?: string;
  primaryHexagram: {
    number: number;
    name: string;
    nameZh: string;
  };
  changedHexagram: {
    number: number;
    name: string;
    nameZh: string;
  };
  hasChangingLines: boolean;
  changingPositions: number[];
  lines: LiuYaoLine[];
};

type ReadingSection = {
  title: string;
  zhTitle: string;
  content: string;
  zhContent: string;
};

export type LiuYaoBasicReading = {
  headline: string;
  zhHeadline: string;
  summary: string;
  zhSummary: string;
  sections: ReadingSection[];
  deeperReadingFocus: string[];
  zhDeeperReadingFocus: string[];
};

function getQuestionTypeText(questionType: string) {
  const map: Record<string, { en: string; zh: string }> = {
    career: { en: "career, work, or professional direction", zh: "事业、工作或职业方向" },
    relationship: { en: "relationship, emotion, or interpersonal response", zh: "感情、情绪或人际回应" },
    wealth: { en: "wealth, resources, or financial movement", zh: "财务、资源或资金流动" },
    health: { en: "health, rest, or physical condition", zh: "健康、休息或身体状态" },
    decision: { en: "decision, timing, or choice", zh: "选择、时机或决策" },
    custom: { en: "a personal question", zh: "个人具体问题" },
  };

  return map[questionType] ?? map.custom;
}

function getMovingLineInterpretation(changingCount: number) {
  if (changingCount === 0) {
    return {
      en: "No changing line appears. The matter is better read from the primary hexagram as a present-state pattern. The free reading should be conservative and avoid forcing a strong future prediction.",
      zh: "此卦无动爻，宜重看本卦所示的当前状态。免费解读应偏谨慎，不宜强行推出确定性未来结论。",
    };
  }

  if (changingCount === 1) {
    return {
      en: "One changing line appears. This usually gives the reading a clear pivot. The deeper interpretation should place strong attention on this single moving point.",
      zh: "一爻发动，往往表示事情有一个较明确的关键转折点。深度解卦应把重点放在这一处动爻上。",
    };
  }

  if (changingCount <= 3) {
    return {
      en: "Several changing lines appear. The matter is already moving, but the structure is still readable through the relationship between the primary hexagram, changing lines, and changed hexagram.",
      zh: "数爻发动，说明事情已在变化之中，但仍可通过本卦、动爻和变卦之间的关系判断趋势。",
    };
  }

  return {
    en: "Many changing lines appear. The matter may be unstable, multi-causal, or emotionally noisy. A deeper reading should first simplify the question and identify the main line of concern.",
    zh: "动爻较多，表示事情可能变数较大、因素复杂或情绪干扰较重。深度解卦前应先收束问题，找出真正的主线。",
  };
}

function getLineDistribution(lines: LiuYaoLine[]) {
  const lowerChanging = lines.filter(
    (line) => line.changing && line.position <= 3,
  ).length;

  const upperChanging = lines.filter(
    (line) => line.changing && line.position >= 4,
  ).length;

  if (lowerChanging > upperChanging) {
    return {
      en: "The movement is stronger in the lower trigram. This points more toward foundation, inner conditions, preparation, early-stage development, or the user’s own side of the matter.",
      zh: "动象偏在下卦，较多指向基础条件、内部状态、前期准备、事情初段，或问事人自身一侧。",
    };
  }

  if (upperChanging > lowerChanging) {
    return {
      en: "The movement is stronger in the upper trigram. This points more toward outer response, visible results, later-stage pressure, external environment, or the other side of the matter.",
      zh: "动象偏在上卦，较多指向外部回应、显性结果、后期压力、外部环境，或对方一侧。",
    };
  }

  if (lowerChanging === 0 && upperChanging === 0) {
    return {
      en: "Because there are no changing lines, the reading should first observe the stable structure of the primary hexagram rather than rush into transformation analysis.",
      zh: "因无动爻，宜先观察本卦的稳定结构，不必急于从变卦角度解释。",
    };
  }

  return {
    en: "Changing lines are relatively balanced between upper and lower trigrams. Both internal conditions and external development should be considered together.",
    zh: "动爻在上下卦之间较均衡，说明内部条件与外部发展都需要同时考虑。",
  };
}

function getQuestionAdvice(questionType: string) {
  if (questionType === "career") {
    return {
      en: "For career questions, the reading should focus on position, timing, external opportunity, pressure, support, and whether the current path is advancing or blocked.",
      zh: "事业问题应重点看自身位置、时机、外部机会、压力、助力，以及当前路径是推进还是受阻。",
    };
  }

  if (questionType === "relationship") {
    return {
      en: "For relationship questions, the reading should focus on emotional movement, response from the other side, communication pattern, distance, and whether the matter is warming, cooling, or stuck.",
      zh: "感情问题应重点看情绪流动、对方回应、沟通模式、距离变化，以及关系是升温、降温还是停滞。",
    };
  }

  if (questionType === "wealth") {
    return {
      en: "For wealth questions, the reading should focus on source of resources, risk, timing, movement of money, effort-return balance, and whether the matter should be advanced slowly or quickly.",
      zh: "财务问题应重点看资源来源、风险、时机、资金流动、投入回报，以及事情适合缓进还是快进。",
    };
  }

  if (questionType === "health") {
    return {
      en: "For health questions, this reading should only be treated as reflective and cultural guidance. It must not replace medical diagnosis, treatment, or professional health advice.",
      zh: "健康问题只能作为文化体验和自我反思参考，不能替代医疗诊断、治疗或专业健康建议。",
    };
  }

  if (questionType === "decision") {
    return {
      en: "For decision questions, the reading should compare stability, risk, timing, pressure, and whether the situation is better suited to advance, wait, negotiate, or withdraw.",
      zh: "选择决策问题应比较稳定性、风险、时机、压力，并判断适合推进、等待、协商还是暂退。",
    };
  }

  return {
    en: "For a custom question, the first step is to clarify the real question behind the words: what the user wants, what is uncertain, and what decision must be made.",
    zh: "自定义问题首先要澄清文字背后的真正问题：想得到什么、不确定什么、最终要做什么决定。",
  };
}

function getChangingLineNames(positions: number[]) {
  if (!positions.length) {
    return "No changing lines / 无动爻";
  }

  return positions.map((position) => getLinePositionName(position)).join("、");
}

function getGenderNote(seekerGender?: string) {
  if (!seekerGender || seekerGender === "not_specified") {
    return {
      en: "Gender was not specified. This is acceptable for a free reading, but a deeper traditional reading may ask for more context depending on the question.",
      zh: "问事人未填写性别。免费解读可以继续进行，但传统深度解读可能会根据问题类型进一步询问背景。",
    };
  }

  return {
    en: "Gender information was provided. It can be used as one background reference in a deeper reading, but should not be overinterpreted alone.",
    zh: "已提供性别信息。深度解读时可作为背景参考之一，但不宜单独过度解释。",
  };
}

function getTimeNote(castTimeLocal?: string, timezone?: string) {
  if (!castTimeLocal) {
    return {
      en: "Casting time was not clearly recorded. A deeper reading should confirm the casting time and time zone before discussing timing.",
      zh: "起卦时间尚未明确记录。若要进一步判断时机，应先确认起卦时间和所在时区。",
    };
  }

  return {
    en: `Casting time has been recorded as ${castTimeLocal}${timezone ? ` (${timezone})` : ""}. This helps preserve the context of the question.`,
    zh: `起卦时间已记录为 ${castTimeLocal}${timezone ? `（${timezone}）` : ""}。这有助于保留占问当下的语境。`,
  };
}

export function generateLiuYaoBasicReading(
  input: LiuYaoReadingInput,
): LiuYaoBasicReading {
  const questionTypeText = getQuestionTypeText(input.questionType);
  const changingCount = input.changingPositions.length;
  const movingLineText = getMovingLineInterpretation(changingCount);
  const distributionText = getLineDistribution(input.lines);
  const questionAdvice = getQuestionAdvice(input.questionType);
  const genderNote = getGenderNote(input.seekerGender);
  const timeNote = getTimeNote(input.castTimeLocal, input.timezone);
  const changingLineNames = getChangingLineNames(input.changingPositions);

  const headline = input.hasChangingLines
    ? `Primary hexagram ${input.primaryHexagram.number} changes toward hexagram ${input.changedHexagram.number}`
    : `Primary hexagram ${input.primaryHexagram.number}, with no changing lines`;

  const zhHeadline = input.hasChangingLines
    ? `本卦第 ${input.primaryHexagram.number} 卦，动而趋向第 ${input.changedHexagram.number} 卦`
    : `本卦第 ${input.primaryHexagram.number} 卦，无动爻`;

  const summary = input.hasChangingLines
    ? `This is a question about ${questionTypeText.en}. The free reading suggests that the matter is already in motion. The primary hexagram shows the current pattern, while the changing lines reveal where the situation begins to shift.`
    : `This is a question about ${questionTypeText.en}. The free reading suggests a more stable or restrained pattern. The primary hexagram should be read carefully before making a strong judgment.`;

  const zhSummary = input.hasChangingLines
    ? `这是一个关于${questionTypeText.zh}的问题。免费解读显示事情已经有变化之象。本卦看当前格局，动爻看变化从何处开始。`
    : `这是一个关于${questionTypeText.zh}的问题。免费解读显示格局较稳定或变化尚未明显，应先细看本卦，不宜草率下结论。`;

  return {
    headline,
    zhHeadline,
    summary,
    zhSummary,
    sections: [
      {
        title: "Primary Hexagram",
        zhTitle: "本卦所示",
        content: `The primary hexagram is ${input.primaryHexagram.name} (${input.primaryHexagram.nameZh}). In a free reading, it should be treated as the first image of the matter: the current field, the visible structure, and the condition before deeper line analysis.`,
        zhContent: `本卦为${input.primaryHexagram.nameZh}。在免费解读中，本卦可视为事情当前的第一层象：它显示当前场域、表层结构，以及进入细断前的基本状态。`,
      },
      {
        title: "Changing Line Pattern",
        zhTitle: "动爻格局",
        content: `${movingLineText.en} Changing lines: ${changingLineNames}.`,
        zhContent: `${movingLineText.zh} 动爻位置：${changingLineNames}。`,
      },
      {
        title: "Upper and Lower Movement",
        zhTitle: "上下卦动象",
        content: distributionText.en,
        zhContent: distributionText.zh,
      },
      {
        title: "Question Focus",
        zhTitle: "所问重点",
        content: questionAdvice.en,
        zhContent: questionAdvice.zh,
      },
      {
        title: "Time and Context",
        zhTitle: "时间与语境",
        content: `${timeNote.en} ${genderNote.en}`,
        zhContent: `${timeNote.zh} ${genderNote.zh}`,
      },
    ],
    deeperReadingFocus: [
      "Clarify the useful god and the line most related to the question",
      "Review the self/responding line relationship and whether the matter is supported or opposed",
      "Interpret the changing line text, changed hexagram, and direction of movement",
      "Connect the reading with timing, background, and practical action rather than giving an isolated prediction",
      "Separate cultural reflection from medical, legal, financial, or safety-related professional advice",
    ],
    zhDeeperReadingFocus: [
      "确定用神，以及与问题最相关的爻位",
      "分析世应关系，判断事情是得助、受制还是相持",
      "结合动爻、变卦和变化方向进行细断",
      "把卦象与时间、背景、现实行动结合起来，而不是孤立下预测",
      "区分文化反思与医疗、法律、财务、安全等专业意见边界",
    ],
  };
}