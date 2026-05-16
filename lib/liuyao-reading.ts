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
    career: { en: "career and work", zh: "事业工作" },
    relationship: { en: "relationship and emotions", zh: "感情关系" },
    wealth: { en: "wealth and resources", zh: "财务资源" },
    health: { en: "health and physical condition", zh: "健康状态" },
    decision: { en: "decision and timing", zh: "选择决策" },
    custom: { en: "a custom question", zh: "自定义问题" },
  };

  return map[questionType] ?? map.custom;
}

function getMovingLineStrength(changingCount: number) {
  if (changingCount === 0) {
    return {
      en: "The hexagram has no changing lines, so the reading should focus more on the primary hexagram and the current state of the matter.",
      zh: "此卦无动爻，判断时应更重视本卦，偏向观察当前状态与整体格局。",
    };
  }

  if (changingCount === 1) {
    return {
      en: "There is one changing line, so the matter has a clear pivot point. The deeper reading should focus on that line.",
      zh: "此卦一爻发动，事情有一个较明确的变化点，深度解读应重点看该动爻。",
    };
  }

  if (changingCount <= 3) {
    return {
      en: "There are several changing lines, suggesting that the matter is in motion but still readable through the relationship between the primary and changed hexagrams.",
      zh: "此卦有数个动爻，说明事情处于变化之中，可结合本卦与变卦之间的关系判断趋势。",
    };
  }

  return {
    en: "There are many changing lines, suggesting a more unstable or complex situation. A deeper reading should avoid oversimplification.",
    zh: "此卦动爻较多，表示事情变化较大或因素复杂，深度解读时不宜过度简化。",
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
      en: "Changing lines are more concentrated in the lower trigram, so the issue may be closer to foundation, internal conditions, preparation, or the early stage of the matter.",
      zh: "动爻较集中在下卦，问题可能更偏向基础条件、内部状态、准备阶段或事情前段。",
    };
  }

  if (upperChanging > lowerChanging) {
    return {
      en: "Changing lines are more concentrated in the upper trigram, so the issue may be closer to external response, visible result, pressure, or the later stage of the matter.",
      zh: "动爻较集中在上卦，问题可能更偏向外部回应、显性结果、压力变化或事情后段。",
    };
  }

  return {
    en: "Changing lines are relatively balanced, so both internal conditions and external development should be considered.",
    zh: "动爻上下分布较均衡，因此内部条件与外部发展都需要一起考虑。",
  };
}

function getQuestionAdvice(questionType: string) {
  if (questionType === "career") {
    return {
      en: "For career questions, the deeper reading should focus on timing, external opportunity, personal position, pressure, and whether the current path is stable.",
      zh: "事业问题应重点看时机、外部机会、个人位置、压力来源，以及当前路径是否稳定。",
    };
  }

  if (questionType === "relationship") {
    return {
      en: "For relationship questions, the deeper reading should focus on emotional state, response from the other side, communication pattern, and whether the relationship is moving or blocked.",
      zh: "感情问题应重点看情绪状态、对方回应、沟通方式，以及关系是推进还是阻滞。",
    };
  }

  if (questionType === "wealth") {
    return {
      en: "For wealth questions, the deeper reading should focus on resource flow, risk, timing, effort-return balance, and whether the matter is suitable for action.",
      zh: "财务问题应重点看资源流动、风险、时机、投入回报关系，以及是否适合行动。",
    };
  }

  if (questionType === "health") {
    return {
      en: "For health questions, the reading should be treated as reflective guidance only and must not replace medical advice.",
      zh: "健康问题只能作为反思参考，不能替代医疗诊断或专业医学建议。",
    };
  }

  if (questionType === "decision") {
    return {
      en: "For decision questions, the deeper reading should compare stability, risk, timing, and whether the matter is better to advance, wait, or adjust.",
      zh: "选择决策问题应比较稳定性、风险、时机，以及事情适合推进、等待还是调整。",
    };
  }

  return {
    en: "For custom questions, the deeper reading should first clarify what exactly is being asked and what decision the user needs to make.",
    zh: "自定义问题应先明确到底所问为何，以及用户真正需要做出的决定是什么。",
  };
}

export function generateLiuYaoBasicReading(
  input: LiuYaoReadingInput,
): LiuYaoBasicReading {
  const questionTypeText = getQuestionTypeText(input.questionType);
  const changingCount = input.changingPositions.length;
  const movingLineText = getMovingLineStrength(changingCount);
  const distributionText = getLineDistribution(input.lines);
  const questionAdvice = getQuestionAdvice(input.questionType);

  const changingLineNames = input.changingPositions.length
    ? input.changingPositions
        .map((position) => getLinePositionName(position))
        .join("、")
    : "No changing lines / 无动爻";

  const headline = input.hasChangingLines
    ? `Primary hexagram ${input.primaryHexagram.number} changes to ${input.changedHexagram.number}`
    : `Primary hexagram ${input.primaryHexagram.number} with no changing lines`;

  const zhHeadline = input.hasChangingLines
    ? `本卦第 ${input.primaryHexagram.number} 卦，变为第 ${input.changedHexagram.number} 卦`
    : `本卦第 ${input.primaryHexagram.number} 卦，无动爻`;

  const summary = input.hasChangingLines
    ? `This is a ${questionTypeText.en} question. The free reading suggests that the matter is not static; the changing line structure should be reviewed before giving specific advice.`
    : `This is a ${questionTypeText.en} question. The free reading suggests that the current state should be reviewed carefully before making a strong judgment.`;

  const zhSummary = input.hasChangingLines
    ? `这是一个关于${questionTypeText.zh}的问题。免费结果显示事情并非完全静止，后续需要结合动爻结构进一步判断。`
    : `这是一个关于${questionTypeText.zh}的问题。免费结果显示当前状态更值得关注，不宜只凭一个结论草率判断。`;

  return {
    headline,
    zhHeadline,
    summary,
    zhSummary,
    sections: [
      {
        title: "Primary Hexagram",
        zhTitle: "本卦提示",
        content: `The primary hexagram is ${input.primaryHexagram.name} (${input.primaryHexagram.nameZh}). It describes the current pattern of the question before later changes are considered.`,
        zhContent: `本卦为${input.primaryHexagram.nameZh}，用于观察所问之事当前呈现出来的基本格局。`,
      },
      {
        title: "Changing Lines",
        zhTitle: "动爻提示",
        content: `${movingLineText.en} Changing lines: ${changingLineNames}.`,
        zhContent: `${movingLineText.zh} 动爻位置：${changingLineNames}。`,
      },
      {
        title: "Line Distribution",
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
    ],
    deeperReadingFocus: [
      "Identify useful god and relevant line relationships",
      "Review self/responding line relationship",
      "Interpret changing lines and changed hexagram",
      "Connect the reading with timing, context, and practical action",
    ],
    zhDeeperReadingFocus: [
      "确定用神及相关爻位关系",
      "分析世应关系",
      "解读动爻与变卦",
      "结合时机、背景和实际行动给出建议",
    ],
  };
}