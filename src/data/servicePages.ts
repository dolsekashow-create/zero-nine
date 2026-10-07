/** One landing page per service: /services/<slug>/ and /en/services/<slug>/ */
type Copy = {
  name: string;
  title: string; // <title>
  desc: string; // meta description
  h1: string;
  intro: string;
  features: [string, string][];
  faq: [string, string][];
};
export type ServicePage = { slug: string; icon: string; from?: number; ar: Copy; en: Copy };

export const servicePages: ServicePage[] = [
  {
    slug: 'web-development',
    icon: 'pyramid',
    from: 2500,
    ar: {
      name: 'تصميم وتطوير المواقع',
      title: 'تصميم مواقع في مصر | تصميم موقع شركة احترافي - Zero-Nine',
      desc: 'تصميم وبرمجة مواقع شركات وأنشطة تجارية في مصر: سريعة جداً، متجاوبة مع الموبايل، ومظبوطة لجوجل. التسليم من 2 لـ 7 أيام وملكية كاملة للكود.',
      h1: 'تصميم مواقع احترافية لشركتك ونشاطك',
      intro: 'موقعك هو أول حاجة العميل بيشوفها. بنصمم ونبرمج مواقع تعريفية ومواقع شركات سريعة جداً، شكلها فخم على الموبايل والكمبيوتر، ومبنية عشان تظهر في جوجل وتحوّل الزوار لرسائل واتساب ومكالمات.',
      features: [
        ['تصميم مخصص لنشاطك', 'مش قالب مكرر. تصميم بهوية علامتك التجارية تشوفه وتوافق عليه قبل البرمجة.'],
        ['سرعة تحميل عالية', 'صفحات خفيفة بتفتح في ثواني حتى على باقة الموبايل، وده بيفرق مع جوجل ومع العميل.'],
        ['متجاوب مع كل الشاشات', 'شكل مظبوط على الموبايل والتابلت والكمبيوتر.'],
        ['SEO من أول يوم', 'عناوين ووصف وبيانات منظمة وخريطة موقع، عشان جوجل يفهم موقعك ويظهّره.'],
        ['واتساب ونماذج تواصل', 'أزرار تواصل في كل مكان برسائل جاهزة، عشان العميل يكلمك بضغطة.'],
        ['لوحة تحكم سهلة', 'تعدّل النصوص والصور والأسعار بنفسك من غير خبرة برمجية.'],
      ],
      faq: [
        ['بكام تصميم موقع شركة؟', 'باقة بيزك تبدأ من 2,500 ج.م وتشمل حتى 5 صفحات واستضافة سنة. وتقدر تحسب تكلفة مشروعك بالظبط من حاسبة السعر في الصفحة الرئيسية.'],
        ['تصميم الموقع بياخد قد إيه؟', 'الموقع التعريفي من 2 لـ 3 أيام، ومواقع الشركات الأكبر بنتفق على جدول واضح قبل البدء.'],
        ['هل الموقع هيظهر في جوجل؟', 'بنبني الموقع بكل أساسيات الـ SEO التقنية ونساعدك تسجّله في Google Search Console، والظهور بيتحسن مع الوقت والمحتوى.'],
      ],
    },
    en: {
      name: 'Website design & development',
      title: 'Website Design in Egypt | Professional Company Websites - Zero-Nine',
      desc: 'Fast, mobile-friendly, SEO-ready websites for companies and businesses in Egypt. Delivered in 2-7 days with full code ownership.',
      h1: 'Professional websites for your company',
      intro: 'Your website is the first thing customers see. We design and build fast business and company websites that look premium on every screen, are built to rank on Google, and turn visitors into WhatsApp messages and calls.',
      features: [
        ['Custom design', 'Not a recycled template: a design built around your brand that you approve before we code.'],
        ['Very fast loading', 'Lightweight pages that open in seconds even on mobile data, which matters for Google and for customers.'],
        ['Works on every screen', 'Looks right on phones, tablets and desktops.'],
        ['SEO from day one', 'Titles, descriptions, structured data and a sitemap so Google understands and shows your site.'],
        ['WhatsApp & contact forms', 'Contact buttons everywhere with ready messages, so customers reach you in one tap.'],
        ['Easy admin panel', 'Edit text, images and prices yourself, no coding needed.'],
      ],
      faq: [
        ['How much does a company website cost?', 'The Basic package starts at 2,500 EGP with up to 5 pages and a year of hosting. Use the price calculator on the home page for an exact estimate.'],
        ['How long does it take?', 'A business website takes 2-3 days; larger company sites get a clear timeline agreed before we start.'],
        ['Will my site show up on Google?', 'We build in all technical SEO essentials and help you register in Google Search Console; rankings improve over time with content.'],
      ],
    },
  },
  {
    slug: 'online-store',
    icon: 'cart',
    from: 4500,
    ar: {
      name: 'تصميم المتاجر الإلكترونية',
      title: 'تصميم متجر إلكتروني في مصر | دفع إلكتروني وشحن - Zero-Nine',
      desc: 'تصميم متجر إلكتروني متكامل في مصر بدفع أونلاين وربط مع شركات الشحن ولوحة تحكم لإدارة المنتجات والطلبات. التسليم من 3 لـ 5 أيام.',
      h1: 'تصميم متجر إلكتروني يبيعلك 24 ساعة',
      intro: 'حوّل نشاطك لمتجر أونلاين بيستقبل طلبات ومدفوعات وانت نايم. متجر سريع وسهل في الشراء من الموبايل، فيه دفع إلكتروني وربط شحن ولوحة تحكم تدير منها كل حاجة.',
      features: [
        ['منتجات غير محدودة', 'ضيف أقسام ومنتجات بصور ومقاسات وألوان من غير حد.'],
        ['دفع إلكتروني', 'فيزا وميزة ومحافظ إلكترونية، بالإضافة للدفع عند الاستلام.'],
        ['ربط مع شركات الشحن', 'تتبع الطلبات وحساب مصاريف الشحن حسب المحافظة.'],
        ['لوحة تحكم كاملة', 'إدارة المنتجات والطلبات والعملاء والكوبونات من مكان واحد.'],
        ['تقارير مبيعات', 'تعرف بتبيع إيه وإمتى وأكتر منتج مطلوب.'],
        ['تجربة شراء سريعة', 'خطوات شراء قليلة وواضحة على الموبايل عشان العميل ما يسيبش السلة.'],
      ],
      faq: [
        ['بكام تصميم متجر إلكتروني؟', 'باقة برو للمتاجر تبدأ من 4,500 ج.م وتشمل منتجات غير محدودة ودفع إلكتروني وربط شحن ولوحة تحكم.'],
        ['هل أقدر أضيف المنتجات بنفسي؟', 'أيوه، من لوحة التحكم تضيف وتعدّل المنتجات والأسعار والصور بسهولة.'],
        ['إيه طرق الدفع المتاحة في المتجر؟', 'بنربط بوابة دفع إلكتروني للكروت والمحافظ، ومعاها الدفع عند الاستلام لو حابب.'],
      ],
    },
    en: {
      name: 'Online store design',
      title: 'E-commerce Store Design in Egypt | Payments & Shipping - Zero-Nine',
      desc: 'Complete online stores in Egypt with online payments, shipping integration and a dashboard to manage products and orders. Delivered in 3-5 days.',
      h1: 'An online store that sells for you 24/7',
      intro: 'Turn your business into an online store that takes orders and payments while you sleep: fast, easy to buy from on mobile, with payments, shipping and a dashboard to run everything.',
      features: [
        ['Unlimited products', 'Categories and products with photos, sizes and colors, no limits.'],
        ['Online payments', 'Cards and mobile wallets, plus cash on delivery.'],
        ['Shipping integration', 'Order tracking and shipping fees by governorate.'],
        ['Full dashboard', 'Manage products, orders, customers and coupons in one place.'],
        ['Sales reports', 'Know what sells, when, and your best products.'],
        ['Fast checkout', 'Few, clear steps on mobile so customers do not abandon the cart.'],
      ],
      faq: [
        ['How much does an online store cost?', 'The Pro store package starts at 4,500 EGP with unlimited products, online payments, shipping and a dashboard.'],
        ['Can I add products myself?', 'Yes, you add and edit products, prices and photos from the dashboard.'],
        ['Which payment methods are supported?', 'We integrate a payment gateway for cards and wallets, plus cash on delivery if you want it.'],
      ],
    },
  },
  {
    slug: 'app-development',
    icon: 'phone',
    ar: {
      name: 'تطوير تطبيقات الموبايل',
      title: 'تطوير تطبيقات موبايل في مصر | iOS و Android - Zero-Nine',
      desc: 'برمجة تطبيقات موبايل لـ iOS و Android لشركتك أو مشروعك، بتصميم عصري وأداء عالي ولوحة تحكم لإدارة المحتوى.',
      h1: 'تطبيق موبايل لشركتك على iOS و Android',
      intro: 'لو عملاءك بيرجعولك كتير، تطبيق على موبايلهم بيقرّبك منهم. بنصمم ونطوّر تطبيقات سريعة وسهلة الاستخدام، من الفكرة لحد النشر على المتاجر.',
      features: [
        ['تطبيق واحد لنظامين', 'نفس التطبيق شغال على آيفون وأندرويد، فالتكلفة والوقت أقل.'],
        ['تصميم UI/UX احترافي', 'شاشات سهلة وواضحة ومتناسقة مع هوية علامتك.'],
        ['إشعارات للعملاء', 'ابعت عروضك وتحديثاتك مباشرة لموبايل العميل.'],
        ['لوحة تحكم ويب', 'تدير المحتوى والمستخدمين والطلبات من الكمبيوتر.'],
        ['ربط مع موقعك', 'التطبيق والموقع بيستخدموا نفس البيانات.'],
        ['النشر على المتاجر', 'بنساعدك تنشر التطبيق على Google Play و App Store.'],
      ],
      faq: [
        ['بكام عمل تطبيق موبايل؟', 'التكلفة بتعتمد على الشاشات والمميزات. ابعتلنا فكرتك على واتساب ونرد عليك بعرض سعر واضح.'],
        ['التطبيق بياخد قد إيه؟', 'بنقسم الشغل لمراحل ونتفق على جدول زمني واضح حسب حجم التطبيق قبل البدء.'],
        ['هل التطبيق بيشتغل على آيفون وأندرويد؟', 'أيوه، بنطوّر تطبيق واحد شغال على النظامين.'],
      ],
    },
    en: {
      name: 'Mobile app development',
      title: 'Mobile App Development in Egypt | iOS & Android - Zero-Nine',
      desc: 'iOS and Android apps for your company or startup, with modern design, high performance and an admin dashboard.',
      h1: 'A mobile app for your business on iOS and Android',
      intro: 'If your customers come back often, an app on their phone keeps you close. We design and build fast, easy apps from idea to store launch.',
      features: [
        ['One app, two platforms', 'The same app runs on iPhone and Android, saving time and cost.'],
        ['Professional UI/UX', 'Clear, consistent screens that match your brand.'],
        ['Push notifications', 'Send offers and updates straight to customers\' phones.'],
        ['Web admin panel', 'Manage content, users and orders from your computer.'],
        ['Connected to your site', 'App and website share the same data.'],
        ['Store publishing', 'We help you publish on Google Play and the App Store.'],
      ],
      faq: [
        ['How much does an app cost?', 'It depends on screens and features. Send us your idea on WhatsApp and we will reply with a clear quote.'],
        ['How long does it take?', 'We split the work into milestones with a timeline agreed before we start.'],
        ['Does it work on iPhone and Android?', 'Yes, we build one app that runs on both.'],
      ],
    },
  },
  {
    slug: 'brand-identity',
    icon: 'eye',
    ar: {
      name: 'تصميم الهوية البصرية',
      title: 'تصميم هوية بصرية ولوجو في مصر - Zero-Nine',
      desc: 'تصميم لوجو وهوية بصرية كاملة: ألوان وخطوط ودليل استخدام وتصميمات سوشيال ميديا، تعكس قصة علامتك التجارية.',
      h1: 'هوية بصرية تخلّي علامتك تتفتكر',
      intro: 'العميل بيحكم على نشاطك من شكله قبل ما يجرّبه. بنصمم لوجو وهوية بصرية كاملة متناسقة في كل مكان: الموقع والسوشيال ميديا والمطبوعات.',
      features: [
        ['تصميم لوجو', 'أكتر من فكرة وتعديلات لحد ما توصل للشكل المناسب.'],
        ['ألوان وخطوط', 'نظام ألوان وخطوط واضح يميّز علامتك.'],
        ['دليل الهوية', 'ملف بيشرح إزاي تستخدم اللوجو والألوان صح.'],
        ['تصميمات سوشيال ميديا', 'قوالب بوستات وكفرات بنفس الهوية.'],
        ['مطبوعات', 'كروت شخصية وأوراق رسمية وغلاف منتجات.'],
        ['كل الصيغ', 'ملفات جاهزة للطباعة والويب بكل المقاسات.'],
      ],
      faq: [
        ['إيه الفرق بين اللوجو والهوية البصرية؟', 'اللوجو جزء من الهوية. الهوية بتشمل الألوان والخطوط وطريقة استخدامهم في كل حاجة بتطلع باسمك.'],
        ['بستلم الملفات بأنهي صيغ؟', 'بنسلّمك ملفات مفتوحة وجاهزة للطباعة والويب (AI و PDF و PNG و SVG).'],
        ['ينفع أعمل موقع وهوية مع بعض؟', 'أيوه، وده أفضل عشان الموقع يطلع متناسق مع الهوية من الأول.'],
      ],
    },
    en: {
      name: 'Brand identity design',
      title: 'Logo & Brand Identity Design in Egypt - Zero-Nine',
      desc: 'Logo and complete brand identity: colors, typography, guidelines and social media designs that tell your brand story.',
      h1: 'A brand identity people remember',
      intro: 'Customers judge your business by how it looks before they try it. We design logos and full identities that stay consistent on your website, social media and print.',
      features: [
        ['Logo design', 'Several concepts and revisions until it is right.'],
        ['Colors & typography', 'A clear system that sets your brand apart.'],
        ['Brand guidelines', 'A guide to using the logo and colors correctly.'],
        ['Social media designs', 'Post and cover templates in your identity.'],
        ['Print', 'Business cards, stationery and packaging.'],
        ['Every format', 'Print and web-ready files in all sizes.'],
      ],
      faq: [
        ['Logo vs. brand identity?', 'The logo is one part. The identity covers colors, type and how they are used on everything with your name.'],
        ['Which file formats do I get?', 'Editable, print and web-ready files (AI, PDF, PNG, SVG).'],
        ['Can I do a website and identity together?', 'Yes, and it is better, so the site matches the identity from the start.'],
      ],
    },
  },
  {
    slug: 'ui-ux-design',
    icon: 'lotus',
    ar: {
      name: 'تصميم واجهات UI/UX',
      title: 'تصميم واجهات المستخدم UI/UX في مصر - Zero-Nine',
      desc: 'تصميم واجهات وتجربة مستخدم للمواقع والتطبيقات: نماذج تفاعلية وتصميم سهل الاستخدام يحوّل الزوار لعملاء.',
      h1: 'تصميم UI/UX يخلّي الاستخدام سهل والبيع أسهل',
      intro: 'تصميم حلو مش كفاية لو العميل تايه. بنصمم واجهات واضحة ورحلة استخدام بسيطة، وبنختبرها في نموذج تفاعلي قبل ما تتبرمج.',
      features: [
        ['دراسة المستخدم', 'نفهم مين عميلك وبيدوّر على إيه.'],
        ['هيكل الصفحات', 'ترتيب المحتوى والأقسام بشكل منطقي.'],
        ['نموذج تفاعلي', 'تجرّب التصميم كأنه حقيقي قبل البرمجة.'],
        ['تصميم بصري فخم', 'واجهات بهوية علامتك ومتسقة في كل الشاشات.'],
        ['نظام تصميم', 'مكونات جاهزة تسهّل أي تطوير بعدين.'],
        ['تسليم للمطورين', 'ملفات Figma منظمة بكل المقاسات.'],
      ],
      faq: [
        ['إيه الفرق بين UI و UX؟', 'الـ UX هو سهولة الاستخدام ورحلة العميل، والـ UI هو الشكل البصري للشاشات.'],
        ['بستلم إيه في الآخر؟', 'ملفات Figma كاملة ونموذج تفاعلي جاهز للتطوير.'],
        ['ينفع تصمموا بس وأنا أبرمج؟', 'أيوه، أو نكمّل التطوير معاك لو حابب.'],
      ],
    },
    en: {
      name: 'UI / UX design',
      title: 'UI/UX Design in Egypt - Zero-Nine',
      desc: 'User interface and experience design for websites and apps: interactive prototypes and easy-to-use design that converts visitors.',
      h1: 'UI/UX design that makes using, and buying, easy',
      intro: 'A beautiful design is not enough if users get lost. We design clear interfaces and simple journeys, and test them in an interactive prototype before development.',
      features: [
        ['User research', 'We learn who your customer is and what they need.'],
        ['Information architecture', 'Content and sections in a logical order.'],
        ['Interactive prototype', 'Try the design like the real thing before coding.'],
        ['Premium visual design', 'On-brand interfaces, consistent across screens.'],
        ['Design system', 'Reusable components that speed up future work.'],
        ['Developer handoff', 'Organized Figma files in every size.'],
      ],
      faq: [
        ['UI vs. UX?', 'UX is usability and the customer journey; UI is how the screens look.'],
        ['What do I receive?', 'Complete Figma files and a development-ready interactive prototype.'],
        ['Can you only design while I build?', 'Yes, or we can handle development too.'],
      ],
    },
  },
  {
    slug: 'digital-marketing',
    icon: 'ankh',
    ar: {
      name: 'التسويق الرقمي',
      title: 'تسويق إلكتروني وإدارة سوشيال ميديا في مصر - Zero-Nine',
      desc: 'حملات إعلانية ممولة على فيسبوك وإنستجرام وجوجل، وإدارة صفحات سوشيال ميديا، وتحسين ظهورك في نتائج البحث.',
      h1: 'تسويق رقمي يجيبلك عملاء مش لايكات بس',
      intro: 'موقع حلو من غير زوار زي محل في شارع فاضي. بنوصّلك لجمهورك المستهدف بحملات مدروسة ومحتوى بيبيع، وبنقيس النتيجة بالأرقام.',
      features: [
        ['إعلانات ممولة', 'حملات على فيسبوك وإنستجرام وجوجل موجّهة لعملاءك بالظبط.'],
        ['إدارة السوشيال ميديا', 'خطة محتوى وتصميمات ونشر منتظم.'],
        ['تحسين محركات البحث', 'محتوى وتحسينات تخلّي موقعك يظهر في جوجل.'],
        ['Google Business', 'تظبيط ظهورك على خرائط جوجل في منطقتك.'],
        ['تتبع النتائج', 'ربط Pixel وAnalytics عشان تعرف كل جنيه راح فين.'],
        ['تقارير شهرية', 'أرقام واضحة: وصول ورسائل ومبيعات.'],
      ],
      faq: [
        ['أبدأ بميزانية إعلانات قد إيه؟', 'بنقترح ميزانية مناسبة لنشاطك وهدفك، ونبدأ صغير ونكبّر اللي بيجيب نتيجة.'],
        ['إمتى أشوف نتيجة؟', 'الإعلانات الممولة بتجيب نتايج من أول أيام، والـ SEO بياخد أسابيع لشهور.'],
        ['هل بتعملوا المحتوى والتصميمات؟', 'أيوه، المحتوى والتصميمات جزء من باقة إدارة السوشيال ميديا.'],
      ],
    },
    en: {
      name: 'Digital marketing',
      title: 'Digital Marketing & Social Media Management in Egypt - Zero-Nine',
      desc: 'Paid campaigns on Facebook, Instagram and Google, social media management and search engine optimization.',
      h1: 'Digital marketing that brings customers, not just likes',
      intro: 'A great website with no visitors is a shop on an empty street. We reach your target audience with focused campaigns and content that sells, and measure results in numbers.',
      features: [
        ['Paid ads', 'Facebook, Instagram and Google campaigns aimed at exactly your customers.'],
        ['Social media management', 'Content plan, designs and consistent posting.'],
        ['SEO', 'Content and improvements that get your site found on Google.'],
        ['Google Business', 'Set up your presence on Google Maps in your area.'],
        ['Tracking', 'Pixel and Analytics so you know where every pound goes.'],
        ['Monthly reports', 'Clear numbers: reach, messages and sales.'],
      ],
      faq: [
        ['What ad budget should I start with?', 'We suggest a budget that fits your goal, start small and scale what works.'],
        ['When will I see results?', 'Paid ads bring results within days; SEO takes weeks to months.'],
        ['Do you create the content?', 'Yes, content and designs are part of social media management.'],
      ],
    },
  },
];
