/* ============================================================
   CAPABILITIES (Arabic) — single source of truth for "ما نصنعه".
   Voice: fus'ha, fluent, in the spirit of «ساقية» (medium register).
   References kept in their original (Latin) form, as is common
   in Arabic academic citation.
   ============================================================ */
window.CAPABILITIES = [
  {
    id:'experience-strategy', no:'01', size:'c-1', dark:true,
    title:'استراتيجية التجربة',
    tag:'استراتيجية · اكتشاف',
    lead:'تصميمُ تجربةٍ متكاملة يبدأ من مهمةٍ حقيقيةٍ يسعى العميل لإنجازها، ويلتزم بالنتائج لا بالمُخرجات.',
    basis:'يستند إلى اقتصاد التجربة (Pine & Gilmore)، والمهامِّ المطلوب إنجازها (Christensen؛ Ulwick)، والاكتشافِ القائم على النتائج (Torres؛ Seiden).',
    cites:[['اقتصاد التجربة','Pine & Gilmore، 1998'],['المهام المطلوب إنجازها','Christensen، 2016'],['النتائج قبل المُخرجات','Seiden، 2019']],
    approach:[
      'نُجري مقابلات الاكتشاف حتى نبلغ الحاجة الحقيقية التي لم تُلبَّ بعد',
      'نرسم خريطة الفرص قبل أن نُثبّت أيَّ حل',
      'نضع مبادئ التجربة و«نجمًا شماليًّا» للنتيجة',
      'نتوسّع في الاستكشاف ثم نتقارب نحو الالتزام، على نهج الماسة المزدوجة'
    ],
    deliverables:['بيان الحاجة وخريطة الفرص','مبادئ التجربة','مقياس النجم الشمالي وشجرة النتائج','فرضيات حلولٍ مُرتّبة بالأولوية'],
    references:[
      'Pine & Gilmore — “Welcome to the Experience Economy”, HBR (1998)',
      'Christensen et al. — Competing Against Luck (2016)',
      'Ulwick — Jobs to be Done: Theory to Practice (2016)',
      'Torres — Continuous Discovery Habits (2021)',
      'Seiden — Outcomes Over Output (2019)'
    ]
  },
  {
    id:'service-catalog', no:'02', size:'c-2',
    title:'كتالوج الخدمات',
    tag:'تصميم الخدمات',
    lead:'التجربةُ مُقسَّمةٌ إلى خدماتٍ مُسمّاةٍ قابلةٍ لإعادة الاستخدام: ماذا نُقدّم، ولِمن، وكيف يُسلَّم.',
    basis:'يرتكز على مخطَّط الخدمة (Shostack)، وممارسةِ تصميم الخدمات (Stickdorn وآخرون)، وإدارةِ محفظة الخدمات (ITIL 4).',
    cites:[['مخطط الخدمة','Shostack، 1984'],['تصميم الخدمات','Stickdorn، 2018'],['كتالوج الخدمة','ITIL 4']],
    approach:[
      'نرسم مخطَّط الخدمة: الواجهةَ الأمامية والخلفية وخطَّ الرؤية',
      'نُنمذِج تصنيف الخدمات والكتالوج',
      'نُحدّد الملكية (RACI) ومستوياتِ الخدمة',
      'ننطلق من منطق هيمنة الخدمة، فكلُّ ما يُقدَّم خدمة'
    ],
    deliverables:['مخططات الخدمة','كتالوج وتصنيف الخدمات','مصفوفة الملكية واتفاقيات مستوى الخدمة'],
    references:[
      'Shostack — “Designing Services That Deliver”, HBR (1984)',
      'Stickdorn, Hormess, Lawrence & Schneider — This Is Service Design Doing (2018)',
      'Vargo & Lusch — “Evolving to a New Dominant Logic for Marketing” (2004)',
      'ITIL 4 — Service Catalogue Management'
    ]
  },
  {
    id:'system-api-design', no:'03', size:'c-3',
    title:'تصميم الأنظمة والواجهات البرمجية',
    tag:'معمارية',
    lead:'عمودٌ فقريٌّ من الخدمات المصغّرة بعقودٍ نظيفةٍ تبدأ من الواجهة البرمجية؛ مُنمذَجٌ حول الأعمال، مبنيٌّ ليتطوّر.',
    basis:'متجذِّرٌ في التصميم المُوجَّه بالمجال (Evans)، وأنماطِ الخدمات المصغّرة (Newman؛ Richardson)، وREST (Fielding)، وقانونِ (كونواي).',
    cites:[['التصميم الموجَّه بالمجال','Evans، 2003'],['REST','Fielding، 2000'],['قانون كونواي','1968']],
    approach:[
      'نُحدّد السياقات المحدودة ونرسم خرائط السياق من نموذج المجال',
      'نُصمّم بدءًا من الواجهة البرمجية بعقود OpenAPI مُؤرّخةِ الإصدارات',
      'نُوثّق قرارات المعمارية (ADRs) لإبراز المفاضلات',
      'نُوائم حدود الخدمات والفِرق، على قانون (كونواي) و(Team Topologies)'
    ],
    deliverables:['خريطة السياق ونموذج المجال','عقود OpenAPI','سجلّات ADR ووثيقة تصميم النظام','خطة تفكيك الخدمات'],
    references:[
      'Evans — Domain-Driven Design (2003)',
      'Newman — Building Microservices, 2nd ed. (2021)',
      'Fielding — Architectural Styles and the Design of Network-based Software Architectures (2000)',
      'Conway — “How Do Committees Invent?” (1968)',
      'Skelton & Pais — Team Topologies (2019)'
    ]
  },
  {
    id:'automation-workflow', no:'04', size:'c-4',
    title:'الأتمتة ومسار العمل',
    tag:'التنسيق',
    lead:'تنسيقٌ يُشغّل التجربة نيابةً عنك: قابلٌ للتكرار الآمن، شفّافٌ، قادرٌ على التعافي بحُكم التصميم.',
    basis:'يقوم على تنسيق مسارات العمل، ونمطِ الساغا (Garcia-Molina & Salem)، والمعماريةِ المدفوعة بالأحداث، وأنماطِ تكامل المؤسسات (Hohpe & Woolf).',
    cites:[['نمط الساغا','Garcia-Molina، 1987'],['أنماط التكامل','Hohpe، 2003'],['مدفوع بالأحداث','Richardson، 2018']],
    approach:[
      'نختار بين التنسيق والتناغم عن قصدٍ لا تلقائيًّا',
      'نستعين بالساغا والمعاملات التعويضية لاتّساقٍ بين الخدمات',
      'نُصمّم مساراتٍ مدفوعةً بالأحداث تصمد أمام إعادة المحاولة',
      'نُضمّن الرصدَ ومعالجةَ الإخفاق والتعافيَ في صلب التصميم'
    ],
    deliverables:['نماذج مسار العمل والتنسيق','تصميم الأحداث والتكامل','سياسات التكرار الآمن وإعادة المحاولة'],
    references:[
      'Garcia-Molina & Salem — “Sagas”, ACM SIGMOD (1987)',
      'Richardson — Microservices Patterns (2018)',
      'Hohpe & Woolf — Enterprise Integration Patterns (2003)'
    ]
  },
  {
    id:'automated-support', no:'05', size:'c-5',
    title:'الدعم المؤتمت',
    tag:'تشغيل الخدمة',
    lead:'حلقاتُ حلٍّ تُغلق نفسها: الفرزُ والاستيعابُ والتصعيدُ جزءٌ من الخدمة لا إضافةٌ عليها.',
    basis:'مستنيرٌ بالتغذية الراجعة المُغلقة، وأبحاثِ التعافي من الخدمة، وهندسةِ الموثوقية (Google SRE).',
    cites:[['هندسة موثوقية المواقع','Google، 2016'],['التعافي من الخدمة','Smith & Bolton'],['الحلقة المُغلقة','Reichheld، 2003']],
    approach:[
      'نضع تصنيفًا للنوايا وللفرز عند ورود الطلب',
      'نُؤتمت الاستيعاب وحلقاتِ المعرفة الذاتية التحديث',
      'نرسم سياسات التصعيد والتعافي المقصود من الخدمة',
      'نحدّد ميزانياتِ الخطأ وأهدافَ الموثوقية لنظام الدعم نفسه'
    ],
    deliverables:['تصنيف الفرز','مسارات حلٍّ مؤتمتة','دليل التصعيد والتعافي من الخدمة'],
    references:[
      'Beyer, Jones, Petoff & Murphy — Site Reliability Engineering (Google, 2016)',
      'Reichheld — “The One Number You Need to Grow”, HBR (2003)',
      'Smith, Bolton & Wagner — “A Model of Customer Satisfaction with Service Encounters Involving Failure and Recovery” (1999)'
    ]
  },
  {
    id:'insight-analytics', no:'06', size:'c-6',
    title:'الرؤى والتحليلات',
    tag:'القياس',
    lead:'لوحاتٌ وإشاراتٌ تُخبرك بما تفعله التجربة، وبما ينبغي تغييرُه تاليًا.',
    basis:'مبنيٌّ على إطار الأهداف–الإشارات–المقاييس وإطارِ HEART (Google)، وأهدافِ مستوى الخدمة (SRE)، وممارسةِ قابلية الرصد.',
    cites:[['إطار HEART','Google، 2010'],['SLI / SLO','Google SRE'],['قابلية الرصد','Majors، 2022']],
    approach:[
      'نربط كلَّ مقياسٍ بنتيجة، على نهج الأهداف–الإشارات–المقاييس',
      'نعتمد مقاييس HEART وشجرةَ قياس',
      'نضع مؤشّرات وأهدافَ مستوى الخدمة للنظام المُشغَّل',
      'نُخطّط للقياس وقابليةِ الرصد من اليوم الأوّل'
    ],
    deliverables:['شجرة المقاييس والنجم الشمالي','خطة القياس','لوحاتٌ حيّة وتنبيهات'],
    references:[
      'Rodden, Hutchinson & Fu — “Measuring the User Experience on a Large Scale” (HEART), Google (2010)',
      'Beyer et al. — Site Reliability Engineering: SLIs & SLOs (2016)',
      'Majors, Fong-Jones & Miranda — Observability Engineering (2022)'
    ]
  },
  {
    id:'brand-interface', no:'07', size:'c-7',
    title:'الهوية والواجهة',
    tag:'هوية · واجهة',
    lead:'الحِرفةُ المرئية: هويةٌ وواجهةٌ وحركةٌ تجعل النظام يبدو حتميًّا.',
    basis:'متجذِّرٌ في التصميم المتمحور حول الإنسان (Norman)، وأثرِ الجمال على الاستخدام، ومبادئِ الجشطلت، وأنظمةِ التصميم (Frost).',
    cites:[['التصميم المتمحور حول الإنسان','Norman، 2013'],['أثر الجمال على الاستخدام','Kurosu، 1995'],['التصميم الذرّي','Frost، 2016']],
    approach:[
      'نضع الهوية والخطَّ ولغةَ الحركة',
      'نُصمّم الإمكاناتِ والدلالات؛ وضوحٌ مُصمَّمٌ من الأساس',
      'نبني نظامَ تصميمٍ ومكتبةَ مكوّنات',
      'نلتزم بأنماط واجهةٍ متجاوبةٍ وميسورةِ الوصول'
    ],
    deliverables:['نظام الهوية والعلامة','نظام التصميم ومكتبة المكوّنات','إرشادات الحركة والتفاعل'],
    references:[
      'Norman — The Design of Everyday Things, rev. ed. (2013)',
      'Kurosu & Kashimura — “Apparent Usability vs. Inherent Usability” (1995)',
      'Frost — Atomic Design (2016)'
    ]
  }
];
