/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Star, 
  Trophy, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  Award,
  Coins
} from 'lucide-react';

// --- 数据定义 ---
const CHAPTERS = [
  {
    id: 1,
    title: "第一章 大难不死的男孩",
    summary: "故事从德思礼一家开始，他们特别普通、特别讨厌奇怪的事。其实他们藏着一个大秘密：收养了姐姐的儿子哈利。哈利的爸爸妈妈被坏人杀死，哈利额头上留了一道闪电伤疤，是“大难不死的男孩”。邓布利多、麦格教授和巨人海格，在夜里把小哈利送到德思礼家。",
    characters: [
      { name: "哈利", desc: "可怜的小宝宝，失去父母，有闪电伤疤。" },
      { name: "德思礼一家", desc: "刻薄、自私，对哈利很坏。" },
      { name: "邓布利多", desc: "白胡子老巫师，聪明又温柔。" },
      { name: "麦格教授", desc: "会变成猫的严肃女巫，很负责。" },
      { name: "海格", desc: "高大温柔的巨人，负责送哈利。" }
    ],
    vocabulary: [
      { word: "神秘", meaning: "让人猜不透、很奇怪的样子。" },
      { word: "平凡", meaning: "普普通通，不特别。" }
    ],
    quote: "“他是大难不死的男孩。” → 哈利很勇敢、很特别。",
    lesson: "再弱小的孩子，也可能藏着了不起的力量。",
    reflection: "我觉得哈利很可怜，因为______；我希望以后______。",
    questions: [
      { q: "哈利住在哪里？", options: ["楼梯下的小柜子", "大大的卧室", "花园里"], correct: 0 },
      { q: "哈利额头上的伤疤像什么？", options: ["星星", "闪电", "月亮"], correct: 1 },
      { q: "是谁把小哈利送到德思礼家的？", options: ["海格", "伏地魔", "达力"], correct: 0 }
    ]
  },
  {
    id: 2,
    title: "第二章 消失的玻璃",
    summary: "哈利在德思礼家过了10年苦日子，睡楼梯下柜子，总被表哥达力欺负。达力生日那天，全家去动物园，哈利和大蟒蛇说话，玻璃突然消失，蟒蛇逃走了。哈利被冤枉，又被关起来惩罚。",
    characters: [
      { name: "哈利", desc: "善良、安静，悄悄有魔法。" },
      { name: "达力", desc: "霸道、爱欺负人，被爸妈宠坏。" },
      { name: "德思礼夫妇", desc: "偏心，对哈利很凶。" }
    ],
    vocabulary: [
      { word: "欺负", meaning: "用力气大去伤害别人。" },
      { word: "奇妙", meaning: "很神奇、很特别。" }
    ],
    quote: "“玻璃一下子不见了，大蛇慢慢滑了出来。”",
    lesson: "被欺负时不要害怕，善良的人总会有好运。",
    reflection: "如果我是哈利，我会______；我最不喜欢______。",
    questions: [
      { q: "哈利在动物园和谁说话了？", options: ["狮子", "大蟒蛇", "猴子"], correct: 1 },
      { q: "为什么玻璃会消失？", options: ["哈利不小心打破了", "哈利无意识使用了魔法", "达力撞碎了"], correct: 1 },
      { q: "达力是怎么对待哈利的？", options: ["很友好", "经常欺负他", "送他礼物"], correct: 1 }
    ]
  },
  {
    id: 3,
    title: "第三章 无名的信",
    summary: "夏天来了，猫头鹰不停地给哈利送信。德思礼一家吓坏了，拼命藏信、堵信箱、搬家逃跑，躲到小岛上的破屋里。哈利快11岁了，他特别想知道信里写了什么。",
    characters: [
      { name: "弗农姨父", desc: "固执、胆小，拼命阻止哈利看信。" },
      { name: "哈利", desc: "渴望真相，特别想知道自己的身世。" }
    ],
    vocabulary: [
      { word: "固执", meaning: "不听劝，非要按自己的想法做。" },
      { word: "期待", meaning: "心里很盼望一件事。" }
    ],
    quote: "越是隐瞒的秘密，越藏不住。",
    lesson: "每个人都有知道真相的权利。",
    reflection: "我觉得德思礼一家______；我最想帮哈利______。",
    questions: [
      { q: "是谁给哈利送信？", options: ["邮递员", "猫头鹰", "海格"], correct: 1 },
      { q: "德思礼一家为什么要逃跑？", options: ["去度假", "躲避那些奇怪的信", "搬新家"], correct: 1 },
      { q: "哈利快几岁了？", options: ["10岁", "11岁", "12岁"], correct: 1 }
    ]
  },
  {
    id: 4,
    title: "第四章 钥匙保管员",
    summary: "半夜，巨人海格破门而入，给哈利过11岁生日。海格告诉哈利真相：你是巫师！爸爸妈妈是被伏地魔杀死的，你要去霍格沃茨魔法学校上学。德思礼一家气疯了，但拦不住哈利。",
    characters: [
      { name: "海格", desc: "高大、温柔、讲义气，哈利的第一个朋友。" },
      { name: "伏地魔", desc: "大坏蛋，杀死哈利爸妈。" },
      { name: "哈利", desc: "终于知道自己是谁，又开心又难过。" }
    ],
    vocabulary: [
      { word: "真相", meaning: "真正发生的事情。" },
      { word: "勇敢", meaning: "不害怕困难和坏人。" }
    ],
    quote: "“你是一个巫师，哈利。”",
    lesson: "真相虽然难过，但能让人自由。",
    reflection: "我听到真相时的心情是______；我最喜欢______。",
    questions: [
      { q: "海格来做什么？", options: ["抓哈利回去", "接哈利去魔法学校并祝他生日快乐", "送快递"], correct: 1 },
      { q: "哈利的真实身份是什么？", options: ["普通男孩", "巫师", "巨人"], correct: 1 },
      { q: "谁杀死了哈利的爸爸妈妈？", options: ["海格", "伏地魔", "德思礼"], correct: 1 }
    ]
  },
  {
    id: 5,
    title: "第五章 对角巷",
    summary: "海格带哈利去对角巷买上学用品。哈利去巫师银行古灵阁，发现爸爸妈妈留下很多金子。他买了魔杖、课本、猫头鹰，认识了讨厌的马尔福，也知道自己在魔法世界很有名。",
    characters: [
      { name: "马尔福", desc: "骄傲、看不起人，以后是哈利的对手。" },
      { name: "奥利凡德", desc: "魔杖店老板，很神奇。" },
      { name: "海德薇", desc: "哈利的白色猫头鹰，好朋友。" }
    ],
    vocabulary: [
      { word: "神奇", meaning: "像魔法一样，不可思议。" },
      { word: "珍贵", meaning: "很宝贵、很重要。" }
    ],
    quote: "“真正的高贵是善良，不是出身。”",
    lesson: "每个人都有属于自己的“魔法”。",
    reflection: "我最想去对角巷买______；我不喜欢马尔福因为______。",
    questions: [
      { q: "对角巷是什么地方？", options: ["哈利的家", "买魔法用品的商店街", "一个公园"], correct: 1 },
      { q: "哈利的魔杖是什么做的？", options: ["塑料", "冬青木和凤凰羽毛", "铁"], correct: 1 },
      { q: "哈利为什么在魔法世界很有名？", options: ["因为他很有钱", "因为他打败了伏地魔并活了下来", "因为他长得帅"], correct: 1 }
    ]
  },
  {
    id: 6,
    title: "第六章 9 又 3/4 站台",
    summary: "哈利去国王十字车站，找不到9 又 3/4 站台。遇到韦斯莱一家，妈妈教他穿过墙壁，成功上车。哈利认识了最好的朋友罗恩，也遇到了聪明的赫敏。",
    characters: [
      { name: "罗恩", desc: "红发、善良、有点害羞，哈利最好的朋友。" },
      { name: "赫敏", desc: "聪明、认真、爱学习，后来也成为好朋友。" },
      { name: "韦斯莱夫人", desc: "温柔善良，像妈妈一样。" }
    ],
    vocabulary: [
      { word: "友谊", meaning: "朋友之间互相帮助的感情。" },
      { word: "勇敢", meaning: "敢做别人不敢做的事。" }
    ],
    quote: "“新朋友会在你最需要的时候出现。”",
    lesson: "遇到困难不要慌，大胆试一试。",
    reflection: "我希望有______这样的朋友；我觉得最神奇的是______。",
    questions: [
      { q: "9 又 3/4 站台怎么进去？", options: ["刷卡", "穿过第9和第10站台之间的墙壁", "坐电梯"], correct: 1 },
      { q: "哈利在火车上认识了谁？", options: ["达力", "罗恩和赫敏", "斯内普"], correct: 1 },
      { q: "赫敏是什么样的女孩？", options: ["爱哭", "聪明、爱学习", "很懒惰"], correct: 1 }
    ]
  },
  {
    id: 7,
    title: "第七章 分院帽",
    summary: "新生到霍格沃茨，分院帽给大家分学院。哈利不想去斯莱特林（坏人多），帽子把他分到格兰芬多。大家一起吃大餐，认识老师们，开始魔法学校生活。",
    characters: [
      { name: "分院帽", desc: "会唱歌、会读心，分学院的帽子。" },
      { name: "斯内普", desc: "魔药课老师，看起来很凶，不喜欢哈利。" },
      { name: "邓布利多", desc: "校长，慈祥又厉害。" }
    ],
    vocabulary: [
      { word: "选择", meaning: "自己决定走哪条路。" },
      { word: "勇气", meaning: "心里不害怕，敢于做对的事。" }
    ],
    quote: "“真正重要的是你的选择，不是别人给你的标签。”",
    lesson: "勇敢、善良的人属于格兰芬多。",
    reflection: "我想进______学院，因为______；我觉得分院帽______。",
    questions: [
      { q: "分院帽把哈利分到哪个学院？", options: ["斯莱特林", "格兰芬多", "拉文克劳"], correct: 1 },
      { q: "哈利为什么不想去斯莱特林？", options: ["因为那里太远", "因为那里坏人多", "因为那里没饭吃"], correct: 1 },
      { q: "斯内普对哈利怎么样？", options: ["很友好", "故意刁难", "不认识他"], correct: 1 }
    ]
  },
  {
    id: 8,
    title: "第八章 魔药课老师",
    summary: "哈利开始上课，最喜欢飞行课，最讨厌斯内普的魔药课。斯内普故意刁难哈利，还扣格兰芬多分。哈利发现斯内普腿受伤，偷偷在查三头犬的秘密。",
    characters: [
      { name: "斯内普", desc: "冷酷、偏心，好像在隐瞒什么。" },
      { name: "赫敏", desc: "聪明，总能答对问题。" }
    ],
    vocabulary: [
      { word: "刁难", meaning: "故意为难别人。" },
      { word: "秘密", meaning: "不能随便告诉别人的事。" }
    ],
    quote: "“不要被别人的偏见打败。”",
    lesson: "遇到不公平，要勇敢面对。",
    reflection: "我觉得斯内普______；如果我是哈利，我会______。",
    questions: [
      { q: "哈利最讨厌什么课？", options: ["飞行课", "魔药课", "草药课"], correct: 1 },
      { q: "斯内普为什么对哈利不好？", options: ["因为哈利迟到", "因为他有偏见", "因为哈利成绩太好"], correct: 1 },
      { q: "三头犬在守护什么？", options: ["一堆金子", "魔法石的秘密", "学校大门"], correct: 1 }
    ]
  },
  {
    id: 9,
    title: "第九章 午夜决斗",
    summary: "马尔福约哈利午夜决斗，其实是陷阱，想让哈利被抓。哈利、罗恩、赫敏、纳威误闯三楼禁区，看到三头大狗，吓得逃跑。他们发现狗在守一扇活板门。",
    characters: [
      { name: "纳威", desc: "胆小、健忘，但很善良。" },
      { name: "三头犬", desc: "凶猛，守护魔法石。" }
    ],
    vocabulary: [
      { word: "陷阱", meaning: "骗人的坏圈套。" },
      { word: "禁区", meaning: "不能随便进去的地方。" }
    ],
    quote: "“不要轻易相信坏人的约定。”",
    lesson: "朋友要互相保护。",
    reflection: "我觉得马尔福______；我最害怕______。",
    questions: [
      { q: "马尔福为什么约哈利决斗？", options: ["想交朋友", "想让哈利被抓", "想比试魔法"], correct: 1 },
      { q: "他们在三楼看到了什么？", options: ["一个大蛋糕", "三头大狗", "海格"], correct: 1 },
      { q: "三头犬在守护什么？", options: ["活板门", "窗户", "楼梯"], correct: 0 }
    ]
  },
  {
    id: 10,
    title: "第十章 万圣节",
    summary: "万圣节，巨怪跑进学校。哈利和罗恩发现赫敏在女厕所哭，一起打败巨怪，三个人成为最好的朋友。",
    characters: [
      { name: "巨怪", desc: "笨笨的、很凶的怪物。" },
      { name: "三人组", desc: "哈利、罗恩、赫敏，正式成团！" }
    ],
    vocabulary: [
      { word: "团结", meaning: "大家一起努力，力量更大。" },
      { word: "帮助", meaning: "在别人困难时伸出手。" }
    ],
    quote: "“一起战胜困难，才是真朋友。”",
    lesson: "勇敢不是不害怕，是害怕也敢上。",
    reflection: "我最喜欢______的友谊；我觉得最勇敢的是______。",
    questions: [
      { q: "万圣节发生了什么危险？", options: ["停电了", "巨怪跑进学校", "没糖果了"], correct: 1 },
      { q: "谁和谁一起打败巨怪？", options: ["哈利和罗恩", "马尔福", "邓布利多"], correct: 0 },
      { q: "为什么他们成为好朋友？", options: ["因为一起上课", "因为一起战胜了巨怪", "因为都喜欢吃"], correct: 1 }
    ]
  },
  {
    id: 11,
    title: "第十一章 魁地奇球",
    summary: "哈利成为格兰芬多找球手，第一次比赛。有人用黑魔法想害哈利摔下来，赫敏发现是斯内普在念咒，放火干扰救了哈利。哈利抓到金色飞贼，赢得比赛！",
    characters: [
      { name: "伍德", desc: "魁地奇队长，认真又热血。" },
      { name: "金色飞贼", desc: "最小、最快的球，抓到就赢。" }
    ],
    vocabulary: [
      { word: "胜利", meaning: "努力后赢了比赛。" },
      { word: "守护", meaning: "保护朋友不受伤。" }
    ],
    quote: "“坚持就能赢，不要轻易放弃。”",
    lesson: "朋友会在危险时救你。",
    reflection: "我觉得魁地奇______；我最佩服______。",
    questions: [
      { q: "哈利在球队打什么位置？", options: ["守门员", "找球手", "击球手"], correct: 1 },
      { q: "谁想害哈利摔下扫帚？", options: ["罗恩", "斯内普（其实是奇洛，但当时以为是斯内普）", "海格"], correct: 1 },
      { q: "怎么赢得魁地奇比赛？", options: ["进球最多", "抓到金色飞贼", "把对方撞下去"], correct: 1 }
    ]
  },
  {
    id: 12,
    title: "第十二章 厄里斯魔镜",
    summary: "哈利得到隐形衣，半夜在学校闲逛，发现厄里斯魔镜。镜子里能看到心里最想要的东西：哈利看到爸爸妈妈。邓布利多告诉哈利：不要沉迷梦想，要好好生活。",
    characters: [
      { name: "邓布利多", desc: "温柔、智慧，像爷爷一样。" },
      { name: "隐形衣", desc: "穿上别人看不见，很神奇。" }
    ],
    vocabulary: [
      { word: "梦想", meaning: "心里最想实现的愿望。" },
      { word: "珍惜", meaning: "好好对待现在的生活。" }
    ],
    quote: "“不要活在梦里，要珍惜眼前的生活。”",
    lesson: "家人的爱永远在心里。",
    reflection: "我在魔镜里想看到______；我明白了______。",
    questions: [
      { q: "厄里斯魔镜能照出什么？", options: ["未来的样子", "心里最想要的东西", "怪物的样子"], correct: 1 },
      { q: "哈利在镜子里看到了谁？", options: ["达力", "他的爸爸妈妈", "伏地魔"], correct: 1 },
      { q: "邓布利多告诉哈利什么道理？", options: ["多照镜子", "不要沉迷梦想，要好好生活", "隐形衣很贵"], correct: 1 }
    ]
  },
  {
    id: 13,
    title: "第十三章 尼可·勒梅",
    summary: "三人组查到秘密：魔法石是尼可·勒梅做的，能长生不老、变金子。他们确定斯内普想偷石头，决定保护它。",
    characters: [
      { name: "尼可·勒梅", desc: "魔法石的主人，很老很厉害的炼金师。" }
    ],
    vocabulary: [
      { word: "守护", meaning: "保卫重要的东西不被抢走。" },
      { word: "正义", meaning: "做对的事，对抗坏人。" }
    ],
    quote: "“真正的勇敢是保护重要的东西。”",
    lesson: "团结能打败坏人。",
    reflection: "我觉得魔法石______；我要学习______。",
    questions: [
      { q: "魔法石有什么用？", options: ["变出糖果", "长生不老、变金子", "隐形"], correct: 1 },
      { q: "谁想偷魔法石？", options: ["海格", "斯内普（他们当时以为）", "罗恩"], correct: 1 },
      { q: "三个朋友决定做什么？", options: ["回家", "保护魔法石", "告诉马尔福"], correct: 1 }
    ]
  },
  {
    id: 14,
    title: "第十四章 挪威脊背龙诺伯",
    summary: "海格偷偷养了一条小龙诺伯，长得太快很危险。三人组帮海格把龙送给罗恩的哥哥查理，差点被抓。",
    characters: [
      { name: "诺伯", desc: "小龙，可爱但很危险。" },
      { name: "查理", desc: "罗恩的哥哥，研究龙。" }
    ],
    vocabulary: [
      { word: "危险", meaning: "可能会受伤、出事。" },
      { word: "帮助", meaning: "帮朋友解决麻烦。" }
    ],
    quote: "“不能养危险的动物，要遵守规则。”",
    lesson: "朋友有困难要帮忙，但要安全。",
    reflection: "我觉得小龙______；我明白了______。",
    questions: [
      { q: "海格养了什么？", options: ["一只猫", "一条小龙", "一只狗"], correct: 1 },
      { q: "为什么不能养小龙？", options: ["太贵了", "长得太快且很危险", "太吵了"], correct: 1 },
      { q: "最后小龙被送到哪里？", options: ["动物园", "罗马尼亚（给查理）", "森林里"], correct: 1 }
    ]
  },
  {
    id: 15,
    title: "终章 爱的力量",
    summary: "三人组闯过所有机关，发现真正想偷魔法石的是奇洛教授（被伏地魔附身）。哈利用爱的力量打败伏地魔，保护了魔法石。邓布利多告诉哈利：爱是最强大的魔法。格兰芬多赢得学院杯，哈利度过最棒的一年。",
    characters: [
      { name: "奇洛教授", desc: "被伏地魔附身的坏老师。" },
      { name: "哈利", desc: "用爱的力量保护了大家。" }
    ],
    vocabulary: [
      { word: "奇迹", meaning: "极难发生的好事。" },
      { word: "永恒", meaning: "永远存在。" }
    ],
    quote: "“爱是最强大的魔法。”",
    lesson: "爱与勇气，是世界上最强大的魔法。",
    reflection: "全书我最喜欢的部分是______；因为______。",
    questions: [
      { q: "真正想偷魔法石的是谁？", options: ["斯内普", "奇洛教授", "马尔福"], correct: 1 },
      { q: "哈利靠什么打败了伏地魔？", options: ["强大的咒语", "妈妈留下的爱的力量", "海格的帮助"], correct: 1 },
      { q: "最后哪个学院赢得了学院杯？", options: ["斯莱特林", "格兰芬多", "赫奇帕奇"], correct: 1 }
    ]
  }
];

