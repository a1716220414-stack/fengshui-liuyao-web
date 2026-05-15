export type FengShuiFormData = {
  name: string;
  email: string;
  wechat: string;
  xAccount: string;
  instagram: string;
  preferredContactMethod: string;

  houseType: string;
  facingDirection: string;

  analysisScope: string;
  targetRoomType: string;
  targetRoomArea: string;
  roomPurpose: string;

  mainDoorArea: string;
  bedroomArea: string;
  kitchenArea: string;
  bathroomArea: string;

  mainConcern: string;
  paidConsultationInterest: string;
  notes: string;
};

export type FengShuiReport = {
  overview: string;
  overviewZh: string;

  scope: string;
  scopeZh: string;

  entrance: string;
  entranceZh: string;

  room: string;
  roomZh: string;

  kitchen: string;
  kitchenZh: string;

  bathroom: string;
  bathroomZh: string;

  uploadAdvice: string;
  uploadAdviceZh: string;

  suggestions: string[];
  suggestionsZh: string[];

  nextStep: string;
  nextStepZh: string;
};

const directionMeanings: Record<string, { en: string; zh: string }> = {
  north: {
    en: "North is traditionally associated with career flow, movement, and life direction.",
    zh: "北方在传统风水中常与事业流动、方向感和人生路径有关。",
  },
  south: {
    en: "South is traditionally associated with visibility, reputation, warmth, and recognition.",
    zh: "南方在传统风水中常与名声、外在表现、热度和被看见有关。",
  },
  east: {
    en: "East is traditionally associated with growth, family vitality, and new beginnings.",
    zh: "东方在传统风水中常与生长、家庭活力和新的开始有关。",
  },
  west: {
    en: "West is traditionally associated with creativity, completion, children, and expression.",
    zh: "西方在传统风水中常与创造力、成果、子女和表达有关。",
  },
  northeast: {
    en: "Northeast is traditionally associated with learning, stillness, discipline, and inner development.",
    zh: "东北方在传统风水中常与学习、稳定、自我修养和积累有关。",
  },
  northwest: {
    en: "Northwest is traditionally associated with support, authority, mentors, and leadership energy.",
    zh: "西北方在传统风水中常与贵人、权威、支持力量和领导气有关。",
  },
  southeast: {
    en: "Southeast is traditionally associated with wealth growth, resources, and long-term accumulation.",
    zh: "东南方在传统风水中常与财富增长、资源积累和长期发展有关。",
  },
  southwest: {
    en: "Southwest is traditionally associated with relationships, partnership, stability, and family harmony.",
    zh: "西南方在传统风水中常与关系、伴侣、稳定和家庭和合有关。",
  },
  unknown: {
    en: "Because the facing direction is unclear, this report focuses on general layout balance instead of precise directional judgment.",
    zh: "由于房屋朝向暂不明确，本报告会先侧重整体格局平衡，而不做过细的方位判断。",
  },
};

const areaLabels: Record<string, { en: string; zh: string }> = {
  north: { en: "North", zh: "北方" },
  south: { en: "South", zh: "南方" },
  east: { en: "East", zh: "东方" },
  west: { en: "West", zh: "西方" },
  northeast: { en: "Northeast", zh: "东北方" },
  northwest: { en: "Northwest", zh: "西北方" },
  southeast: { en: "Southeast", zh: "东南方" },
  southwest: { en: "Southwest", zh: "西南方" },
  center: { en: "Center", zh: "中宫" },
  unknown: { en: "unclear area", zh: "位置不明" },
  none: { en: "not applicable", zh: "无 / 不适用" },
};

const roomTypeLabels: Record<string, { en: string; zh: string }> = {
  bedroom: { en: "bedroom", zh: "卧室" },
  livingRoom: { en: "living room", zh: "客厅" },
  study: { en: "study or office room", zh: "书房 / 办公房间" },
  kitchen: { en: "kitchen", zh: "厨房" },
  bathroom: { en: "bathroom", zh: "卫生间" },
  entrance: { en: "entrance area", zh: "入户区域" },
  shop: { en: "shop or commercial room", zh: "店铺 / 商业空间" },
  office: { en: "office space", zh: "办公空间" },
  other: { en: "custom room", zh: "其他房间" },
};

function getDirectionMeaning(direction: string) {
  return directionMeanings[direction] ?? directionMeanings.unknown;
}

function getAreaLabel(area: string) {
  return areaLabels[area] ?? areaLabels.unknown;
}

function getRoomTypeLabel(roomType: string) {
  return roomTypeLabels[roomType] ?? roomTypeLabels.other;
}

