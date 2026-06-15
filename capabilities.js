/* ============================================================
   CAPABILITIES — single source of truth for "What we make".
   Rendered as the bento on index.html and as the detail on
   capability.html (?id=...). Content is grounded in the
   service-design, DDD, microservices and CX literature.
   ============================================================ */
window.CAPABILITIES = [
  {
    id:'experience-strategy', no:'01', size:'c-1', dark:true,
    title:'Experience strategy',
    tag:'Strategy · Discovery',
    lead:'End-to-end experience design that begins from a real job-to-be-done and commits to outcomes — not deliverables.',
    basis:'Rests on the Experience Economy (Pine & Gilmore), Jobs-to-be-Done (Christensen; Ulwick), and outcome-based discovery (Torres; Seiden).',
    cites:[['Experience Economy','Pine & Gilmore, 1998'],['Jobs-to-be-Done','Christensen, 2016'],['Outcomes over Output','Seiden, 2019']],
    approach:[
      'Job-to-be-done & discovery interviews to find the real, unmet need',
      'Opportunity–solution mapping before any solution is fixed',
      'Experience principles and a North-Star outcome',
      'Double-Diamond framing — diverge to explore, converge to commit'
    ],
    deliverables:['Need statement & opportunity map','Experience principles','North-Star metric & outcome tree','Prioritised solution hypotheses'],
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
    title:'Service catalogs',
    tag:'Service design',
    lead:'The experience broken into named, reusable services — what is offered, to whom, and how it is delivered.',
    basis:'Grounded in service blueprinting (Shostack), service design practice (Stickdorn et al.) and service-portfolio management (ITIL 4).',
    cites:[['Service Blueprinting','Shostack, 1984'],['Service Design','Stickdorn, 2018'],['Service Catalogue','ITIL 4']],
    approach:[
      'Service blueprint — frontstage, backstage, and the line of visibility',
      'Service taxonomy & catalog modelling',
      'Ownership (RACI) and service-level definitions',
      'Service-dominant logic — every offering treated as a service'
    ],
    deliverables:['Service blueprints','Service catalog & taxonomy','Ownership & SLA matrix'],
    references:[
      'Shostack — “Designing Services That Deliver”, HBR (1984)',
      'Stickdorn, Hormess, Lawrence & Schneider — This Is Service Design Doing (2018)',
      'Vargo & Lusch — “Evolving to a New Dominant Logic for Marketing” (2004)',
      'ITIL 4 — Service Catalogue Management'
    ]
  },
  {
    id:'system-api-design', no:'03', size:'c-3',
    title:'System & API design',
    tag:'Architecture',
    lead:'A microservices spine with clean, API-first contracts — modelled around the business and built to evolve.',
    basis:'Rooted in Domain-Driven Design (Evans), microservices patterns (Newman; Richardson), REST (Fielding) and Conway’s Law.',
    cites:[['Domain-Driven Design','Evans, 2003'],['REST','Fielding, 2000'],['Conway’s Law','1968']],
    approach:[
      'Bounded contexts & context mapping from the domain model',
      'API-first design with versioned OpenAPI contracts',
      'Architecture Decision Records (ADRs) to make trade-offs explicit',
      'Service & team boundaries aligned (Conway’s Law; Team Topologies)'
    ],
    deliverables:['Context map & domain model','OpenAPI contracts','ADRs & system design doc','Service decomposition plan'],
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
    title:'Automation & workflow',
    tag:'Orchestration',
    lead:'Orchestration that runs the experience for you — idempotent, observable and recoverable by design.',
    basis:'Based on workflow orchestration, the Saga pattern (Garcia-Molina & Salem), event-driven architecture and enterprise integration patterns (Hohpe & Woolf).',
    cites:[['Saga pattern','Garcia-Molina, 1987'],['Integration Patterns','Hohpe, 2003'],['Event-driven','Richardson, 2018']],
    approach:[
      'Orchestration vs choreography — chosen deliberately, not by default',
      'Sagas & compensating transactions for cross-service consistency',
      'Event-driven, idempotent workflows that survive retries',
      'Observability, dead-letter handling and recovery built in'
    ],
    deliverables:['Workflow & orchestration models','Event & integration design','Idempotency & retry policies'],
    references:[
      'Garcia-Molina & Salem — “Sagas”, ACM SIGMOD (1987)',
      'Richardson — Microservices Patterns (2018)',
      'Hohpe & Woolf — Enterprise Integration Patterns (2003)'
    ]
  },
  {
    id:'automated-support', no:'05', size:'c-5',
    title:'Support, automated',
    tag:'Service operations',
    lead:'Resolution loops that close themselves — triage, deflection and escalation designed as part of the service.',
    basis:'Informed by closed-loop feedback, service-recovery research and reliability engineering (Google SRE).',
    cites:[['Site Reliability Eng.','Google, 2016'],['Service Recovery','Smith & Bolton'],['Closed-loop','Reichheld, 2003']],
    approach:[
      'Intent & triage taxonomy for incoming requests',
      'Automated deflection and self-updating knowledge loops',
      'Escalation policies and deliberate service recovery',
      'Error budgets and reliability targets for the support system itself'
    ],
    deliverables:['Triage taxonomy','Automated resolution flows','Escalation & service-recovery playbook'],
    references:[
      'Beyer, Jones, Petoff & Murphy — Site Reliability Engineering (Google, 2016)',
      'Reichheld — “The One Number You Need to Grow”, HBR (2003)',
      'Smith, Bolton & Wagner — “A Model of Customer Satisfaction with Service Encounters Involving Failure and Recovery” (1999)'
    ]
  },
  {
    id:'insight-analytics', no:'06', size:'c-6',
    title:'Insight & analytics',
    tag:'Measurement',
    lead:'Dashboards and signals that tell you what the experience is doing — and what to change next.',
    basis:'Built on Goals–Signals–Metrics and the HEART framework (Google), service-level objectives (SRE) and observability practice.',
    cites:[['HEART framework','Google, 2010'],['SLI / SLO','Google SRE'],['Observability','Majors, 2022']],
    approach:[
      'Goals–Signals–Metrics, so every metric traces to an outcome',
      'HEART UX metrics and a measurement tree',
      'SLIs/SLOs for the running system',
      'Instrumentation & observability plan from day one'
    ],
    deliverables:['Metric tree & North-Star','Instrumentation plan','Live dashboards & alerting'],
    references:[
      'Rodden, Hutchinson & Fu — “Measuring the User Experience on a Large Scale” (HEART), Google (2010)',
      'Beyer et al. — Site Reliability Engineering: SLIs & SLOs (2016)',
      'Majors, Fong-Jones & Miranda — Observability Engineering (2022)'
    ]
  },
  {
    id:'brand-interface', no:'07', size:'c-7',
    title:'Brand & interface',
    tag:'Identity · UI',
    lead:'The visible craft — identity, interface and motion that make the system feel inevitable.',
    basis:'Grounded in human-centred design (Norman), the aesthetic–usability effect, Gestalt principles and design systems (Frost).',
    cites:[['Human-centred design','Norman, 2013'],['Aesthetic–usability','Kurosu, 1995'],['Atomic Design','Frost, 2016']],
    approach:[
      'Identity, type and a motion language',
      'Affordances & signifiers — clarity designed in, not added on',
      'A design system and component library',
      'Accessible, responsive interface patterns'
    ],
    deliverables:['Brand & identity system','Design system / component library','Motion & interaction guidelines'],
    references:[
      'Norman — The Design of Everyday Things, rev. ed. (2013)',
      'Kurosu & Kashimura — “Apparent Usability vs. Inherent Usability” (1995)',
      'Frost — Atomic Design (2016)'
    ]
  }
];