const RANKS = [
  { min: 0, name: "麻瓜少年", icon: "🏠" },
  { min: 30, name: "魔法学徒", icon: "🪄" },
  { min: 60, name: "霍格沃茨新生", icon: "🏰" },
  { min: 90, name: "魁地奇高手", icon: "🧹" },
  { min: 120, name: "大巫师", icon: "🧙‍♂️" }
];

export default function App() {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [points, setPoints] = useState(0);
  const [unlockedChapters, setUnlockedChapters] = useState([1]);
  const [quizResults, setQuizResults] = useState<Record<number, boolean[]>>({});
  const [activeTab, setActiveTab] = useState<'summary' | 'characters' | 'quiz' | 'reflection'>('summary');
  const [showReward, setShowReward] = useState(false);
  const [lastEarned, setLastEarned] = useState(0);
  const [reflectionInputs, setReflectionInputs] = useState<Record<number, string>>({});

  const currentChapter = CHAPTERS[currentChapterIdx];
  const currentRank = RANKS.reduce((prev, curr) => (points >= curr.min ? curr : prev), RANKS[0]);

  // 处理答题
  const handleAnswer = (qIdx: number, optIdx: number) => {
    if (quizResults[currentChapter.id]?.[qIdx] !== undefined) return;

    const isCorrect = optIdx === currentChapter.questions[qIdx].correct;
    const newResults = { ...(quizResults[currentChapter.id] || []) };
    newResults[qIdx] = isCorrect;

    setQuizResults({
      ...quizResults,
      [currentChapter.id]: Object.values(newResults)
    });

    if (isCorrect) {
      setPoints(prev => prev + 10);
      setLastEarned(10);
      setShowReward(true);
      setTimeout(() => setShowReward(false), 2000);
    }
  };

  // 处理读后感提交
  const handleReflectionSubmit = () => {
    if (!reflectionInputs[currentChapter.id]) return;
    
    // 提交读后感也奖励积分
    setPoints(prev => prev + 20);
    setLastEarned(20);
    setShowReward(true);
    setTimeout(() => setShowReward(false), 2000);
    
    // 标记为已提交（简单处理，清空输入框或显示成功状态）
    alert("魔法日记已保存！获得 20 金加隆奖励。");
  };

  // 检查是否完成本章所有题目并解锁下一章
  useEffect(() => {
    const results = quizResults[currentChapter.id];
    if (results && results.length === currentChapter.questions.length && results.every(r => r === true)) {
      if (currentChapterIdx < CHAPTERS.length - 1) {
        const nextId = CHAPTERS[currentChapterIdx + 1].id;
        if (!unlockedChapters.includes(nextId)) {
          setUnlockedChapters(prev => [...prev, nextId]);
        }
      }
    }
  }, [quizResults, currentChapterIdx]);

  return (
    <div className="min-h-screen bg-[#fdf6e3] text-[#5c4b37] font-sans selection:bg-amber-200">
      {/* 顶部导航栏 */}
      <header className="bg-[#3e2723] text-white p-4 shadow-lg sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="text-amber-400" />
          <h1 className="text-xl font-bold tracking-tight">霍格沃茨精读冒险</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#5d4037] px-3 py-1 rounded-full flex items-center gap-2 border border-amber-900/30">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="font-mono font-bold">{points}</span>
          </div>
          <div className="bg-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <span>{currentRank.icon}</span>
            <span>{currentRank.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        {/* 章节选择 */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {CHAPTERS.map((ch, idx) => {
            const isUnlocked = unlockedChapters.includes(ch.id);
            const isCurrent = currentChapterIdx === idx;
            return (
              <button
                key={ch.id}
                onClick={() => isUnlocked && setCurrentChapterIdx(idx)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  isCurrent 
                    ? 'bg-amber-600 text-white shadow-md scale-105' 
                    : isUnlocked 
                      ? 'bg-white text-amber-900 hover:bg-amber-50 border border-amber-200' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                }`}
              >
                {!isUnlocked && <Lock size={14} />}
                <span className="whitespace-nowrap">第{ch.id}章</span>
              </button>
            );
          })}
        </div>

        {/* 内容卡片 */}
        <motion.div 
          key={currentChapter.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100"
        >
          {/* 章节标题 */}
          <div className="bg-amber-50 p-6 border-b border-amber-100">
            <h2 className="text-2xl font-bold text-amber-900 mb-2">{currentChapter.title}</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('summary')}
                className={`flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'summary' ? 'text-amber-700 border-b-2 border-amber-700' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <BookOpen size={16} /> 故事概括
              </button>
              <button 
                onClick={() => setActiveTab('characters')}
                className={`flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'characters' ? 'text-amber-700 border-b-2 border-amber-700' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Users size={16} /> 登场人物
              </button>
              <button 
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'quiz' ? 'text-amber-700 border-b-2 border-amber-700' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Trophy size={16} /> 魔法测试
              </button>
              <button 
                onClick={() => setActiveTab('reflection')}
                className={`flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'reflection' ? 'text-amber-700 border-b-2 border-amber-700' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Star size={16} /> 读后感
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'summary' && (
                <motion.div 
                  key="summary"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <p className="text-lg leading-relaxed text-gray-700 first-letter:text-3xl first-letter:font-bold first-letter:text-amber-700">
                    {currentChapter.summary}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-amber-50/50 p-4 rounded-xl border border-dashed border-amber-200">
                      <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                        <Star size={16} className="fill-amber-400 text-amber-400" /> 好词好句
                      </h4>
                      <ul className="space-y-2">
                        {currentChapter.vocabulary.map((v, i) => (
                          <li key={i} className="text-sm">
                            <span className="font-bold text-amber-900">【{v.word}】</span>: {v.meaning}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 italic text-gray-600 text-sm border-t border-amber-100 pt-2">
                        {currentChapter.quote}
                      </p>
                    </div>
                    <div className="bg-green-50/50 p-4 rounded-xl border border-dashed border-green-200">
                      <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                        <Award size={16} className="text-green-600" /> 中心道理
                      </h4>
                      <p className="text-green-900 font-medium">{currentChapter.lesson}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'characters' && (
                <motion.div 
                  key="characters"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  {currentChapter.characters.map((char, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white border border-amber-100 shadow-sm hover:shadow-md transition-shadow flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold shrink-0">
                        {char.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-900">{char.name}</h4>
                        <p className="text-sm text-gray-600">{char.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'quiz' && (
                <motion.div 
                  key="quiz"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-8"
                >
                  <div className="bg-amber-50 p-4 rounded-lg text-amber-800 text-sm font-medium">
                    答对所有题目即可解锁下一章！每题奖励 10 金加隆。
                  </div>
                  {currentChapter.questions.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-3">
                      <h4 className="font-bold text-gray-800 flex items-center gap-2">
                        <span className="bg-amber-200 text-amber-900 w-6 h-6 rounded-full flex items-center justify-center text-xs">{qIdx + 1}</span>
                        {q.q}
                      </h4>
                      <div className="grid gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isAnswered = quizResults[currentChapter.id]?.[qIdx] !== undefined;
                          const isCorrect = optIdx === q.correct;
                          
                          return (
                            <button
                              key={optIdx}
                              disabled={isAnswered}
                              onClick={() => handleAnswer(qIdx, optIdx)}
                              className={`text-left p-3 rounded-lg border transition-all flex justify-between items-center ${
                                isAnswered 
                                  ? isCorrect 
                                    ? 'bg-green-50 border-green-200 text-green-700' 
                                    : 'bg-gray-50 border-gray-200 text-gray-400'
                                  : 'bg-white border-amber-100 hover:border-amber-400 hover:bg-amber-50'
                              }`}
                            >
                              <span>{opt}</span>
                              {isAnswered && isCorrect && <CheckCircle2 size={18} className="text-green-500" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'reflection' && (
                <motion.div 
                  key="reflection"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-4">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2">
                      <BookOpen size={18} /> 魔法日记
                    </h4>
                    <p className="text-gray-700 font-medium">
                      {currentChapter.reflection || "写下你读完这一章的感受吧..."}
                    </p>
                    <textarea 
                      value={reflectionInputs[currentChapter.id] || ''}
                      onChange={(e) => setReflectionInputs({...reflectionInputs, [currentChapter.id]: e.target.value})}
                      placeholder="在这里输入你的想法..."
                      className="w-full h-32 p-4 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none resize-none text-gray-700"
                    />
                    <button 
                      onClick={handleReflectionSubmit}
                      disabled={!reflectionInputs[currentChapter.id]}
                      className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      提交日记并领取奖励
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 底部导航 */}
          <div className="bg-gray-50 p-4 border-t border-amber-100 flex justify-between items-center">
            <button 
              disabled={currentChapterIdx === 0}
              onClick={() => setCurrentChapterIdx(prev => prev - 1)}
              className="flex items-center gap-1 text-sm font-bold text-amber-800 disabled:opacity-30"
            >
              <ChevronLeft size={18} /> 上一章
            </button>
            <div className="text-xs text-gray-400 font-mono">
              CHAPTER {currentChapter.id} / {CHAPTERS.length}
            </div>
            <button 
              disabled={currentChapterIdx === CHAPTERS.length - 1 || !unlockedChapters.includes(CHAPTERS[currentChapterIdx + 1]?.id)}
              onClick={() => setCurrentChapterIdx(prev => prev + 1)}
              className="flex items-center gap-1 text-sm font-bold text-amber-800 disabled:opacity-30"
            >
              下一章 <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* 底部装饰 */}
        <footer className="mt-12 text-center text-gray-400 text-sm space-y-2">
          <p>“选择善良，比拥有魔法更重要。”</p>
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-1"><Trophy size={14} /> 积分制</div>
            <div className="flex items-center gap-1"><Sparkles size={14} /> 互动式</div>
            <div className="flex items-center gap-1"><BookOpen size={14} /> 精读笔记</div>
          </div>
        </footer>
      </main>

      {/* 奖励浮层 */}
      <AnimatePresence>
        {showReward && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border-2 border-white"
          >
            <Sparkles className="animate-pulse" />
            <span className="font-bold text-lg">获得 {lastEarned} 金加隆！</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
