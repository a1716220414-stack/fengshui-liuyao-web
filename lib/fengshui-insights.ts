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
    text.includes("无")
  );
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

export function generateFengShuiReport(input: FengShuiInput): FengShuiReport {
  const insights: FengShuiInsight[] = [];
  let score = 72;

  const mainConcern = normalize(input.mainConcern);
  const analysisScope = normalize(input.analysisScope);
  const targetRoomType = normalize(input.targetRoomType);

  if (hasUnknown(input.facingDirection)) {
    score -= 5;
    insights.push(
      createInsight(
        "attention",
        "Facing direction is unclear",
        "房屋朝向信息不明确",
        "The facing direction is one of the key references in Feng Shui analysis. If it is unknown, the result should be treated as a preliminary reading only.",
        "房屋朝向是风水分析的重要参考之一。如果朝向不确定，目前结果只能作为初步判断。",
      ),
    );
  } else {
    score += 4;
    insights.push(
      createInsight(
        "positive",
        "Facing direction is provided",
        "已提供房屋朝向",
        "Providing the facing direction makes it easier to evaluate the relationship between layout, entrance, and energy flow.",
        "提供房屋朝向后，更容易结合格局、入户门和气流动线进行判断。",
      ),
    );
  }

  if (analysisScope.includes("room") || targetRoomType) {
    score += 3;
    insights.push(
      createInsight(
        "neutral",
        "Room-level analysis selected",
        "当前偏向单个房间分析",
        "Room-level Feng Shui is suitable when the user cares about sleep, work, study, relationship, or a specific functional area.",
        "单个房间分析适合关注睡眠、工作、学习、感情或某个具体功能空间的问题。",
      ),
    );
  } else {
    insights.push(
      createInsight(
        "neutral",
        "Whole-home pattern needs more context",
        "全屋格局需要更多资料",
        "A whole-home reading usually requires a floor plan, entrance position, room distribution, and facing direction.",
        "全屋风水通常需要结合户型图、入户门位置、房间分布和房屋朝向一起判断。",
      ),
    );
  }

  if (hasUnknown(input.mainDoorArea)) {
    score -= 4;
    insights.push(
      createInsight(
        "attention",
        "Main door information is missing",
        "入户门信息不足",
        "The main door is usually one of the first areas to review. Missing entrance information limits the reliability of the preliminary result.",
        "入户门通常是优先查看的位置之一。缺少入户门信息会影响初步判断的完整度。",
      ),
    );
  } else {
    score += 3;
    insights.push(
      createInsight(
        "neutral",
        "Entrance area can be reviewed",
        "可进一步判断入户区域",
        "The entrance area can help evaluate how external Qi enters and how the interior circulation begins.",
        "入户区域有助于判断外部气口进入方式，以及室内动线如何展开。",
      ),
    );
  }

  if (mainConcern.includes("wealth") || mainConcern.includes("财")) {
    insights.push(
      createInsight(
        "neutral",
        "Wealth-related concern detected",
        "当前关注财运或资源问题",
        "For wealth-related concerns, the analysis should focus on entrance, kitchen, work area, storage, light, and movement flow.",
        "如果关注财运或资源问题，后续应重点看入户门、厨房、工作区、收纳、采光和动线。",
      ),
    );
  }

  if (
    mainConcern.includes("sleep") ||
    mainConcern.includes("health") ||
    mainConcern.includes("健康") ||
    mainConcern.includes("睡")
  ) {
    insights.push(
      createInsight(
        "attention",
        "Health or sleep concern detected",
        "当前关注健康或睡眠问题",
        "For sleep and health concerns, bedroom layout, bed position, bathroom relationship, light, noise, and airflow should be reviewed carefully.",
        "如果关注健康或睡眠，后续需要重点看卧室布局、床位、卫生间关系、光线、噪声和空气流动。",
      ),
    );
  }

  if (
    mainConcern.includes("relationship") ||
    mainConcern.includes("love") ||
    mainConcern.includes("感情") ||
    mainConcern.includes("关系")
  ) {
    insights.push(
      createInsight(
        "neutral",
        "Relationship-related concern detected",
        "当前关注感情或关系问题",
        "For relationship concerns, bedroom atmosphere, bed symmetry, clutter, mirror placement, and privacy boundaries may be relevant.",
        "如果关注感情或关系，后续可重点看卧室氛围、床位两侧平衡、杂物、镜子位置和隐私边界。",
      ),
    );
  }

  if ((input.uploadedFileCount || 0) > 0) {
    score += 6;
    insights.push(
      createInsight(
        "positive",
        "Uploaded material improves review quality",
        "已上传资料，有助于深度分析",
        "Uploaded floor plans or room photos make the consultation much more concrete and reduce guesswork.",
        "上传户型图或房间照片能让后续咨询更具体，减少单靠文字描述造成的误差。",
      ),
    );
  } else {
    score -= 6;
    insights.push(
      createInsight(
        "attention",
        "No floor plan or photo uploaded",
        "尚未上传户型图或照片",
        "Without visual material, the free result can only provide general guidance. A deeper reading should include a floor plan or room photos.",
        "如果没有视觉资料，免费结果只能提供概括性方向。深度分析建议补充户型图或房间照片。",
      ),
    );
  }

  if (
    targetRoomType.includes("bedroom") ||
    targetRoomType.includes("卧室") ||
    normalize(input.bedroomArea).length > 0
  ) {
    insights.push(
      createInsight(
        "neutral",
        "Bedroom should be reviewed carefully",
        "卧室需要重点判断",
        "The bedroom is closely related to rest, stability, relationship, and personal recovery, so it is often a high-priority area.",
        "卧室与休息、稳定、关系和个人恢复状态相关，通常是风水分析中的重点区域。",
      ),
    );
  }

  if (
    targetRoomType.includes("office") ||
    targetRoomType.includes("study") ||
    targetRoomType.includes("书房") ||
    targetRoomType.includes("办公室")
  ) {
    insights.push(
      createInsight(
        "neutral",
        "Work or study space selected",
        "当前关注工作或学习空间",
        "For work and study spaces, the desk position, back support, light, door visibility, and distraction sources should be reviewed.",
        "如果分析工作或学习空间，后续应关注桌位、背后依靠、采光、门的位置和干扰来源。",
      ),
    );
  }

  score = Math.max(35, Math.min(92, score));

  const levelLabel =
    score >= 80
      ? "Good preliminary clarity"
      : score >= 65
        ? "Moderate preliminary clarity"
        : "Needs more information";

  const zhLevelLabel =
    score >= 80
      ? "初步信息较清晰"
      : score >= 65
        ? "初步信息中等清晰"
        : "需要补充更多资料";

  const summary =
    score >= 80
      ? "The submitted information is sufficient for a useful preliminary Feng Shui direction. A deeper consultation can focus on specific layout optimization."
      : score >= 65
        ? "The current information can support a basic Feng Shui reading, but deeper analysis still needs clearer layout, direction, and visual materials."
        : "The current information is too limited for a reliable Feng Shui reading. Please add floor plans, photos, facing direction, and the specific concern.";

  const zhSummary =
    score >= 80
      ? "当前信息已经可以形成较有参考价值的风水初步判断。若进一步咨询，可重点做具体格局优化。"
      : score >= 65
        ? "当前信息可以支持基础风水判断，但深度分析仍建议补充更清晰的户型、朝向和图片资料。"
        : "当前信息较少，难以形成可靠判断。建议补充户型图、照片、朝向和具体问题。";

  return {
    score,
    levelLabel,
    zhLevelLabel,
    summary,
    zhSummary,
    keyInsights: insights.slice(0, 6),
    paidFocus: [
      "Review entrance, bedroom, kitchen, bathroom, and target room relationship",
      "Check whether floor plan and room photos match the stated concern",
      "Give practical layout suggestions based on the user’s main goal",
    ],
    zhPaidFocus: [
      "重点判断入户门、卧室、厨房、卫生间与目标房间之间的关系",
      "结合户型图和照片判断是否与用户主诉问题对应",
      "根据用户主要诉求给出可执行的空间调整建议",
    ],
  };
}