function getConcernText(concern: string) {
  if (concern === "wealth") {
    return {
      en: "wealth, resource flow, and long-term accumulation",
      zh: "财富、资源流动与长期积累",
    };
  }

  if (concern === "career") {
    return {
      en: "career development, opportunities, and personal direction",
      zh: "事业发展、机会流动与个人方向",
    };
  }

  if (concern === "relationship") {
    return {
      en: "relationship harmony, emotional stability, and family atmosphere",
      zh: "关系和谐、情绪稳定与家庭氛围",
    };
  }

  if (concern === "health") {
    return {
      en: "rest, recovery, health rhythm, and daily balance",
      zh: "休息恢复、健康节律与日常平衡",
    };
  }

  if (concern === "sleep") {
    return {
      en: "sleep quality, bedroom comfort, and emotional recovery",
      zh: "睡眠质量、卧室舒适度与情绪恢复",
    };
  }

  if (concern === "business") {
    return {
      en: "business flow, customer attraction, and commercial energy",
      zh: "商业流动、客户吸引与经营气场",
    };
  }

  return {
    en: "overall home balance, comfort, and energy flow",
    zh: "整体家居平衡、舒适感与气场流动",
  };
}

export function generateFengShuiReport(
  data: FengShuiFormData,
  uploadedFileCount = 0,
): FengShuiReport {
  const facing = getDirectionMeaning(data.facingDirection);
  const door = getAreaLabel(data.mainDoorArea);
  const bedroom = getAreaLabel(data.bedroomArea);
  const kitchen = getAreaLabel(data.kitchenArea);
  const bathroom = getAreaLabel(data.bathroomArea);
  const targetRoom = getRoomTypeLabel(data.targetRoomType);
  const targetRoomArea = getAreaLabel(data.targetRoomArea);
  const concernText = getConcernText(data.mainConcern);

  const isSingleRoom = data.analysisScope === "singleRoom";

  return {
    overview: `Based on the information provided, this preliminary reading focuses on ${concernText.en}. ${facing.en} This report is designed as an introductory Feng Shui reference and should be understood as cultural, lifestyle, and spatial guidance rather than a fixed prediction.`,
    overviewZh: `根据你填写的信息，本次主要从“${concernText.zh}”角度进行初步分析。${facing.zh} 这是一份基础风水参考报告，更适合作为空间调整、生活方式建议和后续咨询线索，而不是绝对化判断。`,

    scope: isSingleRoom
      ? `The current request focuses on a specific ${targetRoom.en}. Its location is marked as ${targetRoomArea.en}. For room-level Feng Shui, layout details such as door position, window direction, bed or desk placement, mirror position, and light condition are especially important.`
      : `The current request focuses on the overall ${data.houseType || "home"} layout. For whole-home Feng Shui, the entrance, bedroom, kitchen, bathroom, circulation path, and room relationships should be considered together.`,
    scopeZh: isSingleRoom
      ? `当前需求更偏向分析某一个具体房间：${targetRoom.zh}，其所在方位为${targetRoomArea.zh}。房间级风水更需要关注门窗位置、床或书桌摆放、镜子位置、采光、动线和实际照片。`
      : `当前需求更偏向整体住宅格局分析。整体风水需要综合考虑入户门、卧室、厨房、卫生间、动线以及不同房间之间的相互关系。`,

    entrance:
      data.mainDoorArea === "none"
        ? "No entrance information was provided. For a deeper reading, the main entrance is still recommended because it is usually treated as the main Qi entry point."
        : `The main entrance is located in the ${door.en} area. In Feng Shui, the entrance is considered the mouth of Qi, meaning it influences how energy, people, and opportunities enter the home. If this area is cluttered, dark, or blocked, the overall flow of the home may feel stagnant.`,
    entranceZh:
      data.mainDoorArea === "none"
        ? "当前未提供入户门信息。若进行更深入分析，仍建议补充入户门位置，因为入户门通常被视为住宅纳气的重要位置。"
        : `入户门位于${door.zh}。在风水中，入户门常被视为“气口”，代表气、人流、机会进入住宅的方式。如果此处杂乱、昏暗或受阻，整体气场容易显得不够通畅。`,

    room: isSingleRoom
      ? `For the selected ${targetRoom.en}, the most important next step is to review the internal layout. A clear photo or floor plan can help identify whether the door, window, bed, desk, sofa, mirror, and storage areas create stable and comfortable Qi flow.`
      : data.bedroomArea === "none"
        ? "No bedroom information was provided. If rest, sleep, relationship, or health is a major concern, bedroom information should be added later."
        : `The bedroom is located in the ${bedroom.en} area. The bedroom should support rest, emotional stability, and recovery. A good bedroom layout usually emphasizes quietness, a stable bed position, soft lighting, and reduced visual pressure.`,
    roomZh: isSingleRoom
      ? `对于所选择的${targetRoom.zh}，下一步最关键的是查看房间内部布局。清晰的实景图或房间平面图可以帮助判断门、窗、床、书桌、沙发、镜子和储物区是否形成稳定、舒适的气场。`
      : data.bedroomArea === "none"
        ? "当前未提供卧室信息。如果主要关注睡眠、关系、健康或休息状态，后续建议补充卧室位置和内部照片。"
        : `卧室位于${bedroom.zh}。卧室重点在于休息、情绪稳定和恢复能力。较好的卧室布局通常强调安静、床位稳定、光线柔和，并尽量减少压迫感和杂乱感。`,

    kitchen:
      data.kitchenArea === "none"
        ? "No kitchen information was provided. If wealth, health, or family rhythm is a major concern, the kitchen location and stove-sink relationship should be reviewed later."
        : `The kitchen is located in the ${kitchen.en} area. The kitchen carries strong fire energy and is associated with nourishment, daily rhythm, and household vitality. It is usually better to keep the kitchen clean, well-ventilated, and visually ordered.`,
    kitchenZh:
      data.kitchenArea === "none"
        ? "当前未提供厨房信息。如果主要关注财运、健康或家庭生活节律，后续建议补充厨房位置以及炉灶、水槽之间的关系。"
        : `厨房位于${kitchen.zh}。厨房具有较强的“火”性，常与饮食、生活节律和家庭活力有关。厨房宜保持清洁、通风和秩序感，避免油污堆积和动线混乱。`,

    bathroom:
      data.bathroomArea === "none"
        ? "No bathroom information was provided. If moisture, drainage, odor, or bedroom comfort is a concern, bathroom location should be added later."
        : `The bathroom is located in the ${bathroom.en} area. Bathrooms are associated with drainage and water movement. From a Feng Shui perspective, it is usually important to keep this area dry, clean, ventilated, and visually contained.`,
    bathroomZh:
      data.bathroomArea === "none"
        ? "当前未提供卫生间信息。如果关注湿气、排水、异味或卧室舒适度，后续建议补充卫生间位置。"
        : `卫生间位于${bathroom.zh}。卫生间与排水、湿气和流动有关。从风水角度看，应保持干燥、整洁、通风，并避免其气味或湿气影响卧室、厨房和入户区域。`,

    uploadAdvice:
      uploadedFileCount > 0
        ? `You have selected ${uploadedFileCount} file(s). In the current local version, files are only displayed on this page and are not yet uploaded to a database. In the next version, these files can be stored and used for deeper paid consultation.`
        : "For a more accurate reading, please provide a floor plan, room photos, entrance photo, bedroom photo, or compass screenshot. Image-based review is especially important for room-level Feng Shui.",
    uploadAdviceZh:
      uploadedFileCount > 0
        ? `你已经选择了 ${uploadedFileCount} 个文件。当前本地版本只会在页面显示文件名，还没有真正上传到数据库。下一版本接入存储后，可以用于深度付费咨询分析。`
        : "如果需要更准确的分析，建议提供户型图、房间实景图、入户门照片、卧室照片或指南针截图。对于单个房间风水，图片信息尤其重要。",

    suggestions: [
      "Keep the entrance bright, clean, and easy to pass through.",
      "Mark uncertain or non-existent areas honestly; unclear information is better than inaccurate information.",
      "For room-level analysis, provide at least one clear photo from the door looking into the room.",
      "For deeper consultation, provide a floor plan with room labels, door/window positions, and the facing direction.",
    ],

    suggestionsZh: [
      "保持入户区域明亮、干净、通行顺畅。",
      "不确定或不存在的区域应如实选择，不准确的信息会影响分析质量。",
      "如果看单个房间，建议至少提供一张从门口向房间内部拍摄的清晰照片。",
      "如需深度咨询，建议提供带房间名称、门窗位置和朝向标注的户型图。",
    ],

    nextStep:
      "This free report is suitable for quick orientation. For a deeper paid consultation, the next step is to send your floor plan, photos, and main concern through your preferred contact method. A personalized reading can then focus on layout adjustment, furniture placement, room function, and practical Feng Shui remedies.",
    nextStepZh:
      "这份免费报告适合做初步判断。如果需要进一步付费咨询，下一步可以通过你偏好的联系方式发送户型图、实景照片和主要问题。深度分析可以进一步围绕格局调整、家具摆放、房间功能和具体风水改善建议展开。",
  };
}