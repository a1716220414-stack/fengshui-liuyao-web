export type FengShuiInput = {
  houseType?: string;
  facingDirection?: string;
  analysisScope?: string;
  targetRoomType?: string;
  targetRoomArea?: string;
  roomPurpose?: string;
  mainDoorArea?: string;
  bedroomArea?: string;
  kitchenArea?: string;
  bathroomArea?: string;
  mainConcern?: string;
  notes?: string;
  uploadedFileCount?: number;
};

export type FengShuiInsight = {
  level: "positive" | "neutral" | "attention";
  title: string;
  zhTitle: string;
  description: string;
  zhDescription: string;
};

export type FengShuiReport = {
  score: number;
  levelLabel: string;
  zhLevelLabel: string;
  summary: string;
  zhSummary: string;
  keyInsights: FengShuiInsight[];
  paidFocus: string[];
  zhPaidFocus: string[];
};

function normalize(value?: string) {
  return (value || "").trim().toLowerCase();
}

function hasUnknown(value?: string) {
  const text = normalize(value);

  return (
    !text ||
    text.includes("unknown") ||
    text.includes("not sure") ||
    text.includes("unsure") ||
    text.includes("不确定") ||
    text.includes("不知道") ||
    text.includes("none") ||
    text.includes("无") ||
    text.includes("n/a")
  );
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function createInsight(
  level: FengShuiInsight["level"],
  title: string,
  zhTitle: string,
  description: string,
  zhDescription: string,
): FengShuiInsight {
  return {
    level,
    title,
    zhTitle,
    description,
    zhDescription,
  };
}

function getConcernTheme(mainConcern: string) {
  if (includesAny(mainConcern, ["wealth", "money", "finance", "business", "财", "钱", "事业", "生意"])) {
    return {
      en: "wealth, career, or resource flow",
      zh: "财运、事业或资源流动",
    };
  }

  if (includesAny(mainConcern, ["sleep", "health", "illness", "body", "健康", "睡眠", "身体", "病"])) {
    return {
      en: "rest, health, and personal recovery",
      zh: "休息、健康与个人恢复状态",
    };
  }

  if (includesAny(mainConcern, ["relationship", "love", "marriage", "family", "感情", "婚姻", "关系", "家庭"])) {
    return {
      en: "relationship, emotional balance, or family harmony",
      zh: "感情关系、情绪平衡或家庭和合",
    };
  }

  if (includesAny(mainConcern, ["study", "exam", "work", "career", "学习", "考试", "工作", "事业"])) {
    return {
      en: "study, work efficiency, or career direction",
      zh: "学习、工作效率或事业方向",
    };
  }

  return {
    en: "general layout harmony and daily living experience",
    zh: "整体格局和日常居住体验",
  };
}

function getScopeText(input: FengShuiInput) {
  const analysisScope = normalize(input.analysisScope);
  const targetRoomType = normalize(input.targetRoomType);

  if (analysisScope.includes("room") || targetRoomType) {
    return {
      en: "This request is closer to a room-level Feng Shui review. The first layer is to see whether the room function, door position, bed or desk position, lighting, and circulation match the user’s goal.",
      zh: "这次需求更接近单个房间层面的风水判断。第一层应先看房间功能、门位、床位或桌位、采光与动线是否与用户目标相合。",
    };
  }

  return {
    en: "This request is closer to a whole-home Feng Shui review. The first layer is to observe the entrance, room distribution, major functional areas, and how the internal Qi movement begins after entering the home.",
    zh: "这次需求更接近全屋风水判断。第一层应先看入户门、房间分布、主要功能区，以及气口入宅后室内动线如何展开。",
  };
}

export function generateFengShuiReport(input: FengShuiInput): FengShuiReport {
  const insights: FengShuiInsight[] = [];
  let score = 72;

  const mainConcern = normalize(input.mainConcern);
  const targetRoomType = normalize(input.targetRoomType);
  const notes = normalize(input.notes);
  const concernTheme = getConcernTheme(mainConcern);
  const scopeText = getScopeText(input);

  if (hasUnknown(input.facingDirection)) {
    score -= 7;
    insights.push(
      createInsight(
        "attention",
        "The facing direction is not yet clear",
        "房屋朝向尚不明确",
        "The current reading can only observe visible layout clues. For a deeper Feng Shui review, the facing direction should be confirmed before discussing stronger conclusions.",
        "当前只能先根据可见格局进行初判。若要进一步分析，建议先确认房屋朝向，再判断气口、方位与空间关系。",
      ),
    );
  } else {
    score += 5;
    insights.push(
      createInsight(
        "positive",
        "Facing direction has been provided",
        "已提供房屋朝向",
        "This makes the reading more grounded. The next step can connect the facing direction with entrance, room distribution, and the user’s main concern.",
        "这会让判断更有依据。后续可以把朝向、入户门、房间分布和用户主诉问题结合起来看。",
      ),
    );
  }

  if ((input.uploadedFileCount || 0) > 0) {
    score += 8;
    insights.push(
      createInsight(
        "positive",
        "Visual material is available",
        "已提供图片或户型资料",
        "Floor plans and room photos greatly improve the quality of a Feng Shui review, because many layout issues cannot be judged from text alone.",
        "户型图和房间照片会显著提高风水分析质量，因为很多格局问题无法仅凭文字准确判断。",
      ),
    );
  } else {
    score -= 8;
    insights.push(
      createInsight(
        "attention",
        "No floor plan or room photo has been uploaded",
        "尚未上传户型图或房间照片",
        "The free result can still provide direction, but deeper consultation should include a floor plan, entrance photo, target room photo, or simple sketch.",
        "免费结果仍可提供方向，但深度咨询建议补充户型图、入户门照片、目标房间照片或简单手绘布局。",
      ),
    );
  }

  insights.push(
    createInsight(
      "neutral",
      "Reading scope has been identified",
      "已识别分析范围",
      scopeText.en,
      scopeText.zh,
    ),
  );

  if (hasUnknown(input.mainDoorArea)) {
    score -= 5;
    insights.push(
      createInsight(
        "attention",
        "Entrance information needs clarification",
        "入户门信息需要补充",
        "In Feng Shui consultation, the entrance is often treated as the first gateway of Qi. Without entrance details, the overall pattern remains incomplete.",
        "风水分析中，入户门通常是气口的第一层线索。若缺少入户信息，整体格局判断会不完整。",
      ),
    );
  } else {
    score += 4;
    insights.push(
      createInsight(
        "neutral",
        "Entrance area can be used as a starting point",
        "可从入户区域开始判断",
        "The entrance area can help reveal how the space receives, redirects, or blocks movement and attention after entering the home.",
        "入户区域可以帮助判断进门后空间如何纳气、转折、阻滞或引导人的注意力。",
      ),
    );
  }

  if (includesAny(mainConcern, ["wealth", "money", "finance", "business", "财", "钱", "生意"])) {
    insights.push(
      createInsight(
        "neutral",
        "The concern is related to wealth or resource flow",
        "当前诉求与财运或资源流动相关",
        "For this type of question, the deeper review should focus on the entrance, kitchen, work area, storage, lighting, and whether the layout supports stable accumulation.",
        "这类问题后续应重点看入户门、厨房、工作区、收纳、采光，以及格局是否有利于稳定聚气与资源积累。",
      ),
    );
  }

  if (includesAny(mainConcern, ["sleep", "health", "body", "illness", "健康", "睡眠", "身体", "病"])) {
    insights.push(
      createInsight(
        "attention",
        "The concern is related to rest or health",
        "当前诉求与休息或健康状态相关",
        "This should be handled carefully. Feng Shui suggestions can support lifestyle reflection and spatial adjustment, but should not replace medical advice.",
        "这类问题需要谨慎处理。风水建议可以作为生活方式反思和空间调整参考，但不能替代医学诊断或专业医疗建议。",
      ),
    );
  }

  if (includesAny(mainConcern, ["relationship", "love", "marriage", "family", "感情", "婚姻", "关系", "家庭"])) {
    insights.push(
      createInsight(
        "neutral",
        "The concern is related to relationship harmony",
        "当前诉求与感情或家庭关系相关",
        "The next layer can review bedroom atmosphere, privacy, mirror placement, clutter, balance on both sides of the bed, and whether the space supports calm communication.",
        "后续可以重点看卧室氛围、隐私感、镜子位置、杂物堆积、床两侧平衡，以及空间是否有利于稳定沟通。",
      ),
    );
  }

  if (
    targetRoomType.includes("bedroom") ||
    normalize(input.bedroomArea).length > 0 ||
    notes.includes("bed")
  ) {
    insights.push(
      createInsight(
        "neutral",
        "Bedroom review may be important",
        "卧室可能是重点区域",
        "The bedroom is closely related to rest, recovery, emotional stability, and relationship atmosphere. Bed position and surrounding pressure points should be reviewed.",
        "卧室与休息、恢复、情绪稳定和关系氛围密切相关。床位与周围压迫点值得重点判断。",
      ),
    );
  }

  if (
    targetRoomType.includes("office") ||
    targetRoomType.includes("study") ||
    targetRoomType.includes("desk") ||
    targetRoomType.includes("书房") ||
    targetRoomType.includes("办公室") ||
    notes.includes("desk")
  ) {
    insights.push(
      createInsight(
        "neutral",
        "Work or study position should be reviewed",
        "工作或学习位置需要判断",
        "For work and study spaces, the desk position, back support, door visibility, lighting, and distraction sources are usually more important than decoration alone.",
        "工作或学习空间中，桌位、背后依靠、是否看见门、采光和干扰源，通常比单纯装饰更重要。",
      ),
    );
  }

  if (hasUnknown(input.kitchenArea)) {
    insights.push(
      createInsight(
        "neutral",
        "Kitchen information is still limited",
        "厨房信息仍较有限",
        "The kitchen can reflect fire, nourishment, daily rhythm, and household order. If the concern is wealth, health, or family harmony, kitchen details may matter.",
        "厨房可对应火气、饮食、日常节律和家庭秩序。如果关注财运、健康或家庭关系，厨房细节可能很关键。",
      ),
    );
  }

  if (hasUnknown(input.bathroomArea)) {
    insights.push(
      createInsight(
        "neutral",
        "Bathroom relationship may need review",
        "卫生间关系可能需要进一步判断",
        "Bathroom placement is often reviewed in relation to bedroom, kitchen, entrance, and central circulation, especially when the user reports sleep or health concerns.",
        "卫生间位置常需要结合卧室、厨房、入户门和中宫动线来看，尤其在用户关注睡眠或健康时更应注意。",
      ),
    );
  }

  score = Math.max(38, Math.min(94, score));

  const levelLabel =
    score >= 82
      ? "The preliminary pattern is relatively clear"
      : score >= 66
        ? "The preliminary pattern is partly visible"
        : "More context is needed before judgment";

  const zhLevelLabel =
    score >= 82
      ? "初步格局较清晰"
      : score >= 66
        ? "初步格局已有线索，但仍需补充"
        : "资料不足，暂不宜下重判断";

  const summary =
    score >= 82
      ? `The current information is enough to form a useful preliminary Feng Shui direction. The main theme appears to be ${concernTheme.en}. A deeper consultation can move from general layout review into specific spatial adjustment.`
      : score >= 66
        ? `The current information reveals part of the Feng Shui pattern, especially around ${concernTheme.en}. However, stronger judgment still requires clearer visual material, entrance details, and direction information.`
        : `The current information is too limited for a reliable Feng Shui judgment. The matter may relate to ${concernTheme.en}, but a deeper review should first collect floor plan, photos, facing direction, and the exact concern.`;

  const zhSummary =
    score >= 82
      ? `当前资料已经可以形成较有参考价值的风水初判。主要主题偏向${concernTheme.zh}。若继续深度咨询，可以从整体格局进入具体空间调整。`
      : score >= 66
        ? `当前资料已经显露出部分风水线索，尤其与${concernTheme.zh}相关。但若要下更明确判断，仍需补充图片资料、入户信息和朝向。`
        : `当前资料仍偏少，不宜直接下重判断。此事可能与${concernTheme.zh}相关，但深度分析前应先补充户型图、照片、朝向和具体诉求。`;

  return {
    score,
    levelLabel,
    zhLevelLabel,
    summary,
    zhSummary,
    keyInsights: insights.slice(0, 7),
    paidFocus: [
      "Map the entrance, bedroom, kitchen, bathroom, and target room into one coherent layout reading",
      "Check whether the visible layout supports or weakens the user’s stated concern",
      "Identify practical adjustments that can be made without major renovation",
      "Review whether photos and floor plan show pressure points, blocked circulation, imbalance, or clutter",
    ],
    zhPaidFocus: [
      "把入户门、卧室、厨房、卫生间和目标房间放在同一张格局中综合判断",
      "判断可见格局是否支持或削弱用户提出的核心诉求",
      "优先寻找不需要大装修、但可以实际执行的调整方式",
      "结合照片和户型图检查压迫点、动线阻滞、阴阳失衡或杂物堆积",
    ],
  };
}